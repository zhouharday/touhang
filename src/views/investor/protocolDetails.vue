<template>
<div class="protocolDetails">
    <el-form :model="AgreementInfo" label-position="left" label-width="120px">
        <el-row :gutter="10">
            <el-col :span="12">
                <el-form-item label="协议名称">
                    <el-input v-model="AgreementInfo.agreementName" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="结构级">
                    <el-select v-model="AgreementInfo.structuralLevelId" placeholder="请选择结构级" style="width:100%;">
                        <el-option v-for="item in structuralLevel" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="投资者">
                    <el-select v-model="AgreementInfo.inverstorId" style="width: 100%">
                        <el-option :key="AgreementInfo.inverstorId" :label="AgreementInfo.investorName" :value="AgreementInfo.inverstorId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="基金名称">
                    <el-select v-model="AgreementInfo.fundId" placeholder="请选择基金名称" style="width:100%;">
                        <el-option v-for="item in fundName" :key="item.id" :label="item.fundName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="认缴金额（元）" width="100">
                    <el-input v-model="AgreementInfo.subscribeAmount" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="签订日期">
                    <el-date-picker v-model="AgreementInfo.signDate" type="date" placeholder="选择日期" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="投资经理">
                    <el-select v-model="AgreementInfo.regionName" style="width:100%">
                        <el-option v-for="(item, index) of investmentManager" :key="item.id" :label="item.dicName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="登记日期">
                    <el-date-picker v-model="AgreementInfo.registerDate" type="date" placeholder="选择日期" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="投资协议附件">
                    <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52"></Icon>
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
import {getAllNormalFund} from 'api/investor'
export default {
    props: {
        AgreementInfo: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            fundName: [],
            investmentManager: [{
                dicName: JSON.parse(sessionStorage.getItem('userInfor')).name,
                id: JSON.parse(sessionStorage.getItem('userInfor')).id
            }],
            structuralLevel: [{
                value: '0',
                label: '优先级'
            }, {
                value: '1',
                label: '中间级'
            }, {
                value: '2',
                label: '一般级'
            }, {
                value: '3',
                label: '平层'
            }, {
                value: '4',
                label: 'GP'
            }, {
                value: '5',
                label: 'LP'
            }]
        }
    },
    created() {
        getAllNormalFund().then((res) => {
            if (res.status == '200') {
                this.fundName = res.data.result
            }
        }).catch(err => {
            let response = err.response
            this.$Message.error(response.message || '获取基金选择列表！')
        })
    }
}
</script>

<style lang="less" scoped>
.protocolDetails {
    width: 100%;
    height: 100%;
}
</style>
