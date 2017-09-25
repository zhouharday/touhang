<template>
    <div class="table">
        <div class="teamTable">
            <tabel-header :data="headerInfo_team" @add="addTeam"></tabel-header>
            <el-table :data="teamData" border style="width: 100%">
                <el-table-column label="姓名" prop="name" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.name }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-select v-model="scope.row.name" style="width:100%">
                                <el-option v-for="item in  nameOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="角色" prop="role" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.role }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-select v-model="scope.row.role" style="width:100%">
                                <el-option v-for="item in  roleOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="添加日期" prop="date" align="center">
                    <!-- <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.date }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-date-picker type="date" placeholder="选择日期" v-model="scope.row.date" style="width: 100%;">
                            </el-date-picker>
                        </span>
                    </template> -->
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
            <!-- 添加融资信息 对话框-->
            <el-dialog title="添加项目成员" :visible.sync="modalAdd" :close-on-click-modal="false">
                <el-form :model="teamForm" :rules="rules" ref="teamForm" label-width="80px">
                    <el-form-item label="姓名" prop="name">
                        <el-select v-model="teamForm.name" placeholder="请选择姓名" style="width:100%">
                            <el-option v-for="item in nameOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="角色" prop="role">
                        <el-select v-model="teamForm.role" placeholder="请选择角色" style="width:100%">
                            <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="添加日期" prop="date">
                        <el-input placeholder="默认当前日期" v-model="teamForm.date" style="width: 100%;">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAdd = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAdd('teamForm')">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import tabelHeader from 'components/tabelHeader'
import { changeDate } from 'common/js/config'
import { getTeams } from 'api/projectPre';

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
    watch: {
        proUsers(val, oldVal) {
            // console.log('team val, oldVal', val, oldVal);
            this.initInfo();
        }
    },
    data() {
        return {
            modalAdd: false,
            teamData: [
                {
                    name: '张三',
                    role: '',
                    date: '',
                    editFlag: false
                }
            ],
            teamForm: {
                name: '',
                role: '',
                date: '',
                editFlag: false
            },
            nameOptions: [
                { //姓名列表
                    value: '选项1',
                    label: '王二'
                }
            ],
            roleOptions: [
                { //角色列表
                    value: '选项1',
                    label: '角色一'
                }
            ],
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                role: [
                    { required: true, message: '请选择角色', trigger: 'blur' }
                ],
                date: [
                    { required: true, message: '添加日期', trigger: 'blur' }
                ]
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
        init () {
            this.getDatas();
        },
        initInfo() {
            let proUsers = this.proUsers;
            let proRoles = this.proRoles;
            
            this.handleToOptions(proUsers);
            this.handleToOptions(proRoles);

            this.nameOptions = proUsers;
            this.roleOptions = proRoles;
        },
        handleToOptions(datas = []) {
            datas.forEach(item => {
                item.value = item.id;
                item.label = item.name;
            })   
            return datas;         
        },
        // 项目成员列表
        getDatas() {
            getTeams(this.proId).then(resp => {
                // console.log('getTeams resp', resp);
                let data = resp.data;
                let result = data.result;
                this.teamData = result;               
            }).catch(e => {
                console.log('getDatas() exists error: ', e);
            })
        },
        // 添加 项目成员的方法
        addTeam() {
            let new_teamForm = {
                name: '',
                role: '',
                date: '',
                editFlag: false
            };
            this.teamForm = new_teamForm;
            this.modalAdd = !this.modalAdd;
        },
        confirmAdd(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.teamForm.date = changeDate(this.teamForm.date);
                    this.teamData.push(this.teamForm);
                    this.modalAdd = !this.modalAdd;
                } else {
                    return false;
                }
            });
        },
        checkEdit(index, row) { //编辑
            // console.log(row)
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
