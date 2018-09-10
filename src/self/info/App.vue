<template>
  <div v-if="showApp && user">
    <div class="weui-cells__title">我的资料</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">昵称</label>
        </div>
        <div class="weui-cell__bd">
          <span>{{user.userName}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">性别</label>
        </div>
        <div class="weui-cell__bd">
          <span>{{user.sex}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">微信号</label>
        </div>
        <div class="weui-cell__bd">
          <span>{{user.wechat}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd">
          <span>{{user.phone}}</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">信用分</label>
        </div>
        <div class="weui-cell__bd">
          <span>{{user.creditScore}}分</span>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_default" href="./self_center.html">返回</a>
    </div>
  </div>
</template>

<script>
import 'babel-polyfill';
import axios from 'axios';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import { tryFunc } from '../../common/js/common';

export default {
  data() {
    return {
      showApp: false,
      user: null
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`${config.apiHost}/user/info`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      this.user = data;
    });
  }
};
</script>

