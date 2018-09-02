<template>
  <div v-if="showApp">
    <div class="title">
      <h1>确认投诉</h1>
    </div>
    <div class="weui-cells__title">选择投诉结果</div>
    <div class="weui-cells weui-cells_radio">
      <label class="weui-cell weui-check__label" for="agree">
        <div class="weui-cell__bd">
          <p>同意投诉</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" name="confrimRadio" class="weui-check" id="agree" checked="checked" @click="handleChecked('agree')">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label class="weui-cell weui-check__label" for="refuse">
        <div class="weui-cell__bd">
          <p>拒绝投诉</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" name="confrimRadio" class="weui-check" id="refuse" @click="handleChecked('refuse')">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
    </div>
    <div v-if="!flag" class="weui-cells__title">拒绝理由</div>
    <div v-if="!flag" class="weui-cells weui-cells_form">
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
      flag: true,
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
    handleChecked(result) {
      this.flag = result === 'agree';
    },
    handleClick() {
      const id = getQueryString('id');
      if (!id) {
        openToast('投诉id无效');
        return;
      }
      if (!this.flag && !this.content) {
        openToast('请先输入拒绝理由');
        return;
      }
      tryFunc(async () => {
        const request = {
          flag: this.flag,
          reason: this.content
        };
        await axios.post(
          `${config.apiHost}/order/report/${id}/confirm`,
          request,
          {
            headers: {
              userId: localStorage.getItem('userId')
            }
          }
        );
      });
    }
  }
};
</script>
