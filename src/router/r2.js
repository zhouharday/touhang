const r2 = [{
        path: 'schedule', //home/日程页
        name: 'schedule',
        component: resolve => require(['../views/office/schedule.vue'], resolve)
    }, {
        path: 'contacts', //home/通讯录页
        name: 'contacts',
        component: resolve => require(['../views/office/Contacts.vue'], resolve)
    }, {
        path: 'messageShow', //home/消息公告页
        name: 'messageShow',
        component: resolve => require(['../views/office/messageShow.vue'], resolve)
    },
    {
        path: 'featuresMenu', //home/平台管理/功能菜单
        name: 'featuresMenu',
        component: resolve => require(['../views/PlatformManager/featuresMenu.vue'], resolve)
    },
    {
        path: 'roleManger', //home/平台管理/角色管理
        name: 'roleManger',
        component: resolve => require(['../views/PlatformManager/roleManger.vue'], resolve)
    },
    {
        path: 'userList', //home/平台管理/用户列表
        name: 'userList',
        component: resolve => require(['../views/PlatformManager/userList.vue'], resolve)
    },
    {
        path: 'newsBulletin', //home/平台管理/消息公告
        name: 'newsBulletin',
        component: resolve => require(['../views/PlatformManager/newsBulletin.vue'], resolve)
    },
    {
        path: 'customerManagement', //home/平台管理/客户管理
        name: 'customerManagement',
        component: resolve => require(['../views/PlatformManager/customerManagement.vue'], resolve)
    },
    {
        path: 'customerPrivilege', //home/平台管理/客户权限
        name: 'customerPrivilege',
        component: resolve => require(['../views/PlatformManager/customerPrivilege.vue'], resolve)
    },
    {
        path: 'leadAssistant', //home/平台管理/客户权限
        name: 'leadAssistant',
        component: resolve => require(['../views/PlatformManager/leadAssistant.vue'], resolve)
    },
    {
        path: 'memberManagement', //home/平台管理/客户权限
        name: 'memberManagement',
        component: resolve => require(['../views/PlatformManager/memberManagement.vue'], resolve)
    },
    /***************统计分析模块 Router*******************************************************************/
    {
        path: 'fundedForm', //home/统计分析/出资统计表
        name: 'fundedForm',
        component: resolve => require(['../views/StatisticalAnalysis/fundedForm.vue'], resolve)
    },
    {
        path: 'projectInfor', //home/统计分析/项目信息统计表
        name: 'projectInfor',
        component: resolve => require(['../views/StatisticalAnalysis/projectInfor.vue'], resolve)
    },
    {
        path: 'fundInFormation', //home/统计分析/基金信息统计表
        name: 'fundInFormation',
        component: resolve => require(['../views/StatisticalAnalysis/fundInFormation.vue'], resolve)
    },
    {
        path: 'invesTment', //home/统计分析/项目投资统计表
        name: 'invesTment',
        component: resolve => require(['../views/StatisticalAnalysis/invesTment.vue'], resolve)
    },
    {
        path: 'statisticalAnalysis', //home/统计分析/统计分析图
        name: 'statisticalAnalysis',
        component: resolve => require(['../views/StatisticalAnalysis/statisticalAnalysis.vue'], resolve)
    }
]
export default r2
