import service from 'common/js/fetch'

// 获取投资者列表
export function getInvestorList() {
    const data = {
        investmentManagerId: JSON.parse(sessionStorage.getItem('userInfor')).id,
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id
    }
    return service({
        url: '/investor/getInvestorList',
        method: 'post',
        data
    })
}
// 项目类型
export function getProjectType() {
    const data = {
        dicParent: "202"
    }
    return service({
        url: '/dictionaryController/select2Menu',
        method: 'post',
        data
    })
}
// 投资者类型
export function getInvestorType() {
    const data = {
        dicParent: "70"
    }
    return service({
        url: '/dictionaryController/select2Menu',
        method: 'post',
        data
    })
}
// 证件类型
export function getIdType() {
    const data = {
        dicParent: "401"
    }
    return service({
        url: '/dictionaryController/select2Menu',
        method: 'post',
        data
    })
}
// 所属区域
export function getSubArea() {
    const data = {
        dicParent: "501"
    }
    return service({
        url: '/dictionaryController/select2Menu',
        method: 'post',
        data
    })
}

// 添加投资者
export function addInvestor(addInv) {
    const data = addInv
    return service({
        url: '/investor/addInvestor',
        method: 'post',
        data
    })
}
// 获取投资者详情
export function getInvestorDetails(uId) {
    const data = {
        id: uId
    }
    return service({
        url: '/investor/getInvestorDetails',
        method: 'post',
        data
    })
}
// 获取协议列表(包括详情)
export function GetProtocolsList(protocolsID) {
    const data = {
        inverstorId: protocolsID,
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id
    }
    return service({
        url: '/investor/getAgreementList',
        method: 'post',
        data
    })
}
// 提交编辑投资者信息
export function updateInvestor(dataInfo) {
    return service({
        url: '/investor/updateInvestor',
        method: 'post',
        data: dataInfo
    })
}
// 获取基金选择列表
export function getAllNormalFund() {
    const data = {
        merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id
    }
    return service({
        url: '/investor/getAllNormalFund',
        method: 'post',
        data
    })
}
// 获取拜访记录列表
export function getVisitingRecordList(invId) {
    const data = {
        inverstorId: invId
    }
    return service({
        url: '/investor/getVisitingRecordList',
        method: 'post',
        data
    })
}
// 添加拜访记录
export function addVisitingRecord(addVisiting) {
    const data = addVisiting
    return service({
        url: '/investor/addVisitingRecord',
        method: 'post',
        data
    })
}
