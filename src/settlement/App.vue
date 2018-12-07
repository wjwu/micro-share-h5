<template>
  <div>
    <weui-cells-title>请选择省市区：</weui-cells-title>
    <weui-cells>
      <weui-cell-select label="省份">
        <select class="weui-select" v-model="selectedProvince" @change="handleProvinceChange">
          <option value="">请选择省份</option>
          <option :value="item.code" v-for="item in provinces" :key="item.code">{{item.name}}</option>
        </select>
      </weui-cell-select>
      <weui-cell-select label="城市">
        <select class="weui-select" v-model="selectedCity" @change="handleCityChange">
          <option value="">请选择城市</option>
          <option :value="item.code" v-for="item in cities" :key="item.code">{{item.name}}</option>
        </select>
      </weui-cell-select>
      <weui-cell-select label="区县">
        <select class="weui-select" v-model="selectedCounty">
          <option value="">请选择区县</option>
          <option :value="item.code" v-for="item in counties" :key="item.code">{{item.name}}</option>
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
import regions from '../common/js/regions';
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
      productIds: getQueryString('productIds'),
      selectedProvince: '',
      selectedCity: '',
      selectedCounty: '',
      provinces: [],
      cities: [],
      counties: []
    };
  },
  created() {
    const address = localStorage.getItem('address');
    if (address) {
      this.address = address;
    }
    const countyCode = localStorage.getItem('countyCode');
    if (countyCode) {
      this.setSelected(countyCode);
    } else {
      this.provinces = regions.filter(item => item.code.endsWith('0000'));
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
    setSelected(countyCode) {
      this.counties = regions.filter(
        item =>
          item.code.startsWith(countyCode.substr(0, 4)) &&
          !item.code.endsWith('00')
      );
      this.selectedCounty = countyCode;

      this.cities = regions.filter(
        item =>
          item.code.startsWith(countyCode.substr(0, 2)) &&
          item.code.endsWith('00') &&
          !item.code.endsWith('0000')
      );

      this.provinces = regions.filter(item => item.code.endsWith('0000'));
      const city = this.cities.filter(
        item => item.code.substr(0, 4) === countyCode.substr(0, 4)
      )[0];
      this.selectedCity = city.code;
      const provice = this.provinces.filter(
        item => item.code.substr(0, 2) === countyCode.substr(0, 2)
      )[0];
      this.selectedProvince = provice.code;
    },
    handleProvinceChange() {
      const proviceCode = this.selectedProvince;
      this.cities = regions.filter(
        item =>
          item.code.startsWith(proviceCode.substr(0, 2)) &&
          item.code.endsWith('00') &&
          item.code !== proviceCode
      );
      this.selectedCity = this.cities[0].code;
      this.handleCityChange();
    },
    handleCityChange() {
      const cityCode = this.selectedCity;
      this.counties = regions.filter(
        item =>
          item.code.startsWith(cityCode.substr(0, 4)) && item.code !== cityCode
      );
      this.selectedCounty = this.counties[0].code;
    },
    handleSubmit() {
      if (!this.address) {
        openAlert('请输入收货地址');
        return;
      }
      tryFunc(async () => {
        await axios.post('');
        localStorage.setItem('address', this.address);
        localStorage.setItem('countyCode', this.selectedCounty);
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


