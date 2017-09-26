import service from 'common/js/fetch'

/*******************************项目库******************************************/
// 项目库列表
export function getProjectList(projectStageId,projectTypeId,projectName) {
    const data = {
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
        "projectStageId": projectStageId,
        "projectTypeId": projectTypeId,
        "projectName": projectName,
        "page": 1,
        "pageSize": 10
    }
    return service({url: '/investProject/getProjectList', method: 'post', data})
}


/*******************************投资人******************************************/
// 投资人列表
export function getInvestorList(investorName,investorTypeId) {
    const data = {
        "investorName": investorName,//投资者名称 模糊查询（非必传）
        "investorTypeId": investorTypeId,// 项目类型ID，（全部时不传此参数）
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,//商户ID必传
        "page": 1,//分页
        "pageSize": 10
    }
    // console.log(investorName)
    // console.log(investorTypeId)
    return service({url: '/investor/getInvestorList', method: 'post', data})
}

/*******************************基金库******************************************/
// 基金库列表
export  function getFundLibrary(searchText) {
     const data ={    //以下字段传空值或者不传 则是全部
        "orgTypeId": null,//组织类型ID
        "manageTypeId": null,//管理类型ID
        "fundStageId": "",//阶段类型
        "fundName":searchText,//模糊查询
        "fundStatusId":"",//状态
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,//商户id必传 "page": 1,//分页
        //  "merchantId": "123456",
        "pageSize": 10
     }
    return service({url: '/fund/getFundListByIndex', method: 'post', data})
}


/*******************************项目文档******************************************/
//左侧列表and搜索
export  function getLeftList(name) {
    const data = {
        "projectName" : name,
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
    }
    return service({url: 'investProject/getProjectAllList', method: 'post', data})
}
// /dictionaryController/selectAllStageDocument
export  function getRightList(typeId) {
    const data = {
        "typeId" : typeId,
        "type":'1', //标识 1：项目 2：基金
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
    }
    console.log(data)
    return service({url: '/dictionaryController/selectAllStageDocument', method: 'post', data})
}

/*******************************项目文档******************************************/
//左侧列表and搜索
export  function getFundLeftList(name) {
    const data = {
        "fundName" : name,
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
    }
    return service({url: '/fund/selectAllFund', method: 'post', data})
}
// /dictionaryController/selectAllStageDocument
export  function getFundRightList(typeId) {
    const data = {
        "typeId" : typeId,
        "type":'2', //标识 1：项目 2：基金
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
    }
    console.log(data)
    return service({url: '/dictionaryController/selectAllStageDocument', method: 'post', data})
}


/*******************************公用请求******************************************/
//公用索引
export  function getSelectIndex(id) {
    const data = {
        "id" : id
    }
    return service({url: 'appDictionary/selectIndex', method: 'post', data})
}
