// main.js
import Vue from 'vue';
import { initializeApp } from 'firebase/app';
import App from './App.vue';
import './app.css';

Vue.config.productionTip = false;

// 'firebaseConfig' を定義する部分を 'initializeApp' を呼び出す前に移動します。
const firebaseConfig = {
  apiKey: 'AIzaSyBqlh3PMm0KUkwcBRk190XCUIPWXm8r_94',
  authDomain: 'openaichat-f4818.firebaseapp.com',
  databaseURL:
    'https://openaichat-f4818-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'openaichat-f4818',
  storageBucket: 'openaichat-f4818.appspot.com',
  messagingSenderId: '814101394601',
  appId: '1:814101394601:web:8b42ac65fc37585d88e5b8',
};

// ここで一度だけ Firebase を初期化します。
initializeApp(firebaseConfig);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
