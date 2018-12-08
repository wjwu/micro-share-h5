<template>
  <div v-if="showApp">
    <div class="products">
      <weui-panel>
        <div v-if="products.length > 0">
          <div v-for="(product,idx) in products" :key="product.id" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <label class="select" :for="product.id">
                <input type="checkbox" class="weui-check" :id="product.id" v-model="product.checked">
                <i class="weui-icon-checked"></i>
              </label>
              <a :href="`/product.html?productId=${product.id}`">
                <img class="weui-media-box__thumb" :src="product.imgUrl">
              </a>
            </div>
            <div class="weui-media-box__bd">
              <a :href="`/product.html?productId=${product.id}`">
                <h4 class="weui-media-box__title">{{product.name}}</h4>
              </a>
              <div class="info">
                <div class="price">￥{{product.sellPrice}}</div>
                <div>
                  <span class="count">&times;&nbsp;{{product.count}}</span>
                  <span class="del" @click="handleDelete(idx)">删除</span>
                </div>
              </div>
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
import { auth } from '../../common/js/auth';
import { tryFunc, openConfirm, openAlert } from '../../common/js/common';
import {
  WeuiPanel,
  WeuiLoadMoreLine,
  WeuiCellsCheckbox,
  WeuiCheckLabel,
  WeuiCell
} from '../../common/components';
import '../../common/js/share.js';

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
      cart: [],
      products: [],
      checkedAll: true
    };
  },
  created() {
    const strCart = localStorage.getItem('cart');
    if (strCart) {
      this.cart = JSON.parse(strCart);
    }
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      if (this.cart.length > 0) {
        const ids = this.cart.map(item => item.productId).join(',');
        const { data } = await axios.get(`/item/findByIds?ids=${ids}`);
        for (let product of data) {
          product.checked = true;
          for (let { count, productId } of this.cart) {
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
    handleDelete(idx) {
      openConfirm('您确定要删除该商品？', () => {
        this.cart = this.cart.splice(idx, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
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
        .map(item => item.id);
      if (checkedProducts.length > 0) {
        window.location.href = `/buyer/settlement.html?productIds=${checkedProducts.join(
          ','
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
.price {
  color: red;
  font-weight: bold;
}

.info {
  display: flex;
  justify-content: space-between;

  .count,
  .del {
    padding: 0 5px;
    color: #999;
    font-size: 0.75rem;
    line-height: 1;
  }

  .count {
    border-right: 1px solid #cecece;
  }
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

