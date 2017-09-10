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
            <div class="roleBtn">
                <el-button>角色权限</el-button>
                <el-button>角色用户</el-button>
            </div>
            <div class="roleContent right">
                <el-button>修改权限</el-button>
            </div>
            <div class="textWrapper">
                <el-row>
                    <el-col :span="24" v-for="menuItem in theModel">
                        <my-tree :model="menuItem"></my-tree>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script type="text/ecmascript-6">
import myTree from "components/treeMenu"
import {
    myData
} from "common/js/myData"
export default {
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
            theModel: myData
        }
    },
    components: {
        myTree
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
    .roleContent {
        padding-top: 12px;
        padding-bottom: 12px;
    }
    .right {
        text-align: right;
    }
    .textWrapper {
        width: 100%;
        border: 1px solid #dfe6ec;
    }
}
</style>
