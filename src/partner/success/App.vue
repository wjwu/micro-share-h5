<template>
  <div class="weui-msg">
    <div class="weui-msg__icon-area">
      <i class="weui-icon-success weui-icon_msg"></i>
    </div>
    <div class="weui-msg__text-area">
      <h2 class="weui-msg__title">添加成功</h2>
      <!-- <p class="weui-msg__desc" style="width:80%;margin:0 auto;">
      </p> -->
    </div>
    <div class="weui-msg__opr-area">
      <p class="weui-btn-area">
        <a href="/partner/list.html" class="weui-btn weui-btn_default">查看我的商伴</a>
      </p>
    </div>
    <back></back>
  </div>
</template>

<script>
import Back from '../../common/components/Back';
import '../../common/js/share';

export default {
  components: {
    Back
  }
};
</script>

