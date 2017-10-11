<template>
<div class="agreement">
    <tableHeader :data="dataTitle" @add="showAgreement"></tableHeader>
    <el-table :data="agreementData" border style="width: 100%;">
        <el-table-column label="协议名称" prop="agreementName" align="center">
        </el-table-column>
        <el-table-column label="基金名称" prop="fundName" align="center">
        </el-table-column>
        <el-table-column label="结构级" prop="structuralLevelId" align="center">
        </el-table-column>
        <el-table-column label="认缴金额（元）" prop="subscribeAmount" align="center">
        </el-table-column>
        <el-table-column label="签订日期" prop="signDate" align="center">
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
    <Modal v-model="modelAgreement" title="协议信息详情" @on-ok="confirmIncome" @on-cancel="cancel" width="800">
        <protocol-details :AgreementInfo="AgreementInfo"></protocol-details>
    </Modal>
    <!-- 确认删除模态框 -->
    <delete-reminders :deleteReminders="deleteReminders" @cancel="cancelAgreement" @del="delAgreement"></delete-reminders>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
import protocolDetails from './protocolDetails'
import deleteReminders from 'components/deleteReminders'
import {addAgreement, updateAgreement, deleteAgreement} from 'api/investor'
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
            AgreementInfo: {
                id: '',
                agreementName: '',
                structuralLevelId: '',
                investorName: this.$store.state.investor.investorName || sessionStorage.getItem('INVESTORNAME'),
                inverstorId: this.$route.params.userId,
                fundId: '',
                subscribeAmount: '',
                signDate: '',
                regionName: '',
                merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id,
                registerDate: new Date()
            }
        }
    },
    methods: {
        showAgreement() {
            this.modelAgreement = true
            this.addOrModify = true
        },
        handleEdit(index, row) {
            this.modelAgreement = true
            this.addOrModify = false
            this.deleteReminders = false
            this.AgreementInfo = row
            this.AgreementInfo.registerDate = row.register_date
        },
        handleDelete(index, row) {
            this.deleteReminders = !this.deleteReminders
            this.deleteId = row.id
        },
        confirmIncome() {
            if(this.addOrModify == true) {
                addAgreement(this.AgreementInfo).then((res) => {
                    if(res.status == '200') {
                        this.$Message.success(res.data.message || '签约成功！')
                        this.modelSign = false
                    }
                })
            } else {
                console.log(this.AgreementInfo)
                updateAgreement(this.AgreementInfo).then((res) => {
                    if(res.status == '200') {
                        this.$Message.success(res.data.message || '修改成功！')
                        this.modelSign = false
                    }
                })
            }
        },
        delAgreement() {
            deleteAgreement(this.deleteId).then((res) => {
                if(res.status == '200') {
                    this.$Message.success(res.data.message || '删除协议成功！')
                }
            })
        },
        cancelAgreement() {
            this.deleteReminders = false
        }
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
