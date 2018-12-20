<template>
  <bar v-if="showApp">
    <div class="main">
      <div class="top">
        <a href="./self/center.html">
          <img id="head" :src="headPhoto" />
        </a>
        <div class="intro">
          <!-- <span>
            <a style="color: white;font-weight: 900;" href="rule.html">运行规则</a>
          </span> -->
          <span>
            <a style="color: white;font-weight: 900;" href="guide.html">网店指南</a>
          </span>
        </div>
      </div>
      <div class="content">
        <div class="tip">
          <div class="intro">
            <p>温馨提示:</p>
            <p>1.货架可独立于找商伴，单独购买独立使用。</p>
            <p>2.货架不得用于发送涉及黄/毒/赌/传销/涉政/股票/区块链等非法以及其他虚假、夸大的信息、广告。</p>
            <p>3.单个账户可购买1（商城模块）+N（基础模块群），N&lt;=8。</p>
          </div>
          <div class="flow">
            <h4>购买流程</h4>
            <img src="./assets/images/page2.png" />
            <h4>功能版本对比</h4>
            <img src="./assets/images/introduction.png" />
            <img src="./assets/images/desc.png" />
          </div>
          <div class="footer">
            <button @click="handleJump('/pay.html')">购买货架</button>
            <button @click="handleJump('/qa.html')">在线客服</button>
          </div>
        </div>
      </div>
    </div>
  </bar>
</template>

<script>
import { auth, checkPhone } from '../common/js/auth';
import { tryFunc } from '../common/js/common';
import Bar from '../common/components/Bar';
import defaultHeadPhone from './assets/images/user@2x.png';
import '../common/js/share';

export default {
  components: {
    Bar
  },
  data() {
    return {
      showApp: false,
      headPhoto: localStorage.getItem('headPhoto') || defaultHeadPhone
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      if (checkPhone()) {
        this.showApp = true;
      }
    });
  },
  methods: {
    handleJump(url) {
      window.location.href = url;
    }
  }
};
</script>

<style lang="scss">
html {
  min-height: 100%;
  position: relative;
}
body {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.weui-tab__panel {
  padding-bottom: 100px;
}
.main {
  min-height: 100%;
  color: #666666;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;

  .top {
    height: 5.625rem;
    padding: 0.9375rem;
    background-color: #06b04f;

    img {
      width: 3.6875rem;
      height: 3.6875rem;
      border-radius: 50%;
    }

    .intro {
      margin-right: 0.9375rem;
      float: right;
      height: 100%;
      display: flex;
      font-size: 1rem;
      color: #3e88ee;
      align-items: center;

      span + span {
        margin-left: 1.875rem;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #fff;

    .tab {
      height: 3.5rem;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        margin: 0 1.125rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.125rem;
        height: 100%;
        width: 5.25rem;
        border-bottom: 0.1875rem solid transparent;
      }

      .active {
        color: #3e88ee;
        border-bottom: 0.1875rem solid #3e88ee;
      }
    }

    .tip {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .intro {
      padding: 1.25rem 0.9375rem;
      background-color: #f5f9fe;
      font-size: 0.875rem;
      line-height: 1.3125rem;
    }

    .flow {
      flex: 1;
      text-align: center;

      h4 {
        padding: 1.25rem 0;
        font-size: 1rem;
        color: #333;
        line-height: 1.125rem;
      }
      img {
        width: 21.5rem;
      }
    }
  }

  .footer {
    position: fixed;
    width: 100%;
    bottom: 50px;
    height: 50px;
    display: flex;

    button {
      flex: 1;
      font-size: 1rem;
      color: #fff;
      background-color: #3e88ee;
      font-weight: 900;
      border: none;
      outline: none;
    }

    button + button {
      color: black;
      background: url(./assets/images/phone.png) no-repeat 2.7rem center/1rem;
      background-color: #ffc000;
    }
  }
}
</style>


