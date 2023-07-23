import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';

import App from './App.vue';
import router from './router';
import VeeValidatePlugin from './includes/validation';

import './assets/main.css';

Vue.use(PiniaVuePlugin);
Vue.use(VeeValidatePlugin);


new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App)
}).$mount('#app');
