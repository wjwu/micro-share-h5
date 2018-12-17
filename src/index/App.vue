<template>
  <div class="main">
    <section class="page-one">
      <div class="banner"></div>
      <div class="menu" @click="handleMenuClick"></div>
      <div class="content">
        <h5>公告</h5>
        <ul v-if="notices">
          <li v-for="item in notices" :key="item.id">
            <p>{{item.title}}</p>
            <a :href="`/notice/detail.html?id=${item.id}`">详情</a>
          </li>
          <li>
            <a href="/notice/list.html">历史公告</a>
          </li>
        </ul>
        <div class="round">
          <div class="circle" @click="handleJump('/manager.html')">登录部落</div>
          <div class="circle_bottom animation"></div>
          <div class="circle_bottom2 animation2"></div>
        </div>
      </div>
    </section>
    <section class="page-two">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="./assets/images/1.png" />
          </div>
          <div class="swiper-slide">
            <img src="./assets/images/2.png" />
          </div>
          <div class="swiper-slide">
            <img src="./assets/images/3.png" />
          </div>
          <div class="swiper-slide">
            <img src="./assets/images/4.png" />
          </div>
          <div class="swiper-slide">
            <img src="./assets/images/5.png" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="shop">
        <img src="./assets/images/t1.png" @click="handleJump('/manager.html')" />
        <p class="title">好货架</p>
        <p class="desc">这是一套私人“社交智能货架”工具，集商城/社交/引流/社群管理与互联共享一体，易操作/自动化/价格低廉。</p>
        <p class="sub-desc">假如您没有公众号/小程序，她应该非常适合您，您只需要会简单粘贴照片即可......</p>
      </div>
      <div class="partner">
        <img src="./assets/images/bg-1@2x.png" @click="handleJump('/manager.html')" />
        <p class="title">找商伴</p>
        <p class="desc">这是一座“桥梁”，只要您乐于分享，您就有机会收获更多的伙伴和客户，获得更多收益。</p>
        <p class="sub-desc">组圈子/严审核/高质量/分行业，总能找到您合适的商伴......</p>
      </div>
    </section>
    <section class="page-four">
      <div class="content">
        <div class="adv">
          <h1>为什么选择我们</h1>
          <ul>
            <li>
              <p>“执汝之手，伴汝成长” 是部落平台的愿景</p>
              <p>也是对愿遵循诚信经营成员的服务理念。</p>
            </li>
            <li>
              <p>强大的研发团队和运营团队提供技术支</p>
              <p>撑和创造新价值的能力。</p>
            </li>
          </ul>
        </div>
        <div class="footer">
          <p>成都鹅卵石信息技术有限公司</p>
          <p> Copyright © 2019 蜀ICP备18026087号</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import weui from 'weui.js';
import axios from '../common/js/axios.js';
import { tryFunc } from '../common/js/common';
import '../common/js/share';

export default {
  data() {
    return {
      notices: []
    };
  },
  mounted() {
    tryFunc(async () => {
      const { data } = await axios.get('/news/top4');
      this.notices = data;
    });
    this.$nextTick(() => {
      const swiper = new window.Swiper('.swiper-container', {
        direction: 'horizontal',
        autoplay: {
          delay: 6000
        },
        speed: 1000,
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        }
      });
      console.log(swiper);
    });
  },
  methods: {
    handleJump(url) {
      window.location.href = url;
    },
    handleMenuClick() {
      weui.actionSheet(
        [
          {
            label: '关于我们',
            onClick: function() {
              window.location.href = '/about.html';
            }
          },
          {
            label: '联系我们',
            onClick: function() {
              window.location.href = '/contact.html';
            }
          },
          {
            label: '招揽英才',
            onClick: function() {
              window.location.href = '/job.html';
            }
          }
        ],
        [
          {
            label: '取消',
            onClick: function() {}
          }
        ]
      );
    }
  }
};
</script>

<style lang="scss">
body {
  background-color: #fff;
}

