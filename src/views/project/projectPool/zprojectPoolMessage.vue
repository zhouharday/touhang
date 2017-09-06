<template>
<div class="zpoolMessage">
   <div class="title">
       <div class="left">
           <span class="desc">{{title}}</span>
           <el-button  class="state">{{state}}</el-button>
       </div>
       <div class="right">
           <el-button type="danger">投资</el-button>
           <el-button type="danger">观察</el-button>
           <el-button type="danger">淘汰</el-button>
       </div>
   </div>
   <div class="tabs">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="详情" name="details" class="tab_list">
                 <detail-form :basicForm="basicForm"
                              :companyForm="companyForm">
                 </detail-form>
                 <table-form></table-form>
            </el-tab-pane>
            <el-tab-pane label="工商信息" name="industry" class="tab_list">
                 <industry-form :industryForm="industryForm"></industry-form>
            </el-tab-pane>
            <el-tab-pane label="融资信息" name="capital" class="tab_list">
                <capital-table></capital-table>
            </el-tab-pane>
            <el-tab-pane label="记录" name="record" class="tab_list">
                <record-form></record-form>
            </el-tab-pane>
            <el-tab-pane label="文档" name="file" class="tab_list">
                <file-table></file-table>
            </el-tab-pane>
        </el-tabs>
   </div>
</div>
</template>
<script type="text/ecmascript-6">
import detailForm from './details'
import tableForm from './tables'
import industryForm from './industry'
import capitalTable from './capital'
import recordForm from './record'
import fileTable from './file'
export default {
    data() {
        return {
            title: '双子金服投资项目',
            state: '正常',
            activeName: 'details',
            basicForm: {
               baseInfo: '基本信息',
               flag: true
            },
            companyForm: {
               baseInfo: '企业信息',
               flag: true
            },
            industryForm: {
                baseInfo: '工商信息',
                flag: true 
            }
        }
    },
    components: {
       detailForm,
       tableForm,
       industryForm,
       capitalTable,
       recordForm,
       fileTable

    },
    methods: {
    }
}
</script>





<style lang="less" scoped>
.zpoolMessage{
    width: 100%;
    /*height: 100%;*/
    background-color: #fff;
    padding: 24px;
    .title {
        width: 100%;
        height: 64px;
        line-height: 64px;
        background-color: #2a3142;
        margin-bottom: 24px;
        .left {
            height: 100%;
            float: left;
            margin-left: 24px;
            font-size: 0;
            .desc {
                font-size: 20px;
                font-weight: 600;
                color: #fff;
                vertical-align: top;
            }
            .state {
                margin-left: 24px;
                vertical-align: middle;
            }
        }
        .right {
            height: 100%;
            float: right;
            margin-right: 24px;
        }
    }
}
</style>