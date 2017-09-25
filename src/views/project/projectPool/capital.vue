<template>
    <div class="table">
        <div class="capitalTable">
            <tabel-header :data="headerInfo_capital" @add="addCapital"></tabel-header>
            <el-table :data="capitalData" border style="width: 100%">
                <el-table-column label="融资轮次" prop="round" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.round }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-select v-model="scope.row.round" placeholder="请选择融资轮次" style="width:100%">
                                <el-option v-for="item in  roundOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="融资方式" prop="way" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.way }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.way"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="本轮融资金额（元）" prop="capital" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.capital }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.capital"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="融资日期" prop="date" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.date }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-date-picker type="date" placeholder="选择融资日期" v-model="scope.row.date" style="width: 100%;">
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
                    <el-form-item label="融资轮次" prop="round">
                        <el-select v-model="capitalForm.round" placeholder="请选择融资轮次" style="width:100%">
                            <el-option v-for="item in roundOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="融资方式" prop="way">
                        <el-input v-model="capitalForm.way" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="本轮融资金额（元）" prop="capital">
                        <el-input v-model="capitalForm.capital" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="融资日期" prop="date">
                        <el-date-picker type="date" placeholder="融资日期" v-model="capitalForm.date" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAdd = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAdd('capitalForm')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script style="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { Message } from 'iview'

import tabelHeader from 'components/tabelHeader'
import { changeDate } from 'common/js/config'
import { getFinances, addFinance, editFinance, delFinance } from 'api/finance'
export default {
    /*
    computed: mapGetters({
        projectData: 'getProjectData'    // 获取项目详情数据
    }),
    */
    props: {
        projectData: {
            type: Object,
            default: {}
        }
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
                round: '天使轮',
                way: '',
                capital: '',
                date: '',
                editFlag: false
            }],
            capitalForm: {
                round: '',
                way: '',
                capital: '',
                date: '',
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
                round: [
                    { required: true, message: '请输入融资轮次', trigger: 'blur' }
                ],
                way: [
                    { required: true, message: '请输入融资方式', trigger: 'blur' }
                ],
                capital: [
                    { required: true, message: '请输入融资金额', trigger: 'blur' }
                ],
                date: [
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
            getFinances(this.enterpriseInfo.id)
                .then(resp => {
                    console.log('resp: ', resp);
                    let data = resp.data;
                    let message = data.message;
                    if (!message) {

                    } else {
                        this.capitalData = [];
                        Message.info(message);
                    }
                }).catch(e => {
                    console.log('getFinances exists error: ', e);
                })
        },
        //添加 融资信息的方法
        addCapital() {
            let new_capitalForm = {
                round: '',
                way: '',
                capital: '',
                date: '',
                editFlag: false
            };
            this.capitalForm = new_capitalForm;
            this.modalAdd = !this.modalAdd;
        },
        confirmAdd(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let capitalForm = this.capitalForm;
                    capitalForm.date = changeDate(capitalForm.date);
                    addFinance({
                        enterpriseId: this.enterpriseInfo.id,
                        projectTurnId: capitalForm.round,
                        financingWayId: capitalForm.way,
                        financingMoney: capitalForm.capital,
                        financingDate: capitalForm.date,
                        versionRecord: new Date().getTime(),
                        merchantId: this.merchantId
                    }).then(resp => {
                        this.capitalData.push(capitalForm);
                        this.modalAdd = !this.modalAdd;
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
            if (type === 'save') { // 编辑
                console.log(index, row);
                let projectData = this.projectData;
                let projectInfo = projectData.projectInfo || {};
                let enterpriseInfo = projectInfo.enterpriseInfo || {};
                editFinance({
                    id: row.id,
                    enterpriseId: enterpriseInfo.id,
                    projectTurnId: row.round,
                    financingWayId: row.way,
                    financingMoney: row.capital,
                    financingDate: row.date
                }).then(resp => {
                    console.log('edit resp: ', resp);

                }).catch(e => {
                    console.log('checkEdit exists error: ', e);
                })
            }
        },
        // 删除当前行
        handleDelete(index, rows = []) {
            let row = rows[index] || {};
            console.log('row: ', row);
            delFinance({
                id: row.id
            }).then(resp => {
                console.log('del resp: ', resp);
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
