import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import store from './store';
import 'element-ui/lib/theme-default/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题


Vue.use(ElementUI);

var vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');