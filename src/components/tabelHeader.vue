<template>
    <div class="tableHeader">
        <div class="title">
            <div class="desc">{{data.desc}}</div>
            <div class="btn">
                <el-button class="btnwrapper"
                           size="small"
                           v-show="data.icon_a"
                           @click="Ensure">
                    <Icon :type="data.icon_a"></Icon>
                    <span>{{data.explain_a}}</span>
                </el-button>
                <el-button class="btnwrapper"
                           size="small"
                           v-show="data.icon_b"
                           @click="click">
                    <Icon :type="data.icon_b"></Icon>
                    <span>{{data.explain_b}}</span>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        data: {
            type: Object,
            default: {}
        }
    },
    methods: {
        click() {
            this.$emit('method')
        },
        Ensure() {
            this.$emit('ensure')
        }
    }
}
</script>

<style lang="less" scoped>
.tableHeader{
    width: 100%;
    height: 100%;
    .title {
        width: 100%;
        height: 42px;
        line-height: 42px;
        background: #2a3142;
        color: #fff;
        padding: 0 26px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        .desc {
            flex: 1;
            text-align: left;
        }
        .btn {
            flex: 1;
            text-align: right;
            line-height: 42px;
            .btnwrapper {
                float: right;
                transition: 1s all;
                background: #2a3142;
                border: 1px solid #2a3142;
                font-size: 14px;
                color: #fff;
                outlione: none;
                &:hover {
                    background: #ff4949;
                    border: 1px solid #ff4949;
                    transform: scale(1.1);
                }
            }
        }
    }
}
</style>
