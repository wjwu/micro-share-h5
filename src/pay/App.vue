<template>
  <bar v-if="showApp">
    <div class="main">
      <div class="content">
        <div class="tip">
          <div class="intro">
            <p>提醒:</p>
            <p>1.购买支付成功后，账户管家购买功能自动开通。</p>
            <p>2.个人账户管家管理功能开通，并提供人工客服服务。</p>
          </div>
          <div class="flow">
            <h4>产品报价</h4>
            <img src="./assets/images/pay.png" />
          </div>
          <div class="footer">
            <button>确定并支付</button>
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
<<<<<<< HEAD
    handleJump(url) {
      window.location.href = url;
=======
    handlePay() {
      const onBridgeReady = () => {
        window.WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          this.payInfo,
          // {
          //   appId: this.payInfo.appId, // 公众号名称，由商户传入
          //   timeStamp: '1395712654', // 时间戳，自1970年以来的秒数
          //   nonceStr: 'e61463f8efa94090b1f366cccfbbb444', // 随机串
          //   package: 'prepay_id=u802345jgfjsdfgsdg888',
          //   signType: 'MD5', // 微信签名方式：
          //   paySign: '70EA570631E4BB79628FBCA90534C63FF7FADD89' // 微信签名
          // },
          function(res) {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            }
          }
        );
      };
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener(
            'WeixinJSBridgeReady',
            onBridgeReady,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
      } else {
        onBridgeReady();
      }
>>>>>>> fc93e68ae33e2eb460fece356c762b9c34375a7b
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
      height: 100%;
      display: flex;
      font-size: 1.3rem;
      color: #3e88ee;
      align-items: center;

      a {
        margin:0 auto;
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


