<template>
  <result title="提交成功" sub-title="我会在您的群里待1-4天时间，不会做任何发言，然后自动退出群，审核结果会通过公众号通知您。">
    <template slot="buttons">
      <a href="/index.html" class="weui-btn weui-btn_default">返回首页</a>
    </template>
  </result>
</template>

<script>
import '../../common/js/share';
import Result from '../../common/components/Result';

export default {
  components: {
    Result
  }
};
</script>

