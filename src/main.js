import Vue from 'vue';
import 'babel-polyfill';
import {Promise} from 'es6-promise-polyfill';
import Vuex from 'vuex';
import iView from 'iview';
import md5 from 'js-md5';
import _ from 'lodash';
import axios from 'axios';
import Qs from 'qs';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import store from './store';

Vue.use(iView);
Vue.use(ElementUI);
Vue.prototype.md5 = md5;
// axios.defaults.withCredentials=true;
Vue.prototype.$http = axios;

// Vue.prototype.$http = axios.create();
Vue.prototype.api = '/api'; //公司IP请求时 URL
Vue.prototype._ = _; // lodash.js
// Vue.prototype.api = 'http://sdwlyxgs.imwork.net:16380'; //外网请求时 URL
// Vue.prototype.$http.defaults.baseURL = 'http://sdwlyxgs.imwork.net:16380';
// Vue.prototype.api = ''; //上线时 URL

// http request 拦截器
// axios.interceptors.request.use(function (config) {
//     config.headers.token = sessionStorage.getItem("user_token")//将接口返回的token信息配置到接口请求中
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });
// // http response 拦截器
// axios.interceptors.response.use(function(response){
//     if(response.data.code=='1001'||response.data.code=='1002'){//具体的判断token失效的参数
//         sessionStorage.setItem("user_token",'')
//         sessionStorage.setItem("LoginUser",'{}')
//         alert(response.data.msg);
//         window.location.href='/#/login'//需求方要求一旦出错立即跳转登录，所以采取这种侵入式的手段。
//     }else{
//         return response
//     }
// }, function (error) {
//     return Promise.reject(error);
// });


var promise=new Promise(function(resove,reject){
    
});

promise.then(function(res) {
    // success
    console.log(res);
  }, function(error) {
    // failure
    console.log(error);
  });


var vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
