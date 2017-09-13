<template>
<div class="treeMenu">
    <el-row>
        <el-col :span="24" class="parent" :class="{stair: model.children && !model.menuContent}">
            <el-row>
                <!-- {{!isFolder}} -->
                <!-- {{model}} -->
                <el-col :span="spanCount">
                    <div class="title" @click="toggle($event, model, currentIndex)">
                        <Icon v-if="!isFolder && model.children" :type="[open ? 'chevron-right': 'chevron-down']">
                        </Icon>
                        <span class="info">{{ model.menuName }}</span>
                        <span v-if="model.menuContent"><el-checkbox v-model="checked"></el-checkbox></span>
                    </div>
                </el-col>
                <el-col :span="18" class="add_border_left" v-if="model.menuContent">
                    <div class="dataDetails" v-for="(text, index) of model.menuContent">
                        <div class="btn_group" v-if="text.label === 'button'">
                            <div class="btn" v-for="(btn, btnIndex) of text.details">
                                <el-button size="small" class="btnStyle">{{btn}}</el-button>
                            </div>
                        </div>
                        <div class="checkbox" v-else="text.label === 'checkbox'">
                            <el-checkbox-group v-model="text.checkedList">
                                <span class="detailsTitle">{{text.detailsTitle}}</span>
                                 <el-checkbox v-for="(checkbox, checkedIndex) in text.details"  :label="checkbox" :key="checkedIndex">{{checkbox}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="24">
            <el-row v-show="open" v-if="!isFolder">
                <tree-menu v-for="item in model.children" :model="item"></tree-menu>
            </el-row>
        </el-col>
    </el-row>
</div>
</template>

<script type="text/ecmascript-6">
import {mapMutations} from 'vuex'
export default {
    name: 'treeMenu',
    props: {
        model: {
            type: Object,
            default: {}
        },
        currentIndex: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            open: true,
            isFolder: false,
            spanCount: 24,
            modelID: 0
        }
    },
    created() {
        if(this.model.menuContent) {
            this.spanCount = 6
        } else {
            this.spanCount = 24
        }
    },
    computed: {
        isFolder: function() {
            return this.model.children && this.model.children.length
        }
    },
    methods: {
        toggle(event, model, index) {
            // console.log(index)
            // console.log(model.pId)
            console.log(this.$refs.title)
            this.modelID = model.id
            if (!this.isFolder) {
                this.open = !this.open
            }
            this.SET_MUNE(model)
        },
        ...mapMutations([
            'SET_MUNE'
        ])
    }
    // watch: {
    //     modelID(oldval, newval) {
    //
    //         if(newval == oldval) {
    //             return
    //         } else {
    //             this.$refs.title.style.background = 'red'
    //         }
    //     }
    // }
}
</script>

<style lang="less" scoped>
@import "../common/styles/variable.less";
.treeMenu {
    width: 100%;
    .parent {
        line-height: 46px;
        border: 1px solid #dfe6ec;
        .add_border_left{
            border-left: 2px solid #dfe6ec;
            padding-left: 12px;
        }
        .title {
            line-height: 36px;
            padding: 5px 18px;
            .info {
                padding-left: 12px;
                padding-right: 8px;
            }
            &:hover{
                background: #dfe6ec;
            }
        }
        .dataDetails {
            width: 100%;
            .btn_group {
                display: flex;
                .btnStyle{
                    margin: 0 6px;
                    color: @color-theme-red;
                }
            }
            .detailsTitle{
                margin-right: 8px;
            }
        }
    }
    .stair {
        background: #eef1f6;
        /*border-top: 1px solid #dfe6ec;*/
        border-bottom: 1px solid #dfe6ec;
        .add_border_right{
            border: none;
        }
    }
}
</style>
