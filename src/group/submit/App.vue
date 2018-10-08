<template>
  <div v-if="showApp">
    <div class="title">
      <h1>提交源群申请</h1>
      <div class="sub-content">
        <div class="sub">提醒：</div>
        <div class="subs">
          <div class="sub">您提交群资料后，机器人将入群核实资料真实性；</div>
          <div class="sub">请详细描述您经营的产品或服务，避免和商伴经营产品产生冲突；</div>
          <div class="sub">只能提交属于您自己的群，并且群人数>=200人；</div>
          <div class="sub">范围：以您当前地址为原点，范围半径内匹配；</div>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">基本信息</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label">名称</label>
        </div>
        <div class="weui-cell__bd">
          <select v-model="selectedGroupId" class="weui-select" @change="handleChange">
            <option value="" v-if="groups && groups.length > 0">请选择微信群</option>
            <option v-for="group in groups" :key="group.id" :value="group.id">{{group.name}}</option>
          </select>
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label">行业</label>
        </div>
        <div class="weui-cell__bd">
          <select v-model="selectedIndustryId" class="weui-select">
            <option value="">请选择群所属行业</option>
            <option :value="item.id" v-for="item in industries" :key="item.id">{{item.name}}</option>
          </select>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">人数</label>
        </div>
        <div class="weui-cell__bd">
          {{number}}
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            位置
          </label>
        </div>
        <div class="weui-cell__bd location">
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          <textarea v-model="address" class="weui-textarea" rows="2" readonly></textarea>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">产品或服务具体描述</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea v-model="description" maxlength="200" class="weui-textarea" placeholder="请输入描述" rows="3"></textarea>
          <div class="weui-textarea-counter">
            <span>{{description.length}}</span>/200</div>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">请选择商伴条件</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell weui-cell_select weui-cell_select-after">
      <div class="weui-cell__hd">
        <label class="weui-label">范围</label>
      </div>
      <div class="weui-cell__hd">
        <select v-model="selectedRadius" class="weui-select">
          <option value="500" selected="selected">1000米</option>
          <option value="1000">2000米</option>
          <option value="1500">3000米</option>
          <option value="2000">5000米</option>
        </select>
      </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" :class="{'weui-btn_disabled':(groups && groups.length === 0 )}" href="javascript:;" @click="handleSave">提交</a>
    </div>
    <back></back>
  </div>
</template>

<script>
import axios from "axios";
import { auth, checkPhone } from "../../common/js/auth";
import wxApi from "../../common/js/wxApi";
import weui from "weui.js";
import config from "../../common/js/config";
import industries from "../../common/js/industries";
import { getAddress } from "../../common/js/map";
import { openToast, tryFunc } from "../../common/js/common";
import Back from "../../common/components/Back";
import "../../common/js/share";

export default {
  components: {
    Back
  },
  data() {
    return {
      showApp: false,
      name: "",
      number: "0",
      description: "",
      address: "",
      latitude: "",
      longitude: "",
      selectedGroupId: "",
      selectedIndustryId: "",
      wechatId: "",
      groups: [],
      industries,
      selectedRadius: 500
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      if (checkPhone()) {
        this.showApp = true;
      }
      await this.getGroups();
      if (this.groups && this.groups.length > 0) {
        await wxApi.config(["getLocation"]);
        const location = await wxApi.getLocation();
        const result = await getAddress(location.latitude, location.longitude);
        this.address = result.address;
        this.latitude = result.latitude;
        this.longitude = result.longitude;
      } else {
        weui.dialog({
          content: "抱歉，没发现可用群！<br />点击【确定】去添加机器人",
          buttons: [
            {
              label: "确定",
              type: "primary",
              onClick: () => {
                location.href = "/qrcode.html";
              }
            },
            {
              label: "取消",
              type: "default",
              onClick: () => {}
            }
          ]
        });
      }
    });
  },
  methods: {
    async getGroups() {
      const { data } = await axios.get(`${config.apiHost}/user/myRoom`, {
        headers: {
          userId: localStorage.getItem("userId")
        }
      });
      this.groups = data;
    },
    handleChange() {
      if (this.selectedGroupId) {
        for (let group of this.groups) {
          if (group.id === this.selectedGroupId) {
            this.number = group.number;
            this.name = group.name;
            this.wechatId = group.wechatId;
            break;
          }
        }
      } else {
        this.number = "0";
      }
    },
    handleSave() {
      if (this.groups && this.groups.length === 0) {
        return;
      }

      if (Number(this.number) < 200) {
        openToast("群人数需要大于200人才能参与商伴匹配");
        return;
      }

      if (!this.selectedGroupId) {
        openToast("请选择微信群");
        return;
      }
      if (!this.selectedIndustryId) {
        openToast("请选择微信群行业");
        return;
      }
      if (!this.latitude || !this.latitude) {
        openToast("请先定位位置");
        return;
      }

      tryFunc(async () => {
        const request = {
          count: this.number,
          name: this.name,
          industryId: this.selectedIndustryId,
          location: this.address,
          latitude: this.latitude.toString(),
          longitude: this.longitude.toString(),
          desc: this.description,
          wechatId: this.wechatId,
          matchRange: this.selectedRadius
        };
        await axios.post(`${config.apiHost}/group`, request, {
          headers: {
            userId: localStorage.getItem("userId")
          }
        });
        window.location.href = "./success.html";
      });
    }
  }
};
</script>

<style lang="scss">
.location {
  display: flex;
  align-items: center;

  i {
    margin-right: 5px;
  }
}

.sub-content {
  display: flex;
  .sub {
    font-size: 0.75rem !important;
    margin-top: 0 !important;
  }
  .subs {
    flex: 1;
  }
}
</style>

