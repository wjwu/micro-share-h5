<template>
  <div>
    <weui-cells-title>收货信息</weui-cells-title>
    <weui-cells>
      <weui-cell label="姓名">
        <input v-model="name" class="weui-input" type="text" placeholder="请输入您的姓名">
      </weui-cell>
      <weui-cell label="手机号">
        <input v-model="phone" class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入手机号">
      </weui-cell>
      <weui-cell-select label="省份">
        <select class="weui-select" v-model="selectedProvince" @change="handleProvinceChange">
          <option value>请选择省份</option>
          <option :value="item.code" v-for="item in provinces" :key="item.code">{{item.name}}</option>
        </select>
      </weui-cell-select>
      <weui-cell-select label="城市">
        <select class="weui-select" v-model="selectedCity" @change="handleCityChange">
          <option value>请选择城市</option>
          <option :value="item.code" v-for="item in cities" :key="item.code">{{item.name}}</option>
        </select>
      </weui-cell-select>
      <weui-cell-select label="区县">
        <select class="weui-select" v-model="selectedCounty">
          <option value>请选择区县</option>
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
        <a v-for="product in products" :key="product.id" :href="`/product.html?productId=${product.id}`" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="product.imgUrl.split(',')[0]">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">{{product.name}}</h4>
            <div class="info">
              <div class="price">￥{{product.sellPrice}}</div>
              <div>
                <span class="count">&times;&nbsp;{{product.count}}</span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <weui-load-more-line v-else></weui-load-more-line>
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
            <span class="price" v-if="couponPrice>0">-{{couponPrice}}元</span>
            <span class="price" v-else>{{couponPrice}}元</span>
          </div>
        </div>
      </template>
      <template slot="foot">
        <div class="weui-cell weui-cell_access weui-cell_link">
          <div class="weui-cell__bd">
            <span>最终支付：</span>
            <span class="price">{{total - couponPrice}}元</span>
          </div>
        </div>
      </template>
    </weui-panel>
    <weui-cells>
      <weui-cell-select label="优惠券">
        <select class="weui-select" :disabled="coupons.length === 0" v-model="selectCoupon">
          <option value v-if="coupons.length === 0">暂无可用优惠券</option>
          <option value v-else>请选择优惠券</option>
          <option :value="item.id" v-for="item in coupons" :key="item.id">{{item.price}}元</option>
        </select>
      </weui-cell-select>
    </weui-cells>
    <weui-btn-area>
      <weui-btn type="primary" @click="handleSubmit" :disabled="products.length === 0">确认下单</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
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
} from '../../common/components';
import {
  tryFunc,
  getQueryString,
  openAlert,
  checkPhone
} from '../../common/js/common';
import regions from '../../common/js/regions';
import '../../common/js/share.js';

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
        total += product.sellPrice * Number(product.count);
      }
      return total;
    },
    couponPrice() {
      if (this.selectCoupon) {
        return this.coupons.filter(item => item.id === this.selectCoupon)[0]
          .price;
      } else {
        return 0;
      }
    }
  },
  data() {
    return {
      showApp: false,
      isImm: !!getQueryString('imm'),
      products: [],
      coupons: [],
      selectCoupon: '',
      address: '',
      selectedProvince: '',
      selectedCity: '',
      selectedCounty: '',
      provinces: [],
      cities: [],
      counties: [],
      phone: '',
      name: '',
      shopId: localStorage.getItem('visitShopUserId')
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

    const phone = localStorage.getItem('phone');
    if (phone) {
      this.phone = phone;
    }

    this.products = getQueryString('productIds')
      .split(';')
      .map(item => {
        return {
          id: item.split(',')[0],
          count: item.split(',')[1]
        };
      });
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const ids = this.products.map(item => item.id).join(',');
      let response = await axios.get(`/item/findByIds?ids=${ids}`);
      for (let product of response.data) {
        for (let { count, id } of this.products) {
          if (id.toString() === product.id.toString()) {
            product.count = count;
          }
        }
      }

      const name = localStorage.getItem('name');
      if (name) {
        this.name = name;
      } else {
        let response = await axios.get('/user/info');
        this.name = response.data.userName;
      }

      this.products = response.data;
      response = await axios.get('/user/coupon');
      if (response.data) {
        // 排序过滤优惠券
        this.coupons = response.data
          .sort((a, b) => {
            return a.price - b.price;
          })
          .filter(item => item.price < this.total)
          .filter(item => this.total >= item.mustPrice)
          .filter(item => item.shopId == this.shopId);
      }
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
      if (!this.selectedProvince) {
        openAlert('请选择省份');
        return;
      }
      if (!this.selectedCity) {
        openAlert('请选择城市');
        return;
      }
      if (!this.selectedCounty) {
        openAlert('请选择区县');
        return;
      }
      if (!this.address) {
        openAlert('请输入详细地址');
        return;
      }
      if (!checkPhone(this.phone)) {
        openAlert('手机号码格式不正确');
        return;
      }
      if (!this.name) {
        openAlert('请输入姓名');
        return;
      }
      const proviceName = regions.filter(
        item => item.code === this.selectedProvince
      )[0].name;
      const cityName = regions.filter(
        item => item.code === this.selectedCity
      )[0].name;
      const countyName = regions.filter(
        item => item.code === this.selectedCounty
      )[0].name;
      tryFunc(async () => {
        localStorage.setItem('address', this.address);
        localStorage.setItem('countyCode', this.selectedCounty);
        localStorage.setItem('phone', this.phone);
        localStorage.setItem('name', this.name);
        const response = await axios.post('/buyer/order/', {
          price: this.total - this.couponPrice,
          coupon: this.couponPrice,
          couponId: this.selectCoupon,
          address: proviceName + cityName + countyName + this.address,
          phone: this.phone,
          name: this.name,
          orderItemDtoList: this.products.map(item => {
            return {
              itemId: item.id,
              num: item.count
            };
          })
        });
        let orderNumber = response.data;
        if (!this.isImm) {
          const visitShopUserId = localStorage.getItem('visitShopUserId');
          const cartKey = `cart_${visitShopUserId}`;
          const strCart = localStorage.getItem(cartKey);
          let cart = [];
          if (strCart) {
            cart = JSON.parse(strCart);
          }
          const productIds = this.products.map(item => item.id.toString());
          let tmp = [];
          for (let item of cart) {
            if (!productIds.includes(item.productId.toString())) {
              tmp.push(item);
            }
          }

          localStorage.setItem(cartKey, JSON.stringify(tmp));
        }
        setTimeout(() => {
          window.location.href = `./success.html?orderNo=${orderNumber}`;
        });
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


