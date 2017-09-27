<template>
    <div class="fundLibrary">

        <div class="title">
            <myFilter :chooseInfo="chooseInfo" @postID="changelist"></myFilter>
            <tableHeader :theme="theme" :data="titleInfo" class="addPadding">
                <el-input placeholder="请输入搜索内容" icon="search" v-model="input" :on-icon-click="handleIconClick"
                          style="width: 320px;">
                </el-input>
            </tableHeader>
        </div>
        <el-table :data="myFund" border style="width: 100%">
            <el-table-column fixed prop="fundName" label="基金名称" width="150">
                <template scope="scope">
                    <a @click="JumpOther(scope.row)">{{scope.row.fundName}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="fundNo" label="基金编号" width="300">
            </el-table-column>
            <el-table-column prop="orgTypeId" label="组织类型" width="300">
            </el-table-column>
            <el-table-column prop="manageTypeId" label="管理类型" width="300">
            </el-table-column>
            <el-table-column prop="fundScale" label="基金规模（元）" width="300">
            </el-table-column>
            <el-table-column prop="placementSum" label="募集总额（元）" width="300">
            </el-table-column>
            <el-table-column prop="investSum" label="投资总额（元）" width="300">
            </el-table-column>
            <el-table-column prop="surplusLimit" label="剩余额度（元）" width="300">
            </el-table-column>
            <el-table-column prop="createDate" label="成立日期" width="300">
            </el-table-column>
            <el-table-column prop="fundStageId" label="状态" width="300">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template scope="scope">
                    <el-button @click="handleClick" type="text" size="small">查看</el-button>
                    <!--<el-button type="text" size="small">编辑</el-button>-->
                    <div class="fundLibrary">
                        <my-filter :chooseInfo="organizationType"></my-filter>
                        <!-- 管理类型 -->
                        <my-filter :chooseInfo="managementType"></my-filter>
                        <my-filter :chooseInfo="allFundStage"></my-filter>

                        <div class="title">
                            <tableHeader :theme="theme" :data="titleInfo" class="addPadding">
                                <el-input placeholder="请输入搜索内容" icon="search" v-model="input"
                                          :on-icon-click="handleIconClick"
                                          style="width: 320px;">
                                </el-input>
                            </tableHeader>
                        </div>
                        <el-table :data="myFund" border style="width: 100%">
                            <el-table-column fixed prop="fundName" label="基金名称" width="150">
                            </el-table-column>
                            <el-table-column prop="fundNo" label="基金编号" width="300">
                            </el-table-column>
                            <el-table-column prop="orgTypeId" label="组织类型" width="300">
                            </el-table-column>
                            <el-table-column prop="manageTypeId" label="管理类型" width="300">
                            </el-table-column>
                            <el-table-column prop="fundScale" label="基金规模（元）" width="300">
                            </el-table-column>
                            <el-table-column prop="placementSum" label="募集总额（元）" width="300">
                            </el-table-column>
                            <el-table-column prop="investSum" label="投资总额（元）" width="300">
                            </el-table-column>
                            <el-table-column prop="surplusLimit" label="剩余额度（元）" width="300">
                            </el-table-column>
                            <el-table-column prop="createDate" label="成立日期" width="300">
                            </el-table-column>
                            <el-table-column prop="fundStageId" label="状态" width="300">
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="200">
                                <template scope="scope">
                                    <el-button @click="handleClick" type="text" size="small">查看</el-button>
                                    <!--<el-button type="text" size="small">编辑</el-button>-->
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                       :current-page="currentPage"
                                       :page-sizes="[100, 200, 300, 400]" :page-size="100"
                                       layout="total, sizes, prev, pager, next, jumper" :total="400" class="page">
                        </el-pagination>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script type="text/ecmascript-6">
    import {getFundLibrary} from 'api/search'
    import {getSelectIndex} from 'api/search'
    import {getjieduan} from 'api/search'
    import myFilter from 'components/myFilter'
    import tableHeader from 'components/tabelHeader'

    export default {
        data() {
            return {
                theme: '#fff',
                myFund: [],
                input: '',
                chooseInfo: [{
                    title: '组织类型：',
                    details: [{
                        "dicName": '2'
                    }]
                },
                    {
                        title: '管理类型：',
                        details: [{
                            "dicName": '2'
                        }]
                    },
                    {
                        title: '基金阶段：',
                        details: [{
                            "dicName": '2'
                        }]
                    }
                ]
            }
        },
        methods: {
            handleIconClick() {
                getFundLibrary(this.input).then((res) => {

                    import tableHeader from 'components/tabelHeader'
                    import myFilter from 'components/myFilter'
                    import {mapGetters} from 'vuex'

                    export default {
                        data() {
                            return {
                                theme: '#fff',
                                myFund: [],
                                input: '',
                                organizationType: {
                                    title: '组织形式：',
                                    details: []
                                },
                                managementType: {
                                    title: '管理类型：',
                                    details: []
                                },
                                allFundStage: {
                                    title: '基金阶段：',
                                    details: []
                                }
                            }
                        },
                        methods: {
                            handleIconClick() {
                                getFundLibrary(this.input).then((res) => {
                                    console.log(res.data)
                                    this.myFund = res.data.result.list
                                })
                            }
                        },
                        components: {
                            tableHeader,
                            myFilter
                        },
                        created() {
                            getFundLibrary().then((res) => {
                                console.log(res.data)
                                this.myFund = res.data.result.list
                            });
                            this.$store.dispatch('getManageType').then(() => {
                                this.managementType.details = this.getManType
                            });
                            this.$store.dispatch('getOrganizationType').then(() => {
                                this.organizationType.details = this.OrgType
                            });
                            this.$store.dispatch('getFundStage').then(() => {
                                this.allFundStage.details = this.fundStage
                            })
                        },
                        computed: {
                            ...mapGetters([
                                'getManType',
                                'OrgType',
                                'fundStage'
                            ])
                        }
                    },
                    components: {
                        tableHeader,
                            myFilter
                    },
                    created()
                    {
                        getSelectIndex('303').then((res) => {
                            this.chooseInfo[0].details = res.data.result
                        })
                        getSelectIndex('302').then((res) => {
                            this.chooseInfo[1].details = res.data.result
                        })
                        getjieduan().then((res) => {
                            this.chooseInfo[2].details = res.data.result
                        })


                        getFundLibrary().then((res) => {
                            console.log(res.data)
                            this.myFund = res.data.result.list
                        })

</script>

<style lang="less" scoped>
    @import '../../common/styles/variable.less';

    .fundLibrary {
        width: 100%;
        height: 100%;
        padding: 24px;
        background: @color-base;
        .addPadding {
            padding-bottom: 12px;
        }
        .page {
            padding: 24px 0;
            text-align: right;
        }
    }
</style>
