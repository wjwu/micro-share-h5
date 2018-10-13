<template>
  <div class="weui-cell weui-cell_select weui-cell_select-after">
    <div class="weui-cell__hd" v-if="label">
      <label class="weui-label">{{label}}</label>
    </div>
    <div class="weui-cell__bd">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ['label']
};
</script>

