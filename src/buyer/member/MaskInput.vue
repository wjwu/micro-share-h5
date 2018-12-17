<template>
  <div class="weui-mask weui-animate-fade-in" v-show="visible">
    <div class="weui-dialog">
      <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>
      <div class="weui-dialog__bd">
        <input type="number" pattern="[0-9]*" @textInput="handleInput" v-model="score" />
        <div class="text-tip" >{{tip}}不能为空且大于{{max}}</div>
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
    title: {
      type: String
    },
    tip: {
      type: String
    },
    max: {
      type: Number
    },
    visible: {
      type: Boolean
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      score: ''
    };
  },
  watch: {
    value(curVal) {
      this.score = curVal;
    }
  },
  created() {
    if (this.value) {
      this.score = this.value;
    }
  },
  mounted() {
    if (this.visible) {
      document.body.style.overflow = 'hidden';
    }
  },
  methods: {
    handleInput(e) {
      const reg = /^[0-9]$/;
      if (!reg.test(e.data)) {
        e.preventDefault();
        return;
      }
      if (Number(this.score + e.data.toString()) > Number(this.max)) {
        e.preventDefault();
      }
    },
    handleOk(e) {
      if (!this.score || Number(this.score) > this.max) {
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
    margin-top:5px;
    // color: #e64340;
  }
}
</style>
