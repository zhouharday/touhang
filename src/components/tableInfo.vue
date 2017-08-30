<template>
<div class="mytabel">
    <ul class="lists">
        <li v-for="(item, index) in data" class="list">
            <div class="keys">
                {{item.name}}
            </div>
            <div class="values">
                <span>{{Object.values(item)[0]}}</span>
                <span class="value_icon" v-show="item.updown">
                    <span class="up" v-show="item.updown>=0">
                        <Icon type="arrow-up-c"></Icon>
                    </span>
                    <span class="down" v-show="item.updown<0">
                        <Icon type="arrow-down-c"></Icon>
                    </span>
                </span>
                <span v-show="item.updown">{{item.updown}}%</span>
            </div>
        </li>
    </ul>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    created() {
        console.log(this.data)
    }
}
</script>

<style lang="less" scoped>
.mytabel {
    width: 100%;
    border: 1px solid #ccc;
    .lists {
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
    }
}
</style>
