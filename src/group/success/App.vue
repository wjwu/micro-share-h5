<template>
  <result title="提交成功" sub-title="我们会对您的群考察三天，审核结果会通过微信公众号通知给您">
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

