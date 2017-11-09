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
                        <el-option v-for="item in structuralLevel" :key="item.id" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="投资者" prop="investorName">
                    <el-input v-model="AgreementInfo.investorName" disabled>
                    </el-input>
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
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="登记日期" prop="registerDate">
                    <el-date-picker v-model="AgreementInfo.registerDate" type="date" placeholder="选择日期" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <!-- {{AgreementInfo.documentInfo}} -->
                <el-form-item label="投资协议附件">
                    <upload-files @uploadSuccess="uploadSuccess" :documentInfo="AgreementInfo.documentInfo"></upload-files>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</div>
</template>

<script type="text/ecmascript-6">
import {getAllNormalFund} from 'api/investor'
import uploadFiles from 'components/uploadFiles'
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
            structuralLevel: [{
                label: '优先级',
                value: '0'
            }, {
                label: '中间级',
                value: '1'
            }, {
                label: '一般级',
                value: '2'
            }, {
                label: '平层',
                value: '3'
            }, {
                label: 'GP',
                value: '4'
            }, {
                label: 'LP',
                value: '5'
            }],
            rules1: {
                agreementName: [{
                    required: true,
                    message: '请输入协议名称',
                    trigger: 'blur'
                }],
                structuralLevelId: [{
                    required: true,
                    message: '请选择结构级',
                    trigger: 'blur'
                }],
                inverstorId: [{
                    required: true,
                    message: '请选择投资者',
                    trigger: 'blur'
                }],
                fundId: [{
                    required: true,
                    message: '请选择基金名称',
                    trigger: 'blur'
                }],
                subscribeAmount: [{
                    type: 'number',
                    required: true,
                    message: '认缴金额应为数字',
                    trigger: 'blue'
                }],
                signDate: [{
                    type: 'date',
                    required: true,
                    message: '请选择签订日期',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        uploadSuccess(list) {
            this.AgreementInfo.documentInfo = list
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
    },
    components: {
        uploadFiles
    }
}
</script>

<style lang="less" scoped>
.protocolDetails {
    width: 100%;
    height: 100%;
    .demo-upload-list {
        display: flex;
        min-height: 30px;
        text-align: center;
        line-height: 30px;
        margin: 12px 0;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        border-radius: 4px;
        border: 1px solid #ddd;
        /*box-shadow: 0 1px 1px rgba(0,0,0,.2);*/
        margin-right: 4px;
        span {
            flex: 1;
        }
    }
    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }
    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
}
</style>
