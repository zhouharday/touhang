export function changeDate(_date) {
    var value = new Date(_date);
    var year = value.getFullYear()
    var month = value.getMonth() + 1
    var day = value.getDate()
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    return [year, month, day].join('-')
}

export function getDate(value) { //时间戳转换标准时间
    var tt = new Date(value).toLocaleString().replace(/\//g, "-");
    return tt;
}

export function trimStr(str) { //去空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

export function getSysDate() { //封装获取当前系统时间的方法
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();
    return currentdate;
}

export function getNodes(arr) {
    // console.log(arr);
    var nodes = [];
    arr.map(function (node) {
        if (node.parentId === '0') {
            node.label = node.deptName
            nodes.push(node)
        } else {
            pushNode(node, nodes)
        }

    })

    return nodes
}

function pushNode(node, pNodes) {
    let charlds = [];
    pNodes.map(function (pNode) {
        if (pNode.id == node.parentId) {

            if (!pNode.children) {
                // console.log('//////'+pNode);
                // alert(111)
                pNode.children = [node];
            } else {
                // alert(222)
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
// 根据键值排序  arr.sort(compare('appraisementDate'))
export function compare(prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop]
        var val2 = obj2[prop]
        if (val1 < val2) {
            return -1
        } else if (val1 > val2) {
            return 1
        } else {
            return 0
        }
    }
}

export function filtersPermissionCode_project(permissionCode) { //check 项目权限
    if (sessionStorage.getItem('permissionCode_project') == null) {
        return console.log('无权限');
    };
    let haveBtn = sessionStorage.getItem('permissionCode_project').includes(permissionCode);
    if (haveBtn) {
        return true;
    }
    return false;
}

export function filtersPermissionCode_fund(permissionCode) { //check 基金权限
    if (sessionStorage.getItem('permissionCode_fund') == null) {
        return console.log('无权限');
    };
    let haveBtn = sessionStorage.getItem('permissionCode_fund').includes(permissionCode);
    if (haveBtn) {
        return true;
    }
    return false;
}

export function checkProjectAuth(code, authList = []) {
    if (authList.length == 0) {
        console.log("项目权限为空, CODE: " + code + '无权限');
        return false;
    }
    let result = authList.includes(code);
    if (!result) {
        console.log("CODE: " + code + '无权限')
    };
    return result;
}

export function checkFundAuth(code) {
    // setTimeout(()=> {
        // console.log('333');
        if (sessionStorage.getItem('permissionCode_fund') == null) {
            console.log("基金权限为空, CODE: " + code + '无权限');
            return false;
        }
        let result = sessionStorage.getItem('permissionCode_fund').includes(code);
        if (!result) console.log("CODE: " + code + '无权限');
        return result;
    // });
}

export function toThousands(num) { //js千分位 num为整型类型
    //整型转字符串
    var number = new Number(num);
    var str = number.toString();
    //正则匹配
    var newstr = str.replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
        return s + ','
    })
    return newstr;
}

export function formatNum(str) {
    var newStr = "";
    var count = 0;
    if (str.indexOf(".") == -1) {
        for (var i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr + ".00"; //自动补小数点后两位
        console.log(str)
        return str;
    } else {
        for (var i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr; //碰到3的倍数则加上“,”号
            } else {
                newStr = str.charAt(i) + newStr; //逐个字符相接起来
            }
            count++;
        }
        str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
        console.log(str);
        return str;
    }
}
