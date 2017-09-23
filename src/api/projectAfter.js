import service from 'common/js/fetch'

// 投后项目列表
export function getAfters(params = {}) {
	let { merchantId, projectTypeId, projectName, page, pageSize } = params;
	const data = {
		merchantId,
		projectTypeId,//项目类型 索引id 全部状态 可以不传
		projectName,//模糊查询
		page,
		pageSize
	}
	return service({url: '/investProject/getInvestLaterProjectList', method: 'post', data})
}

// 获取投后详情
export function getAfterDetail(params) {
	let { id, userId } = params;
	const data = {
		id,
		userId
	};
	return service({url: '', method: 'post', data});
}
