<template>
<div class="form">
    <tabel-header :data="headerInfo_details" @method="disable(formDetails)" class="add_padding">
    </tabel-header>
    <div class="formDetails">
        <el-form ref="formDetails" :model="formDetails" label-width="120px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="基金名称">
                        <el-input v-model="formDetails.fundName" :disabled="formDetails.flag"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金编号">
                        <el-input v-model="formDetails.fundNo" :disabled="formDetails.flag"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金规模(元)">
                        <el-input v-model="formDetails.fundScale" :disabled="formDetails.flag"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="管理类型">
                        <el-select v-model="formDetails.manageTypeId" :disabled="formDetails.flag" style="width:100%">
                            <el-option v-for="(item, index) of getManType" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="组织类型">
                        <el-select v-model="formDetails.orgTypeId" :disabled="formDetails.flag" style="width:100%">
                            <el-option v-for="(item, index) of OrgType" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金投向">
                        <el-select v-model="formDetails.fundInvestId" :disabled="formDetails.flag" style="width:100%">
                            <el-option v-for="(item, index) of fundInvestment" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金结构">
                        <el-input v-model="formDetails.fundOrg" :disabled="formDetails.flag"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金期限">
                        <el-input v-model="formDetails.term" :disabled="formDetails.flag"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="成立日期">
                        <el-date-picker v-model="formDetails.startDate" align="right" type="date" placeholder="选择成立日期" style="width:100%" :disabled="formDetails.flag">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="到期日期">
                        <el-date-picker v-model="formDetails.endDate" type="date" placeholder="选择日期" style="width:100%" :disabled="formDetails.flag">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="业务部门">
                        <el-input v-model="formDetails.businessDeptId" :disabled="formDetails.flag"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年天数">
                        <el-input v-model="formDetails.yearsDaynum" :disabled="formDetails.flag"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="主要投资领域">
                        <el-input v-model="formDetails.mainInvestField" :disabled="formDetails.flag"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="收益分配">
                        <el-input v-model="formDetails.incomeDis" :disabled="formDetails.flag"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="formDetails.fundRemarks" :disabled="formDetails.flag"></el-input>
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
                        <el-select v-model="formMIS.fundStratorId" :disabled="formMIS.flag" style="width:100%">
                            <el-option v-for="(item, index) of managementCompany" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金托管人">
                        <el-select v-model="formMIS.fundCustodianId" :disabled="formMIS.flag" style="width:100%">
                            <el-option v-for="(item, index) of getOrgList" :key="item.id" :label="item.orgName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金监理人">
                        <el-select v-model="formMIS.fundSupervisorId" :disabled="formMIS.flag" style="width:100%">
                            <el-option v-for="(item, index) of getOrgList" :key="item.id" :label="item.orgName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金监管人">
                        <el-select v-model="formMIS.fundSuperintId" :disabled="formMIS.flag" style="width:100%">
                            <el-option v-for="(item, index) of getOrgList" :key="item.id" :label="item.orgName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金投资顾问">
                        <el-select v-model="formMIS.fundAdvisorId" :disabled="formMIS.flag" style="width:100%">
                            <el-option v-for="(item, index) of getOrgList" :key="item.id" :label="item.orgName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="第三方合作机构">
                        <el-select v-model="formMIS.fundOrganizationId" :disabled="formMIS.flag" style="width:100%">
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
                        <el-date-picker v-model="formRegistration.regDate" align="right" type="date" placeholder="注册日期" style="width:100%" :disabled="formRegistration.flag">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="注册地">
                        <el-input v-model="formRegistration.regAddress" :disabled="formRegistration.flag">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否备案">
                        <el-select v-model="formRegistration.recordStatus" style="width:100%;" :disabled="formRegistration.flag">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="备案日期">
                        <el-date-picker v-model="formRegistration.recordDate" align="right" type="date" placeholder="注册日期" style="width:100%" :disabled="formRegistration.flag">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="备案号">
                        <el-input v-model="formRegistration.recordNo" :disabled="formRegistration.flag">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
    <tabel-header :data="headerInfo_Accountinfo" @method="disable(formAccountinfo)" class="add_padding">
    </tabel-header>
    <div class="formAccountinfo">
        <el-form ref="formAccountinfo" :model="formAccountinfo">
            <el-row>
                <el-col :span="24" class="navbar">
                    <el-row :gutter="20">
                        <el-col span="6">账户类型</el-col>
                        <el-col span="6">户名</el-col>
                        <el-col span="6">开户行</el-col>
                        <el-col span="6">账号</el-col>
                    </el-row>
                </el-col>
                <el-col :span="24">
                    <el-form-item>
                        <el-row :gutter="20">
                            <el-col span="6">基本户</el-col>
                            <el-col span="6">
                                <el-input v-model="formAccountinfo.username" :disabled="formAccountinfo.flag">
                                </el-input>
                            </el-col>
                            <el-col span="6">
                                <el-input v-model="formAccountinfo.username" :disabled="formAccountinfo.flag">
                                </el-input>
                            </el-col>
                            <el-col span="6">
                                <el-input v-model="formAccountinfo.username" :disabled="formAccountinfo.flag">
                                </el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item>
                        <el-row :gutter="20">
                            <el-col span="6">托管户</el-col>
                            <el-col span="6">
                                <el-input v-model="formAccountinfo.username" :disabled="formAccountinfo.flag">
                                </el-input>
                            </el-col>
                            <el-col span="6">
                                <el-input v-model="formAccountinfo.username" :disabled="formAccountinfo.flag">
                                </el-input>
                            </el-col>
                            <el-col span="6">
                                <el-input v-model="formAccountinfo.username" :disabled="formAccountinfo.flag">
                                </el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item>
                        <el-row :gutter="20">
                            <el-col span="6">募集结算账户</el-col>
                            <el-col span="6">
                                <el-input v-model="formAccountinfo.username" :disabled="formAccountinfo.flag">
                                </el-input>
                            </el-col>
                            <el-col span="6">
                                <el-input v-model="formAccountinfo.username" :disabled="formAccountinfo.flag">
                                </el-input>
                            </el-col>
                            <el-col span="6">
                                <el-input v-model="formAccountinfo.username" :disabled="formAccountinfo.flag">
                                </el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
