const r3 = [
    {
        path: 'fund',
        component: resolve => require(['../views/fund/fund.vue'], resolve),
        children: [
            {
                path: '',
                name: 'myfund',
                redirect: 'myfund'
            }, {
                path: 'myfund',
                component: resolve => require(['../views/fund/myfund.vue'], resolve)
            }, {
                path: 'add',
                component: resolve => require(['../views/fund/add.vue'], resolve)
            }, {
                path: ':id',
                component: resolve => require(['../views/fund/fundDetails.vue'], resolve)
            }
        ]
    }, {
        path: 'cooperative', //home/合作机构
        name: 'cooperative',
        component: resolve => require(['../views/fund/cooperative.vue'], resolve)
    }
]
export default r3
