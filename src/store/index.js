import Vue from 'vue';
import Vuex from 'vuex';
import moviesStore from './modules/moviesStore';
import loaderStore from './modules/loaderStore';
import notificationStore from './modules/notification';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    moviesStore,
    loaderStore,
    notificationStore
  }
});

export default store;
