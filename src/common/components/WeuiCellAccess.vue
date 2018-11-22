<template>
  <a class="weui-cell weui-cell_access" :href="href" @click="$emit('click')">
    <div class="weui-cell__hd" v-if="$slots.head || label">
      <slot name="head" v-if="$slots.head"></slot>
      <label class="weui-label" v-else>
        {{label}}
      </label>
    </div>
    <div class="weui-cell__bd" v-if="$slots.default || emptyBody">
      <slot></slot>
    </div>
    <div class="weui-cell__ft" v-if="foot || emptyFoot">
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
      type: String,
      default: ''
    },
    emptyBody: {
      type: Boolean,
      default: false
    },
    emptyFoot: {
      type: Boolean,
      default: false
    }
  }
};
</script>

