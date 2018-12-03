<template>
  <cust-bar v-if="product && showApp" :cart-count="cartCount">
    <div class="content">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(img,i) in product.images" :key="i">
            <span class="shop-name">{{shopInfo.name}}</span>
            <img :src="img +'?imageView2/1/w/500/h/500/interlace/1/q/75|watermark/2/text/QOWVhuS8tOmDqOiQvQ==/font/5b6u6L2v6ZuF6buR/fontsize/320/fill/I0ZBRkFGQQ==/dissolve/100/gravity/SouthEast/dx/10/dy/10|imageslim'" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="top_title">
        <p class="tit_name">商品名称：{{product.name}}</p>
        <p class="smalltit_name">{{product.description}}</p>
        <p class="tit_money">
          <span>{{product.type === SPECIAL?'特价':'单价'}} ￥{{product.sellPrice}} </span>
          <span class="thought_money" v-if="product.type === SPECIAL"> 原价 <span class="del">¥ {{product.originPrice}}</span></span>
        </p>
      </div>
      <!-- <div class="product-detail">
        {{product.description}}
      </div> -->
      <div class="shop">
        <h4 v-if="shopInfo.address">- 店铺地址 -</h4>
        <div v-if="shopInfo.address" class="address">{{shopInfo.address}}</div>
        <h4 v-if="shopInfo.src">- 店铺二维码 -</h4>
        <img v-if="shopInfo.src" :src="shopInfo.src" />
      </div>
    </div>
    <div class="buy-wrap">
      <div class="cart" @click="handleAddCart">加入购物车</div>
      <div class="buy" @click="buy">联系商家购买</div>
    </div>
  </cust-bar>
</template>

<script>
import axios from '../common/js/axios';
import config from '../common/js/config';
import { tryFunc, openAlert, getQueryString } from '../common/js/common';
import { CustBar } from '../common/components';
import wxApi from '../common/js/wxApi';

const SPECIAL = 'SPECIAL';

