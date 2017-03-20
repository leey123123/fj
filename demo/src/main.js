var env = process.env.NODE_ENV
var baseConf = {};
if(env === 'production'){
  baseConf.url = "123";
}else{
  import 
  baseConf.url = "http://127.0.0.1:8091/servlet";
}
baseConf.option = {
                    method:'GET',
                    url:'',
                    data:{},
                    emulateJSON: true
                    };
import Vue from 'vue'
import router from './router'
import VueReource from 'vue-resource'
import App from './app'
import './css/comm.css'

Vue.use(VueReource);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
