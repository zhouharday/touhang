<template>
<div class="investor">
    <tabel-header :data="headerInfo" @method="method"></tabel-header>
    <el-table :data="teamData" border style="width: 100%">
        <el-table-column label="投资者" prop="investor">
        </el-table-column>
        <el-table-column label="协议名称" prop="protocol">
        </el-table-column>
        <el-table-column label="认缴金额（元）" prop="sum">
        </el-table-column>
        <el-table-column label="出资占比（%）" prop="percent">
        </el-table-column>
        <el-table-column label="实缴金额（元）" prop="amount">
        </el-table-column>
        <el-table-column label="返还金额" prop="return">
        </el-table-column>
        <el-table-column label="收益金额" prop="profit">
        </el-table-column>
    </el-table>
</div>
</template>

<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
import {changeDate} from 'common/js/config'
export default {
    data() {
        return {
            modalAdd: false,
            formLabelWidth: '80px',
            teamData: [{
                investor: '安红',
                protocol: '安红、我想你',
                sum: 10000000,
                amount: 1111111,
                percent: '23%',
                return: 2000,
                profit: 5000
            }, {
                investor: '安红',
                protocol: '安红、我想你',
                sum: 10000000,
                amount: 1111111,
                percent: '23%',
                return: 2000,
                profit: 5000
            }],
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
.investor {
    width: 100%;
    height: 100%;
}
</style>
