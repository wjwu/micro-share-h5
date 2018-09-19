<template>
  <div class="main" v-if="showApp">
    <div class="top">
      <img src="./assets/images/user@2x.png" />
      <div class="intro">
        <span>运行规则</span>
        <span>匹配指南</span>
      </div>
    </div>
    <div class="content">
      <div class="tab">
        <span :class="{'active':selectedTab === 't1'}" @click="handleChangeTab('t1')">商伴匹配</span>
        <span :class="{'active':selectedTab === 't2'}" @click="handleChangeTab('t2')">部落管家</span>
      </div>
      <div class="tip" v-if="selectedTab ==='t1'">
        <div class="intro">
          <p>温馨提示:</p>
          <p>1.商伴匹配服务对象主要是能提供真实、合法经营产品或服务的社区实体商家、小微商家。</p>
          <p>2.分享源群不得涉及黄/毒/赌/传销/涉政/股票/区块链等非法群，违规账户进入部落黑名单；拒绝僵尸/广告/死群参与分享，违规账户信用降级。</p>
          <p>3.只能提交属于群主自己群，分享群数量为N&lt;=5个，每单个群分享次数N&lt;=8次。</p>
        </div>
        <div class="flow">
          <h4>匹配流程</h4>
          <img src="./assets/images/page1.png" />
        </div>
        <div class="footer">
          <button @click="handleJump('/group/submit.html')">参与商伴匹配</button>
          <button>在线客服</button>
        </div>
      </div>
      <div class="tip" v-else>
        <div class="intro">
          <p>温馨提示:</p>
          <p>1.商伴匹配服务对象主要是能提供真实、合法经营产品或服务的社区实体商家、小微商家。</p>
          <p>2.分享源群不得涉及黄/毒/赌/传销/涉政/股票/区块链等非法群，违规账户进入部落黑名单；拒绝僵尸/广告/死群参与分享，违规账户信用降级。</p>
          <p>3.只能提交属于群主自己群，分享群数量为N&lt;=5个，每单个群分享次数N&lt;=8次。</p>
        </div>
        <div class="flow">
          <h4>购买流程</h4>
          <img src="./assets/images/page2.png" />
        </div>
        <div class="footer">
          <button>购买管家</button>
          <button>在线客服</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../common/js/auth';
import { tryFunc } from '../common/js/common';

export default {
  data() {
    return {
      selectedTab: 't1',
      showApp: false
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
    });
  },
  methods: {
    handleChangeTab(tab) {
      this.selectedTab = tab;
    },
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
.main {
  min-height: 100%;
  color: #666666;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;

  .top {
    height: 5.625rem;
    padding: 0.9375rem;
    background-color: #fff;

    img {
      width: 3.6875rem;
      height: 3.6875rem;
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
    margin-top: 0.9375rem;
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
      padding-bottom: 1.875rem;

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
    height: 3.0625rem;
    display: flex;

    button {
      flex: 1;
      font-size: 1rem;
      color: #fff;
      background-color: #3e88ee;
      border: none;
      outline: none;
    }

    button + button {
      background-color: #90bbf6;
    }
  }
}
</style>


