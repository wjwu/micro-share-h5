<template>
  <div v-if="product && showApp">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(img,i) in product.images" :key="i">
          <img :src="img" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="top_title">
      <p class="tit_name">{{product.name}}</p>
      <p class="smalltit_name">{{product.description}}</p>
      <p class="tit_money">
        <span>￥{{product.sellPrice}} </span>
      </p>
    </div>
    <div class="round_tit flex">
      <dl class="flex">
        <dt><img src="./assets/img/yes.svg" alt=""></dt>
        <dd>厂家直营</dd>
      </dl>
      <dl class="flex">
        <dt><img src="./assets/img/yes.svg" alt=""></dt>
        <dd>诚信销售</dd>
      </dl>
      <dl class="flex">
        <dt><img src="./assets/img/yes.svg" alt=""></dt>
        <dd>品质保证</dd>
      </dl>
    </div>
    <div class="product-detail">
      {{product.description}}
    </div>
    <div class="buy-wrap">
      <a :href="'./list.html?userId=' + userId" class="buy-tohome"></a>
      <a @click="showWechat" class="buy-concat"></a>
      <div class="buy">立即购买</div>
    </div>
  </div>
</template>

<script>
import 'babel-polyfill';
import axios from 'axios';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import { tryFunc, openToast, getQueryString } from '../../common/js/common';

export default {
  data() {
    return {
      pId: getQueryString('pId'),
      userId: '',
      wechat: '',
      product: null,
      showApp: false
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      if (!this.pId) {
        openToast('商品编号无效');
        return;
      }
      const { data } = await axios.get(`${config.apiHost}/item/${this.pId}`);
      data.images = data.imgUrl.split(',');
      this.product = data;
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
    });

    tryFunc(async () => {
      const { data } = await axios.get(
        `${config.apiHost}/item/${this.pId}/shopInfo`
      );
      this.userId = data.userId;
      this.wechat = data.wechat;
    });
  },
  methods: {
    showWechat() {
      openToast('请联系卖家微信：' + this.wechat);
    }
  }
};
</script>

<style lang="scss">
body {
  font-family: 'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif !important;
}
.swiper-container {
  height: 23.4375rem;
}
.swiper-slide {
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
}
.buy-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3rem;
  background: #fff;
  z-index: 2;
  display: flex;

  .buy {
    font-size: 1rem;
    background-color: #ff6672;
    color: #fff;
    line-height: 3rem;
    text-align: center;
    transition: 0.2s ease-out;
    flex: 1;
  }
}

.buy-tohome {
  position: relative;
  width: 55px;
  height: 48px;
  float: left;
  display: block;
  background-image: url(./assets/img/home.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 23px;
}

.buy-concat {
  position: relative;
  width: 55px;
  height: 48px;
  float: left;
  display: block;
  background-image: url(./assets/img/concat.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 23px;
  border-left: solid 1px #eaeaea;
}

.flex {
  display: flex;
}

.round_tit {
  padding: 12px;
  background: #fafafa;
  border-bottom: 8px solid #f5f5f5;

  dl {
    font-size: 12px;
    color: #999999;
    align-items: center;
    -webkit-align-items: center;
    margin-right: 15px;

    dd {
      margin-left: 5px;
      font-size: 12px;
      color: #999999;
    }
  }
}

.product-detail {
  padding: 1rem;
}
</style>


