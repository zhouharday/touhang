<template>
<div class="fund">
    <div class="choose">
        <ul v-for="(item, index) of chooseInfo" class="lists" key="index">
            <li class="title">{{item.title}}</li>
            <li class="ul_list">
                <ul>
                    <li class="list" v-for="(list, nowIndex) of item.details">
                        <el-button @click="changeList(index, nowIndex)" class="btn" :class="{active: currentIndex == index && clickIndex == nowIndex}">
                            {{list}}
                        </el-button>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="tables">
        <table-header :theme="theme" :data="tableInfo" @add="watchTarget" @show="leadingIn" @down="downloadTem">
            <el-input placeholder="请输入搜索内容" icon="search" v-model="input2" :on-icon-click="handleIconClick" style="width: 320px;">
            </el-input>
        </table-header>
        <el-table :data="myFund" border style="width: 100%">
            <el-table-column fixed prop="fundName" label="基金名称">
            </el-table-column>
            <el-table-column prop="number" label="基金编号">
            </el-table-column>
            <el-table-column prop="province" label="组织类型">
            </el-table-column>
            <el-table-column prop="city" label="管理类型">
            </el-table-column>
            <el-table-column prop="address" label="基金规模（元）">
            </el-table-column>
            <el-table-column prop="zip" label="募集总额（元）">
            </el-table-column>
            <el-table-column prop="province" label="投资总额（元）">
            </el-table-column>
            <el-table-column prop="city" label="剩余额度（元）">
            </el-table-column>
            <el-table-column prop="address" label="成立日期">
            </el-table-column>
            <el-table-column prop="zip" label="状态">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template scope="scope">
                   <el-button @click="handleClick" type="text" size="small">查看</el-button>
                   <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-sizes="[100, 200, 300, 400]"
                           :page-size="100"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="400"
                           class="page">
         </el-pagination>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
const INDEX = 0;
const NOW = 0;
export default {
    data() {
        return {
            currentIndex: INDEX,
            clickIndex: NOW,
            theme: '#fff',
            tableInfo: {
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '基金'
                }, {
                    explain: '导入'
                }, {
                    explain: '模板下载'
                }]
            },
            addFund: false,
            formLabelWidth: '120px',
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
            }],
            currentPage: 10
        }
    },
    methods: {
        changeList(value, n) {
            this.currentIndex = value
            this.clickIndex = n
        },
        watchTarget(el) {
            this.$router.push('/home/fund/add')
        },
        leadingIn(el) {
            console.log(this.$store)
        },
        downloadTem(el) {
            alert(2)
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
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
                        &.active {
                            color: @color-base;
                            background: @color-theme-red;
                        }
                    }
                }
            }
        }
    }
    .tables {
        width: 100%;
        padding-top: @font-size-small;
        .page{
            width: 100%;
            text-align: right;
            padding: @font-size-large-x 0;
        }
    }
}
</style>
