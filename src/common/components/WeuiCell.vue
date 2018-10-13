<template>
  <div class="weui-cell">
    <div class="weui-cell__hd" v-if="$slots.head || $slots.headLabel">
      <slot name="head" v-if="$slots.head"></slot>
      <label v-else class="weui-label">
        <slot name="headLabel"></slot>
      </label>
    </div>
    <div class="weui-cell__bd">
      <slot></slot>
    </div>
    <div class="weui-cell__ft" v-if="$slots.foot">
      <slot name="foot"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

