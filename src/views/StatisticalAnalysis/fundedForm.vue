<template>
    <section>
        <!-- 这是出资统计表 -->
        <div>
            <el-row class="customerMang">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark">
                        <el-input placeholder="" icon="search" v-model="input2" :on-icon-click="handleIconClick">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple-dark"></div>
                </el-col>
                <el-col :span="8" class="searchIpt">
                    <div class="grid-content bg-purple-dark">
                        <el-button class="searchIpt" type="primary">导出统计表</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-table :data="fundedTabData" border style="width: 100%">
                <el-table-column prop="investor" label="投资者" align="center">
                </el-table-column>
                <el-table-column prop="type" label="类型" align="center">
                </el-table-column>
                <el-table-column prop="fundName" label="基金名称" align="center">
                </el-table-column>
                <el-table-column prop="signingDate" label="签订日期" align="center">
                </el-table-column>
                <el-table-column prop="subscriptionMoney" label="认缴金额" align="center">
                </el-table-column>
                <el-table-column prop="paidMoney" label="实缴金额" align="center">
                </el-table-column>
                <el-table-column prop="capitalContribution" label="出资占比" align="center">
                </el-table-column>
            </el-table>
            <el-row class="articlesNumber">
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        显示<span> 1 </span>到<span> 7 </span>条
                        共<span> 7 </span>条记录
                        每页显示<span> 10 </span>条
                    </div>
                </el-col>
            </el-row>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            fundedTabData: [
                {
                    investor: '张三',
                    type: '',
                    fundName: '',
                    signingDate: '',
                    subscriptionMoney: '',
                    paidMoney: '',
                    capitalContribution: '',
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
section {
    >div {
        background: #ffffff;
        padding: 24px;
        overflow: hidden;
        .customerMang {
            margin-bottom: 10px;
        }
        .searchIpt_left {
            float: left;
        }
        .searchIpt {
            float: right;
        }
        .articlesNumber{
            margin-top: 20px;
            font-size: 10px;
        }
    }
}
</style>
