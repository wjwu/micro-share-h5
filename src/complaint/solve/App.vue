<template>
  <div v-if="showApp">
    <div class="title">
      <h1>举报与投诉</h1>
      <div class="sub-content">
        <div class="sub">提醒：</div>
        <div class="subs">
          <div class="sub">请您在5天内反馈回复意见，否则系统将默认您认可对方本次投诉为真实有效投诉。</div>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">您是否认可本次投诉</div>
    <div class="weui-cells weui-cells_radio">
      <label class="weui-cell weui-check__label" for="yes">
        <div class="weui-cell__bd">
          <p>是</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" class="weui-check" name="radio1" id="yes" @click="handleRadioClick(true)">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label class="weui-cell weui-check__label" for="no">
        <div class="weui-cell__bd">
          <p>否</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" name="radio1" class="weui-check" id="no" checked @click="handleRadioClick(false)">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
    </div>
    <div class="weui-cells__title" v-if="!flag">不认可原因描述</div>
    <div class="weui-cells weui-cells_form" v-if="!flag">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea v-model="content" class="weui-textarea" placeholder="请输入内容" rows="3" maxlength="200"></textarea>
          <div class="weui-textarea-counter">
            <span>{{content.length}}</span>/200</div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:;" @click="handleClick">提交</a>
    </div>
  </div>
</template>

<script>
import weui from 'weui.js';
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { openAlert, tryFunc, getQueryString } from '../../common/js/common';
import '../../common/js/share';

export default {
  data() {
    return {
      flag: false,
      content: '',
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
    handleRadioClick(result) {
      this.flag = result;
    },
    handleClick() {
      const compsId = getQueryString('compsId');
      if (!compsId) {
        openAlert('投诉编号无效');
        return;
      }
      if (!this.content && !this.flag) {
        openAlert('请先输入拒绝理由');
        return;
      }
      tryFunc(async () => {
        const request = {
          flag: this.flag,
          reason: this.content
        };
        await axios.post(`/order/report/${compsId}/confirm`, request);
        weui.dialog({
          content: '提交成功，点击确定返回',
          buttons: [
            {
              label: '确定',
              type: 'primary',
              onClick: () => {
                window.location.href = `/complaint/detail.html?compsId=${compsId}`;
              }
            }
          ]
        });
      });
    }
  }
};
</script>

</<style lang="scss">
.sub-content {
  display: flex;
  .sub {
    font-size: 0.75rem !important;
    margin-top: 0 !important;
  }
  .subs {
    flex: 1;
  }
}
</style>

