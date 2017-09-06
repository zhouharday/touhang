<template>
<div class="fundLibrary">
    <div class="title">
        <tableHeader :theme="theme" :data="titleInfo" class="addPadding">
            <el-input placeholder="请输入搜索内容" icon="search" v-model="input" :on-icon-click="handleIconClick" style="width: 320px;">
            </el-input>
        </tableHeader>
    </div>
    <el-table :data="myFund" border style="width: 100%">
        <el-table-column fixed prop="fundName" label="基金名称" width="150">
        </el-table-column>
        <el-table-column prop="number" label="基金编号" width="300">
        </el-table-column>
        <el-table-column prop="orgType" label="组织类型" width="300">
        </el-table-column>
        <el-table-column prop="admType" label="管理类型" width="300">
        </el-table-column>
        <el-table-column prop="fundScale" label="基金规模（元）" width="300">
        </el-table-column>
        <el-table-column prop="raiseTotal" label="募集总额（元）" width="300">
        </el-table-column>
        <el-table-column prop="invTotal" label="投资总额（元）" width="300">
        </el-table-column>
        <el-table-column prop="remainingQuota" label="剩余额度（元）" width="300">
        </el-table-column>
        <el-table-column prop="date" label="成立日期" width="300">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="300">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
            <template scope="scope">
                   <el-button @click="handleClick" type="text" size="small">查看</el-button>
                   <el-button type="text" size="small">编辑</el-button>
                </template>
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
            myFund: [{
                fundName: '中国联通',
                number: 20160906,
                orgType: '众投',
                admType: '代理',
                fundScale: 100000000,
                raiseTotal: 5000000,
                invTotal: 80000000,
                remainingQuota: 300000,
                date: '2016-09-01',
                state: '持有'
            }, {
                fundName: '中国联通',
                number: 20160906,
                orgType: '众投',
                admType: '代理',
                fundScale: 100000000,
                raiseTotal: 5000000,
                invTotal: 80000000,
                remainingQuota: 300000,
                date: '2016-09-01',
                state: '持有'
            }, {
                fundName: '中国联通',
                number: 20160906,
                orgType: '众投',
                admType: '代理',
                fundScale: 100000000,
                raiseTotal: 5000000,
                invTotal: 80000000,
                remainingQuota: 300000,
                date: '2016-09-01',
                state: '持有'
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
.fundLibrary {
    width: 100%;
    height: 100%;
    padding: 24px;
    background: @color-base;
    .addPadding {
        padding-bottom: 12px;
    }
    .page{
        padding: 24px 0;
        text-align: right;
    }
}
</style>
