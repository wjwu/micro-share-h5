<template>
  <div v-if="showApp">
    <div class="title">
      <h1>投诉订单</h1>
    </div>
    <div class="weui-cells__title">投诉</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea v-model="content" class="weui-textarea" placeholder="请输入内容" rows="3" @input="handleChange" maxlength="200"></textarea>
          <div class="weui-textarea-counter">
            <span>{{contentLength}}</span>/200</div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:;" @click="handleClick">提交</a>
    </div>
  </div>
</template>

<script>
import 'babel-polyfill';
import axios from 'axios';
import config from '../common/js/config';
import { auth } from '../common/js/auth';
import { Indicator } from 'mint-ui';
import { openToast, getQueryString } from '../common/js/common';

export default {
  data() {
    return {
      content: '',
      contentLength: 0,
      showApp: false
    };
  },
  async mounted() {
    Indicator.open();
    try {
      await auth();
      this.showApp = true;
      Indicator.close();
    } catch (e) {
      Indicator.close();
      if (e.response && e.response.data) {
        openToast(e.response.data.message);
      } else {
        openToast(e);
      }
    }
  },
  methods: {
    handleChange() {
      this.contentLength = this.content.length;
    },
    async handleClick() {
      const orderId = getQueryString('orderId');
      if (!orderId) {
        openToast('订单Id无效');
        return;
      }
      if (!this.content) {
        openToast('请先输入投诉内容');
        return;
      }
      Indicator.open();
      try {
        const request = {
          reason: this.content
        };
        await axios.post(`${config.apiHost}/order/${orderId}/report`, request, {
          headers: {
            userId: localStorage.getItem('userId')
          }
        });
        Indicator.close();
      } catch (e) {
        Indicator.close();
        if (e.response && e.response.data) {
          openToast(e.response.data.message);
        } else {
          openToast(e);
        }
      }
    }
  }
};
</script>
