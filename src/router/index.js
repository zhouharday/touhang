import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import r1 from "./r1";
import r2 from "./r2";
import r3 from "./r3";
let arr = [];
arr = arr.concat(r1,r2,r3);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            name: 'home',
            component: resolve => require(['../components/Home.vue'], resolve),
            children: arr
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

    ]
})