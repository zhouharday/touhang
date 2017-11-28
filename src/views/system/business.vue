<template>
    <section class="projectLimits">
        <el-row :gutter="30">
            <el-col :span="6">
                <div class="roleBtn">
                    <el-button size="small" @click="roleDialog=true">添加</el-button>
                </div>
                <el-table :data="roleData" border style="width: 100%"  highlight-current-row @current-change="handleCurrentChange">
                    <el-table-column prop="roleName" label="角色名称" align="center">
                        <template scope="scope">
                            <span v-if="!scope.row.editFlag">{{ scope.row.roleName}}</span>
                            <span v-if="scope.row.editFlag">
                                <el-input v-model="scope.row.roleName" placeholder=""></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template scope="scope">
                            <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">编辑
                            </el-button>
                            <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">保存
                            </el-button>
                            <!--<el-button type="text" size="small" @click="handleDelete(scope.$index,scope.row)">删除</el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="18">
                <el-row>
                    <el-col>
                        <div class="limitBtn">
                            <!--<el-button type="default" size="small">修改权限</el-button>-->
                            <el-button type="danger" size="small" @click="saveRole" v-if="this.userId">保存</el-button>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="left" style="font-weight:bold;background-color: #eef1f6;">权限点</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="f_right">权限</div>
                    </el-col>
                    <div v-for="item in allData.permissions" :key="item.index">
                        <el-col :span="24" style="border: 1px solid #dfe6ec;">
                        <el-col :span="6">
                            <div class="left">
                                <el-checkbox-group v-model="clickMenu" @change="handleCheckedCitiesChange">
                                    <el-checkbox :label="item.path" >{{item.permissionName}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="right">
                                <div v-if="item.children" >
                                    <div v-for="nextItem in item.children" :key="nextItem">
                                        <div style="flex-direction: row; display: flex">
                                         <div  style=" margin-left: 15px" >
                                            <el-checkbox-group v-model="clickMenu" @change="handleCheckedCitiesChange">
                                            <el-checkbox :label="nextItem.path" >{{nextItem.permissionName}}</el-checkbox>
                                            </el-checkbox-group>
                                        </div>
                                        <div style=" margin-left: 15px;">
                                            <el-checkbox-group v-model="clickMenu" @change="handleCheckedCitiesChange">
                                            <el-checkbox v-for="(text, index) of nextItem.buttons" :label="text.path" :key="text">{{text.permissionName}}</el-checkbox>
                                            </el-checkbox-group>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="!item.children "style=" margin-left: 15px">
                                    <el-checkbox-group v-model="clickMenu" @change="a">
                                        <el-checkbox v-for="(text, index) of item.buttons"  :key="text.index" :label="text.path" >{{text.permissionName}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </el-col>
                        </el-col>
                    </div>
                </el-row>
            </el-col>
        </el-row>
        <!-- 添加  角色名称 对话框-->
        <el-dialog title="添加角色名称" :visible.sync="roleDialog">
            <el-form :model="roleForm">
                <el-form-item label="角色名称" prop="role" label-width="80px">
                    <el-input v-model="roleForm.roleName" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="default" @click="roleDialog = false">取 消</el-button>
                <el-button type="danger" @click="addRole">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 删除确认弹框 -->
        <delete-reminders :deleteReminders="deleteReminders" :message="message" :modal_loading="modal_loading" @del="confirmDel" @cancel="deleteReminders=false">
        </delete-reminders>
    </section>
</template>

<script type="text/ecmascript-6">
import deleteReminders from 'components/deleteReminders'
import {queryList} from 'api/system'
import {reloadQueryData} from 'api/system'
import {projectRoleEdit} from 'api/system'
import {projectRoleSave} from 'api/system'
import {deleteUser} from 'api/system'
import {permissionlistByRoleId} from 'api/system'
import {permissionqueryList} from 'api/system'


import {getUpdataFund} from 'api/system'
import {roleBindPermission} from 'api/system'

export default {
    data() {
        return {
            roleDialog: false,
            deleteReminders: false,
            modal_loading: false,
            message: '是否确认删除该角色？',
            roleData: [
                {
                    role: '项目负责人',
                    editFlag: false
                },
                {
                    role: '项目成员',
                    editFlag: false
                },
                {
                    role: '投后人员',
                    editFlag: false
                }
            ],
            roleForm: {
                roleName: '',
                editFlag: false
            },
            deletData:'',
            allData:[],
            clickMenu:[],
        }
    },
    methods: {

        saveRole(){

            var String = getUpdataFund(this.clickMenu,this.allData.data )
            roleBindPermission(this.userId,String).then((res)=>{
                console.log(res)
                this.$Message.success(res.data.message);
            })

        },
        // 添加角色 的方法
        addRole() {
            if(this.roleDialog == true){
                projectRoleSave(0,this.roleForm.roleName).then((res)=>{
                    if (res.data.status == 200){

                    } else {
                        this.$Message.error(res.data.message);
                    }
                    queryList(0).then((res)=>{
                        this.roleData = reloadQueryData(res.data.result)
                        this.roleDialog = false;
                    })
                })
            }
        },
        //编辑
        checkEdit(index, row) {
            row.editFlag = !row.editFlag;
            if (!row.editFlag) {
                projectRoleEdit(row.id, row.roleName,row.roleType).then((res) => {
                    if (res.data.status == 200){
                        console.log(res.data)
                        queryList(0).then((res)=>{
                            if (res.status == 200) {
                                this.roleData = reloadQueryData(res.data.result)
                            }
                        })
                    }else {
                        this.$Message.error(res.data.message);
                        queryList(0).then((res)=>{
                            if (res.status == 200) {
                                this.roleData = reloadQueryData(res.data.result)
                            }
                        })
                    }
                })
            }
        },

        handleCurrentChange(row){
            this.clickMenu = []
            this.userId = row.id
            permissionlistByRoleId(row.id).then((res)=>{
                var userRole = res.data.result
                userRole.forEach(function (item) {
                    if (this.clickMenu){
                        this.clickMenu.push(item.path)
                    }else
                        this.clickMenu = [item.path]
                },this)
                permissionqueryList(0).then((res)=>{
                    this.allData = res.data.result

                })
            })

        }
    },
    created(){
//        获取角色列表
        queryList(0).then((res)=>{
            this.roleData = reloadQueryData(res.data.result)
        })

        //获取所有权限
        permissionqueryList(0).then((res)=>{
            this.allData = res.data.result
        })
    }
    ,
    components: {
        deleteReminders
    },
}
</script>





<style lang="less" scoped>
.projectLimits {
    width: 100%;
    padding: 24px;
    background: #fff;
    // min-height: 820px;
    .roleBtn,
    .limitBtn {
        margin-bottom: 15px;
    }
    .limitBtn {
        display: flex;
        justify-content: flex-end;
    }
    .left {
        /*min-height: ;*/
        /*height: 40px;*/
        line-height: 40px;
        padding-left: 10px;
        /*border: 1px solid #dfe6ec;*/
        /*border-bottom: none;*/
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
        /*height: 40px;*/
        min-height: 40px;
        /*padding: 5px 0;*/
        line-height: 40px;
        padding-left: 10px;
        border-left: 1px solid #dfe6ec;
        /*border-left: none;*/
        border-bottom: none;
    }
    .mgr {
        margin-right: 15px;
    }
    .manage-rt {
        height: 140px;
        line-height: 140px;
        text-align: center;
        border: 1px solid #dfe6ec;
        border-bottom: none;
    }
    .manage-lt {
        height: 140px;
        border: 1px solid #dfe6ec;
        border-bottom: none;
        border-left: none;
        padding-top: 25px;
        box-sizing: border-box;
    }
}
</style>
