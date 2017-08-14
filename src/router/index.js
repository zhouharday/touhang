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
                    path: 'homeContent', //home/首页
                    name: 'homeContent',
                    component: resolve => require(['../views/home/homeContent.vue'], resolve)
                },
                {
                    path: 'task', //home/任务页
                    name: 'task',
                    component: resolve => require(['../views/office/task.vue'], resolve)
                },
                {
                    path: 'schedule', //home/日程页
                    name: 'schedule',
                    component: resolve => require(['../views/office/schedule.vue'], resolve)
                },
                {
                    path: 'contacts', //home/通讯录页
                    name: 'contacts',
                    component: resolve => require(['../views/office/Contacts.vue'], resolve)
                },
                {
                    path: 'messageShow', //home/消息公告页
                    name: 'messageShow',
                    component: resolve => require(['../views/office/messageShow.vue'], resolve)
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