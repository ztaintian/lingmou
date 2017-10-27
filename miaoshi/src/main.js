// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as filters from './filters'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'

Vue.config.productionTip = false
// axios.get('y2/backend/web/index.php?r=store/index', {}).then(function (response) {
//     console.log(response);
// }).catch(function (error) {
//     console.log(error);
// });
axios.get('http://192.168.3.244/y2/backend/web/index.php?r=store/index').then(
	function (response) {
    console.log(response);
	}
).catch(function (error) {
    console.log(error);
});
Vue.use(ElementUI)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
