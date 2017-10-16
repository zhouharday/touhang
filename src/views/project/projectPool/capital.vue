<template>
    <div class="table">
        <div class="capitalTable">
            <tabel-header :data="headerInfo_capital" @add="addCapital"></tabel-header>
            <el-table :data="capitalData" border style="width: 100%">
                <el-table-column label="融资轮次" prop="projectTurn" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.projectTurn }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-select v-model="scope.row.projectTurnId" placeholder="请选择融资轮次" style="width:100%">
                                <el-option v-for="item in projectTurnType" :key="item.id" :label="item.dicName" :value="item.id">
                                </el-option>
                            </el-select>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="融资方式" prop="financingWay" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.financingWay}}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.financingWay"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="本轮融资金额（元）" prop="financingMoney" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.financingMoney }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.financingMoney"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="融资日期" prop="financingDate" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.financingDate | formatDate}}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-date-picker type="date" placeholder="选择融资日期" v-model="scope.row.financingDate" style="width: 100%;">
                            </el-date-picker>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row, 'edit')">编辑
                        </el-button>
                        <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row, 'save')">保存
                        </el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,capitalData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加融资信息 对话框-->
            <el-dialog title="添加融资信息" :visible.sync="modalAdd" :close-on-click-modal="false">
                <el-form :model="capitalForm" :rules="rules" ref="capitalForm" label-width="140px">
                    <el-form-item label="融资轮次" prop="projectTurnId">
                        <el-select v-model="capitalForm.projectTurnId" placeholder="请选择融资轮次" style="width:100%">
                            <el-option v-for="item in projectTurnType" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="融资方式" prop="financingWay">
                        <el-input v-model="capitalForm.financingWay" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="本轮融资金额（元）" prop="financingMoney">
                        <el-input v-model="capitalForm.financingMoney" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="融资日期" prop="financingDate">
                        <el-date-picker type="date" placeholder="融资日期" v-model="capitalForm.financingDate" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAdd = false">取 消</el-button>
                    <el-button type="danger" @click="confirmAdd('capitalForm')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script style="text/ecmascript-6">
import '../../../common/js/filter'
import { mapGetters } from 'vuex'
import { Message } from 'iview'

import tabelHeader from 'components/tabelHeader'
import { changeDate } from 'common/js/config'
import { getDicChildren } from 'common/js/dictionary'
import { getFinances, addFinance, editFinance, delFinance } from 'api/finance'
export default {
    computed: mapGetters({
        projectData: 'getProjectData',    // 获取项目详情数据
        projectTurnType:'getProjectTurnType',
    }),
    props: {
        projectData: {
            type: Object,
            default: {}
        },
        projectTurnType:[]
    },
    watch: {
        projectData(val, oldVal) {
            this.init();
        }
    },
    data() {
        return {
            modalAdd: false,
            capitalData: [{
                projectTurnId: '天使轮',
                financingWay: '',
                financingMoney: '',
                financingDate: '',
                editFlag: false
            }],
            capitalForm: {
                projectTurnId: '',
                financingWay: '',
                financingMoney: '',
                financingDate: '',
                editFlag: false
            },
            roundOptions: [{ //融资轮次列表
                value: '选项1',
                label: '天使轮'
            }, {
                value: '选项2',
                label: 'A轮'
            }],
            rules: {
                projectTurnId: [
                    { required: true, message: '请选择融资轮次', trigger: 'blur' }
                ],
                financingWay: [
                    { required: true, message: '请输入融资方式', trigger: 'blur' }
                ],
                financingMoney: [
                    { required: true, message: '请输入融资金额', trigger: 'blur' }
                ],
                financingDate: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
                ]
            },
            headerInfo_capital: {
                desc: '融资信息',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            }
        }
    },
    created() {
        this.$store.dispatch('getProjectTurnType')
    },
    methods: {
        init() {
            this.initInfo();
            this.getData();
        },
        initInfo() {
            let merchants = JSON.parse(window.sessionStorage.getItem('merchants') || '[]');
            let info = JSON.parse(sessionStorage.getItem('userInfor') || '{}');
            // console.log('info: ', info);
            this.merchantId = merchants[0].id;
            this.addProjectUserId = info.id;

            this.enterpriseInfo = this.projectData.enterpriseInfo || {};
            // console.log('projectData: ', this.projectData);
        },
        getData() {
            getFinances(this.projectData.projectInfo.id)
                .then(resp => {
                    let data = resp.data;
                    let message = data.message;
                    if (!message) {

                    } else {
                        this.capitalData = data.result || [];
                        //Message.info(message);
                    }
                }).catch(e => {
                    console.log('getFinances exists error: ', e);
                })
        },
        //添加 融资信息的方法
        addCapital() {
            let new_capitalForm = {
                projectTurnId: '',
                financingWay: '',
                financingMoney: '',
                financingDate: '',
                editFlag: false
            };
            this.capitalForm = new_capitalForm;
            this.modalAdd = !this.modalAdd;
        },
        confirmAdd(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let capitalForm = this.capitalForm;
                    capitalForm.date = changeDate(capitalForm.financingDate);
                    addFinance({
                        projectId: this.projectData.projectInfo.id,
                        projectTurnId: capitalForm.projectTurnId,
                        financingWay: capitalForm.financingWay,
                        financingMoney: capitalForm.financingMoney,
                        financingDate: capitalForm.financingDate,
                        merchantId: this.merchantId
                    }).then(resp => {
                        if(resp.data.status == '200'){
                            this.capitalForm = {
                                projectTurnId: '',
                                financingWay: '',
                                financingMoney: '',
                                financingDate: '',
                                editFlag: false
                            };
                            this.modalAdd = !this.modalAdd;
                            this.getData();
                        }else{
                            this.$Message.error(resp.data.message);
                        }
                    }).catch(e => {
                        console.log('addFinance exists error: ', e);
                    })
                } else {
                    return false;
                }
            });
        },
        checkEdit(index, row, type) {
            row.editFlag = !row.editFlag;
            if (type == 'save') { // 编辑
                let projectData = this.projectData;
                editFinance({
                    id: row.id,
                    projectTurnId: row.projectTurnId,
                    financingWay: row.financingWay,
                    financingMoney: row.financingMoney,
                    financingDate: row.financingDate
                }).then(resp => {

                }).catch(e => {
                    console.log('checkEdit exists error: ', e);
                })
            }
            this.capitalData.push();
        },
        // 删除当前行
        handleDelete(index, rows = []) {
            let row = rows[index] || {};
            delFinance(row.id)
            .then(resp => {
                console.log('del resp: ', resp.data.message);
                rows.splice(index, 1);
            }).catch(e => {
                console.log('delFinance exists error: ', e);
            });
        },
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
    .capitalTable {
        width: 100%;
        height: 100%;
    }
}
</style>