.page-one {
  position: relative;
  .banner {
    width: 100%;
    // height: 13.4375rem;
    height: 10.625rem;
    background: url('./assets/images/logo@2x.png') no-repeat 0.875rem 0.5rem /
        6.875rem 2.375rem,
      url('./assets/images/banner-a@2x.png') no-repeat 50% / cover;
  }
  .menu {
    width: 1.6875rem;
    height: 1.25rem;
    position: absolute;
    right: 1.375rem;
    top: 1.3125rem;
    background: url('./assets/images/menu@2x.png') no-repeat 50% / cover;
  }
  .content {
    h5 {
      padding: 1.125rem 0 0.375rem 2.625rem;
      font-size: 1.125rem;
      line-height: 1;
      letter-spacing: 1px;
      color: #1492df;
      background: url('./assets/images/notice@2x.png') no-repeat 1rem 1.1875rem /
        1rem 0.875rem;
    }

    ul {
      padding-left: 0.9375rem;
    }

    li {
      display: flex;
      align-items: center;
      height: 2.875rem;
      padding-right: 0.9375rem;
      border-bottom: 1px solid #ccc;

      &:last-of-type {
        flex-direction: row-reverse;
        border-bottom: none;
        font-size: 0.8rem;

        &::before {
          display: none;
        }
      }

      &::before {
        content: '';
        margin-right: 0.75rem;
        height: 100%;
        width: 0.25rem;
        height: 0.25rem;
        background-color: #333;
        border-radius: 50%;
      }

      p {
        flex: 1;
        color: #333;
        font-size: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      a {
        display: flex;
        align-items: center;
        padding-right: 1.1875rem;
        color: #1492df;
        background: url('./assets/images/details@2x.png') no-repeat right
          center/1.125rem;
      }
    }

    .round {
      position: relative;
      padding: 13px 0;
    }

    .circle {
      background: #eb8b35;
      border-radius: 10px;
      width: 15rem;
      height: 3.4375rem;
      line-height: 3.4375rem;
      z-index: 999;
      text-align: center;
      top: 18px;
      left: calc(50% - 7.5rem);
      position: absolute;
      color: #fff;
      font-size: 1.6rem;
      font-weight: bold;
    }
    .circle_bottom {
      background: rgba(235, 139, 53, 0.4);
      border-radius: 10px;
      width: 15rem;
      height: 3.4375rem;
      filter: alpha(opacity=40);
      z-index: -100;
      position: absolute;
      top: 18px;
      left: calc(50% - 7.5rem);
    }
    .circle_bottom2 {
      background: rgba(235, 139, 53, 0.2);
      border-radius: 10px;
      width: 15.625rem;
      height: 4.0625rem;
      filter: alpha(opacity=20);
      z-index: -110;
      position: relative;
      left: calc(50% - 7.8125rem);
    }

    .animation {
      animation: twinkling 2.1s infinite ease-in-out;
      animation-fill-mode: both;
    }
    .animation2 {
      animation: twinkling 2.1s infinite ease-in-out;
      animation-fill-mode: both;
    }
    @keyframes twinkling {
      0% {
        opacity: 0.2;
        filter: alpha(opacity=20);
        transform: scale(1);
      }
      50% {
        opacity: 0.6;
        filter: alpha(opacity=60);
        transform: scale(1.05, 1.14);
      }
      100% {
        opacity: 0.2;
        filter: alpha(opacity=20);
        transform: scale(1);
      }
    }
  }
}
.page-two {
  .swiper-container {
    margin: 0 auto;
    width: 21.5625rem;
    height: 9.375rem;

    img {
      width: 21.5625rem;
      height: 9.375rem;
    }

    .swiper-pagination-bullet {
      width: 5px;
      height: 5px;
    }

    .swiper-pagination-bullet-active {
      background: #fff;
    }
  }

  .shop,
  .partner {
    padding: 0.9375rem 0.9375rem 0 0.9375rem;

    img {
      display: block;
      margin: 0 auto;
      width: 4rem;
      height: 4rem;
    }

    .title {
      margin-top: 0.625rem;
      font-size: 1.125rem;
      color: #333;
      text-align: center;
    }

    .desc {
      margin-top: 1.0625rem;
      font-size: 1rem;
      color: #333;
      text-align: center;
    }

    .sub-desc {
      margin-top: 1.25rem;
      font-size: 0.875rem;
      color: #666;
      text-align: center;
    }
  }
}

.shop {
  padding-bottom: 2.5rem !important;
}

.partner {
  padding-bottom: 3rem !important;
  background-color: #f5fafd;
}

.page-four {
  background-color: #ebebeb;

  .content {
    background-color: #ebebeb;
  }

  .adv {
    padding-top: 9.9375rem;
    width: 100%;
    height: 22.875rem;
    background: url('./assets/images/bj@2x.png') no-repeat 50% 0% / cover;

    h1 {
      font-size: 2.1875rem;
      color: #fa7228;
      font-weight: bold;
      text-align: center;
    }

    ul {
      margin: 1.4375rem 2.2rem 0 3.0625rem;
    }

    li {
      margin-bottom: 0.8125rem;
      background: url('./assets/images/icon-1@2x.png') no-repeat 0 center/2rem;
      p {
        padding-left: 2.5rem;
        font-size: 0.8125rem;
        color: #fa7228;
        line-height: 1.25rem;
      }
    }

    li + li {
      background: url('./assets/images/icon-2@2x.png') no-repeat 0 center/2rem;
    }
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 4.0625rem;
    font-size: 0.5625rem;
    color: #555;
  }
}
</style>

