<template>
  <div v-if="showApp">
    <weui-cells>
      <weui-cell label="赠送券总数：">{{data.sendedNums}}</weui-cell>
      <weui-cell label="已核销券总数：">{{data.usedNums}}</weui-cell>
      <weui-cell label="剩余券总数：">{{data.sendedNums - data.usedNums}}</weui-cell>
    </weui-cells>
    <weui-cells>
      <weui-cell label="会员总积分：">{{data.totalScore}}</weui-cell>
      <weui-cell label="已核销总积分：">{{data.totalUsedScore}}</weui-cell>
      <weui-cell label="剩余积分：">{{data.totalScore - data.totalUsedScore}}</weui-cell>
    </weui-cells>
    <weui-cells>
      <weui-cell label="会员数量：">{{data.totalMember}}</weui-cell>
      <a class="weui-cell weui-cell_access" href="/buyer/member.html">
        <div class="weui-cell__hd">
          <img
            src="./assets/images/vip.png"
            style="width:20px;margin-right:5px;display:block"
          >
        </div>
        <div class="weui-cell__bd">
          <p>会员名单</p>
        </div>
        <div class="weui-cell__ft"></div>
      </a>
    </weui-cells>
  </div>
</template>

<script>
import { WeuiCells, WeuiCell, WeuiCellAccess } from "../../common/components";
import { tryFunc } from "../../common/js/common";
import axios from "../../common/js/axios";

export default {
  data() {
    return {
      showApp: false,
      data: {
        sendedNums: 0,
        usedNums: 0,
        totalScore: 0,
        totalUsedScore: 0,
        totalMember: 0
      }
    };
  },
  mounted() {
    tryFunc(async () => {
      this.showApp = true;
      const { data } = await axios.get("/shop/data");
      this.data = data;
    });
  },
  components: {
    WeuiCells,
    WeuiCell,
    WeuiCellAccess
  }
};
</script>

<style lang="scss">
.weui-label {
  width: 120px !important;
}
</style>


