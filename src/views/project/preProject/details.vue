<template>
    <div class="form">
        <!-- 基本信息 -->
        <tabel-header :data="headerInfo_basic" @add="disable(basicForm)" @show="changeProjectInfo()" class="title"></tabel-header>
        <div class="basicForm">
            <el-form ref="basicForm" :model="basicForm" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="项目名称" prop="projectName">
                            <el-input v-model="basicForm.projectName" :disabled="basicForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目简称" prop="projectShortName">
                            <el-input v-model="basicForm.projectShortName" :disabled="basicForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目类型" prop="projectType">
                            <el-select v-model="basicForm.projectTypeId" filterable placeholder="请选择项目类型" style="width:100%" :disabled="basicForm.flag">
                                <el-option v-for="item in typeOptions" :key="item.id" :label="item.dicName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属行业" prop="industry">
                             <el-select v-model="basicForm.industryId" filterable placeholder="请选择所属行业" style="width:100%" :disabled="basicForm.flag">
                                <el-option v-for="item in industryOptions" :key="item.id" :label="item.dicName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目来源" prop="projectFrom">
                             <el-select v-model="basicForm.projectFromId" filterable placeholder="请选择项目来源" style="width:100%" :disabled="basicForm.flag">
                                <el-option v-for="item in fromOptions" :key="item.id" :label="item.dicName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在地" prop="address">
                             <el-select v-model="basicForm.addressId" filterable placeholder="请选择所在地" style="width:100%" :disabled="basicForm.flag">
                                <el-option v-for="item in addressOptions" :key="item.id" :label="item.dicName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="业务部门" prop="department">
                             <el-select v-model="basicForm.departmentId" filterable placeholder="请选择业务部门" style="width:100%" :disabled="basicForm.flag">
                                <el-option v-for="item in departmentOptions" :key="item.id" :label="item.deptName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- 企业信息 -->
        <tabel-header :data="headerInfo_company" v-if="isShowProjectBtn('XQ-bianji')" @add="disable(companyForm)" @show="changeEnterpriseInfo()" class="title"></tabel-header>
        <tabel-header :data="headerInfo_company" v-else class="title"></tabel-header>
        <div class="companyForm">
            <el-form ref="companyForm" :model="companyForm" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="企业名称" prop="enterpriseName">
                            <el-input v-model="companyForm.enterpriseName" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="法人代表" prop="legalPerson">
                            <el-input v-model="companyForm.legalPerson" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="注册资本（元）" prop="registeredCapital">
                            <el-input v-model="companyForm.registeredCapital" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="实收资本（元）" prop="paiclCapital">
                            <el-input v-model="companyForm.paiclCapital" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="注册登记日期" prop="registerDate">
                            <el-date-picker type="date" v-model="companyForm.registerDate" :disabled="companyForm.flag" style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="统一信用代码" prop="creditCode">
                            <el-input v-model="companyForm.creditCode" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="注册地址" prop="registerAddress">
                            <el-input v-model="companyForm.registerAddress" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="办公地址" prop="workAddress">
                            <el-input v-model="companyForm.workAddress" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="主营业务" prop="mainBusiness">
                            <el-input v-model="companyForm.mainBusiness" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="companyForm.remark" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- 投资信息 -->
        <tabel-header :data="headerInfo_capital" @add="disable(capitalForm)" @show="changeCapitalInfo()" class="title"></tabel-header>
        <div class="capitalForm">
            <el-form ref="capitalForm" :model="capitalForm" label-width="170px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="投资轮次" prop="projectTurn">
                            <el-select v-model="capitalForm.projectTurnId" filterable placeholder="请选择投资轮次" style="width:100%" :disabled="capitalForm.flag">
                                <el-option v-for="item in projectTurnType" :key="item.id" :label="item.dicName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目初始估值（元）" prop="appraisementAmount">
                            <el-input v-model="capitalForm.appraisementAmount" :disabled="capitalForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="投资金额（元）" prop="investAmount">
                            <el-input v-model="capitalForm.investAmount" :disabled="capitalForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="股权占比（%）" prop="stockProportion">
                            <el-input v-model="capitalForm.stockProportion" :disabled="capitalForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="原币种金额" prop="oldAmount">
                            <el-input v-model="capitalForm.oldAmount" :disabled="capitalForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="币种" prop="currencyName">
                            <el-select v-model="capitalForm.currency" filterable placeholder="请选择币种" style="width:100%" :disabled="capitalForm.flag">
                                <el-option v-for="item in currencyOptions" :key="item.id" :label="item.dicName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="投资取得股份数（股）" prop="stock">
                            <el-input v-model="capitalForm.stock" :disabled="capitalForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="投资取得注册资本（元）" prop="investmentCapital">
                            <el-input v-model="capitalForm.investmentCapital" :disabled="capitalForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="初始投资时间" prop="startInvestDate">
                            <el-date-picker type="date" v-model="capitalForm.startInvestDate" :disabled="capitalForm.flag" style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目预计退出时间" prop="exitDate">
                            <el-date-picker type="date" v-model="capitalForm.exitDate" :disabled="capitalForm.flag" style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tabelHeader from 'components/tabelHeader'
