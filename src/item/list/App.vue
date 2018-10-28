<template>
  <div class="main" v-if="showApp">
    <div class="title">
      <h2>我的货架
        <span>/ MY SHELVES</span>
      </h2>
    </div>
    <ul class="product" v-if="products.length >= 1">
      <li v-for="item in products" :key="item.id">
        <a :href="`./detail.html?pId=${item.id}`">
          <img :src="item.imgUrl + '?imageView2/1/w/500/h/500/interlace/1/q/75|watermark/2/text/QOWVhuS8tOmDqOiQvQ==/font/5b6u6L2v6ZuF6buR/fontsize/320/fill/I0ZBRkFGQQ==/dissolve/100/gravity/SouthEast/dx/10/dy/10|imageslim'" />
          <span class="weui-badge badge" v-if="item.type === 'GROUP'">团</span>
          <h3>{{item.name}}</h3>
          <p class="desc">{{item.description}}</p>
          <p class="price">
            <span>￥{{item.sellPrice}}元</span>
            <small>{{item.stock}}可售</small>
          </p>
        </a>
      </li>
    </ul>
    <div class="page__bd" v-else>
      <div class="weui-loadmore weui-loadmore_line">
        <span class="weui-loadmore__tips">没有更多商品了</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../common/js/axios";
import config from '../../common/js/config';
import { tryFunc, getQueryString } from "../../common/js/common";
import wxApi from "../../common/js/wxApi";

export default {
  data() {
    return {
      products: [],
      showApp: false
    };
  },
  mounted() {
    tryFunc(async () => {
      this.showApp = true;
      const { data } = await axios.get("/item/owner", {
        params: {
          userId: getQueryString("userId")
        }
      });
      this.products = data.map(item => {
        return {
          ...item,
          imgUrl: item.imgUrl ? item.imgUrl.split(",")[0] : ""
        };
      });
      await this.checkShopInfo();
    });
  },
  methods: {
    async checkShopInfo() {
      const { data } = await axios.get('/user/shopInfoById', {
        params: {
          userId: getQueryString("userId")
        }
      });

      var name = data && data.name ? data.name + "电子货架（欢迎选购）" : "商伴部落";
      var desc = data && data.description
        ? data.description
        : "我的商品货架，欢迎大家选购";
      var logo = data && data.logo
        ? data.logo + "?imageView2/1/w/50/h/50/interlace/1/q/75"
        : "http://static.fangzhoubuluo.com/logo.png";

      await wxApi.config(["onMenuShareTimeline", "onMenuShareAppMessage"]);
      window.wx.onMenuShareAppMessage(
        {
          title: name,
          desc: desc,
          link: config.webHost + "/item/list.html?userId=" + getQueryString("userId"),
          imgUrl: logo
        },
        function(res) {}
      );
      window.wx.onMenuShareTimeline(
        {
          title: name,
          desc: desc,
          link: config.webHost + "/item/list.html?userId=" + getQueryString("userId"),
          imgUrl: logo
        },
        function(res) {}
      );
    }
  }
};
</script>

<style lang="scss">
html,
body,
.main {
  height: 100%;
  background-color: #fff;
  font-family: "Helvetica Neue", Helvetica, STHeiTi, Arial, sans-serif !important;
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
      position: relative;
      flex: 0 0 48%;
      margin-bottom: 1rem;
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
        height: 10rem;
      }

      .badge {
        position: absolute;
        top: 0em;
        right: 0rem;
        font-size: 1rem;
        border-radius: 0px;
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
        min-height: 2.125rem;
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


