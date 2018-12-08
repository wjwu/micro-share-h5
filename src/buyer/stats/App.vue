<template>
  <div>
    <weui-cells>
      <weui-cell label="赠送券总数："></weui-cell>
      <weui-cell label="已核销券总数："></weui-cell>
      <weui-cell label="剩余券总数："></weui-cell>
    </weui-cells>
    <weui-cells>
      <weui-cell label="会员总积分："></weui-cell>
      <weui-cell label="已核销总积分："></weui-cell>
      <weui-cell label="剩余积分："></weui-cell>
    </weui-cells>
    <weui-cells>
      <weui-cell label="会员数量："></weui-cell>
      <weui-cell-access label="会员名单" empty-body empty-foot></weui-cell-access>
    </weui-cells>
  </div>
</template>

<script>
import { WeuiCells, WeuiCell, WeuiCellAccess } from '../../common/components';

export default {
  components: {
    WeuiCells,
    WeuiCell,
    WeuiCellAccess
  }
};
</script>

<style lang="scss">
.weui-label{
  width: 120px !important;
}
</style>


