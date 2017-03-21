import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'queryBind',
      component: function (resolve) {
           require(['./components/queryBind'],resolve)
         }
    },
    {
      path: '/home',
      name: 'home',
      component: function (resolve) {
           require(['./components/home'],resolve)
         }
    }
  ]
})
