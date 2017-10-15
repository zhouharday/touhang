<template>
    <div class="protocolDetails">
        <el-form :model="AgreementInfo" :rules="rules1" ref="AgreementInfo" label-position="left" label-width="120px">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="协议名称" prop="agreementName">
                        <el-input v-model="AgreementInfo.agreementName" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="结构级" prop="structuralLevelId">
                        <el-select v-model="AgreementInfo.structuralLevelId" placeholder="请选择结构级" style="width:100%;">
                            <el-option v-for="item in structuralLevel" :key="item.id" :label="item.label" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="投资者" prop="inverstorId">
                        <el-select v-model="AgreementInfo.inverstorId" style="width: 100%">
                            <el-option :key="AgreementInfo.inverstorId" :label="AgreementInfo.investorName" :value="AgreementInfo.inverstorId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金名称" prop="fundId">
                        <el-select v-model="AgreementInfo.fundId" placeholder="请选择基金名称" style="width:100%;">
                            <el-option v-for="item in fundNameList" :key="item.id" :label="item.fundName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="认缴金额（元）" prop="subscribeAmount" width="100">
                        <el-input v-model.number="AgreementInfo.subscribeAmount" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="签订日期" prop="signDate">
                        <el-date-picker v-model="AgreementInfo.signDate" type="date" placeholder="选择日期" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="投资经理" prop="managerName">
                        <el-input v-model="AgreementInfo.managerName" placeholder="当前用户" disabled></el-input>
                        <!-- <el-select v-model="AgreementInfo.managerName" disabled style="width:100%">
                            <el-option v-for="(item, index) of investmentManager" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select> -->
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="登记日期" prop="registerDate">
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
import { getAllNormalFund } from 'api/investor'
export default {
    props: {
        AgreementInfo: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            fundNameList: [],
            // investmentManager: [{
            //     dicName: JSON.parse(sessionStorage.getItem('userInfor')).name,
            //     id: JSON.parse(sessionStorage.getItem('userInfor')).id
            // }],
            structuralLevel: [{
                id: '0',
                label: '优先级'
            }, {
                id: '1',
                label: '中间级'
            }, {
                id: '2',
                label: '一般级'
            }, {
                id: '3',
                label: '平层'
            }, {
                id: '4',
                label: 'GP'
            }, {
                id: '5',
                label: 'LP'
            }],
            rules1: {
                agreementName: [
                    { required: true, message: '请输入协议名称', trigger: 'blur' }
                ],
                structuralLevelId: [
                    { required: true, message: '请选择结构级', trigger: 'change' }
                ],
                inverstorId: [
                    { required: true, message: '请选择投资者', trigger: 'change' }
                ],
                fundId: [
                    { required: true, message: '请选择基金名称', trigger: 'change' }
                ],
                subscribeAmount: [
                    { required: true, message: '请输入认缴金额'},
                    { type:'number', message: '认缴金额应为数字'}
                ],
                signDate: [
                    { type: 'date', required: true, message: '请选择签订日期', trigger: 'change' }
                ]
            }
        }
    },
    created() {
        getAllNormalFund().then((res) => {
            if (res.status == '200') {
                this.fundNameList = res.data.result
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
