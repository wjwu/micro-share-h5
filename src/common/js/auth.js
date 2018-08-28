import 'babel-polyfill';
import axios from 'axios';
import { getQueryString } from './common';
import config from './config';

window.onload = async () => {
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
      const response = await axios.get(`${config.apiHost}/auth?code=${code}`);
      localStorage.setItem('userId', response.data.userId);
    }
  }
};
