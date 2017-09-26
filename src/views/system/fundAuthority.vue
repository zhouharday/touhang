<template>
    <section class="fundLimits">
        <el-row :gutter="30">
            <el-col :span="6">
                <div class="roleBtn">
                    <el-button type="danger" @click="roleDialog=true">添加</el-button>
                </div>
                <el-table :data="roleData" border style="width: 100%">
                    <el-table-column prop="role" label="角色名称" align="center">
                        <template scope="scope">
                            <span v-if="!scope.row.editFlag">{{ scope.row.role}}</span>
                            <span v-if="scope.row.editFlag" class="cell-edit-input">
                                <el-input v-model="scope.row.role" placeholder=""></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template scope="scope">
                            <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">编辑
                            </el-button>
                            <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">保存
                            </el-button>
                            <el-button type="text" size="small" @click="handleDelete(scope.$index,roleData)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="18">
                <el-row>
                    <el-col>
                        <div class="limitBtn">
                            <el-button type="default">修改权限</el-button>
                            <el-button type="danger">保存</el-button>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="left" style="font-weight:bold;background-color: #eef1f6;">权限点</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="f_right">权限</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="left">基金详情</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="right">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="mgr">全选</el-checkbox>
                            <el-checkbox-group @change="handleCheckedCitiesChange">
                                <el-checkbox>编辑</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="left">基金文档</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="right">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="mgr">全选</el-checkbox>
                            <el-checkbox-group @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="file in fundFiles" :label="file" :key="file">{{file}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="manage-rt">运营管理</div>
                    </el-col>
                    <el-col :span="18" class="manage-lt">
                        <p v-for="item in manageList" :key="item.index" style="display:flex">
                            <span style="margin: 0 15px 0 15px;font-size:14px">{{item}}</span>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="mgr">全选</el-checkbox>
                            <el-checkbox-group @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="manage in manages" :label="manage" :key="manage">{{manage}}</el-checkbox>
                            </el-checkbox-group>
                        </p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <!-- 添加  角色名称 对话框-->
        <el-dialog title="添加角色名称" :visible.sync="roleDialog">
            <el-form :model="roleForm">
                <el-form-item label="角色名称" prop="role" label-width="80px">
                    <el-input v-model="roleForm.role" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="roleDialog = false">取 消</el-button>
                <el-button type="danger" @click="addRole">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            roleDialog: false,
            roleData: [
                {
                    role: '基金负责人',
                    editFlag: false
                },
                {
                    role: '基金成员',
                    editFlag: false
                }
            ],
            roleForm: {
                role: '',
                editFlag: false
            },
            manageList: ['基金费用', '收益分配'],
            fundFiles: ['上传', '下载', '预览', '编辑', '删除'],
            manages: ['添加', '编辑', '浏览', '删除']
        }
    },
    methods: {
        // 添加角色 的方法
        addRole() {
            this.roleData.push(this.roleForm);
            this.roleForm = {};
            this.roleDialog = false;
        },
        checkEdit(index, row) { //编辑
            // console.log(row)
            row.editFlag = !row.editFlag;
        },

        //删除当前行
        handleDelete(index, rows) {
            rows.splice(index, 1);
        }
    }
}
</script>





<style lang="less" scoped>
.fundLimits {
    width: 100%;
    padding: 24px;
    background: #fff;
    min-height: 820px;
    .roleBtn,
    .limitBtn {
        margin-bottom: 15px;
    }
    .limitBtn {
        display: flex;
        justify-content: flex-end;
    }
    .left {
        height: 40px;
        line-height: 40px;
        border: 1px solid #dfe6ec;
        border-bottom: none;
        text-align: center;
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
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        border: 1px solid #dfe6ec;
        border-left: none;
        border-bottom: none;
    }
    .mgr {
        margin-right: 15px;
    }
    .manage-rt {
        height: 110px;
        line-height: 110px;
        text-align: center;
        border: 1px solid #dfe6ec;
    }
    .manage-lt {
        height: 110px;
        border: 1px solid #dfe6ec;
        border-left: none;
        padding-top: 25px;
        box-sizing: border-box;
    }
}
</style>
