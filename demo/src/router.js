import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
  {
      path: '/a',
      name: 'a',
      component: function (resolve) {
           require(['./components/a'],resolve)
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
