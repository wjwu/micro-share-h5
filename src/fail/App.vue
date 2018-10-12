<template>
  <result type="fail" title="支付失败" sub-title="抱歉支付失败，请稍后再试或联系客服">
    <template slot="buttons">
      <a href="/pay.html" class="weui-btn weui-btn_default">返回支付页面</a>
    </template>
  </result>
</template>

<script>
import '../common/js/share';
import Result from '../common/components/Result';

export default {
  components: {
    Result
  }
};
</script>

