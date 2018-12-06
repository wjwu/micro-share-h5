<template>
  <div>
    <weui-cells-title>请选择省市区：</weui-cells-title>
    <weui-cells>
      <weui-cell-select label="省份">
        <select class="weui-select">
          <option value="">请选择群所属行业</option>
          <!-- <option :value="item.name" v-for="item in industries" :key="item.id">{{item.name}}</option> -->
        </select>
      </weui-cell-select>
      <weui-cell-select label="城市">
        <select class="weui-select">
          <option value="">请选择群所属行业</option>
          <!-- <option :value="item.name" v-for="item in industries" :key="item.id">{{item.name}}</option> -->
        </select>
      </weui-cell-select>
      <weui-cell-select label="区县">
        <select class="weui-select">
          <option value="">请选择群所属行业</option>
          <!-- <option :value="item.name" v-for="item in industries" :key="item.id">{{item.name}}</option> -->
        </select>
      </weui-cell-select>
    </weui-cells>
    <weui-cells-title>详细地址：</weui-cells-title>
    <weui-cells>
      <weui-cell>
        <weui-textarea v-model="address" maxlength="200" placeholder="请输入详细地址" rows="3"></weui-textarea>
      </weui-cell>
    </weui-cells>
    <weui-panel>
      <div v-if="products.length > 0">
        <a v-for="product in products" :key="product.id" :href="`/shelves/edit.html?id=${product.id}`" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="product.imgUrl">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">{{product.name}}</h4>
            <div class="info">
              <div class="price">￥{{product.sellPrice}}</div>
              <div>
                <span class="count">&times;&nbsp;1</span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <weui-load-more-line v-else></weui-load-more-line>
      <template slot="foot" v-if="products.length > 0">
        <div class="weui-cell weui-cell_access weui-cell_link">
          <div class="weui-cell__bd">总计：<span class="price">￥{{total}}</span></div>
        </div>
      </template>
    </weui-panel>
    <weui-btn-area>
      <weui-btn type="primary" @click="handleSubmit" :disabled="products.length === 0">确认下单</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import axios from '../common/js/axios';
import { auth } from '../common/js/auth';
import {
  WeuiPanel,
  WeuiLoadMoreLine,
  WeuiBtnArea,
  WeuiBtn,
  WeuiCellsTitle,
  WeuiCells,
  WeuiCell,
  WeuiTextarea,
  WeuiCellSelect
} from '../common/components';
import { tryFunc, getQueryString, openAlert } from '../common/js/common';
import '../common/js/share.js';

export default {
  components: {
    WeuiPanel,
    WeuiLoadMoreLine,
    WeuiBtnArea,
    WeuiBtn,
    WeuiCellsTitle,
    WeuiCells,
    WeuiCell,
    WeuiTextarea,
    WeuiCellSelect
  },
  computed: {
    total() {
      let total = 0;
      for (let product of this.products) {
        if (product.checked) {
          total += product.sellPrice;
        }
      }
      return total;
    }
  },
  data() {
    return {
      showApp: false,
      products: [],
      address: '',
      productIds: getQueryString('productIds')
    };
  },
  created() {
    const address = localStorage.getItem('address');
    if (address) {
      this.address = address;
    }
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(
        `/item/findByIds?ids=${this.productIds}`
      );
      for (let product of data) {
        product.checked = true;
      }
      this.products = data;
    });
  },
  methods: {
    handleSubmit() {
      if (!this.address) {
        openAlert('请输入收货地址');
        return;
      }
      tryFunc(async () => {
        await axios.post('');
        localStorage.setItem('address', this.address);
        const strCart = localStorage.getItem('cart');
        let cart = [];
        let tmp = [];
        if (strCart) {
          cart = JSON.parse(strCart);
        }
        for (let item of cart) {
          if (!this.productIds.indexOf(item)) {
            tmp.push(item);
          }
        }
        localStorage.setItem('cart', JSON.stringify(tmp));
      });
    }
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


