<template>
  <ul class="nav-head">
    <li><a href="/job.html">招揽英才</a></li>
    <li><a href="/contact.html">联系我们</a></li>
    <li><a href="/about.html">关于我们</a></li>
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
  background-color: #f8f8f8;
  border-bottom: 1px solid #ccc;
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
      content: '';
      width: 1px;
      height: 17px;
      color: #ccc;
      background-color: #ccc;
    }

    a {
      color: #333;
    }
  }
}
</style>


