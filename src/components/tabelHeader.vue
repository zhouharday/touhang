<template>
<div class="tableHeader">
    <div class="title" ref="title">
        <div class="desc">
            <slot></slot>
            <span v-show="data.desc">{{data.desc}}</span>
        </div>
        <div class="btn" ref="btn">
            <el-button v-for="(btn, index) in data.btnGroup" :key="btn.index" @click="handler(index, $event)" class="btnwrapper" ref="btnwrapper" v-show="data.btnGroup">
                <Icon :type="btn.icon" v-show="btn.icon"></Icon>
                <span v-show="btn.explain" class="explain">{{btn.explain}}</span>
            </el-button>
        </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
     mounted() {
        this._theme()
    },
    props: {
        data: {
            type: Object,
            default: {}
        },
        theme: {
            type: String,
            default: '#2a3142'
        }
    },
    methods: {
        handler(index, event) {
            if (index == 0) {
                this.$emit('add', event.target)
            } else if (index == 1) {
                this.$emit('show', event.target)
            } else if (index == 2) {
                this.$emit('down', event.target)
            } else {
                return
            }
        },
        _theme() {
            this.$refs.title.style.background = this.theme;
            console.log(this.$refs.btnwrapper);
            for (var i = 0; i < this.$refs.btnwrapper.length; i++) {
                var btnwrapper = this.$refs.btnwrapper
                if (this.theme == '#2a3142') {
                    btnwrapper[i].$el.style.color = '#fff'
                } else {
                    btnwrapper[i].$el.style.color = '#1f2d3d'
                }
            }
        }
    },
    // mounted() {
    //     this._theme()
    // }
}
</script>

<style lang="less" scoped>
@import "../common/styles/variable.less";
.tableHeader {
    .title {
        width: 100%;
        height: 42px;
        line-height: 42px;
        background: @color-theme;
        color: @color-base;
        padding: 0 26px;
        margin-bottom: @font-size-small;
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
                transition: 0.3s all;
                background: transparent;
                margin-right: @font-size-small;
                border: none;
                font-size: 14px;
                color: #fff;
                outlione: none;
                &:hover {
                    color: @color-base;
                    background: @color-theme-red;
                    transform: scale(1.1);
                }
                .explain {
                    margin-right: 6px;
                }
            }
        }
    }
}
</style>
