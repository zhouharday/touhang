<template>
    <div class="form">
        <tabel-header :data="headerInfo_basic" @add="disable(basicForm)" @show="changeProjectInfo()" class="title"></tabel-header>
        <div class="basicForm">
            <el-form ref="basicForm" :model="basicForm" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="项目名称">
                            <el-input v-model="basicForm.projectName" :disabled="basicForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目简称">
                            <el-input v-model="basicForm.projectShortName" :disabled="basicForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目类型">
                            <el-input v-model="basicForm.projectType" :disabled="basicForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属行业">
                            <el-input v-model="basicForm.industry" :disabled="basicForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目来源">
                            <el-input v-model="basicForm.projectFromId" :disabled="basicForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在地">
                            <el-input v-model="basicForm.address" :disabled="basicForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="业务部门">
                            <el-input v-model="basicForm.departmentId" :disabled="basicForm.flag"></el-input>
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
                        <el-form-item label="企业名称">
                            <el-input v-model="companyForm.enterpriseName" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="法人代表">
                            <el-input v-model="companyForm.legalPerson" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="注册资本（元）">
                            <el-input v-model="companyForm.registeredCapital" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="实收资本（元）">
                            <el-input v-model="companyForm.paiclCapital" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="注册登记日期">
                            <!-- <el-input></el-input> -->
                            <el-date-picker type="date" v-model="companyForm.registerDate" :disabled="companyForm.flag" style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="统一信用代码">
                            <el-input v-model="companyForm.creditCode" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="注册地址">
                            <el-input v-model="companyForm.registerAddress" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="办公地址">
                            <el-input v-model="companyForm.workAddress" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="主营业务">
                            <el-input v-model="companyForm.mainBusiness" :disabled="companyForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="备注">
                            <el-input v-model="companyForm.remark" :disabled="companyForm.flag"></el-input>
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
        projectId: {
            type: String,
            default: ''
        }
    },
    watch: {
        basicForm(val, oldVal) {
            console.log(val, oldVal);
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
            }
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            setTimeout(() => {
                this.disable(this.basicForm);
                this.disable(this.companyForm);    
            }, 3e3);
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
            console.log(JSON.stringify(basicForm));
            changeProjectInfo(basicForm).then(resp => {
                this.disable(basicForm);
                console.log('changeProjectInfo resp: ', resp);
            }).catch(e => {
                console.log('changeProjectInfo exists error: ', e);
            })
        },
        changeEnterpriseInfo() {
            let companyForm = this.companyForm;
            companyForm.projectId = this.projectId;
            console.log(JSON.stringify(companyForm));
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
