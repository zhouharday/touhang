<template>
<!-- 运营管理页面 -->
<div class="manage">
    <Tabs value="fundCost">
        <TabPane label="基金费用" name="fundCost" class="aaa">
            <tabel-header :data="costInfo" @method="methodCost"></tabel-header>
            <el-table :data="costData" border style="width: 100%">
                <el-table-column label="费用类型" prop="label">
                </el-table-column>
                <el-table-column label="费率（%）" prop="percent">
                </el-table-column>
                <el-table-column label="金额（元）" prop="amount">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                       <el-button type="text" size="small">编辑</el-button>
                       <el-button type="text" size="small">删除</el-button>
                   </template>
                </el-table-column>
            </el-table>
        </TabPane>
        <TabPane label="收益分配" name="income">
            <tabel-header :data="incomeInfo" @method="methodIncome"></tabel-header>
            <el-table :data="incomeData" border style="width: 100%">
                <el-table-column label="投资者" prop="investor">
                </el-table-column>
                <el-table-column label="认缴金额（元）" prop="paid">
                </el-table-column>
                <el-table-column label="出资占比（%）" prop="percent">
                </el-table-column>
                <el-table-column label="分配金额（元）" prop="amount">
                </el-table-column>
                <el-table-column label="分配日期" prop="date">
                </el-table-column>
                <el-table-column label="操作">
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
                <el-input v-model="formCost.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="费率" :label-width="formLabelWidth">
                <el-input placeholder="请输入内容" v-model="formCost.rate">
                    <template slot="append">%</template>
                </el-input>
            </el-form-item>
            <el-form-item label="金额" :label-width="formLabelWidth">
                <el-input placeholder="请输入内容" v-model="formCost.amount">
                    <template slot="append">(元)</template>
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="modalCost = false">取 消</el-button>
            <el-button type="primary" @click="confirmCost">确 定</el-button>
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
                            v-for="(item, index) in formIncome.incomeDis">
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
            <el-button type="primary" @click="confirmIncome">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            costInfo: {
                desc: '基金费用',
                icon_b: 'plus-round',
                explain_b: '添加'
            },
            incomeInfo: {
                desc: '收益分配',
                icon_b: 'plus-round',
                explain_b: '添加'
            },
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
