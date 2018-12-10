<template>
  <div v-if="showApp">
    <div class="title">
      <h1>我的订单</h1>
    </div>
    <div v-if="orders.length > 0">
      <div class="weui-form-preview" v-for="order in orders" :key="order.id">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">付款金额</label>
            <em class="weui-form-preview__value">¥{{order.price}}</em>
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item" v-for="item in order.buyerOrderItemList" :key="item.id">
            <label class="weui-form-preview__label">{{item.title}}</label>
            <span class="weui-form-preview__value">&times;&nbsp;{{item.num}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">创建时间</label>
            <span class="weui-form-preview__value">{{order.createTime | time}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">购买店铺</label>
            <span class="weui-form-preview__value">{{order.shopName}}</span>
          </div>
        </div>
        <div class="weui-form-preview__ft">
          <a class="weui-form-preview__btn weui-form-preview__btn_primary" :href="`/buyer/order/detail.html?orderId=${order.id}`">查看详情</a>
        </div>
      </div>
    </div>
    <weui-cells v-else>
      <weui-load-more-line></weui-load-more-line>
    </weui-cells>
  </div>
</template>

<script>
import axios from '../../../common/js/axios';
import format from 'date-fns/format';
import { auth } from '../../../common/js/auth';
import { tryFunc } from '../../../common/js/common';
import '../../../common/js/share';
import {
  WeuiLoadMoreLine,
  WeuiCells
} from '../../../common/components';

export default {
  components: {
    WeuiLoadMoreLine,
    WeuiCells
  },
  data() {
    return {
      orders: [],
      showApp: false
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get('/buyer/order/');
      this.orders = data;
    });
  },
  filters: {
    time: val => {
      return format(val, 'YYYY-MM-DD HH:mm:ss');
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


