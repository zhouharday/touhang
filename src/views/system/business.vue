<template>
    <section class="projectLimits">
        <el-row :gutter="30">
            <el-col :span="6">
                <div class="roleBtn">
                    <el-button type="danger" size="small" @click="roleDialog=true">添加</el-button>
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
                            <el-button type="default" size="small">修改权限</el-button>
                            <el-button type="danger" size="small">保存</el-button>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="left" style="font-weight:bold;background-color: #eef1f6;">权限点</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="f_right">权限</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="left">项目详情</div>
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
                        <div class="left">项目文档</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="right">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="mgr">全选</el-checkbox>
                            <el-checkbox-group @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="file in projectFiles" :label="file" :key="file">{{file}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="manage-rt">管理</div>
                    </el-col>
                    <el-col :span="18" class="manage-lt">
                        <p v-for="item in manageList" :key="item.index" style="display:flex">
                            <span style="margin: 0 15px 0 15px;font-size:14px">{{item}}</span>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="mgr">全选</el-checkbox>
                            <el-checkbox-group @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="risk in risks" :label="risk" :key="risk">{{risk}}</el-checkbox>
                            </el-checkbox-group>
                        </p>
                    </el-col>
                    <el-col :span="6">
                        <div class="left">风险管理</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="right">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="mgr">全选</el-checkbox>
                            <el-checkbox-group @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="record in records" :label="record" :key="record">{{record}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="left">记录</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="right">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="mgr">全选</el-checkbox>
                            <el-checkbox-group @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="record in records" :label="record" :key="record">{{record}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="left">重大事项</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="right">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="mgr">全选</el-checkbox>
                            <el-checkbox-group @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="event in events" :label="event" :key="event">{{event}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="left">数据填报</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="right">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="mgr">全选</el-checkbox>
                            <el-checkbox-group @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="data in datas" :label="data" :key="data">{{data}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="left" style="border-bottom:1px solid #dfe6ec;">监控设置</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="right" style="border-bottom:1px solid #dfe6ec;">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="mgr">全选</el-checkbox>
                            <el-checkbox-group @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="monitor in monitors" :label="monitor" :key="monitor">{{monitor}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
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
                <el-button type="default" @click="roleDialog = false">取 消</el-button>
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
                role: '',
                editFlag: false
            },
            manageList: ['项目费用', '投资支付', '项目分红', '项目退出'],
            projectFiles: ['上传', '下载', '预览', '编辑', '删除'],
            risks: ['添加', '编辑', '浏览', '删除'],
            records: ['添加', '编辑', '浏览', '删除'],
            events: ['添加', '编辑', '浏览', '删除'],
            datas: ['添加', '编辑', '浏览', '删除', '上传', '模板下载'],
            monitors: ['添加', '编辑', '浏览', '删除']
        }
    },
    methods: {
        // 添加角色 的方法
        addRole() {
            this.roleData.push(this.roleForm);
            this.roleForm={};
            this.roleDialog=false;
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
.projectLimits {
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
