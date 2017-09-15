<template>
    <div class="roleUser">
        <div class="btn_wrapper">
            <el-button @click="userDialog=true">添加用户</el-button>
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
        <!-- 添加用户 对话框-->
        <el-dialog title="选择用户" :visible.sync="userDialog">
            <el-form :model="teamForm" :rules="rules" ref="teamForm" label-width="80px">
                <el-row :gutter="20">
                    <el-col>
                        <i style="border-bottom: 1px solid #f05e5e;"></i>
                    </el-col>
                    <el-col :span="18">
                        <el-form-item label="部门：" prop="department">
                            <el-select v-model="teamForm.department" placeholder="请选择部门" style="width:100%" auto-complete="off">
                                <el-option label="财务部" value="财务部"></el-option>
                                <el-option label="运营部" value="运营部"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="18">
                        <el-form-item prop="name">
                            <el-input v-model="teamForm.name" placeholder="请输入姓名或账号" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="danger">查找</el-button>
                    </el-col>
                    <el-col>
                        <i style="border-bottom: 1px solid #c4c4c4;"></i>
                    </el-col>
                    <el-col>
                        <el-form-item prop="selectUser">
                                <el-checkbox v-model="teamForm.selectUser" label="张韶涵1" name="selectUser">

                                </el-checkbox>
                                <el-checkbox v-model="teamForm.selectUser" label="张韶涵2" name="selectUser"></el-checkbox>
                                <el-checkbox v-model="teamForm.selectUser" label="张韶涵3" name="selectUser"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="userDialog = false">确定</el-button>
                <el-button type="primary" @click="userDialog = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            userDialog: false,
            roleUser: [{
                name: '张三'
            }, {
                name: '李四'
            }, {
                name: '安红'
            }],
            teamForm: {
                department: '',
                name: '',
                selectUser: []
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
.roleUser {
    width: 100%;
    height: 100%;
    background: @color-base;
    .btn_wrapper {
        width: 100%;
        height: 42px;
        text-align: right;
    }
}

i {
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;
    border-bottom: 1px solid #c4c4c4;
}
</style>
