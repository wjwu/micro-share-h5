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
      <a href="/group/enter.html" class="weui-tabbar__item" :class="{'weui-bar__item_on':activeIndex===2}">
        <img src="./assets/images/users.png" alt="" class="weui-tabbar__icon">
        <p class="weui-tabbar__label">我的商伴</p>
      </a>
      <a href="/vip/shopper.html" class="weui-tabbar__item" :class="{'weui-bar__item_on':activeIndex===3}">
        <img src="./assets/images/manager.png" alt="" class="weui-tabbar__icon">
        <p class="weui-tabbar__label">我的管家</p>
      </a>
      <a href="/message.html" class="weui-tabbar__item" :class="{'weui-bar__item_on':activeIndex===4}">
        <img src="./assets/images/message.png" alt="" class="weui-tabbar__icon">
        <p class="weui-tabbar__label">我的消息</p>
      </a>
      <a href="/self/center.html" class="weui-tabbar__item" :class="{'weui-bar__item_on':activeIndex===5}">
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


