<template>
<div class="agreement">
    <tableHeader :data="dataTitle" @add="showAgreement"></tableHeader>
    <el-table :data="agreementData" border style="width: 100%;">
        <el-table-column label="协议名称" prop="protocolName">
        </el-table-column>
        <el-table-column label="基金名称" prop="fundName">
        </el-table-column>
        <el-table-column label="结构级" prop="structural">
        </el-table-column>
        <el-table-column label="认缴金额（元)" prop="amount">
        </el-table-column>
        <el-table-column label="签订日期" prop="date">
        </el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small"
                      @click="handleEdit(scope.$index, scope.row)">
                      编辑
              </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="协议信息详情" :visible.sync="modelAgreement" :close-on-click-modal="false">
        <el-form :model="AgreementInfo" label-position="left">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="协议名称" :label-width="formLabelWidth">
                        <el-input v-model="AgreementInfo.investorName" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="结构级" :label-width="formLabelWidth" width="100">
                        <el-input v-model="AgreementInfo.investorTypeId" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="投资者" :label-width="formLabelWidth">
                        <el-input placeholder="请输入内容" v-model="AgreementInfo.certificateTypeId">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金名称" :label-width="formLabelWidth">
                        <el-input v-model="AgreementInfo.certificateNum" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="认缴金额（元）" :label-width="formLabelWidth" width="100">
                        <el-input v-model="AgreementInfo.organizationProperty" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="签订日期" :label-width="formLabelWidth">
                        <el-input placeholder="请输入内容" v-model="AgreementInfo.personalAssets">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="投资经理" :label-width="formLabelWidth">
                        <el-input placeholder="请输入内容" v-model="AgreementInfo.regionName">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="登记日期" :label-width="formLabelWidth">
                        <el-input v-model="AgreementInfo.investmentManagerId" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="投资协议附件" :label-width="formLabelWidth">
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
        <div slot="footer" class="dialog-footer">
            <el-button @click="modalIncome = false">取 消</el-button>
            <el-button type="primary" @click="confirmIncome">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            dataTitle: {
                btnGroup: [{
                    explain: '添加'
                }]
            },
            modelAgreement: false,
            agreementData: [{
                protocolName: '双子金服合伙协议',
                fundName: '红杉资本',
                structural: '优先级',
                amount: 10000,
                date: '2017-9-9'
            }, {
                protocolName: '双子金服合伙协议',
                fundName: '红杉资本',
                structural: '优先级',
                amount: 10000,
                date: '2017-9-9'
            }, {
                protocolName: '双子金服合伙协议',
                fundName: '红杉资本',
                structural: '优先级',
                amount: 10000,
                date: '2017-9-9'
            }],
            formLabelWidth: '120px',
            AgreementInfo: {}
        }
    },
    methods: {
        showAgreement() {
            this.modelAgreement = true
        }
    },
    components: {
        tableHeader
    }
}
</script>

<style lang="less" scoped>
@import '../../common/styles/variable.less';
@import '../../common/styles/mixin.less';
.agreement {
    width: 100%;
    height: 100%;
}
</style>
