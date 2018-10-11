<template>
  <div class="weui-msg">
    <div class="weui-msg__icon-area">
      <i class="weui-icon-success weui-icon_msg"></i>
    </div>
    <div class="weui-msg__text-area">
      <h2 class="weui-msg__title">支付成功</h2>
      <p class="weui-msg__desc" style="width:80%;margin:0 auto;">您购买的管家服务已经成功开通，具体信息请查询个人账户。请您自动识别二维码添加人工客服为您服务。
      </p>
      <p><img src="./assets/images/WechatIMG978.png" style="width:12rem;height:12rem;" alt=""></p>
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
import Back from '../common/components/Back';
import '../common/js/share';

export default {
  components: {
    Back
  }
};
</script>

