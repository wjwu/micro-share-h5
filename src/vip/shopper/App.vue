<template>
  <bar v-if="showApp" :active-index="3">
    <a href="/qa.html" class="help">
      <img src="./assets/images/help.png">
    </a>
    <div class="page__hd top">
      <div class="top-info">
        <h1 class="page__title">网店</h1>
      </div>
      <p class="page__desc">建议您关注并置顶公众号，以方便您及时收取和处理相关进展</p>
    </div>
    <!-- <div class="weui-cell">
      <div class="weui-cell__bd">
        <p>店长模块</p>
        <small v-if="vipInfo.advVipFlag">有效期至：{{vipInfo.advVipExpire | time}}</small>
      </div>
    </div> -->
    <!-- <div class="weui-grids content">
      <a href="javascript:;" @click="handleJumpShopper('/item/shelves.html')" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/shop.png" alt="">
        </div>
        <p class="weui-grid__label">店铺货架</p>
      </a>
      <a href="javascript:;" @click="handleJumpShopper('/item/new.html')" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/new.png" alt="">
        </div>
        <p class="weui-grid__label">新品鉴赏</p>
      </a>
      <a href="javascript:;" @click="handleJumpShopper('/item/special.html')" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/vip.png" alt="">
        </div>
        <p class="weui-grid__label">本周特价</p>
      </a>
      <a href="javascript:;" @click="handleJumpShopper('/bill/save.html')" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/account.png" alt="">
        </div>
        <p class="weui-grid__label">电子账簿</p>
      </a>
      <a href="javascript:;" @click="handleJumpShopper('/other/toker.html')" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/qrcode.png" alt="">
        </div>
        <p class="weui-grid__label">店铺设置</p>
      </a>
      <a href="javascript:;" @click="handleJumpShopper('/robot/grab.html')" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/robot.png" alt="">
        </div>
        <p class="weui-grid__label">订单抓取</p>
      </a>
      <a href="javascript:;" @click="handleJumpShopper('/robot/follow.html')" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/follow.png" alt="">
        </div>
        <p class="weui-grid__label">关注人</p>
      </a>
      <a href="javascript:;" @click="handleJumpShopper('/other/poster/template_hot.html')" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/banner.png" alt="">
        </div>
        <p class="weui-grid__label">海报生成</p>
      </a>
    </div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>基础模块</p>
          <small v-if="vipInfo.baseVipFlag">群数：{{vipInfo.baseVipNumber}}&nbsp;&nbsp;有效期至：{{vipInfo.baseVipExpire | time}}</small>
        </div>
      </div>
    </div>
    <div class="weui-grids content">
      <a href="javascript:;" @click="handleJumpBase('/robot/task/list.html')" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/msg.png" alt="">
        </div>
        <p class="weui-grid__label">一键群发</p>
      </a>
      <a href="javascript:;" @click="handleJumpBase('/partner/share.html')" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/hand.png" alt="">
        </div>
        <p class="weui-grid__label">商伴共享</p>
      </a>
      <a href="javascript:;" @click="handleJumpBase('/group/setup.html')" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/newuser.png" alt="">
        </div>
        <p class="weui-grid__label">欢迎&群规</p>
      </a>
      <a href="javascript:;" @click="handleJumpAll('/success.html?type=1')" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/jump.png" alt="">
        </div>
        <p class="weui-grid__label">添加客服/机器人</p>
      </a>
      <a href="javascript:;" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/more.png" alt="">
        </div>
        <p class="weui-grid__label">更多功能</p>
      </a>
    </div> -->
    <weui-cells-title>
      商城模块
      <small v-if="vipInfo.advVipFlag">有效期至：{{vipInfo.advVipExpire | time}}</small>
    </weui-cells-title>
    <weui-cells>
      <weui-cell-access empty-body empty-foot  @click="handleJumpShopper('/other/toker.html')">
        <template slot="head">
          <div class="head">
            <img src="./assets/images/qrcode.png">
            <label>店铺设置</label>
          </div>
        </template>
      </weui-cell-access>
      <weui-cell-access empty-body empty-foot @click="handleJumpShopper('/item/shelves.html')" >
        <template slot="head">
          <div class="head">
            <img src="./assets/images/shop.png">
            <label>商品管理</label>
          </div>
        </template>
      </weui-cell-access>
      <weui-cell-access empty-body empty-foot>
        <template slot="head">
          <div class="head">
            <img src="./assets/images/order.png">
            <label>我的订单</label>
          </div>
        </template>
      </weui-cell-access>
      <weui-cell-access empty-body empty-foot @click="handleJumpShopper('/bill/save.html')">
        <template slot="head">
          <div class="head">
            <img src="./assets/images/account.png">
            <label>电子账簿</label>
          </div>
        </template>
      </weui-cell-access>
      <weui-cell-access empty-body empty-foot @click="handleJumpShopper('/robot/grab.html')">
        <template slot="head">
          <div class="head">
            <img src="./assets/images/robot.png">
            <label>订单抓取</label>
          </div>
        </template>
      </weui-cell-access>
    </weui-cells>
    <weui-cells>
      <weui-cell-access empty-body empty-foot>
        <template slot="head">
          <div class="head">
            <img src="./assets/images/vip.png">
            <label>会员管理</label>
          </div>
        </template>
      </weui-cell-access>
      <weui-cell-access empty-body empty-foot>
        <template slot="head">
          <div class="head">
            <img src="./assets/images/coupon.png">
            <label>优惠活动</label>
          </div>
        </template>
      </weui-cell-access>
    </weui-cells>
    <weui-cells-title>
      基础模块
      <small v-if="vipInfo.baseVipFlag">群数：{{vipInfo.baseVipNumber}}&nbsp;&nbsp;有效期至：{{vipInfo.baseVipExpire | time}}</small>
    </weui-cells-title>
    <weui-cells>
      <weui-cell-access empty-body empty-foot @click="handleJumpBase('/robot/task/list.html')" >
        <template slot="head">
          <div class="head">
            <img src="./assets/images/msg.png">
            <label>一键群发</label>
          </div>
        </template>
      </weui-cell-access>
      <weui-cell-access empty-body empty-foot @click="handleJumpBase('/partner/share.html')">
        <template slot="head">
          <div class="head">
            <img src="./assets/images/hand.png">
            <label>商伴共享</label>
          </div>
        </template>
      </weui-cell-access>
      <weui-cell-access empty-body empty-foot @click="handleJumpBase('/group/setup.html')">
        <template slot="head">
          <div class="head">
            <img src="./assets/images/manager.png">
            <label>入群欢迎&群规</label>
          </div>
        </template>
      </weui-cell-access>
      <weui-cell-access empty-body empty-foot @click="handleJumpAll('/success.html?type=1')">
        <template slot="head">
          <div class="head">
            <img src="./assets/images/jump.png">
            <label>添加客服/机器人</label>
          </div>
        </template>
      </weui-cell-access>
    </weui-cells>
  </bar>
