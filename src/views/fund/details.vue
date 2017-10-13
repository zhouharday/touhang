<template>
    <div class="form">
        <tabel-header :data="headerInfo_details" @add="disable(formDetails)" class="add_padding">
        </tabel-header>
        <div class="formDetails">
            <el-form ref="formDetails" :model="formDetails" :rules="rules1" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="基金名称" prop="fundName">
                            <el-input v-model="formDetails.fundName" :disabled="formDetails.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="基金编号" prop="fundNo">
                            <el-input v-model="formDetails.fundNo" :disabled="formDetails.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="基金规模(元)" prop="fundScale">
                            <el-input v-model="formDetails.fundScale" :disabled="formDetails.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="管理类型" prop="manageTypeId">
                            <el-select v-model="formDetails.manageTypeId" :disabled="formDetails.flag" style="width:100%">
                                <el-option v-for="(list, index) of getManType" :key="list.id" :label="list.dicName" :value="list.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="组织类型" prop="orgTypeId">
                            <el-select v-model="formDetails.orgTypeId" :disabled="formDetails.flag" style="width:100%">
                                <el-option v-for="(item, index) of OrgType" :key="item.id" :label="item.dicName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="基金投向" prop="fundInvestId">
                            <el-select v-model="formDetails.fundInvestId" :disabled="formDetails.flag" style="width:100%">
                                <el-option v-for="(item, index) of fundInvestment" :key="item.id" :label="item.dicName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="基金结构" prop="fundOrg">
                            <el-row>
                                <el-col :span="6">
                                    <el-select v-model="formDetails.fundOrg" :disabled="formDetails.flag" @change="selectStructure" style="width: 100%">
                                        <el-option label="平级" value="1"></el-option>
                                        <el-option label="结构化" value="2"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="18" v-show="structure == 2 || formDetails.fundOrg == 2">
                                    <el-form :model="fundLevel">
                                        <el-row>
                                            <el-col :span="7" :offset="1">
                                                <el-form-item class="itemStyle">
                                                    <el-input v-model="fundLevel.priority" :disabled="formDetails.flag"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="1" class="colon">:</el-col>
                                            <el-col :span="7">
                                                <el-form-item class="itemStyle">
                                                    <el-input v-model="fundLevel.intermediateStage" :disabled="formDetails.flag"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="1" class="colon">:</el-col>
                                            <el-col :span="7">
                                                <el-form-item class="itemStyle">
                                                    <el-input v-model="fundLevel.generalLevel" :disabled="formDetails.flag"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="基金期限" prop="fundTerm">
                            <el-input v-model="formDetails.fundTerm" :disabled="formDetails.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="成立日期" prop="startDate">
                            <el-date-picker v-model="formDetails.startDate" align="right" type="date" placeholder="选择成立日期" :disabled="formDetails.flag" style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="到期日期" prop="endDate">
                            <el-date-picker v-model="formDetails.endDate" :disabled="formDetails.flag" type="date" placeholder="选择日期" style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="业务部门" prop="businessDeptId">
                            <el-select v-model="formDetails.businessDeptId" :disabled="formDetails.flag" style="width:100%">
                                <el-option v-for="(item, index) of businessDepartment" :key="item.id" :label="item.deptName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="年天数" prop="yearsDaynum">
                            <el-select v-model="formDetails.yearsDaynum" :disabled="formDetails.flag" style="width:100%">
                                <el-option label="360天" value="360"></el-option>
                                <el-option label="365天" value="365"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="主要投资领域" prop="mainInvestField">
                            <el-input v-model="formDetails.mainInvestField" :disabled="formDetails.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="收益分配" prop="incomeDis">
                            <el-input v-model="formDetails.incomeDis" :disabled="formDetails.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注" prop="fundRemarks">
                            <el-input type="textarea" v-model="formDetails.fundRemarks" :disabled="formDetails.flag"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <tabel-header :data="headerInfo_MIS" @add="disable(formMIS)" class="add_padding"></tabel-header>
        <div class="formMIS">
            <el-form ref="formMIS" :model="formMIS" :rules="rules2" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="基金管理人" prop="fundStratorId">
                            <el-select v-model="formMIS.fundStratorId" :disabled="formMIS.flag" style="width:100%">
                                <el-option v-for="(item, index) of managementCompany" :key="item.id" :label="item.companyName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="基金托管人" prop="fundCustodianId">
                            <el-select v-model="formMIS.fundCustodianId" :disabled="formMIS.flag" style="width:100%">
                                <el-option v-for="(item, index) of getOrgList" :key="item.id" :label="item.orgName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="基金监理人" prop="fundSuperintId">
                            <el-select v-model="formMIS.fundSuperintId" :disabled="formMIS.flag" style="width:100%">
                                <el-option v-for="(item, index) of getOrgList" :key="item.id" :label="item.orgName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="基金监管人" prop="fundSupervisorId">
                            <el-select v-model="formMIS.fundSupervisorId" :disabled="formMIS.flag" style="width:100%">
                                <el-option v-for="(item, index) of getOrgList" :key="item.id" :label="item.orgName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="基金投资顾问" prop="fundAdvisorId">
                            <el-select v-model="formMIS.fundAdvisorId" :disabled="formMIS.flag" style="width:100%">
                                <el-option v-for="(item, index) of getOrgList" :key="item.id" :label="item.orgName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="第三方合作机构" prop="fundOrganizationId">
                            <el-select v-model="formMIS.fundOrganizationId" :disabled="formMIS.flag" style="width:100%">
                                <el-option v-for="(item, index) of getOrgList" :key="item.id" :label="item.orgName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <tabel-header :data="headerInfo_Registration" @add="disable(formRegistration)" class="add_padding" v-show="showOrhiddren">
        </tabel-header>
        <div class="formRegistration" v-show="showOrhiddren">
            <el-form ref="formRegistration" :model="formRegistration" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="注册日期" prop="regDate">
                            <el-date-picker v-model="formRegistration.regDate" :disabled="formRegistration.flag" align="right" type="date" placeholder="注册日期" style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="注册地" prop="regAddress">
                            <el-input v-model="formRegistration.regAddress" :disabled="formRegistration.flag">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否备案" prop="recordStatus">
                            <el-select v-model="formRegistration.recordStatus" :disabled="formRegistration.flag" style="width:100%;">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备案日期" prop="recordDate">
                            <el-date-picker v-model="formRegistration.recordDate" :disabled="formRegistration.flag" align="right" type="date" placeholder="注册日期" style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备案号" prop="recordNo">
                            <el-input v-model="formRegistration.recordNo" :disabled="formRegistration.flag">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <tabel-header :data="headerInfo_Accountinfo" @add="disable(formAccountinfo)" class="add_padding">
        </tabel-header>
        <el-table :data="formAccountInfo" style="width: 100%">
            <el-table-column prop="accountTypeName" label="账户类型">
            </el-table-column>
            <el-table-column label="户名">
                <template scope="scope">
                    <input v-model="scope.row.username" placeholder="请输入内容" style="border: none;"></input>
                </template>
            </el-table-column>
            <el-table-column label="开户行">
                <template scope="scope">
                    <input v-model="scope.row.openingBank" placeholder="请输入内容" style="border: none;"></input>
                </template>
            </el-table-column>
            <el-table-column label="账号">
                <template scope="scope">
                    <input v-model="scope.row.accountNumber" placeholder="请输入内容" style="border: none;"></input>
                </template>
            </el-table-column>
        </el-table>
        <div class="btnList">
            <el-button class="btn success" @click="preservation">保存</el-button>
            <el-button class="btn danger" @click="cancel">取消</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