export default {
  components: {
    CustBar
  },
  data() {
    return {
      SPECIAL,
      cartCount: '',
      productId: getQueryString('productId'),
      userId: getQueryString('userId'),
      product: null,
      showApp: false,
      shopInfo: {}
    };
  },
  created() {
    const strCart = localStorage.getItem('cart');
    if (strCart) {
      this.cartCount = JSON.parse(strCart).length;
    }
  },
  mounted() {
    tryFunc(async () => {
      this.showApp = true;
      if (!this.productId) {
        openAlert('商品编号无效');
        return;
      }
      const { data: product } = await axios.get(`/item/${this.productId}`);
      product.images = product.imgUrl.split(',');
      this.product = product;
      window.document.title = product.name;

      const { data: shopInfo } = await axios.get(
        `/item/${this.productId}/shopInfo`
      );
      this.shopInfo = shopInfo;

      this.$nextTick(() => {
        const swiper = new window.Swiper('.swiper-container', {
          direction: 'horizontal',
          autoplay: {
            delay: 2000
          },
          speed: 1000,
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        });
        console.log(swiper);
      });

      this.shareFunc();
    });
  },
  methods: {
    async shareFunc() {
      let name;
      let desc;
      if (this.product.type === 'SPECIAL') {
        let shopName = '';
        if (this.shopInfo.name) {
          shopName = this.shopInfo.name;
        }
        name = shopName + '本周特价（欢迎抢购）';
        const { data } = await axios.get(`/item/${this.productId}/special`);
        desc = data.description ? data.description : '本周特价，欢迎大家选购';
      } else {
        name = this.product.name;
        desc = this.product.description ? this.product.description : '商品描述';
      }
      await wxApi.config(['onMenuShareTimeline', 'onMenuShareAppMessage']);
      window.wx.onMenuShareAppMessage(
        {
          title: name,
          desc: desc,
          link: config.webHost + '/product.html?productId=' + this.productId,
          imgUrl:
            this.product.images[0] +
            '?imageView2/1/w/50/h/50/interlace/1/q/75/.jpg'
        },
        function(res) {}
      );
      window.wx.onMenuShareTimeline(
        {
          title: name,
          desc: desc,
          link: config.webHost + '/product.html?productId=' + this.productId,
          imgUrl:
            this.product.images[0] +
            '?imageView2/1/w/50/h/50/interlace/1/q/75/.jpg'
        },
        function(res) {}
      );
    },
    async buy() {
      let name = localStorage.getItem('name');
      if (!name) {
        name = prompt('请输入您联系电话，方便卖家与您联系。', '');
        if (!name) {
          return;
        }
        var part = /^1\d{10}$/gi;
        if (!part.test(name)) {
          openAlert('请您输入正确的手机联系方式噢……');
          return;
        }
        localStorage.setItem('name', name);
      }
      let buyTime = Number(localStorage.getItem('buyTime'));
      let now = new Date().getTime();
      if (!buyTime || now - buyTime > 30 * 60 * 1000) {
        tryFunc(async () => {
          await axios.get(`/item/${this.productId}/buy?name=${name}`);
        });
        localStorage.setItem('buyTime', now.toString());
      }
      openAlert(
        '购买成功,请等待卖家联系。若卖家长时间未联系请查看本页下方卖家信息!'
      );
    },
    handleAddCart() {
      const strCart = localStorage.getItem('cart');
      let cart;
      if (strCart) {
        cart = JSON.parse(strCart);
      } else {
        cart = [];
      }
      let product = cart.filter(item => item.productId === this.productId)[0];
      if (!product) {
        product = {
          productId: this.productId,
          count: 1
        };
        cart.push(product);
      } else {
        // product.count = Number(product.count) + 1;
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartCount = cart.length.toString();
    }
  }
};
</script>

<style lang="scss">
body {
  font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif !important;
}
.content {
  padding-bottom: 3rem;
}
.swiper-container {
  height: 23.4375rem;
}
.swiper-slide {
  position: relative;
  .shop-name {
    position: absolute;
    top: 0.5rem;
    color: #fff;
    font-size: 1rem;
    line-height: 1;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.swiper-pagination-bullet {
  width: 0.75rem !important;
  height: 0.75rem !important;
}
.swiper-pagination-bullet-active {
  background-color: #ff8da0 !important;
}

.top_title {
  background: #fff;
  padding: 1.125rem 0.75rem;
  border-bottom: 8px solid #f5f5f5;
  .tit_name {
    font-size: 1rem;
    color: #333;
    font-weight: bold;
  }

  .smalltit_name {
    font-size: 0.75rem;
    color: #999999;
    letter-spacing: 0;
    line-height: 1.125rem;
    margin: 0.375rem 0;
  }

  .tit_money {
    font-size: 1.25rem;
    color: #fc6b80;
    font-weight: bold;
    margin-top: 1rem;
  }

  .thought_money {
    color: #999;
    font-size: 12px;
    font-weight: initial;
  }
  .del {
    text-decoration: line-through;
  }
}
.buy-wrap {
  position: fixed;
  bottom: 50px;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  background: #fff;
  color: #fff;
  font-size: 1rem;
  z-index: 2;
  text-align: center;
  display: flex;

  .buy {
    background-color: #ff6672;
    flex: 1;
  }

  .cart {
    background-color: #ff9600;
    color: #fff;
    flex: 1;
  }
}

.flex {
  display: flex;
}

.product-detail {
  padding: 1rem;
}

.shop {
  background-color: #fff;
  text-align: center;
  color: #333;
  padding: 1rem 0;

  h4 {
    margin-bottom: 1rem;
  }
  .address {
    line-height: 1;
    margin-bottom: 2rem;
  }
  img {
    width: 12rem;
    height: 12rem;
  }
}
</style>