import { changeDate } from 'common/js/config'
import { getDicChildren } from 'common/js/dictionary'
import { changeEnterpriseInfo, changeProjectInfo, getDeptListByMid } from 'api/project';
import { changeCapitalInfo } from 'api/projectPre';

export default {
    computed: mapGetters({
        typeOptions:'getTypeOptions',   // 获取项目类型
        industryOptions:'getIndustryOptions',   // 获取项目所属行业
        fromOptions:'getFromOptions',   // 获取项目来源
        addressOptions:'getAddressOptions',   // 获取项目所在地
        departmentOptions:'getDepartmentOptions',   // 获取业务部门
        projectTurnType:'getProjectTurnType',   // 获取项目投资信息轮次
        currencyOptions:'getCurrencyOptions'   // 获取币种类型
    }),
    props: {
        proId: {
            type: String,
            default: ''
        },
        projectId: {
            type: String,
            default: ''
        },
        basicForm: {
            type: Object,
            default: {}
        },
        companyForm: {
            type: Object,
            default: {}
        },
        capitalForm: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            options: [{
                value: 'yes',
                label: '是'
            }, {
                value: 'no',
                label: '否'
            }],
            headerInfo_basic: {
                desc: '基本信息',
                btnGroup: [{
                    icon: 'edit',
                    explain: '编辑'
                },
                {
                    icon: 'upload',
                    explain: '提交'
                }]
            },
            headerInfo_company: {
                desc: '企业信息',
                btnGroup: [{
                    icon: 'edit',
                    explain: '编辑'
                },
                {
                    icon: 'upload',
                    explain: '提交'
                }]
            },
            headerInfo_capital: {
                desc: '投资信息',
                btnGroup: [{
                    icon: 'edit',
                    explain: '编辑'
                },
                {
                    icon: 'upload',
                    explain: '提交'
                }]
            },
        }
    },
    created() {
        this.$store.dispatch('getTypeOptions');
        this.$store.dispatch('getIndustryOptions');
        this.$store.dispatch('getFromOptions');
        this.$store.dispatch('getAddressOptions');
        this.$store.dispatch('getDepartmentOptions');
        this.$store.dispatch('getProjectTurnType');  // 获取项目投资信息轮次
        this.$store.dispatch('getCurrencyOptions');   // 获取币种类型
        this.projectId = this.proId;
    },
    watch: {},
    methods: {
        disable(name) {
            name.flag = !name.flag;
        },
        changeProjectInfo() {
            if(this.basicForm.flag) return false;
            let basicForm = this.basicForm;
            basicForm.projectId = this.projectId;
            changeProjectInfo(basicForm).then(resp => {
                this.disable(basicForm);
            }).catch(e => {
                console.log('changeProjectInfo exists error: ', e);
            })
        },
        changeEnterpriseInfo() {
            if(this.companyForm.flag) return false;
            let companyForm = this.companyForm;
            companyForm.projectId = this.projectId;
            companyForm.registerDate = companyForm.registerDate;
            // console.log("参数："+ JSON.stringify(companyForm));
            changeEnterpriseInfo(companyForm).then(resp => {
                if(resp.data.status == '200'){
                    this.disable(companyForm);
                }
                // console.log('changeEnterpriseInfo resp: '+JSON.stringify(resp.data));
            }).catch(e => {
                console.log('changeEnterpriseInfo exists error: ', e);
            })
        },
        changeCapitalInfo() {
            if(this.capitalForm.flag) return false;
            let capitalForm = this.capitalForm;
            capitalForm.projectId = this.projectId;
            capitalForm.startInvestDate = capitalForm.startInvestDate;
            capitalForm.exitDate = capitalForm.exitDate;
            let {id, projectTurnId, appraisementAmount, investAmount, stockProportion, oldAmount, currency, stock, investmentCapital, startInvestDate, exitDate } = this.capitalForm;
            let params = {
                projectId : this.projectId,
                id, projectTurnId, appraisementAmount, investAmount, stockProportion, oldAmount, currency, stock, investmentCapital, startInvestDate, exitDate };
            changeCapitalInfo(capitalForm).then(resp => {
                if(resp.data.status == '200'){
                    this.disable(capitalForm);
                }
            }).catch(e => {
                console.log('changeCapitalInfo exists error: ', e);
            })
        },
    },
    components: {
        tabelHeader
    }
}
</script>


<style lang="less" scoped>
.title {
    margin-bottom: 12px;
}

.form {
    width: 100%;
    height: 100%;
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
                outline: none;
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
</style>
