import wxApi from './wxApi';
import config from './config';

(async function(api) {
  await api.config(['onMenuShareTimeline', 'onMenuShareAppMessage']);
  window.wx.onMenuShareAppMessage(
    {
      title: '商伴部落',
      desc: '开启找寻社区商伴，抱团联合经营之旅',
      link: config.webHost,
      imgUrl: 'http://static.fangzhoubuluo.com/logo.png'
    },
    function(res) {}
  );
  window.wx.onMenuShareTimeline(
    {
      title: '商伴部落',
      desc: '开启找寻社区商伴，抱团联合经营之旅',
      link: config.webHost,
      imgUrl: 'http://static.fangzhoubuluo.com/logo.png'
    },
    function(res) {}
  );
})(wxApi);
