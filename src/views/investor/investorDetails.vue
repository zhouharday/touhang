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

    <Tabs size="small">
        <TabPane label="标签一"><baseInfo></baseInfo></TabPane>
        <TabPane label="标签二"><investorDoc></investorDoc></TabPane>
        <TabPane label="标签三">标签三的内容</TabPane>
    </Tabs>
    <!-- <el-tabs v-model="activeName" type="card"> -->
        <!-- <el-tab-pane label="用户管理" name="first">
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
        <!-- <el-tab-pane label="基本信息" name="first">
            <baseInfo></baseInfo>
        </el-tab-pane>
        <el-tab-pane label="投资者文档" name="second">
            <investorDoc></investorDoc>
        </el-tab-pane>
        <el-tab-pane label="投资协议" name="third">
            <agreement></agreement>
        </el-tab-pane>
        <el-tab-pane label="资金明细" name="fourth">
            <fundDetails></fundDetails>
        </el-tab-pane>
        <el-tab-pane label="资金明细" name="five">
            <visitingRecord></visitingRecord>
        </el-tab-pane> -->
    <!-- </el-tabs> -->
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
            activeName: 'first'
        }
    },
    created() {
        console.log(this.$route.params)
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
