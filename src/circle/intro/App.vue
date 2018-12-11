<template>
  <div v-if="showApp">
    <div class="title">
      <h2>申请条件</h2>
      <div class="sub-content">
        <ul>
          <li>完成部落成员注册；</li>
          <li>您提交的找商伴群分享申请通过审核；</li>
          <li>您需具备一定的社群运营经验与能力；</li>
        </ul>
      </div>
    </div>
    <div class="title">
      <h2>圈主权利</h2>
      <div class="sub-content">
        <ul>
          <li>申请通过后，您成为临时圈主，您账户将会免费开通手掌柜商城版使用1个月功能；</li>
          <li>您可以发起建立私人商伴圈子，抱团联合经营；</li>
          <li>您可邀请您同行或者朋友参与“找商伴”微信群分享。被邀人员群分享申请通过审核，即成为圈子成员，可免费使用1个月手掌柜工具。</li>
          <li>一个月时间内，您圈子达到4名成员，您成为正式圈主，可继续免费使用6个月手掌柜工具，并享有圈主专享特权。</li>
        </ul>
      </div>
    </div>
    <weui-btn-area>
      <weui-btn v-if="canApply" type="primary" href="/circle/submit.html">申请圈主</weui-btn>
      <weui-btn v-if="!canApply" type="primary" :href="`/circle/detail.html?id=${circleId}`">邀请进展</weui-btn>
      <weui-btn v-if="!canApply" type="primary" @click="handleShareClick">去分享</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import { WeuiBtnArea, WeuiBtn } from '../../common/components';
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { tryFunc } from '../../common/js/common';
import '../../common/js/share';

export default {
  components: {
    WeuiBtnArea,
    WeuiBtn
  },
  data() {
    return {
      showApp: false,
      canApply: true,
      circleId: '',
      userName: window.encodeURIComponent(localStorage.getItem('userName'))
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      const { data } = await axios.get('/circle/owner');
      if (data) {
        this.canApply = false;
        this.circleId = data;
      }
      this.showApp = true;
    });
  },
  methods: {
    handleShareClick() {
      window.location.href = `/circle/share.html?circleId=${this.circleId}&userName=${this.userName}`;
    }
  }
};
</script>

<style lang="scss">
h2 {
  text-align: center;
  font-weight: 400;
}
.title {
  &:first-of-type {
    border-bottom: 1px solid #e5e5e5;
  }
}
.sub-content {
  ul {
    list-style: decimal;
    color: #888;
    font-size: 0.875rem;
  }
}
</style>
