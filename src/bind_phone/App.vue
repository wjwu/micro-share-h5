<template>
  <div>
    <div class="title">
      <h1>绑定手机</h1>
      <div class="sub">为了您的信息安全，请绑定手机</div>
    </div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd">
          <input v-model="phone" class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入手机号">
        </div>
      </div>
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
          <label class="weui-label">验证码</label>
        </div>
        <div class="weui-cell__bd">
          <input v-model="captcha" class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入验证码">
        </div>
        <div class="weui-cell__ft">
          <button class="weui-vcode-btn" @click="handleSend">获取验证码</button>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:" @click="handleSave">绑定</a>
    </div>
  </div>
</template>

<script>
import 'babel-polyfill';
import { openToast, checkPhone } from '../common/js/common';
import { Indicator } from 'mint-ui';
import { mockRequest } from '../common/js/mock';

export default {
  data() {
    return {
      phone: '',
      captcha: ''
    };
  },
  methods: {
    async handleSave() {
      if (!this.phone) {
        openToast('请输入手机号');
        return;
      }
      if (!this.captcha) {
        openToast('请输入验证码');
        return;
      }

      if (!checkPhone(this.phone)) {
        openToast('手机号码格式不正确');
        return;
      }

      Indicator.open();
      try {
        await mockRequest();
        Indicator.close();
      } catch (e) {
        Indicator.close();
        openToast(e);
      }
    },
    async handleSend() {
      if (!this.phone) {
        openToast('请输入手机号');
        return;
      }
      if (!checkPhone(this.phone)) {
        openToast('手机号码格式不正确');
        return;
      }

      Indicator.open();
      try {
        await mockRequest();
        openToast('验证码已发送');
        Indicator.close();
      } catch (e) {
        Indicator.close();
        openToast(e);
      }
    }
  }
};
</script>


