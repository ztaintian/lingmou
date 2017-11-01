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
import axios from 'axios'
Vue.use(Router)

  function axiosIfLongin(next){
    axios.post('/api/y2/frontend/web/index.php?r=user/index')
    .then(function (response) {
      if(response.data.code === 200){
        next()
      }else{
        next('/')
      }
    })
    .catch(function (error) {
      next('/')
   });
  }

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
          beforeEnter:(to, from, next)=>{
           axiosIfLongin(next)
          }
        },
        {
          path: 'focusreport',
          name: 'focusreport',
          component: Focusreport,
          beforeEnter:(to, from, next)=>{
            axiosIfLongin(next)
          }
        },
        {
          path: 'scenereport',
          name: 'scenereport',
          component: Scenereport,
          beforeEnter:(to, from, next)=>{
           axiosIfLongin(next)
          }
        },
        {
          path: 'distinguishsku',
          name: 'distinguishsku',
          component: Distinguishsku,
          beforeEnter:(to, from, next)=>{
            axiosIfLongin(next)
          }
        },
        {
          path: 'mustsku',
          name: 'mustsku',
          component: Mustsku,
          beforeEnter:(to, from, next)=>{
            axiosIfLongin(next)
          }
        },
        {
          path: 'importsku',
          name: 'importsku',
          component: Importsku,
          beforeEnter:(to, from, next)=>{
           axiosIfLongin(next)
          }
        },
        {
          path: 'usermanagement',
          name: 'usermanagement',
          component: Usermanagement,
          beforeEnter:(to, from, next)=>{
            axiosIfLongin(next)
          }
        },
        {
          path: 'administratorsettings',
          name: 'administratorsettings',
          component: Administratorsettings,
          beforeEnter:(to, from, next)=>{
            axiosIfLongin(next)
          }
        },
        {
          path: 'sellpoint',
          name: 'sellpoint',
          component: Sellpoint,
          beforeEnter:(to, from, next)=>{
            axiosIfLongin(next)
          }
        },
        {
          path: 'scenemanagement',
          name: 'scenemanagement',
          component: Scenemanagement,
          beforeEnter:(to, from, next)=>{
           axiosIfLongin(next)
          }
        },
        {
          path: 'freezerdetails',
          name: 'freezerdetails',
          component: Freezerdetails,
          beforeEnter:(to, from, next)=>{
           axiosIfLongin(next)
          }
        },
        {
          path: 'pointofsaledetails',
          name: 'pointofsaledetails',
          component: Pointofsaledetails,
          beforeEnter:(to, from, next)=>{
           axiosIfLongin(next)
          }
        },
        {
          path: 'questionnairedetails',
          name: 'questionnairedetails',
          component: Questionnairedetails,
          beforeEnter:(to, from, next)=>{
           axiosIfLongin(next)
          }
        }
      ]
    }
  ]
})
