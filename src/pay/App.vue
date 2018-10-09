<template>
  <div>
    <a href="javascript:;" @click="handlePay" class="weui-btn weui-btn_primary">支付</a>
  </div>
</template>
<script>
import axios from 'axios';
import config from '../common/js/config';
import { tryFunc } from '../common/js/common';

export default {
  data() {
    return {
      payInfo: null
    };
  },
  created() {
    tryFunc(async () => {
      const { data } = await axios.get(`${config.apiHost}/pay/wechat`, {
        headers: {
          userId: localStorage.getItem('userId')
          // userId: '36d1932c-99e3-413a-befb-0c5f4fca5162'
        },
        params: {
          // orderId: new Date().getTime()
          orderId: '1538984595204'
        }
      });
      this.payInfo = data;
    });
  },
  methods: {
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
    }
  }
};
</script>

