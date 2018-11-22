<template>
  <div>
    <div class="title">
      <h1>xxx圈子</h1>
    </div>
    <weui-cells>
      <!-- <weui-cell label="名称："></weui-cell> -->
      <weui-cell label="人数："></weui-cell>
      <weui-cell label="行业："></weui-cell>
    </weui-cells>
    <weui-cells-title>圈子成员</weui-cells-title>
    <weui-cells>
      <weui-cell>
        <div class="member">
          <img src="../../vip/shopper/assets/images/newuser.png">
          <label>成员1</label>
        </div>
      </weui-cell>
      <weui-cell>
        <div class="member">
          <img src="../../vip/shopper/assets/images/newuser.png">
          <label>成员2</label>
        </div>
      </weui-cell>
      <weui-cell>
        <div class="member">
          <img src="../../vip/shopper/assets/images/newuser.png">
          <label>成员3</label>
        </div>
      </weui-cell>
    </weui-cells>
    <weui-cells-title>审核通过成员</weui-cells-title>
    <weui-cells>
      <weui-cell>
        <div class="member">
          <img src="../../vip/shopper/assets/images/newuser.png">
          <label>成员1</label>
        </div>
      </weui-cell>
      <weui-cell>
        <div class="member">
          <img src="../../vip/shopper/assets/images/newuser.png">
          <label>成员2</label>
        </div>
      </weui-cell>
      <weui-cell>
        <div class="member">
          <img src="../../vip/shopper/assets/images/newuser.png">
          <label>成员3</label>
        </div>
      </weui-cell>
    </weui-cells>
  </div>
</template>

<script>
import { WeuiCells, WeuiCell, WeuiCellsTitle } from '../../common/components';
export default {
  components: {
    WeuiCells,
    WeuiCell,
    WeuiCellsTitle
  }
};
</script>

<style lang="scss">
.member {
  display: flex;
  align-items: center;
  img {
    margin-right: 1rem;
    width: 1.75rem;
    height: 1.75rem;
  }
}
</style>

