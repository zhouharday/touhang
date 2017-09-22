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

/////// 董事会 ///////////////
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
	return service({url: 'projectPool/insertOwnershipStructure', method: 'post', data});
}

// 股权删除
export function delGu(id = undefined) {
	const data = {
		id
	}
	return service({url: 'OwnershipStructure/deleteOwnershipStructure', method: 'post', data});
}
