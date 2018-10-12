<template>
  <result title="支付成功" sub-title="您购买的管家服务已经成功开通，具体信息请查询个人账户。请您自动识别二维码添加人工客服为您服务。">
    <p><img src="./assets/images/WechatIMG978.png" style="width:12rem;height:12rem;" alt=""></p>
    <template slot="buttons">
      <a href="/self/center.html" class="weui-btn weui-btn_default">返回个人中心</a>
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

