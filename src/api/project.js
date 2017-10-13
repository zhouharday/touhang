import service from 'common/js/fetch'

// 获取项目估值列表
export function getProjectValuation(params) {
	let { projectName, page, pageSize } = params;
    const data = {
        projectName: projectName,
        page,
		pageSize
    }
    return service({url: '/appraisement/likeAppraisement', method: 'post', data})
}

// 根据状态估值查询
export function getProjectBySelect(params) {
	let { appraisementStatus, page, pageSize } = params;
	const data = {
        appraisementStatus,	// 1:已提交2：未提交 （为null时查询提交及提交的s所有）
        page,
        pageSize
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

// 项目池列表
export function getPros(params = {}) {
	let { projectName, projectType, industryId, merchantId, page, pageSize } = params;
	const data = {
		projectName, // 项目名关键字:"讲",
		projectType, // 状态ID(1：正常 2：观察 3中止 4：淘汰)"1",
		industryId,  // 数据字典中行业ID:"14","
		merchantId,   // 商业ID（必传）:"123456"
		page,
		pageSize
	}
	return service({url: '/projectPool/searchProject', method: 'post', data})
}

// 项目池详情
export function getProDetail(id) {
	const data = {
		id
	}
	return service({url: '/projectPool/selectProjectPool', method: 'post', data});
}

// 项目池添加项目
export function addPro(params = {}) {
	let { basicForm, companyForm } = params;

	let addProjectUserId = JSON.parse(sessionStorage.getItem('userInfor')).id;	//当前登录用户id
    let merchantId = JSON.parse(sessionStorage.getItem('merchants'))[0].id;	//商户id必传"
	let projectName = basicForm.projectName; //项目名
    let projectShortName = basicForm.projectShortName; //项目简称
    let addressId = basicForm.addressId; //项目所在地
    let createPersonId = addProjectUserId; //项目创建人
    let projectTypeId = basicForm.projectTypeId; //项目类型ID
    let industryId = basicForm.industryId; //行业ID
    let projectFromId = basicForm.projectFromId; //项目来源
    let departmentId = basicForm.departmentId; //业务部门ID
    let projectLogo = basicForm.projectLogo

    let	enterpriseName = companyForm.enterpriseName;		//企业名称
    let	legalPerson = companyForm.enterpriseName;			//法人
    let	registeredCapital = companyForm.registeredCapital;	//注册资本
    let	paiclCapital = companyForm.paiclCapital;			//实收资本
    let	registerDate = companyForm.registerDate;			//注册登记时间
    let	creditCode = companyForm.creditCode;				//统一信用代码
    let	registerAddress = companyForm.registerAddress;		//注册地址
    let	workAddress = companyForm.workAddress;				//办公地址
    let	mainBusiness = companyForm.mainBusiness;			//主营业务
    let	remark = companyForm.remark;						//备注

	let projectInfo = { 
		merchantId,
		projectName, //项目名: "2",
        projectShortName, //项目简称: "3",
        addressId, //项目所在地: "321",
        createPersonId, //项目创建人: "ooo",
        projectTypeId, //项目类型ID: null,
        industryId, //行业ID: null,
        projectFromId, //项目来源: null,
        departmentId, //业务部门ID: null
        projectLogo
    } 
    console.log("projectInfo-------->" + JSON.stringify(projectInfo));

    let enterpriseInfo = {
        enterpriseName,		//企业名称
        legalPerson,			//法人
        registeredCapital,	//注册资本
        paiclCapital,			//实收资本
        registerDate,			//注册登记时间
        creditCode,				//统一信用代码
        registerAddress,		//注册地址
        workAddress,				//办公地址
        mainBusiness,			//主营业务
        remark						//备注
    }
    console.log("enterpriseInfo-------->" + JSON.stringify(enterpriseInfo));
	
	const data = {
		projectInfo,
		enterpriseInfo
	}
	return service({url: '/projectPool/addProjectPool', method: 'post', data})
}

// 删除项目
export function delPro(id, projectType) {
	const data = {
		id,
		projectType
	} 
	return service({url: '/projectPool/deleteProject', method: 'post', data});
}

// 转投资
export function transPro(projectId) {
	let addProjectUserId = JSON.parse(sessionStorage.getItem('userInfor')).id;	//当前登录用户id
    let merchantId = JSON.parse(sessionStorage.getItem('merchants'))[0].id;	//商户id必传"
	const data = {
		merchantId,
		projectId,
		addProjectUserId
	};
	return service({url: '/investProject/addInvestProject', method: 'post', data});
}

//修改项目状态
//项目id 必传
//1：正常 2：观察 3中止 4：淘汰
export function setProjectStatus(projectId, projectType){
	let id = projectId;
	const data = {
		id,
		projectType
	};
	return service({url: '/projectPool/setProjectStatus', method: 'post', data});
}

// 提交企业信息
export function changeEnterpriseInfo(params = {}) {
	let { id, projectId, enterpriseName, legalPerson, registeredCapital, paiclCapital, registerDate, creditCode, registerAddress, workAddress, mainBusiness, remark } = params;
    const data = {
        id,  //123
        projectId, //基本信息ID: "1"
        enterpriseName, //企业名称: "5555"
        legalPerson,   //法人: "CESHI"
        registeredCapital,  //注册资本: null
        paiclCapital,  //实收资本: null
        registerDate,  //注册登记时间 : null
        creditCode,  //统一信用代码: null
        registerAddress, //注册地址: null
        workAddress,   //办公地址: null
        mainBusiness,  //主营业务: null
        remark  //备注: null
    }
    return service({url: '/projectPool/updateEnterpriseInfo', method: 'post', data})
}

// 提交项目基本信息
export function changeProjectInfo(params = {}) {
	let { id, projectName, projectShortName, addressId, projectTypeId, industryId, statusId, projectFromId, departmentId, projectLeaderId, merchantId } = params;
    const data = {
       id, //必传:0875d8a18eb34f599ff3bdb7fbba3cf8
       projectName,//项目名: "2"
       projectShortName, //项目简称: "3"
       addressId, //项目所在地: "321"
       projectTypeId, //项目类型ID: null
       industryId, //行业ID: null
       statusId, //项目状态ID: null
       projectFromId, //项目来源: null
       departmentId, //业务部门ID: null
       projectLeaderId,  //项目负责人id : null
       merchantId //商户ID : null
    }
    return service({url: '/projectPool/updateProjectInfo', method: 'post', data})
}


////// 项目池记录 ////
// 获取记录列表
export function getRecords(projectId, recordStatus) {
	const data = {
		projectId,   //项目ID
		recordStatus,  // 记录状态：1：正常 2：删除
	}
	return service({url: '/operatingRecord/selectOperatingRecord', method: 'post', data});
}

// 添加记录
export function addRecord(params = {}) {
	let { projectId, merchantId, seedUserId, seedInfo, recordType } = params;
	const data = {
		projectId,   //项目ID
		seedUserId,  //用户ID
		seedInfo,    //  提交记录内容
		merchantId,  // 商户ID
		recordType     //记录类型
	}
	console.log('addRecord: ', data);
	return service({url: '/operatingRecord/addOperatingRecord', method: 'post', data});
}

// 删除记录
export function delRecord(id = undefined, recordStatus = undefined) {
	const data = {
		id,   //项目ID
		recordStatus,  // 记录状态：1：正常 2：删除
	}
	return service({url: '/operatingRecord/deleteOperatingRecord', method: 'post', data});
}

//根据商户ID获取部门列表
export function getDeptListByMid() {
	let merchantId = JSON.parse(sessionStorage.getItem('merchants'))[0].id; //商户id必传"
	const data = {
		merchantId   //商户ID
	}
	return service({url: '/sysDept/queryList', method: 'post', data});
}