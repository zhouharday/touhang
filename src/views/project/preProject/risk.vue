<template>
    <div>
        <section class="riskTable">
            <tabel-header :data="headerInfo_risk"></tabel-header>
            <el-table :data="riskData" border style="width: 100%" align="center">
                <el-table-column label="主题" prop="riskTheme" align="center">
                </el-table-column>
                <el-table-column label="处理人" prop="handlePerson" align="center">
                </el-table-column>
                <el-table-column label="指派人" prop="assignor" align="center">
                </el-table-column>
                <el-table-column label="开始时间" prop="startingDate" align="center">
                </el-table-column>
                <el-table-column label="完成时间" prop="endingDate" align="center">
                </el-table-column>
                <el-table-column label="状态" prop="state" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small">跟踪</el-button>
                        <el-button type="text" size="small" class="btn_border">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,riskData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </section>
    </div>
</template>


<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            headerInfo_risk: {
                desc: '风险登记',
                icon_a: 'plus-round',
                explain_a: '添加'
            },
            riskData: [{
                riskTheme: 'AAAAAAAAAA',
                handlePerson: '张三',
                assignor: '',
                startingDate: '',
                endingDate: '',
                state: ''
            }, {
                riskTheme: '',
                handlePerson: '',
                assignor: '',
                startingDate: '',
                endingDate: '',
                state: ''
            }, {
                riskTheme: '',
                handlePerson: '',
                assignor: '',
                startingDate: '',
                endingDate: '',
                state: ''
            }],
            headerInfo_file: {
                desc: '审批'
            },
        }
    },
    methods: {
        // 删除当前行
        handleDelete(index, rows) {
            rows.splice(index, 1);
        }
    },
    components: {
        tabelHeader
    }

}
</script>



<style lang="less" scoped>
.riskTable {
    width: 100%;
    height: 100%;
    .el-table {
        .btn_border {
            border-right: 1px solid #ddd;
            border-left: 1px solid #ddd;
            border-radius: 0;
            padding: 0 12px;
        }
    }
}
</style>
