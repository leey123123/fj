import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: function (resolve) {require(['./components/bind/login'],resolve)},
    },
    {
      path: '/login/loginsuccess',
      name: 'loginsuccess',
      component: function (resolve) {require(['./components/bind/loginSuccess'],resolve)},
    },
    {
      path: '/processlist',
      name: 'processlist',
      component: function (resolve) {require(['./components/process/list'],resolve)},
    },
    {
      path: '/process/detail',
      name: 'processDetail',
      component: function (resolve) {require(['./components/process/detail'],resolve)},
    },
    {
      path: '/protoDetail',
      name: 'protoDetail',
      component: function (resolve) {require(['./components/sign/protocolDetail'],resolve)},
    }
  ]
})
