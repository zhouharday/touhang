<template>
<div class="quitApply">
    <el-form :model="quitApplyInfo" :rules="rules1" ref="quitApplyInfo" label-position="left" label-width="120px">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-form-item label="协议名称" prop="agreementName">
                    <el-select v-model="quitApplyInfo.agreementName" @change="getItemData" style="width:100%">
                        <el-option v-for="(item, index) of agreementData" :key="item.id" :label="item.agreementName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="投资者" prop="investorName">
                    <el-select v-model="quitApplyInfo.investorName" disabled style="width:100%">
                        <el-option v-for="(investor, index) of agreementData" :key="investor.id" :label="investor.investorName" :value="investor.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="基金名称" prop="fundName">
                    <el-select v-model="quitApplyInfo.fundName" disabled style="width:100%">
                        <el-option v-for="(list, index) of agreementData" :key="list.id" :label="list.fundName" :value="list.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="退出金额（元）" prop="shareMoney" width="100">
                    <el-input v-model.number="quitApplyInfo.shareMoney" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="退出日期" prop="shareDate">
                    <el-date-picker v-model="quitApplyInfo.shareDate" type="date" placeholder="选择日期" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="经办人" prop="managerName">
                    <el-input v-model="quitApplyInfo.managerName" placeholder="当前用户" disabled style="width:100%">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="经办日期" prop="handlingDate">
                    <el-date-picker v-model="quitApplyInfo.handlingDate" type="date" placeholder="选择日期" style="width: 100%;">
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
// import {GetProtocolsList} from 'api/investor'
import {mapGetters} from 'vuex'
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
            agreementData: this.$store.state.investor.agreement || [],
            getAgreementValue: '',
            size: 1000,
            rules1: {
                agreementName: [{
                    required: true,
                    message: '请选择协议名称',
                    trigger: 'blue'
                }],
                shareMoney: [{
                    type: 'number',
                    required: true,
                    message: '退出金额必须为数字',
                    trigger: 'blue'
                }],
                shareDate: [{
                    type: 'date',
                    required: true,
                    message: '请选择时间',
                    trigger: 'blue'
                }]
            }
        }
    },
    methods: {
        getItemData(value) {
            this.getAgreementValue = value
            this.quitApplyInfo.investorName = value
            this.quitApplyInfo.fundName = value
        }
    },
    created() {
        // GetProtocolsList(this.$route.params.userId, this.size).then((res) => {
        //     if (res.status == '200') {
        //         this.agreementData = res.data.result.list
        //     }
        // })

        // this.quitApplyInfo.investorName = this.$store.state.investor.investorName
        this.agreementData = this.agreement
    },
    computed: {
        ...mapGetters([
            'agreement'
        ])
    }
}
</script>

<style lang="less" scoped>
.quitApply {
    width: 100%;
    height: 100%;
}
</style>
