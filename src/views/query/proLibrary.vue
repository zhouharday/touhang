<template>
<div class="proLibrary">
    <myFilter :chooseInfo="chooseInfo"></myFilter>
    <div class="title">
        <tableHeader :theme="theme" :data="titleInfo" class="addPadding">
            <el-input placeholder="请输入搜索内容" icon="search" v-model="input" :on-icon-click="handleIconClick" style="width: 320px;">
            </el-input>
        </tableHeader>
    </div>
    <el-table :data="proLibrary" border style="width: 100%">
        <el-table-column prop="projectName" label="项目名称">
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

export default {
    data() {
        return {
            theme: '#fff',
            titleInfo: {
                // btnGroup: [{
                //     icon: 'plus-round',
                //     explain: '基金'
                // }, {
                //     explain: '导入'
                // }, {
                //     explain: '模板下载'
                // }]
            },
            chooseInfo: [{
                title: '项目类型:',
                details: ['全部', 'PE', 'VC', '定增']
            }],
            proLibrary: []
        }
    },
    components: {
        tableHeader,
        myFilter
    },
    methods:{
        handleIconClick(){
            alert(a)
        }
    },
    created(){
        getProjectList().then((res)=>{
            console.log(res.data)
            this.proLibrary = res.data.result.list
        })
        getSelectIndex('202').then((res)=>{
            console.log(res.data)
//            this.chooseInfo = res.data.result.list
        })
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
