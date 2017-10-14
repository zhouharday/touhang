<template>
<div class="investorTable">
    <tabel-header :data="headerInfo" @method="method"></tabel-header>
    <el-table :data="investorData" border style="width: 100%">
        <el-table-column label="投资者" prop="investorName" align="center">
        </el-table-column>
        <el-table-column label="协议名称" prop="agreementName" align="center">
        </el-table-column>
        <el-table-column label="认缴金额（元）" prop="subscribeAmount" align="center">
        </el-table-column>
        <el-table-column label="出资占比（%）" prop="contributiveRatio" align="center">
        </el-table-column>
        <el-table-column label="实缴金额（元）" prop="amountSum" align="center">
        </el-table-column>
        <el-table-column label="返还金额" prop="earningsSum" align="center">
        </el-table-column>
        <el-table-column label="收益金额" prop="incomeAmount" align="center">
        </el-table-column>
    </el-table>
</div>
</template>

<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
import {changeDate} from 'common/js/config'
export default {
    props: {
        investorData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            modalAdd: false,
            formLabelWidth: '80px',
            ruleValidate: {
                name: [{
                    required: true,
                    message: '姓名不能为空',
                    trigger: 'blur'
                }],
                role: [{
                    required: true,
                    message: '角色不能为空',
                    trigger: 'blur'
                }],
                date: [{
                    required: true,
                    type: 'date',
                    message: '请选择日期',
                    trigger: 'change'
                }]
            },
            headerInfo: {
                desc: '投资者详情'
            }
        }
    },
    components: {
        tabelHeader
    }
}
</script>

<style lang="less" scoped>
.investorTable {
    width: 100%;
    height: 100%;
}
</style>
