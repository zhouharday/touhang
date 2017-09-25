import service from 'common/js/fetch'

// 获取我的基金列表
export function getMyFund(num, size, value) {
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
         fundName: value,
         page: num,
         pageSize: size

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
    return service({url: '/dictionaryController/select2Menu', method: 'post', data})
}
// 获取所有的合作机构
export function getOrgList() {
    const data = {
        orgName: "", //传空的时候为全部 机构名称
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id, //商户id必传"
        // merchantId: "123456"
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
export function queryList() {
    const data = {
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id, //客户id 必须
        roleType: 1 // 角色类型（0:项目;1:基金） 必须
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
export function selectProjectOrFundDocument(fundId) {
    const data = {
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id, //商户id所有字段都是必传字段
        typeId: fundId, //项目或者基金id
        type: 2 //标识1：项目 2：基金 3：投资者
    }
    return service({url: '/dictionaryController/selectProjectOrFundDocument', method: 'post', data})
}
