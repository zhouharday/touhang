<template>
<div class="form">
    <fund-title :data="headerInfo_details" :edit="editInfo" @add="disable(formDetails)" class="add_margin" @confirm="handlerPreservation">
    </fund-title>
    <div class="formDetails">
        <el-form ref="formDetails" :model="formDetails" :rules="rules1" label-width="120px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="基金名称" prop="fundName">
                        <el-input v-model="formDetails.fundName" :disabled="formDetails.flag" placeholder="选择输入基金名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金编号" prop="fundNo">
                        <el-input v-model="formDetails.fundNo" :disabled="formDetails.flag" placeholder="选择输入基金编号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金规模(元)" prop="fundScale">
                        <el-input v-model.number="formDetails.fundScale" :disabled="formDetails.flag" placeholder="请输入基金规模"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="管理类型" prop="manageTypeId">
                        <el-select v-model="formDetails.manageTypeId" :disabled="formDetails.flag" style="width:100%">
                            <el-option v-for="(list, index) of managementType" :key="list.id" :label="list.dicName" :value="list.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="组织类型" prop="orgTypeId">
                        <el-select v-model="formDetails.orgTypeId" :disabled="formDetails.flag" style="width:100%">
                            <el-option v-for="(item, index) of OrgTypeList" :key="item.id" :label="item.dicName" :value="item.id">
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
                        <el-input v-model.number="formDetails.fundTerm" :disabled="formDetails.flag" placeholder="选择输入数字"></el-input>
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
    <!-- 基本信息 end -->
    <fund-title :data="headerInfo_MIS" :edit="editInfo" @add="disable(formMIS)" class="add_margin" @confirm="handlerFormMIS"></fund-title>
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
    <!-- 管理信息 end -->
    <fund-title :data="headerInfo_Registration" :edit="editInfo" @add="disable(formRegistration)" class="add_margin" v-show="showOrhiddren" @confirm="editRegistration">
    </fund-title>
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
                            <el-option label="未备案" value="1"></el-option>
                            <el-option label="已备案" value="2"></el-option>
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
    <!-- 备案注册 end -->
    <fund-title :data="headerInfo_Accountinfo" :edit="editInfo" @add="disableAccountinfo" class="add_margin" @confirm="getAccountInfo">
    </fund-title>
    <el-table :data="formAccountInfo" style="width: 100%">
        <el-table-column prop="accountTypeName" label="账户类型">
        </el-table-column>
        <el-table-column label="户名">
            <template scope="scope">
                <el-input v-model="scope.row.username" :disabled="scope.row.flag" placeholder="请输入内容"></el-input>
            </template>
        </el-table-column>
        <el-table-column label="开户行">
            <template scope="scope">
                <el-autocomplete class="inline-input"
                    v-model="scope.row.openingBank"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect"
                    style="width:100%;"
                    :disabled="scope.row.flag">
                </el-autocomplete>
            </template>
        </el-table-column>
        <el-table-column label="账号">
            <template scope="scope">
                <el-input v-model="scope.row.accountNumber"
                          placeholder="请输入内容"
                          :disabled="scope.row.flag">
                </el-input>
            </template>
        </el-table-column>
    </el-table>
    <!-- 账户信息 end -->
    <div class="btnList" v-if="!showOrhiddren">
        <el-button class="btn success" :disabled="formDetails.flag" @click="preservation">保存</el-button>
        <el-button :loading="loading" class="btn danger" :disabled="formDetails.flag" @click="cancel">取消</el-button>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import fundTitle from './fundTitle'
