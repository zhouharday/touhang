<template>
<div class="add">
    <my-details :formDetails="formDetails" :formMIS="formMIS" :formRegistration="formRegistration" :formAccountinfo="fundAccinfo">
    </my-details>
</div>
</template>

<script type="text/ecmascript-6">
import Details from './details'
export default {
    data() {
        return {
            formDetails: {
                fundName: '',
                fundNo: '',
                fundScale: '', //基金规模
                manageTypeId: '',
                orgTypeId: '',
                fundInvestId: '',
                fundOrg: '',
                fundTerm: '',
                startDate: '',
                endDate: '',
                fundUserId: '',
                businessDeptId: '',
                yearsDaynum: '', //年天数
                merchantId: '', //商户ID
                mainInvestField: '', //主要投资领域
                incomeDis: '', //收益分配
                fundRemarks: '' //备注
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
                fundId: '', //必传
                regDate: '', //注册日期
                regAddress: '', //注册地址
                recordStatus: '', //1：未备案 2：已经备案
                recordDate: '', //备案日期
                recordNo: '' //备案号
            },
            fundAccinfo: [{
                username: "基本户户名",
                openingBank: "基本户开户行",
                accountNumber: "123456789",
                accountType: 1
            }, {
                username: "托管户户名",
                openingBank: "托管户开户行",
                accountNumber: "123456789",
                accountType: 2
            }, {
                username: "募集结算账户户名",
                openingBank: "募集结算账户开户行",
                accountNumber: "123457",
                accountType: 3
            }]
        }
    },
    components: {
        myDetails: Details
    }
}
</script>

<style lang="less" scoped>
@import '../../common/styles/variable.less';
.add {
    width: 100%;
    min-height: 100%;
    background: @color-base;
}
</style>
