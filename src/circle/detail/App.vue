<template>
  <div v-if="showApp && circle">
    <div class="title">
      <h1>{{circle.name}}</h1>
    </div>
    <weui-cells>
      <weui-cell label="人数：">{{circle.groupNum}}</weui-cell>
      <weui-cell label="行业：">{{circle.industry}}</weui-cell>
      <weui-cell label="主题：">{{circle.subject}}</weui-cell>
    </weui-cells>
    <weui-panel label="圈子成员">
      <div class="weui-media-box weui-media-box_small-appmsg">
        <weui-cells v-if="circle.circleMemberDtoList && circle.circleMemberDtoList.length>0">
          <weui-cell :key="item.userId" v-for="item in circle.circleMemberDtoList">
            <template slot="head">
              <img :src="item.headPhoto">
            </template>
            <p>{{item.nickName}}</p>
          </weui-cell>
        </weui-cells>
        <weui-load-more-line v-else></weui-load-more-line>
      </div>
    </weui-panel>
    <weui-panel label="审核通过成员">
      <div class="weui-media-box weui-media-box_small-appmsg">
        <weui-cells v-if="circle.passedMemberDtoList && circle.passedMemberDtoList.length>0">
          <weui-cell :key="item.userId" v-for="item in circle.passedMemberDtoList">
            <template slot="head">
              <img :src="item.headPhoto">
            </template>
            <p>{{item.nickName}}</p>
          </weui-cell>
        </weui-cells>
        <weui-load-more-line v-else></weui-load-more-line>
      </div>
    </weui-panel>
  </div>
</template>

<script>
import {
  WeuiCells,
  WeuiCell,
  WeuiCellsTitle,
  WeuiPanel,
  WeuiLoadMoreLine
} from "../../common/components";
import axios from "../../common/js/axios";
import config from "../../common/js/config";
import { auth } from "../../common/js/auth";
import { tryFunc, getQueryString } from "../../common/js/common";
import wxApi from "../../common/js/wxApi";

export default {
  components: {
    WeuiCells,
    WeuiCell,
    WeuiCellsTitle,
    WeuiPanel,
    WeuiLoadMoreLine
  },
  data() {
    return {
      showApp: false,
      circle: null
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`/circle/${getQueryString("id")}`);
      if (data.circleMemberDtoList) {
        data.groupNum = data.circleMemberDtoList.length;
      } else {
        data.groupNum = 0;
      }
      this.circle = data;

      this.shareFunc();
    });
  },
  methods: {
    async shareFunc() {
      await wxApi.config(["onMenuShareTimeline", "onMenuShareAppMessage"]);
      name = "组建圈子邀请函";
      desc = "您的朋友邀请您一起组建" + this.circle.name + "私人商伴圈子，抱团联合经营。如您前往，有机会获得免费使用智能社交网店工具。"
      window.wx.onMenuShareAppMessage(
        {
          title: name,
          desc: desc,
          link: config.webHost + "/item/detail.html?pId=" + this.circle.id,
          imgUrl: "http://static.fangzhoubuluo.com/logo.png"
        },
        function(res) {}
      );
      window.wx.onMenuShareTimeline(
        {
          title: name,
          desc: desc,
          link: config.webHost + "/item/detail.html?pId=" + this.circle.id,
          imgUrl: "http://static.fangzhoubuluo.com/logo.png"
        },
        function(res) {}
      );
    }
  }
};
</script>

<style lang="scss">
img {
  margin-right: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
}
/*.member {
  display: flex;
  align-items: center;
  img {
    margin-right: 1rem;
    width: 1.75rem;
    height: 1.75rem;
  }
}*/
</style>

