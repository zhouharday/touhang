export default[
    {
        path : 'myfund', //home/我的基金
        name : 'myfund',
        component : resolve => require(['../views/fund/myfund.vue'], resolve)
    }, {
        path : 'cooperative', //home/合作机构
        name : 'cooperative',
        component : resolve => require(['../views/fund/cooperative.vue'], resolve)
    }
]
