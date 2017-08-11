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
            component: resolve => require(['../components/Home.vue'], resolve),
            children: [{
                    path: '',
                    component: resolve => require(['../views/shouye/shouye01.vue'], resolve)
                },
                {
                    path: 'shouye',
                    component: resolve => require(['../views/shouye/shouye01.vue'], resolve)
                },
                {
                    path: 'renwu',
                    component: resolve => require(['../views/renwu/renwu.vue'], resolve)
                },

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../views/Login.vue'], resolve)
        },
    ]
})