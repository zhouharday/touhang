<template>
<!-- 运营管理页面 -->
<div class="manage">
    <Tabs value="fundCost" @on-click="changeTabs">
        <TabPane label="基金费用" name="fundCost" v-if="haveJurisdiction('GL-JJXQ-JJFY')">
            <tabel-header :data="costInfo" @add="methodCost"></tabel-header>
            <el-table :data="costData" border :show-summary="true" style="width: 100%">
                <el-table-column label="费用类型" align="center">
                    <template scope="scope">
                        <div v-if="scope.row.feeTypeId === 31101">管理费</div>
                        <div v-else-if="scope.row.feeTypeId === 31102">托管费</div>
                        <div v-else-if="scope.row.feeTypeId === 31103">监理费</div>
                        <div v-else="scope.row.feeTypeId === 31104">监管费</div>
                    </template>
                </el-table-column>
                <el-table-column label="费率（%）" align="center">
                    <template scope="scope">
                        <div>{{scope.row.feeRate}}%</div>
                    </template>
                </el-table-column>
                <el-table-column label="金额（元）" prop="feeMoney" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                       <el-button type="text" size="small"
                       @click="handleEdit(scope.$index, scope.row)" v-if="haveJurisdiction('GL-JJXQ-JJFY-BJ')">编辑</el-button>
                       <el-button type="text" size="small"
                       @click="handleDelete(scope.$index, scope.row)" v-if="haveJurisdiction('GL-JJXQ-JJFY-SC')">删除</el-button>
                   </template>
                </el-table-column>
            </el-table>
        </TabPane>
        <TabPane label="收益分配" name="income" v-if="haveJurisdiction('GL-JJXQ-SYFP')">
            <tabel-header :data="incomeInfo" @add="methodIncome"></tabel-header>
            <el-table :data="incomeData" style="width: 100%">
                <el-table-column label="分配日期" align="center">
                    <template scope="scope">
                        <div>{{scope.row.shareDate | formatDate}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="分配总额" prop="allocationMoney" align="center">
                </el-table-column>
                <el-table-column label="经办人" prop="handleName" align="center">
                </el-table-column>
                <el-table-column label="经办日期" align="center">
                    <template scope="scope">
                        <div>{{scope.row.handleDate | formatDate}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                       <el-button type="text" size="small" @click="editIncomeDis(scope.$index, scope.row)" v-if="haveJurisdiction('GL-JJXQ-SYFP-BJ')">编辑</el-button>
                       <el-button type="text" size="small" @click="delIncomeDis(scope.$index, scope.row)" v-if="haveJurisdiction('GL-JJXQ-SYFP-SC')">删除</el-button>
                   </template>
                </el-table-column>
            </el-table>
        </TabPane>
    </Tabs>

    <!-- 添加基金费用-->
    <el-dialog title="基金费用" :visible.sync="modalCost" :close-on-click-modal="false">
        <el-form :model="formCost">
            <el-form-item label="费用类型" :label-width="formLabelWidth">
                <el-select v-model="formCost.feeTypeId" style="width:100%">
                    <el-option v-for="(list, index) of costTypes" :key="list.id" :label="list.dicName" :value="list.id">
                    </el-option>
                </el-select>
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
            <el-button @click="cancelCost">取 消</el-button>
            <el-button type="danger" @click="confirmCost">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 添加收益分配-->
    <el-dialog title="收益分配" ref="incomeDialog" :visible.sync="modalIncome" :close-on-click-modal="false" :show-close="false">
        <el-form :model="formIncome" :rules="rules" ref="formIncome">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="标题" :label-width="formLabelWidth">
                        <el-input v-model="formIncome.allocationName" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金名称" :label-width="formLabelWidth" width="100">
                        <el-input :disabled="true" v-model="formIncome.fundName" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="分配日期" :label-width="formLabelWidth">
                        <el-date-picker type="date" placeholder="选择日期" v-model="formIncome.shareDate" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="分配总额" :label-width="formLabelWidth" width="100">
                        <el-input v-model="formIncome.allocationMoney" @change="CalculationAmount" auto-complete="off" autofocus></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="经办人" :label-width="formLabelWidth" width="100">
                        <el-input v-model="formIncome.handleUser" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="经办日期" :label-width="formLabelWidth">
                        <el-date-picker type="date" placeholder="选择日期" v-model="formIncome.handleDate" :disabled="true" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <div class="title_info">分配明细</div>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="investorName" label="投资者" width="180">
                        </el-table-column>
                        <el-table-column prop="subscribeAmount" label="认缴金额（元）" width="180">
                        </el-table-column>
                        <el-table-column prop="contributiveRatio" label="出资占比（%）">
                        </el-table-column>
                        <el-table-column label="分配金额（元）">
                            <template scope="scope">
                                <el-input v-model="scope.row.shareMoney"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelIncomeModel">取 消</el-button>
            <el-button type="danger" @click="confirmIncome" :loading="loadingIncome">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 确认删除模态框 -->
    <delete-reminders @cancel="comfirCancel" @del="comfirmDel" :deleteReminders="deleteReminders"></delete-reminders>
</div>
</template>

<script type="text/ecmascript-6">
import 'common/js/filter'
import {checkFundAuth} from 'common/js/config'
import tabelHeader from 'components/tabelHeader'
import deleteReminders from 'components/deleteReminders'
import {
    getFundAllocationList,
    updateFundFee,
    costType,
    addFundFee,
    getFundFeeList,
    addAllocationInfo,
    addAllocation,
    getFundAllocationDetails,
    updateAllocation,
    deleteAllocation,
    deleteFundFee
} from 'api/fund'
export default {
    props: {
        costData: {
            type: Array,
            default: []
        },
        fundName: {
            type: String,
            default: JSON.parse(sessionStorage.getItem('FUNDNAME'))
        },
        authList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            incomeData: [],
            formLabelWidth: '100px',
            modalCost: false,
            modalIncome: false,
            formCost: {
                fundId: this.$route.params.id,
                feeTypeId: '',
                feeRate: '',
                feeMoney: ''
            },
            addOrEdit: true,
            profit: true,
            name: '', // 删除时维护数据
            fundCostId: '', // 删除时id
            fundValue: this.$route.params.id,
            formIncome: {
                fundName: '',
                allocationName: '', //分配标题
                shareDate: '', //分配日期
                allocationMoney: '', //分配金额
                handleUserId: JSON.parse(sessionStorage.getItem('userInfor')).id, //经办人ID 当前登录用户ID
                documentInfo: [],
                handleUser: JSON.parse(sessionStorage.getItem('userInfor')).name,
                fundId: this.$route.params.id, //基金id
                handleDate: new Date()
            },
            params: [],
            costTypes: [] || JSON.parse(sessionStorage.getItem('costTypes')),
            paramsId: '', // 当前id
            deleteReminders: false, // 确认删除模态框
            constTableDate: [], // 临时数据
            loadingIncome: false // loading 效果防止多次点击
        }
    },
    methods: {
        methodCost() {
            this.modalCost = true
            this.addOrEdit = true
        },
        methodIncome() { // 添加
            this.formIncome.allocationMoney = ''
            this.formIncome.allocationName = this.fundName + '收益分配申请表'
            this.formIncome.fundName = this.fundName
            this.formIncome = Object.assign({}, this.formIncome)
            addAllocationInfo(this.$route.params.id).then((res) => {
                if (res.status === 200) {
                    var tableData = res.data.result
                    tableData.map((x) => {
                        x.shareMoney = ''
                    })
                    this.tableData = tableData
                    this.constTableDate = tableData
                    this.modalIncome = true
                    this.profit = true
                }
            })
        },
        editIncomeDis(index, row) {
            getFundAllocationDetails(row.id).then((res) => {
                if (res.status === 200) {
                    this.modalIncome = true
                    this.profit = false
                    if (res.data.fundAllocation) {
                        this.formIncome = Object.assign({}, this.formIncome, res.data.fundAllocation)
                    }
                    if (res.data.params) {
                        console.log(res.data.params)
                        var formdata = res.data.params
                        this.tableData = formdata.concat()
                    }
                }
            })
        },
        confirmIncome() {
            this.loadingIncome = true
            this.params = []
            console.log(this.tableData)
            this.tableData.map((x) => {
                this.params.push({
                    agreementId: x.agreementId || "",
                    id: x.id,
                    shareMoney: x.shareMoney
                })
            })
            console.log(this.tableData)
            console.log(typeof(this.formIncome.shareDate))
            if (this.formIncome.allocationMoney !== '') {
                if (this.profit === true) {
                    addAllocation({
                        fundAllocation: this.formIncome,
                        params: this.params
                    }).then((res) => {
                        if (res.status == '200') {
                            this.$Message.success(res.data.message || '添加成功！')
                            this.modalIncome = false
                            this._getAllocationList()
                            // this.formIncome = ''
                            this.tableData = this.constTableDate.concat()
                            this.loadingIncome = false
                        }
                    })
                } else {
                    updateAllocation({
                        fundAllocation: this.formIncome,
                        params: this.params
                    }).then((res) => {
                        if (res.status == '200') {
                            this.$Message.success(res.data.message || '编辑成功！')
                            this.modalIncome = false
                            this._getAllocationList()
                            this.formIncome = ''
                        } else if (res.status == '9004') {
                            this.$Message.success(res.data.message || '有投资者退出,无法更改!')
                            this.modalIncome = false
                        }
                        this.tableData = this.constTableDate.concat()
                        this.loadingIncome = false
                        console.log(typeof(this.formIncome.handleDate));
                    })
                }
            } else {
                this.$Message.error('请输入分配金额')
                this.loadingIncome = false
            }
        },
        cancelIncomeModel() { // 取消编辑收益分配
            this.modalIncome = false
            this.formIncome = {
                fundName: '',
                allocationName: '', //分配标题
                shareDate: '', //分配日期
                allocationMoney: '', //分配金额
                handleUserId: JSON.parse(sessionStorage.getItem('userInfor')).id, //经办人ID 当前登录用户ID
                documentInfo: [],
                handleUser: JSON.parse(sessionStorage.getItem('userInfor')).name,
                fundId: this.$route.params.id, //基金id
                handleDate: new Date()
            }
            this.tableData.map((x) => {
                x.shareMoney = ''
            })
        },
        changeTabs(name) {
            if (name == 'income') {
                // console.log(this.fundName)
                this._getAllocationList()
                this._getAssignmentDetails()
            }
        },
        handleEdit(index, row) { // 编辑按钮
            this.modalCost = true
            this.addOrEdit = false
            this.formCost = Object.assign({}, row)
        },
        handleDelete(index, row) { // 删除基金费用
            this.name = 'fundCost' // 确认那个组件调用删除模态框
            this.fundCostId = row.id
            this.deleteReminders = true
        },
        delIncomeDis(index, row) { // 删除收益分配
            this.name = 'income' // 确认那个组件调用删除模态框
            this.paramsId = row.id
            this.deleteReminders = true
        },
        comfirmDel() {
            if (this.name === 'income') {
                deleteAllocation(this.paramsId).then((res) => {
                    if (res.status == '200') {
                        this.$Message.success(res.data.message || '删除成功！')
                        this.deleteReminders = false
                        this._getAllocationList()
                    }
                })
            } else {
                deleteFundFee(this.fundCostId).then((res) => {
                    if (res.status === 200) {
                        this.$Message.success(res.data.message || '删除成功！')
                        this.deleteReminders = false
                        this._getFundFeeList()
                    }
                })
            }
            this.name = ''
        },
        comfirCancel() {
            this.deleteReminders = false
        },
        confirmCost() { // 基金费用确认
            if (this.addOrEdit == false) {
                updateFundFee(this.formCost).then((res) => {
                    if (res.status == '200') {
                        this.$Message.success(res.data.message || '修改成功！')
                        this._getFundFeeList()
                        this.modalCost = false
                        this.formCost = {
                            fundId: this.$route.params.id,
                            feeTypeId: '',
                            feeRate: '',
                            feeMoney: ''
                        }
                    }
                })
            } else {
                addFundFee(this.formCost).then((res) => {
                    if (res.status == '200') {
                        this.$Message.success(res.data.message || '添加基金费用成功！')
                        this._getFundFeeList()
                        this.modalCost = false
                        this.formCost = {
                            fundId: this.$route.params.id,
                            feeTypeId: '',
                            feeRate: '',
                            feeMoney: ''
                        }
                        this.addOrEdit == false
                    }
                })
            }
        },
        cancelCost() { // 基金费用取消
            this.modalCost = false
        },
        CalculationAmount(value) {
            if (value && this.tableData) {
                console.log(value)
                this.tableData.forEach((item) => {
                    item.shareMoney = value * (item.contributiveRatio / 100).toFixed(2)
                })
                console.log(this.tableData)
            }
        },
        _getFundFeeList() {
            getFundFeeList(this.$route.params.id).then((res) => {
                if (res.status == '200') {
                    this.costData = res.data.result
                }
            })
        },
        _getAssignmentDetails() { // 获取收益明细
            addAllocationInfo(this.$route.params.id).then((res) => {
                if (res.status === 200) {
                    var tableData = res.data.result
                    tableData.map((x) => {
                        x.shareMoney = ''
                    })
                    this.tableData = tableData
                    this.constTableDate = tableData
                    console.log(tableData)
                }
            })
        },
        _getAllocationList() {
            getFundAllocationList(this.$route.params.id).then((res) => {
                if (res.status == '200') {
                    this.incomeData = res.data.result
                }
            })
        },
        haveJurisdiction(str) {
            if (!this.authList) {
                return false
            } else {
                if (checkFundAuth(str, this.authList)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    },
    computed: {
        costInfo: function() {
            if (checkFundAuth('GL-JJXQ-JJFY-TJ', this.authList)) {
                return {
                    desc: '基金费用',
                    btnGroup: [{
                        icon: 'plus-round',
                        explain: '添加'
                    }]
                }
            } else {
                return {
                    desc: '基金费用'
                }
            }
        },
        incomeInfo() {
            if (checkFundAuth('GL-JJXQ-SYFP-TJ', this.authList)) {
                return {
                    desc: '收益分配',
                    btnGroup: [{
                        icon: 'plus-round',
                        explain: '添加'
                    }]
                }
            } else {
                return {
                    desc: '收益分配'
                }
            }
        }
    },
    mounted() {
        costType().then((res) => {
            if (res.status == '200') {
                this.costTypes = res.data.result
                window.sessionStorage.setItem('costTypes', JSON.stringify(res.data.result))
            }
        })
    },
    components: {
        tabelHeader,
        deleteReminders
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
    .title_info {
        height: 40px;
        background: rgb(42, 49, 66);
        color: #fff;
        font-size: 18px;
        padding-left: 10px;
        font-weight: 600;
        line-height: 40px;
    }
}
</style>
