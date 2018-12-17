<template>
  <div v-if="showApp">
    <div class="products">
      <weui-panel>
        <div v-if="products.length > 0">
          <div v-for="(product) in products" :key="product.id" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <label class="select" :for="product.id">
                <input type="checkbox" class="weui-check" :id="product.id" v-model="product.checked">
                <i class="weui-icon-checked"></i>
              </label>
              <a :href="`/product.html?productId=${product.id}`">
                <img class="weui-media-box__thumb" :src="product.imgUrl.split(',')[0]">
              </a>
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{product.name}}</h4>
              <div class="info">
                <div class="price">￥{{product.sellPrice}}</div>
                <div class="reduce" @click="handleReduce(product)"></div>
                <input type="number" pattern="[0-9]*" class="count" v-model="product.count" @blur="handleCountBlur(product)" @textInput="handleCountInput($event,product)" />
                <div class="plus" @click="handlePlus(product)"></div>
              </div>
            </div>
            <div class="weui-media-box__fd">
              <div class="del" @click="handleDelete(product.id)">删除</div>
            </div>
          </div>
        </div>
        <weui-load-more-line v-else></weui-load-more-line>
        <template slot="foot" v-if="products.length > 0">
          <div class="weui-cell weui-cell_access weui-cell_link">
            <div class="weui-cell__hd">
              <label class="select" for="all">
                <input type="checkbox" class="weui-check" id="all" v-model="checkedAll" @change="handleAllChange">
                <i class="weui-icon-checked"></i>
              </label>
              <span>全选</span>
            </div>
            <div class="weui-cell__bd">总计：<span class="price">￥{{total}}</span></div>
          </div>
        </template>
      </weui-panel>
    </div>
    <div class="btns">
      <a href="javascript:history.back()">继续购物</a>
      <div @click="handleSettlement">去结算</div>
    </div>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import { tryFunc, openConfirm, openAlert } from '../../common/js/common';
import {
  WeuiPanel,
  WeuiLoadMoreLine,
  WeuiCellsCheckbox,
  WeuiCheckLabel,
  WeuiCell
} from '../../common/components';
import '../../common/js/share.js';

const visitShopUserId = localStorage.getItem('visitShopUserId');
const cartKey = `cart_${visitShopUserId}`;
const strCart = localStorage.getItem(cartKey);
let cart = [];
if (strCart) {
  cart = JSON.parse(strCart);
}

export default {
  components: {
    WeuiPanel,
    WeuiLoadMoreLine,
    WeuiCellsCheckbox,
    WeuiCheckLabel,
    WeuiCell
  },
  computed: {
    total() {
      let total = 0;
      for (let product of this.products) {
        if (product.checked) {
          total += product.sellPrice * Number(product.count);
        }
      }
      return total;
    }
  },
  data() {
    return {
      showApp: false,
      products: [],
      checkedAll: true
    };
  },
  mounted() {
    tryFunc(async () => {
      this.showApp = true;
      if (cart.length > 0) {
        const ids = cart.map(item => item.productId).join(',');
        const { data } = await axios.get(`/item/findByIds?ids=${ids}`);
        for (let product of data) {
          product.checked = true;
          for (let { count, productId } of cart) {
            if (productId.toString() === product.id.toString()) {
              product.count = count;
            }
          }
        }
        this.products = data;
      }
    });
  },
  methods: {
    handleReduce(product) {
      if (Number(product.count) - 1 >= 0) {
        product.count = Number(product.count) - 1;
      }
    },
    handlePlus(product) {
      if (Number(product.count) + 1 <= Number(product.stock)) {
        product.count = Number(product.count) + 1;
      }
    },
    handleCountInput(e, product) {
      const reg = /^[0-9]$/;
      if (!reg.test(e.data)) {
        e.preventDefault();
        return;
      }
      if (
        Number(product.count.toString() + e.data.toString()) >
        Number(product.stock)
      ) {
        e.preventDefault();
      }
    },
    handleCountBlur(product) {
      if (product.count === '') {
        product.count = 1;
      }
    },
    handleDelete(id) {
      openConfirm('您确定要删除该商品？', () => {
        cart = cart.filter(item => item.productId.toString() !== id.toString());
        this.products = this.products.filter(
          item => item.id.toString() !== id.toString()
        );
        localStorage.setItem(cartKey, JSON.stringify(cart));
      });
    },
    handleAllChange(e) {
      for (let product of this.products) {
        product.checked = e.target.checked;
      }
    },
    handleSettlement() {
      const checkedProducts = this.products
        .filter(item => item.checked)
        .map(item => `${item.id},${item.count}`);
      if (checkedProducts.length > 0) {
        window.location.href = `/buyer/settlement.html?productIds=${checkedProducts.join(
          ';'
        )}`;
      } else {
        openAlert('请先选择要结算的商品');
      }
    }
  }
};
</script>

<style lang="scss">
.weui-media-box__hd {
  width: auto !important;

  a {
    line-height: 60px;
  }
  img {
    width: 60px !important;
    height: 60px !important;
  }
}
.weui-media-box__bd {
  a {
    color: #000;
  }
}
.select {
  margin-right: 10px;
  display: inline-block;

  .weui-check:checked + .weui-icon-checked:before {
    content: '\EA06';
    color: #09bb07;
  }
  .weui-icon-checked:before {
    content: '\EA01';
    color: #c9c9c9;
    font-size: 23px;
    display: block;
  }
}

.weui-cell_link {
  .weui-cell__hd {
    color: #999;
  }
  .weui-cell__bd {
    color: #999;
    text-align: right;
  }
}

.products {
  padding-bottom: 50px;
}

.info {
  display: flex;
  align-items: center;
  .price {
    flex: 1;
    color: red;
    font-weight: bold;
  }

  .reduce,
  .plus {
    display: inline-block;
    position: relative;
    width: 26px;
    height: 26px;
    background-color: #f7f7f7;

    &::after {
      position: absolute;
      content: '';
      display: block;
      left: 50%;
      top: 50%;
      background-color: #999;
      width: 14px;
      height: 2px;
      transform: translate(-50%, -50%);
    }
  }

  .plus {
    &::before {
      position: absolute;
      content: '';
      display: block;
      left: 50%;
      top: 50%;
      background-color: #999;
      width: 2px;
      height: 14px;
      transform: translate(-50%, -50%);
    }
  }

  .count {
    margin: 0 2px;
    width: 2rem;
    height: 26px;
    line-height: 26px;
    background-color: #f7f7f7;
    border: none;
    font-size: 0.75rem;
    text-align: center;
    outline: none;
  }
}

.del {
  font-size: 0.875rem;
  padding-left: 10px;
  color: #999;
}

.btns {
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  display: flex;

  a,
  div {
    flex: 1;
    line-height: 50px;
    text-align: center;
    color: #fff;
  }

  a {
    background-color: #ff9600;
  }

  a + div {
    background-color: #ff6672;
  }
}
</style>


