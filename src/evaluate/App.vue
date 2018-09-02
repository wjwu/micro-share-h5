<template>
  <div v-if="showApp">
    <div class="title">
      <h1>评价订单</h1>
    </div>
    <div class="weui-cells__title">评分</div>
    <rate :length="5" v-model="score" />
    <div class="weui-cells__title">评价</div>
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
import { openToast, tryFunc, getQueryString } from '../common/js/common';

export default {
  data() {
    return {
      score: 0,
      content: '',
      contentLength: 0,
      showApp: false
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
    });
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
      if (this.score === 0) {
        openToast('请先评分');
        return;
      }
      tryFunc(async () => {
        const request = {
          content: this.content,
          score: this.score
        };
        await axios.post(`${config.apiHost}/comment/${orderId}`, request, {
          headers: {
            userId: localStorage.getItem('userId')
          }
        });
      });
    }
  }
};
</script>

<style lang="scss">
.Rate {
  padding: 7px 0 !important;
  background-color: #fff !important;
}
.Rate__star {
  outline: none !important;
}
.icon {
  height: 20px !important;
  width: 20px !important;
}
</style>

