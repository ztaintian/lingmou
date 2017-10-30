import Vue from 'vue'
import App from './App'
import router from './router'
import * as filters from './filters'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.Axios = axios

  axios.post('/api/y2/frontend/web/index.php?r=store/index')
	.then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });



// http://www.yangang.com/sponsor/sponsor-list
 //  axios.get('/api/sponsor/sponsor-list')
 //  .then(function (response) {
 //    console.log(response);
 //  })
 //  .catch(function (error) {
 //    console.log(error);
 // });
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
