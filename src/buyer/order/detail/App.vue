<template>
  <div v-if="showApp && order">
    <weui-cells>
      <weui-cell-access label="购买店铺：" empty-foot :href="`/shop.html?userId=${order.shopId}`">{{order.shopName}}</weui-cell-access>
      <weui-cell label="手机号：">{{order.phone}}</weui-cell>
    </weui-cells>
    <weui-cells-title>收货地址：</weui-cells-title>
    <weui-cells>
      <weui-cell>
        <weui-textarea readonly v-model="order.address" maxlength="200" placeholder="请输入详细地址" rows="3"></weui-textarea>
      </weui-cell>
    </weui-cells>
    <weui-panel>
      <a v-for="product in order.buyerOrderItemList" :key="product.id" :href="`/product.html?productId=${product.itemId}`" class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">
          <img class="weui-media-box__thumb" :src="product.img">
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title">{{product.title}}</h4>
          <div class="info">
            <div class="price">￥{{product.price}}</div>
            <div>
              <span class="count">&times;&nbsp;{{product.num}}</span>
            </div>
          </div>
        </div>
      </a>
      <template slot="foot">
        <div class="weui-cell weui-cell_access weui-cell_link">
          <div class="weui-cell__bd">
            <span>总计：</span>
            <span class="price">{{total}}元</span>
          </div>
        </div>
      </template>
      <template slot="foot">
        <div class="weui-cell weui-cell_access weui-cell_link">
          <div class="weui-cell__bd">
            <span>优惠券抵扣：</span>
            <span class="price" v-if="order.coupon>0">-{{order.coupon}}元</span>
            <span class="price" v-else>0元</span>
          </div>
        </div>
      </template>
      <template slot="foot">
        <div class="weui-cell weui-cell_access weui-cell_link">
          <div class="weui-cell__bd">
            <span>联系方式：</span>
            <span>{{order.phone}}</span>
          </div>
        </div>
      </template>
      <template slot="foot">
        <div class="weui-cell weui-cell_access weui-cell_link">
          <div class="weui-cell__bd">
            <span>最终支付：</span>
            <span class="price">{{order.price}}元</span>
          </div>
        </div>
      </template>
    </weui-panel>
    <weui-btn-area>
      <weui-btn type="primary" href="/buyer/order/list.html">返回订单列表</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import axios from '../../../common/js/axios';
import { auth } from '../../../common/js/auth';
import { tryFunc, getQueryString } from '../../../common/js/common';
import {
  WeuiCellsTitle,
  WeuiCells,
  WeuiCell,
  WeuiCellAccess,
  WeuiTextarea,
  WeuiPanel,
  WeuiBtnArea,
  WeuiBtn
} from '../../../common/components';
export default {
  components: {
    WeuiCellsTitle,
    WeuiCells,
    WeuiCell,
    WeuiCellAccess,
    WeuiTextarea,
    WeuiPanel,
    WeuiBtnArea,
    WeuiBtn
  },
  computed: {
    total() {
      let total = 0;
      for (let product of this.order.buyerOrderItemList) {
        total += product.price * Number(product.num);
      }
      return total;
    }
  },
  data() {
    return {
      showApp: false,
      orderId: getQueryString('orderId'),
      order: null
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`/buyer/order/${this.orderId}`);
      this.order = data;
    });
  }
};
</script>

<style lang="scss">
.info {
  display: flex;
  justify-content: space-between;

  .count {
    padding: 0 5px;
    color: #999;
    font-size: 0.75rem;
    line-height: 1;
  }
}
.price {
  color: red;
  font-weight: bold;
}

.weui-cell_link {
  .weui-cell__bd {
    color: #999;
    text-align: right;
  }
}
</style>

