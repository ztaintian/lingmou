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
          name: 'questionnaire',
          component: Questionnaire,
          query: { type: 4 }
        },
        {
          path: 'focusreport',
          name: 'focusreport',
          component: Focusreport,
          query: { type: 1 }
        },
        {
          path: 'scenereport',
          name: 'scenereport',
          component: Scenereport
        },
        {
          path: 'distinguishsku',
          name: 'distinguishsku',
          component: Distinguishsku,
          query: { type: 5 }
        },
        {
          path: 'mustsku',
          name: 'mustsku',
          component: Mustsku
        },
        {
          path: 'importsku',
          name: 'importsku',
          component: Importsku
        },
        {
          path: 'usermanagement',
          name: 'usermanagement',
          component: Usermanagement
        },
        {
          path: 'administratorsettings',
          name: 'administratorsettings',
          component: Administratorsettings
        },
        {
          path: 'sellpoint',
          name: 'sellpoint',
          component: Sellpoint
        },
        {
          path: 'scenemanagement',
          name: 'scenemanagement',
          component: Scenemanagement
        },
        {
          path: 'freezerdetails',
          name: 'freezerdetails',
          component: Freezerdetails
        },
        {
          path: 'pointofsaledetails',
          name: 'pointofsaledetails',
          component: Pointofsaledetails
        },
        {
          path: 'questionnairedetails',
          name: 'questionnairedetails',
          component: Questionnairedetails
        }
      ]
    }
  ]
})
