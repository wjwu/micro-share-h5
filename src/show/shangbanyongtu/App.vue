<template>
  <div>
    <div class="weui-tab">
      <div class="weui-navbar">
        <div
          class="weui-navbar__item"
          :class="{'weui-bar__item_on':selectedTab==='group'}"
          @click="selectedTab = 'group'"
        >用途与场景</div>
        <div
          class="weui-navbar__item"
          :class="{'weui-bar__item_on':selectedTab==='shelves'}"
          @click="selectedTab = 'shelves'"
        >主要功能</div>
      </div>
      <div class="weui-tab__panel" v-if="selectedTab==='group'">
        <b>适合成员：</b>
        <br>
        有自己有竞争力的产品或服务，有自己一定客户群体，想立足于附近1KM-5KM范围社区逐步引流，长期做深、做细、做透市场，但缺乏有效的拓客/引流工具以及宣传、销售渠道，苦于无法进一步将周边社区消费者“勾引”到店的成员。
        <br>
        <img src="http://static.fangzhoubuluo.com/part1.png">
        <img src="http://static.fangzhoubuluo.com/part2.png">
        <img src="http://static.fangzhoubuluo.com/part3.png">
        <img src="http://static.fangzhoubuluo.com/part4.png">
      </div>
      <div class="weui-tab__panel" v-if="selectedTab==='shelves'">
        <b>主要功能：</b><br>
        <img src="http://static.fangzhoubuluo.com/part5.png">
        <img src="http://static.fangzhoubuluo.com/part6.png">
        <img src="http://static.fangzhoubuluo.com/part7.png">
      </div>
      <div class="page__bd page__bd_spacing" style="padding: 2rem;">
        <a href="javascript:history.back(-1);" class="weui-btn weui-btn_default">返回</a>
      </div>
    </div>
  </div>
</template>

<script>
import "../../common/js/share";

export default {
  data() {
    return {
      selectedTab: "group"
    };
  }
};
</script>

<style lang="scss">
.weui-tab__panel {
  padding: 50px 1.5rem;

  img {
    width: 100%;
  }
}
.weui-loadmore__tips {
  background-color: #f8f8f8 !important;
}

.weui-cell__ft {
  line-height: 0;
}
</style>

