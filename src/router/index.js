import Vue from 'vue';
import Router from 'vue-router';
import store from '../store'
import state from 'vuex'

Vue.use(Router)
import r1 from "./r1"
import r2 from "./r2"
import r3 from "./r3"
import r4 from "./r4"
let arr = [];
arr = arr.concat(r1, r2, r3, r4)

const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '*',
            component: resolve => require(['../views/Login.vue'], resolve)
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            name: 'home',
            component: resolve => require(['../components/Home.vue'], resolve),
            children: arr
            // children: 
            // [{
            //         path: 'task', //home/任务页
            //         name: 'task',
            //         component: resolve => require(['../views/office/task.vue'], resolve)
            //     },
            //     {
            //         path: 'contacts', //home/通讯录页
            //         name: 'contacts',
            //         component: resolve => require(['../views/office/Contacts.vue'], resolve)
            //     },
            // ]
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['../views/Login.vue'], resolve)
        },
        {
            path: '/register',
            name: 'register',
            component: resolve => require(['../views/Register.vue'], resolve)
        },
        {
            path: '/registerphone',
            name: 'registerphone',
            component: resolve => require(['../views/RegisterPhone.vue'], resolve)
        }
    ],
})


router.beforeEach((to, from, next) => { //在所有导航完成之前先判断是否已经登录
    store.state.login.approvelType = JSON.parse(sessionStorage.getItem('saveApprovalStatus')) || {};
    var isLogin = store.state.login.approvelType.isLogged;
    if (to.path == '/login' || to.path == '/registerphone' || to.path == '/register') {
        next();
        return;
    };
    // console.log(isLogin);
    if (isLogin) {
        next() // 进行下一个钩子函数  
    } else {
        next({
            path: '/login'
        }) //  跳转到login页面  
    }
})

export default router
