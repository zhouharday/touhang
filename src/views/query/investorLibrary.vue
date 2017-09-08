<template>
<div class="investorLibrary">
    <div class="investorFilter">
        <myFilter :chooseInfo="filterInfo"></myFilter>
    </div>
    <div class="header">
        <tableHeader :theme="theme" :data="titleHeader" class="addPadding">
            <el-input placeholder="请输入搜索内容" icon="search" v-model="input2" :on-icon-click="handleIconClick" style="width: 320px;">
            </el-input>
        </tableHeader>
    </div>
    <el-table :data="investorData" border style="width: 100%">
        <el-table-column prop="name" label="投资者名称">
        </el-table-column>
        <el-table-column prop="type" label="类型">
        </el-table-column>
        <el-table-column prop="manager" label="投资经理">
        </el-table-column>
        <el-table-column prop="cumulative" label="累计投资额">
        </el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, investorData)"
                  type="text"
                  size="small">
                  签约
                </el-button>
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, investorData)"
                  type="text"
                  size="small">
                  删除
                </el-button>
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, investorData)"
                  type="text"
                  size="small">
                  拜访
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" class="page">
    </el-pagination>
</div>
</template>

<script type="text/ecmascript-6">
import myFilter from 'components/myFilter'
import tableHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            filterInfo: [{
                title: '组织类型：',
                details: ['全部', '机构', '个人', '政府']
            }],
            theme: '#fff',
            investorData: [{
                name: '张三',
                type: '个人',
                manager: 'xxx',
                cumulative: 100000
            }, {
                name: '张三',
                type: '个人',
                manager: 'xxx',
                cumulative: 100000
            }, {
                name: '张三',
                type: '个人',
                manager: 'xxx',
                cumulative: 100000
            }]
        }
    },
    components: {
        myFilter,
        tableHeader
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
