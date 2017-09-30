export function changeDate(value) {
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

// 待测试
export function clearValue(obj) {
    Object.keys(obj).forEach((val, array) => {
        obj[val] = ''
    })
}

export function getNodes(arr) {
    // console.log(arr);
    var nodes = [];
    arr.map(function(node) {
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
    pNodes.map(function(pNode) {
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
    return function(obj1, obj2) {
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
