<template>
<div class="role">
    <div class="role">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="roleBtn">
                    <el-button size="small" @click="tianjuese">添加</el-button>
                </div>
                <div class="roleContent">
                    <el-table :data="roleInfo" border style="width: 100%"   highlight-current-row @current-change="handleCurrentChange" >
                        <el-table-column label="角色名称" prop="roleName" width="160" >
                            <template scope="scope">
                                <span  v-if="!scope.row.editFlag">
                                    {{scope.row.roleName}}
                                </span>
                                <span  v-if="scope.row.editFlag">
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

                        <!--<role-limits :treeData="treeData" :nowId = "nowId"></role-limits>-->


                        <div class="a">
                            <!--<div :v-if="nowId">-->
                                <div class="limitBtn" >
                                    <el-button type="danger" size="small"  v-if="nowId" @click="Setting">保存修改</el-button>
                                </div>
                            <!--</div>-->
                            <div class="textWrapper">
                                <el-row>
                                    <el-col :span="24" >
                                        <!--<my-tree :model="treeData"></my-tree>-->
                                        <div v-for="item in treeData" >
                                            <el-col :span="24" style="border: 1px solid #dfe6ec;">
                                                <el-col :span="6" >
                                                    <div class="left">
                                                        <!-- {{item.menuName}} -->
                                                        <el-checkbox-group v-model="clickMenu" @change="handleCheckedCitiesChange">
                                                                        <el-checkbox :label="item.path" >{{item.menuName}}</el-checkbox>
                                                                    </el-checkbox-group>
                                                    </div>
                                                </el-col>
                                                <el-col :span="18">
                                                    <div  class="right" >
                                                        <el-col>
                                                            <el-row :span = "18" v-for="nextItem in item.children" style="flex-direction: row; display: flex ;border-bottom: 1px solid #dfe6ec;padding-left: 10px">
                                                                <!--<el-col :span="8" style=" padding-left: 10px; border-right: 1px solid #dfe6ec;">-->
                                                                    <el-checkbox-group v-model="clickMenu" @change="handleCheckedCitiesChange">
                                                                        <el-checkbox :label="nextItem.path" >{{nextItem.menuName}}</el-checkbox>
                                                                    </el-checkbox-group>
                                                                <!--</el-col>-->
                                                                <!--<el-col :span = "16" style="padding-left: 10px">-->

                                                                    <!--<el-checkbox-group v-model="clickMenu" @change="handleCheckedCitiesChange">-->
                                                                        <!--<el-checkbox v-for="(text, index) of nextItem.buttons"  style="margin-left: 0px; margin-right: 15px" :label="text.path" >{{text.menuName}}</el-checkbox>-->
                                                                    <!--</el-checkbox-group>-->
                                                                <!--</el-col>-->
                                                            </el-row>
                                                        </el-col>
                                                    </div>
                                                </el-col>
                                            </el-col>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>


                    </el-tab-pane>
                    <el-tab-pane label="角色用户" name="second">
                        <role-user :roleUserList = "roleUserList" :nowId = "nowId" @refreshRoleUserList = "refreshRoleUserList"></role-user>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
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
    import {authorization} from 'api/system'
    import {getUpdata} from "api/system"
    // import ElRow from "element-ui/packages/row/src/row";
    // import ElCol from "element-ui/packages/col/src/col";

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
                allData:[],
                clickMenu:[],
                yunXiangMuId:'',
            }
        },
        components: {
            // ElCol,
            // ElRow,
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
                if (this.fundDialog){
                this.fundDialog = false;
                saveRole(this.fundForm.fundName).then((res)=>{
                    getRoleList().then((res)=>{
                        this.fundForm.fundName = ''
                        res.data.result.list.forEach(function (item,index) {
                            item.editFlag = false
                        })
                        this.roleInfo = res.data.result.list
//                        console.log(this.roleInfo)
                    })
                })
                }
            },

            //刷新角色用户表
            refreshRoleUserList(){
                getRightUserList(this.nowId).then((res)=>{
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
            },

            //右侧列表
            handleCurrentChange(val) {
//                this.currentRow = val;
                this.nowId = val.id
                this.clickMenu = []
//                获取角色权限
                getUserRole(val.id).then((res)=>{
                    var arr = res.data.result
                    var userRole = res.data.result
                    userRole.forEach(function (item) {
                        if (this.clickMenu){
                            this.clickMenu.push(item.path)
                        }else
                            this.clickMenu = [item.path]
                    },this)
//                    获取所有权限
//                    getUserAllRole().then((res)=>{
////                        this.treeData = getNodes(res.data.result,arr)
//                        this.treeData = res.data.result
//                        console.log(this.treeData)
//                    })
                }),
//                获取角色用户
                    getRightUserList(val.id).then((res)=>{
                        this.roleUserList = res.data.result
                    })
            },
            Setting(){
                console.log(this.clickMenu)
                this.clickMenu.push(this.yunXiangMuId)
                var string = getUpdata(this.clickMenu)
                console.log(string)
                authorization(this.nowId,string).then((res)=>{
                    console.log(res.data)
                    getUserRole(this.nowId).then((res)=>{
                        var arr = res.data.result
                        var userRole = res.data.result
                        userRole.forEach(function (item) {
                            if (this.clickMenu){
                                this.clickMenu.push(item.path)
                            }else
                                this.clickMenu = [item.path]
                        },this)
                    })
                })
            }
        },
        created(){
            //角色列表
            getRoleList().then((res)=>{
                res.data.result.list.forEach(function (item,index) {
                    item.editFlag = false
                })
                this.roleInfo = res.data.result.list
            }),
//            所有权限
            getUserAllRole().then((res)=>{
                this.treeData = res.data.result
                this.treeData.forEach((item)=>{
                    if(item.menuName == '云项目'){
                        this.yunXiangMuId = item.path
                    }
                })
                console.log(this.yunXiangMuId)
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
    .limitBtn {
        margin-bottom: 15px;
        display: flex;
        justify-content: flex-end;
    }
    .left {
        /*height: 40px;*/
        line-height: 40px;
        padding-left: 15px;
        /*border-top: 1px solid #dfe6ec;*/
        /*border-bottom: none;*/
        /*border-right: none;*/

        text-align: left;
    }
    .f_right {
        height: 40px;
        line-height: 40px;
        border: 1px solid #dfe6ec;
        border-left: none;
        border-bottom: none;
        text-align: center;
        font-weight: bold;
        background-color: #eef1f6;
    }
    .right {
        display: flex;

        min-height: 40px;
        line-height: 40px;
        /*padding-left: 10px;*/
        border-left: 1px solid #dfe6ec;
        border-right: none;
        border-bottom: none;
    }
}

th {
    background-color: #2A3142;
}
</style>
