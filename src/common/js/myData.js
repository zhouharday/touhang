export const myData = [{
        id: 1,
        menuName: '日常办公',
        pId: 0,
        children: [{
            id: 11,
            pId: 1,
            menuName: '审批',
            menuContent: [{
                label: 'button',
                details: ['浏览', '发起', '添加', '删除'],
            }],
            children: [{
                id: 888,
                pId: 666,
                menuName: 'ssss'
            }]
        }, {
            id: 12,
            pId: 1,
            menuName: '任务',
            checkedCities: [],
            menuContent: [{
                label: 'checkbox',
                checkedList: [
                    '浏览', '删除'
                ],
                details: [
                    '浏览',
                    '发起',
                    '审批',
                    '编辑',
                    '添加',
                    '删除'
                ]
            }]
        }, {
            id: 13,
            pId: 1,
            menuName: '权限管理',
            menuContent: [{
                label: 'button',
                details: [
                    '浏览',
                    '发起',
                    '审批',
                    '编辑',
                    '添加',
                    '删除'
                ]
            }]
        }]
    },
    {
        id: 2,
        menuName: '项目管理',
        pId: 0,
        children: [{
            id: 21,
            pId: 2,
            menuName: '项目池',
            menuContent: [{
                label: 'checkbox',
                checkedList: [
                    '全选', '删除'
                ],
                details: ['全选', '添加', '浏览', '编辑', '删除']
            }]
        }, {
            id: 22,
            pId: 2,
            menuName: '投前项目',
            menuContent: [{
                label: 'checkbox',
                detailsTitle: '项目:',
                checkedList: [
                    '全选', '删除'
                ],
                details: ['全选', '添加', '浏览', '编辑', '删除']
            }, {
                label: 'checkbox',
                detailsTitle: '项目团队:',
                checkedList: [
                    '全选'
                ],
                details: ['全选', '添加', '编辑', '删除']
            }]
        }, {
            id: 23,
            pId: 2,
            menuName: '投后项目',
            menuContent: [{
                label: 'checkbox',
                checkedList: [
                    '全选', '删除'
                ],
                details: ['全选', '添加', '浏览', '编辑', '删除']
            }]

        }, {
            id: 24,
            pId: 2,
            menuName: '退出项目',

            menuContent: [{
                label: 'checkbox',
                checkedList: [
                    '全选', '删除'
                ],
                details: ['全选', '添加', '浏览', '编辑', '删除']
            }]

        }, {
            id: 25,
            pId: 2,
            menuName: '项目估值',

            menuContent: [{
                label: 'checkbox',
                checkedList: [
                    '全选', '删除'
                ],
                details: ['全选', '添加', '浏览', '编辑', '删除']
            }]

        }, {
            id: 26,
            pId: 2,
            menuName: '估值查看',
            menuContent: [{
                label: 'checkbox',
                checkedList: [
                    '全选', '删除'
                ],
                details: ['全选', '添加', '浏览', '编辑', '删除']
            }]

        }]
    }, {
        'id': '3',
        'menuName': '订单管理',
        'menuCode': '30',
        'children': [{
            'menuName': '订单列表',
            'menuCode': '31'
        }, {
            'menuName': '退货列表',
            'menuCode': '32',
            'children': []
        }]
    }, {
        'id': '4',
        'menuName': '商家管理',
        'menuCode': '',
        'children': []
    }
]
