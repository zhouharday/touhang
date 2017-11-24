<template>
    <section class="manage">
        <Tabs value="cost" @on-click="changeTabs">
            <TabPane label="项目费用" name="cost">
                <div class="fileTable">
                    <tabel-header :data="headerInfo_cost"></tabel-header>
                    <el-table :data="costData" border style="width: 100%" align="center">
                        <el-table-column label="费用类型" prop="costType" align="center">
                        </el-table-column>
                        <el-table-column label="金额（元）" prop="amountMoney" align="center">
                            <template scope="scope">{{scope.row.amountMoney | toMoney}}</template>
                        </el-table-column>
                    </el-table>
                </div>
            </TabPane>
            <TabPane label="项目合同" name="contract">
                <!-- 项目合同 部分 -->
                <div class="fileTable">
                    <tabel-header :data="headerInfo_contract"></tabel-header>
                    <el-table :data="contractData" border style="width: 100%" align="center" show-summary>
                        <el-table-column label="合同名称" prop="contractName" align="center">
                            <template scope="scope">
                                <el-button type="text" style="color:#f05e5e" @click="openContract(scope.row,scope.$index)">{{scope.row.contractName}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="签约日期" prop="signDate" align="center">
                        </el-table-column>
                        <el-table-column label="合同金额（元）" prop="contractAmount" align="center">
                            <template scope="scope">{{scope.row.contractAmount | toMoney}}</template>
                        </el-table-column>
                        <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                        </el-table-column>
                    </el-table>
                </div>
            </TabPane>
            <TabPane label="投资支付" name="paid">
                <!-- 投资支付 部分 -->
                <div class="fileTable capitalDialog">
                    <tabel-header :data="headerInfo_paid"></tabel-header>
                    <el-table :data="paidData" border style="width: 100%" align="center" show-summary>
                        <el-table-column label="合同名称" prop="contractName" align="center">
                            <template scope="scope">
                                <el-button type="text" style="color:#f05e5e" @click="openPaid(scope.row,scope.$index)">{{scope.row.contractName}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="合同金额（元）" prop="contractAmount" align="center">
                            <template scope="scope">{{scope.row.contractAmount | toMoney}}</template>
                        </el-table-column>
                        <el-table-column label="支付金额（元）" prop="paidInMoney" align="center">
                            <template scope="scope">{{scope.row.paidInMoney | toMoney}}</template>
                        </el-table-column>
                        <el-table-column label="支付日期" prop="payDate" align="center">
                            <template scope="scope">
                                <div>{{scope.row.payDate | formatDate}}</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </TabPane>
            <TabPane label="项目分红" name="sharing">
                <!-- 项目分红 部分 -->
                <div class="fileTable sharingDialog">
                    <tabel-header :data="headerInfo_sharing"></tabel-header>
                    <el-table :data="sharingData" border style="width: 100%" align="center" show-summary>
                        <el-table-column label="合同名称" prop="contractName" align="center">
                            <template scope="scope">
                                <el-button type="text" style="color:#f05e5e" @click="openSharing(scope.row,scope.$index)">{{scope.row.contractName}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="合同金额（元）" prop="contractAmount" align="center">
                            <template scope="scope">{{scope.row.contractAmount | toMoney}}</template>
                        </el-table-column>
                        <el-table-column label="分红金额（元）" prop="shareAmount" align="center">
                            <template scope="scope">{{scope.row.shareAmount | toMoney}}</template>
                        </el-table-column>
                        <el-table-column label="分红日期" prop="shareDate" align="center">
                        </el-table-column>
                    </el-table>
                </div>
            </TabPane>
        </Tabs>
        <!-- 项目合同详情 对话框-->
        <el-dialog title="项目合同详情" :visible.sync="contractDetails">
            <el-form :model="contractForm1" label-width="110px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同名称">
                            <el-input v-model="contractForm1.contractName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="签约日期">
                            <el-input type="date" v-model="contractForm1.signDate" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同金额（元）">
                            <el-input v-model="contractForm1.contractAmount" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="股权占比（%）">
                            <el-input v-model="contractForm1.stockRatio" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="经办人">
                            <el-input v-model="contractForm1.handlerUserName" placeholder="默认当前登录用户" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="经办日期">
                            <el-input type="date" v-model="contractForm1.handlerDate" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="合同附件">
                            <div class="appendixBox">
                                <p v-for="doc in contractForm1.documentInfo" :key="doc.index">
                                    <a :href="doc.filePath" style="font-size:12px;" :download="doc.fileName">{{doc.fileName}}</a>
                                </p>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="table_title" style="justify-content:space-between;">
                <div class="left" style="width:25.2%">
                    <span class="desc">{{ table_title }}</span>
                </div>
            </div>
            <el-table :data="fundData1" border style="width: 100%" align="center">
                <el-table-column label="基金名称" prop="fundName" align="center">
                </el-table-column>
                <el-table-column label="投资金额（元）" prop="investAmount" align="center">
                    <template scope="scope">{{scope.row.investAmount | toMoney}}</template>
                </el-table-column>
                <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 投资支付详情 对话框-->
        <el-dialog title="投资支付详情" :visible.sync="paidDetails" style="width：65%;">
            <el-form :model="paidForm1" label-width="110px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="标题">
                            <el-input v-model="paidForm1.payTitle" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目合同">
                            <el-input v-model="paidForm1.contractName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="合同附件">
                                <p v-for="item in contractDocument" :key="item.index">
                                    <a :href="item.filePath" style="font-size:12px;" download="item.fileName">{{item.fileName}}</a>
                                </p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同金额（元）">
                            <el-input v-model="paidForm1.contractAmount" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="剩余金额（元）">
                            <el-input v-model="paidForm1.surplusAmount" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="经办人">
                            <el-input v-model="paidForm1.handlerUserName" placeholder="默认当前登录用户" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="支付日期">
                            <el-input type="date" v-model="paidForm1.payDate" disabled style="width: 100%;">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="相关附件">
                            <div class="appendixBox">
                                <p v-for="doc in paidForm1.documentInfo" :key="doc.index">
                                    <a :href="doc.filePath" style="font-size:12px;" :download="doc.fileName">{{doc.fileName}}</a>
                                </p>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="table_title">
                <div class="left" style="width:16.8%">
                    <span class="desc">{{ table_title }}</span>
                </div>
            </div>
            <el-table :data="fundData2" border style="width: 100%" align="center">
                <el-table-column label="基金名称" prop="fundName" align="center">
                </el-table-column>
                <el-table-column label="投资金额（元）" prop="investAmount" align="center">
                </el-table-column>
                <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                </el-table-column>
                <el-table-column label="剩余金额（元）" prop="surplusAmount" align="center">
                </el-table-column>
                <el-table-column label="支付金额（元）" prop="payAmount" align="center">
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 项目分红详情 对话框-->
        <el-dialog title="项目分红详情" :visible.sync="sharingDetails">
            <el-form :model="sharingForm1" label-width="110px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="标题">
                            <el-input v-model="sharingForm1.shareTitle" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目合同">
                            <el-input v-model="sharingForm1.contractName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同金额（元）">
                            <el-input v-model="sharingForm1.contractAmount" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分红金额（元）">
                            <el-input v-model="sharingForm1.shareAmount" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="经办人">
                            <el-input v-model="sharingForm1.handlerUserName" placeholder="默认当前登录用户" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分红日期">
                            <el-input type="date" v-model="sharingForm1.shareDate" placeholder="选择日期" disabled style="width: 100%;">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="相关附件">
                            <div class="appendixBox">
                                <p v-for="doc in sharingForm1.documentInfo" :key="doc.index">
                                    <a :href="doc.filePath" style="font-size:12px;" :download="doc.fileName">{{doc.fileName}}</a>
                                </p>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="table_title">
                <div class="left" style="width:20.3%">
                    <span class="desc">{{ table_title }}</span>
                </div>
            </div>
            <el-table :data="fundData3" border style="width: 100%" align="center">
                <el-table-column label="基金名称" prop="fundName" align="center">
                </el-table-column>
                <el-table-column label="投资金额（元）" prop="investAmount" align="center">
                </el-table-column>
                <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                </el-table-column>
                <el-table-column label="分红金额（元）" prop="shareAmount" align="center">
                </el-table-column>
            </el-table>
        </el-dialog>
    </section>
</template>

<script>
import 'common/js/filter'
import { mapGetters } from 'vuex'
import tabelHeader from 'components/tabelHeader'
import { getDicChildren } from 'common/js/dictionary'
import { changeDate } from 'common/js/config'
import {
    delGu, fees,
    contracts, getContractDetail,
    getContractPay, getContractPayDetail,
    getParticipationList, getParticipationDetail
} from 'api/projectPre';

export default {
    computed: mapGetters({
        costSortOptions: 'getCostSortOptions',   // 获取费用类型
        myFundOptions: 'getMyFundOptions'    //本商户的可签约基金列表
    }),
    props: {
        tabs: {
            type: Object,
            default: {}
        },
        proId: {
            type: String,
            default: ''
        },
        authList: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            activeNames: ['1'],
            table_title: '出资主体',
            contractDetails: false,
            paidDetails: false,
            sharingDetails: false,
            //项目费用
            headerInfo_cost: {
                desc: '项目费用'
            },
            costData: [],
            // 项目合同
            headerInfo_contract: {
                desc: '项目合同'
            },
            contractData: [],
            contractForm1: {},
            fundData1: [],
            //投资支付
            headerInfo_paid: {
                desc: '投资支付'
            },
            paidData: [],
            paidForm1: {},
            contractDocument: [],
            fundData2: [],
            // 项目分红
            headerInfo_sharing: {
                desc: '项目分红'
            },
            sharingData: [],
            sharingForm1: {},
            fundData3: []
        }
    },
    created() {
        this.$store.dispatch('getCostSortOptions')
        this.$store.dispatch('getMyFundOptions')
    },
    watch: {
        'tabs': function(to, from) {
            if (to.tabList[3]) {
                this.init();
            }
        }
    },
    methods: {
        init() {
            this.getFee();
            this.getContract();
            this.getContractPay();
            this.getParticipation();
        },
        //获取费用列表
        getFee() {
            fees(this.proId).then(resp => {
                if (resp.data.status === '200') {
                    this.costData = resp.data.result;
                } else if (resp.data.status === '49999') {
                    this.costData = [];
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('getFee() exists error: ', e);
            })
        },
        //获取合同列表
        getContract() {
            contracts(this.proId).then(resp => {
                if (resp.data.status === '200') {
                    this.contractData = resp.data.result;
                } else if (resp.data.status === '49999') {
                    this.contractData = [];
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('contracts() exists error: ', e);
            })
        },
        // 获取项目合同详情
        openContract(row, index) {
            getContractDetail(row.id).then(resp => {
                if (resp.data.status == '200') {
                    this.contractDetails = !this.contractDetails;
                    this.contractForm1 = resp.data.result.projectContract;
                    this.fundData1 = resp.data.result.fundInfo;
                    this.fundData1.forEach(function(item, index) {
                        let fund = {
                            id: item.fundId,
                            fundName: item.fundName
                        };

                        item.fund = fund;
                    });
                    this.fundData1.push();
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('addContract() exists error: ', e);
            })
        },
        //获取投资支付列表
        getContractPay() {
            getContractPay(this.proId).then(resp => {
                if (resp.data.status === '200') {
                    this.paidData = resp.data.result.list;
                } else if (resp.data.status === '49999') {
                    this.paidData = [];
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('getContractPay() exists error: ', e);
            })
        },
        // 获取投资支付详情
        openPaid(row, index) {
            getContractPayDetail(row.id).then(resp => {
                console.log('打开编辑投资支付: ' + JSON.stringify(resp.data));
                if (resp.data.status == '200') {
                    this.paidForm1 = resp.data.result.projectInvestPay;
                    this.contractDocument = resp.data.result.projectInvestPay.contractDocument;
                    this.fundData2 = resp.data.result.payDetails;
                    this.paidDetails = !this.paidDetails;
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('getContractPayDetail() exists error: ', e);
            })
        },
        //获取项目分红列表
        getParticipation() {
            getParticipationList(this.proId).then(resp => {
                if (resp.data.status === '200') {
                    this.sharingData = resp.data.result.list;
                } else if (resp.data.status === '49999') {
                    this.sharingData = [];
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('getParticipationList() exists error: ', e);
            })
        },
        // 获取项目分红详情
        openSharing(row, index) {
            getParticipationDetail(row.id).then(resp => {
                console.log('打开编辑项目分红: ' + JSON.stringify(resp.data));
                if (resp.data.status == '200') {
                    this.sharingForm1 = resp.data.result.projectParticipation;
                    this.fundData3 = resp.data.result.participationDetails;
                    this.sharingDetails = !this.sharingDetails;
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('getParticipationDetail() exists error: ', e);
            })
        }
    },
    components: {
        tabelHeader
    }
}
</script>




<style lang="less" scoped>
.fileTable {
    width: 100%;
    height: 100%;
}

// 附件样式
.appendixBox {
    width: 100%;
    min-height: 35px;
    padding: 3px 10px;
    background: #eef1f6;
    border-radius: 4px;
    border: 1px solid #ddd;
    >p {
        height: 20px;
        line-height: 20px;
    }
}

.table_title {
    width: 100%;
    height: 41px;
    display: flex;
    line-height: 41px;
    border: 1px solid #dfe6ec;
    border-bottom: none;
    background: #eef1f6;
    .left {
        text-align: center; // border-right: 1px solid #dfe6ec;
        // box-sizing: border-box;
        .desc {
            font-size: 18px;
            font-weight: 600;
            color: #1f2d3d;
        }
    }
}
</style>
