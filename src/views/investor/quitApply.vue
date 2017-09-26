<template>
<div class="quitApply">
    <el-form :model="quitApplyInfo" label-position="left" label-width="120px">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-form-item label="协议名称">
                    <el-select v-model="quitApplyInfo.agreementName" style="width:100%">
                        <el-option v-for="(item, index) of agreementData" :key="item.id" :label="item.agreementName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="投资者">
                    <el-select v-model="quitApplyInfo.investorName" style="width:100%">
                        <el-option v-for="(item, index) of investor" :key="item.inverstorId" :label="item.investorName" :value="item.inverstorId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="基金名称">
                    <el-select v-model="quitApplyInfo.fundName" style="width:100%">
                        <el-option v-for="(item, index) of agreementData" :key="item.fundId" :label="item.fundName" :value="item.fundId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="退出金额（元）" width="100">
                    <el-input v-model="quitApplyInfo.shareMoney" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="退出日期">
                    <el-date-picker v-model="quitApplyInfo.shareDate" type="date" placeholder="选择日期" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="经办人">
                    <el-select v-model="quitApplyInfo.managerId" style="width:100%">
                        <el-option v-for="(item, index) of investmentManager" :key="item.id" :label="item.dicName" :value="item.managerId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="经办日期">
                    <el-date-picker v-model="quitApplyInfo.handlingDate" type="date" placeholder="选择日期" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="投资协议附件">
                    <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击或将文件拖拽到这里上传</p>
                        </div>
                    </Upload>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</div>
</template>

<script type="text/ecmascript-6">
import {getAgreementAmountList} from 'api/investor'
export default {
    props: {
        quitApplyInfo: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            allAgreement: [],
            agreementData: [],
            investmentManager: [{
                dicName: JSON.parse(sessionStorage.getItem('userInfor')).name,
                managerId: JSON.parse(sessionStorage.getItem('userInfor')).id
            }],
            investor: [{
                investorName: this.$store.state.investor.investorName,
                inverstorId: this.$route.params.userId
            }]
        }
    },
    created() {
        getAgreementAmountList(this.$route.params.userId, JSON.parse(sessionStorage.getItem('merchants'))[0].id).then((res) => {
            if(res.status == '200') {
                this.agreementData = res.data.result.list
            }
        })
        this.quitApplyInfo.investorName = this.$store.state.investor.investorName
    }
}
</script>

<style lang="less" scoped>
.quitApply {
    width: 100%;
    height: 100%;
}
</style>
