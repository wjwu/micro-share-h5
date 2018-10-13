<template>
  <a class="weui-btn" :class="[`weui-btn_${type}`,{'weui-btn_mini':mini}]" :href="href" @click="$emit('click')">
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
    }
  }
};
</script>

