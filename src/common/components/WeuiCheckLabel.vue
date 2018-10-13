<template>
  <label class="weui-cell weui-check__label" :for="id">
    <div class="weui-cell__hd">
      <input type="checkbox" class="weui-check" @click="handleClick($event)" :id="id" :checked="checked">
      <i class="weui-icon-checked"></i>
    </div>
    <div class="weui-cell__bd">
      <slot></slot>
    </div>
  </label>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'checked'
  },
  methods: {
    handleClick(e) {
      this.$emit('input', e.target.checked);
      this.$emit('click', this.id, e.target.checked);
    }
  }
};
</script>

