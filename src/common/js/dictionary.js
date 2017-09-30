import service from './fetch'
export const dictionaryList = [
    {
        id: 0,
        menuName: '项目管理',
        children: [
            {
                id: 11,
                pId: 0,
                menuName: '项目状态',
                tableInfo: [{
                    name: '飞鸟',
                    remarks: '安红,俺想你！',
                    operation: ['下移', '编辑', '删除']
                }, {
                    name: '飞鸟',
                    remarks: '安红,俺想你！',
                    operation: ['下移', '编辑', '删除', '预览']
                }]
            }, {
                id: 12,
                pId: 0,
                menuName: '项目类型',
                tableInfo: [{
                    name: '鸟飞',
                    remarks: '安红,俺想你！',
                    operation: ['下移', '编辑', '删除']
                }, {
                    name: '飞鸟',
                    remarks: '安红,俺想你！',
                    operation: ['下移', '编辑', '删除', '预览']
                }]
            }, {
                menuName: '项目阶段',
                tableInfo: [{
                    name: '考察储备',
                    remarks: '',
                    operation: ['下移', '编辑', '删除']
                }, {
                    name: '立项会',
                    remarks: '',
                    operation: ['下移']
                }, {
                    name: ' 尽职调查',
                    remarks: '',
                    operation: ['下移', '编辑', '删除']
                }, {
                    name: '投决会',
                    remarks: '',
                    operation: ['下移']
                }, {
                    name: '管理',
                    remarks: '',
                    operation: ['下移', '编辑', '删除']
                }, {
                    name: '项目退出',
                    remarks: '',
                    operation: ['下移']
                }]
            }, {
                menuName: '项目文档类型'
            }, {
                menuName: '回款/退出类型'
            }, {
                menuName: '项目角色'
            }, {
                menuName: '项目来源'
            }, {
                menuName: '所属行业'
            }, {
                menuName: '重大事项'
            }, {
                menuName: '经营数据'
            }, {
                menuName: '币种'
            }, {
                menuName: '项目费用类型'
            }, {
                menuName: '融资轮次'
            }
        ]
    }, {
        id: 1,
        menuName: '基金管理',
        children: [
            {
                menuName: '组织类型'
            }, {
                menuName: '管理类型'
            }, {
                menuName: '基金投向'
            }, {
                menuName: '基金状态'
            }, {
                menuName: '基金角色'
            }, {
                menuName: '管理公司'
            }, {
                menuName: '合作机构类型'
            }, {
                menuName: '基金文档类型'
            }
        ]
    }, {
        id: 2,
        menuName: '投资者管理',
        children: [{
            menuName: '证件类型'
        }, {
            menuName: '机构证件类型'
        }, {
            menuName: '投资者文档目录'
        }, {
            menuName: '投资者文档类型'
        }]
    }, {
        id: 3,
        menuName: '系统管理',
        children: [{
            menuName: '区域'
        }, {
            menuName: '付款方式'
        }, {
            menuName: '知识库目录'
        }]
    }
]

// 获取数据字典一级子项 By CJ 2017-9-29 10:42:50
export function getDicChildren(Pid) {
    console.log("查询父ID为：" + Pid + " 的数据字典项");
    const data = {
        dicParent: Pid
    }
    return service({url: '/dictionaryController/select2Menu', method: 'post', data})
}
// 获取数据字典一级子项 By CJ 2017-9-30 14:47:26
export function getDicChildrenII(Pid) {
    console.log("查询父ID为：" + Pid + " 的数据字典项 **含全部");
    const data = {
        dicParent: Pid,
        identification: 'identification'
    }
    return service({url: '/dictionaryController/select2Menu', method: 'post', data})
}