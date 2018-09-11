import 'babel-polyfill';
import axios from 'axios';
import { getQueryString } from './common';
import config from './config';

export const auth = () => {
  // return new Promise((resolve, reject) => {
  //   localStorage.setItem('userId', 'f6217fc2-7bae-4972-87d5-563f02fdd9e4');
  //   resolve();
  // });
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

            if (
              !response.data.phone &&
              window.location.pathname.indexOf('bind_phone.html') < 0
            ) {
              window.location.href = `./bind/phone.html?redirect=${
                config.webHost
              }${window.location.pathname}`;
            } else {
              localStorage.setItem('phone', response.data.phone);
            }

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
};
