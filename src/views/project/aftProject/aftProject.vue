<template>
    <div class="aftProject">
        <div class="title">
            <div class="left">
                <span class="desc">{{title}}</span>
            </div>
            <div class="right">
                <el-button type="danger">&nbsp;返回&nbsp;</el-button>
            </div>
        </div>
        <div class="firstLayer">
            <el-row :gutter="10">
                <el-col :span="12">
                    <div>出资主体</div>
                    <el-table :data="fundTable" style="width: 100%">
                        <el-table-column label="基金名称" align="center">
                            <template scope="scope">
                                <a class="fundName">{{ scope.row.fundName }}</a>
                            </template>
                        </el-table-column>
                        <el-table-column prop="investorMoney" label="投资金额（元）" align="center">
                        </el-table-column>
                        <el-table-column prop="percent" label="股权占比（%）" align="center">
                        </el-table-column>
                        <el-table-column prop="paidMoney" label="支付金额（元）" align="center">
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="12">
                    <echarts></echarts>
                </el-col>
            </el-row>
        </div>
        <div class="secondLayer">
            <el-row :gutter="10">
                <el-col :span="12">
                    <table-info :data="tableData"></table-info>
                </el-col>
                <el-col :span="12">
                  
                </el-col>
            </el-row>
        </div>
    </div>
</template>
    

<script type="text/ecmascript-6">
import tableInfo from '../../../components/tableInfo'
import echarts from '../../../components/echarts'
export default {
    data() {
        return {
            title: '双子金服投资项目',
            fundTable: [
                {
                    fundName: '京东',
                    investorMoney: '56,000,000,000',
                    percent: '0.3%',
                    paidMoney: '24,000,000,000'
                },
                {
                    fundName: '一号店',
                    investorMoney: '24,000,000,000',
                    percent: '0.3%',
                    paidMoney: '24,000,000,000'
                }, {
                    fundName: '飞志',
                    investorMoney: '36,000,000,000',
                    percent: '0.3%',
                    paidMoney: '12,000,000,000'
                },
                {
                    fundName: '博奥',
                    investorMoney: '29,000,000,000',
                    percent: '0.3%',
                    paidMoney: '29,000,000,000'
                }
            ],
            tableData: [{
                name: '最新估值（元）',
                rmb: '83,000,000',
                updown: '3%'
            }, {
                name: '最新浮盈（元）',
                rmb: '32,000,000,000'
            }, {
                name: '估值日期'
            }, {
                name: '基金规模（元）'
            }, {
                name: '募集总额（元）'
            }, {
                name: '投资总额（元）'
            }, {
                name: '剩余额度（元）'
            }, {
                name: '待分配总额（元）',
            }, {
                name: '基金负责人'
            }, {
                name: '成立日期'
            }],


        }
    },
    methods: {

    },
    components: {
        echarts,
        tableInfo

    }
}   
</script>    




<style lang="less" scoped>
.aftProject {
    width: 100%;
    background-color: #fff;
    padding: 24px;
    .title {
        width: 100%;
        height: 64px;
        line-height: 64px;
        margin-bottom: 24px;
        background-color: #2a3142;
        .left {
            height: 100%;
            float: left;
            margin-left: 24px;
            .desc {
                font-size: 20px;
                font-weight: 600;
                color: #fff;
                vertical-align: top;
            }
        }
        .right {
            height: 100%;
            float: right;
            margin-right: 24px;
            .el-button {
                border-radius: 24px;
                padding: 5px 15px;
            }
        }
    }
    .firstLayer {
        width: 100%;
        margin-bottom: 40px;
    }
    .secondLayer {}
}
</style>
