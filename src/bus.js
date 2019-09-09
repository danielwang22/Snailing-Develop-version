import Vue from 'vue';

Vue.prototype.$bus = new Vue();

// 1.
// Message
// vm.$bus.$emit('messsage:push',message,status);
// message(String): 訊息內容
// status(String) : alert 的樣式
