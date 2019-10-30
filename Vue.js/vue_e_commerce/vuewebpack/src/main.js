// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay'; //載入vue-loading-overlay套件
import 'bootstrap';
// 以上載入NPM套件 
// 以下載入自定義套件
import App from './App';
import router from './router';
import 'vue-loading-overlay/dist/vue-loading.css';
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW', zhTWValidate); //載入VeeValidate的中文語系
axios.defaults.withCredentials = true;

Vue.component('Loading',Loading) //全域啟用元件Loading
Vue.filter('currency', currencyFilter);
Vue.filter('date',dateFilter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//加入導航守衛
router.beforeEach((to, from, next) => {
  console.log('to',to,'from',from,'next',next);
  // ...
  if(to.meta.requiresAuth){
    console.log("這裡需要驗證");
    const api = `${process.env.APIPATH}/api/user/check`; //建立signin api的變數
    axios.post(api).then((response) => { //使用post傳入使用者資料vm.user
        console.log(response.data);
        if(response.data.success){
          next(); // 如果登入成功，則放行
        }else{
          next({ // next()中包一個物件{}
            path:'/login',//如果登入失敗，則將路徑導向login page
          });
        }
    });
  }else{
    next();
  };
})
