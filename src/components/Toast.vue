<template>
  <div id="toast" style="opacity: 0; display: none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <!-- <i class="weui-icon-success-no-circle weui-icon_toast"></i> -->
      <p class="weui-toast__content">{{message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  },
  duration: {
    type: Number,
    default: 2000
  }
};
</script>

