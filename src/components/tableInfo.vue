<template>
    <div class="mytabel">
        <div class="mytabel_wrapper">
            <div class="list">
                <div class="list_title default">最新估值(元)</div>
                <div class="list_content default">{{data.newAppra | toMoney}}</div>
                <div class="list_title default">最新浮盈(元)</div>
                <div class="list_content default">
                    {{data.newFuy | toMoney}}
                    <Icon type="arrow-up-c" class="up" v-show="data.newFuy > 0"></Icon>
                    <Icon type="arrow-down-c" class="down" v-show="data.newFuy < 0"></Icon>
                </div>
            </div>
            <div class="list">
                <div class="list_title default">估值日期</div>
                <div class="list_content default">{{data.appraisementDate | formatDate}}</div>
                <div class="list_title default">基金规模(元)</div>
                <div class="list_content default">{{data.fundScale | toMoney | toBillion}}</div>
            </div>
            <div class="list">
                <div class="list_title default">募集总额(元)</div>
                <div class="list_content default">{{data.placementSum | toMoney}}</div>
                <div class="list_title default">投资总额(元)</div>
                <div class="list_content default">{{data.investAmount | toMoney}}</div>
            </div>
            <div class="list">
                <div class="list_title default">剩余额度(元)</div>
                <div class="list_content default">{{data.remain | toMoney}}</div>
                <div class="list_title default">待分配总额(元)</div>
                <div class="list_content default">{{data.waitAmount | toMoney}}</div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import "../common/js/filter";
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style lang="less" scoped>
.mytabel {
  width: 100%;
  .mytabel_wrapper {
    width: 100%;
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    .list {
      // display: flex;
      .default {
        padding: 4px 18px;
        line-height: 40px;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        line-height: 2;
      }
      .list_title {
        background: #eef0f4;
        // display: flex;
        // align-items: center;
        // flex: 1 18%;
        // flex-shrink: 0;
        // justify-content: center;
        text-align: center;
        width: 30%;
        float: left;
        font-size: 14px;
      }
      .list_content {
        // flex: 1 32%;
        // flex-shrink: 0;
        // display: flex;
        // align-items: center;
        width: 20%;
        float: left;
        text-align: center;
        font-size: 14px;
      }
      .up {
        color: #f05e5e;
        font-size: 20px;
        font-weight: 500;
        margin-left: 12px;
      }
      .down {
        color: green;
        font-size: 20px;
        font-weight: 500;
        margin-left: 12px;
      }
    }
  }
}
</style>
<!-- .lists {
    width: 100%;
    height: 100%;
    &::after {
        content: ".";
        height: 0;
        visibility: hidden;
        display: block;
        clear: both;
    }
    .list {
        float: left;
        width: 50%;
        height: 52px;
        display: flex;
        justify-content: flex-start;
        .keys {
            flex: 2;
            line-height: 52px;
            text-align: center;
            background: #eef0f4;
            border: 1px solid #e6e8ec;
            border-collapse:collapse
        }
        .values {
            flex: 3;
            line-height: 52px;
            text-align: center;
            border: 1px solid #e6e8ec;
            border-collapse:collapse;
            .value_icon{
                margin-left: 10px;
            }
            .up{
                color: #ff4949;
            }
            .down{
                color: green;
            }
        }
    }
} -->
