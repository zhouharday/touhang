import service from 'common/js/fetch'

/*******************************部门管理******************************************/

// 部门列表
export function getDepartmentList() {
    const data = {
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
    }
    return service({url: '/sysDept/queryList', method: 'post', data})
}

//新增部门
export function addNewDepartment(name,id) {
    const data = {
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
        "parentId":id,
        "deptName":name,
    }

    return service({url: '/sysDept/save', method: 'post', data})
}

//删除部门
export function deletDepartment(id) {
    const data = {
        "deptId": id
    }

    return service({url: '/sysDept/deleteObj', method: 'post', data})
}

/*******************************用户管理******************************************/
//部门列表同上公用
//查询部门人员
export function getUserlist(id) {
    const data = {
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
        "dept_id":id,
    }

    return service({url: '/user/queryUserList', method: 'post', data})

}

/*******************************数据字典******************************************/
//获取数据字典
export  function getDictionary(identification) {
    const data = {
        dicKey : "BASE-GL",
        "identification":identification
    }
    return service({url: '/dictionaryController/selectMenu', method: 'post', data})

}

//公用索引
export  function getSelectIndex(id,type) {
    const data = {
        "id" : id,
        "identification":type
    }
    return service({url: 'appDictionary/selectIndex', method: 'post', data})
}

/*******************************企业权限******************************************/
//角色列表
export  function getRoleList() {
    const data = {
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
    }
    return service({url: '/role/queryRole', method: 'post', data})
}





