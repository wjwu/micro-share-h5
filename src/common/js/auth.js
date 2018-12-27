import axios from 'axios';
import { getQueryString, openAlert } from './common';
import config from './config';

export const auth = () => {
  if (process.env['NODE_ENV'] === 'development') {
    return new Promise((resolve, reject) => {
      localStorage.setItem('userId', '9cfe98ff-ea0e-41a4-8217-f8a9e59d17f4');
      resolve();
    });
  } else {
    return new Promise((resolve, reject) => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        const code = getQueryString('code');
        if (!code) {
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
            config.appId
          }&redirect_uri=${config.webHost}${window.location.pathname}${
            window.location.search
          }&response_type=code&scope=snsapi_userinfo&state=park#wechat_redirect`;
        } else {
          axios
            .get(`${config.apiHost}/auth?code=${code}`)
            .then(response => {
              localStorage.setItem('userId', response.data.id);
              localStorage.setItem('userName', response.data.userName);
              localStorage.setItem('phone', response.data.phone);
              localStorage.setItem('headPhoto', response.data.headPhoto);

              const inviterInfo = localStorage.getItem('inviterInfo');
              if (inviterInfo && inviterInfo.indexOf('#') !== -1) {
                const inviterId = inviterInfo.split('#')[0];
                const shopId = inviterInfo.split('#')[1];
                axios.get('/user/checkShopInvite', {
                  params: {
                    inviterId: inviterId,
                    shopId: shopId
                  }
                });
              }
              localStorage.setItem('inviterInfo', '');

              resolve();
            })
            .catch(e => {
              let msg = e;
              if (e.response && e.response.data) {
                msg = e.response.data.message;
              }
              openAlert(msg, () => {
                window.WeixinJSBridge.call('closeWindow');
              });
              // reject(e);
            });
        }
      } else {
        resolve();
      }
    });
  }
};

export const checkPhone = () => {
  const phone = localStorage.getItem('phone');
  if (
    (phone === 'null' || !phone) &&
    window.location.pathname.indexOf('bind/phone.html') < 0
  ) {
    setTimeout(() => {
      window.location.href = `/bind/phone.html?redirect=${config.webHost}${
        window.location.pathname
      }`;
    }, 10);
    return false;
  }
  return true;
};

export const checkIsMember = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${config.apiHost}/user/vip`, {
        headers: {
          userId: localStorage.getItem('userId')
        }
      })
      .then(response => {
        // if (!response.data.advVipExpire && !response.data.baseVipExpire) {
        //   openAlert('您的VIP未开通或已过期 ，点击确定去购买', () => {
        //     window.location.href = '/pay.html';
        //   });
        // } else {
        resolve(response.data);
        // }
        // if (vip) {
        //   if (!response.data.advVipExpire) {
        //     openAlert('您的店长版VIP未开通或已过期 ，点击确定去购买', () => {
        //       window.location.href = '/pay.html';
        //     });
        //   } else {
        //     resolve(response.data.advVipExpire);
        //   }
        // } else {
        //   if (!response.data.baseVipExpire) {
        //     openAlert('您的基础版VIP未开通或已过期 ，点击确定去购买', () => {
        //       window.location.href = '/pay.html';
        //     });
        //   } else {
        //     resolve(response.data.baseVipExpire);
        //   }
        // }
      })
      .catch(e => {
        reject(e);
      });
  });
};
