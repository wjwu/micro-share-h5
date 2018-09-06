<template>
  <div v-if="showApp">
    <div class="title">
      <h1>拒绝投诉</h1>
    </div>
    <div class="weui-cells__title">拒绝理由</div>
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
import weui from 'weui.js';
import { auth } from '../common/js/auth';
import { openToast, tryFunc, getQueryString } from '../common/js/common';

export default {
  data() {
    return {
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
    handleClick() {
      const compsId = getQueryString('compsId');
      if (!compsId) {
        openToast('投诉编号无效');
        return;
      }
      if (!this.content) {
        openToast('请先输入拒绝理由');
        return;
      }
      tryFunc(async () => {
        const request = {
          flag: false,
          reason: this.content
        };
        await axios.post(
          `${config.apiHost}/order/report/${compsId}/confirm`,
          request,
          {
            headers: {
              userId: localStorage.getItem('userId')
            }
          }
        );
        weui.dialog({
          content: '提交成功，点击确定返回',
          buttons: [
            {
              label: '确定',
              type: 'primary',
              onClick: () => {
                window.location.href = `./complaint_detail.html?compsId=${compsId}`;
              }
            }
          ]
        });
      });
    }
  }
};
</script>
