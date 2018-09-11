<template>
  <div class="weui-panel" v-if="showApp">
    <div class="weui-panel__hd">我的货架</div>
    <div class="page__bd page__bd_spacing" style="padding: 0 .8rem;">
      <a :href="`./list.html?userId=${userId}`" class="weui-btn weui-btn_primary">查看我的货架</a>
      <a :href="`https://sapi.k780.com/?app=qr.get&data=${webHost}/item/list.html?userId=${userId}&level=L&size=6`" class="weui-btn weui-btn_primary">店铺二维码</a>
      <a href="./submit.html" class="weui-btn weui-btn_primary">添加商品</a>
    </div>
    <div class="weui-panel__hd">商品管理</div>
    <div class="weui-cell" v-for="item in products" :key="item.id">
      <div class="weui-cell__hd" style="position: relative;">
        <img :src="item.imgUrl" />
        <span class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;" v-if="item.type === 'GROUP'">团</span>
      </div>
      <div class="weui-cell__bd">
        <p>{{item.name}}</p>
        <p style="font-size: 13px;color: #888888;">¥{{item.sellPrice}} - {{item.sales}}已售</p>
      </div>
      <div class="weui-cell__ft">
        <a class="weui-btn weui-btn_mini weui-btn_default" href="javascript:;" @click="handleEdit(item.id)">编辑</a>
        <a class="weui-btn weui-btn_mini weui-btn_warn" href="javascript:;" @click="handleDelete(item.id)">删除</a>
      </div>
    </div>
    <div class="weui-panel__bd">
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
import weui from 'weui.js';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import { tryFunc } from '../../common/js/common';

export default {
  data() {
    return {
      showApp: false,
      products: [],
      userId: localStorage.getItem('userId'),
      webHost: config.webHost
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      await this.getProducts();
    });
  },
  methods: {
    async getProducts() {
      const { data } = await axios.get(`${config.apiHost}/item`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      this.products = data.map(item => {
        return {
          ...item,
          imgUrl: item.imgUrl ? item.imgUrl.split(',')[0] : ''
        };
      });
    },
    handleEdit(id) {
      window.location.href = `./edit.html?pId=${id}`;
    },
    handleDelete(id) {
      weui.confirm('您确实要删除改商品？', () => {
        tryFunc(async () => {
          await axios.delete(`${config.apiHost}/item/${id}`);
          await this.getProducts();
        });
      });
    }
  }
};
</script>

<style lang="scss">
.weui-cell__hd {
  margin-right: 10px;
}
.weui-cell__hd {
  img {
    width: 50px;
    height: 50px;
  }
}
.weui-cell__ft {
  a:last-of-type {
    margin-left: 0.5rem;
  }
}
</style>


