<template>
  <div class="main" v-if="product && showApp">
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
          <span>单价：￥{{product.sellPrice}} </span>
        </p>
      </div>
      <!-- <div class="product-detail">
        {{product.description}}
      </div> -->
      <div class="shop">
        <h4 v-if="shopInfo.address != null && shopInfo.address != ''">- 店铺地址 -</h4>
        <div  v-if="shopInfo.address != null && shopInfo.address != ''" class="address">{{shopInfo.address}}</div>
        <h4 v-if="shopInfo.src != null  && shopInfo.src != ''">- 店铺二维码 -</h4>
        <img v-if="shopInfo.src != null  && shopInfo.src != ''" :src="shopInfo.src"/>
      </div>
    </div>
    <div class="buy-wrap">
      <a :href="'./list.html?userId=' + userId" class="buy-tohome"></a>
      <div class="buy" @click="buy">立即购买</div>
    </div>
  </div>
</template>

<script>
import axios from "../../common/js/axios";
import { auth } from "../../common/js/auth";
import config from "../../common/js/config";
import { tryFunc, openAlert, getQueryString } from "../../common/js/common";
import wxApi from "../../common/js/wxApi";

export default {
  data() {
    return {
      pId: getQueryString("pId"),
      userId: "",
      product: null,
      showApp: false,
      buyed: false,
      shopInfo: {}
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      if (!this.pId) {
        openAlert("商品编号无效");
        return;
      }
      const { data: product } = await axios.get(`/item/${this.pId}`);
      product.images = product.imgUrl.split(",");
      this.product = product;
      window.document.title = product.name;

      const { data: shopInfo } = await axios.get(`/item/${this.pId}/shopInfo`);
      this.shopInfo = shopInfo;

      this.$nextTick(() => {
        const swiper = new window.Swiper(".swiper-container", {
          direction: "horizontal",
          autoplay: {
            delay: 2000
          },
          speed: 1000,
          loop: true,
          pagination: {
            el: ".swiper-pagination"
          }
        });
        console.log(swiper);
      });

      this.shareFunc();
    });
    
  },
  methods: {
    async shareFunc() {
      console.log(this.product);
      if (this.product.type === "SPECIAL") {
        var name = this.shopInfo.name + "本周特价（欢迎抢购）";
        const { data } = await axios.get(`/item/${this.pId}/special`);
        var desc = data.description;
      } else {
        var name = this.product.name;
        var desc = this.product.description
          ? this.product.description
          : "商品描述";
      }

      await wxApi.config(["onMenuShareTimeline", "onMenuShareAppMessage"]);
      window.wx.onMenuShareAppMessage(
        {
          title: name,
          desc: desc,
          link: config.webHost + "/item/detail.html?pId=" + this.pId,
          imgUrl:
            this.product.images[0] + "?imageView2/1/w/50/h/50/interlace/1/q/75"
        },
        function(res) {}
      );
      window.wx.onMenuShareTimeline(
        {
          title: name,
          desc: desc,
          link: config.webHost + "/item/detail.html?pId=" + this.pId,
          imgUrl:
            this.product.images[0] + "?imageView2/1/w/50/h/50/interlace/1/q/75"
        },
        function(res) {}
      );
    },
    async buy() {
      let name = localStorage.getItem("name");
      if (!name) {
        name = prompt("请输入您联系电话，方便卖家与您联系。", "");
        if (!name) {
          openAlert("请输入正确的联系方式或微信号");
          return;
        }
        localStorage.setItem("name", name);
      }
      if (!this.buyed) {
        this.buyed = true;
        tryFunc(async () => {
          await axios.get(`/item/${this.pId}/buy?name=${name}`);
          openAlert(
            "购买成功,请等待卖家联系。若卖家长时间未联系请点击下方的联系卖家按钮!"
          );
        });
      }
    }
  }
};
</script>

<style lang="scss">
body {
  font-family: "Helvetica Neue", Helvetica, STHeiTi, Arial, sans-serif !important;
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


