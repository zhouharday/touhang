<template>
<div class="add">
    <my-details :formDetails="formDetails" :formMIS="formMIS" :formRegistration="formRegistration" :formAccountinfo="formAccountinfo">
    </my-details>
</div>
</template>

<script type="text/ecmascript-6">
import Details from 'views/fund/details'
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
                fundStratorId: "基金管理人ID",
                fundCustodianId: "基金托管人ID",
                fundSupervisorId: "基金监理人ID",
                fundSuperintId: "基金监管人ID",
                fundAdvisorId: "基金投资顾问ID",
                fundOrganizationId: "第三方合作机构ID"
            },
            formRegistration: {
                fundId: "00aa0be68d204e6c9995e7c26d929589", //必传
                regDate: '2017-09-15', //注册日期
                regAddress: "陕西西安市", //注册地址
                recordStatus: "1", //1：未备案 2：已经备案
                recordDate: '2017-08-15', //备案日期
                recordNo: "123456" //备案号
            },
            formAccountinfo: {
                id: "1899cb8b6b0049caa74ef4480d56ea6e", //必传参数 其他根据需要传
                fundBasename: "431",
                baseOpbank: "43",
                baseAccout: "43",
                fundTtshipname: "423",
                ttshipOpbank: "4134",
                ttshipAccout: "432",
                fundRaisename: "4213",
                raiseOpbank: "423",
                raiseAccout: "4234"
            }
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
