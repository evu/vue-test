import Vue from 'vue';
import App from './App';
import Vuefire from 'vuefire';
import Firebase from 'firebase';


Vue.use(Vuefire);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});

