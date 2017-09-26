<template>
<div class="form">
    <tabel-header :data="headerInfo_details" @method="disable(formDetails)" class="add_padding">
    </tabel-header>
    <div class="formDetails">
        <el-form ref="formDetails" :model="formDetails" label-width="120px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="基金名称">
                        <el-input v-model="formDetails.fundName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金编号">
                        <el-input v-model="formDetails.fundNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金规模(元)">
                        <el-input v-model="formDetails.fundScale"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="管理类型">
                        <el-select v-model="formDetails.manageTypeId" style="width:100%">
                            <el-option v-for="(item, index) of getManType" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="组织类型">
                        <el-select v-model="formDetails.orgTypeId" style="width:100%">
                            <el-option v-for="(item, index) of OrgType" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金投向">
                        <el-select v-model="formDetails.fundInvestId" style="width:100%">
                            <el-option v-for="(item, index) of fundInvestment" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金结构">
                        <el-input v-model="formDetails.fundOrg"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金期限">
                        <el-input v-model="formDetails.term"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="成立日期">
                        <el-date-picker v-model="formDetails.startDate" align="right" type="date" placeholder="选择成立日期" style="width:100%">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="到期日期">
                        <el-date-picker v-model="formDetails.endDate" type="date" placeholder="选择日期" style="width:100%">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="业务部门">
                        <el-input v-model="formDetails.businessDeptId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年天数">
                        <el-input v-model="formDetails.yearsDaynum"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="主要投资领域">
                        <el-input v-model="formDetails.mainInvestField"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="收益分配">
                        <el-input v-model="formDetails.incomeDis"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="formDetails.fundRemarks"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
    <tabel-header :data="headerInfo_MIS" @method="disable(formMIS)" class="add_padding"></tabel-header>
    <div class="formMIS">
        <el-form ref="formMIS" :model="formMIS" label-width="120px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="基金管理人">
                        <el-select v-model="formMIS.fundStratorId" style="width:100%">
                            <el-option v-for="(item, index) of managementCompany" :key="item.id" :label="item.companyName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金托管人">
                        <el-select v-model="formMIS.fundCustodianId" style="width:100%">
                            <el-option v-for="(item, index) of getOrgList" :key="item.id" :label="item.orgName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金监理人">
                        <el-select v-model="formMIS.fundSupervisorId" style="width:100%">
                            <el-option v-for="(item, index) of getOrgList" :key="item.id" :label="item.orgName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金监管人">
                        <el-select v-model="formMIS.fundSuperintId" style="width:100%">
                            <el-option v-for="(item, index) of getOrgList" :key="item.id" :label="item.orgName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金投资顾问">
                        <el-select v-model="formMIS.fundAdvisorId" style="width:100%">
                            <el-option v-for="(item, index) of getOrgList" :key="item.id" :label="item.orgName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="第三方合作机构">
                        <el-select v-model="formMIS.fundOrganizationId" style="width:100%">
                            <el-option v-for="(item, index) of getOrgList" :key="item.id" :label="item.orgName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
    <tabel-header :data="headerInfo_Registration" @method="disable(formRegistration)" class="add_padding">
    </tabel-header>
    <div class="formRegistration">
        <el-form ref="formRegistration" :model="formRegistration" label-width="120px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="注册日期">
                        <el-date-picker v-model="formRegistration.regDate" align="right" type="date" placeholder="注册日期" style="width:100%">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="注册地">
                        <el-input v-model="formRegistration.regAddress">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否备案">
                        <el-select v-model="formRegistration.recordStatus" style="width:100%;">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="备案日期">
                        <el-date-picker v-model="formRegistration.recordDate" align="right" type="date" placeholder="注册日期" style="width:100%">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="备案号">
                        <el-input v-model="formRegistration.recordNo">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
    <tabel-header :data="headerInfo_Accountinfo" @method="disable(formAccountinfo)" class="add_padding">
    </tabel-header>
    <el-table :data="formAccountInfo" style="width: 100%">
        <el-table-column prop="accountTypeName" label="账户类型">
        </el-table-column>
        <el-table-column prop="username" label="户名">
            <template scope="scope">
                <input v-model="scope.row.username" placeholder="请输入内容" style="border: none;"></input>
            </template>
        </el-table-column>
        <el-table-column prop="openingBank" label="开户行">
            <template scope="scope">
                <input v-model="scope.row.openingBank" placeholder="请输入内容" style="border: none;"></input>
            </template>
        </el-table-column>
        <el-table-column prop="accountNumber" label="账号">
            <template scope="scope">
                <input v-model="scope.row.accountNumber" placeholder="请输入内容" style="border: none;"></input>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
