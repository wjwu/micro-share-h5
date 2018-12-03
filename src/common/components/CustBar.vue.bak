<template>
  <div class="cust-bar">
    <a class="active" href="#">
      <i class="fa fa-home"></i>
      <p>首页</p>
    </a>
    <a href="#">
      <i class="fa fa-shopping-cart"></i>
      <p>购物车</p>
    </a>
    <a href="#">
      <i class="fa fa-user"></i>
      <p>我的</p>
    </a>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.cust-bar {
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  height: 3.125rem;
  background-color: #fff;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #c0bfc4;
    color: #c0bfc4;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }

  .active {
    color: #333;
  }

  a {
    padding-top: 5px;
    i {
      font-size: 1.5rem;
    }
    color: #999;
    flex: 1;
    text-align: center;
    display: block;
    font-size: 0.75rem;
    p {
      padding-top: 2px;
    }
  }
}
</style>


