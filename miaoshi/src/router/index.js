import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Questionnaire from '@/views/Questionnaire'
import Scenemanagement from '@/views/Scenemanagement'
import Focusreport from '@/views/Focusreport'
import Scenereport from '@/views/Scenereport'
import Distinguishsku from '@/views/Distinguishsku'
import Mustsku from '@/views/Mustsku'
import Importsku from '@/views/Importsku'
import Administratorsettings from '@/views/Administratorsettings'
import Usermanagement from '@/views/Usermanagement'
import Sellpoint from '@/views/Sellpoint'
import Freezerdetails from '@/views/Freezerdetails'
import Pointofsaledetails from '@/views/Pointofsaledetails'
import Questionnairedetails from '@/views/Questionnairedetails'
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
        },
        {
          path: 'usermanagement',
          component: Usermanagement
        },
        {
          path: 'administratorsettings',
          component: Administratorsettings
        },
        {
          path: 'sellpoint',
          component: Sellpoint
        },
        {
          path: 'scenemanagement',
          component: Scenemanagement
        },
        {
          path: 'freezerdetails',
          component: Freezerdetails
        },
        {
          path: 'pointofsaledetails',
          component: Pointofsaledetails
        },
        {
          path: 'questionnairedetails',
          component: Questionnairedetails
        }
      ]
    }
  ]
})
