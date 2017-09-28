<template>
    <div class="myFilter">
        <ul class="choose">
            <li class="lists">
                <div class="title" v-show="chooseInfo.title">
                    {{chooseInfo.title}}
                </div>
                <div class="ul_list">
                    <ul class="listWrapper">
                        <li class="list" v-for="(list, index) of chooseInfo.details" :key="list">
                            <el-button @click="changeList(index)" class="btn" :class="{active: index == currentIndex}">
                                {{list.dicName}}
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
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    methods: {
        changeList(index) {
            this.currentIndex = index
        },
    }
}
</script>

<style lang="less" scoped>
@import "../common/styles/variable.less";
.myFilter {
    width: 100%;
    background: @color-base;
    .lists {
        width: 100%;
        height: 42px;
        margin: 6px 0;
        display: flex;
        .title {
            flex: 0 0 80px;
            height: 100%;
            line-height: 42px;
            font-size: 14px;
            font-weight: bold;
        }
        .ul_list {
            flex: 1;
            line-height: 42px;
            .listWrapper {
                display: flex;
                .list {
                    margin-right: 24px;
                    width:70px;
                    height:20px;
                    display: inline-block;
                    box-sizing: border-box;
                    /*margin-right: 30px;*/
                    margin-bottom: 5px;
                }
                .btn {
                    border: none;
                    &:hover {
                       color:#495060;
                    }
                    &.active {
                        background: @color-theme-red;
                        color:@color-base;
                        width: 70px;
                        height: 20px;
                        text-align: center;
                        border-radius: 15px;
                        padding: 0;
                    }
                    
                }
            }
        }
    }
}
</style>
