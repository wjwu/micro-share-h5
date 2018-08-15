<template>
  <div>
    <div class="title">
      <h1>提交群申请</h1>
      <div class="sub">注意：提交资料后机器人将会入驻群并审核</div>
    </div>
    <div class="weui-cells__title">基本信息</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">名称</label>
        </div>
        <div class="weui-cell__bd">
          <input v-model="name" class="weui-input" type="text" placeholder="请输入名称">
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label">行业</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select">
            <option selected value="1">养猪</option>
            <option value="2">养牛</option>
            <option value="3">养马</option>
          </select>
        </div>
      </div>
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label class="weui-label">人数</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select">
            <option selected value="1">0-99</option>
            <option value="2">100-199</option>
            <option value="3">200-299</option>
          </select>
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
      <a class="weui-btn weui-btn_primary" href="javascript:" @click="handleSave">提交</a>
    </div>
  </div>
</template>

<script>
import 'babel-polyfill';
import { openToast } from '../common/js/common';
import { Indicator } from 'mint-ui';
import { mockRequest } from '../common/js/mock';

export default {
  data() {
    return {
      name: '',
      industry: '',
      amount: '',
      description: ''
    };
  },
  methods: {
    async handleSave() {
      if (!this.name) {
        openToast('请输入名称');
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
