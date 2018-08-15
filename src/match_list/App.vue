<template>
  <div class="weui-tab">
    <div class="weui-navbar">
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selectedIdx ===0}" @click="selectedIdx=0">
        全部
      </div>
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selectedIdx ===1}" @click="selectedIdx=1">
        匹配中
      </div>
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selectedIdx ===2}" @click="selectedIdx=2">
        匹配成功
      </div>
      <div class="weui-navbar__item" :class="{'weui-bar__item_on':selectedIdx ===3}" @click="selectedIdx=3">
        交易成功
      </div>
    </div>
    <div class="weui-tab__panel">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedIdx: 0
    };
  },
  methods: {}
};
</script>

