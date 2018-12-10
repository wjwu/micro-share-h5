<template>
  <div v-if="showApp">
    <div class="title">
      <h1>我的优惠券</h1>
    </div>
    <div v-if="coupons.length > 0">
      <div class="weui-form-preview" v-for="item in coupons" :key="item.id">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">优惠金额</label>
            <em class="weui-form-preview__value">¥{{item.price}}</em>
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">适用于</label>
            <span class="weui-form-preview__value">{{item.shopName}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">到账时间</label>
            <span class="weui-form-preview__value">{{item.createTime | time}}</span>
          </div>
        </div>
        <div class="weui-form-preview__ft">
          <a class="weui-form-preview__btn weui-form-preview__btn_primary" :href="`/shop.html?userId=${item.shopId}`">立即使用</a>
        </div>
      </div>
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
import { WeuiCells, WeuiLoadMoreLine } from '../../common/components';
import '../../common/js/share';

export default {
  components: {
    WeuiCells,
    WeuiLoadMoreLine
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
      const { data } = await axios.get('/user/coupon');
      this.coupons = data;
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
</style>




