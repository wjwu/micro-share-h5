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
    <back></back>
  </div>
</template>

<script>
import axios from 'axios';
import weui from 'weui.js';
import config from '../../common/js/config';
import { auth } from '../../common/js/auth';
import { openToast, tryFunc, getQueryString } from '../../common/js/common';
import Back from '../../common/components/Back';
import '../../common/js/share';

export default {
  components: {
    Back
  },
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
      const orderId = getQueryString('orderId');
      if (!orderId) {
        openToast('订单Id无效');
        return;
      }
      if (!this.content) {
        openToast('请先输入投诉内容');
        return;
      }
      tryFunc(async () => {
        const request = {
          reason: this.content
        };
        await axios.post(`${config.apiHost}/order/${orderId}/report`, request, {
          headers: {
            userId: localStorage.getItem('userId')
          }
        });
        weui.dialog({
          content: '投诉成功，点击确定返回',
          buttons: [
            {
              label: '确定',
              type: 'primary',
              onClick: function() {
                window.location.href = `../../match/detail.html?orderId=${orderId}`;
              }
            }
          ]
        });
      });
    }
  }
};
</script>
