<template>
  <a class="weui-btn" :class="[`weui-btn_${type}`,{'weui-btn_mini':mini},{'weui-btn_disabled':disabled}]" :href="href" @click="$emit('click')">
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    mini: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: 'javascript:;'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

