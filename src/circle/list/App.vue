<template>
  <div>
    <div class="title">
      <h1>我的圈子</h1>
    </div>
    <weui-cells>
      <weui-cell-access :label="item.name" empty-body foot="100人" v-for="item in list" :key="item.id" :href="`/circle/detail.html?id=${item.id}`">
      </weui-cell-access>
    </weui-cells>
  </div>
</template>
<script>
import { WeuiCells, WeuiCellAccess } from '../../common/components';
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { tryFunc } from '../../common/js/common';

export default {
  components: {
    WeuiCells,
    WeuiCellAccess
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
      const { data } = await axios.get('/circle/myCircle');
      this.list = data;
    });
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