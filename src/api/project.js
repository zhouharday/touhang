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
export function updateValuation(params = {}) {
	let { appraisementValue, appraisementStatus, projectId, appraisementParamer, id, appraisementUserId } = params;
	const data = {
		appraisementValue, //估值金额: HHHHH,
		appraisementStatus, //1:已提交2：未提交: 
		projectId, //项目ID: dc3e4b66ed5944ec9fa10e83aa0c3301,
		appraisementParamer, //项目估值参数: 1,
		id, //估值ID: 2,
		appraisementUserId //估值人员: 1
	}
	return service({url: '/appraisement/updaAppraisement', method: 'post', data})
}

// 投前项目列表
export function getPres(params = {}) {
	let { projectName, projectType, industryId, merchantId } = params;
	const data = {
		projectName, // 项目名关键字:"讲",
		projectType, // 状态ID(1：正常 2：观察 3中止 4：淘汰)"1",
		industryId,  // 数据字典中行业ID:"14","
		merchantId   // 商业ID（必传）:"123456"
	}
	return service({url: '/projectPool/searchProject', method: 'post', data})
}

// 投前项目详情
export function getPreDetail(id) {
	const data = {
		id
	}
	return service({url: '/projectPool/selectProjectPool', method: 'post', data});
}

// 添加项目
export function addPre(params = {}) {
	let { projectInfo, enterpriseInfo } = params;
	/*
	let { 
		projectName, //项目名: "2",
        projectShortName, //项目简称: "3",
        addressId, //项目所在地: "321",
        createPersonId, //项目创建人: "ooo",
        projectTypeId, //项目类型ID: null,
        industryId, //行业ID: null,
        projectFromId, //项目来源: null,
        departmentId //业务部门ID: null
    } = ( projectInfo || {} )
    let {
    	projectName, //项目名: "2",
        projectShortName, //项目简称: "3",
        addressId, //项目所在地: "321",
        createPersonId, //项目创建人: "ooo",
        projectTypeId, //项目类型ID: null,
        industryId, //行业ID: null,
        projectFromId, //项目来源: null,
        departmentId //业务部门ID: null
    } = ( enterpriseInfo || {} )
	*/
	const data = {
		projectInfo,
		enterpriseInfo
	}
	return service({url: '/projectPool/addProjectPool', method: 'post', data})
}

// 删除项目
export function delPre(preId) {
	const data = {

	} 
	return service({url: '', method: 'post', data});
}

// 转投资
export function transPre(params = {}) {
	let { projectId, merchantId, addProjectUserId } = params;
	const data = {
		projectId,
		merchantId,
		addProjectUserId
	}
	return service({url: '/investProject/addInvestProject', method: 'post', data});
}
