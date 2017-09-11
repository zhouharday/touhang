<template>
    <div class="roleUser">
        <div class="btn_wrapper">
            <el-button>添加用户</el-button>
        </div>
        <el-table :data="roleUser" border style="width: 100%">
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="操作">
                <template scope="props">
                    <el-button size="small" @click="removeEdit(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            roleUser: [{
                name: '张三'
            }, {
                name: '李四'
            }, {
                name: '安红'
            }]
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
.roleUser{
    width: 100%;
    height: 100%;
    background: @color-base;
    .btn_wrapper{
        width: 100%;
        height: 42px;
        text-align: right;
    }
}
</style>
