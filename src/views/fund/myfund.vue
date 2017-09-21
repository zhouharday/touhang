<template>
<div class="fund">
    <myFilter :chooseInfo="chooseInfo"></myFilter>
    <div class="tables">
        <table-header :theme="theme" :data="tableInfo" @add="watchTarget" @show="leadingIn" @down="downloadTem" class="addPadding">
            <el-input placeholder="请输入搜索内容"
                      icon="search"
                      v-model="input2"
                      :on-icon-click="handleIconClick"
                      autofocus='true'
                      style="width: 320px;">
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
import Service from 'common/js/fetch'
import {
    mapMutations,
    mapGetters
} from 'vuex'
import {
    getManagementType,
    getMyFundDetails
} from 'api/fund'
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
                details: []
            }, {
                title: '管理类型：',
                details: []
            }, {
                title: '基金阶段：',
                details: []
            }, {
                title: '基金状态：',
                details: ['全部', '中止']
            }],
            myFund: []
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
            })
            this.$router.push('/home/add')
        },
        handleRouter(index, row) {
            console.log(row.id)
            getMyFundDetails(row.id).then((res) => {
                if (res.data.status == '200') {
                    this.GET_MYFUNDDETAILS(res.data.result)
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
                }
            }).catch(err => {
                this.$Message.error(err)
                this.$router.push('/home/myfund')
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
            'addTab', // 映射 this.addTab() 为 this.$store.commit
            'GET_MYFUNDDETAILS'
        ])
    },
    created() {
        this.$store.dispatch('getFundLists').then(() => {
            this.myFund = this.myFundList.list
        }),
        this.$store.dispatch('getManageType').then(() => {
            this.chooseInfo[0].details = this.getManType
        }),
        this.$store.dispatch('getOrganizationType').then(() =>{
            this.chooseInfo[1].details = this.OrgType
        }),
        this.$store.dispatch('getFundStage').then(() => {
            this.chooseInfo[2].details = this.fundStage
        }),
        this.$store.dispatch('getFundStatus').then(() => {
            this.chooseInfo[3].details = this.fundStatus
        })
    },
    computed: {
        ...mapGetters([
            'myFundList',
            'getManType',
            'OrgType',
            'fundStage',
            'fundStatus'
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
    min-height: 100%;
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
