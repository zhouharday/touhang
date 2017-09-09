const r1 = [
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
        path: 'message/:userId', //home/领投助手的项目详情页
        name: 'message',
        component: resolve => require(['../views/assistant/message.vue'], resolve)
    },
    {
        path: 'projectPool', //home/项目池页
        name: 'projectPool',
        component: resolve => require(['../views/project/projectPool/projectPool.vue'], resolve)
    },  
    {
        path: 'zprojectPoolMessage/:userId', //home/入项目池的项目详情页
        name: 'zprojectPoolMessage',
        component: resolve => require(['../views/project/projectPool/zprojectPoolMessage.vue'], resolve)
    },
    {
        path: 'addProject', //home/手动添加项目页1
        name: 'addProject',
        component: resolve => require(['../views/project/projectPool/addProject.vue'], resolve)
    },
    {
        path: 'wprojectPoolMessage', //home/搜索添加项目页2
        name: 'wprojectPoolMessage',
        component: resolve => require(['../views/project/projectPool/wprojectPoolMessage.vue'], resolve)
    }, 
    {
        path: 'preProject', //home/投前项目页
        name: 'preProject',
        component: resolve => require(['../views/project/preProject/preProject.vue'], resolve)
    }, 
    {
        path: 'preProjectMessage/:userId', //home/投前项目详情页
        name: 'preProjectMessage',
        component: resolve => require(['../views/project/preProject/preProjectMessage.vue'], resolve)
    }, {
        path: 'aftProject', //home/投后项目页
        name: 'aftProject',
        component: resolve => require(['../views/project/aftProject/aftProject.vue'], resolve)
    }, {
        path: 'projectOut', //home/退出项目页
        name: 'projectOut',
        component: resolve => require(['../views/project/projectOut/projectOut.vue'], resolve)

    }, {
        path: 'projectValuation', //home/项目估值页
        name: 'projectValuation',
        component: resolve => require(['../views/project/projectValuation/projectValuation.vue'], resolve)

    }, {
        path: 'valuationView', //home/估值查看页
        name: 'valuationView',
        component: resolve => require(['../views/project/valuationView/valuationView.vue'], resolve)
    }
]
export default r1