import {
    mapGetters
} from 'vuex'
export default {
    props: {
        formDetails: {
            type: Object,
            default: {}
        },
        formMIS: {
            type: Object,
            default: {}
        },
        formRegistration: {
            type: Object,
            default: {}
        },
        formAccountinfo: {
            type: Object,
            default: {}
        }
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
            options: [{
                value: 1,
                label: '未备案'
            }, {
                value: 2,
                label: '已备案'
            }], //1：未备案 2：已经备案
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
            'managementCompany',
            'fundInvestment',
            'getOrgList'
        ])
    },
    created() {
        this.$store.dispatch('getFundInvestment'),
        this.$store.dispatch('getManagementCompany'),
        this.$store.dispatch('getAllOrg')
        this.$store.dispatch('getAllOrg')
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
    .el-row {
        width: 100%;
        height: 100%;
        .title {
            width: 100%;
            height: 42px;
            line-height: 42px;
            background: #2a3142;
            color: #fff;
            padding: 0 26px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            .desc {
                flex: 1;
                text-align: left;
            }
            .btn {
                flex: 1;
                text-align: right;
                line-height: 42px;
                .btnwrapper {
                    float: right;
                    transition: 1s all;
                    background: #2a3142;
                    border: 1px solid #2a3142;
                    font-size: 14px;
                    color: #fff;
                    outlione: none;
                    &:hover {
                        background: #ff4949;
                        border: 1px solid #ff4949;
                        transform: scale(1.1);
                    }
                }
            }
        }
        .navbar {
            width: 100%;
            height: 100%;
            .el-col {
                height: 36px;
                margin-bottom: 22px;
                line-height: 36px;
                border-collapse: collapse;
            }
        }
    }
}
</style>
