import service from 'common/js/fetch'
//////////////投后详情//////////////////
// 提交企业信息
export function changeInv(id = undefined) {
    const data = {
        id,  //123
        projectId, //基本信息ID: "1"
        enterpriseName, //企业名称: "5555"
        legalPerson,   //法人: "CESHI"
        registeredCapital,  //注册资本: null
        paiclCapital,  //实收资本: null
        registerDate,  //注册登记时间 : null
        creditCode,  //统一信用代码: null
        registerAddress, //注册地址: null
        workAddress,   //办公地址: null
        mainBusiness,  //主营业务: null
        remark,  //备注: null

    }
    return service({
        url: '/projectPool/updateEnterpriseInfo', 
        method: 'post', 
        data
    })
}
//提交基本信息
export function changePro(id = undefined) {
    const data = {

       id, //必传:0875d8a18eb34f599ff3bdb7fbba3cf8
       projectName,//项目名: "2"
       projectShortName, //项目简称: "3"
       addressId, //项目所在地: "321"
       projectTypeId, //项目类型ID: null
       industryId, //行业ID: null
       statusId, //项目状态ID: null
       projectFromId, //项目来源: null
       departmentId, //业务部门ID: null
       projectLeaderId,  //项目负责人id : null
       merchantId, //商户ID : null
    }
    return service({
        url: '/projectPool/updateProjectInfo', method: 'post', data
    })
}
//提交投资信息
export function changeLottery(id = undefined) {
    const data = {
        id,  //123
        projectId, //基本信息ID: "1"
        enterpriseName, //企业名称: "5555"
        legalPerson,   //法人: "CESHI"
        registeredCapital,  //注册资本: null
        paiclCapital,  //实收资本: null
        registerDate,  //注册登记时间 : null
        creditCode,  //统一信用代码: null
        registerAddress, //注册地址: null
        workAddress,   //办公地址: null
        mainBusiness,  //主营业务: null
        remark,  //备注: null
    }
    return service({url: '/projectPool/updateEnterpriseInfo', method: 'post', data})
}
//添加股权结构
export function addGu(id = undefined) {
    const data = {
       stockholderName, //股东姓名: null
       stockholderNature,//股东性质: null
       investmentAmount,//投资金额: null
       stockCount, //持股数量: null
       stockRatio, //股权占比: null
    }
    return service({url: '/projectPool/insertOwnershipStructure', method: 'post', data})
}
//删除股权结构
export function delGu(id = undefined) {
    const data = {
       "id",  //"f12c2243a813452a93b3a3155565323b"
    }
    return service({url: '/OwnershipStructure/deleteOwnershipStructure', method: 'post', data})
}
/////////管理/////////////////////
//添加项目费用
export function addFee(id = undefined) {
    const data = {
       "id",  //"f12c2243a813452a93b3a3155565323b"
    }
    return service({url: '/OwnershipStructure/deleteOwnershipStructure', method: 'post', data})
}
//编辑项目费用
export function addFee(id = undefined) {
    const data = {
       "id",  //"f12c2243a813452a93b3a3155565323b"
    }
    return service({url: '/OwnershipStructure/deleteOwnershipStructure', method: 'post', data})
}
//删除项目费用
export function addFee(id = undefined) {
    const data = {
       "id",  //"f12c2243a813452a93b3a3155565323b"
    }
    return service({url: '/OwnershipStructure/deleteOwnershipStructure', method: 'post', data})
}
//添加项目合同
export function addFee(id = undefined) {
    const data = {
       "id",  //"f12c2243a813452a93b3a3155565323b"
    }
    return service({url: '/OwnershipStructure/deleteOwnershipStructure', method: 'post', data})
}
//编辑项目合同
export function addFee(id = undefined) {
    const data = {
       "id",  //"f12c2243a813452a93b3a3155565323b"
    }
    return service({url: '/OwnershipStructure/deleteOwnershipStructure', method: 'post', data})
}
//删除项目合同
export function addFee(id = undefined) {
    const data = {
       "id",  //"f12c2243a813452a93b3a3155565323b"
    }
    return service({url: '/OwnershipStructure/deleteOwnershipStructure', method: 'post', data})
}
//添加投资支付
export function addFee(id = undefined) {
    const data = {
       "id",  //"f12c2243a813452a93b3a3155565323b"
    }
    return service({url: '/OwnershipStructure/deleteOwnershipStructure', method: 'post', data})
}
//编辑投资支付
export function addFee(id = undefined) {
    const data = {
       "id",  //"f12c2243a813452a93b3a3155565323b"
    }
    return service({url: '/OwnershipStructure/deleteOwnershipStructure', method: 'post', data})
}
//删除投资支付
export function addFee(id = undefined) {
    const data = {
       "id",  //"f12c2243a813452a93b3a3155565323b"
    }
    return service({url: '/OwnershipStructure/deleteOwnershipStructure', method: 'post', data})
}
//添加项目分红
export function addFee(id = undefined) {
    const data = {
       "id",  //"f12c2243a813452a93b3a3155565323b"
    }
    return service({url: '/OwnershipStructure/deleteOwnershipStructure', method: 'post', data})
}
//编辑项目分红
export function addFee(id = undefined) {
    const data = {
       "id",  //"f12c2243a813452a93b3a3155565323b"
    }
    return service({url: '/OwnershipStructure/deleteOwnershipStructure', method: 'post', data})
}
//删除项目分红
export function addFee(id = undefined) {
    const data = {
       "id",  //"f12c2243a813452a93b3a3155565323b"
    }
    return service({url: '/OwnershipStructure/deleteOwnershipStructure', method: 'post', data})
}