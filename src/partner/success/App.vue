<template>
  <result title="添加成功">
    <template slot="buttons">
      <weui-btn type="default" href="/partner/list.html">查看我的商伴</weui-btn>
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

