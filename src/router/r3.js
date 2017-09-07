// 基金页面路由

const myfund = (resolve) => {
    import ('views/fund/myfund').then((module) => {
        resolve(module)
    })
}
const add = (resolve) => {
    import ('views/fund/add').then((module) => {
        resolve(module)
    })
}
const fundDetails = (resolve) => {
    import ('views/fund/fundDetails').then((module) => {
        resolve(module)
    })
}
const cooperative = (resolve) => {
    import ('views/fund/cooperative').then((module) => {
        resolve(module)
    })
}
// 综合查询路由信息

const proLibrary = (resolve) => {
    import ('views/query/proLibrary').then((module) => {
        resolve(module)
    })
}
const fundLibrary = (resolve) => {
    import ('views/query/fundLibrary').then((module) => {
        resolve(module)
    })
}
const investorLibrary = (resolve) => {
    import ('views/query/investorLibrary').then((module) => {
        resolve(module)
    })
}
const projectsDoc = (resolve) => {
    import ('views/query/projectsDoc').then((module) => {
        resolve(module)
    })
}
const fundDoc = (resolve) => {
    import ('views/query/fundDoc').then((module) => {
        resolve(module)
    })
}
// 投资者管理
const investor = (resolve) => {
    import ('views/investor/investor').then((module) => {
        resolve(module)
    })
}
const investorDetails = (resolve) => {
    import ('views/investor/investorDetails').then((module) => {
        resolve(module)
    })
}
const r3 = [
    // {
    //     path: 'fund',
    //     component: fund,
    //     children: [
    //         {
    //             path: '',
    //             name: 'myfund',
    //             redirect: 'myfund'
    //         }, {
    //             path: 'myfund',
    //             component: myfund
    //         }, {
    //             path: 'add',
    //             component: add
    //         }, {
    //             path: ':id',
    //             component: fundDetails
    //         }
    //     ]
    // },
    {
        path: 'myfund', // home/基金文档
        name: 'myfund',
        component: myfund
    }, {
        path: 'fundDetails/:id', // home/基金详情
        name: 'fundDetails',
        component: fundDetails
    }, {
        path: 'cooperative', //home/合作机构
        name: 'cooperative',
        component: cooperative
    }, {
        path: 'proLibrary', // home/项目库
        name: 'proLibrary',
        component: proLibrary
    }, {
        path: 'fundLibrary', // home/基金库
        name: 'fundLibrary',
        component: fundLibrary
    }, {
        path: 'investorLibrary', // home/投资者库
        name: 'investorLibrary',
        component: investorLibrary
    }, {
        path: 'projectsDoc', // home/项目文档
        name: 'projectsDoc',
        component: projectsDoc
    }, {
        path: 'fundDoc', // home/基金文档
        name: 'fundDoc',
        component: fundDoc
    }, {
        path: 'investor',
        name: 'investor',
        component: investor, // 投资者管理 我的投资者
    }, {
        path: 'investorDetails/:id',
        name: 'investorDetails',
        component: investorDetails
    }
]
export default r3
