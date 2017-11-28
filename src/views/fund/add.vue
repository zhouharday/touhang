<template>
<div class="add">
    <my-details :loading="loading" :formDetails="formDetails" :formMIS="formMIS" :formRegistration="formRegistration" :formAccountInfo="formAccountInfo" :fundLevel="fundLevel" :showOrhiddren="showOrhiddren" :editInfo="editInfo" @confirmSubmission="confirmSubmission" @confirmCancel="confirmCancel">
    </my-details>
</div>
</template>

<script type="text/ecmascript-6">
import Details from './details'
import {mapState} from 'vuex'
import {
    addFund
} from 'api/fund'
export default {
    data() {
        return {
            showOrhiddren: false,
            formDetails: {
                fundName: '',
                fundNo: '',
                fundScale: '',
                manageTypeId: '',
                orgTypeId: '',
                fundInvestId: '',
                fundOrg: '',
                fundTerm: '',
                startDate: '',
                endDate: '',
                businessDeptId: '',
                yearsDaynum: '',
                versionRecord: '',
                fundStatus: '',
                fundType: '',
                mainInvestField: '',
                incomeDis: '',
                fundRemarks: '',
                createUserId: JSON.parse(sessionStorage.getItem('userInfor')).id,
                merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id
            }, //详情 - 基本信息
            formMIS: {
                fundStratorId: '', //基金管理人
                fundCustodianId: '', //基金托管人
                fundSupervisorId: '', // 基金监管人
                fundSuperintId: '', // 基金监理人
                fundAdvisorId: '', // 基金投资顾问
                fundOrganizationId: '' // 第三方合作机构
            }, //详情 - 管理信息
            formAccountInfo: [{
                username: '',
                openingBank: '',
                accountNumber: '',
                accountType: 1,
                accountTypeName: '基本户'
            }, {
                username: "",
                openingBank: "",
                accountNumber: "",
                accountType: 2,
                accountTypeName: "托管户"
            }, {
                username: '',
                openingBank: '',
                accountNumber: '',
                accountType: 3,
                accountTypeName: "募集结算账户"
            }],
            fundLevel: {
                priority: '',
                intermediateStage: '',
                generalLevel: ''
            },
            formData: {},
            editInfo: false,
        }
    },
    methods: {
        confirmSubmission(data) {
            this.formData = {
                fundBaseInfo: this.formDetails,
                fundManageInfo: this.formMIS,
                fundAccinfo: this.formAccountInfo
            }
            this.formDetails.fundOrgValue = this.fundLevel.priority + ':' + this.fundLevel.intermediateStage + ':' + this.fundLevel.generalLevel
            addFund(this.formData).then((res) => {
                if (res.status == '200') {
                    this.loading = data;
                    this.$Message.success(res.data.message || '添加成功！')
                    this.$store.dispatch('getFundLists').then(() => {
                        this.$router.push('/home/myfund')
                        this.formDetails = lnitFormDetails,
                        this.formMIS = lnitformMIS
                        this.formAccountInfo = lnitformAccountInfo
                    })
                }
            })
        },
        addFormData() {
            let lnitFormDetails = {
                fundName: '',
                fundNo: '',
                fundScale: '',
                manageTypeId: '',
                orgTypeId: '',
                fundInvestId: '',
                fundOrg: '',
                fundTerm: '',
                startDate: '',
                endDate: '',
                businessDeptId: '',
                yearsDaynum: '',
                versionRecord: '',
                fundStatus: '',
                fundType: '',
                mainInvestField: '',
                incomeDis: '',
                fundRemarks: '',
                createUserId: JSON.parse(sessionStorage.getItem('userInfor')).id,
                merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id
            }
            let lnitformMIS = {
                fundStratorId: '', //基金管理人
                fundCustodianId: '', //基金托管人
                fundSupervisorId: '', // 基金监管人
                fundSuperintId: '', // 基金监理人
                fundAdvisorId: '', // 基金投资顾问
                fundOrganizationId: '' // 第三方合作机构
            }
            let lnitformAccountInfo = [{
                    username: '',
                    openingBank: '',
                    accountNumber: '',
                    accountType: 1,
                    accountTypeName: '基本户'
                }, {
                    username: "",
                    openingBank: "",
                    accountNumber: "",
                    accountType: 2,
                    accountTypeName: "托管户"
                }, {
                    username: '',
                    openingBank: '',
                    accountNumber: '',
                    accountType: 3,
                    accountTypeName: "募集结算账户"
                }]
        }
    },
    components: {
        myDetails: Details
    },
    created(){
        this.loading = false;
    },
    computed: {
    ...mapState({
      loading: state => state.login.loading
    })
  },
}
</script>

<style lang="less" scoped>
@import '../../common/styles/variable.less';
.add {
    width: 100%;
    min-height: 100%;
    background: @color-base;
    padding: 20px;
}
</style>
