<template>
  <cust-bar v-if="showApp" :active-index="3">
    <div class="title">
      <h1>我的账户</h1>
    </div>
    <weui-cells>
      <weui-cell label="账户名："></weui-cell>
      <weui-cell label="我的订单："></weui-cell>
      <weui-cell label="我的消费积分："></weui-cell>
      <weui-cell label="我的抵扣券："></weui-cell>
    </weui-cells>
  </cust-bar>
</template>

<script>
import { auth } from '../common/js/auth';
import { tryFunc } from '../common/js/common';
import { CustBar, WeuiCells, WeuiCell } from '../common/components';
import '../common/js/share.js';

export default {
  components: {
    CustBar,
    WeuiCells,
    WeuiCell
  },
  data() {
    return {
      showApp: false
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
    });
  }
};
</script>

