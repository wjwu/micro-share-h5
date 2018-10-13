<template>
  <a class="weui-cell weui-cell_access" :href="href">
    <div class="weui-cell__hd">
      <label class="weui-label">
        {{label}}
      </label>
    </div>
    <div class="weui-cell__bd">
      <slot></slot>
    </div>
    <div class="weui-cell__ft">
      {{foot}}
    </div>
  </a>
</template>

<script>
export default {
  props: ['href', 'label', 'foot']
};
</script>

