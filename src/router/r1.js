export default [
    {
        path: '/homeContent', //home/首页
        name: 'homeContent',
        component: resolve => require(['../views/home/homeContent.vue'], resolve)
    },
    {
        path: 'task', //home/任务页
        name: 'task',
        component: resolve => require(['../views/office/task.vue'], resolve)
    },
    {
        path: 'assistant', //home/领投助手页
        name: 'assistant',
        component: resolve => require(['../views/assistant/assistant.vue'], resolve)
    },
    {
        path: 'projectPool', //home/项目池页
        name: 'projectPool',
        component: resolve => require(['../views/project/projectPool.vue'], resolve)

    },
    {
        path: 'preProject', //home/投前项目页
        name: 'preProject',
        component: resolve => require(['../views/project/preProject.vue'], resolve)
    }, 
    {
        path: 'addProject', //home/添加项目页
        name: 'addProject',
        component: resolve => require(['../views/project/addProject.vue'], resolve)
    }, 
    {
        path: 'preProjectMessage/:userId', //home/投前项目详情页
        name: 'preProjectMessage',
        component: resolve => require(['../views/project/preProjectMessage.vue'], resolve)

    }     
]