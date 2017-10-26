<template>
<div class="fund">
    <div class="filter_list">
        <!-- 组织类型 -->
        <my-filter :chooseInfo="organizationType" @getIdInfo="clickOrgType"></my-filter>
        <!-- 管理类型 -->
        <my-filter :chooseInfo="managementType" @getIdInfo="clickmanType"></my-filter>
        <!-- 基金阶段 -->
        <my-filter :chooseInfo="allFundStage" @getIdInfo="clickStage"></my-filter>
        <!-- 基金状态 -->
        <my-filter :chooseInfo="allFundStatus" @getIdInfo="clickStatus"></my-filter>
    </div>
    <div class="tables">
        <table-header :theme="theme" :data="tableInfo" @add="watchTarget" @show="leadingIn" @down="downloadTem" class="addPadding">
            <el-input placeholder="请输入搜索内容" icon="search" v-model="fundSearch" :on-icon-click="handleIconClick" autofocus='true' style="width: 320px;" @click="submitSearch" @blur="submitSearch">
            </el-input>
        </table-header>
        <el-table :data="myFund" border style="width: 100%">
            <el-table-column fixed label="基金名称" width="200" align="center">
                <template scope="scope">
                    <div class="name" @click="handleRouter(scope.$index, scope.row)">
                        <span class="investorName">{{ scope.row.fundName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="fundNo" label="基金编号" width="200" align="center">
            </el-table-column>
            <el-table-column prop="orgType" label="组织类型" width="200" align="center">
            </el-table-column>
            <el-table-column prop="manageType" label="管理类型" width="200" align="center">
            </el-table-column>
            <el-table-column label="基金规模（元）" width="200" align="center">
                <template scope="scope">
                    <div>{{scope.row.fundScale | toMoney}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="placementSum" label="募集总额（元）" width="200" align="center">
            </el-table-column>
            <el-table-column prop="investSum" label="投资总额（元）" width="200" align="center">
            </el-table-column>
            <el-table-column prop="surplusLimit" label="剩余额度（元）" width="200" align="center">
            </el-table-column>
            <el-table-column label="成立日期" width="200" align="center">
                <template scope="scope">
                    <div style="width: 100%;height: 100%;">{{scope.row.createDate | formatDate}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="fundStatus" label="状态" width="200" align="center">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template scope="scope">
                    <el-button type="text" size="small" @click="addTeamlist(scope.$index, scope.row)">基金团队</el-button>
                    <el-button type="text" size="small" @click="deleteFundlist(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size=pageSize layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
    </div>
    <delete-reminders :deleteReminders="deleteReminders" :modal_loading="modal_loading" @cancel="cancelDel" @del="delFundList">
    </delete-reminders>
    <!-- 添加团队成员 -->
    <el-dialog title="添加团队成员" :visible.sync="modalAdd" :close-on-click-modal="false">
        <el-form :model="formTeam">
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-select v-model="formTeam.userId" placeholder="请选择成员" style="width:100%;">
                    <el-option v-for="list of userNameList" :key="list.id" :label="list.name" :value="list.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select v-model="formTeam.autId" placeholder="请选择成员" style="width:100%;">
                    <el-option v-for="item of roleList" :key="item.id" :label="item.roleName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="添加日期" :label-width="formLabelWidth">
                <el-date-picker v-model="formTeam.addTime" disabled type="date" placeholder="选择日期" style="width: 100%;">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="modalAdd = false">取 消</el-button>
            <el-button type="danger" @click="confirmAdd">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
import myFilter from 'components/myFilter'
import deleteReminders from 'components/deleteReminders'
import Service from 'common/js/fetch'
import '../../common/js/filter.js' //时间格式过滤器
import {mapMutations,mapGetters} from 'vuex'
import {
    getManagementType,
    getMyFund,
    deleteFundInfo,
    queryUserList,
    queryList,
    addFundTeam
} from 'api/fund'
export default {
    data() {
        return {
            theme: '#fff',
            tableInfo: {
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '基金'
                }]
            },
            organizationId: '', //组织类型id
            organizationType: {
                title: '组织类型：',
                details: [{
                    id: '',
                    dicName: '全部'
                }]
            },
            managementId: '', //管理类型id
            managementType: {
                title: '管理类型：',
                details: [{
                    id: '',
                    dicName: '全部'
                }]
            },
            stageId: '', //基金阶段id
            allFundStage: {
                title: '基金阶段：',
                details: [{
                    id: '',
                    dicName: '全部'
                }]
            },
            statusId: '', //基金状态id
            allFundStatus: {
                title: '基金状态：',
                details: [{
                    id: '',
                    dicName: '全部'
                }, {
                    id: 1,
                    dicName: '正常'
                }, {
                    id: 2,
                    dicName: '中止'
                }]
            },
            deleteReminders: false,
            modal_loading: false,
            fundListId: '', //当前选中的基金id
            fundSearch: '',
            myFund: [],
            pageTotal: '',
            page: 1,
            pageSize: 10,
            formTeam: {
                fundId: '',
                userId: '',
                autId: '',
                addTime: new Date()
            },
            userNameList: [],
            roleList: [],
            modalAdd: false
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
        handleSizeChange(val) {
            this.pageSize = val
            this.getFundListsData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getFundListsData()
        },
        submitSearch() {
            this.getFundListsData()
        },
        // (num, size, value, orgId, manageId, stageId, statusId)
        clickOrgType(index, id) {
            if (index == 0) {
                this.organizationId = ''
            } else {
                this.organizationId = id
            }
            this.getFundListsData()
        },
        clickmanType(index, id) {
            if (index == 0) {
                this.managementId = ''
            } else {
                this.managementId = id
            }
            this.getFundListsData()
        },
        clickStage(index, id) {
            if (index == 0) {
                this.stageId = ''
            } else {
                this.stageId = id
            }
            this.getFundListsData()
        },
        clickStatus(index, id) {
            this.statusId = id
            this.getFundListsData()
        },
        getFundListsData() {
            getMyFund(this.page, this.pageSize, this.fundSearch, this.organizationId, this.managementId, this.stageId, this.statusId).then((res) => {
                if (res.status == '200') {
                    console.log(res)
                    this.myFund = res.data.result.list
                    this.pageTotal = res.data.result.total
                }
            })
        },
        deleteFundlist(index, row) {
            this.deleteReminders = true
            this.fundListId = row.id
        },
        cancelDel() {
            this.deleteReminders = false
        },
        delFundList() {
            deleteFundInfo(this.fundListId).then((res) => {
                if (res.status == '200') {
                    this.$Message.success(res.data.message || '删除成功！')
                    this.deleteReminders = false
                    this.getFundListsData()
                }
            })
        },
        addTeamlist(index, row) {
            queryUserList().then((res) => {
                if (res.status == '200') {
                    this.userNameList = res.data.result
                }
            })
            queryList(1).then((res) => {
                if (res.status == '200') {
                    this.roleList = res.data.result
                }
            })
            this.modalAdd = true
            this.formTeam = {
                fundId: row.id,
                userId: '',
                autId: '',
                addTime: new Date()
            }
        },
        confirmAdd() {
            addFundTeam(this.formTeam).then((res) => {
                if (res.status == '200') {
                    this.$Message.success(res.data.message || '添加成员成功！')
                    this.modalAdd = false
                }
            })
        },
        ...mapMutations([
            'addTab', // 映射 this.addTab() 为 this.$store.commit
            'GET_MYFUNDDETAILS'
        ])
    },
    mounted() {
        this.$store.dispatch('getFundLists').then(() => {
            this.myFund = this.myFundList.list
        })
        this.$store.dispatch('getManageType').then(() => {
            this.managementType.details = this.managementType.details.concat(this.getManType)
        })
        this.$store.dispatch('getOrganizationType').then(() => {
            this.organizationType.details = this.organizationType.details.concat(this.OrgType)
        })
        this.$store.dispatch('getFundStage').then(() => {
            this.allFundStage.details = this.fundStage
        })
        getMyFund(this.page, this.pageSize, this.fundSearch, this.organizationId, this.managementId, this.stageId, this.statusId).then((res) => {
            if (res.status == '200') {
                this.pageTotal = res.data.result.total
            }
        })
    },
    computed: {
        ...mapGetters([
            'myFundList',
            'getManType',
            'OrgType',
            'fundStage'
        ])
    },
    components: {
        tableHeader,
        myFilter,
        deleteReminders
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
    span.investorName {
        cursor: pointer;
    }
}
</style>
