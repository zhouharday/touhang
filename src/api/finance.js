import service from 'common/js/fetch'

// 获取融资列表
export function getFinances(projectId) {
    const data = {
        projectId
    }
    return service({url: '/financing/selectFinancingInfo', method: 'post', data})
}

// 添加融资信息
export function addFinance(params = {}) {
	let { projectId, projectTurnId, financingWay, financingMoney, financingDate, merchantId } = params;
    const data = {
        projectId,      // 项目id
        projectTurnId,	// 融资轮次ID
        financingWay,	// 融资方式ID
        financingMoney, // 本次融资金额
        financingDate,	// 融资日期
        merchantId      // 商户id
    }
    return service({url: '/financing/addFinancingInfo', method: 'post', data})
}

// 编辑融资信息
export function editFinance(params) {
	let { id, projectTurnId, financingWay, financingMoney, financingDate } = params;
    const data = {
        id,
        projectId,      // 项目id
        projectTurnId,
        financingWay,
        financingMoney,
        financingDate // 融资日期
    }
    return service({url: '/financing/updateFinancingInfo', method: 'post', data})
}

// 删除融资信息
export function delFinance(id = undefined, projectId) {
    const data = {
        id,
        projectId      // 项目id
    }
    return service({url: '/financing/deleteFinancingInfo', method: 'post', data})
}
