<template>
  <div v-if="showApp">
    <div class="weui-cells__title">投诉详情</div>
    <div class="weui-cells weui-cells_form" v-if="order.originalOrder">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            订单号：
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>123131313</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            投诉时间
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>123133</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            投诉状态
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>12313</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            投诉人
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>fromUserName</span>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">
            被投诉人
          </label>
        </div>
        <div class="weui-cell__bd">
          <span>toUserName</span>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">投诉理由</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea readonly="readonly" class="weui-textarea" rows="3">投诉reason...............</textarea>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <!-- <a v-if="当前userId===toId " class="weui-btn weui-btn_primary" href="javascript:;" @click="handleComment">承认投诉</a>
    <a v-if="当前userId===toId " class="weui-btn weui-btn_warn" href="javascript:;" @click="handleComment">拒绝投诉</a> -->
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
      compsId: getQueryString('compsId'),
      comps: {},
      showApp: false
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      if (!this.compsId) {
        openToast('投诉编号无效');
        return;
      }
      const { data } = await axios.get(
        `${config.apiHost}/user/report/${this.compsId}`,
        {
          headers: {
            userId: localStorage.getItem('userId')
          }
        }
      );
      this.comps = data;
    });
  },
  methods: {
    handleClick() {
    }
  }
};
</script>