import {
    mapGetters
} from 'vuex'
import {
    selectAllManageCompany
} from 'api/fund'
export default {
    props: {
        // formDetails: {
        //     type: Object,
        //     default: {}
        // },
        // formMIS: {
        //     type: Object,
        //     default: {}
        // },
        // formRegistration: {
        //     type: Object,
        //     default: {}
        // },
        // formAccountinfo: {
        //     type: Object,
        //     default: {}
        // }
    },
    data() {
        return {
            headerInfo_details: {
                desc: '基本信息',
                btnGroup: [{
                    icon: 'edit',
                    explain: '编辑'
                }, {
                    icon: 'upload',
                    explain: '提交'
                }]
            },
            headerInfo_MIS: {
                desc: '管理信息',
                btnGroup: [{
                    icon: 'edit',
                    explain: '编辑'
                }, {
                    icon: 'upload',
                    explain: '提交'
                }]
            },
            headerInfo_Registration: {
                desc: '备案注册',
                btnGroup: [{
                    icon: 'edit',
                    explain: '编辑'
                }, {
                    icon: 'upload',
                    explain: '提交'
                }]
            },
            headerInfo_Accountinfo: {
                desc: '账户信息',
                btnGroup: [{
                    icon: 'edit',
                    explain: '编辑'
                }, {
                    icon: 'upload',
                    explain: '提交'
                }]
            },
            formDetails: {
                fundName: '',
                fundNo: '',
                fundScale: '',
                createUserId: '',
                manageTypeId: '',
                orgTypeId: '',
                fundInvestId: '',
                fundOrg: '',
                fundOrgValue: '', //基金结构选2的时候的比例值
                fundTerm: '',
                startDate: '',
                endDate: '',
                businessDeptId: '',
                yearsDaynum: '',
                merchantId: '',
                versionRecord: '',
                fundStatus: '',
                fundType: '',
                mainInvestField: '',
                incomeDis: '',
                fundRemarks: ''
            },
            formMIS: {
                fundStratorId: '',
                fundCustodianId: '',
                fundSupervisorId: '',
                fundSuperintId: '',
                fundAdvisorId: '',
                fundOrganizationId: ''
            },
            formRegistration: {
                regDate: '',
                regAddress: '',
                recordStatus: '',
                recordDate: '',
                recordNo: ''
            },
            formAccountInfo: [{
                username: '基本户户名',
                openingBank: '基本户开户行',
                accountNumber: '123456789',
                accountType: 1,
                accountTypeName: '基本户'
            }, {
                username: "托管户户名",
                openingBank: "托管户开户行",
                accountNumber: "123456789",
                accountType: 2,
                accountTypeName: "托管户"
            }, {
                username: "募集结算账户户名",
                openingBank: "募集结算账户开户行",
                accountNumber: "123457",
                accountType: 3,
                accountTypeName: "募集结算账户"
            }],
            managementCompany: [],
            Accountinfo: {
                title: ['账户类型', '户名', '开户行', '账号'],
                formlist: [{
                    username: '基本户户名',
                    openingBank: '',
                    accountNumber: '',
                    accountType: ''
                }, {
                    username: '托管户户名',
                    openingBank: '',
                    accountNumber: '',
                    accountType: ''
                }, {
                    username: '募集结算账户户名',
                    openingBank: '',
                    accountNumber: '',
                    accountType: ''
                }]
            }
        }
    },
    methods: {
        disable(name) {
            if (name.flag === false) {
                return name.flag = true
            } else {
                return name.flag = false
            }
        }
    },
    computed: {
        ...mapGetters([
            'getManType',
            'OrgType',
            // 'managementCompany',
            'fundInvestment',
            'getOrgList'
        ])
    },
    created() {
        this.$store.dispatch('getFundInvestment')
        this.$store.dispatch('getManagementCompany')
        this.$store.dispatch('getAllOrg')
        this.$store.dispatch('getAllOrg')
        selectAllManageCompany().then((res) => {
            if (res.status == '200') {
                this.managementCompany = res.data.result
            }
        })
    },
    components: {
        tabelHeader
    }
}
</script>

<style lang="less" scoped>
.form {
    width: 100%;
    height: 100%;
    .formAccountinfo {
        .el-col {
            text-align: center;
        }
    }
    .add_padding {
        padding-bottom: 12px;
    }
    .el-table tr:hover {
        input {
            background: #eef1f6;
        }
    }
    input {
        background-color: #fff;
        box-sizing: border-box;
        color: #1f3d34;
        display: block;
        font-size: inherit;
        height: 36px;
        outline: 0;
        padding: 3px 10px;
        width: 100%;
    }
}
</style>
