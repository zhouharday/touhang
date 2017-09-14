<template>
    <div class="table">
        <div class="capitalTable">
            <tabel-header :data="headerInfo_capital" @add="addCapital"></tabel-header>
            <el-table :data="capitalData" border style="width: 100%">
                <el-table-column label="融资轮次" prop="round" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.round }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.round"></el-input>
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
                        <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">编辑
                        </el-button>
                        <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">保存
                        </el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,capitalData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加融资信息 对话框-->
            <el-dialog title="添加融资信息" :visible.sync="modalAdd" :close-on-click-modal="false">
                <el-form :model="capitalForm" :rules="rules" ref="capitalForm" label-width="140px">
                    <el-form-item label="融资轮次" prop="round">
                        <el-input v-model="capitalForm.round" auto-complete="off"></el-input>
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
import tabelHeader from 'components/tabelHeader'
import { changeDate } from 'common/js/config'
export default {
    data() {
        return {
            modalAdd: false,
            capitalData: [
                {
                    round: '天使轮',
                    way: '',
                    capital: '',
                    date: '',
                    editFlag: false
                }
            ],
            capitalForm: {
                round: '',
                way: '',
                capital: '',
                date: '',
                editFlag: false
            },
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
    methods: {
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
                    this.capitalForm.date = changeDate(this.capitalForm.date);
                    this.capitalData.push(this.capitalForm);
                    this.modalAdd = !this.modalAdd;
                } else {
                    return false;
                }
            });
        },
        checkEdit(index, row) { //编辑
            row.editFlag = !row.editFlag;
        },
        //删除当前行
        handleDelete(index, rows) {
            rows.splice(index, 1);
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