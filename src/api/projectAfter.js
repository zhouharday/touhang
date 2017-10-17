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
	return service({url: '/bigIssuesclie/selectBigIssues', method: 'post', data});
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

//投后项目详情上面的出资主体
export function getInvestSubject(projectId = undefined) {
	const data = {
		projectId
	};
	return service({url: '/projectContract/investSubject', method: 'post', data});
}

//获取投后项目详情上面的小双提醒（预警）
export function getWarnMessageList(projectId = undefined) {
	const data = {
		projectId
	};
	return service({url: '/WarnRecords/selectWarnMessageList', method: 'post', data});
}

//获取投后项目的估值信息
export function getAppraisementRep(projectId = undefined) {
	const data = {
		projectId
	};
	return service({url: '/appraisement/appraisementDetails', method: 'post', data});
}

//监控设置-监控主体列表
export function getDataMonitorList(projectId = undefined) {
	const data = {
		projectId
	};
	return service({url: '/formLabel/queryDataMonitorByData', method: 'post', data});
}

//监控设置-监控主体详情及科目
export function getDataMonitorDetail(dataMonitorId = undefined) {
	const data = {
		dataMonitorId
	};
	return service({url: '/formLabel/queryDataMonitorByid', method: 'post', data});
}

//监控设置-监控开启关闭
export function updateDataMonitor(id = undefined, isOpen) {
	const data = {
		id,
		isOpen
	};
	return service({url: '/formLabel/updateDataMonitor', method: 'post', data});
}

//监控设置-数据源查询对应科目列表
export function getFormByType(formType = undefined) {
	const data = {
		merchantId : JSON.parse(sessionStorage.getItem('merchants'))[0].id,
		formType
	};
	return service({url: '/formLabel/findFormByType', method: 'post', data});
}

//监控设置-新增、编辑监控科目
export function saveDataMonitor(dataMonitor = {}, monitorInfos = []) {
	const data = {
		dataMonitor,
		monitorInfos
	};
	return service({url: '/formLabel/saveMonitorInFo', method: 'post', data});
}


//运营数据-运营数据科目列表
export function getOperateForm() {
	const data = {
		merchantId : JSON.parse(sessionStorage.getItem('merchants'))[0].id
	};
	return service({url: '/formLabel/queryOperateFrom', method: 'post', data});
}

//运营数据-新增、编辑运营数据科目
export function saveOperateForm(id = undefined, formId = undefined, fieldName = '') {
	const data = {
		formId,
		id,
		fieldName
	};
	return service({url: '/formLabel/editFrom', method: 'post', data});
}

//运营数据-删除运营表单标签
export function delFormLabel(formLabelId = undefined) {
	const data = {
		formLabelId
	};
	return service({url: '/formLabel/deletFromLabel', method: 'post', data});
}

//数据填报--excel导入三大表
export function importFinancialData(dataInfoid = undefined, file) {
	const data = {
		dataInfoid,
		file
	};
	return service({url: '/excel/financial', method: 'post', data});
}

//数据填报--查询填报数据主体
export function getDataSubjectList(projectId = undefined, dataType) {
	const data = {
		projectId,
		dataCat : dataType
	};
	return service({url: '/projectData/listObject', method: 'post', data});
}

//数据填报--数据填报主体添加
export function saveDataSubject(projectData = {}) {
// 	"projectId":"1255863654", //项目id
// "baseDate":"2013-14-15", //基准日
// "dataType":1, //1年报、2半年报、3季报、4月报
// "operator":"张三", //填报人id
// "currentDeta":"2013-14-15",// 填报日期
// "operatorName":"张三", //填报人姓名
// "dataCat":1 //0:经营数据;1:财务数据
	const data = {
		merchantId : JSON.parse(sessionStorage.getItem('merchants'))[0].id,
		projectData : projectData
	};
    console.log("添加数据表头 参数："+JSON.stringify(data));
	return service({url: '/projectData/saveObject', method: 'post', data});
}

//数据填报--数据填报主体编辑
export function updDataSubject(params = {}) {
// 	{
// "id":"e8d93b8781bd4f068ee17e5f5857969e", //id 必须
// "baseDate":"2013-14-15", //基准日
// "dataType":1, //1年报、2半年报、3季报、4月报
// "operator":"张三", //填报人id
// "currentDeta":"2013-14-15",// 填报日期
// "operatorName":"张三", //填报人姓名
// }
	let {id, baseDate, dataType, operator, currentDeta,operatorName } = params;
	const data = {
		id, baseDate, dataType, operator, currentDeta,operatorName
	};
	return service({url: '/projectData/updeat', method: 'post', data});
}

