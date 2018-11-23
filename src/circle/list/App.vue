<template>
  <div>
    <div class="title">
      <h1>我的圈子</h1>
    </div>
    <weui-cells v-if="list && list.length > 0">
      <weui-cell-access :foot="`${item.groupNum}人`" v-for="item in list" :key="item.id" :href="`/circle/detail.html?id=${item.id}`">
        {{item.name}}
      </weui-cell-access>
    </weui-cells>
    <weui-load-more-line v-else></weui-load-more-line>
  </div>
</template>
<script>
import {
  WeuiCells,
  WeuiCellAccess,
  WeuiLoadMoreLine
} from '../../common/components';
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { tryFunc } from '../../common/js/common';

export default {
  components: {
    WeuiCells,
    WeuiCellAccess,
    WeuiLoadMoreLine
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
      let { data } = await axios.get('/circle/myCircle');
      data = data.map(item => {
        if (item.circleMemberDtoList) {
          item.groupNum = item.circleMemberDtoList.length;
        } else {
          item.groupNum = 0;
        }
        return item;
      });
      this.list = data;
    });
  }
};
</script>
<style lang="scss">
.weui-cells {
  margin-top: 0;
}
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
.weui-loadmore_line .weui-loadmore__tips{
  background-color: #f8f8f8;
}
</style>