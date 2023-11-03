<<<<<<< HEAD
import Vue from 'vue';
import { initializeApp } from 'firebase/app';
import App from './App.vue';
import 'firebase/functions';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyC8f9oaTPzElvQ-j8knKshl-KopgUHl0xI',
  authDomain: 'zundagpt-eecfd.firebaseapp.com',
  projectId: 'zundagpt-eecfd',
  storageBucket: 'zundagpt-eecfd.appspot.com',
  messagingSenderId: '207907169112',
  appId: '1:207907169112:web:414f6e012c8cd7431bfb2d',
};

initializeApp(firebaseConfig);
=======
// main.js
import { initializeApp } from 'firebase/app';
import Vue from 'vue';
import App from './App.vue';
import './app.css';

const firebaseConfig = {
};
Vue.config.productionTip = false;
>>>>>>> origin/main

new Vue({
  render: (h) => h(App),
}).$mount('#app');
<<<<<<< HEAD
=======

initializeApp(firebaseConfig);
>>>>>>> origin/main
