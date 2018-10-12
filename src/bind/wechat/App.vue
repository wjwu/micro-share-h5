<template>
  <div v-if="showApp">
    <div class="weui-cells__title">为了客户更好的联系到您，请绑定您的微信号</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">微信号</label>
        </div>
        <div class="weui-cell__bd">
          <input v-model="wechat" class="weui-input" type="text" maxlength="20" placeholder="请输入微信号">
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:" @click="handleSave">绑定</a>
    </div>
  </div>
</template>

<script>
import weui from 'weui.js';
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { openToast, tryFunc } from '../../common/js/common';
import '../../common/js/share';

export default {
  data() {
    return {
      wechat: '',
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
    handleSave() {
      if (!this.wechat) {
        openToast('请输入微信号');
        return;
      }

      tryFunc(async () => {
        await axios.put('/user/safe/wechat', {
          wechat: this.wechat
        });
        weui.dialog({
          content: '绑定手机成功，点击确定返回前一个页面',
          buttons: [
            {
              label: '确定',
              type: 'primary',
              onClick: function() {
                window.history.back(-1);
              }
            }
          ]
        });
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



