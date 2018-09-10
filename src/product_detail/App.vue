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
  </div>
</template>

<script>
import 'babel-polyfill';
import axios from 'axios';
import { auth } from '../common/js/auth';
import config from '../common/js/config';
import { tryFunc, openToast, getQueryString } from '../common/js/common';

export default {
  data() {
    return {
      pId: getQueryString('pId'),
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
      const { data } = await axios.get(`${config.apiHost}/item/${this.pId}`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
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
  }
};
</script>

<style lang="scss">
.swiper-container {
  height: 20rem;
}
.swiper-slide {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>