import { mapGetters } from 'vuex'
import { selectAllManageCompany, sectorList } from 'api/fund'
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
            structure: '',
            businessDepartment: [],
            rules1: {
                fundName: [{
                    required: true,
                    message: '请输入基金名称',
                    trigger: 'blur'
                },
                {
                    min: 2,
                    max: 20,
                    message: '长度在 3 到 20 个字符',
                    trigger: 'blur'
                }
                ],
                fundNo: [{
                    type: 'string',
                    required: true,
                    message: '基金编号不能为空',
                    trigger: 'change'
                }],
                fundScale: [{
                    type: 'string',
                    required: true,
                    message: '基金规模必添',
                    trigger: 'change'
                }],
                manageTypeId: [{
                    required: true,
                    message: '请选择管理类型',
                    trigger: 'change'
                }],
                orgTypeId: [{
                    required: true,
                    message: '请选择组织类型',
                    trigger: 'change'
                }],
                fundInvestId: [{
                    required: true,
                    message: '请选择基金投向',
                    trigger: 'change'
                }],
                fundOrg: [{
                    required: true,
                    message: '请选择基金结构',
                    trigger: 'change'
                }],
                fundTerm: [{
                    required: true,
                    message: '请输入基金期限',
                    trigger: 'change'
                }],
                startDate: [{
                    type: 'date',
                    required: true,
                    message: '请选择时间',
                    trigger: 'change'
                }],
                businessDeptId: [{
                    required: true,
                    message: '请选择业务部门',
                    trigger: 'change'
                }],
                yearsDaynum: [{
                    required: true,
                    message: '请选择年天数',
                    trigger: 'change'
                }]
            },
            rules2: {
               fundStratorId: [{
                    required: true,
                    message: '请选择基金管理人',
                    trigger: 'blur'
                }],
                fundCustodianId: [{
                    required: true,
                    message: '请选择基金托管人',
                    trigger: 'blur'
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
        },
        selectStructure(value) {
            this.structure = value
        },
        preservation() {
            this.$refs.formDetails.validate((valid) => {
                if (valid) {
                    this.$emit('confirmSubmission') // 确认保存
                } else {
                    return false
                }
            })
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
        .success {
            background: #f05e5e;
            color: #fff;
        }
        .danger {
            background: #fff;
            color: #f05e5e;
        }
    }
}
</style>
