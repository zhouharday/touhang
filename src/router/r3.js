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

// 系统管理
const business = (resolve) => {
    import('views/system/business').then((module) => {
        resolve(module)
    })
}
const companyInfo = (resolve) => {
    import('views/system/companyInfo').then((module) => {
        resolve(module)
    })
}
const department = (resolve) => {
    import('views/system/department').then((module) => {
        resolve(module)
    })
}
const dictionary = (resolve) => {
    import('views/system/dictionary').then((module) => {
        resolve(module)
    })
}
const fundAuthority = (resolve) => {
    import('views/system/fundAuthority').then((module) => {
        resolve(module)
    })
}
const process = (resolve) => {
    import('views/system/process').then((module) => {
        resolve(module)
    })
}
const processSetting = (resolve) => {
    import('views/system/processSetting').then((module) => {
        resolve(module)
    })
}
const role = (resolve) => {
    import('views/system/role').then((module) => {
        resolve(module)
    })
}
const subscriber = (resolve) => {
    import('views/system/subscriber').then((module) => {
        resolve(module)
    })
}


const r3 = [
    {
        path: 'myfund', // home/基金文档
        name: 'myfund',
        component: myfund
    }, {
        path: 'add', // home/基金文档
        name: 'add',
        component: add
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
    }, {
        path: 'business',  // 系统管理 业务权限
        name: 'business',
        component: business
    }, {
        path: 'companyInfo',
        name: 'companyInfo',
        component: companyInfo
    }, {
        path: 'department',
        name: 'department',
        component: department
    }, {
        path: 'dictionary',
        name: 'dictionary',
        component: dictionary
    }, {
        path: 'fundAuthority',
        name: 'fundAuthority',
        component: fundAuthority
    }, {
        path: 'process',
        name: 'process',
        component: process
    }, {
        path: 'processSetting',
        name: 'processSetting',
        component: processSetting
    }, {
        path: 'role',
        name: 'role',
        component: role
    }, {
        path: 'subscriber',
        name: 'subscriber',
        component: subscriber
    }
]
export default r3
