<template>
<div class="projects">
    <tabel-header :data="headerInfo" @method="method"></tabel-header>
    <el-table :data="projectsData" border style="width: 100%">
        <el-table-column label="项目名称" prop="entryName">
        </el-table-column>
        <el-table-column label="投资金额（元）" prop="investment">
        </el-table-column>
        <el-table-column label="实缴金额（元）" prop="amount">
        </el-table-column>
        <el-table-column label="股权占比（%）" prop="percent">
        </el-table-column>
        <el-table-column label="退出金额（元）" prop="secede">
        </el-table-column>
        <el-table-column label="退出收益（元）" prop="quitYield">
        </el-table-column>
        <el-table-column label="收益率（%）" prop="yield">
        </el-table-column>
    </el-table>
</div>
</template>

<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            headerInfo: {
                desc: '投资项目'
            },
            projectsData: [{
                amount: '123,13',
                secede: '123,13'
            }, {
                amount: '123,13',
                secede: '123,13'
            }, {
                amount: '123,13',
                secede: '123,13'
            }, {
                amount: '123,13',
                secede: '123,13'
            }]
        }
    },
    components: {
        tabelHeader
    },
    methods: {
        method() {
            alert(1)
        }
    }
}
</script>

<style lang="less" scoped>
.projects{
    width: 100%;
    height: 100%;
}
</style>
