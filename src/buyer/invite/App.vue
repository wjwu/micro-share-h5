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
      <a
        class="weui-cell weui-cell_access"
        @click="handleClick(item.shopName, item)"
        v-for="item in inviteShop"
        :key="item.id"
      >
        <div class="weui-cell__hd">
          <img :src="item.shopImg" alt style="width:3rem;margin-right:5px;display:block">
        </div>
        <div class="weui-cell__bd">
          <p> {{item.shopName}}</p>
        </div>
        <div class="weui-cell__ft">
          奖励￥{{item.price}}
          <br>
          {{item.startTime}}
          <br>
          {{item.endTime}}
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "../../common/js/axios";
import format from "date-fns/format";
// import { auth } from '../../common/js/auth';
import { tryFunc, openAlert } from "../../common/js/common";
import { WeuiCells, WeuiCell, WeuiCellsTitle } from "../../common/components";
import wxApi from "../../common/js/wxApi";
import config from "../../common/js/config";

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
      select: "暂未选择店铺"
    };
  },
  mounted() {
    tryFunc(async () => {
      //await auth();
      this.showApp = true;
      const { data } = await axios.get("/buyer/invite");
      this.inviteShop = data;

      let title, desc, link, imgUrl;
      if (this.selectShop === null) {
        title = "商伴部落";
        desc = "开启找寻社区商伴，抱团联合经营之旅";
        link = config.webHost;
        imgUrl = "http://static.fangzhoubuluo.com/logo.png";
      } else {
        let inviterId = localStorage.getItem("userId");
        title = this.selectShop.title;
        desc = this.selectShop.description;
        imgUrl = this.selectShop.shopImg;
        link =
          config.webHost +
          `/shop.html?userId=${this.selectShop.shopId}&inviterId=${inviterId}`;
      }

      await wxApi.config(["onMenuShareTimeline", "onMenuShareAppMessage"]);
      window.wx.onMenuShareAppMessage(
        {
          title: title,
          desc: desc,
          link: link,
          imgUrl: imgUrl
        },
        function(res) {
          if (this.selectShop === null) {
            openAlert("分享成功但未选择店铺");
          }
        }
      );
      window.wx.onMenuShareTimeline(
        {
          title: title,
          desc: desc,
          link: link,
          imgUrl: imgUrl
        },
        function(res) {
          if (this.selectShop === null) {
            openAlert("分享成功但未选择店铺");
          }
        }
      );
    });
  },
  methods: {
    handleClick(name, item) {
      this.select = name;
      this.selectShop = item;
    }
  },
  filters: {
    time: val => {
      return format(val, "YYYY-MM-DD HH:mm:ss");
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
</style>



