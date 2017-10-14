<template>
<!-- 运营管理页面 -->
<div class="manage">
    <Tabs value="fundCost" @on-click="changeTabs">
        <TabPane label="基金费用" name="fundCost">
            <tabel-header :data="costInfo" @add="methodCost"></tabel-header>
            <el-table :data="costData" border :show-summary="true" style="width: 100%">
                <el-table-column label="费用类型" prop="feeTypeId" align="center">
                </el-table-column>
                <el-table-column label="费率（%）" prop="feeRate" align="center">
                </el-table-column>
                <el-table-column label="金额（元）" prop="feeMoney" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                       <el-button type="text" size="small"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                       <el-button type="text" size="small"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                   </template>
                </el-table-column>
            </el-table>
        </TabPane>
        <TabPane label="收益分配" name="income">
            <tabel-header :data="incomeInfo" @add="methodIncome"></tabel-header>
            <el-table :data="incomeData" border style="width: 100%">
                <el-table-column label="分配日期" prop="shareDate" align="center">
                </el-table-column>
                <el-table-column label="分配总额" prop="allocationMoney" align="center">
                </el-table-column>
                <el-table-column label="经办人" prop="handleName" align="center">
                </el-table-column>
                <el-table-column label="经办日期" prop="handleDate" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                       <el-button type="text" size="small">编辑</el-button>
                       <el-button type="text" size="small">删除</el-button>
                   </template>
                </el-table-column>
            </el-table>
        </TabPane>
    </Tabs>

    <!-- 添加基金费用-->
    <el-dialog title="基金费用" :visible.sync="modalCost" :close-on-click-modal="false">
        <el-form :model="formCost">
            <el-form-item label="费用类型" :label-width="formLabelWidth">
                <el-input v-model="formCost.feeTypeId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="费率(%)" :label-width="formLabelWidth">
                <el-input placeholder="请输入内容" v-model="formCost.feeRate">
                </el-input>
            </el-form-item>
            <el-form-item label="金额(元)" :label-width="formLabelWidth">
                <el-input placeholder="请输入内容" v-model="formCost.feeMoney">
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="modalCost = false">取 消</el-button>
            <el-button type="danger" @click="confirmCost">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 添加收益分配-->
    <el-dialog title="AAAA基金收益分配" :visible.sync="modalIncome" :close-on-click-modal="false">
        <el-form :model="modeIncome">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="分配日期" :label-width="formLabelWidth">
                        <el-date-picker type="date" placeholder="选择日期" v-model="formIncome.date" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="分配总额（元）" :label-width="formLabelWidth" width="100">
                        <el-input v-model="formIncome.total" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="分配明细" :label-width="formLabelWidth">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formIncome.detailed">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" style="padding-left:20px;">
                    <el-row :gutter="20" style="margin-bottom: 22px;">
                        <el-col :span="6">投资者</el-col>
                        <el-col :span="6">认缴金额（元）</el-col>
                        <el-col :span="6">出资占比（%）</el-col>
                        <el-col :span="6">分配金额（元）</el-col>
                    </el-row>
                    <el-row :gutter="20" style="margin-bottom: 22px;"
                            v-for="(item, index) in formIncome.incomeDis" :key="item.index">
                        <el-col :span="6">
                            <el-input v-model="formIncome.incomeDis[index].investor" placeholder="请输入内容"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input v-model="formIncome.incomeDis[index].pay" placeholder="请输入内容"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input v-model="formIncome.incomeDis[index].prec" placeholder="请输入内容"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input v-model="formIncome.incomeDis[index].dists" placeholder="请输入内容"></el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="经办人" :label-width="formLabelWidth" width="100">
                        <el-input v-model="formIncome.person" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="经办日期" :label-width="formLabelWidth">
                        <el-date-picker type="date" placeholder="选择日期" v-model="formIncome.handling" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="modalIncome = false">取 消</el-button>
            <el-button type="danger" @click="confirmIncome">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
import {getFundAllocationList, updateFundFee} from 'api/fund'
export default {
    props: {
        costData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            costInfo: {
                desc: '基金费用',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            incomeInfo: {
                desc: '收益分配',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            incomeData: [],
            formLabelWidth: '100px',
            modalCost: false,
            modalIncome: false,
            formCost: {
                name: '',
                rate: '',
                amount: ''
            },
            formIncome: {
                date: '',
                total: '',
                detailed: '',
                incomeDis: [{
                    investor: '张三',
                    pay: '10000',
                    prec: '0.02%',
                    dists: '200'
                }, {
                    investor: '张三',
                    pay: '10000',
                    prec: '0.02%',
                    dists: '200'
                }],
                person: '',
                handling: ''
            }
        }
    },
    methods: {
        methodCost() {
            this.modalCost = true
        },
        methodIncome() {
            this.modalIncome = true
        },
        confirmIncome() {
            console.log(this.tableData)
        },
        changeTabs(name) {
            if(name == 'income') {
                getFundAllocationList(this.$route.params.id).then((res) => {
                    if(res.status == '200') {
                        console.log(res)
                        this.incomeData = res.data.result
                    }
                })
            }
        },
        handleEdit(index, row) { // 编辑按钮
            this.modalCost = true
            this.formCost = row
        },
        confirmCost() {
            updateFundFee(this.formCost).then((res) => {
                if(res.status == '200') {
                    this.$Message.success(res.data.message || '修改成功！')
                    // getFundFeeList(this.$route.params.id).then((res) => {
                    //     if(res.status == '200') {
                    //         this.costData = res.data.result
                    //     }
                    // })
                    this.modalCost = false
                }
            })
        }
    },
    components: {
        tabelHeader
    }
}
</script>

<style lang="less" scoped>
.manage {
    width: 100%;
    height: 100%;
    .el-table {
        .btn_border {
            border-right: 1px solid #ddd;
            border-left: 1px solid #ddd;
            border-radius: 0;
            padding: 0 12px;
        }
    }
}
</style>
