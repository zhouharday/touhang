export default [
    {
        path: 'homeContent', //home/首页
        name: 'homeContent',
        component: resolve => require(['../views/home/homeContent.vue'], resolve)
    },
    {
        path: 'task', //home/任务页
        name: 'task',
        component: resolve => require(['../views/office/task.vue'], resolve)
    }
]