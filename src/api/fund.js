import service from 'common/js/fetch'

// 获取我的基金列表
export function getMyFund(num, size, value, orgId, manageId, stageId, statusId) {
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
         fundStatusId: "正常/启动", //状态（1：正常，2：终止）
         */
        orgTypeId: orgId,
        manageTypeId: manageId,
        fundStageId: stageId,
        fundStatusId: statusId,
        fundName: value,
        page: num,
        pageSize: size

    }
    return service({url: '/fund/selectMineAllFundList', method: 'post', data})
}
// 添加基金 /fund/addFundInfo
export function addFund(fund) {
    const data = fund
    return service({url: '/fund/addFundInfo', method: 'post', data})
}
// 删除基金 /fund/deleteFundInfo
export function deleteFundInfo(deleteId) {
    const data = {
        id: deleteId
    }
    return service({url: '/fund/deleteFundInfo', method: 'post', data})
}
// 管理类型
export function getManagementType() {
    const data = {
        dicParent: "303"
    }
    return service({url: '/dictionaryController/select2Menu', method: 'post', data})
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
// 合作机构类型
export function cooperativeType() {
    const data = {
        dicParent: "308"
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
// 获取所有的基金管理公司（添加基金时候下拉列表）/fund/selectAllManageCompany
export function selectAllManageCompany() {
    const data = {
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id //商户id
    }
    return service({url: '/fund/selectAllManageCompany', method: 'post', data})
}
// 基金阶段、项目阶段
export function fundStage(typeNum) {
    const data = {
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id,
        type: typeNum //1:项目 2：基金
    }
    return service({url: '/dictionaryController/slectAllStageIndex', method: 'post', data})
}
// 获取基金详情信息 /fund/getFundDetails
export function getMyFundDetails(detailsID) {
    const data = {
        id: detailsID
    }
    return service({url: '/fund/getFundDetails', method: 'post', data})
}
// 基金状态
// export function fundStatus() {
//     const data = {
//         "dicParent": "201"
//     }
//     return service({url: '/dictionaryController/select2Menu', method: 'post', data})
// }
// 获取所有的合作机构
export function getOrgList(name, num, lists) {
    const data = {
        orgName: name, //传空的时候为全部 机构名称
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id, //商户id必传"
        page: num,
        pageSize: lists
    }
    return service({url: '/organization/getOrgList', method: 'post', data})
}
// 下拉获取合作机构
export function getAllOrgList() {
    const data = {
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id, //商户id必传"
    }
    return service({url: '/organization/getOrgListByMerchantId', method: 'post', data})
}

// 修改机构
export function updateOrg(orgData) {
    const data = orgData
    return service({url: '/organization/updateOrg', method: 'post', data})
}
// 删除某个机构 /organization/deleteOrg
export function deleteOrg(orgId) {
    const data = {
        id: orgId
    }
    return service({url: '/organization/deleteOrg', method: 'post', data})
}
// 获取基金团队列表 /fund/getFundTeamList
export function getFundTeamList(id) {
    const data = {
        fundId: id
    }
    return service({url: '/fund/getFundTeamList', method: 'post', data})
}
// 添加基金团队成员 /fund/addFundTeam
export function addFundTeam(team) {
    const data = team
    return service({url: '/fund/addFundTeam', method: 'post', data})
}
//删除团队成员 /fund/deleteTeamMembers
export function deleteTeamMembers(delId) {
    const data = {
        id: delId
    }
    return service({url: '/fund/deleteTeamMembers', method: 'post', data})
}
// 下拉获取团队成员 /user/queryUserList
export function queryUserList() {
    const data = {
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id
    }
    return service({url: '/user/queryUserList', method: 'post', data})
}
//下拉获取基金角色列表 (查询项目、基金角色) /projectRole/queryList
export function queryList(roleNum) {
    const data = {
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id, //客户id 必须
        roleType: roleNum // 角色类型（0:项目;1:基金） 必须
    }
    return service({url: '/projectRole/queryList', method: 'post', data})
}
//基金投资者 /fund/getInvestorByFund
export function getInvestorByFund(id) {
    const data = {
        fundId: id
    }
    return service({url: '/fund/getInvestorByFund', method: 'post', data})
}
// 获取基金下面的项目（基金下面的功能） /fund/getProjectContractByFund
export function getProjectContractByFund(id) {
    const data = {
        fundId: id
    }
    return service({url: '/fund/getProjectContractByFund', method: 'post', data})
}
// 项目或基金阶段下面的文档或者基金下面的文档 /dictionaryController/selectProjectOrFundDocument
export function selectProjectOrFundDocument(fundId, typeNum) {
    const data = {
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id, //商户id所有字段都是必传字段
        typeId: fundId, //项目或者基金id
        type: typeNum //标识1：项目 2：基金 3：投资者
    }
    return service({url: '/dictionaryController/selectProjectOrFundDocument', method: 'post', data})
}
//基金估值信息 /fund/getFunAppraisement
export function getFunAppraisement(id) {
    const data = {
        fundId: id
    }
    return service({url: '/fund/getFunAppraisement', method: 'post', data})
}
// 获取基金分配列表 /fund/getFundAllocationList
export function getFundAllocationList(id) {
    const data = {
        fundId: id
    }
    return service({url: '/fund/getFundAllocationList', method: 'post', data})
}
// 获取一个基金的费用列表 /fund/getFundFeeList
export function getFundFeeList(id) {
    const data = {
        fundId: id
    }
    return service({url: '/fund/getFundFeeList', method: 'post', data})
}
// 修改某一个费用 /fund/updateFundFee
export function updateFundFee(fundData) {
    const data = fundData
    return service({url: '/fund/updateFundFee', method: 'post', data})
}
// 获取公司的所有的管理公司（分页） /fundId/selectManageCompany
export function selectManageCompany(num, size) {
    const data = {
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id, //商户id必传
        page: num,
        pageSize: size
    }
    return service({url: '/fund/selectManageCompany', method: 'post', data})
}
// 添加或修改基金管理公司 /fundId/addOrUpdateManagerCompany
export function addOrUpdateManagerCompany(managerId, name, describe) {
    const data = {
        id: managerId,
        companyName: name,
        companyDescribe: describe,
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id
    }
    return service({url: '/fund/addOrUpdateManagerCompany', method: 'post', data})
}
// 删除一个管理公司 /fund/deleteManagerCompany
export function deleteManagerCompany(deleteId) {
    const data = {
        id: deleteId
    }
    return service({url: '/fund/deleteManagerCompany', method: 'post', data})
}
// 查询部门列表 /sysDept/queryList
export function sectorList() {
    const data = {
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id
    }
    return service({url: '/sysDept/queryList', method: 'post', data})
}
// 获取基金估值图表数据 /appFund/getFundApprList
export function getFundApprList(listId) {
    const data = {
        fundId: listId
    }
    return service({url: '/fund/getFundApprList', method: 'post', data})
}
// 项目详情或者基金详情阶段下面需要上传的文档列表和完成情况 /dictionaryController/selectStageUploadDocument
export function selectStageUploadDocument(fundId, num) {
    const data = {
        typeId: fundId,
        type: num
    }
    return service({url: '/dictionaryController/selectStageUploadDocument', method: 'post', data})
}
// 获取配置项目或者基金的阶段 /dictionaryController/slectStageAllocation
export function slectStageAllocation() {
    const data = {
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id,
        type: 2
    }
    return service({url: '/dictionaryController/slectStageAllocation', method: 'post', data})
}
// 下一阶段（项目或者基金）/dictionaryController/nextStage
export function nextStage(fundId, num, currentStepId) {
    const data = {
        typeId: fundId,
        type: num,
        stageId: currentStepId
    }
    return service({url: '/dictionaryController/nextStage', method: 'post', data})
}
