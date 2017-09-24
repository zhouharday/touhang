import service from 'common/js/fetch'

// 投前项目列表
export function getPres(params = {}) {
	let { userId, merchantId, projectStageId, projectTypeId, projectName, page, pageSize } = params;
	const data = {
		userId,
		merchantId,
		projectStageId, //阶段不是必传，不传时候为全部
		projectTypeId, //项目类型，同上
		projectName,//模糊查询 非必传字段
		page,//分页 
    	pageSize
	}

	return service({url: '/investProject/getInvestProjectList', method: 'post', data})
}

// 投前项目详情
export function getPreDetail(projectId = undefined) {
	const data = {
		projectId
	}
	return service({url: '/projectInvestInfo/selectInvestInfo', method: 'post', data});
}

// TODO: 投前项目详情修改
export function updatePreDetail(projectId = undefined) {
	const data = {
		projectId
	}
	return service({url: '/projectInvestInfo/insertAndUpdate', method: 'post', data});
}

/////// 董事会 ///////////////
// 董事会列表
export function owers(enterpriseId = undefined) {
	const data = {
		enterpriseId
	}
	return service({url: '/boardMember/selectBoardMember', method: 'post', data});
}

// 添加董事会成员
export function addOwer(params = {}) {
	let { name, enterpriseId, nature, educationalBg } = params;
	const data = {
		enterpriseId,
		name,
		nature,
		educationalBg
	}
	return service({url: '/boardMember/addBoardMember', method: 'post', data});
}

// 修改董事会成员
export function updateOwer(params = {}) {
	let { id, name, enterprise_id, nature, educationalBg, tel } = params;
	const data = {
		id, //成员ID(必传):"5e7dd0c5c51e45f4a88319e93485d652",
		name, //董事会成员姓名:"ABC",
		enterprise_id, //企业ID:" f4a88319e93485d6525e7dd0c5c51e45"
		nature, //性质:null,
		educationalBg, //教育背景:null,
		tel //联系电话:null
	}
	return service({url: '/projectPool/updateProjectPoolBoardMember', method: 'post', data});
}

// 删除董事会成员
export function delOwer(id = undefined) {
	const data = {
		id
	}
	return service({url: '/projectPool/deleteBoardMember', method: 'post', data});
}

////// 项目团队 ////////////////
// 项目团队列表
export function getTeams(investProjectId = undefined) {
	const data = {
		investProjectId
	}
	return service({url: '/projectTeam/selectProjectTeam', method: 'post', data});
}

// 添加项目团队
export function addTeam(investProjectId = undefined) {
	const data = {
		investProjectId, //投资项目id: "CCCCCC",
        userId, //成员ID: "1",
        roleId, //角色ID: "1",
        personType //1:团队成员2：创建者  : 1: 1
	}
	return service({url: '/projectTeam/insertProjectTeam', method: 'post', data});
}

// 删除项目团队
export function delTeam(id = undefined) {
	const data = {
		id
	}
	return service({url: '/projectTeam/insertProjectTeam', method: 'post', data});
}

////// 股权 ////////////////
// 股权列表
export function gus(enterpriseId) {
	const data = {
		enterpriseId
	}
	return service({url: '/OwnershipStructure/selectOwnershipStructure', method: 'post', data});
}

// 股权添加
export function addGu(params) {
	let { stockholderNature, stockholderName, investmentAmount, stockCount, stockRatio } = params;
	const data = {
		stockholderName, //股东姓名: null
		stockholderNature,//股东性质: null
		investmentAmount,//投资金额: null
		stockCount, //持股数量: null
		stockRatio //股权占比: null
	}
	return service({url: '/projectPool/insertOwnershipStructure', method: 'post', data});
}

// 股权删除
export function delGu(id = undefined) {
	const data = {
		id
	}
	return service({url: '/OwnershipStructure/deleteOwnershipStructure', method: 'post', data});
}

////////////////////  风险记录相关 ////////////////////
// 风险列表
export function dangers(id = undefined) {
	const data = {
		id
	}
	return service({url: '/riskRegister/selectRiskRegister', method: 'post', data});
}

// 添加风险
export function addDanger(params = {}) {
	const { projectId, riskTheme, seedUserId, receivedUserId, riskDescribe } = params;
	const data = {
		projectId, //项目ID: "123456",
        riskTheme, //风险主题: "1",
        seedUserId, //提交人ID: null,
        receivedUserId, //接收人ID: null,
        riskDescribe //风险描述: null
	}
	return service({url: '/riskRegister/insertRiskRegister', method: 'post', data});
}

// 修改风险
export function editDanger(params = {}) {
	const { id, projectId, riskTheme, seedUserId, receivedUserId, riskDescribe } = params;
	const data = {
		id,
		projectId, //项目ID: "123456",
        riskTheme, //风险主题: "1",
        seedUserId, //提交人ID: null,默认是当前登录用户id
        receivedUserId, //接收人ID: null,
        riskDescribe //风险描述: null
	}
	return service({url: '/riskRegister/insertRiskRegister', method: 'post', data});
}

// 删除风险
export function delDanger(id = undefined) {
	const data = {
		id
	}
	return service({url: '/riskRegister/deleteRiskRegister', method: 'post', data});
}

// 添加风险追踪
export function danger(params = {}) {
	let { page, pageSize, riskRegisterId, disposeResult, disposeUserId, recordDetails } = params;
	const data = {
		page, // ": 1,
        pageSize, // ": 10,
        riskRegisterId, //风险ID: "727339b17e6c4752a5eea2794e149dfd",
        disposeResult, //1:处理中 2：已完成: 1,
        disposeUserId, //创建人ID: "727339b17e6c4752a5eea2794e149dfd",
        recordDetails //汇报内容: "测试风险跟踪"
	}
	return service({url: '/riskRegister/insertRiskFollower', method: 'post', data});
}

////////////////////  费用记录相关 ////////////////////
// 费用列表
export function fees(userid = undefined) {
	const data = {
		userid
	}
	return service({url: '/projectCost/selectProjectCost', method: 'post', data});
}

// 添加费用
export function addFee(params = {}) {
	let { costTypeId, amountMoney, userid } = params;
	const data = {
		costTypeId, // :"je56fghkjfkfghkghkghkk6j",   //费用类型ID
		amountMoney, // :"561561",    //金额
		userid // ":"dsgfgdgdfgdg"       //添加费用人的ID
	}
	return service({url: '/projectCost/addProjectCost', method: 'post', data});
}

// 修改费用
export function editFee(params = {}) {
	let { id, costStatus } = params;
	const data = {
		id, // :"164168f545b94a0bacbe4766a1d9bc92", //费用ID
		costTypeId, //":"99669odnjdk"   //费用类型
		amountMoney, // :"561561",    //金额
		userid // ":"dsgfgdgdfgdg"       //添加费用人的ID
	}
	return service({url: '/projectCost/updateProjectCost', method: 'post', data});
}

// 删除费用
export function delFee(id = undefined) {
	const data = {
		id
	}
	return service({url: '/projectCost/delProjectCost', method: 'post', data});
}

////////////////////  费用记录相关 ////////////////////
// 合同列表
export function contracts(userid = undefined) {
	const data = {
		userid
	}
	return service({url: '/projectCost/selectProjectCost', method: 'post', data});
}
