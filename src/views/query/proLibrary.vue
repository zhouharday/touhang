<template>
<div class="proLibrary">
    <div class="title">
        <tableHeader :theme="theme" :data="titleInfo">
            <el-input placeholder="请输入搜索内容" icon="search" v-model="input" :on-icon-click="handleIconClick" style="width: 320px;">
            </el-input>
        </tableHeader>
    </div>
    <el-table :data="proLibrary" border style="width: 100%">
        <el-table-column prop="entryName" label="项目名称">
        </el-table-column>
        <el-table-column prop="founder" label="项目创建人">
        </el-table-column>
        <el-table-column prop="industry" label="所属行业">
        </el-table-column>
        <el-table-column prop="type" label="项目类型">
        </el-table-column>
        <el-table-column prop="step" label="项目阶段">
        </el-table-column>
        <el-table-column prop="date" label="投资日期">
        </el-table-column>
        <el-table-column prop="investment" label="投资金额（元）">
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" class="page">
    </el-pagination>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            theme: '#fff',
            titleInfo: {
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '基金'
                }, {
                    explain: '导入'
                }, {
                    explain: '模板下载'
                }]
            },
<<<<<<< HEAD
            chooseInfo: [{
                title: '项目类型:',
                details: ['全部', 'PE', 'VC', '定增']
            }],
            proLibrary: [{
                entryName: '飞机✈️',
                founder: '张三',
                industry: '军工',
                type: '',
                step: '进行中...',
=======
            myFund: [{
                fundName: '中国联通',
                number: 20160906,
                orgType: '众投',
                admType: '代理',
                fundScale: 100000000,
                raiseTotal: 5000000,
                invTotal: 80000000,
                remainingQuota: 300000,
>>>>>>> c3095b99b23ac4eba6cdfc0a42250a74dfbb3fe1
                date: '2016-09-01',
                investment: 200000
            }, {
                entryName: '飞机✈️',
                founder: '张三',
                industry: '军工',
                type: '',
                step: '进行中...',
                date: '2016-09-01',
                investment: 200000
            }, {
                entryName: '飞机✈️',
                founder: '张三',
                industry: '军工',
                type: '',
                step: '持有',
                date: '2016-09-01',
                investment: 200000
            }]
        }
    },
    components: {
        tableHeader
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
    .page{
        padding: 24px 0;
        text-align: right;
    }
}
</style>
