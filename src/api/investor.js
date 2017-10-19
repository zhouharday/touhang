import service from 'common/js/fetch'

// 获取投资者列表
export function getInvestorList(id, name, num, total) {
    const data = {
            investmentManagerId: JSON.parse(sessionStorage.getItem('userInfor')).id,
            merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id,
            investorTypeId: id,
            investorName: name,
            page: num,
            pageSize: total
        }
        /*
        "investorName": "小",//投资者名称 模糊查询（非必传）
        "investorTypeId": "41654646",// 投资者类型ID，（全部时不传此参数）
        "investmentManagerId": "64646464",//当前登录用户ID（必传）
        "merchantId": "163546546",//商户ID必传
        "page": 1,//分页
        "pageSize": 5
         */
        return service({url: '/investor/getInvestorList', method: 'post', data})
    }
    // 删除投资者
    export function deleteInvestor(investorId) {
        const data = {
            id: investorId
        }
        return service({url: '/investor/deleteInvestor', method: 'post', data})
    }
    // 项目类型
    export function getProjectType() {
        const data = {
            dicParent: "202"
        }
        return service({url: '/dictionaryController/select2Menu', method: 'post', data})
    }
    // 投资者类型
    export function getInvestorType() {
        const data = {
            dicParent: "402"
        }
        return service({url: '/dictionaryController/select2Menu', method: 'post', data})
    }
    // 证件类型
    export function getIdType() {
        const data = {
            dicParent: "401"
        }
        return service({url: '/dictionaryController/select2Menu', method: 'post', data})
    }
    // 所属区域
    export function getSubArea() {
        const data = {
            dicParent: "501"
        }
        return service({url: '/dictionaryController/select2Menu', method: 'post', data})
    }

    // 添加投资者
    export function addInvestor(addInv) {
        const data = addInv
        return service({url: '/investor/addInvestor', method: 'post', data})
    }
    // 获取投资者详情
    export function getInvestorDetails(uId) {
        const data = {
            id: uId
        }
        return service({url: '/investor/getInvestorDetails', method: 'post', data})
    }
    // 获取协议列表(包括详情)
    export function GetProtocolsList(protocolsID, size) {
        const data = {
            inverstorId: protocolsID,
            merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id,
            pageSize: size
        }
        return service({url: '/investor/getAgreementList', method: 'post', data})
    }
    // 签约协议
    export function addAgreement(agreement) {
        const data = agreement
        return service({url: '/investor/addAgreement', method: 'post', data})
    }
    // 编辑协议
    export function updateAgreement(agreementData) {
        const data = agreementData
        return service({url: '/investor/updateAgreement', method: 'post', data})
    }
    // 删除协议
    export function deleteAgreement(deleteId) {
        const data = {
            id: deleteId
        }
        return service({url: '/investor/deleteAgreement', method: 'post', data})
    }
    // 提交编辑投资者信息
    export function updateInvestor(dataInfo) {
        return service({url: '/investor/updateInvestor', method: 'post', data: dataInfo})
    }
    // 获取基金选择列表
    export function getAllNormalFund() {
        const data = {
            merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id
        }
        return service({url: '/investor/getAllNormalFund', method: 'post', data})
    }
    // 获取拜访记录列表
    export function getVisitingRecordList(invId) {
        const data = {
            inverstorId: invId
        }
        return service({url: '/investor/getVisitingRecordList', method: 'post', data})
    }
    // 添加拜访记录
    export function addVisitingRecord(addVisiting) {
        const data = addVisiting
        return service({url: '/investor/addVisitingRecord', method: 'post', data})
    }
    // 修改拜访记录
    export function updateVisitingRecord(updateInfo) {
        const data = updateInfo
        return service({url: '/investor/updateVisitingRecord', method: 'post', data})
    }
    // 删除拜访记录 /investor/deleteVisitingRecord
    export function deleteVisitingRecord(deleteId) {
        const data = {
            id: deleteId
        }
        return service({url: '/investor/deleteVisitingRecord', method: 'post', data})
    }
    // 获取出资协议列表 /investor/getAgreementAmountList
    export function getAgreementAmountList(invId, merId) {
        const data = {
            inverstorId: invId,
            merchantId: merId
        }
        return service({url: '/investor/getAgreementAmountList', method: 'post', data})
    }
    // 修改出资协议 /investor/updateAgreementAmount
    export function updateAgreementAmount(updateInfo) {
        const data = updateInfo
        return service({url: '/investor/updateAgreementAmount', method: 'post', data})
    }
    // 删除出资协议 /investor/deleteAgreementAmount
    export function deleteAgreementAmount(deleteId) {
        const data = {
            id: deleteId
        }
        return service({url: '/investor/deleteAgreementAmount', method: 'post', data})
    }
    // 添加出资协议 /investor/addAgreementAmount
    export function addAgreementAmount(addInfo) {
        const data = addInfo
        return service({url: '/investor/addAgreementAmount', method: 'post', data})
    }
    // 获取该投资者的退出/分红协议列表 /investor/getEarningsAmountList
    export function getEarningsAmountList(inverstorId, merchantId) {
        const data = {
            inverstorId: inverstorId,
            merchantId: merchantId
        }
        return service({url: '/investor/getEarningsAmountList', method: 'post', data})
    }
    // 添加退出协议 /investor/addEarningsAmount
    export function addEarningsAmount(addInfo) {
        const data = addInfo
        return service({url: '/investor/addEarningsAmount', method: 'post', data})
    }
    // 编辑退出协议 /investor/updateEarningsAmount
    export function updateEarningsAmount(updateInfo) {
        const data = updateInfo
        return service({url: '/investor/updateEarningsAmount', method: 'post', data})
    }
    // 删除退出协议 /investor/deleteEarningsAmount
    export function deleteEarningsAmount(deleteId) {
        const data = {
            id: deleteId
        }
        return service({url: '/investor/deleteEarningsAmount', method: 'post', data})
    }
