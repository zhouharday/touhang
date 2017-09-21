import service from 'common/js/fetch'

// 获取我的基金列表
export function getMyFund() {
    const data = {
        createUserId: JSON.parse(sessionStorage.getItem('userInfor')).id, //当前登录用户id
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id, //商户id必传"
        //createUserId: "asdffsdfdsf", //当前登录用户id
        //merchantId: "123456", //商户id必传"
        /*
         //以下字段传空值或者不传则是全部"
         orgTypeId: null,//组织类型ID
         manageTypeId: null, //管理类型ID
         fundStageId: "1", //阶段类型1.基金设立2.运营管理3.基金退出
         fundName: "深", //模糊查询
         fundStatusId: "正常/启动", //状态（1：正常，2：终止）
         page: 1
        */
    }
    return service({url: '/fund/selectMineAllFundList', method: 'post', data})
}

export function addFund() {
    const data = {}
    return service({url: '/fund/addFundInfo', method: 'post', data})
}
// 管理类型
export function getManagementType() {
    const data = {
        dicParent: "303"
    }
    return service({
        url: '/dictionaryController/select2Menu',
        method: 'post',
        data
    })
}
// 组织类型
export function OrganizationType() {
    const data = {
        dicParent: "302"
    }
    return service({url: '/dictionaryController/select2Menu', method: 'post', data})
}
// 基金投向
export function FundInvestment() {
    const data = {
        dicParent: "304"
    }
    return service({url: '/dictionaryController/select2Menu', method: 'post', data})
}
// 管理公司
export function managementCompany() {
    const data = {
        dicParent: "307"
    }
    return service({url: '/dictionaryController/select2Menu', method: 'post', data})
}
// 基金阶段
export function fundStage() {
    const data = {
        "dicParent": "305"
    }
    return service({url: '/dictionaryController/select2Menu', method: 'post', data})
}
export function getMyFundDetails(detailsID) {
    const data = {
        id: detailsID
    }
    return service({url: '/fund/getFundDetails', method: 'post', data})
}
// 基金状态
export function fundStatus() {
    const data = {
        "dicParent": "201"
    }
    return service({
        url: '/dictionaryController/select2Menu',
        method: 'post',
        data
    })
}
// 获取所有的合作机构
export function getOrgList() {
    const data = {
        orgName: "", //传空的时候为全部 机构名称
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id, //商户id必传"
        // merchantId: "123456"
    }
    return service({
        url: '/organization/getOrgList',
        method: 'post',
        data
    })
}
// 下拉获取所有的合作机构
export function getAllOrgList() {
    const data = {
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id, //商户id必传"
    }
    return service({
        url: '/organization/getOrgListByMerchantId',
        method: 'post',
        data
    })
}
// 修改机构
export function updateOrg(OrgId) {
    const data = {
        id: OrgId
    }
    return service({
        url: '/organization/getOrgListByMerchantId',
        method: 'post',
        data
    })
}
