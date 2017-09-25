<template>
    <div class="role">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="roleBtn">
                    <el-button>添加</el-button>
                </div>
                <div class="roleContent">

                    <el-table :data="roleInfo" border style="width: 100%" >
                        <el-table-column label="角色名称" prop="roleName" width="160" >

                            <template scope="scope">
                                <el-button size="small" type = "text" @click="handleRole(scope.$index, scope.row)">
                                    {{scope.row.roleName}}
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                                    编辑
                                </el-button>
                                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
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
                        <role-limits :data="treeData"></role-limits>
                    </el-tab-pane>
                    <el-tab-pane label="角色用户" name="second">
                        <role-user></role-user>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import roleLimits from "./roleLimits"
    import roleUser from "./roleUser"
    import {getRoleList} from 'api/system'
    import {deleteUser} from 'api/system'
    import {getUserRole} from 'api/system'
    import {getUserAllRole} from 'api/system'
    import {getNodes} from 'api/system'

    export default {

        data() {
            return {
                roleInfo: [],
                activeName: 'first',
                treeData:''
            }
        },
        components: {
            roleLimits,
            roleUser
        },
        methods: {
            handleRole(index,row){

//                获取角色权限
                getUserRole(row.id).then((res)=>{
                    var arr = res.data.result
//                    获取所有权限
                    getUserAllRole().then((res)=>{
                        this.treeData = getNodes(res.data.result,arr)

                    })
                })
            },
            handleDelete(index,row){
//                删除角色
                deleteUser(row.id).then((res)=>{
//                    刷新角色列表
                    getRoleList().then((res)=>{
                        this.roleInfo = res.data.result.list
                    })
                })
            },
            handleEdit(index,row){
                console.log(index,row)
            }

        },
        created(){
            //角色列表
            getRoleList().then((res)=>{
                this.roleInfo = res.data.result.list
            }),
//            所有权限
            getUserAllRole().then((res)=>{

                 this.treeData = getNodes(res.data.result,[])

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
</style>
