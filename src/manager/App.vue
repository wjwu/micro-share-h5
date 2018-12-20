<template>
  <div class="main">
    <nav-head></nav-head>
    <section class="page-two">
      <div class="banner"></div>
      <div class="content">
        <ul>
          <li @click="handleJump('/show/grow.html')">
            <div class="top">
              <img src="./assets/images/product@2x.png"/>
              <p>品牌宣传销售</p>
            </div>
            <div class="bottom img-a">
              <p>您的专属店铺信章/店铺Logo/二维码信息可植入您的商品展示与销售，打造您的品牌和专业形象。</p>
            </div>
          </li>
          <li @click="handleJump('/show/grow.html')">
            <div class="top">
              <img src="./assets/images/drainage@2x.png" />
              <p>引流互联共享</p>
            </div>
            <div class="bottom img-b">
              <p>会员老带新/积分管理对目标客户的精确传递与引流，互联共享功能可打造数万户周边家庭的私人流量池。</p>
            </div>
          </li>
          <li @click="handleJump('/show/grow.html')">
            <div class="top">
              <img src="./assets/images/Order@2x.png"/>
              <p>订单自动抓取</p>
            </div>
            <div class="bottom img-c">
              <p>不管在任何社群中，自动时刻帮您盯着众多社群滚滚信息流中的订单踪迹，将您的眼睛从手机中解脱出来。</p>
            </div>
          </li>
          <li @click="handleJump('/show/grow.html')">
            <div class="top">
              <img src="./assets/images/manage@2x.png"/>
              <p>社群日常管理</p>
            </div>
            <div class="bottom img-d">
              <p>入群欢迎语/群规发送/定时消息发送/多群发送/社群与网店互联共享，帮您省心省力管理社群。</p>
            </div>
          </li>
        </ul>
        <div class="round">
          <div class="circle" @click="handleJump('/buy2.html')">买货架</div>
          <div class="circle_bottom animation"></div>
          <div class="circle_bottom2 animation2"></div>
        </div>
      </div>
    </section>
    <div class="line"></div>
    <section class="page-three">
      <div class="banner"></div>
      <div class="content">
        <ul>
          <li @click="handleJump('/show/grow.html')">
            <div class="top">
              <img src="./assets/images/quality@2x.png"/>
              <p>谨审核/高质量</p>
            </div>
            <div class="bottom img-e">
              <p>智能&人工对分享源群申请资料真实性、活跃度等进行多维度进行审核，确保源群高质量。</p>
            </div>
          </li>
          <li @click="handleJump('/show/grow.html')">
            <div class="top">
              <img src="./assets/images/Sincerity@2x.png"/>
              <p>严信用/倡诚信</p>
            </div>
            <div class="bottom img-f">
              <p>严格信用管理机制，商伴与源群评价机制结合，导向诚信互助，剔除短视投机。</p>
            </div>
          </li>
          <li @click="handleJump('/show/grow.html')">
            <div class="top">
              <img src="./assets/images/industry@2x.png"/>
              <p>分行业/详地域</p>
            </div>
            <div class="bottom img-g">
              <p>数十类大行业与细分行业，可实现以您店铺为中心半径1KM-5KM范围内商伴选择。</p>
            </div>
          </li>
          <li @click="handleJump('/show/grow.html')">
            <div class="top">
              <img src="./assets/images/On-line@2x.png"/>
              <p>抱团联合/共享私域</p>
            </div>
            <div class="bottom img-h">
              <p>客户资源/物流配送/设备资源/特色产品实现联合互补，打造仅属商伴间享用的私域流量池。</p>
            </div>
          </li>
        </ul>
        <div class="tip">
          高压线：如发现有人在未征得您同意情况下，主动拉您客户。请您立即保存证据，断开商伴链接，提交证据给我们，部落会将他放入诚信黑名单!
        </div>
        <div class="round">
          <div class="circle" @click="handleJump('/buy.html')">找商伴</div>
          <div class="circle_bottom animation"></div>
          <div class="circle_bottom2 animation2"></div>
        </div>
      </div>
    </section>
    <section class="page-four">
      <div class="content">
        <div class="footer">
          <p>成都鹅卵石信息技术有限公司</p>
          <p> Copyright © 2019 蜀ICP备18026087号</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import '../common/js/share';
import NavHead from '../common/components/NavHead';

export default {
  components: {
    NavHead
  },
  methods: {
    handleJump(url) {
      window.location.href = url;
    }
  }
};
</script>

<style lang="scss">
body {
  background-color: #fff;
}
.main {
  padding-top: 50px;
}
.page-two {
  padding-bottom: 1rem;
  .banner {
    background: url('http://static.fangzhoubuluo.com/small-manager-banner-b.png') no-repeat 50% / cover;
  }
}
.page-three {
  padding-bottom: 1rem;
  .banner {
    background: url('http://static.fangzhoubuluo.com/small-manager-banner-a@2x.png') no-repeat 0% / cover;
  }

  .tip {
    padding: 0 0.9375rem .5rem 0.9375rem;
    font-size: 0.75rem;
    color: #f65161;
  }
}

.line {
  height: 0.625rem;
  background-color: #f5f5f5;
}

.page-two,
.page-three {
  .banner {
    width: 100%;
    height: 11.75rem;
  }

  .content {
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0.9375rem 0.9375rem 0 0.9375rem;

      li {
        flex: 0 0 48%;
        margin-bottom: 0.9375rem;
        background-color: #f6f6f6;
      }
    }

    .top {
      height: 6.5625rem;
      text-align: center;
      font-size: 0;

      img {
        margin: 0.625rem 0;
        width: 3.875rem;
        height: 3.875rem;
      }

      p {
        color: #333;
        font-size: 0.9375rem;
        line-height: 1;
      }
    }

    .bottom {
      height: 7.5rem;
      padding: 0.8125rem 0.875rem 0 0.875rem;

      p {
        color: #fff;
        font-size: 0.8125rem;
        line-height: 1.25rem;
      }
    }

    .img-a {
      background: url('http://static.fangzhoubuluo.com/img-a.png') no-repeat 50% / cover;
    }
    .img-b {
      background: url('http://static.fangzhoubuluo.com/img-b.png') no-repeat 50% / cover;
    }
    .img-c {
      background: url('http://static.fangzhoubuluo.com/img-c.png') no-repeat 50% / cover;
    }
    .img-d {
      background: url('http://static.fangzhoubuluo.com/img-d.png') no-repeat 50% / cover;
    }
    .img-e {
      background: url('http://static.fangzhoubuluo.com/img-e.png') no-repeat 50% / cover;
    }
    .img-f {
      background: url('http://static.fangzhoubuluo.com/img-f.png') no-repeat 50% / cover;
    }
    .img-g {
      background: url('http://static.fangzhoubuluo.com/img-g.png') no-repeat 50% / cover;
    }
    .img-h {
      background: url('http://static.fangzhoubuluo.com/img-h.png') no-repeat 50% / cover;
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
      z-index: 98;
      text-align: center;
      top: 18px;
      left: calc(50% - 7.5rem);
      position: absolute;
      color: #fff;
      font-size: 1.2rem;
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

.page-four {
  background-color: #ebebeb;

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

