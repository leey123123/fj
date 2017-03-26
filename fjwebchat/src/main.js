import './mock/mockdata'
import './css/index.css'
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import VueReource from 'vue-resource'
import App from './app'
import Toast from './commom/Toast';
import './commom/Toast/style.css';
import Indicator from './commom/Indicator';
import './commom/Indicator/style.css';
import CryptoJS from './js/aes_2';
import './js/common'

FastClick.attach(document.body)
Vue.use(VueReource);
Vue.config.productionTip = false;
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = false;
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
    var data = response.body||{};
    if(response.status!==200){
      Toast({
              message: '系统异常，请重试！',
              position: 'bottom',
              duration: 2000
            });
    }
　　return response;

  });
});

//var env = process.env.NODE_ENV

window.Toast = Toast;
window.Indicator = Indicator;
window.secret={
  Encrypt:function(word,key){
            return CryptoJS.AES.encrypt(word,key).toString();
      },
  Decrypt:function(word,key){
          return CryptoJS.AES.decrypt(word,key).toString(CryptoJS.enc.Utf8);
      }
};




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
