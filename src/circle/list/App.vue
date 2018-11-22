<template>
  <div class="weui-panel">
    <div class="weui-panel__hd">
      <label>圈子名称</label>
      <label>人数</label>
    </div>
    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_text">
        <p class="weui-media-box__desc">
          <label>圈子名称</label>
          <label>人数</label>
        </p>
      </div>
      <div class="weui-media-box weui-media-box_text">
        <p class="weui-media-box__desc">
          <label>圈子名称</label>
          <label>人数</label>
        </p>
      </div>
      <div class="weui-media-box weui-media-box_text">
        <p class="weui-media-box__desc">
          <label>圈子名称</label>
          <label>人数</label>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.weui-panel__hd {
  display: flex;
  label {
    flex: 1;
    font-weight: bold;
    text-align: center;
  }
}
.weui-media-box__desc {
  display: flex;
  label {
    flex: 1;
    text-align: center;
  }
}
.weui-panel__hd:after {
  left: 0;
}
.weui-media-box:before {
  left: 0;
}
</style>