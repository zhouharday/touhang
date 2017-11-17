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
Vue.prototype.api = '/api'; //公司IP请求时 URL
Vue.prototype._ = _; // lodash.js

var vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
// axios.defaults.withCredentials=true;
axios.interceptors.request.use(config => {
    config.headers = config.headers || {};
    if (store.state.login.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = store.state.login.token;
    };
    return config;
}, err => {
    return Promise.reject(err);
});

Vue.prototype.$http = axios;

// Vue.prototype.$http = axios.create();
Vue.prototype.api = 'http://sdwlyxgs.imwork.net:16380'; //外网请求时 URL
Vue.prototype.$http.defaults.baseURL = 'http://sdwlyxgs.imwork.net:16380';
// Vue.prototype.api = ''; 上线时 URL
