// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


import Vue from 'vue';
import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

import App from './App';
import router from './router';

// Import Vuex store
import store from './store';

Vue.config.productionTip = false;
Vue.config.server = 'http://localhost:3000';

const SocketInstance = io(Vue.config.server);

Vue.use(VueSocketIO, SocketInstance)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
});
