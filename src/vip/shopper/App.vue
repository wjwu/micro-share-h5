<template>
  <bar v-if="showApp" :active-index="3">
    <a href="/qa.html" class="help">
      <img src="./assets/images/help.png">
    </a>
    <div class="page__hd top">
      <div class="top-info">
        <h1 class="page__title">我的管家</h1>
        <span class="expire-time">有效期至：{{vipInfo.baseVipExpire | time}}</span>
      </div>
      <p class="page__desc">建议您关注并置顶公众号，以方便您及时收取和处理相关进展</p>
    </div>
    <div class="weui-grids content">
      <a href="../../other/poster/template_new.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/new.png" alt="">
        </div>
        <p class="weui-grid__label">新品鉴赏</p>
      </a>
      <a href="../../other/poster/template_hot.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/vip.png" alt="">
        </div>
        <p class="weui-grid__label">本周特价</p>
      </a>
      <a href="../../item/shelves.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/shop.png" alt="">
        </div>
        <p class="weui-grid__label">店铺货架</p>
      </a>
      <a href="../../bill/save.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/account.png" alt="">
        </div>
        <p class="weui-grid__label">电子账簿</p>
      </a>
      <a href="../../other/toker.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/qrcode.png" alt="">
        </div>
        <p class="weui-grid__label">引流拓客</p>
      </a>
      <a href="../robot/grab.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/robot.png" alt="">
        </div>
        <p class="weui-grid__label">订单抓取</p>
      </a>
      <a href="../robot/follow.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/follow.png" alt="">
        </div>
        <p class="weui-grid__label">关注人</p>
      </a>
    </div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>管家工具</p>
          <small v-if="vipInfo.advVipFlag">有效期至：{{vipInfo.advVipExpire | time}}</small>
        </div>
      </div>
    </div>
    <div class="weui-grids content">
      <div class="mask" v-if="!vipInfo.advVipFlag" @click="handleClickMask"></div>
      <a href="/robot/task/list.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/msg.png" alt="">
        </div>
        <p class="weui-grid__label">一键群发</p>
      </a>
      <a href="/partner/share.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/hand.png" alt="">
        </div>
        <p class="weui-grid__label">商伴共享</p>
      </a>
      <a href="/group/setup.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/newuser.png" alt="">
        </div>
        <p class="weui-grid__label">欢迎&群规</p>
      </a>
      <a href="javascript:;" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/more.png" alt="">
        </div>
        <p class="weui-grid__label">更多功能</p>
      </a>
    </div>
  </bar>
</template>

<script>
import format from 'date-fns/format';
import weui from 'weui.js';
import { auth, checkIsMember } from '../../common/js/auth';
import { tryFunc } from '../../common/js/common';
import Bar from '../../common/components/Bar';
import defaultHeadPhone from './assets/images/user.png';
import '../../common/js/share';

export default {
  components: {
    Bar
  },
  data() {
    return {
      showApp: false,
      headPhoto: localStorage.getItem('headPhoto') || defaultHeadPhone,
      vipInfo: null
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.vipInfo = await checkIsMember();
      this.showApp = true;
    });
  },
  methods: {
    handleClickMask() {
      weui.confirm(
        '购买店长版VIP即可使用管家工具，是否前往购买页面购买？',
        () => {
          window.location.href = '/pay.html';
        }
      );
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
.weui-cell__bd {
  display: flex;
  justify-content: space-between;
  align-items: center;

  small {
    font-size: 12px;
    color: #d9d9d9;
  }
}
.top {
  padding: 2rem;
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

.mask {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99;
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
</style>
