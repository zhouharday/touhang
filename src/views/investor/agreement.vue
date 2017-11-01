<template>
<div class="agreement">
    <tableHeader :data="dataTitle" @add="showAgreement"></tableHeader>
    <el-table :data="agreementData" border style="width: 100%;">
        <el-table-column label="协议名称" prop="agreementName" align="center">
        </el-table-column>
        <el-table-column label="基金名称" prop="fundName" align="center">
        </el-table-column>
        <el-table-column label="结构级" align="center">
            <template scope="scope">
                <div v-if="scope.row.structuralLevelId == '0'">优先级</div>
                <div v-else-if="scope.row.structuralLevelId == '1'">中间级</div>
                <div v-else-if="scope.row.structuralLevelId == '2'">一般级</div>
                <div v-else-if="scope.row.structuralLevelId == '3'">平层</div>
                <div v-else-if="scope.row.structuralLevelId == '4'">GP</div>
                <div v-else-if="scope.row.structuralLevelId == '5'">LP</div>
            </template>
        </el-table-column>
        <el-table-column label="认缴金额（元）" align="center">
            <template scope="scope">
                <div>{{scope.row.subscribeAmount | toMoney}}</div>
            </template>
        </el-table-column>
        <el-table-column label="签订日期" align="center">
            <template scope="scope">
                <div>{{scope.row.signDate | formatDate}}</div>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-button  type="text" size="small" style="color:#f05e5e"
                      @click="handleEdit(scope.$index, scope.row)">
                      编辑
              </el-button>
              <el-button type="text" size="small" style="color:#f05e5e"
                      @click="handleDelete(scope.$index, scope.row)">
                      删除
              </el-button>
            </template>
        </el-table-column>
    </el-table>
    <Modal v-model="modelAgreement" title="协议信息详情" width="800">
        <protocol-details :AgreementInfo="AgreementInfo" ref="agreementDetails"></protocol-details>
        <div slot="footer">
            <Button type="text" @click="cancel">取消</Button>
            <Button type="primary" @click="confirmIncome">确认</Button>
        </div>
    </Modal>
    <!-- 确认删除模态框 -->
    <delete-reminders :deleteReminders="deleteReminders" @cancel="cancelAgreement" @del="delAgreement"></delete-reminders>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
import protocolDetails from './protocolDetails'
import deleteReminders from 'components/deleteReminders'
import '../../common/js/filter'
import { mapActions } from 'vuex'
import {
    addAgreement,
    updateAgreement,
    deleteAgreement,
    GetProtocolsList
} from 'api/investor'
export default {
    props: {
        agreementData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            dataTitle: {
                btnGroup: [{
                    explain: '添加'
                }]
            },
            addOrModify: true,
            modelAgreement: false,
            deleteReminders: false,
            deleteId: '',
            AgreementInfo: {}
        }
    },
    methods: {
        showAgreement() {
            let new_AgreementInfo = {
                id: '',
                agreementName: '',
                structuralLevelId: '',
                investorName: this.$store.state.investor.investorName || sessionStorage.getItem('INVESTORNAME'),
                inverstorId: this.$route.params.userId,
                fundId: '',
                subscribeAmount: '',
                signDate: '',
                managerName: JSON.parse(sessionStorage.getItem('userInfor')).name,
                merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id,
                registerDate: new Date()
            };
            this.AgreementInfo = new_AgreementInfo;
            this.modelAgreement = true;
            this.addOrModify = true;
        },
        handleEdit(index, row) {
            row.documentInfo.map((x) => {
                x.name = x.fileName,
                x.url = x.filePath
            })
            row.signDate = new Date(row.signDate)
            this.modelAgreement = true
            this.addOrModify = false
            this.deleteReminders = false
            this.AgreementInfo = row
            this.AgreementInfo.subscribeAmount = parseFloat(this.AgreementInfo.subscribeAmount)
            this.AgreementInfo.registerDate = row.register_date
            this.AgreementInfo.structuralLevelId = this.AgreementInfo.structuralLevelId.toString()
        },
        handleDelete(index, row) {
            this.deleteReminders = !this.deleteReminders
            this.deleteId = row.id
        },
        cancel() {
            var agreementInfo = this.$refs.agreementDetails.$refs.AgreementInfo
            agreementInfo.resetFields()
            this.modelAgreement = false
        },
        confirmIncome() {
            var agreementInfo = this.$refs.agreementDetails.$refs.AgreementInfo
            agreementInfo.validate((valid) => {
                if (valid) {
                    if(this.addOrModify == true) {
                        addAgreement(this.AgreementInfo).then((res) => {
                            if(res.status == '200') {
                                this.$Message.success(res.data.message || '签约成功！')
                                // this.modelSign = false
                                this._getAgreementList()
                                this.modelAgreement = false
                            }
                        })
                    } else {
                        // console.log(this.AgreementInfo)
                        updateAgreement(this.AgreementInfo).then((res) => {
                            if(res.status == '200') {
                                this.$Message.success(res.data.message || '修改成功！')
                                // this.modelSign = false
                                this._getAgreementList()
                                this.modelAgreement = false
                            }
                        })
                    }
                } else {
                    return false
                }
            })
        },
        delAgreement() {
            deleteAgreement(this.deleteId).then((res) => {
                if (res.status == '200') {
                    this.$Message.success(res.data.message || '删除协议成功！')
                    this.deleteReminders = false
                    this._getAgreementList()
                }
            })
        },
        cancelAgreement() {
            this.deleteReminders = false
        },
        _getAgreementList() {
            GetProtocolsList(this.$route.params.userId).then((res) => {
                if (res.status == '200') {
                    this.agreementData = res.data.result.list
                    this.getAgreementInfo(res.data.result.list)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        ...mapActions([
            'getAgreementInfo'
        ])
    },
    components: {
        tableHeader,
        protocolDetails,
        deleteReminders
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
