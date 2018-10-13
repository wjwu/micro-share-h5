<template>
  <a class="weui-cell weui-cell_access" :href="href" @click="$emit('click')">
    <div class="weui-cell__hd" v-if="label">
      <label class="weui-label">
        {{label}}
      </label>
    </div>
    <div class="weui-cell__bd" v-if="$slots.default">
      <slot></slot>
    </div>
    <div class="weui-cell__ft" v-if="foot">
      {{foot}}
    </div>
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: 'javascript:;'
    },
    label: {
      type: String
    },
    foot: {
      type: String
    }
  }
};
</script>

