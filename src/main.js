import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import 'babel-polyfill';

new Vue({
  el: '#app',
  render: h => h(App)
})

Vue.use(Vuex);
