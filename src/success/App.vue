<template>
  <result :title="type ? '客服&机器人' : '支付成功'" sub-title="您购买的管家服务已经成功开通，具体信息请查询个人账户。请您识别二维码分别添加管家机器人与添加人工客服。">
    <p class="weui-cells__tips" style="color:black;">请您长按二维码识别并添加管家机器人：</p>
    <p><img src="./assets/images/WechatIMG978.png" style="width:8rem;height:8rem;" alt=""></p>
    <p class="weui-cells__tips" style="color:black;">请您长按二维码识别并添加人工客服服务：</p>
    <p><img src="./assets/images/WechatIMG978.png" style="width:8rem;height:8rem;" alt=""></p>
    <template slot="buttons">
      <a href="/self/center.html" class="weui-btn weui-btn_default">返回个人中心</a>
    </template>
  </result>
</template>

<script>
import '../common/js/share';
import Result from '../common/components/Result';
import { getQueryString } from '../common/js/common';

export default {
  data() {
    return {
      type: getQueryString('type')
    };
  },
  components: {
    Result
  }
};
</script>

