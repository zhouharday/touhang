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
        dicParent: "3"
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
