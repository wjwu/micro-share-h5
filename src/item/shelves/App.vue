<template>
  <div class="weui-panel" v-if="showApp">
    <div class="weui-panel__hd">我的货架（<b>分享本页即可把货架首页发送给朋友及朋友圈</b>）</div>
    <div class="page__bd page__bd_spacing" style="padding: 0 .8rem;">
      <a href="./submit.html" class="weui-btn weui-btn_primary">添加商品</a>
      <a :href="`./list.html?userId=${userId}`" class="weui-btn weui-btn_primary">查看货架</a>
    </div>
    <div class="weui-panel__hd">商品管理</div>
    <div class="weui-cell" v-for="item in products" :key="item.id">
      <div class="weui-cell__hd" style="position: relative;">
        <img :src="item.imgUrl + '?imageView2/1/w/100/h/100/interlace/1/q/75'" />
        <span class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;" v-if="item.type === 'GROUP'">团</span>
      </div>
      <div class="weui-cell__bd">
        <p>{{item.name}}</p>
        <p style="font-size: 13px;color: #888888;">¥{{item.sellPrice}} - {{item.stock}}已售</p>
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
import axios from '../../common/js/axios';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import { openAlert, openConfirm, tryFunc } from '../../common/js/common';
import wxApi from '../../common/js/wxApi';

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
      await this.checkShopInfo();
    });
  },
  methods: {
    async checkShopInfo() {
      var userId = localStorage.getItem('userId');
      const { data } = await axios.get('/user/shopInfo', {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      if (!data) {
        openAlert('请先设置店铺标题，点击确定前往', () => {
          window.location.href = '/other/toker.html';
        });
      }

      var name = data.name ? data.name + '电子货架（欢迎选购）' : '商伴部落';
      var desc = data.description
        ? data.description
        : '我的商品货架，欢迎大家选购';
      var logo = data.logo
        ? data.logo
        : 'http://static.fangzhoubuluo.com/logo.png';

      await wxApi.config(['onMenuShareTimeline', 'onMenuShareAppMessage']);
      window.wx.onMenuShareAppMessage(
        {
          title: name,
          desc: desc,
          link: config.webHost + '/item/list.html?userId=' + userId,
          imgUrl: logo
        },
        function(res) {}
      );
      window.wx.onMenuShareTimeline(
        {
          title: name,
          desc: desc,
          link: config.webHost + '/item/list.html?userId=' + userId,
          imgUrl: logo
        },
        function(res) {}
      );
    },
    async getProducts() {
      const { data } = await axios.get('/item');
      console.log(data);
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
      openConfirm('您确实要删除该商品？', () => {
        tryFunc(async () => {
          await axios.delete(`/item/${id}`);
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


