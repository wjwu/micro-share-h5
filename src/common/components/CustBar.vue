<template>
  <div class="weui-tab">
    <div class="weui-tab__panel">
      <slot></slot>
    </div>
    <div class="weui-tabbar">
      <a href="/" class="weui-tabbar__item" :class="{'weui-bar__item_on':activeIndex===1}">
        <img src="./assets/images/home.png" alt="" class="weui-tabbar__icon">
        <p class="weui-tabbar__label">首页</p>
      </a>
      <a href="/cart.html" class="weui-tabbar__item" :class="{'weui-bar__item_on':activeIndex===2}">
        <img src="./assets/images/shopping-cart.png" alt="" class="weui-tabbar__icon">
        <p class="weui-tabbar__label">购物车</p>
      </a>
      <a href="/self/center.html" class="weui-tabbar__item" :class="{'weui-bar__item_on':activeIndex===3}">
        <img src="./assets/images/user.png" alt="" class="weui-tabbar__icon">
        <p class="weui-tabbar__label">我的</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeIndex: {
      type: Number
    }
  }
};
</script>

<style lang="scss">
.weui-tabbar {
  position: fixed;
  bottom: 0;
}
</style>


