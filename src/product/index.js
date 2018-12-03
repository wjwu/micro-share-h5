import '../common/css/reset.css';
import Vue from 'vue';
import App from './App.vue';

const app = new Vue({
  el: '#app',
  render: h => h(App)
});

Vue.use({
  app
});
