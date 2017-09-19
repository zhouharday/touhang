import Vue from 'vue';
import Vuex from 'vuex';
import iView from 'iview';
import echarts from 'echarts';
import md5 from 'js-md5';
// 引入 ECharts 主模块
// var echarts = require('echarts/lib/echarts');

import axios from 'axios';
import Qs from 'qs'
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import store from './store';
// import zTree from '../static/js/jquery.ztree.core.js'
// import indexCss from "../static/css/index.css";
// import 'element-ui/lib/theme-default/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
// import mainCss from "../static/css/main.css";



Vue.use(iView);
Vue.use(echarts);
Vue.use(ElementUI);
Vue.prototype.md5 = md5;
Vue.prototype.$http = axios;
// Vue.prototype.api = process.env.NODE_ENV === 'production'? "" : "/api";
// Vue.prototype.$http = axios.create();
// Vue.prototype.$http.defaults.baseURL = 'http://192.168.0.198:9091';
// Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.prototype.$http = axios.create({

//     // baseURL: 'http://192.168.0.146:9091',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         // "Access-Control-Allow-Headers": "X-Custom-Header",
//         // "Access-Control-Allow-Methods": '"GET","POST"',
//         // 'Access-Control-Allow-Origin' :  "*"
//     },
//     transformRequest: [function (data) {
//         data = Qs.stringify(data);
//         return data;
//     }],
//     // timeout: 1000,
//     withCredentials: true
// });



var vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
