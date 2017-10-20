import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Questionnaire from '@/views/Questionnaire'
import Focusreport from '@/views/Focusreport'
import Scenereport from '@/views/Scenereport'
import Distinguishsku from '@/views/Distinguishsku'
import Mustsku from '@/views/Mustsku'
import Importsku from '@/views/Importsku'
import Test from '@/views/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
       children: [
        {
          path: 'questionnaire',
          component: Questionnaire,
          query: { type: 4 }
        },
        {
          path: 'focusreport',
          component: Focusreport,
          query: { type: 1 }
        },
        {
          path: 'scenereport',
          component: Scenereport
        },
        {
          path: 'distinguishsku',
          component: Distinguishsku,
          query: { type: 5 }
        },
        {
          path: 'mustsku',
          component: Mustsku
        },
        {
          path: 'importsku',
          component: Importsku
        }
      ]
    }
  ]
})
