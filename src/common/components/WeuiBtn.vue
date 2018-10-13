<template>
  <a class="weui-btn" :class="`weui-btn_${type}`" :href="href" @click="$emit('click')">
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
    href: {
      type: String,
      default: 'javascript:;'
    }
  }
};
</script>

