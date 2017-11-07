// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.Axios = axios

/* eslint-disable no-new */

if(process.env.NODE_ENV == 'development'){//开发环境
  Vue.prototype.api = '/api'
}else{
	Vue.prototype.api = 'http://ubuntu.zhixiang.co:8082'
}


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
