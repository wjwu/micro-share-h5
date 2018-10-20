<template>
  <label class="weui-cell weui-check__label" :for="id">
    <div class="weui-cell__hd" v-if="type==='checkbox'">
      <input type="checkbox" class="weui-check" @click="handleClick($event)" :id="id" :checked="checked">
      <i class="weui-icon-checked"></i>
    </div>
    <div class="weui-cell__bd">
      <slot></slot>
    </div>
    <div class="weui-cell__ft" v-if="type==='radio'">
      <input type="radio" class="weui-check" @change="handleClick($event)" :id="id" :name="name">
      <span class="weui-icon-checked"></span>
    </div>
  </label>
</template>

<script>
export default {
  props: {
    id: {
      required: true
    },
    name: {
      type: String
    },
    checked: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'checkbox'
    }
  },
  model: {
    prop: 'checked'
  },
  methods: {
    handleClick(e) {
      this.$emit('input', e.target.checked);
      if (this.type === 'checkbox') {
        this.$emit('click', this.id, e.target.checked);
      } else {
        this.$emit('change', this.id, e.target.checked);
      }
    }
  }
};
</script>

