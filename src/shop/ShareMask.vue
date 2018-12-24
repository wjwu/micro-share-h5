<template>
  <div class="mask" @click="handleMaskClick" v-show="visible">
    <img src="./assets/images/share.png" />
  </div>
</template>

<script>
export default {
  props: {
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

  img {
    width: 90%;
  }
}
</style>