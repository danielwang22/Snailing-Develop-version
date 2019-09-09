// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios' // AJAX 套件
import VueAxios from 'vue-axios' // 轉成 VUE
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';
import * as VueGoogleMaps from 'vue2-google-maps'

import App from './App'
import router from './router'
import './bus.js';

// axios
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;

//vue Loading
Vue.component('Loading',Loading);

// VeeValidate
VeeValidate.Validator.localize('zh_TW', zhTWValidate);
Vue.use(VeeValidate);

Vue.config.productionTip = false;

// vue-moment
Vue.use(require('vue-moment'));

//vue google map
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBAowJV6gDbO_b84cbcRDQiexzFLJGoNvc',
    libraries: 'places',
  },
  installComponents: true
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


router.beforeEach((to,from,next) =>{
  console.log('to' , to , 'from' , from , 'next' , next); //切換頁面時才會觸發 即要呼叫next()並有切換頁面 才觸發

  // requiresAuth 一開始為true if去判斷是否有登入
  if(to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`; //判斷是否為登入狀態的API
    axios.post(api).then((response) => {
      console.log(response.data);
      if(response.data.success){
        next(); //為登入狀態的話 出發next()
      }else{
        next({
          path:'/login' //不為登入狀態的話 出發next()但回到login頁面
        });
      }
    });
  }else{
    next();
  } 
})
