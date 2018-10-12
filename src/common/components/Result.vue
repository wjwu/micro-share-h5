<template>
  <div class="weui-msg">
    <div class="weui-msg__icon-area">
      <i class="weui-icon-success weui-icon_msg" :class="{'weui-icon-success':type==='success','weui-icon-cancel':type==='fail'}"></i>
    </div>
    <div class="weui-msg__text-area">
      <h2 class="weui-msg__title">{{title}}</h2>
      <p class="weui-msg__desc" style="width:80%;margin:0 auto;">{{subTitle}}
      </p>
      <slot></slot>
    </div>
    <div class="weui-msg__opr-area">
      <p class="weui-btn-area">
        <slot name="buttons"></slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'success'
    },
    title: {
      type: String
    },
    subTitle: {
      type: String
    }
  }
};
</script>

