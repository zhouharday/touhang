<template>
<div class="investmentDetails">
    <Tabs v-model="tabsName" @on-click="changeTabs">
        <TabPane label="出资" name="contribution">
            <fundDetails :investorData="investorData"></fundDetails>
        </TabPane>
        <TabPane label="退出" name="secede">
            <quitCapital :quitCapitalData="quitCapitalData"></quitCapital>
        </TabPane>
        <Button type="ghost" @click="handleTabsAdd" slot="extra">添加</Button>
    </Tabs>
    <!-- 添加出资模态框 -->
    <Modal v-model="InvDetails" title="添加出资明细" @on-ok="addInvDetails" @on-cancel="cancelInvDetails" width="800px">
        <funds-modal :fundsInfo="InvInfo"></funds-modal>
    </Modal>
    <!-- 添加退出模态框 -->
    <Modal v-model="bonusDetails" title="添加退出明细" @on-ok="addInvBonus" @on-cancel="cancelInvBonus" width="800px">
        <quit-apply :quitApplyInfo="bonusInfo"></quit-apply>
    </Modal>
</div>
</template>

<script type="text/ecmascript-6">
import fundDetails from "./fundDetails"
import fundsModal from "./fundsModal"
import quitApply from './quitApply'
import quitCapital from './quitCapital'
import {
    addAgreementAmount,
    addEarningsAmount,
    getAgreementAmountList,
    getEarningsAmountList
} from 'api/investor'
import {changeDate} from 'common/js/config'
export default {
    props: {
        investorData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            InvDetails: false,
            bonusDetails: false,
            tabsName: 'contribution',
            InvInfo: {
                investorName: '',
                subscribeAmount: '', //认缴金额
                fundName: '', //基金
                paidDate: '', //出资日期
                agreementName: '', //协议名称
                residueAmount: '', //剩余金额
                contributiveRatio: '', //出资占比
                paidAmount: '', //实缴金额
                managerId: JSON.parse(sessionStorage.getItem('userInfor')).id, // 经办人id
                managerName: JSON.parse(sessionStorage.getItem('userInfor')).name, // 经办人
                handlingDate: new Date()
            },
            bonusInfo: {
                agreementName: '', // 协议名称v
                investorName: '', // 投资者v
                fundName: '', // 基金名称v
                handlingDate: '', // 经办日期v
                shareMoney: '', //退出金额v
                shareDate: '', //退出日期v
                managerId: JSON.parse(sessionStorage.getItem('userInfor')).id,//投资经理ID（当前登录用户ID）v
                managerName: JSON.parse(sessionStorage.getItem('userInfor')).name
            },
            quitCapitalData: [] //退出详情列表
        }
    },
    methods: {
        handleTabsAdd() {
            if(this.tabsName == 'contribution') {
                this.InvDetails = true
            } else {
                this.bonusDetails = true
            }
        },
        addInvDetails() {
            this.InvInfo.agreementId = this.InvInfo.agreementName
            addAgreementAmount(this.InvInfo).then((res) => {
                if (res.status == '200') {
                    this.$Message.success(res.data.message || '添加出资成功！')
                    this.getContributionDetails()
                    this.InvDetails = false
                }
            })
        },
        addInvBonus() {
            this.bonusInfo.agreementId = this.bonusInfo.agreementName
            addEarningsAmount(this.bonusInfo).then((res) => {
                if (res.status == '200') {
                    this.$Message.success(res.data.message || '添加退出成功！')
                    var fundId = this.$route.params.userId
                    var merchantsId = JSON.parse(sessionStorage.getItem('merchants'))[0].id
                    getEarningsAmountList(fundId, merchantsId).then((res) => {
                        if(res.status == '200') {
                            this.quitCapitalData = res.data.result.list
                        }
                    })
                } else {
                    this.$Message.success(res.data.message || '同一协议不能多次退出！')
                }
            })
        },
        getContributionDetails() { // 获取出资明细
            var invId = this.$route.params.userId
            var merId = JSON.parse(sessionStorage.getItem('merchants'))[0].id
            getAgreementAmountList(invId, merId).then((res) => {
                if (res.status == '200') {
                    this.investorData = res.data.result.list
                    // console.log(this.investorData)
                }
            }).catch(err => {
                let response = err.data
                this.$Message.error(response.message || '获取资金明细失败！')
            })
        }
    },
    components: {
        fundDetails,
        fundsModal,
        quitCapital,
        quitApply
    }
}
</script>

<style lang="less" scoped>
.investmentDetails {
    width: 100%;
    height: 100%;
}
</style>
