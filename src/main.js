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
import {
    mapState
} from 'vuex';
Vue.use(iView);
Vue.use(ElementUI);
Vue.prototype.md5 = md5;
Vue.prototype._ = _; // lodash.js

var vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
// axios.defaults.withCredentials=true;
axios.interceptors.request.use(config => {
    config.headers = config.headers || {};
    store.state.login.token = JSON.parse(sessionStorage.getItem('token')) || '';
    if (store.state.login.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = store.state.login.token;
    };
    return config;
}, err => {
    return Promise.reject(err);
});
axios.interceptors.response.use((response) => {
    console.log(response);
    if (response.status == 1000) { //具体的判断token失效的参数
        // alert(555);
        store.state.login.token = '';
        this.delCook();
        sessionStorage.clear();
        localStorage.clear();
        let href = location.href;
        let index = href.indexOf('#');
        let url = href.substr(0, index);
        window.location.href = url + '#/login'; //需求方要求一旦出错立即跳转登录，所以采取这种侵入式的手段。
        store.state.login.loading = false;
    } else {
        return response;
    }
}, (error) => {
    return Promise.reject(error);
});


Vue.prototype.$http = axios;
/**************************************************************/

/***************************************************************/
// Vue.prototype.$http = axios.create();
// Vue.prototype.api = '/api'; //公司IP请求时 URL
Vue.prototype.api = 'http://sdwlyxgs.imwork.net:16380'; //外网请求时 URL
Vue.prototype.$http.defaults.baseURL = 'http://sdwlyxgs.imwork.net:16380';
// Vue.prototype.api = ''; 上线时 URL
