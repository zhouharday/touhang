import Vue from 'vue';
import Vuex from 'vuex';
import iView from 'iview';
import axios from 'axios';

import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import store from './store';
// import indexCss from "../static/css/index.css";
// import 'element-ui/lib/theme-default/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
// import mainCss from "../static/css/main.css";

Vue.use(iView);
Vue.use(ElementUI);





Vue.prototype.$http = axios;
var vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');