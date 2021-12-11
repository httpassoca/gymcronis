import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker';
import './services/firebase';

import router from './router';
import store from './store';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
