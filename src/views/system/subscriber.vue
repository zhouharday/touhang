<template>
<div class="subscriber">
    <el-row :gutter="20">
        <!-- 树形控件 -->
        <el-col :span="4">
            <el-tree :data="structure" :props="defaultProps" accordion :default-expand-all="true" class="tree" @node-click="handleNodeClick">
            </el-tree>
        </el-col>
        <!-- table页面 -->
        <el-col :span="20">
            <div class="title">
                <div class="filter">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item>
                            <el-input placeholder="请输入搜索内容" icon="search" v-model="input2" :on-icon-click="handleIconClick">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <!-- 样式待定 -->
                            <!-- <el-dropdown split-button type="primary" @click="handleClick">
                                更多菜单
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>黄金糕</el-dropdown-item>
                                    <el-dropdown-item>狮子头</el-dropdown-item>
                                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                    <el-dropdown-item>双皮奶</el-dropdown-item>
                                    <el-dropdown-item>蚵仔煎</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown> -->
                            <el-select v-model="value" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="btn">
                    <el-button @click="showSubscriber">添加</el-button>
                </div>
            </div>
            <el-table :data="subscriberData" border style="width: 100%">
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="account" label="账号" width="180">
                </el-table-column>
                <el-table-column prop="department" label="部门" width="180">
                </el-table-column>
                <el-table-column prop="role" label="所属角色" width="180">
                </el-table-column>
                <el-table-column prop="state" label="状态" width="180">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button
                          @click.native.prevent="editRow(scope.$index, scope.row)"
                          type="text"
                          size="small">
                          编辑
                        </el-button>
                        <el-button
                          @click.native.prevent="deleteRow(scope.$index, scope.row)"
                          type="text"
                          size="small">
                          锁定/启用
                        </el-button>
                        <el-button
                          @click.native.prevent="deleteRow(scope.$index, scope.row)"
                          type="text"
                          size="small">
                          密码初始化
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <!-- 添加人员 -->
    <el-dialog title="添加人员" :visible.sync="modelSubscriber" :close-on-click-modal="false">
        <el-form :model="addSubscriber" label-position="left">
            <el-row :gutter="10">
                <el-col :span="24" class="formTitle">基本信息</el-col>
                <el-col :span="12">
                    <el-form-item label="账号" :label-width="formLabelWidth">
                        <el-input placeholder="请输入账号" v-model="addSubscriber.account"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="姓名" :label-width="formLabelWidth" width="100">
                        <el-input placeholder="请输入账号" v-model="addSubscriber.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="部门" :label-width="formLabelWidth">
                        <el-select placeholder="请选择部门" v-model="addSubscriber.department" style="width:100%;">
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="角色" :label-width="formLabelWidth">
                        <el-select placeholder="请选择角色" v-model="addSubscriber.role" style="width:100%;"></el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24" class="formTitle">个人信息</el-col>
                <el-col :span="12">
                    <el-form-item label="性别" :label-width="formLabelWidth">
                        <el-select placeholder="请选择性别" v-model="addSubscriber.sex" style="width: 100%">
                            <el-option value="男">男</el-option>
                            <el-option value="女">女</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="生日" :label-width="formLabelWidth">
                        <el-input placeholder="请输入生日" v-model="addSubscriber.birthday"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机" :label-width="formLabelWidth">
                        <el-input placeholder="请输入手机号" v-model="addSubscriber.cellphone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                        <el-input placeholder="请输入邮箱" v-model="addSubscriber.email"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="modalIncome = false">取 消</el-button>
            <el-button type="primary" @click="confirmIncome">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            structure: [{
                label: '双子金服基金公司',
                children: [{
                    label: '市场部',
                    children: [{
                        label: 'a小组'
                    }, {
                        label: 'b小组'
                    }]
                }, {
                    label: '人事部'
                }, {
                    label: '开发部',
                    children: [{
                        label: '前端组'
                    }, {
                        label: '后台组'
                    }, {
                        label: 'UI组'
                    }]
                }]
            }, {
                label: '深度网络科技有限公司',
                children: [{
                    label: '市场部',
                    children: [{
                        label: 'a小组'
                    }, {
                        label: 'b小组'
                    }]
                }, {
                    label: '人事部'
                }, {
                    label: '开发部',
                    children: [{
                        label: '前端组'
                    }, {
                        label: '后台组'
                    }, {
                        label: 'UI组'
                    }]
                }]
            }],
            options: [{
                value: '所有',
                label: '所有'
            }, {
                value: '锁定',
                label: '锁定'
            }, {
                value: '启用',
                label: '启用'
            }],
            value: '',
            subscriberData: [{
                name: '',
                account: '',
                department: '',
                role: '',
                state: '启用'
            }, {
                name: '张三',
                account: '',
                department: '',
                role: '',
                state: '锁定'
            }],
            addSubscriber: {
                account: '',
                name: '',
                department: '',
                role: '',
                sex: '',
                birthday: '',
                cellphone: '',
                email: ''
            },
            modelSubscriber: false,
            formLabelWidth: '120px'
        }
    },
    methods: {
        showSubscriber() {
            this.modelSubscriber = true
        },
        editRow(index, row) {
            this.modelSubscriber = true
            this.addSubscriber = row
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/mixin.less";
.subscriber {
    .base-style();
    .tree {
        &:hover {
            box-shadow: 0 2px 7px rgba(0,0,0,.15);
            border-color: transparent;
        }
    }
    .title {
        width: 100%;
        height: 42px;
        line-height: 42px;
        margin-bottom: 12px;
        display: flex;
        .filter {
            flex: 0 0 50%;
            padding-top: 3px;
        }
        .btn {
            flex: 0 0 50%;
            text-align: right;
        }
    }
    .formTitle{
        width: 100%;
        height: 42px;
        line-height: 42px;
        background: #eef1f6;
        margin-bottom: 12px;
    }
}
</style>
