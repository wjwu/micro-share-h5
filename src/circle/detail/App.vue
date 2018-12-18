<template>
  <div v-if="showApp && circle">
    <div style="padding:1.5rem;">
      <h1>{{circle.name}}</h1>
      <div v-if="circle.status == 'PASS' && userId != circle.userId">
        您邀请成员有 <span style="color:red;">{{circle.passedMemberDtoList ? circle.passedMemberDtoList.length : 0}}</span> 名通过群分享审核，距一个月到期时间还剩{{circle.createTime | time}}天。
      </div>
      <div v-if="circleFirstShow">
        <span>欢迎您加入{{circle.name}}圈子，您可参与“找商伴”分享，审核通过后即可免费获得智能货架使用工具，开启圈内抱团联合经营。</span>
        <a style="margin-top:1rem;" href="/" class="weui-btn weui-btn_plain-primary">我想先了解一下部落</a>
        <a href="/buy.html" class="weui-btn weui-btn_plain-primary">直接参与找商伴</a>
      </div>
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
            <template slot="foot" v-if="userId == circle.userId && circle.userId != item.userId">
              <a @click="handleDel(item.userId)" class="weui-btn weui-btn_mini weui-btn_default">移除成员</a>
            </template>
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
    <weui-btn-area>
      <weui-btn type="warn" v-if="circle.userId != userId" @click="handleQuit">离开圈子</weui-btn>
    </weui-btn-area>
  </div>
</template>

<script>
import {
  WeuiCells,
  WeuiCell,
  WeuiCellsTitle,
  WeuiPanel,
  WeuiLoadMoreLine,
  WeuiBtn,
  WeuiBtnArea
} from '../../common/components';
import axios from '../../common/js/axios';
import config from '../../common/js/config';
import { auth } from '../../common/js/auth';
import { tryFunc, getQueryString, openConfirm } from '../../common/js/common';
import wxApi from '../../common/js/wxApi';

export default {
  components: {
    WeuiCells,
    WeuiCell,
    WeuiCellsTitle,
    WeuiPanel,
    WeuiLoadMoreLine,
    WeuiBtn,
    WeuiBtnArea
  },
  data() {
    return {
      showApp: false,
      circle: null,
      circleFirstShow: true,
      userId: localStorage.getItem('userId'),
      timestamp: new Date().getTime()
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      let circleFirstShow = localStorage.getItem('circleFirstShow');
      if (circleFirstShow) {
        this.circleFirstShow = false;
      } else {
        localStorage.setItem('circleFirstShow', 1);
      }
      const { data } = await axios.get(`/circle/${getQueryString('id')}`);
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
    handleQuit() {
      openConfirm('您确定要离开圈子？', () => {
        axios.post(`/circle/${this.circle.id}/quit`).then(function(response) {
          window.location.href = '/';
        });
      });
    },
    handleDel(userId) {
      openConfirm('您确定要删除该成员？', () => {
        axios
          .delete(`/circle/${this.circle.id}/member/${userId}`)
          .then(function(response) {
            window.location.reload();
          });
      });
    },
    async shareFunc() {
      await wxApi.config(['onMenuShareTimeline', 'onMenuShareAppMessage']);
      let name = '组建圈子邀请函';
      let desc =
        '您的朋友邀请您一起组建' +
        this.circle.name +
        '私人商伴圈子，抱团联合经营。如您前往，有机会获得免费使用智能社交网店工具。';
      window.wx.onMenuShareAppMessage(
        {
          title: name,
          desc: desc,
          link: config.webHost + '/item/detail.html?pId=' + this.circle.id,
          imgUrl: 'http://static.fangzhoubuluo.com/logo.png'
        },
        function(res) {}
      );
      window.wx.onMenuShareTimeline(
        {
          title: name,
          desc: desc,
          link: config.webHost + '/item/detail.html?pId=' + this.circle.id,
          imgUrl: 'http://static.fangzhoubuluo.com/logo.png'
        },
        function(res) {}
      );
    }
  },
  filters: {
    time: val => {
      val = Number(val) + 30 * 24 * 60 * 60 * 1000;
      const result = Math.round(
        Math.abs(val - new Date().getTime()) / 1000 / 60 / 60 / 24
      );
      return result;
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

