import Vue from 'vue';
import Vuex from 'vuex';
// import createLogger from 'vuex/dist/logger';
// import createPersistedState from 'vuex-persistedstate';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

import socket from './store-modules/socket';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  // Modules
  modules: {
    socket,
  },
  // Options
  strict: true,
  // plugins: [
  // createPersistedState()
  // process.env.NODE_ENV === 'development' && createLogger({ collapsed: false })
  // ].filter(Boolean)
});
