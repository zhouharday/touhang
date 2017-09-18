import service from 'common/js/fetch'

// 获取项目估值列表
export function getProjectValuation(projectName = undefined) {
    const data = {
        projectName: projectName
    }
    return service({url: '/appraisement/likeAppraisement', method: 'post', data})
}

// 根据状态估值查询
export function getProjectBySelect(selectValue) {
	const data = {
        appraisementStatus: selectValue	// 1:已提交2：未提交 （为null时查询提交及提交的s所有）
    }
    return service({url: '/appraisement/selectAppraisement', method: 'post', data})
}

// 修改估值
export function updateValuation(param) {
	let { appraisementValue, appraisementStatus, projectId, appraisementParamer, id, appraisementUserId } = param;
	const data = {
		appraisementValue, //估值金额: HHHHH,
		appraisementStatus, //1:已提交2：未提交: 1,
		projectId, //项目ID: dc3e4b66ed5944ec9fa10e83aa0c3301,
		appraisementParamer, //项目估值参数: 1,
		id, //估值ID: 2,
		appraisementUserId //估值人员: 1
	}
	return service({url: '/appraisement/updaAppraisement', method: 'post', data})
}