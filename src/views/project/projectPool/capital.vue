<template>
    <div class="table">
        <div class="capitalTable">
            <tabel-header :data="headerInfo_capital" @add="method"></tabel-header>
            <el-table :data="capitalData" border style="width: 100%">
                <el-table-column label="融资轮次" prop="round" align="center">
                </el-table-column>
                <el-table-column label="融资方式" prop="way" align="center">
                </el-table-column>
                <el-table-column label="本轮融资金额（元）" prop="capital" align="center">
                </el-table-column>
                <el-table-column label="融资日期" prop="date" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,capitalData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加融资信息 对话框-->
            <el-dialog title="添加融资信息" :visible.sync="modalAdd1" :close-on-click-modal="false">
                <el-form :model="capitalForm1">
                    <el-form-item label="融资轮次" :label-width="formLabelWidth">
                        <el-input v-model="capitalForm1.round" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="融资方式" :label-width="formLabelWidth">
                        <el-input v-model="capitalForm1.way" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="本轮融资金额（元）" :label-width="formLabelWidth">
                        <el-input v-model="capitalForm1.capital" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="融资日期" :label-width="formLabelWidth">
                        <!-- <el-input v-model="capitalForm1.date" auto-complete="off"></el-input> -->
                        <el-date-picker type="date" placeholder="融资日期" v-model="capitalForm1.date" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAdd1 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAdd1">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 编辑融资信息 对话框-->
            <el-dialog title="编辑融资信息" :visible.sync="modalAdd2" :close-on-click-modal="false">
                <el-form :model="capitalForm2">
                    <el-form-item label="融资轮次" :label-width="formLabelWidth">
                        <el-input v-model="capitalForm2.round" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="融资方式" :label-width="formLabelWidth">
                        <el-input v-model="capitalForm2.way" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="本轮融资金额（元）" :label-width="formLabelWidth">
                        <el-input v-model="capitalForm2.capital" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="融资日期" :label-width="formLabelWidth">
                        <el-input v-model="capitalForm2.date" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAdd2 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAdd2">确 定</el-button>
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
            modalAdd1: false,
            modalAdd2: false,
            formLabelWidth: '80px',
            capitalData: [
                {
                    round: '',
                    way: '',
                    capital: '',
                    date: ''
                },
                {
                    round: '',
                    way: '',
                    capital: '',
                    date: ''
                },
                {
                    round: '',
                    way: '',
                    capital: '',
                    date: ''
                }
            ],
            capitalForm1: {
                round: '',
                way: '',
                capital: '',
                date: ''
            },
            capitalForm2: {
                round: '',
                way: '',
                capital: '',
                date: ''
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
        method() {
            this.modalAdd1 = true;
        },
        confirmAdd1() {
            this.modalAdd1 = false;
            this.capitalForm1.date = changeDate(this.capitalForm1.date);
            this.capitalData.push(this.capitalForm1);
            this.clearVal1();
        },
        //编辑 融资信息的方法
        handleEdit(row) {
            this.modalAdd2 = true;
        },
        confirmAdd2() {
            this.modalAdd2 = false;
        },
        //删除当前行
        handleDelete(index, rows) {
            rows.splice(index, 1);
        },
        //清除 添加融资信息对话框
        clearVal1() {
            this.capitalForm1 = {
                round: '',
                way: '',
                capital: '',
                date: ''
            }
        },
        //清除 编辑融资信息对话框
        clearVal2() {
            this.capitalForm2 = {
                round: '',
                way: '',
                capital: '',
                date: ''
            }
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
    .capitalTable {
        width: 100%;
        height: 100%;
    }
}
</style>