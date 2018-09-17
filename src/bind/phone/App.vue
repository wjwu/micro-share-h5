<template>
  <div v-if="showApp">
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
          <span v-if="sending" class="time">{{time}}s重新获取</span>
          <button v-else class="weui-vcode-btn" @click="handleSend">获取验证码</button>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:" @click="handleSave">绑定</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import weui from 'weui.js';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import {
  openToast,
  tryFunc,
  checkPhone,
  getQueryString
} from '../../common/js/common';

export default {
  data() {
    return {
      phone: '',
      captcha: '',
      showApp: false,
      sending: false,
      time: 60
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
    });
  },
  methods: {
    handleSave() {
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

      tryFunc(async () => {
        await axios.put(
          `${config.apiHost}/user/safe/phone`,
          {
            phone: this.phone,
            captcha: this.captcha
          },
          {
            headers: {
              userId: localStorage.getItem('userId')
            }
          }
        );
        weui.dialog({
          content: '绑定手机成功，点击确定返回前一个页面',
          buttons: [
            {
              label: '确定',
              type: 'primary',
              onClick: function() {
                window.location.href = getQueryString('redirect');
              }
            }
          ]
        });
      });
    },
    handleSend() {
      if (!this.phone) {
        openToast('请输入手机号');
        return;
      }
      if (!checkPhone(this.phone)) {
        openToast('手机号码格式不正确');
        return;
      }

      tryFunc(async () => {
        await axios.get(`${config.apiHost}/captcha`, {
          params: {
            phone: this.phone,
            type: 'BIND'
          },
          headers: {
            userId: localStorage.getItem('userId')
          }
        });
        const timer = setInterval(() => {
          if (this.time <= 0) {
            this.sending = false;
            this.time = 60;
            window.clearInterval(timer);
          } else {
            this.sending = true;
            this.time = this.time - 1;
          }
        }, 1000);
        openToast('验证码已发送');
      });
    }
  }
};
</script>

<style lang="scss">
.time {
  display: inline-block;
  height: 45px;
  margin-left: 5px;
  padding: 0 0.6em 0 0.7em;
  border-left: 1px solid #e5e5e5;
  line-height: 45px;
  vertical-align: middle;
  font-size: 17px;
  color: #09bb07;
}
</style>



