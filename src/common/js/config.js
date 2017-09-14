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
// 待测试
export function clearValue(obj) {
    Object.keys(obj).forEach((val, array) => {
        obj[val] = ''
    })
}

export function getNodes(arr) {
    // console.log(arr);
    var nodes = [];
    arr.map(function (node) {
        if (node.parentId === '0') {
            nodes.push(node)
        } else {
            pushNode(node,nodes)
        }
    })
    // console.log(nodes);
    return nodes
}

 function pushNode(node, pNodes) {
    //  alert(111);
     let charlds = [];
    pNodes.map(function (pNode) {
        // console.log(pNode.children);
        if (pNode.id == node.parentId) {
            // console.log('*****:'+ pNode.children);
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
                pushNode(node, pNode.children)
            }
        }
    })
}


