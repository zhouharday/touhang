<template>
<div class="projects">
    <tabel-header :data="headerInfo" @method="method"></tabel-header>
    <el-table :data="projectsData" border style="width: 100%">
        <el-table-column label="项目名称" prop="project_name">
        </el-table-column>
        <el-table-column label="投资金额（元）" prop="sumInvestAmount">
        </el-table-column>
        <el-table-column label="实缴金额（元）" prop="payAmount">
        </el-table-column>
        <el-table-column label="股权占比（%）" prop="sumStockRatio">
        </el-table-column>
        <el-table-column label="退出金额（元）" prop="exitAmount">
        </el-table-column>
        <el-table-column label="退出收益（元）" prop="earningsAmount">
        </el-table-column>
        <el-table-column label="收益率（%）" prop="yield">
        </el-table-column>
    </el-table>
</div>
</template>

<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
export default {
    props: {
        projectsData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            headerInfo: {
                desc: '投资项目'
            }
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
