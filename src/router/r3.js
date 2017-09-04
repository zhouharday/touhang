const r3 = [
    {
        path: 'fund',
        name: 'fund',
        component: resolve => require(['../views/fund/fund.vue'], resolve),
        children: [
            {
                path: ':id',
                component: resolve => require(['../views/fund/myfund.vue'], resolve)
            }
        ]
    }, {
        path: 'cooperative', //home/合作机构
        name: 'cooperative',
        component: resolve => require(['../views/fund/cooperative.vue'], resolve)
    }
]
export default r3
