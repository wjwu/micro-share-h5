<template>
  <div>
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
            <option value="1">服装</option>
            <option value="2">游戏</option>
            <option value="3">开发</option>
          </select>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">人数</label>
        </div>
        <div class="weui-cell__bd">
          <input v-model="number" class="weui-input" readonly>
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
          <textarea v-model="description" class="weui-textarea" placeholder="请输入描述" rows="3"></textarea>
          <div class="weui-textarea-counter">
            <span>0</span>/200</div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary  weui-btn_disabled" href="javascript:" @click="handleSave">提交</a>
    </div>
  </div>
</template>

<script>
import 'babel-polyfill';
import axios from 'axios';
import wxApi from '../common/js/wxApi';
import config from '../common/js/config';
import { getAddress } from '../common/js/map';
import { openToast } from '../common/js/common';
import { Indicator } from 'mint-ui';
import { mockRequest } from '../common/js/mock';

export default {
  data() {
    return {
      number: '0',
      description: '',
      address: '',
      selectedGroupId: '',
      selectedIndustryId: '',
      groups: []
    };
  },
  async mounted() {
    Indicator.open();
    await this.getGroups();
    if (this.groups && this.groups.length > 0) {
      await wxApi.config(['getLocation']);
      const location = await wxApi.getLocation();
      this.address = await getAddress(location.latitude, location.longitude);
      Indicator.close();
    } else {
      Indicator.close();
      openToast('抱歉，您没有可用微信群');
    }
  },
  methods: {
    async getGroups() {
      // try {
      const { data } = await axios.get(`${config.apiHost}/user/myGroup`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      this.groups = data;
      // } catch (e) {
      //   openToast(JSON.stringify(e));
      // }
    },
    handleChange() {
      if (this.selectedGroupId) {
        for (let group of this.groups) {
          if (group.id === this.selectedGroupId) {
            this.number = group.number;
            break;
          }
        }
      } else {
        this.number = '0';
      }
    },
    async handleSave() {
      if (!this.groups || this.groups.length === 0) {
        openToast('抱歉，您没有可用微信群');
        return;
      }

      if (!this.description) {
        openToast('请输入描述');
        return;
      }

      Indicator.open();
      try {
        await mockRequest();
        window.location.href = './group_submit_success.html';
      } catch (e) {
        Indicator.close();
        openToast(e);
      }
    }
  }
};
</script>

<style lang="scss">
.location {
  display: flex;
  align-items: baseline;

  i {
    margin-right: 5px;
  }
}
</style>

