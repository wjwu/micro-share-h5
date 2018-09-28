<template>
  <div v-if="showApp">
    <div class="title">
      <h1>评价订单</h1>
    </div>
    <div class="weui-cells__title">评分</div>
    <star-rate :value="0" type="star1" :on-change="handleScoreChange" />
    <div class="weui-cells__title">评价</div>
    <div class="weui-cells weui-cells_form">
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
    <back></back>
  </div>
</template>

<script>
import axios from 'axios';
import weui from 'weui.js';
import StarRate from 'vue-cute-rate';
import config from '../../common/js/config';
import { auth } from '../../common/js/auth';
import { openToast, tryFunc, getQueryString } from '../../common/js/common';
import Back from '../../common/components/Back';
import '../../common/js/share';

export default {
  components: {
    StarRate,
    Back
  },
  data() {
    return {
      score: 0,
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
    handleScoreChange(value) {
      this.score = value;
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
        weui.dialog({
          content: '评价成功，点击确定返回',
          buttons: [
            {
              label: '确定',
              type: 'primary',
              onClick: function() {
                window.location.href = './match_list.html';
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
.star-able {
  width: 100%;
  padding: 0 15px !important;
  text-align: left !important;
  background-color: #fff;
}
</style>

