<template>
  <div class="weui-msg">
    <div class="weui-msg__icon-area">
      <i class="weui-icon-cancel weui-icon_msg"></i>
    </div>
    <div class="weui-msg__text-area">
      <h2 class="weui-msg__title">支付失败</h2>
      <p class="weui-msg__desc" style="width:80%;margin:0 auto;">抱歉支付失败，请稍后再试或联系客服
      </p>
    </div>
    <div class="weui-msg__opr-area">
      <p class="weui-btn-area">
        <a href="javascript:history.go(-1)" class="weui-btn weui-btn_default">返回支付页面</a>
      </p>
    </div>
  </div>
</template>

<script>
import '../common/js/share';

export default {
};
</script>

