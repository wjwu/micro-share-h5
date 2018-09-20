<template>
  <div class="main">
    <section class="page-one">
      <div class="banner"></div>
      <div class="menu" @click="handleMenuClick"></div>
      <div class="content">
        <h5>公告</h5>
        <ul>
          <li>
            <p>上线促销活动、购买优惠多多!</p>
            <a href="">详情</a>
          </li>
          <li>
            <p>网站上线公告!</p>
            <a href="">详情</a>
          </li>
          <li>
            <p>会员细则及免责声明!</p>
            <a href="">详情</a>
          </li>
          <li>
            <p>网站遵守守则!</p>
            <a href="">详情</a>
          </li>
        </ul>
        <button @click="handleJump('/buy.html')">登录部落</button>
      </div>
    </section>
    <section class="page-two">
      <div class="banner"></div>
      <div class="content">
        <ul>
          <li>
            <div class="top">
              <img src="./assets/images/quality@2x.png" />
              <p>严审核/高质量</p>
            </div>
            <div class="bottom img-a">
              <p>智能&人工对分享源群申请资料真实性、活跃度等进行多维度进行审核（确保分享源群高质量）</p>
            </div>
          </li>
          <li>
            <div class="top">
              <img src="./assets/images/Sincerity@2x.png" />
              <p>严信用/倡诚信</p>
            </div>
            <div class="bottom img-b">
              <p>过程关键节点严格信用管理机制，商伴与源群评价机制结合（导向诚信互助，剔除短视投机）</p>
            </div>
          </li>
          <li>
            <div class="top">
              <img src="./assets/images/industry@2x.png" />
              <p>分行业/详地域</p>
            </div>
            <div class="bottom img-c">
              <p>数十类大行业与细分行业，可实现以您店铺为中心半径500M-5KM范围内商伴选择（总能寻到适合您的商伴）</p>
            </div>
          </li>
          <li>
            <div class="top">
              <img src="./assets/images/Under-line@2x.png" />
              <p>线下抱团联合</p>
            </div>
            <div class="bottom img-d">
              <p>社区同行与异业、实体与网络，在物流配送/设备资源/特色产品上实现联合互补（全力节省成本，扩大销售）</p>
            </div>
          </li>
          <li class="m-b-0">
            <div class="top">
              <img src="./assets/images/On-line@2x.png" />
              <p>线上共建共拓</p>
            </div>
            <div class="bottom img-c">
              <p>商伴线上互助、共建社群圈，提升客户圈子归属和信任感，建立只属于商伴间享用的永久流量池</p>
            </div>
          </li>
          <li class="m-b-0">
            <div class="top">
              <img src="./assets/images/Robot@2x.png" />
              <p>智能管家支撑</p>
            </div>
            <div class="bottom img-d">
              <p>除日常社群管理与店铺经营功能外，还将您与商伴链接成一张含社区数万户家庭资源组成的共享网络</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="page-three">
      <div class="banner"></div>
      <div class="content">
        <ul>
          <li>
            <div class="top">
              <img src="./assets/images/manage@2x.png" />
              <p>社群日常管理</p>
            </div>
            <div class="bottom img-e">
              <p>入群欢迎语/群规发送/定时消息发送/一键群发/商伴互联共享（日常管理与群发互联共享）</p>
            </div>
          </li>
          <li>
            <div class="top">
              <img src="./assets/images/product@2x.png" />
              <p>产品宣传展示</p>
            </div>
            <div class="bottom img-f">
              <p>植入您专属店铺信章/微信号/微信群二维码的新品鉴赏/本周特价/店铺货架海报可灵活编辑与发布</p>
            </div>
          </li>
          <li>
            <div class="top">
              <img src="./assets/images/drainage@2x.png" />
              <p>线上引流拓客</p>
            </div>
            <div class="bottom img-g">
              <p>包含您商品信息的海报可在众多商伴群以及其他渠道发送，将喜欢您产品的潜在客户吸引过来购买或入群</p>
            </div>
          </li>
          <li>
            <div class="top">
              <img src="./assets/images/Order@2x.png" />
              <p>订单自动抓取</p>
            </div>
            <div class="bottom img-h">
              <p>不管是在您的群还是商伴群，只要有客户意向订单出现，管家将第一时间上报给您（将您眼睛从手机中解脱出来）</p>
            </div>
          </li>
          <li class="m-b-0">
            <div class="top">
              <img src="./assets/images/bill@2x.png" />
              <p>在线电子帐薄</p>
            </div>
            <div class="bottom img-g" style="padding:1.25rem 0.6875rem 0 0.6875rem">
              <p>简洁高效的电子帐薄管理工具，与产品订单信息形成联动（让您对每天收入/库存了如指掌）</p>
            </div>
          </li>
          <li class="m-b-0">
            <div class="top">
              <img src="./assets/images/link@2x.png" />
              <p>链接商伴、互补共赢</p>
            </div>
            <div class="bottom img-h">
              <p>强大的互联共享功能，完美将您和众多商伴资源实现互联、互助、互享（可建立数十个您的商伴互享社群）</p>
            </div>
          </li>
        </ul>
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
              <p>优秀的研发和运营团队，具备为您提供</p>
              <p>有力的技术支撑和持续创造新价值的能力</p>
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
export default {
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
    height: 13.4375rem;
    background: url('./assets/images/logo@2x.png') no-repeat 0.875rem 0.5rem /
        8.625rem 3rem,
      url('./assets/images/banner-a@2x.png') no-repeat 50% / cover;
  }
  .menu {
    width: 2.125rem;
    height: 1.625rem;
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
        height: 100%;
        color: #333;
        font-size: 1rem;
        display: flex;
        align-items: center;
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

    button {
      display: block;
      margin: 4.625rem auto 5.125rem;
      width: 15rem;
      height: 3.4375rem;
      color: #fff;
      font-size: 1.125rem;
      font-weight: bold;
      background-color: #eb8b35;
      outline: none;
      border: none;
      border-radius: 10px;
    }
  }
}
.page-two {
  .banner {
    background: url('./assets/images/banner-b@2x.png') no-repeat 50% / cover;
  }
}
.page-three {
  padding-top: 0.9375rem;
  background-color: #ebebeb;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  .banner {
    background: url('./assets/images/banner-c@2x.png') no-repeat 0% / cover;
  }
}

