import axios from 'axios';
import config from './config';

axios.interceptors.request.use(cf => {
  cf.headers['userId'] = localStorage.getItem('userId');
  cf.baseURL = config.apiHost;
  return cf;
});

export default axios;
