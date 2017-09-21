import service from 'common/js/fetch'

// 投后项目列表
export function getAfters(params = {}) {
	let { projectName, merchantId } = params;
	const data = {
		projectName,
		merchantId
	}

	return service({url: '/appPostInverst/selectInvestProject', method: 'post', data})
}

// 投后项目详情
export function getAfterDetail(params = {}) {
	let { id, userId } = params;
	const data = {
		id,
		userId
	}

	return service({url: '/appPostInverst/getInvestProject', method: 'post', data})
}
