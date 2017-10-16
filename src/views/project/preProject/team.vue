<template>
    <div class="table">
        <div class="teamTable">
            <tabel-header :data="headerInfo_team" @add="addTeam"></tabel-header>
            <el-table :data="teamData" border style="width: 100%">
                <el-table-column label="姓名" prop="userName" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.userName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="角色" prop="roleName" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.roleName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="添加日期" prop="createDate" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,teamData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加项目成员 对话框-->
            <el-dialog title="添加项目成员" :visible.sync="modalAdd" :close-on-click-modal="false">
                <el-form :model="teamForm" :rules="rules" ref="teamForm" label-width="80px">
                    <el-form-item label="姓名" prop="userId">
                        <el-select v-model="teamForm.userId" placeholder="请选择姓名" style="width:100%">
                            <el-option v-for="item in proUsers" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="角色" prop="roleId">
                        <el-select v-model="teamForm.roleId" placeholder="请选择角色" style="width:100%">
                            <el-option v-for="item in proRoles" :key="item.id" :label="item.roleName" :value="item.id">
                            </el-option>
                        </el-select>
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
import { changeDate } from 'common/js/config'
import { getTeams, addInsertProjectTeam, delTeam } from 'api/projectPre'

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
                userId: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }],
                roleId: [{
                    required: true,
                    message: '请选择角色',
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
                editFlag: false
            }
            this.modalAdd = !this.modalAdd;
        },
        confirmAdd(formName) {
            this.teamForm.createDate= changeDate(new Date());
            this.teamForm.investProjectId = this.$route.params.investProjectId
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    addInsertProjectTeam(this.teamForm).then((res) => {
                        if (res.status == '200') {
                            this.$Message.success(res.data.message || '添加成功！')
                            this.modalAdd = !this.modalAdd;
                            this.teamForm = {};
                            this.getDatas();
                        }
                    }).catch(err => {
                        this.$Message.error(err.data.message || '添加失败！')
                    })
                } else {
                    return false
                }
            });
        },
        //删除当前行
        handleDelete(index, rows) {
            delTeam(rows[index].id).then((res) => {
                if (res.status == '200') {
                    this.$Message.success(res.data.message || '删除成功！');
                    this.getDatas();
                }
            });
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
