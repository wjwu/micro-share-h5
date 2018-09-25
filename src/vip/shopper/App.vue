<template>
    <div v-if="showApp">
        <span class="user_center"><img height="100%" width="100%" src="./assets/images/user.png" alt=""></span>
        <span class="help"><img height="100%" width="100%" src="./assets/images/help.png" alt=""></span>
        <div class="page__hd top">
            <h1 class="page__title">我的店长</h1>
            <p class="page__desc">我的店长 √<br />基础模块 x1</p>
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
                <p class="weui-grid__label">一件群发</p>
            </a>
            <a href="../robot/share.html" class="weui-grid">
                <div class="weui-grid__icon">
                    <img src="./assets/images/hand.png" alt="">
                </div>
                <p class="weui-grid__label">商伴共享</p>
            </a>
            <a href="javascript:;" class="weui-grid">
                <div class="weui-grid__icon">
                    <img src="./assets/images/more.png" alt="">
                </div>
                <p class="weui-grid__label">更多功能</p>
            </a>
        </div>
    </div>
</template>

<script>
// import { auth } from '../../common/js/auth';
// import config from '../../common/js/config';
// import { tryFunc } from '../../common/js/common';

export default {
  data() {
    return {
      showApp: true
    };
  },
  mounted() {},
  methods: {}
};
</script>


<style lang="scss">
.top {
  padding: 2rem;
  background-color: #06b04f;
  color: white;
}

.content {
  background-color: white;
}

.user_center {
  float: left;
  margin-left: 0.7rem;
  width: 1.2rem;
  height: 1.2rem;
}

.user_center > img {
  padding-top: 0.5rem;
}

.help {
  float: right;
  margin-right: 0.7rem;
  width: 1.2rem;
  height: 1.2rem;
}

.help > img {
  padding-top: 0.5rem;
}
</style>
