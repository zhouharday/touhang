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
    var nodes = [];
    arr.map(function (node) {
        if (node.pId === 0) {
            nodes.push(node)
        } else {
            pushNode(node,nodes)
        }
    })
    return nodes
}

function pushNode(node, pNodes) {
    pNodes.map(function (pNode) {
        if (pNode.id === node.pId) {
            if (!pNode.children) {
                pNode.children = [node]
            } else {
                pNode.children.push(node)
            }
        } else {
            if (pNode.children) {
                pushNode(node, pNode.children)
            }
        }
    })
}
