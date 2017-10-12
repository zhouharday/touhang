<template>
    <section class="role">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="roleBtn">
                    <el-button type="danger" style="padding: 7px 14px;" @click="tianjuese">添加</el-button>
                </div>
                <div class="roleContent">
                    <el-table :data="roleInfo" border style="width: 100%" highlight-current-row @current-change="handleCurrentChange">
                        <el-table-column label="角色名称" prop="roleName" width="160" align="center">
                            <template scope="scope">
                                <span v-if="!scope.row.editFlag" @click="handleRole(scope.$index,  scope.row)">
                                    {{scope.row.roleName}}
                                </span>
                                <span v-if="scope.row.editFlag" @click="handleRole(scope.$index,  scope.row)">
                                    <el-input v-model="scope.row.roleName" :placeholder="scope.row.roleName"></el-input>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button type="text" @click="handleEdit(scope.$index,  scope.row)" v-if="!scope.row.editFlag">
                                    编辑
                                </el-button>
                                <el-button type="text" @click="handleEdit(scope.$index,  scope.row)" v-if="scope.row.editFlag">
                                    保存
                                </el-button>
                                <el-button type="text" @click="handleDelete(scope.$index,  scope.row)">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col :span="16">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="角色权限" name="first">
                        <role-limits :treeData="treeData" :nowId="nowId"></role-limits>
                    </el-tab-pane>
                    <el-tab-pane label="角色用户" name="second">
                        <role-user :roleUserList="roleUserList" :nowId="nowId" @refreshRoleUserList="refreshRoleUserList"></role-user>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
        <el-dialog title="角色名称" :visible.sync="fundDialog">
            <el-form :model="fundForm">
                <el-row>
                    <el-col>
                        <i class="bottomLine"></i>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="角色名称：" prop="fundName" label-width="100px">
                            <el-input v-model="fundForm.fundName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" @click="addjuese">保 存</el-button>
                <el-button type="default" @click="fundDialog = false">取 消</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script type="text/ecmascript-6">
import roleLimits from "./roleLimits"
import roleUser from "./roleUser"
import { getRoleList } from 'api/system'
import { updataRole } from 'api/system'
import { deleteUser } from 'api/system'
import { getUserRole } from 'api/system'
import { getUserAllRole } from 'api/system'
import { getNodes } from 'api/system'
import { getRightUserList } from 'api/system'
import { saveRole } from 'api/system'


export default {

    data() {
        return {
            fundDialog: false,
            roleInfo: [],
            activeName: 'first',
            treeData: '',
            roleUserList: [],
            nowId: '',
            fundForm: {
                fundName: '',
                editFlag: false
            },
        }
    },
    components: {
        roleLimits,
        roleUser
    },
    methods: {
        //打开关闭添加窗口
        tianjuese() {
            this.fundDialog = !this.fundDialog;
        },
        //添加角色
        addjuese() {
            saveRole(this.fundForm.fundName).then((res) => {
                getRoleList().then((res) => {

                    res.data.result.list.forEach(function(item, index) {
                        item.editFlag = false
                    })
                    this.roleInfo = res.data.result.list
                    //                        console.log(this.roleInfo)
                    this.fundDialog = !this.fundDialog;
                })
            })
        },

        //刷新角色用户表
        refreshRoleUserList() {
            getRightUserList(this.nowId).then((res) => {
                this.roleUserList = res.data.result
            })
        },


        //删除角色
        handleDelete(index, row) {

            deleteUser(row.id).then((res) => {
                //                    刷新角色列表
                getRoleList().then((res) => {
                    this.roleInfo = res.data.result.list
                })
            })
        },
        //更改角色名称
        handleEdit(index, row) {

            row.editFlag = !row.editFlag
            if (!row.editFlag) {
                updataRole(row).then((res) => {
                    getRoleList().then((res) => {

                        res.data.result.list.forEach(function(item, index) {
                            item.editFlag = false
                        })
                        this.roleInfo = res.data.result.list

                    })
                })
            }
        },

        //右侧列表
        handleCurrentChange(val) {
            //                this.currentRow = val;
            this.nowId = val.id
            //                获取角色权限
            getUserRole(val.id).then((res) => {
                var arr = res.data.result
                //                    获取所有权限
                getUserAllRole().then((res) => {
                    this.treeData = getNodes(res.data.result, arr)
                    console.log(this.treeData)
                })
            }),
                //                获取角色用户
                getRightUserList(val.id).then((res) => {
                    this.roleUserList = res.data.result
                })
        }



    },
    created() {
        //角色列表
        getRoleList().then((res) => {

            res.data.result.list.forEach(function(item, index) {
                item.editFlag = false
            })
            this.roleInfo = res.data.result.list
            //                console.log(this.roleInfo)
        }),
            //            所有权限
            getUserAllRole().then((res) => {

                this.treeData = getNodes(res.data.result, [])
                //                console.log(this.treeData)
            })
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
@import "../../common/styles/mixin.less";
.role {
    width: 100%;
    padding: 24px;
    background: #fff;
    min-height: 820px;
    .roleContent {
        padding-top: 12px;
        padding-bottom: 12px;
    }
    .right {
        text-align: right;
    }
}

th {
    background-color: #2A3142;
}
</style>