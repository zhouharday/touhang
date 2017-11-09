<template>
    <div class="form">
        <!-- 基本信息 -->
        <tabel-header :data="headerInfo_basic" @add="disable(basicForm)" @show="changeProjectInfo()" class="title"></tabel-header>
        <div class="basicForm">
            <el-form ref="basicForm" :model="basicForm" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="项目名称" prop="projectName">
                            <el-input v-model="basicForm.projectName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目简称" prop="projectShortName">
                            <el-input v-model="basicForm.projectShortName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目类型" prop="type">
                             <el-input v-model="basicForm.type" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属行业" prop="industry">
                            <el-input v-model="basicForm.industry" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目来源" prop="projectFrom">
                            <el-input v-model="basicForm.projectFrom" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在地" prop="address">
                            <el-input v-model="basicForm.address" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="业务部门" prop="department">
                            <el-input v-model="basicForm.department" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- 企业信息 -->
        <tabel-header :data="headerInfo_company" @add="disable(companyForm)" @show="changeEnterpriseInfo()" class="title"></tabel-header>
        <div class="companyForm">
            <el-form ref="companyForm" :model="companyForm" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="企业名称" prop="enterpriseName">
                            <el-input v-model="companyForm.enterpriseName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="法人代表" prop="legalPerson">
                             <el-input v-model="companyForm.legalPerson" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="注册资本（元）" prop="registeredCapital">
                             <el-input v-model="companyForm.registeredCapital" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="实收资本（元）" prop="paiclCapital">
                             <el-input v-model="companyForm.paiclCapital" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="注册登记日期" prop="registerDate">
                             <el-input v-model="companyForm.registerDate" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="统一信用代码" prop="creditCode">
                             <el-input v-model="companyForm.creditCode" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="注册地址" prop="registerAddress">
                             <el-input v-model="companyForm.registerAddress" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="办公地址" prop="workAddress">
                             <el-input v-model="companyForm.workAddress" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="主营业务" prop="mainBusiness">
                             <el-input v-model="companyForm.mainBusiness" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="备注" prop="remark">
                             <el-input type="textarea" v-model="companyForm.remark" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- 投资信息 -->
        <tabel-header :data="headerInfo_capital" @add="disable(capitalForm)" class="title"></tabel-header>
        <div class="capitalForm">
            <el-form ref="capitalForm" :model="capitalForm" label-width="170px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="投资轮次" prop="projectTurn">
                            <el-input v-model="capitalForm.projectTurn" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目初始估值（元）" prop="appraisementAmount">
                            <el-input v-model="capitalForm.appraisementAmount" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="投资金额（元）" prop="investAmount">
                            <el-input v-model="capitalForm.investAmount" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="股权占比（%）" prop="stockProportion">
                            <el-input v-model="capitalForm.stockProportion" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="原币种金额" prop="oldAmount">
                            <el-input v-model="capitalForm.oldAmount" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="币种" prop="currency">
                            <el-input v-model="capitalForm.currencyName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="投资取得股份数（股）" prop="stock">
                            <el-input v-model="capitalForm.stock" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="投资取得注册资本（元）" prop="investmentCapital">
                            <el-input v-model="capitalForm.investmentCapital" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="初始投资时间" prop="startInvestDate">
                            <el-input v-model="capitalForm.startInvestDate" disabled style="width:100%">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目预计退出时间" prop="exitDate">
                            <el-input v-model="capitalForm.exitDate" disabled style="width:100%">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>


<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import tabelHeader from 'components/tabelHeader'
import { getDicChildren } from 'common/js/dictionary'
import { changeEnterpriseInfo, changeProjectInfo, getDeptListByMid } from 'api/project';
export default {
    props: {
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
        },
        isInTeam: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            headerInfo_basic: {
                desc: '基本信息'
            },
            headerInfo_company: {
                desc: '企业信息'
            },
            headerInfo_capital: {
                desc: '投资信息'
            },
        }
    },
    created() {
    },
    methods: {
        disable(name) {
            if (name.flag === false) {
                return name.flag = true
            } else {
                return name.flag = false
            }
        },
        changeProjectInfo() {
            let basicForm = this.basicForm;
            basicForm.projectId = this.projectId;
            changeProjectInfo(basicForm).then(resp => {
                this.disable(basicForm);
            }).catch(e => {
                console.log('changeProjectInfo exists error: ', e);
            })
        },
        changeEnterpriseInfo() {
            let companyForm = this.companyForm;
            companyForm.projectId = this.projectId;
            changeEnterpriseInfo(companyForm).then(resp => {
                this.disable(companyForm);
                console.log('changeEnterpriseInfo resp: ', resp);
            }).catch(e => {
                console.log('changeEnterpriseInfo exists error: ', e);
            })
        }
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
