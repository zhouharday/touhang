<template>
    <section class="manage">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="项目费用" name="1">
                <div class="fileTable">
                    <tabel-header :data="headerInfo_cost"></tabel-header>
                    <el-table :data="costData" border style="width: 100%" align="center">
                        <el-table-column label="费用类型" prop="costType" align="center">
                        </el-table-column>
                        <el-table-column label="金额（元）" prop="amountMoney" align="center">
                        </el-table-column>
                    </el-table>
                </div>
            </el-collapse-item>
            <el-collapse-item title="项目合同" name="2">
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
                        </el-table-column>
                        <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                        </el-table-column>
                        <el-table-column label="合同附件" prop="documentInfo" align="center">
                        </el-table-column>
                    </el-table>
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
                                        <el-input v-model="contractForm1.handlerUserId" placeholder="默认当前登录用户" disabled></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="经办日期">
                                        <el-input type="date" v-model="contractForm1.stockRatio" disabled></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="合同附件">
                                        <el-input v-model="contractForm1.documentInfo" disabled></el-input>
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
                            </el-table-column>
                            <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                            </el-table-column>
                        </el-table>
                    </el-dialog>
                </div>
            </el-collapse-item>
            <el-collapse-item title="投资支付" name="3">
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
                        </el-table-column>
                        <el-table-column label="支付金额（元）" prop="paidInMoney" align="center">
                        </el-table-column>
                        <el-table-column label="支付日期" prop="payDate" align="center">
                            <template scope="scope">
                                <div>{{scope.row.payDate | formatDate}}</div>
                            </template>
                        </el-table-column>
                    </el-table>
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
                                        <el-input v-model="paidForm1.contract" disabled></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="合同附件">
                                        <el-input v-model="paidForm1.contractAppendix" disabled></el-input>
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
                                        <el-input v-model="paidForm1.handlerUserId" placeholder="默认当前登录用户" disabled></el-input>
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
                                        <el-input v-model="paidForm1.relativeAppendix" disabled></el-input>
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
                </div>
            </el-collapse-item>
            <el-collapse-item title="项目分红" name="4">
                <!--  项目分红 部分-->
                <div class="fileTable sharingDialog">
                    <tabel-header :data="headerInfo_sharing"></tabel-header>
                    <el-table :data="sharingData" border style="width: 100%" align="center" show-summary>
                        <el-table-column label="合同名称" prop="contractName" align="center">
                            <template scope="scope">
                                <el-button type="text" style="color:#f05e5e" @click="openSharing(scope.row,scope.$index)">{{scope.row.contractName}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="合同金额（元）" prop="contractAmount" align="center">
                        </el-table-column>
                        <el-table-column label="分红金额（元）" prop="shareAmount" align="center">
                        </el-table-column>
                        <el-table-column label="分红日期" prop="shareDate" align="center">
                        </el-table-column>
                    </el-table>
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
                                          <el-input v-model="sharingForm1.contract" disabled></el-input>
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
                                        <el-input v-model="sharingForm1.handlerUserId" placeholder="默认当前登录用户" disabled></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="分红日期">
                                        <el-input type="date"  v-model="sharingForm1.shareDate" placeholder="选择日期" disabled style="width: 100%;">
                                        </el-input>
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
                </div>
            </el-collapse-item>
        </el-collapse>
    </section>
</template>

<script>
import '../../../common/js/filter'
import { mapGetters } from 'vuex'
import tabelHeader from 'components/tabelHeader'
import { getDicChildren } from 'common/js/dictionary'
import { changeDate } from 'common/js/config'
import {
    delGu, delContract, delFee, addFee, editFee, fees,
    addContract, contracts, getContractDetail, editContract,
    getContractPay, addContractPay, getContractPayDetail, editContractPay, delPay,
    getParticipationList, addParticipation, getParticipationDetail, editParticipation, delShare
} from 'api/projectPre';

export default {
    computed: mapGetters({
        costSortOptions: 'getCostSortOptions',   // 获取费用类型
        myFundOptions: 'getMyFundOptions'    //本商户的可签约基金列表
    }),
    props: {
        proId: {
            type: String,
            default: ''
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
        this.init();
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
                }
            }).catch(e => {
                console.log('contracts() exists error: ', e);
            })
        },
        // 获取项目合同详情
        openContract(row,index) {
           this.contractDetails = !this.contractDetails;
        },
        //获取投资支付列表
        getContractPay() {
            getContractPay(this.proId).then(resp => {
                // console.log('获取投资支付列表: '+ JSON.stringify( resp.data));
                if (resp.data.status === '200') {
                    this.paidData = resp.data.result.list;
                } else if (resp.data.status === '49999') {
                    this.paidData = [];
                }
            }).catch(e => {
                console.log('getContractPay() exists error: ', e);
            })
        },
        // 获取投资支付详情
        openPaid(row,index) {
           this.paidDetails = !this.paidDetails;
        },
        //获取项目分红列表
        getParticipation() {
            getParticipationList(this.proId).then(resp => {
                // console.log('getParticipationList resp: '+ JSON.stringify( resp.data));
                if (resp.data.status === '200') {
                    this.sharingData = resp.data.result.list;
                } else if (resp.data.status === '49999') {
                    this.sharingData = [];
                }
            }).catch(e => {
                console.log('getParticipationList() exists error: ', e);
            })
        },
        // 获取项目分红详情
        openSharing(row,index) {
           this.sharingDetails = !this.sharingDetails;
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
