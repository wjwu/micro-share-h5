<template>
  <div v-if="showApp">
    <cust-bar :active-index="1">
      <div class="main" v-if="shop">
        <div class="hd">
          <div class="avatar"></div>
          <div class="info">
            <div class="name">{{shop.address}}</div>
          </div>
        </div>
        <div class="notice">
          <p>店长公告：</p>
          <marquee>{{shop.notice}}</marquee>
        </div>
        <div class="activity" v-if="showAct">
          <h2>优惠活动
            <span>/ ACTIVITIES</span>
          </h2>
          <div v-if="act" style="padding-left:2.5rem;color: #404040;">
            活动时间：{{act.startTime}} - {{act.endTime}}
            <br>老带新：各赠送老/新顾客现金抵用券
            <span style="color:red;">{{act.price}}</span>元
            <br>注:每次购物限用一张
          </div>
        </div>
        <div class="special">
          <h2>本周特价
            <span>/ SPECIALS</span>
          </h2>
          <ul v-if="products">
            <li v-for="product in products.specialList" :key="product.id">
              <a :href="`./product.html?productId=${product.id}`">
                <img :src="product.imgUrl + '?imageView2/1/w/500/h/500/interlace/1/q/75|watermark/2/text/QOWVhuS8tOmDqOiQvQ==/font/5b6u6L2v6ZuF6buR/fontsize/320/fill/I0ZBRkFGQQ==/dissolve/100/gravity/SouthEast/dx/10/dy/10|imageslim'">
                <h3>{{product.name}}</h3>
                <p class="desc">{{product.description}}</p>
                <p class="price">
                  <span>￥{{product.sellPrice}}元 / {{product.spec}}</span>
                  <small>{{product.stock}}可售</small>
                </p>
              </a>
            </li>
          </ul>
        </div>
        <div class="newer">
          <h2>店长推荐
            <span>/ RECOMMENDS</span>
          </h2>
          <ul v-if="products">
            <li v-for="product in products.newerList" :key="product.id">
              <a :href="`./product.html?productId=${product.id}`">
                <img :src="product.imgUrl + '?imageView2/1/w/500/h/500/interlace/1/q/75|watermark/2/text/QOWVhuS8tOmDqOiQvQ==/font/5b6u6L2v6ZuF6buR/fontsize/320/fill/I0ZBRkFGQQ==/dissolve/100/gravity/SouthEast/dx/10/dy/10|imageslim'">
                <h3>{{product.name}}</h3>
                <p class="desc">{{product.description}}</p>
                <p class="price">
                  <span>￥{{product.sellPrice}}元 / {{product.spec}}</span>
                  <small>{{product.stock}}可售</small>
                </p>
              </a>
            </li>
          </ul>
        </div>
        <div class="all">
          <h2>所有商品
            <span>/ ALL</span>
          </h2>
          <ul v-if="products">
            <li v-for="product in products.normalList" :key="product.id">
              <a :href="`./product.html?productId=${product.id}`">
                <img :src="product.imgUrl + '?imageView2/1/w/500/h/500/interlace/1/q/75|watermark/2/text/QOWVhuS8tOmDqOiQvQ==/font/5b6u6L2v6ZuF6buR/fontsize/320/fill/I0ZBRkFGQQ==/dissolve/100/gravity/SouthEast/dx/10/dy/10|imageslim'">
                <h3>{{product.name}}</h3>
                <p class="desc">{{product.description}}</p>
                <p class="price">
                  <span>￥{{product.sellPrice}}元 / {{product.spec}}</span>
                  <small>{{product.stock}}可售</small>
                </p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </cust-bar>
    <coupon-mask :price="couponPrice" :visible.sync="showCoupon"></coupon-mask>
  </div>
</template>
<script>
import axios from '../common/js/axios';
import { tryFunc, getQueryString } from '../common/js/common';
import CustBar from '../common/components/CustBar';
import CouponMask from './CouponMask';
import config from '../common/js/config';
import wxApi from '../common/js/wxApi';

