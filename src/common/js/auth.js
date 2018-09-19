import axios from 'axios';
import { getQueryString } from './common';
import config from './config';

export const auth = () => {
  if (process.env['NODE_ENV'] === 'development') {
    return new Promise((resolve, reject) => {
      localStorage.setItem('userId', 'f6217fc2-7bae-4972-87d5-563f02fdd9e4');
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
          }&redirect_uri=${config.webHost}${
            window.location.pathname
          }&response_type=code&scope=snsapi_userinfo&state=park#wechat_redirect`;
        } else {
          axios
            .get(`${config.apiHost}/auth?code=${code}`)
            .then(response => {
              localStorage.setItem('userId', response.data.id);
              localStorage.setItem('userName', response.data.userName);
              localStorage.setItem('phone', response.data.phone);
              resolve();
            })
            .catch(e => {
              reject(e);
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
  if (!phone && window.location.pathname.indexOf('bind/phone.html') < 0) {
    setTimeout(() => {
      window.location.href = `/bind/phone.html?redirect=${config.webHost}${
        window.location.pathname
      }`;
    }, 10);
    return false;
  }
  return true;
};
