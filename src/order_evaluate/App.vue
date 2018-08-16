<template>
  <div>
    <!-- <div class="title">
      <h1>订单评价</h1>
    </div> -->
    <div class="weui-cells__title">打分</div>
    <rate :length="5" />
    <div class="weui-cells__title">评价</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="weui-textarea" placeholder="内容" rows="3"></textarea>
          <div class="weui-textarea-counter">
            <span>0</span>/200</div>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:">提交</a>
    </div>
  </div>
</template>

<style lang="scss">
.Rate {
  padding: 7px 0 !important;
  background-color: #fff !important;
}
.Rate__star {
  outline: none !important;
}
.icon{
  height: 20px !important;
  width: 20px !important;
}
</style>

