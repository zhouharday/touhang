<template>
<div class="fundsModal">
    <el-form :model="fundsInfo" label-position="left" label-width="120px">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-form-item label="协议名称">
                    <el-select v-model="fundsInfo.agreementName" style="width:100%">
                        <el-option v-for="(item, index) of allAgreement" :key="item.id" :label="item.agreementName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="投资者">
                    <el-input v-model="fundsInfo.investorName" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="基金名称">
                    <el-input v-model="fundsInfo.fundName" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="认缴金额（元）" width="100">
                    <el-input v-model="fundsInfo.subscribeAmount" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="剩余金额（元）" width="100">
                    <el-input v-model="fundsInfo.residueAmount" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="实缴金额（元）" width="100">
                    <el-input v-model="fundsInfo.paidAmount" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="出资日期">
                    <el-date-picker v-model="fundsInfo.paidDate" type="date" placeholder="选择日期" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="经办人">
                    <el-select v-model="fundsInfo.handler" style="width:100%">
                        <el-option v-for="(item, index) of investmentManager" :key="item.id" :label="item.dicName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="经办日期">
                    <el-date-picker v-model="fundsInfo.handlingDate" type="date" placeholder="选择日期" style="width: 100%;">
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
        fundsInfo: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            allAgreement: []
        }
    },
    created() {
        getAgreementAmountList(this.$route.params.userId, JSON.parse(sessionStorage.getItem('merchants'))[0].id).then((res) => {
            if (res.status == '200') {
                this.allAgreement = res.data.result.list
            }
        }).catch(err => {
            let response = err.data
            this.$Message.error(response.message || '获取资金明细失败！')
        })
    }
}
</script>

<style lang="less" scoped>
.fundsModal {
    width: 100%;
    height: 100%;
}
</style>
