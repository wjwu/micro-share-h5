<template>
  <div class="back" v-if="isShow" @click="handleClick"></div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  mounted() {
    const agent = window.navigator.userAgent.split(' ');
    if (agent.indexOf('Android') > 0 && !!document.referrer) {
      this.isShow = true;
    }
  },
  methods: {
    handleClick() {
      window.history.go(-1);
    }
  }
};
</script>

<style lang="scss">
.back {
  position: fixed;
  left: 1rem;
  bottom: 3.5rem;
  width: 3rem;
  height: 3rem;
  background: url('./assets/images/back.png') no-repeat 50%/2rem;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: #888 1px 1px 5px;
}
</style>