export default {
  components: {
    CustBar,
    CouponMask
  },
  data() {
    return {
      showApp: false,
      showAct: false,
      showCoupon: false,
      couponPrice: '0',
      act: null,
      shop: null,
      products: null,
      cartCount: '',
      userId: getQueryString('userId')
    };
  },
  mounted() {
    tryFunc(async () => {
      this.showApp = true;
      const { data: shop } = await axios.get('/user/shopInfoById', {
        params: {
          userId: this.userId
        }
      });
      this.shop = shop;
      const { data: shopAct } = await axios.get('/user/shopAct', {
        params: {
          userId: this.userId
        }
      });
      if (shopAct) {
        this.showAct = true;
        this.act = shopAct;
      }
      const inviterId = getQueryString('inviterId');
      if (inviterId && shopAct) {
        const { data: inviter } = await axios.get('/user/checkShopInvite', {
          params: {
            inviterId: inviterId,
            shopId: this.userId
          }
        });
        if (inviter) {
          // 显示优惠券
          this.couponPrice = this.act.price.toString();
          this.showCoupon = true;
        }
      }
      window.document.title = this.shop.name;
      const { data: products } = await axios.get(
        `item/owner/all?userId=${this.userId}`
      );
      const getFirstImg = item => {
        return {
          ...item,
          imgUrl: item.imgUrl ? item.imgUrl.split(',')[0] : ''
        };
      };
      products.newerList = products.newerList.map(getFirstImg);
      products.normalList = products.normalList.map(getFirstImg);
      products.specialList = products.specialList.map(getFirstImg);
      this.products = products;
      this.$nextTick(() => {
        this.$el.querySelector('.hd').style.background = `url("${
          this.shop.background
        }") no-repeat`;
        this.$el.querySelector('.avatar').style.background = `url("${
          this.shop.logo
        }") no-repeat`;
      });

      let title = this.shop.name;
      let desc = this.shop.description;
      let imgUrl = this.shop.logo + '?imageView2/1/w/50/h/50/interlace/1/q/75/.jpg';
      let link = config.webHost + `/shop.html?userId=${this.shop.userId}`;
      await wxApi.config(['onMenuShareTimeline', 'onMenuShareAppMessage']);
      window.wx.onMenuShareAppMessage(
        {
          title: title,
          desc: desc,
          link: link,
          imgUrl: imgUrl
        },
        function(res) {}
      );
      window.wx.onMenuShareTimeline(
        {
          title: title,
          desc: desc,
          link: link,
          imgUrl: imgUrl
        },
        function(res) {
        }
      );
    });
  }
};
</script>

<style lang="scss">
body {
  background-color: #fff;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.hd {
  position: relative;
  height: 10rem;
  background-size: cover !important;
  &:after {
    content: '';
    width: 100%;
    height: 10rem;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    background-size: inherit;
    filter: blur(3px);
    z-index: 2;
  }
  .avatar {
    position: absolute;
    top: 1.5625rem;
    left: calc(50% - 2.625rem);
    width: 5.25rem;
    height: 5.25rem;
    border-radius: 50%;
    border: 1px solid #fff;
    background-size: cover !important;
    z-index: 3;
  }
  .info {
    position: absolute;
    width: 100%;
    top: 7.5rem;
    z-index: 3;
    .name {
      font-size: 1.125rem;
      color: #fff;
      text-align: center;
    }
  }
}

.notice {
  padding: 0.3rem 1.25rem;
  display: flex;
  p {
    flex-shrink: 0;
    font-size: 0.875rem;
  }
  marquee {
    font-size: 0.75rem;
    color: #333;
  }
  background-color: #f4f4f4;
}

.activity,
.special,
.newer,
.all {
  h2 {
    padding: 1rem 1.25rem 1rem;
    color: #333;
    font-size: 1.125rem;
    letter-spacing: 1;
    line-height: 1.5625rem;
    font-weight: 700;

    span {
      font-weight: 0.875rem;
      font-weight: lighter;
      color: #b2b2b2;
      letter-spacing: 1;
      line-height: 1.5625rem;
      padding-left: 0.375rem;
    }
  }

  ul {
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
.activity {
  h2 {
    padding: 0.5rem 1.25rem 0.5rem;
  }
}
</style>


