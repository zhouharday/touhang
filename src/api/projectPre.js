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
		id:projectId
	}
	return service({url: '/projectPool/selectProjectPool', method: 'post', data});
}

//投前项目所有阶段 含全部
export function slectAllStageIndex() {
	let merchantId = JSON.parse(sessionStorage.getItem('merchants'))[0].id; //商户id必传"
	const data = {
		merchantId:merchantId,
		type:1
	}
	return service({url: '/dictionaryController/slectAllStageIndex', method: 'post', data});
}

//投前项目所有阶段
export function slectAllStage() {
	let merchantId = JSON.parse(sessionStorage.getItem('merchants'))[0].id; //商户id必传"
	const data = {
		merchantId:merchantId,
		type:1
	}
	return service({url: '/dictionaryController/slectStageAllocation', method: 'post', data});
}
// 项目详情阶段下面需要上传的文档列表和完成情况
export function getStageUploadDocument(params = {}) {
	let {typeId, investProjectId} = params;
	const data = {
		typeId,
		investProjectId,
		type: 1
	}
	return service({url: '/dictionaryController/selectStageUploadDocument', method: 'post', data});
}

//项目下一阶段
export function nextStage(params = {}) {
	let {typeId, investProjectId, stageId} = params;
	const data = {
		typeId,
		investProjectId,
		type: 1,
		stageId
	}
	return service({url: '/dictionaryController/nextStage', method: 'post', data});
}

//项目中止
export function suspendInvestProject(id = undefined) {
	const data = {
		id
	}
	return service({url: '/investProject/suspendInvestProject', method: 'post', data});
}

