<template>
  <div class="main">
    <div class="title">
      <h2>我的货架
        <span>/ MY SHELVES</span>
      </h2>
    </div>
    <ul class="product" v-if="products.length > 1">
      <li v-for="item in products" :key="item.id">
        <a href="">
          <img :src="item.imgUrl" />
          <h3>{{item.name}}</h3>
          <p class="desc">{{item.description?item.description:'.'}}</p>
          <p class="price">
            <span>￥{{item.sellPrice}}元</span>
            <small>{{item.sales}}已售</small>
          </p>
        </a>
      </li>
    </ul>
    <div class="weui-panel__bd" v-else>
      <div class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__bd">
          <div class="weui-loadmore weui-loadmore_line">
            <span class="weui-loadmore__tips">没有更多商品了</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'babel-polyfill';
import axios from 'axios';
// import { auth } from '../common/js/auth';
import config from '../common/js/config';
import { tryFunc } from '../common/js/common';

export default {
  data() {
    return {
      products: []
    };
  },
  mounted() {
    tryFunc(async () => {
      const { data } = await axios.get(`${config.apiHost}/item`, {
        headers: {
          userId: '1'
        }
      });
      this.products = data;
    });
  }
};
</script>

<style lang="scss">
html,
body,
.main {
  height: 100%;
  background-color: #fff;
}
.main {
  .title {
    padding: 1.25rem;

    h2 {
      flex: 1;
      font-size: 1.125rem;
      color: #333;
      letter-spacing: 1px;
      line-height: 1.5625rem;
      font-weight: 700;

      span {
        font-weight: lighter;
        font-size: 0.875rem;
        color: #b2b2b2;
        letter-spacing: 1px;
        line-height: 1.5625rem;
        padding-left: 0.375rem;
      }
    }
  }
  .product {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 1.25rem;

    li {
      flex: 0 0 48%;
      overflow: hidden;

      a {
        display: block;
        background: transparent;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
        color: #453b38;
      }

      img {
        width: 100%;
      }

      h3 {
        color: #333;
        font-size: 0.875rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1;
        letter-spacing: 1px;
        padding-top: 0.625rem;
        font-weight: bold;
      }

      .desc {
        padding: 0.5rem 0 0.875rem;
        font-size: 0.75rem;
        line-height: 1;
        color: #666;
        letter-spacing: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .price {
        color: #333;
        font-size: 0.75rem;
        font-weight: 700;
        line-height: 1;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        small {
          color: #b2b2b2;
          font-size: 0.625rem;
          font-weight: 400;
        }
      }
    }
  }
}
</style>


