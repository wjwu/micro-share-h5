<template>
  <div v-if="showApp">
    <div class="title">
      <h1>提交群申请</h1>
      <div class="sub">注意：提交资料后机器人将会入驻群并审核</div>
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
          <input type="text" unselectable="on" onfocus="this.blur()" v-model="number" class="weui-input" readonly>
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
    <div class="weui-cells__title">描述</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea v-model="description" maxlength="200" class="weui-textarea" placeholder="请输入描述" rows="3" @input="handleDescChange"></textarea>
          <div class="weui-textarea-counter">
            <span>{{descLength}}</span>/200</div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" :class="{'weui-btn_disabled':(groups && groups.length === 0 )}" href="javascript:;" @click="handleSave">提交</a>
    </div>
  </div>
</template>

<script>
import 'babel-polyfill';
import axios from 'axios';
import { auth } from '../../common/js/auth';
import wxApi from '../../common/js/wxApi';
import config from '../../common/js/config';
import industries from '../../common/js/industries';
import { getAddress } from '../../common/js/map';
import { openToast, tryFunc } from '../../common/js/common';

export default {
  data() {
    return {
      showApp: false,
      name: '',
      number: '0',
      description: '',
      descLength: 0,
      address: '',
      latitude: '',
      longitude: '',
      selectedGroupId: '',
      selectedIndustryId: '',
      wechatId: '',
      groups: [],
      industries
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      await this.getGroups();
      if (this.groups && this.groups.length > 0) {
        await wxApi.config(['getLocation']);
        const location = await wxApi.getLocation();
        const result = await getAddress(location.latitude, location.longitude);
        this.address = result.address;
        this.latitude = result.latitude;
        this.longitude = result.longitude;
      } else {
        openToast('抱歉，您没有可用微信群');
      }
    });
  },
  methods: {
    async getGroups() {
      const { data } = await axios.get(`${config.apiHost}/user/myRoom`, {
        headers: {
          userId: localStorage.getItem('userId')
          // userId: 'f6217fc2-7bae-4972-87d5-563f02fdd9e4'
        }
      });
      this.groups = data;
    },
    handleDescChange() {
      this.descLength = this.description.length;
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
        this.number = '0';
      }
    },
    handleSave() {
      if (this.groups && this.groups.length === 0) {
        return;
      }

      if (!this.selectedGroupId) {
        openToast('请选择微信群');
        return;
      }
      if (!this.selectedIndustryId) {
        openToast('请选择微信群行业');
        return;
      }
      if (!this.latitude || !this.latitude) {
        openToast('请先定位位置');
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
          wechatId: this.wechatId
        };
        await axios.post(`${config.apiHost}/group`, request, {
          headers: {
            userId: localStorage.getItem('userId')
          }
        });
        window.location.href = './group_submit_success.html';
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
</style>

