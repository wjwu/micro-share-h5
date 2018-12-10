<template>
  <div v-if="showApp">
    <div class="title">
      <h1>我的邀请</h1>
    </div>
    <div v-for="(item,i) in list" :key="i">
      <weui-cells-title>{{item.shopName}}</weui-cells-title>
      <weui-cells>
        <weui-cell v-for="inviter in item.inviters" :key="inviter">
          {{inviter}}
        </weui-cell>
      </weui-cells>
    </div>

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
      list: []
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get('/user/inviters');
      for (let prop in data) {
        this.list.push({
          shopName: prop,
          inviters: data[prop].split(',')
        });
      }
    });
  }
};
</script>

