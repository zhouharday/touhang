<template>
<div class="investorDetails">
    <div class="header">
        <el-row class="info">
            <el-col class="name" :span="3">{{titleInfo.name}}</el-col>
            <el-col class="total" :span="21">
                <el-row :gutter="20">
                    <el-col :span="5" v-for="(item, index) of titleInfo.total" :key="item.index">
                        <p class="desc">{{item.desc}}</p>
                        <p class="amount">{{item.amount}}<span class="unit">元</span></p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
    <div class="tabs">
        <Tabs v-model="detailsName" type="card">
            <TabPane label="基本信息" name="info">
                <baseInfo :userId="paramsId"></baseInfo>
            </TabPane>
            <TabPane label="投资者文档" name="invDoc" class="tab_list">
                <investorDoc></investorDoc>
            </TabPane>
            <TabPane label="投资协议" name="agree" class="tab_list">
                <agreement :userId="paramsId"></agreement>
            </TabPane>
            <TabPane label="资金明细" name="funddet" class="tab_list">
                <fundDetails></fundDetails>
            </TabPane>
            <TabPane label="拜访记录" name="visiting" class="tab_list">
                <visitingRecord :userId="paramsId"></visitingRecord>
            </TabPane>
        </Tabs>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import baseInfo from "./baseInfo"
import investorDoc from './investorDoc'
import agreement from "./agreement"
import fundDetails from "./fundDetails"
import visitingRecord from "./visitingRecord"
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
            detailsName: 'info',
            paramsId: ''
        }
    },
    created() {
        this.paramsId = this.$route.params.userId
    },
    components: {
        baseInfo,
        investorDoc,
        agreement,
        fundDetails,
        visitingRecord
    }
}
</script>

<style lang="less" scoped>
@import '../../common/styles/mixin.less';
@import '../../common/styles/variable.less';
.investorDetails {
    .base-style();
    .header {
        width: 100%;
        padding-bottom: @height-small;
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
}
</style>
