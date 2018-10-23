<template>
  <result type="fail" title="没有微信群" sub-title="没发现您有自己的微信群，请长按识别二维码添加审核机器人，并将机器人拉入您参与匹配的微信群中。">
    <p><img src="http://static.fangzhoubuluo.com/qrcode/review.jpg" style="width:15rem;height:15rem;" alt=""></p>
    <template slot="buttons">
      <a href="/self/center.html" class="weui-btn weui-btn_default">返回个人中心</a>
    </template>
  </result>
</template>

<script>
import Result from '../common/components/Result';

export default {
  components: {
    Result
  }
};
</script>
