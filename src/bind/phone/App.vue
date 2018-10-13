<template>
  <div v-if="showApp">
    <div class="title">
      <h1>
        <img src="http://static.fangzhoubuluo.com/logo.png" />
        <span>成员注册</span>
      </h1>
      <div class="sub">开启找寻社区商伴，抱团联合经营之旅</div>
    </div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">昵称</label>
        </div>
        <div class="weui-cell__bd">
          {{nick}}
        </div>
      </div>
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

      <div class="weui-cells weui-cells_checkbox" style="margin-top: 0px;">
        <label class="weui-cell weui-check__label" for="s11">
          <div class="weui-cell__hd">
            <input type="checkbox" id="s11" v-model="protocolChecked">
          </div>
          <div class="weui-cell__bd">
            <p style="font-size: .5rem;">
              我已阅读并同意
              <a style="color:#3cc51f;" href="/service.html">「商伴部落使用协议」</a>
              <a style="color:#3cc51f;" href="/rule.html">「运行&信用规则」</a>
            </p>
          </div>
        </label>
      </div>

    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:" @click="handleSave">注册</a>
    </div>
  </div>
</template>

<script>
import weui from 'weui.js';
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import {
  openAlert,
  tryFunc,
  checkPhone,
  getQueryString
} from '../../common/js/common';
import '../../common/js/share';

export default {
  data() {
    return {
      phone: '',
      captcha: '',
      nick: localStorage.getItem('userName'),
      showApp: false,
      sending: false,
      protocolChecked: false,
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
      if (!this.protocolChecked) {
        openAlert('请勾选使用协议');
        return;
      }
      if (!this.phone) {
        openAlert('请输入手机号');
        return;
      }
      if (!this.captcha) {
        openAlert('请输入验证码');
        return;
      }

      if (!checkPhone(this.phone)) {
        openAlert('手机号码格式不正确');
        return;
      }

      tryFunc(async () => {
        await axios.put('/user/safe/phone', {
          phone: this.phone,
          captcha: this.captcha
        });
        localStorage.setItem('phone', this.phone);
        weui.dialog({
          content: '恭喜您注册成为部落成员，请点击确定返回',
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
        openAlert('请输入手机号');
        return;
      }
      if (!checkPhone(this.phone)) {
        openAlert('手机号码格式不正确');
        return;
      }

      tryFunc(async () => {
        await axios.get('/captcha', {
          params: {
            phone: this.phone,
            type: 'BIND'
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
        openAlert('验证码已发送');
      });
    }
  }
};
</script>

<style lang="scss">
h1 {
  display: flex;
  height: 3rem;
  align-items: center;

  img {
    width: 3rem;
  }

  span {
    margin-left: 0.5rem;
  }
}
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



