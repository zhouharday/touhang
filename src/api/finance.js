import service from 'common/js/fetch'

// 获取融资列表
export function getFinances(enterpriseId) {
    const data = {
        enterpriseId
    }
    return service({url: '/financing/selectFinancingInfo', method: 'post', data})
}

// 添加融资信息
export function addFinance(params = {}) {
	let { enterpriseId, projectTurnId, financingWayId, financingMoney, financingDate, versionRecord, merchantId } = params;
    const data = {
        enterpriseId,   // 企业id
        projectTurnId,	// 融资轮次ID
        financingWayId,	// 融资方式ID
        financingMoney, // 本次融资金额
        financingDate,	// 融资日期
        versionRecord,  // 操作表时间记录
        merchantId      // 商户id
    }
    return service({url: '/financing/addFinancingInfo', method: 'post', data})
}

// 编辑融资信息
export function editFinance(id = undefined, enterpriseId = undefined, params) {
	let { projectTurnId, financingWayId, financingMoney, financingDate } = params;
    const data = {
        id,
        enterpriseId, 

        projectTurnId,
        financingWayId,
        financingMoney,
        financingDate // 融资日期
    }
    return service({url: '/financing/updateFinancingInfo', method: 'post', data})
}

// 删除融资信息
export function delFinance(id = undefined) {
    const data = {
        id
    }
    return service({url: '/financing/deleteFinancingInfo', method: 'post', data})
}
