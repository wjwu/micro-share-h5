<template>
  <div class="main" v-if="showApp">
    <div class="hd">
      <div class="avatar"></div>
      <div class="info">
        <div class="name">{{user.userName}}</div>
        <div class="tag">
          <span class="vip" v-if="user.vipDto">VIP</span>
          <span class="credit">{{user.creditScore}}分</span>
        </div>
      </div>
    </div>
    <div class="bd">
      <div class="my">
        <div @click="handleJump('')">我的机器人</div>
        <div @click="handleJump('')">
          我的微信群
        </div>
      </div>
      <ul class="menu">
        <li class="menu-info">
          <a href="./self/info.html">个人资料</a>
        </li>
        <li class="menu-partner">
          <a href="./order/list.html">我的商伴</a>
        </li>
        <li class="menu-poster">宣传海报</li>
        <li class="menu-shelves">商品货架</li>
        <li class="menu-books">电子账簿</li>
      </ul>
      <ul class="menu">
        <li class="menu-setup">系统设置</li>
        <li class="menu-service" @click="handleClick">联系客服</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { auth } from '../../common/js/auth';
import config from '../../common/js/config';
import { tryFunc } from '../../common/js/common';
import weui from 'weui.js';

export default {
  data() {
    return {
      showApp: false,
      user: {}
    };
  },
  mounted() {
    tryFunc(async () => {
      await auth();
      this.showApp = true;
      const { data } = await axios.get(`${config.apiHost}/user/info`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      });
      this.user = data;
      this.$el.querySelector('.hd').style.background = `url("${
        this.user.headPhoto
      }") no-repeat`;
      this.$el.querySelector('.avatar').style.background = `url("${
        this.user.headPhoto
      }") no-repeat`;
    });
  },
  methods: {
    handleJump(url) {
      window.location.href = url;
    },
    handleClick() {
      weui.alert('请在公众号发送消息咨询');
    }
  }
};
</script>

<style lang="scss">
html,
body,
.main {
  height: 100%;
}
.main {
  background: #f7f7f7;
  .hd {
    position: relative;
    height: 11.5625rem;
    // background: url('./assets/images/timg.jpg') no-repeat;
    background-size: cover !important;

    &:after {
      content: '';
      width: 100%;
      height: 11.5625rem;
      position: absolute;
      left: 0;
      top: 0;
      background: inherit;
      background-size: inherit;
      filter: blur(3px);
      z-index: 2;
    }
    .avatar {
      position: absolute;
      top: 1.5625rem;
      left: calc(50% - 2.625rem);
      width: 5.25rem;
      height: 5.25rem;
      border-radius: 50%;
      border: 1px solid #fff;
      // background: url('./assets/images/timg.jpg') no-repeat;
      background-size: cover !important;
      z-index: 3;
    }

    .info {
      position: absolute;
      width: 100%;
      top: 7.5rem;
      z-index: 3;
      .name {
        font-size: 1.125rem;
        color: #fff;
        text-align: center;
      }

      .tag {
        display: flex;
        font-size: 0.875rem;
        color: #fff;
        justify-content: center;

        .vip,
        .credit {
          display: inline-block;
          margin: 0 0.3125rem;
          padding: 0 0.5rem 0 1.5rem;
          text-align: right;
          border-radius: 15px;
        }
        .vip {
          background: url('./assets/images/VIP@3x.png') no-repeat 0.375rem
            center/ 1rem;
          background-color: #fc863f;
        }

        .credit {
          background: url('./assets/images/credit@3x.png') no-repeat 0.375rem
            center/ 1rem;
          background-color: #49c7f6;
        }
      }
    }
  }

  .bd {
    .my {
      background: #fff;
      height: 3.75rem;
      padding: 0.625rem;
      display: flex;
      font-size: 1rem;
      color: #222;

      div {
        flex: 1;
        text-align: center;
        padding-top: 1.3rem;
      }

      div:first-of-type {
        border-right: 1px solid #c3c3c3;
        background: url('./assets/images/Robot@3x.png') no-repeat center 0 /1.5rem;
      }

      div:last-of-type {
        background: url('./assets/images/group@3x.png') no-repeat center 0 /1.5rem;
      }
    }

    .menu {
      padding-left: 0.9375rem;
      background: #fff;
      margin: 0.9375rem 0;
      border-bottom: 1px solid #e6e6e6;
      border-top: 1px solid #e6e6e6;

      li {
        padding-left: 2.3125rem;

        height: 2.75rem;
        line-height: 2.75rem;
        border-bottom: 1px solid #e6e6e6;
      }

      a {
        display: block;
        height: 100%;
        width: 100%;
        color: #333;
        font-size: 1rem;
      }

      li:last-of-type {
        border-bottom: none;
      }

      $arrow: url('./assets/images/Go@3x.png') no-repeat calc(100% - 0.625rem)
        center/1rem;

      @function icon($path) {
        @return url($path) no-repeat 0 center / 1.5rem;
      }

      .menu-info {
        background: icon('./assets/images/homepage@3x.png'), $arrow;
      }

      .menu-partner {
        background: icon('./assets/images/companion@3x.png'), $arrow;
      }

      .menu-poster {
        background: icon('./assets/images/poster@3x.png'), $arrow;
      }

      .menu-shelves {
        background: icon('./assets/images/classification@3x.png'), $arrow;
      }

      .menu-books {
        background: icon('./assets/images/Books@3x.png'), $arrow;
      }

      .menu-setup {
        background: icon('./assets/images/Syste-setup@3x.png'), $arrow;
      }

      .menu-service {
        background: icon('./assets/images/service@3x.png'), $arrow;
      }
    }
  }
}
</style>


