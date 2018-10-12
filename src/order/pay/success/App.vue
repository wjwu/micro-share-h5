<template>
  <result title="支付成功" sub-title="恭喜您支付成功，点击下方按钮查看订单详情">
    <template slot="buttons">
      <a href="javascript:history.go(-1)" class="weui-btn weui-btn_default">查看订单</a>
    </template>
  </result>
</template>

<script>
import '../../../common/js/share';
import Result from '../../../common/components/Result';

export default {
  components: {
    Result
  }
};
</script>

