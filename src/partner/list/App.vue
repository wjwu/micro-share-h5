<template>
  <div v-if="showApp">
    <div class="weui-tab">
      <div class="weui-navbar">
        <div class="weui-navbar__item" :class="{'weui-bar__item_on':selectedTab==='group'}" @click="selectedTab = 'group'">微信群管理</div>
        <div class="weui-navbar__item" :class="{'weui-bar__item_on':selectedTab==='shelves'}" @click="selectedTab = 'shelves'">货架管理</div>
      </div>
      <div class="weui-tab__panel" v-if="selectedTab==='group'">
        <weui-cells-title>1、点击“删除”为双向删除对方</weui-cells-title>
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
      <div class="weui-tab__panel" v-if="selectedTab==='shelves'">
        <weui-cells-title>1、点击“删除”为双向删除对方</weui-cells-title>
        <weui-cells-title>我的货架</weui-cells-title>
        <weui-cells v-if="shopInfo">
          <weui-cell>{{shopInfo.name}}</weui-cell>
        </weui-cells>
        <weui-load-more-line></weui-load-more-line>
        <weui-cells-title>商伴的货架</weui-cells-title>
        <weui-cells v-if="partShop.length>0">
          <weui-cell v-for="item in partShop" :key="item.id">
            {{item.name}}
            <template slot="foot">
              <weui-btn type="warn" mini @click="handleShopDelete(item)">删除</weui-btn>
            </template>
          </weui-cell>
        </weui-cells>
        <weui-load-more-line v-else></weui-load-more-line>
      </div>
    </div>
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
      selectedTab: 'group',
      myGroups: [],
      partShop: [],
      orderGroups: [],
      shopInfo: null
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

      let responseShop = await axios.get('/shop/part');
      this.partShop = responseShop.data;

      let response = await axios.get('/user/shopInfo');
      this.shopInfo = response.data;
    },
    handleDelete(item) {
      openConfirm(`您确定要删除商伴：${item.name}？`, () => {
        this.doDelete(item.id);
      });
    },
    handleShopDelete(item) {
      openConfirm(`您确定要删除货架商伴：${item.name}？`, () => {
        this.doShopDelete(item.id);
      });
    },
    doShopDelete(id) {
      tryFunc(async () => {
        await axios.delete(`/shop/part/${id}`);
        window.location.reload();
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

