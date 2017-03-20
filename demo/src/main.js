var env = process.env.NODE_ENV
var baseConf = {};
if(env === 'production'){
  baseConf.url = "123";
}else{
  baseConf.url = "";
}
baseConf.option = {
                    method:'GET',
                    url:'',
                    data:{},
                    emulateJSON: true
                    };
import './mock/mockdata'
import Vue from 'vue'
import router from './router'
import VueReource from 'vue-resource'
import App from './app'
import './css/comm.css'
Vue.use(VueReource);
Vue.config.productionTip = false;
window.baseConf = baseConf;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
