<template>
<div class="table">
    <div class="teamTable">
        <tabel-header :data="headerInfo_team" @add="addTeam"></tabel-header>
        <el-table :data="teamData" border style="width: 100%">
            <el-table-column label="姓名" prop="userName" align="center">
                <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.userName }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-select v-model="scope.row.userName" style="width:100%">
                                <el-option v-for="item in  nameOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </template>
            </el-table-column>
            <el-table-column label="角色" prop="roleName" align="center">
                <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.roleName }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-select v-model="scope.row.roleName" style="width:100%">
                                <el-option v-for="item in  roleOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </template>
            </el-table-column>
            <el-table-column label="添加日期" prop="createDate" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template scope="scope">
                        <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">编辑
                        </el-button>
                        <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">保存
                        </el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,teamData)">删除</el-button>
                    </template>
            </el-table-column>
        </el-table>
        <!-- 添加项目成员 对话框-->
        <el-dialog title="添加项目成员" :visible.sync="modalAdd" :close-on-click-modal="false">
            <el-form :model="teamForm" :rules="rules" ref="teamForm" label-width="80px">
                <el-form-item label="姓名" prop="userId">
                    <el-select v-model="teamForm.userId" placeholder="请选择姓名" style="width:100%">
                        <el-option v-for="item in proUsers" :key="item.id" :label="item.label" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色" prop="roleId">
                    <el-select v-model="teamForm.roleId" placeholder="请选择角色" style="width:100%">
                        <el-option v-for="item in proRoles" :key="item.id" :label="item.roleName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="添加日期" prop="createDate">
                    <el-date-picker v-model="teamForm.createDate"
                                    type="date"
                                    placeholder="选择日期"
                                    style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modalAdd = false">取 消</el-button>
                <el-button type="danger" @click="confirmAdd('teamForm')">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</div>
</template>

<script>
import tabelHeader from 'components/tabelHeader'
import {changeDate} from 'common/js/config'
import {getTeams, addInsertProjectTeam} from 'api/projectPre'

export default {
    props: {
        proId: {
            type: String,
            default: ''
        },
        proUsers: {
            type: Array,
            default: []
        },
        proRoles: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            modalAdd: false,
            teamData: [],
            teamForm: {
                userId: '',
                roleId: '',
                createDate: new Date(),
                editFlag: false
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }],
                role: [{
                    required: true,
                    message: '请选择角色',
                    trigger: 'blur'
                }],
                date: [{
                    required: true,
                    message: '添加日期',
                    trigger: 'blur'
                }]
            },
            headerInfo_team: {
                desc: '当前项目成员',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            }
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getDatas();
        },
        // 项目成员列表
        getDatas() {
            getTeams(this.$route.params.investProjectId).then(resp => {
                this.teamData = resp.data.result;
            }).catch(e => {
                console.log('getDatas() exists error: ', e);
            })
        },
        // 添加 项目成员的方法
        addTeam() {
            this.teamForm = {
                userId: '',
                roleId: '',
                investProjectId: this.$route.params.investProjectId,
                createDate: new Date(),
                editFlag: false
            }
            this.modalAdd = !this.modalAdd;
        },
        confirmAdd(formName) {
            this.teamForm.createDate= changeDate(this.teamForm.createDate)
            this.teamForm.investProjectId = this.$route.params.investProjectId
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    addInsertProjectTeam(this.teamForm).then((res) => {
                        if(res.status == '200') {
                            this.$Message.success(res.data.message || '添加成功！')
                            this.modalAdd = !this.modalAdd;
                        }
                    }).catch(err => {
                        this.$Message.error(err.data.message || '添加失败！')
                    })
                } else {
                    return false
                }
            });
        },
        checkEdit(index, row) { //编辑
            console.log(row)
            row.editFlag = !row.editFlag;
        },
        //删除当前行
        handleDelete(index, rows) {
            rows.splice(index, 1);
        }
    },
    components: {
        tabelHeader
    }
}
</script>



<style lang="less" scoped>
.table {
    width: 100%;
    height: 100%;
    .teamTable {
        width: 100%;
        height: 100%;
    }
}
</style>
