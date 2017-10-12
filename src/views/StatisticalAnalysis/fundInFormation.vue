<template>
    <section class="fundInFormation">
        <!-- 这是基金信息统计表 -->
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
                        <a href="/static/source/投行接口文档1.7.xlsx" download="出资统计表.xls">
                            <el-button class="searchIpt" type="danger" size="small">
                                导出统计表
                            </el-button>
                        </a>
                    </div>
                </el-col>
            </el-row>
            <el-table :data="fundTabData" border style="width: 100%">
                <el-table-column fixed="left" prop="projectName" label="基金名称" width="150" align="center">
                </el-table-column>
                <el-table-column prop="projectType" label="组织类型" width="150" align="center">
                </el-table-column>
                <el-table-column prop="Industry" label="基金投向" width="150" align="center">
                </el-table-column>
                <el-table-column prop="projectLeader" label="基金负责人" width="150" align="center">
                </el-table-column>
                <el-table-column prop="investmentTime" label="基金规模" width="300" align="center">
                </el-table-column>
                <el-table-column prop="investmentAmount" label="募集总额" width="150" align="center">
                </el-table-column>
                <el-table-column prop="lastValuation" label="投资总额" width="150" align="center">
                </el-table-column>
                <el-table-column prop="lastFloating" label="剩余额度" width="150" align="center">
                </el-table-column>
                <el-table-column prop="exitProceeds" label="基金估值" width="150" align="center">
                </el-table-column>
                <el-table-column prop="contributionTheme" label="基金浮盈" width="150" align="center">
                </el-table-column>
                <el-table-column label="投资项目数" fixed="right" width="150" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="openModal(1)" style="color:#f05e5e">{{ scope.row.contributionTheme }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="退出投资数" fixed="right" width="150" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="openModal(2)" style="color:#f05e5e">{{ scope.row.shareholdingRatio }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row class="articlesNumber">
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        显示
                        <span> {{from}} </span>到
                        <span> {{to}} </span>条, 共
                        <span> {{altogether}} </span>条记录, 每页显示
                        <span> {{every}} </span>条
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="tableModal">
            <el-dialog title="投资详情" :visible.sync="tableModal">
                <el-table :data="projectData">
                    <el-table-column property="projectName" label="项目名称"></el-table-column>
                    <el-table-column property="projectType" label="项目类型"></el-table-column>
                    <el-table-column property="industry" label="所属行业"></el-table-column>
                    <el-table-column property="createUserName" label="项目创建人"></el-table-column>
                    <el-table-column property="payDate" label="投资日期"></el-table-column>
                    <el-table-column property="paySumAmount" label="投资金额"></el-table-column>
                    <el-table-column property="outingAmount" label="退出金额"></el-table-column>
                    <el-table-column property="outingIncome" label="退出收益"></el-table-column>
                </el-table>
            </el-dialog>
        </div>
    </section>
</template>


<script>
export default {
    created() {
        // this.$http.post('api/url', {

        // })
        //     .then(res => {

        //     })
        //     .catch(error => {

        //     });
        if (this.fundTabData.length == '0') {
            this.from = '0';
            this.to = '0';
            this.altogether = '0';
        } else if (this.fundTabData.length > '0') {
            this.from = 1;
            this.to = this.fundTabData.length;
            this.altogether = this.fundTabData.length;
        }
        // console.log(this.fundTabData.length);
    },
    methods: {
        handleClick() {
            console.log(1);
        },
        openModal(num) {
            this.tableModal = true;
        }
    },
    data() {
        return {
            from: 0,
            to: 0,
            altogether: 0,
            every: 10,
            tableModal: false,
            fundTabData: [
                {
                    projectName: '2016-05-03',
                    projectType: '王小虎',
                    Industry: '上海',
                    projectLeader: '普陀区',
                    investmentTime: '上海市普陀区金沙江路 1518 弄',
                    lastValuation: 200333,
                    lastFloating: 200333,
                    exitProceeds: 200333,
                    contributionTheme: 200333,
                    shareholdingRatio: 200333,
                }
            ],
            projectData: [
                {
                    projectName: '朝阳项目',
                    projectType: '',
                    industry: '',
                    createUserName: '',
                    payDate: '',
                    paySumAmount: '',
                    outingAmount: '',
                    outingIncome: ''
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
        .articlesNumber {
            margin-top: 20px;
            font-size: 10px;
        }
    }
}
</style>
