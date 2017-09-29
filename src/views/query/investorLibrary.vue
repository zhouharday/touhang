<template>
<div class="investorLibrary">
    <div class="investorFilter">
        <myFilter :chooseInfo="filterInfo" @getIdInfo="changeList"></myFilter>
    </div>
    <div class="header">
        <tableHeader :theme="theme" :data="titleHeader" class="addPadding">
            <el-input placeholder="请输入搜索内容" icon="search" v-model="input2" :on-icon-click="handleIconClick" style="width: 320px;">
            </el-input>
        </tableHeader>
    </div>
    <el-table :data="investorData" border style="width: 100%">
        <el-table-column prop="investorName" label="投资者名称" align="center">
            <template scope = "scope">
                <a @click="JumpOther(scope.row)">{{scope.row.investorName}}</a>
            </template>
        </el-table-column>
        <el-table-column prop="investorType" label="类型" align="center">
        </el-table-column>
        <el-table-column prop="investmentManagerName" label="投资经理" align="center">
        </el-table-column>
        <el-table-column prop="sumPaidAmount" label="累计投资额" align="center">
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" class="page">
    </el-pagination>
</div>
</template>

<script type="text/ecmascript-6">
import myFilter from 'components/myFilter'
import tableHeader from 'components/tabelHeader'
import {getInvestorList} from 'api/search'
import {getSelectIndex} from 'api/search'
import {mapMutations,mapGetters} from 'vuex'
export default {
    data() {
        return {
            filterInfo: {
                title: '投资者类型：',
                details: [{
                    dicName: '全部'
                }, {
                    dicName: '机构'
                }, {
                    dicName: '个人'
                }, {
                    dicName: '政府'
                }]
            },
            theme: '#fff',
            investorData: [],
            input2:'',
            type:null
        }
    },
    components: {
        myFilter,
        tableHeader,


    },
    methods: {
        JumpOther(row){
            console.log(row)
            this.addTab({
                type: 'addTab',
                title: row.investorName +'详情',
                url: '/home/investorDetails/:' + row.id,
                name: 'investorDetails/' + row.id
            })

            this.$router.push('/home/investorDetails/:' + row.id)
        },
        handleIconClick(){
            console.log(this.input2)
            getInvestorList(this.input2,this.type).then((res)=>{
                this.investorData = res.data.result.list
            })
        },
        handleDelete(index, row) {
            console.log(index, row);
        },

        changeList(index,id){
            this.type = id
            if(id == 0 ){
                this.type = null;
            }
            getInvestorList(this.input2,this.type).then((res)=>{
//            console.log(res.data)
                this.investorData = res.data.result.list
            })
        },
        ...mapMutations([
            'addTab'
        ])
    },
    created(){
        getInvestorList().then((res)=>{
                this.investorData = res.data.result.list
        })
        getSelectIndex('402').then((res)=>{
            console.log(999)
            console.log(res.data)
            this.filterInfo.details = res.data.result

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
.investorLibrary {
    width: 100%;
    height: 100%;
    padding: 24px;
    background: @color-base;
    .header {
        padding: 12px 0 0;

        .addPadding {
            padding-bottom: 12px;
        }

    }
    .page {
        width: 100%;
        text-align: right;
        padding: @font-size-large-x 0;
    }
}
</style>
