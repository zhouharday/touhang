<template>
<div class="fund">
    <div class="choose">
        <ul v-for="(item, index) in chooseInfo" class="lists">
            <li>{{item.title}}</li>
            <li class="list" v-for="(list, index) in item.details">
                <el-button @click="changeList(index)" class="btn" :class="{active: index == currentIndex}">
                    {{list}}
                </el-button>
            </li>
        </ul>
    </div>
    <div class="tables">
        <table-header :theme="theme"
                      :data="tableInfo"
                      @add="watchTarget"
                      @show="leadingIn"
                      @down="downloadTem">
            <el-input placeholder="请输入搜索内容" icon="search" v-model="input2" :on-icon-click="handleIconClick" style="width: 320px;">
            </el-input>
        </table-header>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="date" label="基金名称" width="180">
            </el-table-column>
            <el-table-column prop="name" label="基金编号" width="180">
            </el-table-column>
            <el-table-column prop="province" label="组织类型" width="180">
            </el-table-column>
            <el-table-column prop="city" label="管理类型" width="180">
            </el-table-column>
            <el-table-column prop="address" label="基金规模（元）" width="180">
            </el-table-column>
            <el-table-column prop="zip" label="募集总额（元）" width="180">
            </el-table-column>
            <el-table-column prop="province" label="投资总额（元）" width="180">
            </el-table-column>
            <el-table-column prop="city" label="剩余额度（元）" width="180">
            </el-table-column>
            <el-table-column prop="address" label="成立日期" width="180">
            </el-table-column>
            <el-table-column prop="zip" label="募集总额（元）" width="180">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template scope="scope">
                   <el-button @click="handleClick" type="text" size="small">查看</el-button>
                   <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
const INDEX = 0;
export default {
    data() {
        return {
            currentIndex: INDEX,
            theme: '#fff',
            tableInfo: {
                btnGroup: [{
                    explain: '模板下载'
                }, {
                    explain: '导入'
                }, {
                    icon: 'plus-round',
                    explain: '基金'
                }]
            },
            chooseInfo: [{
                title: '组织类型：',
                details: ['全部', '契约型', '公司型', '合伙型']
            }, {
                title: '管理类型：',
                details: ['全部', '自我管理', '委托管理', '顾问管理']
            }, {
                title: '基金阶段：',
                details: ['全部', '基金设立', '运营管理', '基金退出']
            }, {
                title: '基金状态：',
                details: ['全部', '中止']
            }]
        }
    },
    methods: {
        changeList(index) {
            console.log(index)
            console.log(this.$parent.$index)
            this.currentIndex = index;
        },
        watchTarget(el) {
            alert(el)
        },
        leadingIn(el) {
            alert(el)
        },
        downloadTem(el) {
            alert(el)
        }
    },
    components: {
        tableHeader
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
.fund {
    width: 100%;
    height: 100%;
    background: @color-base;
    padding: @height-small;
    .choose {
        width: 100%;
        .lists {
            width: 100%;
            height: 42px;
            line-height: 42px;
            display: flex;
            li {
                flex: 0 0 100px;
            }
            .list {
                text-align: center;
                .btn {
                    border: none;
                }
                .active {
                    color: @color-base;
                    background: @color-theme-red;
                }
            }
        }
    }
    .tables{
        width: 100%;
        padding-top: @font-size-small;
    }
}
</style>
