<template>
<div class="mytable">
    <div class="table">
        <ul class="header">
            <li class="list" v-for="(item, index) of titleInfo">
                <div class="label">{{item.label}}</div>
            </li>
        </ul>
        <ul class="v-content" v-for="(text, index) of tableData">
            <li class="list" v-for="value of text">
                <div class="value" v-html="value">
                    <slot></slot>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>
<script type="text/ecmascript-6">
export default {
    props: {
        titleInfo: {
            type: Array,
            default: []
        },
        tableData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            childrenNode: []
        }
    },
    methods: {
        _getChildren(arr) {
            var children = []
            arr.map((x) => {
                children.concat(Object.values(x))
            })
            this.childrenNode = children
        }
    },
    computed() {
        this._getChildren(tableData)
    }
}
</script>

<style lang="less" scoped>
@import "../common/styles/variable.less";
.mytable {
    width: 100%;
    background: @color-base;
    padding: 24px;
    .table {
        width: 100%;
        height: 42px;
        .header,
        .v-content {
            width: 100%;
            height: 100%;
            display: flex;
            overflow: hidden;
        }
        .header {
            background-color: #eef1f6;
            .label {
                padding: 6px 12px;
            }
        }
        .v-content {
            .value {
                padding: 6px 12px;
            }
        }
        .list {
            flex: 1;
            text-align: center;
            line-height: 30px;
            color: #1f2d3d;
            white-space: nowrap;
            text-align: left;
            border: 1px solid #dfe6ec;
            border-collapse: collapse;
        }
    }
}
</style>
