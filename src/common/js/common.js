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

export const openToast = message => {
  weui.alert(message);
};

export const tryFunc = async func => {
  const loading = weui.loading('加载中...');
  try {
    await func();
    loading.hide();
  } catch (e) {
    loading.hide();
    if (e.response && e.response.data) {
      openToast(e.response.data.message);
    } else {
      openToast(e);
    }
  }
};
