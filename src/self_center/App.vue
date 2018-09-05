<template>
  <div class="main">
    <div class="hd">
      <div class="avatar"></div>
    </div>
    <div class="bd"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.main {
  .hd {
    height: 11.5625rem;
    background: url('./assets/images/timg.jpg') no-repeat;
    background-size: cover;

    &:after {
      content: '';
      width: 100%;
      height: 11.5625rem;
      position: absolute;
      left: 0;
      top: 0;
      background: inherit;
      background-size: cover;
      filter: blur(2px);
      z-index: 2;
    }
    .avatar {
      
    }
  }
}
</style>


