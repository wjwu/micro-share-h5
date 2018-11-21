import config from './config';
import axios from 'axios';

export default {
  config: apiList => {
    if (!window.wx) {
      throw new Error('未引入微信ApiJs');
    }
    return new Promise((resolve, reject) => {
      window.wx.ready(() => {
        resolve();
      });
      window.wx.error(res => {
        reject(res);
      });
      var url = window.location.href;
      if (url.indexOf('isappinstalled') > 0 || url.indexOf('from=') > 0) {
        url = url.replace('&isappinstalled', '*isappinstalled');
        url = url.replace('&from', '*from');
      }
      axios
        .get(`${config.apiHost}/wx/shareParam?reqUrl=${url}`)
        .then(response => {
          const data = response.data;
          window.wx.config({
            debug: false,
            appId: config.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            jsApiList: apiList // 必填，需要使用的JS接口列表
          });
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  getLocation: () => {
    return new Promise((resolve, reject) => {
      window.wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: res => {
          const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          // const speed = res.speed; // 速度，以米/每秒计
          // const accuracy = res.accuracy; // 位置精度
          resolve({ latitude, longitude });
        },
        fail: res => {
          reject(res);
        }
      });
    });
  }
};
