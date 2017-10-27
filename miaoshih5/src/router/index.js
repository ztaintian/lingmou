import Vue from 'vue'
import Router from 'vue-router'
import Freezerdetails from '@/views/Freezerdetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/freezerdetails',
      name: 'freezerdetails',
      component: Freezerdetails
    }
  ]
})
