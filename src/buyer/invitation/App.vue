<template>
  <div v-if="showApp">
    <weui-cells-title>我的邀请</weui-cells-title>
    <weui-cells>
      <weui-cell v-for="(item,i) in inviters" :key="i">
        {{item}}
      </weui-cell>
    </weui-cells>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { tryFunc } from '../../common/js/common';
import { WeuiCells, WeuiCell, WeuiCellsTitle } from '../../common/components';
import '../../common/js/share';
export default {
  components: {
    WeuiCells,
    WeuiCell,
    WeuiCellsTitle
  },
  data() {
    return {
      showApp: false,
      inviters: []
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get('/user/inviters');
      this.inviters = data;
    });
  }
};
</script>

