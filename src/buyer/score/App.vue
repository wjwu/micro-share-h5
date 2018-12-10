<template>
  <div v-if="showApp">
    <div class="title">
      <h1>我的积分</h1>
    </div>
    <div  v-for="item in scores" :key="item">
      <weui-cells-title>{{item.shopName}}</weui-cells-title>
      <weui-cells>
        <weui-cell>积分：{{item.score}}</weui-cell>
      </weui-cells>
    </div>
  </div>
</template>

<script>
import axios from "../../common/js/axios";
import format from "date-fns/format";
// import { auth } from '../../common/js/auth';
import { tryFunc } from "../../common/js/common";
import "../../common/js/share";
import { WeuiCells, WeuiCell, WeuiCellsTitle } from "../../common/components";

export default {
  components: {
    WeuiCells,
    WeuiCell,
    WeuiCellsTitle
  },
  data() {
    return {
      showApp: false,
      scores: []
    };
  },
  mounted() {
    tryFunc(async () => {
      //await auth();
      this.showApp = true;
      const { data } = await axios.get("/buyer/score");
      this.scores = data;
    });
  },
  filters: {
    time: val => {
      return format(val, "YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style lang="scss">
.weui-media-box {
  h4 {
    color: #000 !important;
  }
}
</style>



