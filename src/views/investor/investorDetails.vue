<template>
<div class="investorDetails">
    <div class="header">
        <el-row class="info">
            <el-col class="name" :span="3">{{titleInfo.name}}</el-col>
            <el-col class="total" :span="21">
                <el-row :gutter="20">
                    <el-col :xs="8" :sm="12" :md="10" :lg="6" v-for="(item, index) of titleInfo.total" :key="item.index">
                        <p class="desc">{{item.desc}}</p>
                        <p class="amount">{{item.amount | toMoney}}<span class="unit">元</span></p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
    <div class="tabs">
        <el-tabs v-model="detailsName" type="card" @tab-click="getTabs">
            <el-tab-pane label="基本信息" name="info">
                <baseInfo @investorDetailsInfo="investorDetailsInfo"></baseInfo>
            </el-tab-pane>
            <el-tab-pane label="投资者文档" name="invDoc">
                <investorDoc :investmentData="investmentData"></investorDoc>
            </el-tab-pane>
            <el-tab-pane label="投资协议" name="agree">
                <agreement :agreementData="agreementData"></agreement>
            </el-tab-pane>
            <el-tab-pane label="资金明细" name="funddet" class="tab_list">
                <investment :investorData="investorData"></investment>
            </el-tab-pane>
            <el-tab-pane label="拜访记录" name="visiting">
                <visitingRecord :visitingRecord="visitingRecord"></visitingRecord>
            </el-tab-pane>
        </el-tabs>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import "../../common/js/filter"
import baseInfo from "./baseInfo"
import investorDoc from './investorDoc'
import agreement from "./agreement"
import visitingRecord from "./visitingRecord"
import investment from './investment'
import {selectProjectOrFundDocument} from 'api/fund'
import {
    GetProtocolsList,
    getVisitingRecordList,
    getAgreementAmountList
} from 'api/investor'

export default {
    data() {
        return {
            titleInfo: {
                name: '双子金服',
                total: [{
                    desc: '累计投资：',
                    amount: '888888'
                }, {
                    desc: '累计收益：',
                    amount: '666666'
                }]
            },
            agreementData: [],
            visitingRecord: [],
            investorData: [],
            investmentData: [], // 投资者文档
            detailsName: 'info',
            paramsId: ''
        }
    },
    methods: {
        getTabs(tab, event) {
            if (tab.name == 'agree') {
                GetProtocolsList(this.$route.params.userId).then((res) => {
                    if (res.status == '200') {
                        // console.log(res)
                        this.agreementData = res.data.result.list
                    }
                }).catch(err => {
                    console.log(err)
                })
            } else if (tab.name == 'visiting') {
                getVisitingRecordList(this.$route.params.userId).then((res) => {
                    if (res.status === 200) {
                        this.visitingRecord = (res.data.status == '200') ? res.data.result.list : []
                    }
                }).catch(err => {
                    let response = err.data
                    this.$Message.error(response.message || '获取拜访记录失败！')
                })
            } else if (tab.name == 'funddet') {
                var invId = this.$route.params.userId
                var merId = JSON.parse(sessionStorage.getItem('merchants'))[0].id
                getAgreementAmountList(invId, merId).then((res) => {
                    if (res.status == '200') {
                        this.investorData = res.data.result.list
                    }
                }).catch(err => {
                    let response = err.data
                    this.$Message.error(response.message || '获取资金明细失败！')
                })
            } else if (tab.name == 'invDoc') {
                selectProjectOrFundDocument(this.$route.params.userId, 3).then((res) => {
                    if (res.status == '200') {
                        // console.log(res)
                        this.investmentData = res.data.result
                    }
                })
            }
        },
        investorDetailsInfo(value) {
            // console.log(value)
            this.titleInfo.name = value.investorName
            if (value.investAmountSum === null) {
                this.titleInfo.total[0].amount = 0
            } else {
                this.titleInfo.total[0].amount = value.investAmountSum
            }
            if (value.investAmountSum === null) {
                this.titleInfo.total[1].amount = 0
            } else {
                this.titleInfo.total[1].amount = value.earningsAmountSum
            }
        }
    },
    components: {
        baseInfo,
        investorDoc,
        agreement,
        investment,
        visitingRecord
    }
}
</script>

<style lang="less" scoped>
@import '../../common/styles/mixin.less';
@import '../../common/styles/variable.less';
.investorDetails {
    position: relative;
    .base-style();
    .header {
        width: 100%;
        max-height: 60px;
        margin-bottom: @height-small;
        overflow: hidden;
        .info {
            width: 100%;
            height: 60px;
            line-height: 60px;
            background: @color-theme;
            color: @color-base;
            .name {
                padding: 0 12px;
                font-size: @font-size-large-x;
            }
            .desc {
                display: inline-block;
                font-size: @font-size-large;
            }
            .amount {
                display: inline-block;
                color: @color-theme-red;
                .unit {
                    margin: 0 12px;
                    color: @color-base;
                }
            }

        }
    }
    .tabs {
        width: 100%;
        clear: both;
        overflow: hidden;
    }
    .page {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: right;
        position: absolute;
        bottom: 0;
        right: 0;
    }
}
</style>
