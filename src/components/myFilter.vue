<template>
<div class="myFilter">
    <ul class="choose">
        <li v-for="(item, index) of chooseInfo" class="lists" key="index">
            <div class="title" v-show="item.title">
              {{item.title}}
            </div>
            <div class="ul_list">
                <ul class="listWrapper">
                    <li class="list" v-for="(list, nowIndex) of item.details">
                        <el-button @click="changeList(index, nowIndex)"
                                   :class="{active: nowIndex == 0}"
                                   class="btn">
                            {{list}}
                        </el-button>
                    </li>
                </ul>
            </div>
        </li>
    </ul>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    /* 默认数据结构
      chooseInfo: [{
         title: '组织类型',
         details: ['全部', '公司型']
      }]
   */
    props: {
        chooseInfo: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            currentIndex: '',
            parentIndex: '',
            changed: false
        }
    },
    methods: {
        changeList(index, val) {
            console.log(index)
            console.log(val)
            // this.parentIndex = index
            // this.currentIndex = val
        },
    },
    watch: {
        parentIndex(val, oldval) {

        }
    }
}
</script>

<style lang="less" scoped>
@import "../common/styles/variable.less";
.myFilter {
    width: 100%;
    background: @color-base;
    .lists{
        width: 100%;
        height: 42px;
        margin: 6px 0;
        display: flex;
        .title{
            flex: 0 0 120px;
            height: 100%;
            line-height: 42px;
        }
        .ul_list{
            flex: 1;
            line-height: 42px;
            .listWrapper{
                display: flex;
                .list{
                    margin-right: 24px;
                }
                .btn{
                    border: none;
                    &.active,
                    &.default{
                        background: @color-theme-red;
                    }
                }
            }
        }
    }
}
</style>
