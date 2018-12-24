<template>
  <div v-if="showApp">
    <div class="title">
      <h1>我的抵扣券</h1>
    </div>
    <div v-if="coupons.length > 0">
      <weui-panel v-for="item in coupons" :key="item[0]" :label="item[1][0].shopName">
        <div class="weui-media-box weui-media-box_appmsg" v-for="coupon in item[1]" :key="coupon.id">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" src="./assets/images/coupon.png">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">¥{{coupon.price}}</h4>
            <p class="weui-media-box__desc">到账时间：{{coupon.createTime | time}}</p>
            <p class="weui-media-box__desc">过期时间：{{coupon.expireTime | time}}</p>
          </div>
          <div class="weui-media-box__fd">
            <a :href="`/shop.html?userId=${coupon.shopId}`">去使用</a>
          </div>
        </div>
      </weui-panel>
    </div>
    <weui-cells v-else>
      <weui-load-more-line></weui-load-more-line>
    </weui-cells>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import format from 'date-fns/format';
import { auth } from '../../common/js/auth';
import { tryFunc } from '../../common/js/common';
import {
  WeuiPanel,
  WeuiLoadMoreLine,
  WeuiCells
} from '../../common/components';
import '../../common/js/share';

export default {
  components: {
    WeuiPanel,
    WeuiLoadMoreLine,
    WeuiCells
  },
  data() {
    return {
      showApp: false,
      coupons: []
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data: coupons } = await axios.get('/user/coupon');
      const map = new Map();
      for (const item of coupons) {
        if (map.has(item.shopId)) {
          const arr = map.get(item.shopId);
          arr.push(item);
        } else {
          map.set(item.shopId, [item]);
        }
      }
      this.coupons = [...map];
    });
  },
  filters: {
    time: val => {
      return format(val, 'YYYY-MM-DD');
    }
  }
};
</script>

<style lang="scss">
.weui-form-preview {
  margin-bottom: 1rem;
}
.weui-form-preview__label {
  text-align-last: auto;
}
.weui-media-box__fd {
  a {
    color: #586c94;
    font-size: 14px;
  }
}
</style>




