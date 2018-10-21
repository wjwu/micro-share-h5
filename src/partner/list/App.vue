<template>
  <div v-if="showApp">
    <weui-cells-title>1、点击“删除”为单向删除对方</weui-cells-title>
    <weui-cells-title>2、删除商伴后，您无法在商伴群中发送信息</weui-cells-title>
    <weui-cells-title>我的群列表</weui-cells-title>
    <weui-cells v-if="myGroups.length>0">
      <weui-cell v-for="item in myGroups" :key="item.id">{{item.name}} | {{item.number}}人</weui-cell>
    </weui-cells>
    <weui-load-more-line v-else></weui-load-more-line>
    <weui-cells-title>商伴的群列表</weui-cells-title>
    <weui-cells v-if="orderGroups.length>0">
      <weui-cell v-for="item in orderGroups" :key="item.id">
        {{item.name}} | {{item.number}}人
        <template slot="foot">
          <weui-btn type="warn" mini @click="handleDelete(item)">删除</weui-btn>
        </template>
      </weui-cell>
    </weui-cells>
    <weui-load-more-line v-else></weui-load-more-line>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { tryFunc, openConfirm } from '../../common/js/common';
import {
  WeuiCells,
  WeuiCell,
  WeuiCellsTitle,
  WeuiLoadMoreLine,
  WeuiBtn
} from '../../common/components';
import '../../common/js/share';

export default {
  components: {
    WeuiCells,
    WeuiCell,
    WeuiCellsTitle,
    WeuiLoadMoreLine,
    WeuiBtn
  },
  data() {
    return {
      showApp: false,
      myGroups: [],
      orderGroups: []
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      await this.load();
    });
  },
  methods: {
    async load() {
      const { data } = await axios.get('/user/myAllRoom');
      for (let item of data) {
        if (item.type === 'NORMAL') {
          this.myGroups.push(item);
        } else {
          this.orderGroups.push(item);
        }
      }
    },
    handleDelete(item) {
      openConfirm(`您确定要删除商伴：${item.name}？`, () => {
        this.doDelete(item.id);
      });
    },
    doDelete(id) {
      tryFunc(async () => {
        await axios.delete(`/user/room/${id}`);
        window.location.reload();
      });
    }
  }
};
</script>

<style lang="scss">
.weui-loadmore__tips {
  background-color: #f8f8f8 !important;
}

.weui-cell__ft {
  line-height: 0;
}
</style>

