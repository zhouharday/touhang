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
    <Modal v-model="InvDetails" title="添加出资明细" width="800px">
        <funds-modal :fundsInfo="InvInfo" ref="fundsModal" :editOrAdd="add"></funds-modal>
        <div slot="footer">
            <Button type="text" @click="cancelInvDetails">取消</Button>
            <Button type="primary" @click="addInvDetails">确认</Button>
        </div>
    </Modal>
    <!-- 添加退出模态框 -->
    <Modal v-model="bonusDetails" title="添加退出明细" width="800px">
        <quit-apply :quitApplyInfo="bonusInfo" ref="bonusModal"></quit-apply>
        <div slot="footer">
            <Button type="text" @click="cancelInvBonus">取消</Button>
            <Button type="primary" @click="addInvBonus">确认</Button>
        </div>
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
            add: false,
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
                handlingDate: new Date(), // 经办日期v
                shareMoney: '', //退出金额v
                shareDate: '', //退出日期v
                managerId: JSON.parse(sessionStorage.getItem('userInfor')).id, //投资经理ID（当前登录用户ID）v
                managerName: JSON.parse(sessionStorage.getItem('userInfor')).name
            },
            quitCapitalData: [] //退出详情列表
        }
    },
    methods: {
        changeTabs(name) {
            if (name === 'secede') {
                this._getAmountList()
            }
        },
        handleTabsAdd() {
            if (this.tabsName == 'contribution') {
                let invInfo = {
                    investorName: '',
                    subscribeAmount: '', //认缴金额
                    fundName: '', //基金
                    paidDate: '', //出资日期
                    agreementName: '', //协议名称
                    residueAmount: '', //剩余金额
                    contributiveRatio: '', //出资占比
                    paidAmount: '', //实缴金额
                    documentInfo: [],
                    managerId: JSON.parse(sessionStorage.getItem('userInfor')).id, // 经办人id
                    managerName: JSON.parse(sessionStorage.getItem('userInfor')).name, // 经办人
                    handlingDate: new Date()
                }
                this.InvDetails = true
                this.add = true
                this.InvInfo = invInfo
            } else {
                let invbonusInfo = {
                    agreementName: '', // 协议名称v
                    investorName: '', // 投资者v
                    documentInfo: [],
                    fundName: '', // 基金名称v
                    handlingDate: new Date(), // 经办日期v
                    shareMoney: '', //退出金额v
                    shareDate: '', //退出日期v
                    managerId: JSON.parse(sessionStorage.getItem('userInfor')).id, //投资经理ID（当前登录用户ID）v
                    managerName: JSON.parse(sessionStorage.getItem('userInfor')).name
                }
                this.bonusDetails = true
                this.bonusInfo = invbonusInfo
            }
        },
        cancelInvDetails() {
            var fundsInfo = this.$refs.fundsModal.$refs.fundsInfo
            fundsInfo.resetFields()
            this.InvDetails = false
        },
        addInvDetails() {
            this.InvInfo.agreementId = this.InvInfo.agreementName
            var fundsInfo = this.$refs.fundsModal.$refs.fundsInfo
            fundsInfo.validate((valid) => {
                if (valid) {
                    addAgreementAmount(this.InvInfo).then((res) => {
                        if (res.status == '200') {
                            this.$Message.success(res.data.message || '添加出资成功！')
                            this._getContributionDetails()
                            this.InvDetails = false
                        }
                    })
                } else {
                    return false
                }
            })
            this.add = false
        },
        cancelInvBonus() {
            var quitApplyInfo = this.$refs.bonusModal.$refs.quitApplyInfo
            quitApplyInfo.resetFields()
            this.bonusDetails = false
        },
        addInvBonus() {
            var quitApplyInfo = this.$refs.bonusModal.$refs.quitApplyInfo
            this.bonusInfo.agreementId = this.bonusInfo.agreementName
            quitApplyInfo.validate((valid) => {
                if (valid) {
                    addEarningsAmount(this.bonusInfo).then((res) => {
                        if (res.status == '200') {
                            this.$Message.success(res.data.message || '添加退出成功！')
                            this._getAmountList()
                            this.bonusDetails = false
                        } else {
                            this.$Message.success(res.data.message || '同一协议不能多次退出！')
                        }
                    })
                } else {
                    return false
                }
            })
        },
        _getContributionDetails() { // 获取出资明细
            var invId = this.$route.params.userId
            var merId = JSON.parse(sessionStorage.getItem('merchants'))[0].id
            getAgreementAmountList(invId, merId).then((res) => {
                if (res.status == '200') {
                console.log(res.data.result.list);
                    this.investorData = res.data.result.list
                }
            }).catch(err => {
                let response = err.data
                this.$Message.error(response.message || '获取资金明细失败！')
            })
        },
        _getAmountList() { // 获取退出明细
            var fundId = this.$route.params.userId
            var merchantsId = JSON.parse(sessionStorage.getItem('merchants'))[0].id
            getEarningsAmountList(fundId, merchantsId).then((res) => {
                if (res.status == '200') {
                    // console.log(res.data.result.list)
                    this.quitCapitalData = res.data.result.list
                }
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
    .cancal {
        color: #F05E5E;
        background-color: transparent;
        border-color: #F05E5E;
    }
    .confirm {
        color: #fff;
        background-color: #F05E5E;
        border-color: #F05E5E;
    }
}
</style>
