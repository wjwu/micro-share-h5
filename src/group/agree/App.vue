<template>
  <result title="群审核成功" sub-title="恭喜您通过群审核，具体信息请查询商伴匹配进展列表。您可识别二维码加入部落商伴匹配社群等待匹配或参与经营讨论。">
    <p class="weui-cells__tips" style="color:black;">请长按识别二维码进入社群部落</p>
    <p><img src="./assets/images/WechatIMG978.png" style="width:8rem;height:8rem;" alt=""></p>
    <template slot="buttons">
      <a href="/self/center.html" class="weui-btn weui-btn_default">返回个人中心</a>
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

