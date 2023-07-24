import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';

import App from './App.vue';
import router from './router';
import VeeValidatePlugin from './includes/validation';

import './assets/styles/main.css';
import './assets/styles/animation.css';

import Notifications from 'vue-notification';

Vue.use(PiniaVuePlugin);
Vue.use(VeeValidatePlugin);
Vue.use(Notifications);


new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App)
}).$mount('#app');
