<template>
  <div v-if="showApp">
    <div class="title">
      <h1>邀请加入</h1>
    </div>
    <div class="desc" v-if="this.userName === this.mineUserName">请分享本页给朋友，本条提示仅圈主可见</div>
    <div class="desc">您的好友
      <b style="color:red;">{{userName}}</b>邀请您一起组建
      <b style="color:red;">《{{circleName}}》</b>商伴圈，联合抱团经营。加入圈子，您将有机会免费获得手掌柜智能社交商城工具
    </div>
    <weui-btn-area>
      <weui-btn type="primary" @click="handleJoinClick">立即加入</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import axios from "../../common/js/axios";
import { auth } from "../../common/js/auth";
import { WeuiBtnArea, WeuiBtn } from "../../common/components";
import { tryFunc, getQueryString, openAlert } from "../../common/js/common";
import wxApi from "../../common/js/wxApi";
import config from "../../common/js/config";

export default {
  components: {
    WeuiBtnArea,
    WeuiBtn
  },
  data() {
    return {
      showApp: false,
      circleId: getQueryString("circleId"),
      userName: getQueryString("userName"),
      circleName: "",
      mineUserName: localStorage.getItem("userName")
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      const { data } = await axios.get(`/circle/${this.circleId}`);
      this.circleName = data.name;
      this.showApp = true;

      let title = `您的好友${this.userName}邀请您组件圈子`;
      let desc = `联合抱团经营。加入圈子，您将有机会免费获得手掌柜智能社交商城工具`;
      let link = location.href;
      let imgUrl = 'http://static.fangzhoubuluo.com/logo.png';
      await wxApi.config(["onMenuShareTimeline", "onMenuShareAppMessage"]);
      window.wx.onMenuShareAppMessage(
        {
          title: title,
          desc: desc,
          link: link,
          imgUrl: imgUrl
        },
        function(res) {
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
    handleJoinClick() {
      tryFunc(async () => {
        await axios.post(`/circle/${this.circleId}/addMember`);
        openAlert("加入成功", () => {
          window.location.href = `/circle/detail.html?id=${this.circleId}`;
        });
      });
    }
  }
};
</script>

<style lang="scss">
.desc {
  padding: 0 2rem 2rem 2rem;
  font-size: 0.875rem;
  color: #808080;

  b {
    margin: 0 0.3125rem;
    font-size: 1rem;
  }
}
</style>

