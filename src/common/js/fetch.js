import Vue from 'vue'
import axios from 'axios'
import {Message} from 'iview'
import {API_ROOT} from '../../config'
import store from '../../store';

const service = axios.create({
    timeout: 8000,
    baseURL: API_ROOT,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 拦截器
service.interceptors.request.use(config => {
    config.headers = config.headers || {};
    store.state.login.token = JSON.parse(sessionStorage.getItem('token')) || '';
    if (store.state.login.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = store.state.login.token;
    };
 
    return config
}, error => {
    return Promise.reject(error)
})
service.interceptors.response.use(response => {
    // Message.success(response.data.message || '数据请求成功')
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
}, error => {
    // console.log(error)
    let response = error.response || ''
    let status = response.status || ''
    if (Object.is(status, 401)) {
        Message.error('权限不足，请重新登录！')
        // localStorage.removeItem('token')
        if (!Object.is(window.location.pathname, '/login')) {
            window.location.pathname = '/login'
        }
    } else if (Object.is(status, 500)) {
        Message.error('网络错误，请稍后再试！')
    } else if (Object.is(status, 403)) {
        Message.error(response.data.message || '网络请求异常！')
    } else if (Object.is(status, 404)) {
        Message.error(response.data.message || '未找到对应数据！')
    } else {
        Message.error(response.data.message || '未知错误！')
    }
    return Promise.reject(error)
})

Vue.prototype.$http = service
export default service
