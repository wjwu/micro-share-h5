<template>
  <result title="添加成功">
    <template slot="buttons">
      <a href="/partner/list.html" class="weui-btn weui-btn_default">查看我的商伴</a>
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

