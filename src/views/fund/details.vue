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
                        <el-row>
                            <el-col :span="6">
                                <el-select v-model="formDetails.fundOrg" @change="selectStructure" style="width: 100%">
                                    <el-option v-for="(item, index) of fundStructure" :key="item.id" :label="item.dicName" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="18" v-show="structure == 2 || formDetails.fundOrg == 2">
                                <el-form :model="fundLevel">
                                    <el-row>
                                        <el-col :span="7" :offset="1">
                                            <el-form-item class="itemStyle">
                                                <el-input v-model="fundLevel.priority"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="1" class="colon">:</el-col>
                                        <el-col :span="7">
                                            <el-form-item class="itemStyle">
                                                <el-input v-model="fundLevel.intermediateStage"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="1" class="colon">:</el-col>
                                        <el-col :span="7">
                                            <el-form-item class="itemStyle">
                                                <el-input v-model="fundLevel.generalLevel"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金期限">
                        <el-input v-model="formDetails.fundTerm"></el-input>
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
                        <el-select v-model="formDetails.businessDeptId" style="width:100%">
                            <el-option v-for="(item, index) of businessDepartment" :key="item.id" :label="item.deptName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年天数">
                        <el-select v-model="formDetails.yearsDaynum" style="width:100%">
                            <el-option v-for="(item, index) of days" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select>
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
                        <el-select v-model="formMIS.fundSuperintId" style="width:100%">
                            <el-option v-for="(item, index) of getOrgList" :key="item.id" :label="item.orgName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金监管人">
                        <el-select v-model="formMIS.fundSupervisorId" style="width:100%">
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
    <tabel-header :data="headerInfo_Registration" @method="disable(formRegistration)" class="add_padding" v-show="showOrhiddren">
    </tabel-header>
    <div class="formRegistration" v-show="showOrhiddren">
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
    <div class="btnList">
        <el-button type="success" class="btn" @click="preservation">保存</el-button>
        <el-button type="danger" class="btn" @click="cancel">取消</el-button>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
import {
    mapGetters
} from 'vuex'
import {
    selectAllManageCompany,
    sectorList
} from 'api/fund'
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
        formAccountInfo: {
            type: Array,
            default: []
        },
        fundLevel: {
            type: Object,
            default: {}
        },
        showOrhiddren: false
    },
    data() {
        return {
            headerInfo_details: {
                desc: '基本信息',
                btnGroup: [{
                    icon: 'edit',
                    explain: '编辑'
                }]
            },
            headerInfo_MIS: {
                desc: '管理信息',
                btnGroup: [{
                    icon: 'edit',
                    explain: '编辑'
                }]
            },
            headerInfo_Registration: {
                desc: '备案注册',
                btnGroup: [{
                    icon: 'edit',
                    explain: '编辑'
                }]
            },
            headerInfo_Accountinfo: {
                desc: '账户信息',
                btnGroup: [{
                    icon: 'edit',
                    explain: '编辑'
                }]
            },
            managementCompany: [],
            options: [{
                id: 0,
                label: '已备案'
            }, {
                id: 1,
                label: '未备案'
            }],
            days: [{
                id: 360,
                dicName: '360天'
            }, {
                id: 365,
                dicName: '365天'
            }],
            structure: '',
            fundStructure: [{
                id: 1,
                dicName: '平级'
            }, {
                id: 2,
                dicName: '结构化'
            }],
            businessDepartment: []
        }
    },
    methods: {
        disable(name) {
            if (name.flag === false) {
                return name.flag = true
            } else {
                return name.flag = false
            }
        },
        selectStructure(value) {
            this.structure = value
        },
        preservation() {
            this.$emit('confirmSubmission') // 确认保存
        },
        cancel() {
            this.$emit('confirmCancel') // 确认取消
        }
    },
    computed: {
        ...mapGetters([
            'getManType',
            'OrgType',
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
        sectorList().then((res) => {
            if (res.status == '200') {
                this.businessDepartment = res.data.result
            }
        })
        // this.formDetails.fundOrgValue = this.fundLevel.priority + ':' + this.fundLevel.intermediateStage + ':' + this.fundLevel.generalLevel
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
    .itemStyle {
        margin-left: 0;
        margin-right: 0;
    }
    .colon {
        text-align: center;
    }
    input {
        background-color: #fff;
        box-sizing: border-box;
        color: #1f3d34;
        display: block;
        font-size: inherit;
        height: 36px;
        outline: 0;
        padding: 3px 0;
        width: 100%;
    }
    .btnList {
        width: 100%;
        padding-top: 24px;
        padding-bottom: 48px;
        text-align: center;
        .btn {
            width: 150px;
        }
    }
}
</style>
