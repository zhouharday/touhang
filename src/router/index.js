import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            name: 'home',
            component: resolve => require(['../components/Home.vue'], resolve),
            children: [{
                    path: 'redrive',
                    name: 'redrive',
                    component: resolve => require(['../views/shouye/shouye01.vue'], resolve)
                },
                {
                    path: 'shouye',
                     name: 'shouye',
                    component: resolve => require(['../views/shouye/shouye01.vue'], resolve)
                },
                {
                    path: 'renwu',
                    name: 'renwu',
                    component: resolve => require(['../views/renwu/renwu.vue'], resolve)
                },
                {
                    path: 'richeng',
                    name: 'richeng',
                    component: resolve => require(['../views/richeng/richeng.vue'], resolve)
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['../views/Login.vue'], resolve)
        },
    ]
})