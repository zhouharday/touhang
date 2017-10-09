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
	console.log("getPres condition*/*/*/*" + JSON.stringify(data));
	return service({url: '/investProject/getInvestProjectList', method: 'post', data})
}

// 投前项目详情
export function getPreDetail(projectId = undefined) {
	const data = {
		id:projectId
	}
	return service({url: '/projectPool/selectProjectPool', method: 'post', data});
	//return service({url: '/projectInvestInfo/selectInvestInfo', method: 'post', data});
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
		projectId, // ": "dc3e4b66ed5944ec9fa10e83aa0c3301"//合同id
   		page, // ": 1,//分页
    	pageSize // ": 5
	}
	return service({url: '/projectContract/selectAllProjectContract', method: 'post', data});
}

// 添加项目合同
export function addContract(projectContract = {}, fundInfo = []) {
	let { projectId, contractName, signDate, contractAmount, stockRatio, handlerUserId, handlerDate, documentInfo } = projectContract;
	const data = {
	    projectContract: {
	    	projectId, // ": "dc3e4b66ed5944ec9fa10e83aa0c3301",
	        contractName, // ": "测试合同1",//合同名称
	        signDate, // ": "2017-08-27",//签订日期
	        contractAmount, // ": "25",//合同金额
	        stockRatio, // ": "0.45",//股权占比
	        handlerUserId, // ": "d878a28b510e4e2993ff40cef98de33d",//经办人ID当前登录用户ID
	        handlerDate, // ": "2017-09-01"//经办日期
	        documentInfo //文档地址
	        /*
	        ":[{
	        	"fileUrl":"https://123.sogou.com/",
	        	"fileName":"搜狗网址"
	        }] */
	 	},
	    fundInfo: fundInfo//基金列表
	    /*[{
	    	fundId, // ": "361e776103574723abab0a6df55b7eab",//基金id
	        investAmount, // ": "25456",投资金额
	        stockRatio // ": "0.45"//股权占比
	    }
	    ]*/
	}
	return service({url: '/projectContract/addProjectContract', method: 'post', data});
}

// 编辑项目合同
export function editContract(projectContract = {}, fundInfo = []) {
	let { projectId, contractName, signDate, contractAmount, stockRatio, handlerUserId, handlerDate, documentInfo } = projectContract;
	const data = {
	    projectContract: {
	    	projectId, // ": "dc3e4b66ed5944ec9fa10e83aa0c3301",
	        contractName, // ": "测试合同1",//合同名称
	        signDate, // ": "2017-08-27",//签订日期
	        contractAmount, // ": "25",//合同金额
	        stockRatio, // ": "0.45",//股权占比
	        handlerUserId, // ": "d878a28b510e4e2993ff40cef98de33d",//经办人ID当前登录用户ID
	        handlerDate, // ": "2017-09-01"//经办日期
	        documentInfo //文档地址
	        /*
	        ":[{
	        	"fileUrl":"https://123.sogou.com/",
	        	"fileName":"搜狗网址"
	        }] */
	 	},
	    fundInfo: fundInfo//基金列表
	    /*[{
	    	"id": "577c7528b96a406fa0ef5e32a44afc1f",//必传
            "contractId": "fff2ae16768b445f9c807a28804680d1", // 合同id
            "fundId": "e7f8e145920f4c91a7e559b61dee8ec7", // 基金id
	        investAmount, // ": "25456",投资金额
	        stockRatio // ": "0.45"//股权占比
	    }
	    ]*/
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
