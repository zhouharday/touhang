import 'babel-polyfill'
import Vue from 'vue';
import Vuex from 'vuex';
import iView from 'iview';
import echarts from 'echarts';
import md5 from 'js-md5';
import _ from 'lodash'
import jquery from 'jquery'

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


// Vue.use(jquery);
Vue.use(iView)
Vue.use(echarts)
Vue.use(ElementUI)
Vue.prototype.md5 = md5
Vue.prototype.$http = axios
// Vue.prototype.$http = axios.create();
// Vue.prototype.api = '/api' //公司IP请求时 URL
// Vue.prototype._ = _  // lodash.js
Vue.prototype.api = 'http://sdwlyxgs.imwork.net:16380' //外网请求时 URL
Vue.prototype.$http.defaults.baseURL = 'http://sdwlyxgs.imwork.net:16380'
// Vue.prototype.api = ''; //上线时 URL

var vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
