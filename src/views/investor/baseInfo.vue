<template>
<div class="baseInfo">
    <tableHeader :data="dataTitle" @add="editInvestorForm"></tableHeader>
    <div class="form_wrapper">
        <investor-form :investorForm="baseInfo" :variable="variable"></investor-form>
        <el-row :gutter="10" v-show="!variable">
            <el-col :span="24" class="group">
                <el-button type="default" class="btn" @click="handlerCancel" :disabled="variable">取消</el-button>
                <el-button type="danger" :disabled="variable" class="btn" @click="handlerConfirm">保存</el-button>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
import investorForm from 'components/investorForm'
import {getInvestorDetails, updateInvestor} from 'api/investor'
export default {
    data() {
        return {
            dataTitle: {
                desc: '基本信息',
                btnGroup: [{
                    explain: '编辑'
                }]
            },
            formLabelWidth: '120px',
            investorTypeId: [],
            investmentManager: [{
                dicName: JSON.parse(sessionStorage.getItem('userInfor')).name,
                id: JSON.parse(sessionStorage.getItem('userInfor')).id
            }],
            baseInfo: {},
            variable: true
        }
    },
    methods: {
        handlerCancel() {
            this.variable = true
        },
        handlerConfirm() {
            updateInvestor(this.baseInfo).then((res) => {
                if(res.status == '200') {
                    this.$Message.success(res.data.message || '提交成功！')
                    this._getInvDetails()
                    this.variable = true
                }
            })
        },
        editInvestorForm() {
            this.variable = !this.variable
        },
        _getInvDetails() {
            getInvestorDetails(this.$route.params.userId).then((res) => {
                if (res.status == '200') {
                    // console.log(res)
                    this.baseInfo = res.data.record
                    this.$emit('investorDetailsInfo', res.data.record)
                }
            }).catch(err => {
                let response = err.response
                this.$Message.error(response.data.message)
            })
        }
    },
    created() {
        this._getInvDetails()
    },
    components: {
        tableHeader,
        investorForm
    }
}
</script>

<style lang="less" scoped>
@import '../../common/styles/variable.less';
@import '../../common/styles/mixin.less';
.baseInfo {
    .base-style();
    padding: 0;
    .form_wrapper {
        padding: 24px 0;
        .changeWid {
            width: 120px;
        }
        .group {
            text-align: center;
            .btn {
                width: 150px;
            }
        }
    }
}
</style>
