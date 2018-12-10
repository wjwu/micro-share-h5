<template>
  <div class="weui-mask weui-animate-fade-in" v-show="visible">
    <div class="weui-dialog">
      <div class="weui-dialog__hd"><strong class="weui-dialog__title">请输入核销积分</strong></div>
      <div class="weui-dialog__bd">
        <input type="number" :class="{'tip':showTip}" @input="handleInput" v-model="score"/>
        <div class="text-tip" v-show="showTip">核销积分不能为空且大于{{max}}</div>
      </div>
      <div class="weui-dialog__ft">
        <a href="javascript:;" @click="handleCancel" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
        <a href="javascript:;" @click="handleOk" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    max: {
      type: Number
    },
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      score: '',
      showTip: false
    };
  },
  mounted() {
    if (this.visible) {
      document.body.style.overflow = 'hidden';
    }
  },
  methods: {
    handleInput(e) {
      if (e.target.value) {
        this.showTip = false;
      } else {
        this.showTip = true;
      }
      const value = Number(e.target.value);
      if (value && value > this.max) {
        this.showTip = true;
      } else {
        this.showTip = false;
      }
    },
    handleOk(e) {
      if (!this.score || Number(this.score) > this.max) {
        this.showTip = true;
        return;
      }
      document.body.style.overflow = 'auto';
      this.$emit('update:visible', false);
      this.$emit('ok', this.score);
      e.stopPropagation();
    },
    handleCancel(e) {
      document.body.style.overflow = 'auto';
      this.$emit('update:visible', false);
      e.stopPropagation();
    }
  }
};
</script>

<style lang="scss">
.weui-dialog__bd {
  input {
    padding: 4px 5px;
    border: 1px solid #dedede;
    border-radius: 5px;
    width: 100%;
    outline: none;
    font-size: 0.875rem;
  }
  .tip {
    border: 1px solid #e64340;
  }

  .text-tip {
    color: #e64340;
  }
}
</style>
