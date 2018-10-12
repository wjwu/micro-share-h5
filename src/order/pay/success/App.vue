<template>
  <div class="weui-msg">
    <div class="weui-msg__icon-area">
      <i class="weui-icon-success weui-icon_msg"></i>
    </div>
    <div class="weui-msg__text-area">
      <h2 class="weui-msg__title">支付成功</h2>
      <p class="weui-msg__desc" style="width:80%;margin:0 auto;">恭喜您支付成功，点击下方按钮查看订单详情
      </p>
    </div>
    <div class="weui-msg__opr-area">
      <p class="weui-btn-area">
        <a href="javascript:history.go(-1)" class="weui-btn weui-btn_default">查看订单</a>
      </p>
    </div>
  </div>
</template>

<script>
import '../../../common/js/share';

export default {
};
</script>

