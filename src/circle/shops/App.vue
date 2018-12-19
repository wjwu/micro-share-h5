<template>
  <div v-if="showApp">
    <weui-panel v-if="shops.length > 0 ">
      <a :href="`/shop.html?userId=${shop.id}`" class="weui-media-box weui-media-box_appmsg" v-for="shop in shops" :key="shop.id">
        <div class="weui-media-box__hd">
          <img class="weui-media-box__thumb" :src="shop.img">
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title">{{shop.name}}</h4>
          <p class="weui-media-box__desc">{{shop.desc}}</p>
        </div>
      </a>
    </weui-panel>
    <weui-load-more-line v-else></weui-load-more-line>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import { tryFunc, getQueryString } from '../../common/js/common';
import { WeuiPanel, WeuiLoadMoreLine } from '../../common/components';
import '../../common/js/share';

export default {
  components: {
    WeuiPanel,
    WeuiLoadMoreLine
  },
  data() {
    return {
      showApp: false,
      userId: getQueryString('userId'),
      shops: []
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data: shops } = await axios.get('/shop/partDetailByUserId', {
        params: {
          userId: this.userId
        }
      });
      if (shops) {
        this.shops = shops.slice(0, 6);
      }
    });
  }
};
</script>

<style lang="scss">
.weui-panel__bd {
  display: flex;
  flex-wrap: wrap;
}
.weui-media-box_appmsg {
  width: 50%;
  box-sizing: border-box;
}
.weui-media-box:before {
  display: none;
}
.weui-loadmore_line .weui-loadmore__tips {
  background-color: #f8f8f8;
}
</style>
