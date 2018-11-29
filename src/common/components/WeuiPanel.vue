<template>
  <div class="weui-panel">
    <div class="weui-panel__hd" v-if="label">
      {{label}}
    </div>
    <div class="weui-panel__bd">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label']
};
</script>
