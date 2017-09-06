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
                        <el-button @click="changeList(index, nowIndex)" class="btn" :class="{active: parentIndex == index && currentIndex == nowIndex}">
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
const INDEX = 0
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
            currentIndex: INDEX, // 按钮本身index
            parentIndex: INDEX, // 上一级循环的index
        }
    },
    methods: {
        changeList(value, n) {
            this.currentIndex = n
            this.parentIndex = value
        },
    }
}
</script>

<style lang="less" scoped>
@import "../common/styles/variable.less";
.myFilter {
    width: 100%;
    background: @color-base;
    /*.choose {
        width: 100%;
        .lists {
            width: 100%;
            height: 42px;
            line-height: 42px;
            .title {
                width: 120px;
                height: 100%;
                float: left;
                text-align: center;
            }
            .ul_list {
                width: 100%;
                height: 100%;
                padding-left: 120px;
                li {
                    float: left;
                    padding: 0 12px;
                    .btn {
                        border: none;
                        &.active,
                        &.default {
                            color: @color-base;
                            background: @color-theme-red;
                        }
                    }
                }
            }
        }
    }*/
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
                    &.active{
                        background: @color-theme-red;
                    }
                }
            }
        }
    }
}
</style>
