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
    <weui-panel label="圈子成员">
      <div class="weui-media-box weui-media-box_small-appmsg">
        <weui-cells>
          <weui-cell>
            <template slot="head">
              <img src="../../vip/shopper/assets/images/newuser.png">
            </template>
            <p>成员1</p>
          </weui-cell>
          <weui-cell>
            <template slot="head">
              <img src="../../vip/shopper/assets/images/newuser.png">
            </template>
            <p>成员2</p>
          </weui-cell>
          <weui-cell>
            <template slot="head">
              <img src="../../vip/shopper/assets/images/newuser.png">
            </template>
            <p>成员3</p>
          </weui-cell>
        </weui-cells>
      </div>
    </weui-panel>
   <weui-panel label="审核通过成员">
      <div class="weui-media-box weui-media-box_small-appmsg">
        <weui-cells>
          <weui-cell>
            <template slot="head">
              <img src="../../vip/shopper/assets/images/newuser.png">
            </template>
            <p>成员1</p>
          </weui-cell>
          <weui-cell>
            <template slot="head">
              <img src="../../vip/shopper/assets/images/newuser.png">
            </template>
            <p>成员2</p>
          </weui-cell>
          <weui-cell>
            <template slot="head">
              <img src="../../vip/shopper/assets/images/newuser.png">
            </template>
            <p>成员3</p>
          </weui-cell>
        </weui-cells>
      </div>
    </weui-panel>
  </div>
</template>

<script>
import {
  WeuiCells,
  WeuiCell,
  WeuiCellsTitle,
  WeuiPanel
} from '../../common/components';
export default {
  components: {
    WeuiCells,
    WeuiCell,
    WeuiCellsTitle,
    WeuiPanel
  }
};
</script>

<style lang="scss">
img {
  margin-right: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
}
/*.member {
  display: flex;
  align-items: center;
  img {
    margin-right: 1rem;
    width: 1.75rem;
    height: 1.75rem;
  }
}*/
</style>

