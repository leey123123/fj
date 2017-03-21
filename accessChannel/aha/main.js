// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
var env = process.env.NODE_ENV
var baseConf = {};
if(env === 'production'){
  baseConf.url = "123";
}else{
  baseConf.url = "http://127.0.0.1:8091/servlet";
}
baseConf.option = {
                    method:'GET',
                    url:'',
                    data:{},
                    emulateJSON: true
                    };
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueReource from 'vue-resource'
import App from './App'

import home from './components/home.vue';
import index from './components/index.vue';
import introduction from './components/introduction.vue';
import news from './components/news.vue';

import MtRadio from 'mint-ui/lib/radio';
import 'mint-ui/lib/radio/style.css';
Vue.component(MtRadio.name, MtRadio);

import Toast from 'mint-ui/lib/Toast';
import 'mint-ui/lib/Toast/style.css';
Vue.component(Toast.name, Toast);

import Tabbar from 'mint-ui/lib/Tabbar';
import 'mint-ui/lib/Tabbar/style.css';
Vue.component(Tabbar.name, Tabbar);

import TabItem from 'mint-ui/lib/Tab-item';
import 'mint-ui/lib/Tab-item/style.css';
Vue.component(TabItem.name, TabItem);

import Indicator from 'mint-ui/lib/Indicator';
import 'mint-ui/lib/Indicator/style.css';

import './assets/css/comm.css'
import './assets/css/index.css'


window.Indicator = Indicator;
window.baseConf = baseConf;
window.Toast = Toast;

Vue.use(VueRouter);
Vue.use(VueReource);



const routes = [{
  path : '/',
  component : home
},{
  path : '/home',
  component : home
},
{
  path : '/index',
  component : index
},
{
  path : '/introduction',
  component : introduction
},
{
  path : '/news',
  component : news
}
];

const router = new VueRouter({routes});


/*Vue.http.interceptors.push((request, next) => {
	help.showLoading = true
	next((response) => {
		if(!response.ok){
			help.errorCode = response.status
			help.showDialog = true
		}
		help.showLoading = false
		return response
	});
});*/

Vue.http.interceptors.push(function(request, next) {
  Indicator.open();
  next(function(response) {
    Indicator.close();
    return response
  })
})


var app = new Vue({
  el: '#app',
  router,
  ...App
});


