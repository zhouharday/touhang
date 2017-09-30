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

// 修改部门
export function SetDepartment(name,id,bumenId) {
    const data = {
        "id":bumenId,
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
        "parentId":id,
        "deptName":name,
    }

    return service({url: '/sysDept/save', method: 'post', data})
}

//增加可编辑字段
export function addEdit(arr) {
    arr.forEach(function (item , index) {
        item.editFlag = false
    })
    return arr
}

/*******************************用户管理******************************************/
//部门列表同上公用
//查询部门人员
export function getUserlist(id,lockValue,userName) {
    const data = {
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
        "dept_id":id,
        "lockValue":lockValue,
        "userName":userName
    }

    return service({url: '/user/queryUserList', method: 'post', data})

}
//客户锁定启用
export function openOrClose(id,disables) {
    const data = {
        "dept_id":id,
        "disables":0 //0:禁用,1正常 必须
    }

    return service({url: '/merchant/enableOrLock', method: 'post', data})

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

/*******************************业务配置******************************************/
//左侧列表
export  function getConfigLeftList() {
    const data = {
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
    }
    return service({url: '/dictionaryController/slectAllStage', method: 'post', data})
}

//数据更改
export function reloadData(arr) {
    arr.forEach(function (item,index) {
        var NewArr = item.data
        item.showOne = false
        NewArr.forEach(function (NewItem) {
            NewItem.editFlag = false
        })
    })
    return arr
}
//修改配置
export function SetConfig(arr,deleteArr) {

    const data = {
        // "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
        "stage":arr,
        "deleteStage":deleteArr
    }
    if (arr[0].stageType == 3){
        return service({url: '/dictionaryController/addInvestorDocumentCatalog', method: 'post', data})
    }else
        return service({url: '/dictionaryController/addStageAllocation', method: 'post', data})
}


//刷新右侧文档列表
export function GetrightList(id) {

    const data = {
        // "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
        "id":id
    }
    return service({url: '/dictionaryController/selectStageDocument', method: 'post', data})
}
//右侧文档列表数据更改
export function RightListData(arr) {
    arr.forEach(function (NewItem) {
        NewItem.editFlag = false
    })
    return arr
}
//右侧列表数据更改
export function changeRightList(id,row) {

    if (row.id){
        const data = {
            // "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
            "allocationId":id,
            "documentName":row.documentName,
            "needUpload":row.needUpload,
            "id":row.id
        }
        console.log(data)
        return service({url: '/dictionaryController/addStageDocument', method: 'post', data})
    }else {
        const data = {
            // "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
            "allocationId":id,
            "documentName":row.documentName,
            "needUpload":row.needUpload

        }
        console.log(data)
        return service({url: '/dictionaryController/addStageDocument', method: 'post', data})
    }


}
//右侧列表数据删除
export function DeleteRightList(row) {
    const data = {
        "id":row.id,
        "allocationId":row.allocationId
    }
    console.log(data)
    return service({url: '/dictionaryController/deleteStageDocument', method: 'post', data})
}


/*******************************企业权限******************************************/
//角色列表
export  function getRoleList() {
    const data = {
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
    }
    return service({url: '/role/queryRole', method: 'post', data})
}
//角色删除
export function deleteUser(id) {
    //
    const data = {
        "roleId": id,
    }
    return service({url:'/role/deleteRole', method: 'post', data})
}
//角色修改
export function updataRole(row) {
    const data = {

        "roleName": row.roleName,
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
        "id": row.id

    }
    return service({url:'/role/updateRole', method: 'post', data})
}
// 添加角色
export function saveRole(roleName) {
    const data = {

        "roleName": roleName,
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,

    }
    return service({url:'/role/saveRole', method: 'post', data})
}

// 角色权限查询
export function getUserRole(id) {
    //
    const data = {
        "r_id": id,
    }
    return service({url:'role/findResourceByRid', method: 'post', data})
}

//角色对应的所有用户
export  function getRightUserList(id) {
    const data = {
        "roleId": id,
    }
    return service({url:'/user/queryUserByRole', method: 'post', data})
}

//角色绑定用户 ----删除
export  function deleteUserRole(roleId,userxxId) {

    const data = {
        "userMerchantId":userxxId,
        "roleId": roleId,
    }
    return service({url:'/role/deleteUserRole', method: 'post', data})

}

//查询不在本角色内的人员列表
export function queryNotUserByRole(roleId,deptId,userName) {

    const data = {
        "roleId":roleId,   //角色id
        "mid":JSON.parse(sessionStorage.getItem('merchants'))[0].id,
        "userName":userName, //用户名或者账号
        "deptId":deptId //部门id
    }
    console.log(data)
    return service({url:'/user/queryNotUserByRole', method: 'post', data})
}

//批量添加用户给角色
export function roleJoinUser(roleId,umIds) {

    const data = {
        "roleId":roleId,   //角色id
        "umIds":umIds
    }
    console.log(data)
    return service({url:'/role/roleJoinUser', method: 'post', data})
}


//企业所有权限
export function getUserAllRole(id) {

    const data = {
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
    }
    return service({url:'/user/findResourceByMid', method: 'post', data})
}

// 权限树转换
export function getNodes(arrData,roleInfo) {
    var nodes = [];
    var arr = arrData
    var i = 0;
    var j = 0;
    var x = 0;
    var idArr ;
    for ( x in arr){
        arr[x].choose = '0'
    }

    for (j in arr) {
        for (i in roleInfo)
        {
            if (roleInfo[i].parentId == arr[j].id)
            {
                idArr=roleInfo[i].path.split("|");
                var idArrL = 0;
                arr.forEach(function (item , index) {
                    for (idArrL in idArr)
                    {
                        if (item.id == idArr[idArrL]) {
                            item.choose = '1'
                        }
                    }
                },this)
            }
        }
    }

    arr.map(function (node) {
        if (node.parentId === '0') {
            node.label = node.deptName
            nodes.push(node)
        } else {
            pushNode(node,nodes)
        }

    })

    // console.log(nodes)

    return nodes
}

function pushNode(node, pNodes) {
    let charlds = [];
    pNodes.map(function (pNode) {
        if (pNode.id == node.parentId) {
            if (!pNode.children) {

                if(node.type == 1)
                {
                    if (!pNode.menuContentClick) {
                        pNode.menuContentClick = []
                    }
                    if (node.choose == 1) {

                        pNode.menuContentClick.push(node.path);
                    }
                    if (!pNode.menuContent) {
                        pNode.menuContent = []
                        pNode.menuContentName = []
                    }
                    pNode.menuContent.push(node);
                    pNode.menuContentName.push(node.path);
                }else{
                    pNode.children = [node];
                }
            } else {
                pNode.children.push(node);
            }
        } else {
            if (pNode.children) {
                node.label = node.deptName
                pushNode(node, pNode.children)
            }
        }
        node.label = node.deptName
    })
}

export function getUpdata(arr) {
    var updata = [];
    arr.forEach(function (item) {
        // console.log(item.children)
        if (item.children){
            item.children.forEach(function (target) {
                if (target.menuContentClick){
                target.menuContentClick.forEach(function (data) {
                    var ss = data.split("|");
                    updata = updata.concat(ss)
                })
                }
            })
        }
    })

    //祛空
    for(var i = 0;i<updata.length;i++){
        if(updata[i]==''||updata[i]==null||typeof(updata[i])==undefined){
            updata.splice(i,1);
            i=i-1;
        }
    }
    updata = unique(updata)
    updata.shift()

    var updataString
    updataString = updata.join(',')
    return updataString
}

//去除重复元素
function unique(arr){
// 遍历arr，把元素分别放入tmp数组(不存在才放)
    var tmp = new Array();
    for(var i in arr){
//该元素在tmp内部不存在才允许追加
        if(tmp.indexOf(arr[i])==-1){
            tmp.push(arr[i]);
        }
    }
    return tmp;
}


//权限更改

export function authorization(roleId,menuIds) {
    const data = {
        "roleId": roleId,
        "menuIds":menuIds,
        "mid": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
    }
    console.log(data)
    return service({url:'role/authorization', method: 'post', data})

}


/*******************************项目权限******************************************/
// 查询项目、基金角色
export function queryList(type) {
    const data = {
        "roleType":type,
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
    }
    return service({url:'/projectRole/queryList', method: 'post', data})
}

//增加参数editFlag
export function reloadQueryData(arr) {
    arr.forEach(function (item)  {
        item.editFlag = false
    })
    return arr
}

//编辑项目、基金角色
export function projectRoleEdit(id,roleName) {
    const data = {
        "id":id, //角色id  必须
        "roleName":roleName
    }
    console.log(data)
    return service({url:'/projectRole/edit', method: 'post', data})
}

// 新增项目、基金角色
export function projectRoleSave(type,roleName) {
    const data = {
        "roleName":roleName, // 角色名称 必须
        "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id,
        "roleType":type  //角色类型（0:项目;1:基金） 必须
    }
    console.log(data)
    return service({url:'projectRole/save', method: 'post', data})
}

//基金、项目角色对应权限
export function permissionlistByRoleId(id) {

    const data = {
        "roleId":id
    }
    return service({url:'/permission/listByRoleId', method: 'post', data})

}


/*************************************************************************************}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}*/
// 查询项目、基金所有权限
export function permissionqueryList(type) {
    const data = {
        // "merchantId":JSON.parse(sessionStorage.getItem('merchants'))[0].id,
        "merchantId":"68cb50ae78af4821bcccacfa94c8bf0e",
        "permissionType":type
    }
    return service({url:'/permission/queryList', method: 'post', data})

}
//解析元素
export function getUpdataFund(arr,RoleArr) {
    var updata = [];
    arr.forEach(function (data) {
        var ss = data.split("|");
        updata = updata.concat(ss)
    })


    //祛空
    for(var i = 0;i<updata.length;i++){
        if(updata[i]==''||updata[i]==null||typeof(updata[i])==undefined){
            updata.splice(i,1);
            i=i-1;
        }
    }
    updata = unique(updata)
    updata.shift()
    var Arr = []
    var x;
    console.log(RoleArr)
    RoleArr.forEach(function (item) {

        for ( x in updata){
            console.log(item.falseId +'***'+updata[x])
            if (updata[x] == item.falseId){
                Arr.push(item.id)
                console.log(1)
            }
        }
    })


    var updataString
    updataString = Arr.join(',')

    return updataString
}

//角色绑定权限
export function roleBindPermission(roleId,permissionIds) {
    const data = {
        "roleId":roleId, //角色id 必须
        "permissionIds":permissionIds
    }
    console.log(data)
    return service({url:'/projectRole/roleBindPermission', method: 'post', data})
}


/*******************************基金权限******************************************/
