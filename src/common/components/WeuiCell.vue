<template>
  <div class="weui-cell">
    <div class="weui-cell__hd" v-if="$slots.head || label">
      <slot name="head" v-if="$slots.head"></slot>
      <label v-else class="weui-label">
        {{label}}
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
export default {
  props: ['label']
};
</script>

