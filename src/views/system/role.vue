<template>
<div class="role">
    <div class="role">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="roleBtn">
                    <el-button size="small" @click="tianjuese">添加</el-button>
                </div>
                <div class="roleContent">
                    <el-table :data="roleInfo" border style="width: 100%" >
                        <el-table-column label="角色名称" prop="roleName" width="160" >

                            <template scope="scope">
                                <span  v-if="!scope.row.editFlag" @click="handleRole(scope.$index, scope.row)">
                                    {{scope.row.roleName}}
                                </span>
                                <span  v-if="scope.row.editFlag" @click="handleRole(scope.$index, scope.row)">
                                    <el-input v-model="scope.row.roleName" :placeholder = "scope.row.roleName"></el-input>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"v-if="!scope.row.editFlag">
                                    编辑
                                </el-button>
                                <el-button  size="mini" @click="handleEdit(scope.$index, scope.row)"v-if="scope.row.editFlag">
                                    保存
                                </el-button>
                                <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">
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
                        <role-limits :treeData="treeData" :nowId = "nowId"></role-limits>
                    </el-tab-pane>
                    <el-tab-pane label="角色用户" name="second">
                        <role-user :roleUserList = "roleUserList" :nowId = "nowId" @refreshRoleUserList = "refreshRoleUserList"></role-user>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>

    </div>
<<<<<<< HEAD
    // 添加弹窗
=======
    <!--//添加弹窗-->
>>>>>>> 1aa0770dab7aff87f07516c04a420793ffc8f88c
    <el-dialog title="角色名称" :visible.sync="fundDialog" class="fileDialog">
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
            <el-button class="dialogBtn_active" @click="addjuese">保存</el-button>
            <el-button class="dialogBtn" @click="fundDialog = false">取消</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
    import roleLimits from "./roleLimits"
    import roleUser from "./roleUser"
    import {getRoleList} from 'api/system'
    import {updataRole} from 'api/system'
    import {deleteUser} from 'api/system'
    import {getUserRole} from 'api/system'
    import {getUserAllRole} from 'api/system'
    import {getNodes} from 'api/system'
    import {getRightUserList} from 'api/system'
    import {saveRole} from 'api/system'


export default {

        data() {
            return {
                fundDialog:false,
                roleInfo: [],
                activeName: 'first',
                treeData:'',
                roleUserList:[],
                nowId:'',
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
            tianjuese(){
                this.fundDialog = !this.fundDialog;
            },
            //添加角色
            addjuese(){
                saveRole(this.fundForm.fundName).then((res)=>{
                    getRoleList().then((res)=>{

                        res.data.result.list.forEach(function (item,index) {
                            item.editFlag = false
                        })
                        this.roleInfo = res.data.result.list
//                        console.log(this.roleInfo)
                        this.fundDialog = !this.fundDialog;
                    })
                })
            },

            //刷新角色用户表
            refreshRoleUserList(){
                getRightUserList(this.nowId).then((res)=>{
                    this.roleUserList = res.data.result
                })
            },

            //右侧列表
            handleRole(index,row){
                this.nowId = row.id
//                获取角色权限
                getUserRole(row.id).then((res)=>{
                    var arr = res.data.result
//                    获取所有权限
                    getUserAllRole().then((res)=>{
                        this.treeData = getNodes(res.data.result,arr)
                        console.log(this.treeData)
                    })
                }),
//                获取角色用户
                getRightUserList(row.id).then((res)=>{
                    this.roleUserList = res.data.result
                })


            },
            //删除角色
            handleDelete(index,row){

                deleteUser(row.id).then((res)=>{
//                    刷新角色列表
                    getRoleList().then((res)=>{
                        this.roleInfo = res.data.result.list
                    })
                })
            },
            //更改角色名称
            handleEdit(index,row){

                row.editFlag = !row.editFlag
                if (!row.editFlag){
                    updataRole(row).then((res)=>{
                        getRoleList().then((res)=>{

                            res.data.result.list.forEach(function (item,index) {
                                item.editFlag = false
                            })
                            this.roleInfo = res.data.result.list

                        })
                    })
                }
            }



        },
        created(){
            //角色列表
            getRoleList().then((res)=>{

                res.data.result.list.forEach(function (item,index) {
                    item.editFlag = false
                })
                this.roleInfo = res.data.result.list
//                console.log(this.roleInfo)
            }),
//            所有权限
            getUserAllRole().then((res)=>{

                 this.treeData = getNodes(res.data.result,[])
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
