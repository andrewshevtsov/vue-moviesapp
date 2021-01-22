import Vue from 'vue';
import Vuex from 'vuex';
import moviesStore from './modules/moviesStore';
import loaderStore from './modules/loaderStore';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    moviesStore,
    loaderStore
  }
});

store.dispatch('initMoviesStore');

export default store;
