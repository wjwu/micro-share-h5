<template>
  <div>
    <div class="weui-tab">
      <div class="weui-navbar fix">
        <div class="weui-navbar__item" :class="{'weui-bar__item_on':selectedTab==='group'}" @click="selectedTab = 'group'">用途与场景</div>
        <div class="weui-navbar__item" :class="{'weui-bar__item_on':selectedTab==='shelves'}" @click="selectedTab = 'shelves'">主要功能</div>
      </div>
      <div class="weui-tab__panel" v-if="selectedTab==='group'">
        <b>适合成员：</b>
        <br>
        <li>有竞争力产品的实体店，打算开通网上商城，进一步将自己产品推向更多周边社区客户群体的成员；</li>
        <li>有独特的产品在网上售卖，想要实现更好引流/宣传/销售，拥有更多客户和收入的成员；</li>
        <li>有意愿通过圈子内资源互补与结伴，更进一步扩大自己产品宣传和销售渠道的成员。</li>
        <b>用途场景：</b>
        <br>
        <img src="http://static.fangzhoubuluo.com/newuse1.png">
        <img src="http://static.fangzhoubuluo.com/newuse2.png">
        <img src="http://static.fangzhoubuluo.com/newuse3.png">
        <img src="http://static.fangzhoubuluo.com/newuse4.png">
        <img src="http://static.fangzhoubuluo.com/newuse5.png">
      </div>
      <div class="weui-tab__panel" v-if="selectedTab==='shelves'">
        <b>主要功能：</b><br>
        <img src="http://static.fangzhoubuluo.com/prod1.png">
        <img src="http://static.fangzhoubuluo.com/prod2.png">
        <img src="http://static.fangzhoubuluo.com/prod3.png">
        <img src="http://static.fangzhoubuluo.com/prod4.png">
      </div>
      <div class="page__bd page__bd_spacing" style="padding: 2rem;">
        <a href="javascript:history.back(-1);" class="weui-btn weui-btn_default">返回</a>
      </div>
    </div>
  </div>
</template>

<script>
import '../../common/js/share';

export default {
  data() {
    return {
      selectedTab: 'group'
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

.fix {
  position: fixed;
}
</style>

