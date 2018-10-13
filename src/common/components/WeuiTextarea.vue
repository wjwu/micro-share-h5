<template>
  <div>
    <textarea class="weui-textarea" v-bind="$attrs" @input="handleChange"></textarea>
    <div class="weui-textarea-counter" v-if="$attrs['maxlength']">
      <span>{{length}}</span>/{{$attrs['maxlength']}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  model: {
    prop: 'value'
  },
  data() {
    return {
      length: 0
    };
  },
  methods: {
    handleChange(e) {
      this.length = e.target.value.length;
      this.$emit('input', e.target.value);
    }
  }
};
</script>