</template>

<script>
import format from "date-fns/format";
import { auth, checkIsMember } from "../../common/js/auth";
import { tryFunc, openConfirm } from "../../common/js/common";
import {
  Bar,
  WeuiCells,
  WeuiCellAccess,
  WeuiCellsTitle
} from "../../common/components";
import defaultHeadPhone from "./assets/images/user.png";
import "../../common/js/share";

export default {
  components: {
    Bar,
    WeuiCells,
    WeuiCellAccess,
    WeuiCellsTitle
  },
  data() {
    return {
      showApp: false,
      headPhoto: localStorage.getItem("headPhoto") || defaultHeadPhone,
      vipInfo: {}
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      this.vipInfo = await checkIsMember();
    });
  },
  methods: {
    handleJumpAll(url) {
      if (!this.vipInfo.advVipFlag && !this.vipInfo.advVipFlag) {
        openConfirm("您尚未购买VIP功能，是否前往购买页面购买？", () => {
          window.location.href = "/pay.html";
        });
      } else {
        window.location.href = url;
      }
    },
    handleJumpShopper(url) {
      if (!this.vipInfo.advVipFlag) {
        openConfirm("您尚未购买店长版VIP功能，是否前往购买页面购买？", () => {
          window.location.href = "/pay.html";
        });
      } else {
        window.location.href = url;
      }
    },
    handleJumpBase(url) {
      if (!this.vipInfo.baseVipFlag) {
        openConfirm("您尚未购买基础版VIP功能，是否前往购买页面购买？", () => {
          window.location.href = "/pay.html";
        });
      } else {
        window.location.href = url;
      }
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
/*.weui-cell__bd {
  display: flex;
  justify-content: space-between;
  align-items: center;

  small {
    font-size: 12px;
    color: #06b04f;
  }
}*/

small {
  float: right;
  font-size: 12px;
  color: #06b04f;
}
.top {
  padding: 1rem;
  padding-top: .5rem;
  padding-bottom: .5rem;
  background-color: #06b04f;
  color: white;
}

.top-info {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.content {
  position: relative;
  background-color: white;
}

.expire-time {
  color: #fff;
  font-size: 12px;
}

.help {
  position: absolute;
  top: 0.5rem;
  right: 0.7rem;
  line-height: 1;

  img {
    width: 2rem;
    height: 2rem;
  }
}

.head {
  display: flex;
  align-items: center;
  img {
    margin-right: 1rem;
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>
