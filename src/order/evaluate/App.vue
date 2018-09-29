<template>
  <div v-if="showApp">
    <div class="title">
      <h1>商伴评价</h1>
      <div class="sub-content">
        <div class="sub">提醒：</div>
        <div class="subs">
          <div class="sub">请客观、公正对您的合作商伴进行评价。</div>
          <div class="sub">该评价为匿名评价，不对商伴双方进行展示。</div>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">商伴互助评价</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">商伴配合度</label>
        </div>
        <div class="weui-cell__bd">
          <star-rate v-model="score1" type="star1" :count="2" />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">商伴互助、互动</label>
        </div>
        <div class="weui-cell__bd">
          <star-rate v-model="score2" type="star1" :count="4" />
        </div>
      </div>
    </div>
    <div class="weui-cells__title">商伴群质量评价</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">群活跃度</label>
        </div>
        <div class="weui-cell__bd">
          <star-rate v-model="score3" type="star1" :count="2" />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">群带给您的价值</label>
        </div>
        <div class="weui-cell__bd">
          <star-rate v-model="score4" type="star1" :count="2" />
        </div>
      </div>
    </div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">总分</label>
        </div>
        <div class="weui-cell__bd">
          {{total}}分
        </div>
      </div>
    </div>
    <div class="weui-cells__title">评价内容</div>
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
  computed: {
    total() {
      return this.score1 + this.score2 + this.score3 + this.score4;
    }
  },
  data() {
    return {
      score1: 0,
      score2: 0,
      score3: 0,
      score4: 0,
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
    async handleClick() {
      const orderId = getQueryString('orderId');
      if (!orderId) {
        openToast('订单Id无效');
        return;
      }
      if (this.total === 0) {
        openToast('请先评分');
        return;
      }
      tryFunc(async () => {
        const request = {
          content: this.content,
          score: this.total / 2
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
                window.location.href = '/order/list/evaluate.html';
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
  // padding: 0 15px !important;
  text-align: left !important;
  background-color: #fff;
  margin: 0 !important;
}
.weui-label {
  width: 140px !important;
}
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

