import weui from 'weui.js';

export const getQueryString = name => {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const checkPhone = phone => {
  const regPhone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
  return regPhone.test(phone);
};

export const openTips = message => {
  weui.topTips(message);
};

export const openAlert = (message, callback = undefined) => {
  weui.alert(message, callback);
};

export const openConfirm = (
  message,
  yesCallback = undefined,
  noCallback = undefined
) => {
  weui.confirm(message, yesCallback, noCallback);
};

export const tryFunc = async func => {
  const loading = weui.loading('数据加载中');
  try {
    await func();
    loading.hide();
  } catch (e) {
    loading.hide();
    if (e.response && e.response.data) {
      openAlert(e.response.data.message);
    } else {
      openAlert(e);
    }
  }
};

export const wxPay = payInfo => {
  return new Promise((resolve, reject) => {
    const onBridgeReady = () => {
      window.WeixinJSBridge.invoke('getBrandWCPayRequest', payInfo, function(
        res
      ) {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          resolve();
        } else {
          reject(res);
        }
      });
    };
    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      }
    } else {
      onBridgeReady();
    }
  });
};
