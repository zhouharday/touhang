<template>
<div class="role">
    <el-row :gutter="20">
        <el-col :span="8">
            <div class="roleBtn">
                <el-button>添加</el-button>
            </div>
            <div class="roleContent">
<<<<<<< HEAD
                <el-table :data="roleInfo" border style="width: 100%" >
                    <el-table-column label="角色名称" prop="roleName" width="160" @click="aaas">

=======
                <el-table :data="roleInfo" border style="width: 100%">
                    <el-table-column label="角色名称" prop="role" width="160">
                        <template scope="scope">
                           <el-button size="small" @click="handleRole(scope.$index, scope.row)">
                               {{scope.row.role}}
                           </el-button>
                        </template>
>>>>>>> c336bc35cee379cb9acf4c2ab1d4271bdc565ac7
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
                    <role-limits></role-limits>
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
export default {
<<<<<<< HEAD
=======
    created(){
        // this.$http.post('api/formset/queryInfo',{

        // })
        // .then( res => {
        //     let data = res.data;
        //     console.log(data);
        // })
        // .catch( error => {

        // })
    },
>>>>>>> c336bc35cee379cb9acf4c2ab1d4271bdc565ac7
    data() {
        return {
            roleInfo: [],
            activeName: 'first'
        }
    },
    components: {
        roleLimits,
        roleUser
    },
    methods: {

    },
        created(){

        getRoleList().then((res)=>{
            console.log(res.data.result.list)
            this.roleInfo = res.data.result.list
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
