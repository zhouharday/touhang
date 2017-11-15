import Vue from 'vue'
import axios from 'axios'
import {Message} from 'iview'
import {API_ROOT} from '../../config'

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
    // const token = localStorage.getItem('token')
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`
    // }
    return config
}, error => {
    return Promise.reject(error)
})
service.interceptors.response.use(response => {
    // Message.success(response.data.message || '数据请求成功')
    return response
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
