<template>
    <div>
        <!-- 项目费用  部分 -->
        <div class="fileTable">
            <tabel-header :data="headerInfo_cost" @add="costDialog"></tabel-header>
            <el-table :data="costData" border style="width: 100%" align="center">
                <el-table-column label="费用类型" prop="costSort" align="center">
                </el-table-column>
                <el-table-column label="金额（元）" prop="money" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="EditCost(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,costData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加项目费用 对话框-->
            <el-dialog title="添加项目费用" :visible.sync="costAdd1" :close-on-click-modal="false">
                <el-form :model="costForm1" :label-width="formLabelWidth">
                    <el-form-item label="费用类型">
                        <el-input v-model="costForm1.costSort" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="金额（元）">
                        <el-input v-model="costForm1.money" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="costAdd1 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmCostAdd1">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 编辑项目费用 对话框-->
            <el-dialog title="编辑项目费用" :visible.sync="costAdd2" :close-on-click-modal="false">
                <el-form :model="costForm2" :data="costForm2" :label-width="formLabelWidth">
                    <el-form-item porp="costSort" label="费用类型">
                        <el-input v-model="costForm2.costSort" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item porp="money" label="金额（元）">
                        <el-input v-model="costForm2.money" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="costAdd2 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmCostAdd2(isSave)">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <!-- 项目合同 部分 -->
        <div class="fileTable">
            <tabel-header :data="headerInfo_contract" @add="contractDialog" class="title"></tabel-header>
            <el-table :data="contractData" border style="width: 100%" align="center">
                <el-table-column label="合同名称" prop="contractName" align="center">
                </el-table-column>
                <el-table-column label="签约日期" prop="date" align="center">
                </el-table-column>
                <el-table-column label="合同金额（元）" prop="money" align="center">
                </el-table-column>
                <el-table-column label="股权占比（%）" prop="percent" align="center">
                </el-table-column>
                <el-table-column label="合同附件" prop="appendix" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="EditContract(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,contractData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加项合同 对话框-->
            <el-dialog title="添加项目合同" :visible.sync="contractAdd1" :close-on-click-modal="false">
                <el-form :model="contractForm1" :label-width="formLabelWidth">
                    <el-form-item label="合同名称">
                        <el-input v-model="contractForm1.contractName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="签约日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="contractForm1.date" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="合同金额（元）">
                        <el-input v-model="contractForm1.money" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="股权占比（%）">
                        <el-input v-model="contractForm1.percent" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="合同附件">
                        <!-- action 上传的地址，必填 -->
                        <Upload multiple type="drag" :before-upload="handleUpload" action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="contractAdd1 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmContractAdd1">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 编辑项目合同 对话框-->
            <el-dialog title="编辑项目合同" :visible.sync="contractAdd2" :close-on-click-modal="false">
                <el-form :model="contractForm2" :label-width="formLabelWidth">
                    <el-form-item label="合同名称">
                        <el-input v-model="contractForm2.contractName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="签约日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="contractForm2.date" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="合同金额（元）">
                        <el-input v-model="contractForm2.money" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="股权占比（%）">
                        <el-input v-model="contractForm2.percent" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="合同附件">
                        <!-- action 上传的地址，必填 -->
                        <Upload multiple type="drag" :before-upload="handleUpload" action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="contractAdd2 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmContractAdd2">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <!-- 投资支付 部分 -->
        <div class="fileTable">
            <tabel-header :data="headerInfo_paid" @add="paidDialog" class="title"></tabel-header>
            <el-table :data="paidData" border style="width: 100%" align="center">
                <el-table-column label="基金名称" prop="foundName" align="center">
                </el-table-column>
                <el-table-column label="投资金额（元）" prop="capitalMoney" align="center">
                </el-table-column>
                <el-table-column label="股权占比（%）" prop="percent" align="center">
                </el-table-column>
                <el-table-column label="实缴金额（元）" prop="paidMoney" align="center">
                </el-table-column>
                <el-table-column label="支付日期" prop="paidDate" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="EditPaid(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,paidData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加投资支付 对话框-->
            <el-dialog title="添加投资支付" :visible.sync="paidAdd1" :close-on-click-modal="false">
                <el-form :model="paidForm1" :label-width="formLabelWidth">
                    <el-form-item label="基金名称">
                        <el-input v-model="paidForm1.foundName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="投资金额（元）">
                        <el-input v-model="paidForm1.capitalMoney" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="股权占比（%）">
                        <el-input v-model="paidForm1.percent" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="实缴金额（元）">
                        <el-input v-model="paidForm1.paidMoney" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="支付日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="paidForm1.paidDate" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="paidAdd1 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmPaidAdd1">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 编辑投资支付 对话框-->
            <el-dialog title="编辑投资支付" :visible.sync="paidAdd2" :close-on-click-modal="false">
                <el-form :model="paidForm2" :label-width="formLabelWidth">
                    <el-form-item label="基金名称">
                        <el-input v-model="paidForm2.foundName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="投资金额（元）">
                        <el-input v-model="paidForm2.capitalMoney" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="股权占比（%）">
                        <el-input v-model="paidForm2.percent" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="实缴金额（元）">
                        <el-input v-model="paidForm2.paidMoney" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="支付日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="paidForm2.paidDate" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="paidAdd2 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmPaidAdd2">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <!--  项目分红 部分-->
        <div class="fileTable">
            <tabel-header :data="headerInfo_sharing" @add="sharingDialog" class="title"></tabel-header>
            <el-table :data="sharingData" border style="width: 100%" align="center">
                <el-table-column label="基金名称" prop="foundName" align="center">
                </el-table-column>
                <el-table-column label="投资金额（元）" prop="capitalMoney" align="center">
                </el-table-column>
                <el-table-column label="股权占比（%）" prop="percent" align="center">
                </el-table-column>
                <el-table-column label="分红金额（元）" prop="sharingMoney" align="center">
                </el-table-column>
                <el-table-column label="分红日期" prop="sharingDate" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="EditSharing(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,sharingData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加项目分红 对话框-->
            <el-dialog title="添加项目分红" :visible.sync="sharingAdd1" :close-on-click-modal="false">
                <el-form :model="sharingForm1" :label-width="formLabelWidth">
                    <el-form-item label="基金名称">
                        <el-input v-model="sharingForm1.foundName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="投资金额（元）">
                        <el-input v-model="sharingForm1.capitalMoney" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="股权占比（%）">
                        <el-input v-model="sharingForm1.percent" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="分红金额（元）">
                        <el-input v-model="sharingForm1.sharingMoney" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="分红日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="sharingForm1.sharingDate" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="sharingAdd1 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmSharingAdd1">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 编辑项目分红 对话框-->
            <el-dialog title="编辑项目分红" :visible.sync="sharingAdd2" :close-on-click-modal="false">
                <el-form :model="sharingForm2" :label-width="formLabelWidth">
                    <el-form-item label="基金名称">
                        <el-input v-model="sharingForm2.foundName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="投资金额（元）">
                        <el-input v-model="sharingForm2.capitalMoney" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="股权占比（%）">
                        <el-input v-model="sharingForm2.percent" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="分红金额（元）">
                        <el-input v-model="sharingForm2.sharingMoney" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="分红日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="sharingForm2.sharingDate" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="sharingAdd2 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmSharingAdd2">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <!-- 项目退出 部分 -->
        <div class="fileTable">
            <tabel-header :data="headerInfo_outing" @add="outingDialog" class="title"></tabel-header>
            <el-table :data="outingData" border style="width: 100%" align="center">
                <el-table-column label="合同名称" prop="contractName" align="center">
                </el-table-column>
                <el-table-column label="合同金额（元）" prop="contractMoney" align="center">
                </el-table-column>
                <el-table-column label="退出类型" prop="outingSort" align="center">
                </el-table-column>
                <el-table-column label="退出金额（元）" prop="outingMoney" align="center">
                </el-table-column>
                <el-table-column label="回款日期" prop="cashDate" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="EditOuting(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,outingData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加项目退出 对话框-->
            <el-dialog title="添加项目退出" :visible.sync="outingAdd1" :close-on-click-modal="false">
                <el-form :model="outingForm1" :label-width="formLabelWidth">
                    <el-form-item label="合同名称">
                        <el-input v-model="outingForm1.contractName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="合同金额（元）">
                        <el-input v-model="outingForm1.contractMoney" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="退出类型">
                        <el-input v-model="outingForm1.outingSort" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="退出金额（元）">
                        <el-input v-model="outingForm1.outingMoney" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="回款日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="outingForm1.cashDate" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="outingAdd1 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmOutingAdd1">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 编辑项目退出 对话框-->
            <el-dialog title="编辑项目退出" :visible.sync="outingAdd2" :close-on-click-modal="false">
                <el-form :model="outingForm2" :label-width="formLabelWidth">
                    <el-form-item label="合同名称">
                        <el-input v-model="outingForm2.contractName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="合同金额（元）">
                        <el-input v-model="outingForm2.contractMoney" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="退出类型">
                        <el-input v-model="outingForm2.outingSort" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="退出金额（元）">
                        <el-input v-model="outingForm2.outingMoney" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="回款日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="outingForm2.cashDate" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="outingAdd2 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmOutingAdd2">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>


