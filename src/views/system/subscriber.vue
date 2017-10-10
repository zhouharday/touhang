<template>
    <div class="subscriber">
        <el-row :gutter="20">
            <!--  树形控件  -->
            <el-col :span="4">
                <el-tree :data="structure" :props="defaultProps" accordion :default-expand-all="true" class="tree" @node-click="handleNodeClick">
                </el-tree>
            </el-col>
            <!--  table页面  -->
            <el-col :span="20">
                <div class="title">
                    <div class="filter">
                        <el-form :inline="true" class="demo-form-inline">
                            <el-form-item>
                                <el-input placeholder="请输入搜索内容" icon="search" v-model="input2" :on-icon-click="handleIconClick">
                                </el-input>
                            </el-form-item>
                            <el-form-item>

                                <el-select v-model="value2" placeholder="请选择">
                                    <el-option v-for="item  in  options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="btn">
                        <el-button type="danger" size="small" @click="showSubscriber">添加</el-button>
                    </div>
                </div>
                <el-table :data="subscriberData" border style="width:  100%">
                    <el-table-column prop="name" label="姓名" width="180">
                        <template scope="scope">
                            {{scope.row.name}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="number" label="账号" width="180">
                    </el-table-column>
                    <el-table-column prop="dept" label="部门" width="180">
                    </el-table-column>
                    <!--<el-table-column  prop="role"  label="所属角色"  width="180">-->
                    <!--</el-table-column>-->
                    <el-table-column prop="umdisables" label="状态" width="180">
                        <template scope="scope">
                            <div v-if="scope.row.umdisables  ==  1">启用</div>
                            <div v-if="scope.row.umdisables  ==  0">锁定</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <!--<el-button-->
                            <!--@click.native.prevent="editRow(scope.$index,  scope.row)"-->
                            <!--type="text"-->
                            <!--size="small">-->
                            <!--编辑-->
                            <!--</el-button>-->
                            <el-button @click.native.prevent="deleteRow(scope.$index,  scope.row)" type="text" size="small">

                                <div v-if="scope.row.umdisables  ==  1">锁定</div>
                                <div v-if="scope.row.umdisables == 0">启用</div>
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
                    <el-col :span="11">
                        <el-form-item label="账号" :label-width="formLabelWidth">
                            <el-input placeholder="请输入账号" v-model="addSubscriber.account" type='number'></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11" :offset="2">
                        <el-form-item label="姓名" :label-width="formLabelWidth" width="100">
                            <el-input placeholder="请输入账号" v-model="addSubscriber.name"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="部门" :label-width="formLabelWidth">
                            <el-select placeholder="请选择部门" v-model="addSubscriber.department" style="width:100%;">
                                <div v-for="item in allDepartmentList">
                                    <el-option :value="item.deptName">{{item.deptName}}</el-option>
                                </div>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--<el-col :span="12">-->
                    <!--<el-form-item label="角色" :label-width="formLabelWidth">-->
                    <!--<el-select placeholder="请选择角色" v-model="addSubscriber.role" style="width:100%;">-->
                    <!--<div v-for="item in allRoleNameList">-->
                    <!--<el-option :value="item.roleName">{{item.roleName}}</el-option>-->
                    <!--</div>-->
                    <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="24" class="formTitle">个人信息</el-col>
                    <el-col :span="11">
                        <el-form-item label="性别" :label-width="formLabelWidth">
                            <el-select placeholder="请选择性别" v-model="addSubscriber.sex" style="width: 100%">
                                <el-option value="女">女</el-option>
                                <el-option value="男">男</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="年龄" :label-width="formLabelWidth">
                            <el-select placeholder="请选择年龄" v-model="addSubscriber.birthday" style="width:100%;">
                                <div v-for="item in allAge">
                                    <el-option :value="item">{{item}}</el-option>
                                </div>
                            </el-select>
                            <!--<el-input placeholder="请选择年龄" v-model="addSubscriber.birthday"></el-input>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="手机" :label-width="formLabelWidth">
                            <el-input placeholder="请输入手机号" v-model="addSubscriber.cellphone" type='number'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="邮箱" :label-width="formLabelWidth">
                            <el-input placeholder="请输入邮箱" v-model="addSubscriber.email"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="default" @click="modalIncome">取 消</el-button>
                <el-button type="danger" @click="confirmIncome">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">

import { getNodes } from 'common/js/config'
import { getDepartmentList } from 'api/system'
import { getUserlist } from 'api/system'
import { openOrClose } from 'api/system'
import { addNewUser } from 'api/system'

export default {
    data() {
        return {
            structure: [],
            options: [
                {
                    lable: '',
                    value: '所有'
                }, {
                    lable: '0',
                    value: '锁定'
                }, {
                    lable: '1',
                    value: '启用'
                }
            ],
            value2: '',
            subscriberData: [],
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
            formLabelWidth: '50px',
            addId: '',
            allDepartmentList: [],
            allAge: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
            input2: ''
        }
    },
    methods: {
        deleteRow(index, row) {
            console.log(row)
            var disables = row.disables ? 0 : 1;
            console.log(row.id, disables)
            openOrClose(row.id, disables).then((res) => {
                getUserlist(this.addId).then((res) => {

                    this.subscriberData = res.data.result
                    console.log(this.subscriberData)
                })
            })
        },
        showSubscriber() {
            //点击添加
            this.modelSubscriber = true
            //            getRoleList().then((res)=>{
            //                this.allRoleNameList = res.data.result.list
            //            })
        },
        editRow(index, row) {
            this.modelSubscriber = true
            this.addSubscriber = row
        },
        handleNodeClick(data) {
            this.addId = data.id;
            getUserlist(data.id).then((res) => {
                this.subscriberData = res.data.result
                console.log(this.subscriberData)
            })
        },
        confirmIncome() {

            if (this.checkMobile(this.addSubscriber.cellphone) == false)
                return
            else {
                if (this.checkEmail(this.addSubscriber.email) == false)
                    return
                else {
                    if (this.addSubscriber.sex == '女')
                        this.addSubscriber.sex = 1
                    else
                        this.addSubscriber.sex = 0
                    var depArr = this.allDepartmentList
                    depArr.forEach((item) => {
                        if (item.deptName == this.addSubscriber.department)
                            this.addSubscriber.department = item.id
                    })
                    console.log(this.addSubscriber)
                    addNewUser(this.addSubscriber).then((res) => {
                        console.log(res)
                    })
                    //确认添加
                    this.modelSubscriber = false
                }
            }
        },
        checkMobile(phone) {
            var sMobile = phone
            if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(sMobile))) {
                alert("请输入正确手机号");
                return false;
            }
        },
        checkEmail(str) {
            var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
            if (re.test(str)) {
                return true
            } else {
                alert("请输入正确的邮箱");
                return false
            }
        },
        modalIncome() {
            //取消
            this.modelSubscriber = false
        },
        handleIconClick() {
            //        alert(this.value2)
            var LockStatus //锁定状态
            //            this.options.forEach(function (item , index) {
            //                if (item.value == this.value2)
            //                {
            //                    LockStatus = item.label
            //                }
            //            })


            getUserlist('', LockStatus, this.input2).then((res) => {
                this.subscriberData = res.data.result
            })
        }

    },
    created() {
        getDepartmentList().then((res) => {
            var dataList = res.data.result
            this.allDepartmentList = dataList
            var treeList = getNodes(dataList)
            this.structure = treeList
        });
        getUserlist().then((res) => {
            this.subscriberData = res.data.result
            console.log(this.subscriberData)
        })
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/mixin.less";
.subscriber {
    .base-style();
    .tree {
        &:hover {
            box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
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
    .formTitle {
        width: 100%;
        height: 42px;
        line-height: 42px;
        background: #eef1f6;
        margin-bottom: 12px;
    }
}
</style>