// TODO: 投前项目-修改投资信息
export function changeCapitalInfo(params = {}) {
	const data = params;
	console.log("投前项目-修改投资信息: "+ JSON.stringify(params));
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

// 添加董事会成员 2017-9-28 20:25:26
export function addOwer(params = {}) {
	let { id, projectId, name, enterpriseId, nature, educationalBg } = params;
	const data = {
		id,
		projectId,
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

// 删除董事会成员 2017-9-28 21:05:03
export function delOwer(id = undefined) {
	const data = {
		id
	}
	return service({url: '/boardMember/deleteBoardMember', method: 'post', data});
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
export function addInsertProjectTeam(team) {
	const data = team
	return service({url: '/projectTeam/insertProjectTeam', method: 'post', data});
}

// 删除项目团队
export function delTeam(id = undefined) {
	const data = {
		id
	}
	return service({url: 'projectTeam/deleteProjectTeam', method: 'post', data});
}

////// 股权 ////////////////
// 股权列表
export function gus(enterpriseId) {
	const data = {
		enterpriseId
	}
	return service({url: '/OwnershipStructure/selectOwnershipStructure', method: 'post', data});
}

// 股权添加 2017-9-28 20:25:17
export function addGu(params) {
	let { id, projectId, stockholderNature, stockholderName, investmentAmount, stockCount, stockRatio } = params;
	const data = {
		id,
		projectId,
		stockholderName, //股东姓名: null
		stockholderNature,//股东性质: null
		investmentAmount,//投资金额: null
		stockCount, //持股数量: null
		stockRatio //股权占比: null
	}
	return service({url: '/projectPool/updateOwnershipStructure', method: 'post', data});
}

// 股权删除 2017-9-28 21:05:09
export function delGu(id = undefined) {
	const data = {
		id
	}
	return service({url: '/OwnershipStructure/deleteOwnershipStructure', method: 'post', data});
}

////////////////////  风险记录相关 ////////////////////
// 风险列表
export function dangers(projectId = undefined) {
	const data = {
		projectId
	}
	return service({url: '/riskRegister/getRiskList', method: 'post', data});
}

// 查看风险
export function selectRiskRegister(id = undefined) {
	const data = {
		id
	}
	return service({url: '/riskRegister/selectRiskRegister', method: 'post', data});
}

// 添加风险
export function addDanger(params = {}) {
	const { projectId, riskTheme, seedUserId, receivedUserId, riskDescribe, completeDate, documentInfo } = params;
	const data = {
		projectId, //项目ID: "123456",
        riskTheme, //风险主题: "1",
        seedUserId, //提交人ID: null,
        receivedUserId, //接收人ID: null,
        riskDescribe, //风险描述: null
        completeDate, //完成时间: null
        documentInfo
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
export function insertRiskFollower(params = {}) {
	let { riskRegisterId, disposeResult, recordDetails, documentInfo } = params;
	let userId = JSON.parse(sessionStorage.getItem('userInfor')).id; //当前登录用户id
	const data = {
        riskRegisterId, //风险ID: "727339b17e6c4752a5eea2794e149dfd",
        disposeResult, //1:处理中 2：已完成: 1,
        disposeUserId: userId, //创建人ID: "727339b17e6c4752a5eea2794e149dfd",
        recordDetails, //汇报内容: "测试风险跟踪"
        documentInfo
	}
	return service({url: '/riskRegister/insertRiskFollower', method: 'post', data});
}

////////////////////  费用记录相关 ////////////////////
// 费用列表
export function fees(projectId = undefined) {
	const data = {
		projectId
	}
	return service({url: '/projectCost/selectProjectCost', method: 'post', data});
}

// 添加费用
export function addFee(params = {}) {
	let { costTypeId, amountMoney, projectId } = params;
	let userid = JSON.parse(sessionStorage.getItem('userInfor')).id; //当前登录用户id
	const data = {
		costTypeId, // :"je56fghkjfkfghkghkghkk6j",   //费用类型ID
		amountMoney, // :"561561",    //金额
		projectId,
		userid // ":"dsgfgdgdfgdg"       //添加费用人的ID
	}
	return service({url: '/projectCost/addProjectCost', method: 'post', data});
}

// 修改费用
export function editFee(params = {}) {
	let { id, costTypeId, amountMoney } = params;
	let userId = JSON.parse(sessionStorage.getItem('userInfor')).id; //当前登录用户id
	const data = {
		id, // :"164168f545b94a0bacbe4766a1d9bc92", //费用ID
		costTypeId, //":"99669odnjdk"   //费用类型
		amountMoney, // :"561561",    //金额
		userId // ":"dsgfgdgdfgdg"       //费用修改人的ID
	}
	return service({url: '/projectCost/updateProjectCost', method: 'post', data});
}

// 删除费用
export function delFee(id = undefined) {
	const data = {
		id
	}
	return service({url: '/projectCost/deleteProjectCost', method: 'post', data});
}

////////////////////  费用记录相关 ////////////////////
// 合同列表
export function contracts(projectId = undefined) {
	const data = {
		projectId
	}
	return service({url: '/projectContract/selectAllProjectContract', method: 'post', data});
}

// 添加项目合同
export function addContract(projectContract = {}, fundInfo = []) {
	const data = {
        projectContract : projectContract,
        fundInfo : fundInfo
    }
	return service({url: '/projectContract/addProjectContract', method: 'post', data});
}

// 获取项目合同详情
export function getContractDetail(id) {
	const data = {
        id
    }
	return service({url: '/projectContract/getProjectContractDetails', method: 'post', data});
}
// 编辑项目合同
export function editContract(projectContract = {}, fundInfo = []) {
	let { projectId, contractName, signDate, contractAmount, stockRatio, handlerUserId, handlerDate, documentInfo } = projectContract;
	const data = {
        projectContract : projectContract,
        fundInfo : fundInfo
    }
	return service({url: '/projectContract/updateProjectContract', method: 'post', data});
}

// 删除合同
export function delContract(id = undefined) {
	const data = {
		id // ": "dc3e4b66ed5944ec9fa10e83aa0c3301"//合同id
	}
	return service({url: '/projectContract/deleteProjectContract', method: 'post', data});
}
	
//项目投资支付列表
export function getContractPay(projectId = undefined) {
	const data = {
		projectId
	}
	return service({url: '/projectPay/getContractPayList', method: 'post', data});
}

//添加投资支付
export function addContractPay(projectInvestPay = {}, payDetails = []) {
	const data = {
        projectInvestPay : projectInvestPay,
        payDetails : payDetails
    }
	return service({url: '/projectPay/addProjectInvestPay', method: 'post', data});
}

//获取投资支付详情
export function getContractPayDetail(id = undefined) {
	const data = {
        id
    }
	return service({url: '/projectPay/getContractPayDetails', method: 'post', data});
}

//编辑投资支付
export function editContractPay(projectInvestPay = {}, payDetails = []) {
	const data = {
        projectInvestPay : projectInvestPay,
        payDetails : payDetails
    }
	return service({url: '/projectPay/updateProjectInvestPay', method: 'post', data});
}

// 删除投资支付
export function delPay(id = undefined) {
	const data = {
		id 
	}
	return service({url: '/projectPay/deleteProjectInvestPay', method: 'post', data});
}

//添加项目分红
export function addParticipation(projectParticipation = {}, participationDetails = []) {
	const data = {
        projectParticipation : projectParticipation,
        participationDetails : participationDetails
    }
	return service({url: '/projectParticipation/addProjectParticipation', method: 'post', data});
}

//项目分红列表
export function getParticipationList(projectId = undefined) {
	const data = {
		projectId
	}
	return service({url: '/projectParticipation/getParticipationList', method: 'post', data});
}

//获取项目分红详情
export function getParticipationDetail(id = undefined) {
	const data = {
        id
    }
	return service({url: '/projectParticipation/getParticipationDetails', method: 'post', data});
}

//编辑项目分红
export function editParticipation(projectParticipation = {}, participationDetails = []) {
	const data = {
        projectParticipation : projectParticipation,
        participationDetails : participationDetails
    }
	return service({url: '/projectParticipation/updateParticipation', method: 'post', data});
}

// 删除项目分红
export function delShare(id = undefined) {
	const data = {
		id 
	}
	return service({url: '/projectParticipation/deleteParticipation', method: 'post', data});
}

//获取项目退出详情
export function getExitDetail(projectId = undefined) {
	const data = {
        projectId
    }
	return service({url: '/projectExit/getProjectExitDetails', method: 'post', data});
}

//保存项目退出单
export function saveExit(projectExit = {}, projectExitList = []) {
	const data = {
        projectExit : projectExit,
        projectExitList : projectExitList
    }
	return service({url: '/projectExit/addProjectExit', method: 'post', data});
}

//文档标签页
export function getProjectDoc(projectId = undefined) {
	let merchantId = JSON.parse(sessionStorage.getItem('merchants'))[0].id; //商户id必传"
	let typeId = projectId;
	const data = {
		merchantId,
		typeId,
		type: 1
	}
	return service({url: '/dictionaryController/selectProjectOrFundDocument', method: 'post', data});
}

//删除文档
export function delDocument(id = undefined) {
	const data = {
		id 
	}
	return service({url: '/dictionaryController/deleteDocument', method: 'post', data});
}
