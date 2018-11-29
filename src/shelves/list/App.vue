<template>
  <div v-if="showApp">
    <div class="title">
      <h1>{{title}}</h1>
    </div>
    <weui-panel :label="`不超过${count}种产品（点击编辑/删除商品）`">
      <div v-if="products.length > 0">
        <a v-for="product in products" :key="product.id" :href="`/shelves/edit.html?id=${product.id}`" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="product.imgUrl">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">{{product.name}}</h4>
            <p class="weui-media-box__desc">{{product.description}}</p>
          </div>
        </a>
      </div>
      <weui-load-more-line v-else></weui-load-more-line>
    </weui-panel>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import { tryFunc, getQueryString } from '../../common/js/common';
import { WeuiPanel, WeuiLoadMoreLine } from '../../common/components';

export default {
  components: {
    WeuiPanel,
    WeuiLoadMoreLine
  },
  data() {
    return {
      title: '',
      count: '',
      products: [],
      showApp: false,
      type: getQueryString('type')
    };
  },
  created() {
    if (this.type === 'SPECIAL') {
      this.title = '本周特价';
      this.count = 2;
    } else if (this.type === 'NEWER') {
      this.title = '店长推荐';
      this.count = 6;
    } else {
      this.title = '店铺货架';
      this.count = 50;
    }
  },
  mounted() {
    tryFunc(async () => {
      this.showApp = true;
      const { data } = await axios.get('/item/owner', {
        params: {
          userId: localStorage.getItem('userId'),
          type: this.type
        }
      });
      this.products = data.map(item => {
        return {
          ...item,
          imgUrl: item.imgUrl ? item.imgUrl.split(',')[0] : ''
        };
      });
    });
  }
};
</script>

