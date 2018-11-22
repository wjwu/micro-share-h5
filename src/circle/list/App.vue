<template>
  <div>
    <div class="title">
      <h1>我的圈子</h1>
    </div>
    <weui-cells>
      <weui-cell-access label="圈子1" empty-body foot="100人">
      </weui-cell-access>
      <weui-cell-access label="圈子2" empty-body foot="100人">
      </weui-cell-access>
    </weui-cells>
  </div>
</template>
<script>
import { WeuiCells, WeuiCellAccess } from '../../common/components';
export default {
  components: {
    WeuiCells,
    WeuiCellAccess
  }
};
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