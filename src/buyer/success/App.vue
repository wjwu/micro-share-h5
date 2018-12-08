<template>
  <result title="下单成功">
    <template slot="buttons">
      <weui-btn type="primary" href="/buyer/order/list.html">查看我的订单</weui-btn>
    </template>
  </result>
</template>

<script>
import '../../common/js/share';
import { Result, WeuiBtn } from '../../common/components';

export default {
  components: {
    Result,
    WeuiBtn
  }
};
</script>

