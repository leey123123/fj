import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: function (resolve) {require(['./components/login'],resolve)},
    },
    {
      path: '/add',
      name: 'add',
      component: function (resolve) {require(['./components/add'],resolve)},
    },
    {
      path: '/upload',
      name: 'upload',
      component: function (resolve) {require(['./components/upload'],resolve)},
    },
    {
      path: '/main',
      name: 'main',
      component: function (resolve) {require(['./components/main/index'],resolve)},
      children:[
          {
              path: '/',
              name: '/',
              component: function (resolve) {require(['./components/main/apply'],resolve)},
            },
          {
              path: 'apply',
              name: 'apply',
              component: function (resolve) {require(['./components/main/apply'],resolve)},
            },
            {
              path: 'history',
              name: 'history',
              component: function (resolve) {require(['./components/main/history'],resolve)},
            },
            {
              path: 'menu',
              name: 'menu',
              component: function (resolve) {require(['./components/main/menu'],resolve)},
            },
            {
              path: 'mine',
              name: 'mine',
              component: function (resolve) {require(['./components/main/mine'],resolve)},
            }      
      ]
    },
    {
      path: '/base',
      name: 'base',
      component: function (resolve) {require(['./components/base/index'],resolve)},
      children:[
          {
              path: '/',
              name: '/',
              component: function (resolve) {require(['./components/base/loantrial'],resolve)},
            },
          {
              path: 'loantrial',
              name: 'loantrial',
              component: function (resolve) {require(['./components/base/loantrial'],resolve)},
            },
            {
              path: 'trialDetail',
              name: 'trialDetail',
              component: function (resolve) {require(['./components/base/trialDetail'],resolve)},
            },
            {
              path: 'info',
              name: 'info',
              component: function (resolve) {require(['./components/base/info/index'],resolve)},
              children:[
                          {
                              path: '/',
                              name: '/',
                              component: function (resolve) {require(['./components/base/info/baseinfo'],resolve)},
                            },
                          {
                              path: 'baseinfo',
                              name: 'baseinfo',
                              component: function (resolve) {require(['./components/base/info/baseinfo'],resolve)},
                            },
                            {
                              path: 'loaninfo',
                              name: 'loaninfo',
                              component: function (resolve) {require(['./components/base/info/loaninfo'],resolve)},
                            },
                            {
                              path: 'workinfo',
                              name: 'workinfo',
                              component: function (resolve) {require(['./components/base/info/workinfo'],resolve)},
                            },
                            {
                              path: 'contactinfo',
                              name: 'contactinfo',
                              component: function (resolve) {require(['./components/base/info/contactinfo'],resolve)},
                            },
                            {
                              path: 'otherinfo',
                              name: 'otherinfo',
                              component: function (resolve) {require(['./components/base/info/otherinfo'],resolve)},
                            },
                            {
                              path: 'channelinfo',
                              name: 'channelinfo',
                              component: function (resolve) {require(['./components/base/info/channelinfo'],resolve)},
                            }    
                                  
                      ]
            }     
      ]
    }

  ]
})
