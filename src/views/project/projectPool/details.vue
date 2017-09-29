<template>
    <div class="form">
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
                            <el-select v-model="basicForm.projectType" filterable placeholder="请选择项目类型" style="width:100%" :disabled="basicForm.flag">
                                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属行业" prop="industry">
                             <el-select v-model="basicForm.industry" filterable placeholder="请选择所属行业" style="width:100%" :disabled="basicForm.flag">
                                <el-option v-for="item in industryOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目来源" prop="projectFrom">
                             <el-select v-model="basicForm.projectFrom" filterable placeholder="请选择项目来源" style="width:100%" :disabled="basicForm.flag">
                                <el-option v-for="item in fromOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在地" prop="address">
                             <el-select v-model="basicForm.address" filterable placeholder="请选择所在地" style="width:100%" :disabled="basicForm.flag">
                                <el-option v-for="item in addressOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col  :span="12">
                        <el-form-item label="业务部门" prop="department">
                             <el-select v-model="basicForm.department" filterable placeholder="请选择业务部门" style="width:100%" :disabled="basicForm.flag">
                                <el-option v-for="item in departmentOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <tabel-header :data="headerInfo_company" @add="disable(companyForm)" @show="changeEnterpriseInfo()" class="title"></tabel-header>
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
                            <el-input  type="textarea" v-model="companyForm.remark" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>


<script>
import tabelHeader from 'components/tabelHeader'
import { changeEnterpriseInfo, changeProjectInfo } from 'api/project';
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
        projectData: {
            type: Object,
            default: {}
        },
        projectId: {
            type: String,
            default: ''
        }
    },
    watch: {
        projectData(val, oldVal) {
            this.init();
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
            typeOptions: [{  //项目类型下拉列表
                value: '选项1',
                label: '类型一'
            }],
           fromOptions: [{  //项目来源下拉列表
                value: '选项1',
                label: '来源一'
            }],
            industryOptions: [{  //所属行业下拉列表
                value: '选项1',
                label: '行业一'
            }],
            addressOptions: [{  //所在地下拉列表
                value: '选项1',
                label: '地区一'
            }],
            departmentOptions: [{  //部门下拉列表
                value: '选项1',
                label: '部门一'
            }]
        }
    },
    created() {

    },
    methods: {
        init() {
            this.disableForm();
        },
        disableForm() {
            this.disable(this.basicForm);
            this.disable(this.companyForm);
        },
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
.form {
    width: 100%;
    height: 100%;
}

.title {
    margin-bottom: 12px;
}
</style>