import {
    mapGetters
} from 'vuex'
import {
    selectAllManageCompany,
    sectorList,
    updateFundInfo,
    updateFundManageInfo,
    updateFundReg,
    updataFunAccInfo,
    getMyFundDetails
} from 'api/fund'
import {
    checkFundAuth
} from 'common/js/config'
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
        editInfo: {
            type: Boolean,
            default: true
        },
        showOrhiddren: {
            type: Boolean,
            default: false
        },
        authList: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            managementCompany: [],
            managementType: [], // 管理类型
            OrgTypeList: [], // 组织类型
            structure: '',
            businessDepartment: [],
            restaurants: [],
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
                    type: 'number',
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
                    type: 'number',
                    message: '请输入基金期限',
                    trigger: 'change'
                }],
                // startDate: [{
                //     type: 'date',
                //     required: true,
                //     message: '请选择时间',
                //     trigger: 'change'
                // }],
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
        disableAccountinfo() {
            this.formAccountInfo.map((x) => {
                x.flag = false
            })
        },
        handlerPreservation() { // 修改基本信息
            this.formDetails.fundOrgValue = this.fundLevel.priority + ':' + this.fundLevel.intermediateStage + ':' + this.fundLevel.generalLevel
            updateFundInfo(this.formDetails).then((res) => {
                if (res.status === 200) {
                    this.$Message.success(res.data.message || '基金名称已存在！')
                    this._getFundList()
                }
            })
        },
        handlerFormMIS() { // 修改管理信息
            updateFundManageInfo(this.formMIS).then((res) => {
                if (res.status === 200) {
                    this.$Message.success(res.data.message || '修改管理信息成功！')
                    this._getFundList()
                }
            })
        },
        editRegistration() { // 修改备案注册
            this.formRegistration.fundId = this.$route.params.id
            // console.log(this.formRegistration)
            updateFundReg(this.formRegistration).then((res) => {
                if (res.status === 200) {
                    this.$Message.success(res.data.message || '修改备案注册成功！')
                    this._getFundList()
                }
            })
        },
        getAccountInfo() { // 修改账户信息
            this.formAccountInfo.map((x) => {
                x.flag = false
            })
            updataFunAccInfo(this.formAccountInfo).then((res) => {
                if (res.status === 200) {
                    // console.log(res)
                    this.$Message.success(res.data.message || '修改账户成功！')
                    this._getFundList()
                }
            })
        },
        selectStructure(value) {
            this.structure = value
        },
        preservation() {
            var judgeDetails = false
            var judgeMis = false
            this.$refs.formDetails.validate((valid) => {
                if (valid) {
                    judgeDetails = true // 确认保存
                } else {
                    return false
                }
            })
            this.$refs.formMIS.validate((valid) => {
                if (valid) {
                    judgeMis = true // 确认保存
                } else {
                    return false
                }
            })
            if (judgeDetails && judgeMis) {
                this.$emit('confirmSubmission', false);
            }
        },
        cancel() {
            this.$emit('confirmCancel') // 确认取消
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
            // 调用 callback 返回建议列表的数据
            cb(results)
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
            }
        },
        loadAll() {
            return [{
                "value": "中国人民银行"
            }, {
                "value": "中国国家开发银行"
            }, {
                "value": "中国农业发展银行"
            }, {
                "value": "中国进出口银行"
            }, {
                "value": "中国工商银行"
            }, {
                "value": "中国农业银行"
            }, {
                "value": "中国银行"
            }, {
                "value": "中国建设银行"
            }, {
                "value": "中国光大银行"
            }, {
                "value": "中国民生银行"
            }, {
                "value": "华夏银行"
            }, {
                "value": "中信银行"
            }, {
                "value": "交通银行"
            }, {
                "value": "浙商银行"
            }, {
                "value": "兴业银行"
            }, {
                "value": "招商银行"
            }, {
                "value": "中信银行"
            }]
        },
        _getFundList() {
            getMyFundDetails(this.$route.params.id).then((res) => {
                if (res.status === 200) {
                    var fundBaseInfo = res.data.result.fundBaseInfo
                    fundBaseInfo.fundScale = parseFloat(fundBaseInfo.fundScale)
                    fundBaseInfo.fundTerm = parseFloat(fundBaseInfo.fundTerm)
                    this.formDetails = Object.assign({}, {
                        flag: true
                    }, fundBaseInfo)
                    this.formMIS = Object.assign({}, {
                        flag: true
                    }, res.data.result.fundManageInfo)
                    if(res.data.result.fundAccinfo) {
                        var fundAccinfo = res.data.result.fundAccinfo
                        fundAccinfo.map((x) => {
                            x.flag = true
                        })
                        this.formAccountInfo = fundAccinfo
                    }
                    this.formRegistration = Object.assign({}, {
                        flag: true
                    }, res.data.result.fundRegistration)
                }
            })
        }
    },
    mounted() {
        // console.log(!checkFundAuth('GL-JJXQ-BJ'))
        this.restaurants = this.loadAll()
        this.managementType = JSON.parse(sessionStorage.getItem('MANTYPE')) || this.getManType
        this.OrgTypeList = JSON.parse(sessionStorage.getItem('ORGTYPE')) || this.OrgType
    },
    computed: {
        // loading: function(){
        //     return this.$store.state.login.loading
        // },
        headerInfo_details: function() {
            if (checkFundAuth('GL-JJXQ-BJ', this.authList)) {
                return {
                    desc: '基本信息',
                    haveJurisdiction: true
                }
            } else {
                return {
                    desc: '基本信息',
                    haveJurisdiction: false
                }
            }
        },
        headerInfo_MIS: function() {
            if (checkFundAuth('GL-JJXQ-BJ', this.authList)) {
                return {
                    desc: '管理信息',
                    haveJurisdiction: true
                }
            } else {
                return {
                    desc: '管理信息',
                    haveJurisdiction: false
                }
            }
        },
        headerInfo_Registration: function() {
            if (checkFundAuth('GL-JJXQ-BJ', this.authList)) {
                return {
                    desc: '备案注册',
                    haveJurisdiction: true
                }
            } else {
                return {
                    desc: '备案注册',
                    haveJurisdiction: false
                }
            }
        },
        headerInfo_Accountinfo: function() {
            if (checkFundAuth('GL-JJXQ-BJ', this.authList)) {
                return {
                    desc: '账户信息',
                    haveJurisdiction: true
                }
            } else {
                return {
                    desc: '账户信息',
                    haveJurisdiction: false
                }
            }
        },
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
        // this.$store.dispatch('getAllOrg')
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
    },
    components: {
        fundTitle
    }
}
</script>

<style lang="less" scoped>
/*@import "../../common/styles/mixin.less";*/
/*.noBorder /deep/ input.el-input__inner {
    border: none;
}*/
.form {
    width: 100%;
    height: 100%;
    .formAccountinfo {
        .el-col {
            text-align: center;
        }
    }
    .add_margin {
        margin-bottom: 12px;
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