.page-two,
.page-three {
  .banner {
    width: 100%;
    height: 10.6rem;
  }

  .content {
    background-color: #ebebeb;

    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0.9375rem;

      li {
        flex: 0 0 48%;
        margin-bottom: 0.9375rem;
        background-color: #fff;
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
      padding: 1.25rem 0.875rem 0 0.875rem;

      p {
        color: #fff;
        font-size: 0.8125rem;
        line-height: 1.25rem;
      }
    }

    .img-a {
      background: url('./assets/images/img-a@2x.png') no-repeat 50% / cover;
    }
    .img-b {
      background: url('./assets/images/img-b@2x.png') no-repeat 50% / cover;
    }
    .img-c {
      background: url('./assets/images/img-c@2x.png') no-repeat 50% / cover;
    }
    .img-d {
      background: url('./assets/images/img-d@2x.png') no-repeat 50% / cover;
    }
    .img-e {
      background: url('./assets/images/img-e@2x.png') no-repeat 50% / cover;
    }
    .img-f {
      background: url('./assets/images/img-f@2x.png') no-repeat 50% / cover;
    }
    .img-g {
      background: url('./assets/images/img-g@2x.png') no-repeat 50% / cover;
    }
    .img-h {
      background: url('./assets/images/img-h@2x.png') no-repeat 50% / cover;
    }
  }
}

.page-four {
  padding-top: 0.9375rem;
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
      // -webkit-text-stroke: 2 rgba(255, 255, 255, 1);
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
    width: 100%;
    height: 4.375rem;
    text-align: center;
    font-size: 0.5625rem;
    color: #555;
    line-height: 0.9375rem;
    p:first-of-type {
      margin-top: 1.4375rem;
    }
  }
}
</style>

