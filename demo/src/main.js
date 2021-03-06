import './mock/mockdata'
import Vue from 'vue'
import router from './router'
import VueReource from 'vue-resource'
import App from './app'
import './css/comm.css'
Vue.use(VueReource);
Vue.config.productionTip = false;
Vue.http.options.emulateJSON = true;

Vue.http.interceptors.push((request, next) => {
　next((response) => {
    var data = response.body|{};
    if(response.status!==200){
      data.errorcode = response.status;
      data.errormsg = response.statusText
    }
　　return response;

  });
});

var env = process.env.NODE_ENV
/*var baseConf = {};
if(env === 'production'){
  baseConf.url = "";
}else{
  url = "";
}
window.baseConf = baseConf;
*/




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
