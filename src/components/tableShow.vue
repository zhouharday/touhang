<template>
<div class="mytabel">
    <div class="mytabel_wrapper">
        <div class="list">
            <div class="list_title default">最新估值（元）</div>
            <div class="list_content default">{{data.newAppra | toMoney}}</div>
            <div class="list_title default">最新浮盈（元）</div>
            <div class="list_content default">{{data.newFuy | toMoney}}</div>
        </div>
        <div class="list">
            <div class="list_title default">投资金额（元）</div>
            <div class="list_content default">{{data.appraisementDate | formatDate}}</div>
            <div class="list_title default">股权占比（%）</div>
            <div class="list_content default">{{data.fundScale | toMoney}}</div>
        </div>
        <div class="list">
            <div class="list_title default">退出金额（元）</div>
            <div class="list_content default">{{data.placementSum | toMoney}}</div>
            <div class="list_title default">退出收益（元）</div>
            <div class="list_content default">{{data.investAmount | toMoney}}</div>
        </div>
        <div class="list">
            <div class="list_title default">收益率（%）</div>
            <div class="list_content default">{{data.remain | toMoney}}</div>
            <div class="list_title default">项目费用（元）</div>
            <div class="list_content default">{{data.waitAmount | toMoney}}</div>
        </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import '../common/js/filter'
export default {
    props: {
        data: {
            type: Object,
            default: {}
        },
    }
}
</script>

<style lang="less" scoped>
.mytabel {
    width: 100%;
    .mytabel_wrapper{
        width: 100%;
        border-left: 1px solid #ccc;
        border-top: 1px solid #ccc;
        .list{
            display: flex;
            .default {
                padding: 4px 18px;
                line-height: 55px;
                border-right: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
            }
            .list_title {
                background: #eef0f4;
                flex: 1 22%;
            }
            .list_content{
                flex: 1 28%;
            }
        }
    }
}
</style>