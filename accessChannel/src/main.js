import './css/info.css'
import './css/main.css'
import './css/resetmobile.css'
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import VueReource from 'vue-resource'
import App from './app'
import Toast from 'mint-ui/lib/Toast';
import 'mint-ui/lib/Toast/style.css';
import Indicator from 'mint-ui/lib/Indicator';
import 'mint-ui/lib/Indicator/style.css';

FastClick.attach(document.body)
Vue.use(VueReource);
//Vue.use(Toast);
Vue.config.productionTip = false;
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;
var count=0;
Vue.http.interceptors.push((request, next) => {
  count++;
  Indicator.open({
    spinnerType: 'fading-circle'
  });
　next((response) => {
    count--;
    if(count<=0){
      Indicator.close();
    }
    var data = response.body|{};
    if(response.status!==200){
      data.errorcode = response.status;
      data.errormsg = response.statusText
    }
　　return response;

  });
});

//var env = process.env.NODE_ENV

window.Toast = Toast;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
