<template>
<div class="fund">
    <!-- 组织类型 -->
    <my-filter :chooseInfo="organizationType"></my-filter>
    <!-- 管理类型 -->
    <my-filter :chooseInfo="managementType"></my-filter>
    <my-filter :chooseInfo="allFundStage"></my-filter>
    <my-filter :chooseInfo="allFundStatus"></my-filter>
    <div class="tables">
        <table-header :theme="theme" :data="tableInfo" @add="watchTarget" @show="leadingIn" @down="downloadTem" class="addPadding">
            <el-input placeholder="请输入搜索内容"
                      icon="search"
                      v-model="fundSearch"
                      :on-icon-click="handleIconClick"
                      autofocus='true'
                      style="width: 320px;"
                      @click="submitSearch"
                      @blur="submitSearch">
            </el-input>
        </table-header>
        <el-table :data="myFund" border style="width: 100%">
            <el-table-column fixed label="基金名称" width="200">
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
            <el-table-column fixed="right" label="操作" width="200">
                <template scope="scope">
                    <el-button type="text" size="small">基金团队</el-button>
                   <el-button type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="page">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10, 20, 30, 50]"
                       :page-size="10"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="pageTotal">
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
    getMyFund
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
                }]
            },
            organizationType: {
                title: '组织类型：',
                details: []
            },
            managementType: {
                title: '管理类型：',
                details: []
            },
            allFundStage: {
                title: '基金阶段：',
                details: []
            },
            allFundStatus: {
                title: '基金状态：',
                details: []
            },
            fundSearch: '',
            myFund: [],
            pageTotal: '',
            page: 1,
            pageSize: 10,
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
            this.pageSize = val
            getMyFund(this.page, this.pageSize, this.fundSearch).then((res) => {
                if(res.status == '200') {
                    this.myFund = res.data.result.list
                }
            })
        },
        handleCurrentChange(val) {
            this.page = val
            getMyFund(this.page, this.pageSize, this.fundSearch).then((res) => {
                if(res.status == '200') {
                    this.myFund = res.data.result.list
                }
            })
        },
        submitSearch() {
            getMyFund(this.page, this.pageSize, this.fundSearch).then((res) => {
                if(res.status == '200') {
                    this.myFund = res.data.result.list
                }
            })
        },
        ...mapMutations([
            'addTab', // 映射 this.addTab() 为 this.$store.commit
            'GET_MYFUNDDETAILS'
        ])
    },
    created() {
        this.$store.dispatch('getFundLists').then(() => {
            this.myFund = this.myFundList.list
        })
        this.$store.dispatch('getManageType').then(() => {
            this.managementType.details = this.getManType
        })
        this.$store.dispatch('getOrganizationType').then(() =>{
            this.organizationType.details = this.OrgType
        })
        this.$store.dispatch('getFundStage').then(() => {
            this.allFundStage.details = this.fundStage
        })
        this.$store.dispatch('getFundStatus').then(() => {
            this.allFundStatus.details = this.fundStatus
        })
        getMyFund().then((res) => {
            if(res.status == '200') {
                this.pageTotal = res.data.result.total
            }
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
    padding: 20px 30px;
    position: relative;
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
        padding-bottom: @height-large;
        .table-router();
        .addPadding {
            padding-bottom: 12px;
        }
    }
    .page {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        text-align: right;
        padding: @font-size-large-x 0;
    }
    span.investorName{
        cursor: pointer;
    }
}
</style>
