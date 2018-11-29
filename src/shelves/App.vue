<template>
  <div v-if="showApp">
    <weui-cells-title>本周特价（上传不超过2种产品）</weui-cells-title>
    <weui-btn-area>
      <weui-btn type="primary" href="/shelves/submit.html?type=SPECIAL">上传商品</weui-btn>
      <weui-btn href="/shelves/list.html?type=SPECIAL">查看编辑</weui-btn>
    </weui-btn-area>
    <weui-cells-title>店长推荐（上传不超过6种产品）</weui-cells-title>
    <weui-btn-area>
      <weui-btn type="primary" href="/shelves/submit.html?type=NEWER">上传商品</weui-btn>
      <weui-btn href="/shelves/list.html?type=NEWER">查看编辑</weui-btn>
    </weui-btn-area>
    <weui-cells-title>店铺货架（上传不超过50种产品）</weui-cells-title>
    <weui-btn-area>
      <weui-btn type="primary" href="/shelves/submit.html?type=NORMAL">上传商品</weui-btn>
      <weui-btn href="/shelves/list.html?type=NORMAL">查看编辑</weui-btn>
    </weui-btn-area>
    <weui-btn-area>
      <weui-btn type="warn">发布网店</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import { auth } from '../common/js/auth';
import config from '../common/js/config';
import { tryFunc } from '../common/js/common';
import { WeuiCellsTitle, WeuiBtnArea, WeuiBtn } from '../common/components';

export default {
  components: {
    WeuiCellsTitle,
    WeuiBtnArea,
    WeuiBtn
  },
  data() {
    return {
      showApp: false,
      products: [],
      userId: localStorage.getItem('userId'),
      webHost: config.webHost
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
    });
  },
  methods: {}
};
</script>


