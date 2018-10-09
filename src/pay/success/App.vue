<template>
  <div class="weui-msg">
    <div class="weui-msg__icon-area">
      <i class="weui-icon-success weui-icon_msg"></i>
    </div>
    <div class="weui-msg__text-area">
      <h2 class="weui-msg__title">支付成功</h2>
      <p class="weui-msg__desc" style="width:80%;margin:0 auto;">恭喜您支付成功，点击下方按钮返回个人中心
      </p>
    </div>
    <div class="weui-msg__opr-area">
      <p class="weui-btn-area">
        <a href="/self/center.html" class="weui-btn weui-btn_default">返回个人中心</a>
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

