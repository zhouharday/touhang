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
// 角色权限查询

export function getUserRole(id) {
    //
    const data = {
        "r_id": id,
    }
    return service({url:'role/findResourceByRid', method: 'post', data})
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
    for (j in arr) {

        arr[j].choose = ''
        var idArr ;
        for (i in roleInfo)
        {
            // console.log(898989)
            // console.log( roleInfo[i])
            if (roleInfo[i].parentId == arr[j].id)
            {



                idArr=roleInfo[i].path.split("|");
                console.log(idArr)
                var chooseId = 0;
                var idArrL = 0;

                arr.forEach(function (item , index) {
                    for (idArrL in idArr)
                    {

                        if (item.id == idArr[idArrL]){
                            item.choose = '1'
                            // if (item.id == "95b67546c45549c59e4bb378658f9559")
                            // {
                            //     console.log("###########")
                            //
                            // }
                            console.log(item.id +'******' + item.choose)
                            console.log(item)

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
                    if (!pNode.menuContent)
                    {
                        pNode.menuContent = []
                    }
                    pNode.menuContent.push ( node);
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




/*******************************项目权限******************************************/




/*******************************基金权限******************************************/
