<template>
  <div v-if="showApp">
    <div class="title">
      <h1>邀请活动</h1>
      <div class="sub-content">
        <div class="subs">
          <div class="sub">分享前必须点击选择需要分享的店铺</div>
        </div>
      </div>
    </div>
    <div class="weui-cells__title">
      已选择店铺：（
      <span style="color:red;font-weight:900;">{{select}}</span>）
    </div>
    <div class="weui-cells">
      <a class="weui-cell weui-cell_access" @click="handleClick(item.shopName, item)" v-for="item in inviteShop" :key="item.id">
        <div class="weui-cell__hd">
          <img :src="item.shopImg" alt style="width:3rem;margin-right:5px;display:block">
        </div>
        <div class="weui-cell__bd">
          <p>{{item.shopName}}</p>
        </div>
        <div class="weui-cell__ft">
          满￥{{item.mustPrice}}减￥{{item.price}}
          <br>
          {{item.startTime}}
          <br>
          {{item.endTime}}
        </div>
      </a>
    </div>
    <div class="mask" v-if="showMask" @click="showMask=false">
      <img src="./assets/images/share.png">
    </div>
  </div>
</template>

<script>
import axios from '../../common/js/axios';
import format from 'date-fns/format';
import { tryFunc, openAlert } from '../../common/js/common';
import { WeuiCells, WeuiCell, WeuiCellsTitle } from '../../common/components';
import wxApi from '../../common/js/wxApi';
import config from '../../common/js/config';

export default {
  components: {
    WeuiCells,
    WeuiCell,
    WeuiCellsTitle
  },
  data() {
    return {
      showApp: false,
      inviteShop: [],
      selectShop: null,
      select: '暂未选择店铺',
      showMask: false,
      title: '商伴部落',
      desc: '开启找寻社区商伴，抱团联合经营之旅',
      link: config.webHost,
      imgUrl: 'http://static.fangzhoubuluo.com/logo.png'
    };
  },
  mounted() {
    tryFunc(async () => {
      this.showApp = true;
      const { data } = await axios.get('/buyer/invite');
      this.inviteShop = data;

      this.share();
    });
  },
  methods: {
    async share() {
      await wxApi.config(['onMenuShareTimeline', 'onMenuShareAppMessage']);
      window.wx.onMenuShareAppMessage(
        {
          title: this.title,
          desc: this.desc,
          link: this.link,
          imgUrl: this.imgUrl
        },
        function(res) {
          if (this.selectShop === null) {
            openAlert('分享成功但未选择店铺');
          }
        }
      );
      window.wx.onMenuShareTimeline(
        {
          title: this.title,
          desc: this.desc,
          link: this.link,
          imgUrl: this.imgUrl
        },
        function(res) {
          if (this.selectShop === null) {
            openAlert('分享成功但未选择店铺');
          }
        }
      );
    },
    async handleClick(name, item) {
      this.select = name;
      this.selectShop = item;
      this.showMask = true;

      let inviterId = localStorage.getItem('userId');
      this.title = this.selectShop.title;
      this.desc = this.selectShop.description;
      this.imgUrl =
        this.selectShop.shopImg +
        '?imageView2/1/w/50/h/50/interlace/1/q/75/.jpg';
      this.link =
        config.webHost +
        `/shop.html?userId=${this.selectShop.shopId}&inviterId=${inviterId}`;

      this.share();
    }
  },
  filters: {
    time: val => {
      return format(val, 'YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>

<style lang="scss">
.weui-media-box {
  h4 {
    color: #000 !important;
  }
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: right;

  img {
    width: 90%;
  }
}
</style>



