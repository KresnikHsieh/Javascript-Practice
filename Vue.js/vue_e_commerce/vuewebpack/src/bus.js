import Vue from 'vue';
Vue.prototype.$bus = new Vue();  // 直接掛在Vue的圓形下面


// Message
// vm.$bus.$emit('messsage:push', message, status);
// message(String): 訊息內容
// status(String): Alert 的樣式