<template>
    <div class="fundLibrary">

        <div class="title">
            <myFilter :chooseInfo="chooseInfo" @getIdInfo="changeList"></myFilter>
            <myFilter :chooseInfo="chooseInfo2" @getIdInfo="changeList2"></myFilter>
            <myFilter :chooseInfo="chooseInfo3" @getIdInfo="changeList3"></myFilter>
            <tableHeader :theme="theme" :data="titleInfo" class="addPadding">
                <el-input placeholder="请输入搜索内容" icon="search" v-model="input" :on-icon-click="handleIconClick" style="width: 320px;">
                </el-input>
            </tableHeader>
        </div>
        <el-table :data="myFund" border style="width: 100%">
            <el-table-column fixed prop="fundName" label="基金名称" width="150" align="center">
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

        </el-table>

        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
            </el-pagination>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import {getFundLibrary} from 'api/search'
    import {getSelectIndex} from 'api/search'
    import {getjieduan} from 'api/search'
    import myFilter from 'components/myFilter'
    import tableHeader from 'components/tabelHeader'
    import {mapMutations, mapGetters} from 'vuex'
    export default {
        data() {
            return {
                theme: '#fff',
                myFund: [],
                input: '',
                chooseId:null,
                chooseId2:null,
                chooseId3:null,
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
                page: {
                    pageNum: '1', //当前页码
                    total: '', //数据总数
                    pageSize: '10', //每页条数
                    navigatepageNums: '', //页数
                    current: '', //当前页码
                },
            }
        },
        methods: {
            handleSizeChange(x){
                this.page.pageSize = x
                getFundLibrary(this.chooseId,this.chooseId2,this.chooseId3,this.input,this.page).then((res) => {
                    console.log(res.data)
                    this.myFund = res.data.result.list
                    this.page.pageNum = res.data.result.pageNum; //当前页码
                    this.page.total = res.data.result.total; //数据总数
                    this.page.pageSize = res.data.result.pageSize; //每页条数
                    this.page.navigatepageNums = res.data.result.navigatepageNums.length; //页数长度

                })
            },
            handleCurrentChange(x){
                this.page.pageNum =  x
                getFundLibrary(this.chooseId,this.chooseId2,this.chooseId3,this.input,this.page).then((res) => {
                    console.log(res.data)
                    this.myFund = res.data.result.list
                    this.page.pageNum = res.data.result.pageNum; //当前页码
                    this.page.total = res.data.result.total; //数据总数
                    this.page.pageSize = res.data.result.pageSize; //每页条数
                    this.page.navigatepageNums = res.data.result.navigatepageNums.length; //页数长度

                })
            },
            handleIconClick() {
//                getFundLibrary(this.input).then((res) => {
//                    console.log(res.data)
//                    this.myFund = res.data.result.list
//                })
                this.updataList()
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
            changeList(index,id){
                this.chooseId = id
                if(id == 0){
                    this.chooseId = null
                }
                this.updataList()
            },
            changeList2(index,id){
                this.chooseId2 = id
                if(id == 0){
                    this.chooseId2 = null
                }
                this.updataList()
            },
            changeList3(index,id){
                this.chooseId3 = id
                if(id == 0){
                    this.chooseId3 = null
                }
                this.updataList()
            },
            updataList(){
                getFundLibrary(this.chooseId,this.chooseId2,this.chooseId3,this.input,this.page).then((res) => {
                    console.log(res.data)
                    this.myFund = res.data.result.list
                })
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

            getFundLibrary(this.chooseId,this.chooseId2,this.chooseId3,this.input,this.page).then((res) => {
                console.log(res.data)
                this.myFund = res.data.result.list
                this.page.pageNum = res.data.result.pageNum; //当前页码
                this.page.total = res.data.result.total; //数据总数
                this.page.pageSize = res.data.result.pageSize; //每页条数
                this.page.navigatepageNums = res.data.result.navigatepageNums.length; //页数长度

            })
        },
        computed:{
            ...mapGetters([
                'getProStatus'
            ])
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
