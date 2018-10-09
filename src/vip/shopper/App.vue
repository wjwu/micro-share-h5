<template>
  <bar v-if="showApp" :active-index="3">
    <div class="page__hd top">
      <div class="top-info">
        <a href="/self/center.html" class="user_center">
          <img :src="headPhoto">
        </a>
        <span class="expire-time">有效期至：{{expireTime | time}}</span>
        <a href="/qa.html" class="help">
          <img src="./assets/images/help.png">
        </a>
      </div>
      <h1 class="page__title">我的管家</h1>
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
      <label class="weui-cell">
        <div class="weui-cell__bd">
          <p>管家工具</p>
        </div>
      </label>
    </div>
    <div class="weui-grids content">
      <a href="../robot/task/list.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/msg.png" alt="">
        </div>
        <p class="weui-grid__label">一键群发</p>
      </a>
      <a href="../partner/share.html" class="weui-grid">
        <div class="weui-grid__icon">
          <img src="./assets/images/hand.png" alt="">
        </div>
        <p class="weui-grid__label">商伴共享</p>
      </a>
      <a href="../group/setup.html" class="weui-grid">
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
import { auth, checkIsMember } from '../../common/js/auth';
// import config from '../../common/js/config';
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
      expireTime: ''
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.expireTime = await checkIsMember(true);
      this.showApp = true;
    });
  },
  filters: {
    time: val => {
      return format(val, 'YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>


<style lang="scss">
.top {
  padding: 2rem;
  background-color: #06b04f;
  color: white;
}

.top-info {
  display: flex;
  align-items: center;
  position: absolute;
  padding: 0.5rem 0.7rem 0 0.7rem;
  top: 0;
  left: 0;
  right: 0;
}

.content {
  background-color: white;
}

.user_center {
  img {
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 50%;
  }
}

.expire-time {
  margin-left: .5rem;
  flex: 1;
  color: #fff;
  font-size: 12px;
}

.help {
  img {
    width: 2rem;
    height: 2rem;
  }
}
</style>
