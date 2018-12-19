<template>
  <ul class="nav-head">
    <li>
      <a href="/show/huojiayongtu.html">货架专属</a>
    </li>
    <li>
      <a href="/show/shangbanyongtu.html">商伴专属</a>
    </li>
    <li>
      <a href="/about.html">关于我们</a>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style lang="scss">
.nav-head {
  position: fixed;
  z-index: 99;
  top: 0;
  height: 50px;
  width: 100%;
  background-color: red;
  // border-bottom: 1px solid #ccc;
  li {
    padding: 0 0.6rem;
    float: right;
    height: 50px;
    font-size: 1.125rem;
    line-height: 50px;

    &:first-of-type {
      &::after {
        display: none;
      }
    }
    &::after {
      display: inline-block;
      position: relative;
      top: 2px;
      left: 0.6rem;
      content: "";
      width: 1px;
      height: 17px;
      color: #fff;
      background-color: #fff;
    }

    a {
      color: #fff;
    }
  }
}
</style>


