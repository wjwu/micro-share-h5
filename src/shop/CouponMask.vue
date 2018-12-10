<template>
  <div class="mask" @click="handleMaskClick" v-show="visible">
    <div class="coupon" @click="handleClick">
      <span class="symbol">￥</span>
      <span class="price">{{price}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: String
    },
    visible: {
      type: Boolean
    }
  },
  mounted() {
    if (this.visible) {
      document.body.style.overflow = 'hidden';
    }
  },
  methods: {
    handleClick(e) {
      document.body.style.overflow = 'auto';
      this.$emit('update:visible', false);
      this.$emit('click');
      e.stopPropagation();
    },
    handleMaskClick(e) {
      document.body.style.overflow = 'auto';
      this.$emit('update:visible', false);
      e.stopPropagation();
    }
  }
};
</script>

<style lang="scss">
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.7);

  .coupon {
    margin: 50% auto 0;
    width: 170px;
    height: 200px;
    background: url('./assets/images/coupon.png') no-repeat;
    background-position: 50%;
    color: #fff;
    font-size:0;
    padding-top: 0.8rem;
    text-align: center;

    .symbol {
      font-size: 2rem;
    }

    .price {
      font-size: 4rem;
    }
  }
}
</style>


