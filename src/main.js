// main.js
import { initializeApp } from 'firebase/app';
import Vue from 'vue';
import App from './App.vue';
import './app.css';

const firebaseConfig = {
};
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

initializeApp(firebaseConfig);
