<template>
  <div class="weui-tab">
    <div class="weui-tab__panel">
      <slot></slot>
    </div>
    <div class="weui-tabbar">
      <a :href="`/shop.html?userId=${userId}`" class="weui-tabbar__item" :class="{'weui-bar__item_on':activeIndex===1}">
        <img src="./assets/images/home.png" alt="" class="weui-tabbar__icon">
        <p class="weui-tabbar__label">首页</p>
      </a>
      <a href="/buyer/cart.html" class="weui-tabbar__item" :class="{'weui-bar__item_on':activeIndex===2}">
        <span style="display: inline-block;position: relative;">
          <img src="./assets/images/package.png" alt="" class="weui-tabbar__icon">
          <span class="weui-badge" style="position: absolute;top: -2px;right: -13px;" v-if="cartCount">{{cartCount}}</span>
        </span>
        <p class="weui-tabbar__label">背篓</p>
      </a>
      <a href="/buyer/account.html" class="weui-tabbar__item" :class="{'weui-bar__item_on':activeIndex===3}">
        <img src="./assets/images/user.png" alt="" class="weui-tabbar__icon">
        <p class="weui-tabbar__label">我的</p>
      </a>
    </div>
  </div>
</template>

<script>
import { getQueryString } from '../../common/js/common';
export default {
  props: {
    activeIndex: {
      type: Number
    }
  },
  data() {
    return {
      cartCount: '',
      userId: ''
    };
  },
  created() {
    const userId = getQueryString('userId');
    if (userId) {
      localStorage.setItem('visitShopUserId', userId);
      this.userId = userId;
    } else {
      this.userId = localStorage.getItem('visitShopUserId');
    }
    this.updateCartCount();
  },
  methods: {
    updateCartCount() {
      const strCart = localStorage.getItem(`cart_${this.userId}`);
      if (strCart) {
        const cart = JSON.parse(strCart);
        let count = 0;
        for (let product of cart) {
          count += Number(product.count);
        }
        this.cartCount = count;
      }
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


