<template>
    <div class="role">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="roleBtn">
                    <el-button>添加</el-button>
                </div>
                <div class="roleContent">
                    <el-table :data="roleInfo" border style="width: 100%">
                        <el-table-column label="角色名称" prop="role" width="160"></el-table-column>
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
export default {
    created() {
        this.$store.state.login.merchants = JSON.parse(sessionStorage.getItem('merchants')) || {};
        // console.log(this.$store.state.login.merchants[0].um_id);
        this.$http.post('api/user/findResourceByUid', { //请求用户权限列表数据
            // this.$http.post('api/user/findResourceByMid', { //请求用户权限列表数据
            // "merchantId": this.$store.state.login.merchants[0].id //用户、机构中间id
            "merchantId": this.$store.state.login.merchants[0].um_id //用户、机构中间id
        })
            .then(Response => {
                // console.log(this.$store.state.login.merchants[0].um_id);
                if (Response.data.status == '200') {
                    this.menus = Response.data.result;
                    console.log(this.menus);
                    // alert(1);
                }
            })
            .catch(error => {
                console.log(error);
            });
    },
    data() {
        return {
            roleInfo: [{
                role: '系统管理员'
            }, {
                role: '公司领导'
            }, {
                role: '财务'
            }, {
                role: '项目人员'
            }],
            activeName: 'first'
        }
    },
    components: {
        roleLimits,
        roleUser
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