<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
import { changeDate } from 'common/js/config'
export default {
    data() {
        return {
            formLabelWidth: '110px',
            costAdd1: false,
            costAdd2: false,
            contractAdd1: false,
            contractAdd2: false,
            paidAdd1: false,
            paidAdd2: false,
            sharingAdd1: false,
            sharingAdd2: false,
            outingAdd1: false,
            outingAdd2: false,
            //项目费用
            costForm1: {
                costSort: '',
                money: ''
            },
            costForm2: {
                costSort: '',
                money: ''
            },
            costData: [{
                costSort: '',
                money: '2000'
            },
            {
                costSort: '',
                money: '1000'
            }],
            headerInfo_cost: {
                desc: '项目费用',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            // 项目合同
            contractForm1: {
                contractName: '',
                date: '',
                money: '',
                percent: ''
            },
            contractForm2: {
                contractName: '',
                date: '',
                money: '',
                percent: ''
            },
            contractData: [{
                contractName: '',
                date: '2017-08-09',
                money: '',
                percent: '',
                appendix: ''
            }],
            headerInfo_contract: {
                desc: '项目合同',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            //投资支付
            paidForm1: {
                foundName: '',
                capitalMoney: '',
                percent: '',
                paidMoney: '',
                paidDate: ''
            },
            paidForm2: {
                foundName: '',
                capitalMoney: '',
                percent: '',
                paidMoney: '',
                paidDate: ''
            },
            paidData: [
                {
                    foundName: 'AA基金',
                    capitalMoney: '',
                    percent: '',
                    paidMoney: '10,000',
                    paidDate: '2017-9-9'
                }, {
                    foundName: 'AA基金',
                    capitalMoney: '',
                    percent: '',
                    paidMoney: '10,000',
                    paidDate: '2017-9-9'
                }
            ],
            headerInfo_paid: {
                desc: '投资支付',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            // 项目分红
            sharingForm1: {
                foundName: '',
                capitalMoney: '',
                percent: '',
                sharingMoney: '',
                sharingDate: ''
            },
            sharingForm2: {
                foundName: '',
                capitalMoney: '',
                percent: '',
                sharingMoney: '',
                sharingDate: ''
            },
            sharingData: [
                {
                    foundName: 'AA基金',
                    capitalMoney: '',
                    percent: '',
                    sharingMoney: '10,000',
                    sharingDate: '2017-9-9'
                }, {
                    foundName: 'CC基金',
                    capitalMoney: '',
                    percent: '',
                    sharingMoney: '10,000',
                    sharingDate: '2017-9-9'
                }
            ],
            headerInfo_sharing: {
                desc: '项目分红',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },

            // 项目退出
            outingForm1: {
                contractName: '',
                contractMoney: '',
                outingSort: '',
                outingMoney: '',
                cashDate: ''
            },
            outingForm2: {
                contractName: '',
                contractMoney: '',
                outingSort: '',
                outingMoney: '',
                cashDate: ''
            },
            outingData: [
                {
                    contractName: '',
                    contractMoney: '',
                    outingSort: '',
                    outingMoney: '10,000',
                    cashDate: '2017-9-9'
                }, {
                    contractName: '',
                    contractMoney: '',
                    outingSort: '',
                    outingMoney: '10,000',
                    cashDate: '2017-9-9'
                }
            ],
            headerInfo_outing: {
                desc: '项目退出',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },

        }
    },
    methods: {
        // 添加 项目费用 的方法
        costDialog() {
            this.costAdd1 = true
        },
        confirmCostAdd1() {
            this.costData.push(this.costForm1);
            this.costForm1 = {};
            this.costAdd1 = false;
        },
        // 编辑 项目费用 的方法
        EditCost(row) {
            console.log(row);
            this.costForm2 = row;
            this.costAdd2 = true;
            this.confirmCostAdd2(row);
        },
        confirmCostAdd2(row) { //确定
            console.log(row);
            if (row) {
                const rows = row;
                return;
            } else if ('undefined') {
                // rows = this.costForm2;
                this.costAdd2 = false;
            }

        },



        // 添加 项目合同 的方法
        contractDialog() {
            this.contractAdd1 = true
        },
        confirmContractAdd1() {
            this.contractForm1.date = changeDate(this.contractForm1.date);
            this.contractData.push(this.contractForm1);
            this.contractForm1 = {};
            this.contractAdd1 = false;
        },
        // 编辑 项目合同 的方法
        EditContract(row) {
            this.contractAdd2 = true;
        },
        confirmContractAdd2() {
            this.contractAdd2 = false;
        },


        // 添加 投资支付 的方法
        paidDialog() {
            this.paidAdd1 = true
        },
        confirmPaidAdd1() {
            this.paidForm1.paidDate = changeDate(this.paidForm1.paidDate);
            this.paidData.push(this.paidForm1);
            this.paidForm1 = {};
            this.paidAdd1 = false;
        },
        // 编辑 投资支付 的方法
        EditPaid(row) {
            this.paidAdd2 = true;
        },
        confirmPaidAdd2() {
            this.paidAdd2 = false;
        },


        // 添加 项目分红 的方法
        sharingDialog() {
            this.sharingAdd1 = true
        },
        confirmSharingAdd1() {
            this.sharingForm1.sharingDate = changeDate(this.sharingForm1.sharingDate);
            this.sharingData.push(this.sharingForm1);
            this.sharingForm1 = {};
            this.sharingAdd1 = false;
        },
        // 编辑 项目分红 的方法
        EditSharing(row) {
            this.sharingAdd2 = true;
        },
        confirmSharingAdd2() {
            this.sharingAdd2 = false;
        },


        // 添加 项目退出 的方法
        outingDialog() {
            this.outingAdd1 = true
        },
        confirmOutingAdd1() {
            this.outingForm1.cashDate = changeDate(this.outingForm1.cashDate);
            this.outingData.push(this.outingForm1);
            this.outingForm1 = {};
            this.outingAdd1 = false;
        },
        // 编辑 项目退出 的方法
        EditOuting(row) {
            this.outingAdd2 = true;
        },
        confirmOutingAdd2() {
            this.outingAdd2 = false;
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
.fileTable {
    .title {
        margin-top: 30px;
    }
    width: 100%;
    height: 100%;
}
</style>
