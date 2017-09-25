<template>
<div class="investorLibrary">
    <div class="investorFilter">
        <myFilter :chooseInfo="filterInfo" @postID="changelist"></myFilter>
    </div>
    <div class="header">
        <tableHeader :theme="theme" :data="titleHeader" class="addPadding">
            <el-input placeholder="请输入搜索内容" icon="search" v-model="input2" :on-icon-click="handleIconClick" style="width: 320px;">
            </el-input>
        </tableHeader>
    </div>
    <el-table :data="investorData" border style="width: 100%">
        <el-table-column prop="investorName" label="投资者名称">
        </el-table-column>
        <el-table-column prop="investorType" label="类型">
        </el-table-column>
        <el-table-column prop="investmentManagerName" label="投资经理">
        </el-table-column>
        <el-table-column prop="sumPaidAmount" label="累计投资额">
        </el-table-column>
        <!--<el-table-column label="操作">-->
            <!--<template scope="scope">-->
                <!--<el-button-->
                  <!--@click.native.prevent="deleteRow(scope.$index, investorData)"-->
                  <!--type="text"-->
                  <!--size="small">-->
                  <!--签约-->
                <!--</el-button>-->
                <!--<el-button-->
                    <!--@click="handleDelete(scope.$index, scope.row)"-->

                  <!--type="text"-->
                  <!--size="small">-->
                  <!--删除-->
                <!--</el-button>-->
                <!--<el-button-->
                  <!--@click.native.prevent="deleteRow(scope.$index, investorData)"-->
                  <!--type="text"-->
                  <!--size="small">-->
                  <!--拜访-->
                <!--</el-button>-->
            <!--</template>-->
        <!--</el-table-column>-->
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
export default {
    data() {
        return {
            filterInfo: [{
                title: '投资者类型：',
                details: [{"dicName":'全部'}, '机构', '个人', '政府']
            }],
            theme: '#fff',
            investorData: [],
            input2:'',
        }
    },
    components: {
        myFilter,
        tableHeader,


    },
    methods: {
        handleIconClick(){
console.log(this.input2)
            getInvestorList(this.input2,this.type).then((res)=>{
                this.investorData = res.data.result.list
            })
        },
        handleDelete(index, row) {
            console.log(index, row);
        },

        changelist(el){
            this.type = el
            getInvestorList(this.input2,this.type).then((res)=>{
//            console.log(res.data)
                this.investorData = res.data.result.list
            })
        }
    },
    created(){
        getInvestorList().then((res)=>{
//            console.log(res.data)
                this.investorData = res.data.result.list
        })
        getSelectIndex('70').then((res)=>{
            console.log(res.data.result)
            this.filterInfo[0].details = res.data.result

        })


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