//数据填报--数据填报主体详情
export function getDataSubjectDetail(projectDataId = undefined) {
	const data = {
		projectDataId: projectDataId
	};
	return service({url: '/projectData/objectInfo', method: 'post', data});
}

//数据填报--数据填报表单查询
export function getDataFormBody(projectDataId = undefined) {
	const data = {
		projectDataId: projectDataId
	};
	return service({url: '/projectData/queryFormBody', method: 'post', data});
}

//数据填报--填充表单数据
export function fillDataForm(params = {}) {
	let {dataInfos } = params;
	const data = {
		dataInfos: dataInfos
	};
	return service({url: '/projectData/fillDataForm', method: 'post', data});
}

//项目估值 - 添加或者修改项目估值
export function updAppraisement(params = {}) {
	let { id, projectId, appraisementValue, appraisementParamer } = params;
	const data = {
		id: id,
		projectId: projectId,
		appraisementValue: appraisementValue,
		appraisementParamer: appraisementParamer,
		appraisementUserId: JSON.parse(sessionStorage.getItem('userInfor')).id,
		appraisementStatus: '1',
	};
	return service({url: '/appraisement/updaAppraisement', method: 'post', data});
}

//项目估值 - 项目估值列表查询
export function getAppraisementList(params = {}) {
	let {projectName, appraisementStatus, page, pageSize } = params;
	const data = {
		projectName,
		appraisementStatus,
		page,
		pageSize
	};
	return service({url: '/appraisement/likeSelectAppraisementPage', method: 'post', data});
}

// let userId = JSON.parse(sessionStorage.getItem('userInfor')).id; //当前登录用户id
// let merchantId = JSON.parse(sessionStorage.getItem('merchants'))[0].id; //当前商户id



export function transform(data = []){
            let _data = [];
            _data = data;
            var newData = new Array();
            for(var i = 0; i < _data.length - 1; i++){
                //当前元素 行列
                let item = _data[i];
                let colNo = item.location.charAt(item.location.length - 1); //1或者2
                let rowNo = item.location.substring(0,item.location.indexOf('-')); //1或者2
                //下个元素 行列
                let nextItem = _data[i + 1];
                let nextRowNo = nextItem.location.substring(0,nextItem.location.indexOf('-'));
                let nextcolNo = nextItem.location.charAt(nextItem.location.length - 1);

                // console.log("行号"+rowNo);
                // console.log("下行号"+nextRowNo);
                //当前元素在左
                if(colNo == '1'){
                    let newItem = item;

                    //判断下个元素是否在本行
                    if(rowNo == nextRowNo){
                        //合并下个元素到本行
                        newItem._id = nextItem.id;
                        newItem._field_name = nextItem.field_name;
                        newItem._location = nextItem.location;
                        newItem._simple_value = nextItem.simple_value;
                        newItem._complex_value = nextItem.complex_value;
                        newItem._value1 = nextItem.value1;
                        newItem._value2 = nextItem.value2;

                        newData.push(newItem);
                        i++;
                    }else{
                        //下个元素不在本行，填充空元素到本行
                        newItem._id = '';
                        newItem._field_name = '';
                        newItem._location = '';
                        newItem._simple_value = '';
                        newItem._complex_value = '';
                        newItem._value1 = '';
                        newItem._value2 = '';
                        
                        newData.push(newItem);
                        continue;
                    }
                }else {
                //当前元素在右
                    let newItem = {};
                    newItem.id = '';
                    newItem.field_name = '';
                    newItem.location = '';
                    newItem.simple_value = '';
                    newItem.complex_value = '';
                    newItem.value1 = '';
                    newItem.value2 = '';

                    newItem._id = item.id;
                    newItem._field_name = item.field_name;
                    newItem._location = item.location;
                    newItem._simple_value = item.simple_value;
                    newItem._complex_value = item.complex_value;
                    newItem._value1 = item.value1;
                    newItem._value2 = item.value2;

                    newData.push(newItem);
                }
            }

            // console.log("转换结果："+JSON.stringify(newData));

            return newData;
}