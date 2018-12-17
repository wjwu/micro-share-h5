
<template>
  <result title="下单成功，请等待商家与您联系">
    <div>订单编号：{{orderNo}}</div>
    <template slot="buttons">
      <weui-btn type="primary" href="/buyer/order/list.html">查看我的订单</weui-btn>
    </template>
  </result>
</template>

<script>
import '../../common/js/share';
import { getQueryString } from '../../common/js/common';
import { Result, WeuiBtn } from '../../common/components';

export default {
  data() {
    return {
      orderNo: getQueryString('orderNo')
    };
  },
  components: {
    Result,
    WeuiBtn
  }
};
</script>

