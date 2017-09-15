<template>
<div class="fund">
    <myFilter :chooseInfo="chooseInfo"></myFilter>
    <div class="tables">
        <table-header :theme="theme" :data="tableInfo" @add="watchTarget" @show="leadingIn" @down="downloadTem" class="addPadding">
            <el-input placeholder="请输入搜索内容" icon="search" v-model="input2" :on-icon-click="handleIconClick" style="width: 320px;">
            </el-input>
        </table-header>
        <el-table :data="myFund" border style="width: 100%">
            <el-table-column fixed label="基金名称" width="150">
                <template scope="scope">
                  <div class="name" @click="handleRouter(scope.$index, scope.row)">
                      <span class="investorName">{{ scope.row.fundName }}</span>
                  </div>
                </template>
            </el-table-column>
            <el-table-column prop="fundNo" label="基金编号" width="200">
            </el-table-column>
            <el-table-column prop="orgTypeId" label="组织类型" width="200">
            </el-table-column>
            <el-table-column prop="manageTypeId" label="管理类型" width="200">
            </el-table-column>
            <el-table-column prop="fundScale" label="基金规模（元）" width="200">
            </el-table-column>
            <el-table-column prop="placementSum" label="募集总额（元）" width="200">
            </el-table-column>
            <el-table-column prop="investSum" label="投资总额（元）" width="200">
            </el-table-column>
            <el-table-column prop="surplusLimit" label="剩余额度（元）" width="200">
            </el-table-column>
            <el-table-column prop="createDate" label="成立日期" width="200">
            </el-table-column>
            <el-table-column prop="fundStageId" label="状态" width="200">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template scope="scope">
                   <el-button type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" class="page">
        </el-pagination>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
import myFilter from 'components/myFilter'
import {mapMutations} from 'vuex'
import {getManagementType} from 'api/fund'
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
            myFund: [{
                manageTypeId: '', //管理类型id
                investSum: '', //投资总额
                orgTypeId: '', //组织类型id
                fundNo: '20160901', //基金编号
                fundScale: "1000", //基金规模
                id: "773a889fb82b4c5bad7086184673bbce", //基金id
                fundName: "深度并购", //基金名称
                placementSum: '', //募集总额
                surplusLimit: '', //剩余额度
                createDate: '', //成立日期
                fundStageId: "1" //状态
            }, {
                manageTypeId: '', //管理类型id
                investSum: '', //投资总额
                orgTypeId: '', //组织类型id
                fundNo: '20160901', //基金编号
                fundScale: "1000", //基金规模
                id: "773a", //基金id
                fundName: "aaaa", //基金名称
                placementSum: '', //募集总额
                surplusLimit: '', //剩余额度
                createDate: '', //成立日期
                fundStageId: "1" //状态
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
            this.addTab({
                type: 'add',
                title: '添加基金',
                url: '/home/add',
                name: 'add'
            });
            this.$store.dispatch('getManageType').then(() => {
                this.$router.push('/home/add')
            }).catch(() =>{
                this.$router.push('/home/myfund')
            })

        },
        handleRouter(index, row) {
            this.addTab({
                type: 'addTab',
                title: row.fundName + '详情',
                url: '/home/fundDetails/' + row.id,
                name: 'fundDetails/' + row.id
            });
            this.$router.push({
                name: 'fundDetails',
                params: {
                    id: row.id
                }
            })
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
        },
        ...mapMutations([
            'addTab' // 映射 this.addTab() 为 this.$store.commit
        ])
    },
    components: {
        tableHeader,
        myFilter
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
@import '../../common/styles/mixin.less';
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
        .table-router();
        .page {
            width: 100%;
            text-align: right;
            padding: @font-size-large-x 0;
        }
        .addPadding {
            padding-bottom: 12px;
        }
    }
}
</style>
