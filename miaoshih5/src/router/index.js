import Vue from 'vue'
import Router from 'vue-router'
import Freezerdetails from '@/views/Freezerdetails'
import Goods from '@/views/Goods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'freezerdetails',
      component: Freezerdetails
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    }
  ]
})
