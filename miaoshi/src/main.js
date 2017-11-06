import Vue from 'vue'
import App from './App'
import router from './router'
import * as filters from './filters'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.Axios = axios

if(process.env.NODE_ENV == 'development'){//开发环境
  Vue.prototype.api = '/api/y2/frontend/web/index.php'
  Vue.prototype.apiLoad = '/api/y2/frontend/web'
}else{
	Vue.prototype.api = ''
}
// Vue.prototype.api = 'http://ubuntu.zhixiang.co:8081'
Vue.prototype.apiLoad = 'http://ubuntu.zhixiang.co:8081'
Vue.use(ElementUI)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
