import service from 'common/js/fetch'

// 投前项目列表
export function getPres(params = {}) {
	let { userId, merchantId } = params;
	const data = {
		userId,
		merchantId
	}

	return service({url: '/appPreInvest/selectInvestProject', method: 'post', data})
}