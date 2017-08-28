import Vue from 'vue';
import Vuex from 'vuex';
import iView from 'iview';
import axios from 'axios';
import Qs from 'qs'
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
// Vue.prototype.api = process.env.NODE_ENV === 'production'? "" : "/api";
// Vue.prototype.$http = axios.create();
// Vue.prototype.$http.defaults.baseURL = 'http://192.168.0.198:9091';
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios.create({

    baseURL: 'http://192.168.0.198:9091',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {

        data = Qs.stringify(data);
        return data;
    }],
    withCredentials: true   //加了这段就可以跨域了 
});
var vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');