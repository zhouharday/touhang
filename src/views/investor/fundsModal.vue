<template>
<div class="fundsModal">
    <el-form :model="fundsInfo" :rules="rules1" ref="fundsInfo" label-position="left" label-width="120px">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-form-item label="协议名称" prop="agreementName">
                    <el-select v-model="fundsInfo.agreementName" @change="getItemData" style="width:100%">
                        <el-option v-for="(item, index) of allAgreement" :key="item.id" :label="item.agreementName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="投资者" prop="investorName">
                    <el-select v-model="fundsInfo.investorName" disabled style="width:100%">
                        <el-option v-for="(item, index) of allAgreement" :key="item.id" :label="item.investorName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="基金名称" prop="fundName">
                    <el-select v-model="fundsInfo.fundName" disabled style="width:100%">
                        <el-option v-for="(item, index) of allAgreement" :key="item.id" :label="item.fundName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="认缴金额（元）" prop="subscribeAmount">
                    <el-input v-model="fundsInfo.subscribeAmount" auto-complete="off" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="剩余金额（元）" width="100" prop="residueAmount">
                    <el-input v-model="fundsInfo.residueAmount" auto-complete="off" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="实缴金额（元）" width="100" prop="paidAmount">
                    <el-input v-model="fundsInfo.paidAmount" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="出资日期" prop="paidDate">
                    <el-date-picker v-model="fundsInfo.paidDate" type="date" placeholder="选择日期" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="经办人" prop="managerName">
                    <el-input v-model="fundsInfo.managerName" placeholder="当前用户" disabled style="width:100%">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="经办日期" prop="handlingDate">
                    <el-date-picker v-model="fundsInfo.handlingDate" type="date" placeholder="选择日期" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="出资协议附件">
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
import {
    GetProtocolsList
} from 'api/investor'
export default {
    props: {
        fundsInfo: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            allAgreement: [],
            agreementList: '',
            size: 1000,
            rules1: {
                agreementName: [{
                    required: true,
                    message: '请选择协议名称',
                    trigger: 'change'
                }],
                paidAmount: [{
                    required: true,
                    message: '请输入实缴金额',
                    trigger: 'change'
                }],
                paidDate: [{
                    type: 'date',
                    required: true,
                    message: '请选择时间',
                    trigger: 'change'
                }]
            }
        }
    },
    methods: {
        getItemData(val) {
            var current = ''
            this.agreementList = val
            this.fundsInfo.investorName = val
            this.fundsInfo.fundName = val
            this.allAgreement.forEach(elem => {
                if (elem.id === val) {
                    current = elem
                }
            })
            this.fundsInfo.subscribeAmount = current.subscribeAmount
            this.fundsInfo.residueAmount = current.residueAmount
        },
    },
    created() {
        GetProtocolsList(this.$route.params.userId, this.size).then((res) => {
            if (res.status == '200') {
                console.log(res)
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
