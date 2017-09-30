<template>
    <div class="proLibrary">
        <myFilter :chooseInfo="chooseInfo" @getIdInfo = "changeList"></myFilter>
        <div class="title">

            <tableHeader :theme="theme" :data="titleInfo" class="addPadding">
                <el-input placeholder="请输入搜索内容" icon="search" v-model="input" :on-icon-click="handleIconClick" style="width: 320px;">
                </el-input>
            </tableHeader>
        </div>
        <el-table :data="proLibrary" border style="width: 100%">
            <el-table-column prop="projectName" label="项目名称">
                <template scope = "scope">
                    <a @click="JumpOther(scope.row)">{{scope.row.projectName}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="createUserName" label="项目创建人">
            </el-table-column>
            <el-table-column prop="industryId" label="所属行业">
            </el-table-column>
            <el-table-column prop="projectTypeId" label="项目类型">
            </el-table-column>
            <el-table-column prop="projectStageId" label="项目阶段">
            </el-table-column>
            <el-table-column prop="payDate" label="投资日期">
            </el-table-column>
            <el-table-column prop="paySumAmount" label="投资金额（元）">
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" class="page">
        </el-pagination>
    </div>
</template>

<script type="text/ecmascript-6">
    import tableHeader from 'components/tabelHeader'
    import myFilter from 'components/myFilter'
    import {getProjectList} from 'api/search'
    import {getSelectIndex} from 'api/search'
    import {mapMutations, mapGetters} from 'vuex'

    export default {
        data() {
            return {
                theme: '#fff',
                titleInfo: {

                },
                chooseInfo: {
                    title: '项目类型:',
                    details: ['全部', 'PE', 'VC', '定增']
                },
                proLibrary: [],
                type:'',
                seartext:'',
                input:''
            }
        },
        components: {
            tableHeader,
            myFilter
        },
        methods:{
            JumpOther(row){
                this.addTab({
                    type: 'addTab',
                    title: row.projectName +'详情',
                    url: '/home/aftProjectMessage/:' + row.id,
                    name: 'aftProjectMessage/' + row.id
                })
                this.$router.push('/home/aftProjectMessage/:' + row.id)
            },

            handleIconClick(){
                this.seartext = this.input
                getProjectList('',this.type,this.seartext).then((res)=>{
                    this.proLibrary = res.data.result.list
                })
            },

            changeList(index,id){
                this.type = id
                if(id == 0 ){
                    this.type = null;
                }
                getProjectList('',this.type,this.seartext).then((res)=>{
                    this.proLibrary = res.data.result.list
                })
            },

            ...mapMutations([
                'addTab'
            ]),
        },
        created(){

            getProjectList('',this.type,this.seartext).then((res)=>{
                console.log(res.data)
                this.proLibrary = res.data.result.list
            })
            getSelectIndex('202').then((res)=>{
                console.log(res.data)
                this.chooseInfo.details = res.data.result
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
    .proLibrary {
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
