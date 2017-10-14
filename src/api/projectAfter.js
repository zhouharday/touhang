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

//投后重大事项列表
export function getEventList(projectId = undefined) {
	const data = {
		projectId
	};
	return service({url: '/bigIssues/selectBigIssues', method: 'post', data});
}

//添加投后重大事项
export function addEvent(params = {}) {
	let { projectId, issuesType, issuesDate, issuesContent, documentInfo } = params;
	const data = {
		projectId, 
		issuesType, 
		issuesDate, 
		issuesContent,
		documentInfo,
		addUserId : JSON.parse(sessionStorage.getItem('userInfor')).id
	}
	return service({url: '/bigIssuesclie/insertBigIssuesclie', method: 'post', data});
}

// 删除投后重大事项
export function delEvent(id = undefined) {
	const data = {
		id
	}
	return service({url: '/bigIssuesclie/delectBigIssues', method: 'post', data});
}



// // 投后 重大事项详情
// export function getPreDetail(projectId = undefined) {
// 	const data = {
// 		id:projectId
// 	}
// 	return service({url: '/projectPool/selectProjectPool', method: 'post', data});
// }



	// let userId = JSON.parse(sessionStorage.getItem('userInfor')).id; //当前登录用户id