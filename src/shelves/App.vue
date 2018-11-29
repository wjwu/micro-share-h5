<template>
  <div v-if="showApp">
    <weui-cells-title>本周特价（上传不超过2种产品）</weui-cells-title>
    <weui-btn-area>
      <weui-btn :disabled="count.special>=2" type="primary" href="/shelves/submit.html?type=SPECIAL">上传商品</weui-btn>
      <weui-btn href="/shelves/list.html?type=SPECIAL">查看编辑</weui-btn>
    </weui-btn-area>
    <weui-cells-title>店长推荐（上传不超过6种产品）</weui-cells-title>
    <weui-btn-area>
      <weui-btn :disabled="count.special>=6" type="primary" href="/shelves/submit.html?type=NEWER">上传商品</weui-btn>
      <weui-btn href="/shelves/list.html?type=NEWER">查看编辑</weui-btn>
    </weui-btn-area>
    <weui-cells-title>店铺货架（上传不超过50种产品）</weui-cells-title>
    <weui-btn-area>
      <weui-btn :disabled="count.special>=50" type="primary" href="/shelves/submit.html?type=NORMAL">上传商品</weui-btn>
      <weui-btn href="/shelves/list.html?type=NORMAL">查看编辑</weui-btn>
    </weui-btn-area>
    <weui-btn-area>
      <weui-btn type="warn">发布网店</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import weui from 'weui.js';
import axios from '../common/js/axios';
import { auth } from '../common/js/auth';
import { openAlert } from '../common/js/common';
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
      userId: localStorage.getItem('userId'),
      count: {
        newer: 0,
        normal: 0,
        special: 0
      }
    };
  },
  async mounted() {
    const loading = weui.loading('数据加载中');
    try {
      await auth();
      this.showApp = true;
      let response = await axios.get('/user/shopInfo');
      if (!response.data) {
        loading.hide();
        weui.dialog({
          content: '请先设置店铺标题，点击确定前往',
          buttons: [
            {
              label: '确定',
              type: 'primary',
              onClick: () => {
                window.location.href = '/other/toker.html';
              }
            },
            {
              label: '取消',
              type: 'default',
              onClick: () => {
                window.location.href = '/vip/shopper.html';
              }
            }
          ]
        });
        return;
      }
      response = await axios.get('/item/typeCount', {
        params: {
          userId: localStorage.getItem('userId')
        }
      });
      loading.hide();
      this.count = response.data;
    } catch (e) {
      loading.hide();
      if (e.response && e.response.data) {
        openAlert(e.response.data.message);
      } else {
        openAlert(e);
      }
    }
  }
};
</script>


