<template>
    <div class="fundLibrary">

<!--<<<<<<< HEAD-->
    <!--<div class="fundLibrary">-->

        <!--<div class="title">-->
            <!--<myFilter :chooseInfo="chooseInfo" @postID="changelist"></myFilter>-->
            <!--<myFilter :chooseInfo="chooseInfo2" @postID="changelist"></myFilter>-->
            <!--<myFilter :chooseInfo="chooseInfo3" @postID="changelist"></myFilter>-->

<!--=======-->
        <div class="title">
            <myFilter :chooseInfo="chooseInfo" @postID="changelist"></myFilter>
            <myFilter :chooseInfo="chooseInfo2" @postID="changelist"></myFilter>
            <myFilter :chooseInfo="chooseInfo3" @postID="changelist"></myFilter>

<!--&gt;>>>>>> 8124bd4f94ded35fd1d506bee5293a60c0e96ad1-->
            <tableHeader :theme="theme" :data="titleInfo" class="addPadding">
                <el-input placeholder="请输入搜索内容" icon="search" v-model="input" :on-icon-click="handleIconClick" style="width: 320px;">
                </el-input>
            </tableHeader>
        </div>
        <el-table :data="myFund" border style="width: 100%">
            <el-table-column fixed prop="fundName" label="基金名称" width="150" align="center">
<!--<<<<<<< HEAD-->
                <template scope = "scope">
                    <a @click="JumpOther(scope.row)">{{scope.row.fundName}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="fundNo" label="基金编号" width="200" align="center">
            </el-table-column>
            <el-table-column prop="orgTypeId" label="组织类型" width="200" align="center">
            </el-table-column>
            <el-table-column prop="manageTypeId" label="管理类型" width="200" align="center">
            </el-table-column>
            <el-table-column prop="fundScale" label="基金规模（元）" width="200" align="center">
            </el-table-column>
            <el-table-column prop="placementSum" label="募集总额（元）" width="200" align="center">
            </el-table-column>
            <el-table-column prop="investSum" label="投资总额（元）" width="200" align="center">
            </el-table-column>
            <el-table-column prop="surplusLimit" label="剩余额度（元）" width="200" align="center">
            </el-table-column>
            <el-table-column prop="createDate" label="成立日期" width="200" align="center">
            </el-table-column>
            <el-table-column prop="fundStageId" label="状态" width="200" align="center">
            </el-table-column>

            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                           :page-sizes="[100, 200, 300, 400]" :page-size="100"
                           layout="total, sizes, prev, pager, next, jumper" :total="400" class="page">
            </el-pagination>

        </el-table>
    </div>

</template>

<script type="text/ecmascript-6">
    import {getFundLibrary} from 'api/search'
    import {getSelectIndex} from 'api/search'
    import {getjieduan} from 'api/search'
    import myFilter from 'components/myFilter'
    import tableHeader from 'components/tabelHeader'
    import {mapMutations} from 'vuex'
    export default {
        data() {
            return {
                theme: '#fff',
                myFund: [],
                input: '',
                chooseInfo: {
                    title: '组织类型：',
                    details: [{
                        "dicName": '2'
                    }]
                },
                chooseInfo2: {
                    title: '管理类型：',
                    details: [{
                        "dicName": '2'
                    }]
                },
                chooseInfo3: {
                    title: '基金阶段：',
                    details: [{
                        "dicName": '2'
                    }]
                },
            }
        },
        methods: {
            handleIconClick() {
                getFundLibrary(this.input).then((res) => {
                    console.log(res.data)
                    this.myFund = res.data.result.list
                })

//<!--=======-->
//                <!--<template scope="scope">-->
//                    <!--<a @click="JumpOther(scope.row)">{{scope.row.fundName}}</a>-->
//                <!--</template>-->
//            <!--</el-table-column>-->
//            <!--<el-table-column prop="fundNo" label="基金编号" width="300" align="center">-->
//            <!--</el-table-column>-->
//            <!--<el-table-column prop="orgTypeId" label="组织类型" width="300" align="center">-->
//            <!--</el-table-column>-->
//            <!--<el-table-column prop="manageTypeId" label="管理类型" width="300" align="center">-->
//            <!--</el-table-column>-->
//            <!--<el-table-column prop="fundScale" label="基金规模（元）" width="300" align="center">-->
//            <!--</el-table-column>-->
//            <!--<el-table-column prop="placementSum" label="募集总额（元）" width="300" align="center">-->
//            <!--</el-table-column>-->
//            <!--<el-table-column prop="investSum" label="投资总额（元）" width="300" align="center">-->
//            <!--</el-table-column>-->
//            <!--<el-table-column prop="surplusLimit" label="剩余额度（元）" width="300" align="center">-->
//            <!--</el-table-column>-->
//            <!--<el-table-column prop="createDate" label="成立日期" width="300" align="center">-->
//            <!--</el-table-column>-->
//            <!--<el-table-column prop="fundStageId" label="状态" width="300" align="center">-->
//            <!--</el-table-column>-->
//            <!--<el-table-column fixed="right" label="操作" width="200" align="center">-->
//                <!--<template scope="scope">-->
//                    <!--<el-button @click="handleClick" type="text" size="small">查看</el-button>-->
//                    <!--&lt;!&ndash;<el-button type="text" size="small">编辑</el-button>&ndash;&gt;-->
//                <!--</template>-->
//            <!--</el-table-column>-->
//        <!--</el-table>-->
//        <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" class="page">-->
//        <!--</el-pagination>-->
//    <!--</div>-->
//<!--</template>-->
//
//<!--<script type="text/ecmascript-6">-->
//<!--import { getFundLibrary } from 'api/search'-->
//<!--import { getSelectIndex } from 'api/search'-->
//<!--import { getjieduan } from 'api/search'-->
//<!--import myFilter from 'components/myFilter'-->
//<!--import tableHeader from 'components/tabelHeader'-->
//<!--export default {-->
//    <!--data() {-->
//        <!--return {-->
//            <!--theme: '#fff',-->
//            <!--myFund: [],-->
//            <!--input: '',-->
//            <!--chooseInfo: {-->
//                <!--title: '组织类型：',-->
//                <!--details: [{-->
//                    <!--"dicName": '2'-->
//                <!--}]-->
//            <!--},-->
//            <!--chooseInfo2: {-->
//                <!--title: '管理类型：',-->
//                <!--details: [{-->
//                    <!--"dicName": '2'-->
//                <!--}]-->
//<!--//>>>>>>> 8124bd4f94ded35fd1d506bee5293a60c0e96ad1-->
            },
            JumpOther(row){
                this.addTab({
                    type: 'addTab',
                    title: row.fundName +'详情',
                    url: '/home/fundDetails/:' + row.id,
                    name: 'fundDetails/' + row.id
                })

                this.$router.push('/home/fundDetails/:' + row.id)
            },
            ...mapMutations([
                'addTab'
            ])
        },

        components: {
            tableHeader,
            myFilter
        },
        created() {
            getSelectIndex('303').then((res) => {
                this.chooseInfo.details = res.data.result
            })
            getSelectIndex('302').then((res) => {
                this.chooseInfo2.details = res.data.result
            })
            getjieduan().then((res) => {
                this.chooseInfo3.details = res.data.result
            })

            getFundLibrary().then((res) => {
                console.log(res.data)
                this.myFund = res.data.result.list
            })
        }
    }
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
