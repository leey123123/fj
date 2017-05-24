
import './css/channel.css'
import './js/flexible'
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import VueReource from 'vue-resource'
import App from './app'
import Toast from './commom/Toast';
import './commom/Toast/style.css';
import Indicator from './commom/Indicator';
import './commom/Indicator/style.css';
import Common from './js/common'
import contants from './js/contants'
import CryptoJS from './js/aes_2';
import mdate from './components/common/mdate';
import sdate from './components/common/sdate';

function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}

FastClick.attach(document.body)
Vue.use(VueReource);
Vue.config.productionTip = false;
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = false;
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};
var count=0;
Vue.http.interceptors.push((request, next) => {
  var param = request.body.param||{};
  var isshow = true;
  if(param.hasOwnProperty('isshow')){
    isshow=false;
    delete param['isshow'];
  }
  
  var url = request.url;
/*  var index = url.indexOf('function=')+9;
  var functionStr = url.substr(index);
  if('SendAuthCode|UserLogin|GetDataDictionary'.toLowerCase().indexOf(functionStr.toLowerCase())===-1){
      var clientinfo = getCookie("clientinfo").replace("\"","").replace("\"","");
      
      param.v = currentTime;
      if(clientinfo){
        request.headers.set('clientinfo',clientinfo);
      }else{
        request.headers.set('clientinfo',"");
      }
      
  }
*/  
  var currentTime = new Date().getTime().toString();
  request.headers.set('v',currentTime);
  request.body.param = encodeURIComponent(JSON.stringify(param));
  request.url = url+"&t="+Math.random();
  count++;
  if(isshow){
    Indicator.open({
      text:'加载中...',
      spinnerType: 'fading-circle'
    });
  }else{
    Indicator.open({
      text:'获取征信报告中...',
      spinnerType: 'fading-circle'
    });
  }
  
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
window.contants = contants;
new Common().init(Vue);
Vue.component('mdate',mdate);
Vue.component('sdate',sdate);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
