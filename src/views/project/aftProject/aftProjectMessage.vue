<template>
    <div class="aftProjectMessage">
        <div class="title">
            <div class="left">
                <span class="desc">{{title}}</span>
            </div>
            <div class="right">
                <el-button type="danger">&nbsp;返回&nbsp;</el-button>
            </div>
        </div>
        <div class="firstLayer">
            <el-row :gutter="40">
                <el-col :span="12">
                    <div class="tableTitle">出资主体</div>
                    <el-table :data="fundTable" style="width: 100%" :row-class-name="tableRowClassName">
                        <el-table-column prop="fundName" label="基金名称" align="center">
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
                    <echarts class="chart"></echarts>
                </el-col>
            </el-row>
        </div>
        <div class="secondLayer">
            <el-row :gutter="40">
                <el-col :span="12">
                    <table-info :data="tableData"></table-info>
                </el-col>
                <el-col :span="12">
                    <div class="prompt_message">
                        <span class="prompt">{{prompt}}</span>
                        <div class="item_wrapper">
                            <div class="item" v-for="(item, index) in message" :key="item.index">
                                <span class="count">{{item.count}}</span>
                                <p class="desc">{{item.desc}}</p>
                                <!-- <el-button type="text" :disabled=item.state :class="{ complete:item.state === true,state:item.state === false}" @click="modalAlarm=true">
                                        {{item.info}}
                                    </el-button> -->
                            </div>
                        </div>
                        <div class="img_wrapper">
                            <img src="/static/img/double-02.png">
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="tabs">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="详情" name="details" class="tab_list">
                    <detail-form :basicForm="basicForm" :companyForm="companyForm" :capitalForm="capitalForm">
                    </detail-form>
                    <table-form></table-form>
                </el-tab-pane>
                <el-tab-pane label="审批" name="approve" class="tab_list">
                    <approve-table></approve-table>
                </el-tab-pane>
                <el-tab-pane label="文档" name="file" class="tab_list">
                    <file-table></file-table>
                </el-tab-pane>
                <el-tab-pane label="管理" name="manage" class="tab_list">
                    <manage-table></manage-table>
                </el-tab-pane>
                <el-tab-pane label="记录" name="record" class="tab_list">
                    <record-form></record-form>
                </el-tab-pane>
                <el-tab-pane label="风险管理" name="risk" class="tab_list">
                    <risk-table></risk-table>
                </el-tab-pane>
                <el-tab-pane label="重大事项" name="event" class="tab_list">
                    <event-table></event-table>
                </el-tab-pane>
                <el-tab-pane label="数据填报" name="data" class="tab_list">
                    <data-table></data-table>
                </el-tab-pane>
                <el-tab-pane label="监控设置" name="monitor" class="tab_list">
                    <monitor-table></monitor-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
    

<script>
import tableInfo from '../../../components/tableInfo'
import echarts from '../../../components/echarts'
import detailForm from './details'
import tableForm from './tables'
import approveTable from './approve'
import recordForm from './record'
import fileTable from './file'
import manageTable from './manage'
import riskTable from './risk'
import eventTable from './event'
import dataTable from './data'
import monitorTable from './monitor'

import { getAfterDetail } from 'api/projectAfter';

export default {
    data() {
        return {
            title: '双子金服投资项目',
            prompt: '任务助手小双温馨提示:',
            activeName: 'details',
            message: [
                {
                    count: 1,
                    desc: '2017【经营数据】指标出现警告',
                    state: true
                }, {
                    count: 2,
                    desc: '2017【年报】指标出现警告',
                    state: false
                }
            ],
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
            tableData: [
                {
                    rmb: '83,000,000',
                    name: '最新估值（元）',
                    updown: '3'
                }, {
                    rmb: '32,000,000,000',
                    name: '最新浮盈（元）'
                }, {
                    date: '',
                    name: '估值日期'
                }, {
                    rmb: '',
                    name: '基金规模（元）'
                }, {
                    rmb: '',
                    name: '募集总额（元）'
                }, {
                    rmb: '',
                    name: '投资总额（元）'
                }, {
                    rmb: '',
                    name: '剩余额度（元）'
                }, {
                    rmb: '',
                    name: '待分配总额（元）',
                }, {
                    manager: '',
                    name: '基金负责人'
                }, {
                    date: '',
                    name: '成立日期'
                }
            ],
            basicForm: {
                baseInfo: '基本信息',
                flag: true
            },
            companyForm: {
                baseInfo: '企业信息',
                flag: true
            },
            capitalForm: {
                baseInfo: '投资信息',
                flag: true
            },
            // 风险预警 立即处理表单
            alarmForm: {
                result: '',
                content: '',
                appendix: ''
            },
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.initInfo();
            this.initData();
        },
        initInfo() {
            let merchants = JSON.parse(window.sessionStorage.getItem('merchants') || '[]');
            let info = JSON.parse(sessionStorage.getItem('userInfor') || '{}');
            this.merchantId = merchants[0].id;
            this.addProjectUserId = info.id;

            let href = window.location.href;
            let id = href.substr(href.lastIndexOf('/') + 1, href.length);
            this.id = id;
        },
        initData() {
            getAfterDetail({
                id: this.id,
                userId: this.addProjectUserId
            }).then(resp => {

            }).catch(e => {

            });
        },
        disable(name) {
            if (name.flag === false) {
                return name.flag = true
            } else {
                return name.flag = false
            }
        },
        // 设置 出资主体table  间隔行的background-color
        tableRowClassName(row, index) {
            if ((index % 2) == 0) {
                return 'info-row';
            } else {
                return 'positive-row';
            }
            return '';
        }
    },
    components: {
        echarts,
        tableInfo,
        detailForm,
        tableForm,
        approveTable,
        recordForm,
        fileTable,
        manageTable,
        riskTable,
        eventTable,
        dataTable,
        monitorTable
    }
}   
</script>    




<style lang="less" scoped>
.aftProjectMessage {
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
        .tableTitle {
            font-weight: bold;
            color: #333;
            font-size: px;
        }
    }
    .secondLayer {
        .prompt_message {
            position: relative;
            width: 100%;
            height: 262px;
            vertical-align: middle;
            background: #eef0f4;
            padding: 18px 24px;
            text-align: left;
            border-radius: 10px;
            .prompt {
                line-height: 36px;
            }
            .item {
                width: 100%;
                height: 36px;
                margin-left: 24px;
                line-height: 36px;
                .count,
                .desc,
                .state {
                    float: left; // line-height: 36px;
                }
                .count {
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    border-radius: 100%;
                    color: #fff;
                    background: #f05e5e;
                    text-align: center;
                    margin-top: 8px;
                }
                .desc {
                    margin: 0 24px 0 20px;
                }
                .state {
                    color: #f05e5e;
                }
                .complete {
                    color: #a0a3aa;
                }
            }
            .img_wrapper img {
                position: absolute;
                width: 120px;
                height: 120px;
                bottom: 10px;
                right: 10px;
            }
        }
    }
    .tabs {
        width: 100%;
        margin-top: 50px;
        padding-bottom: 54px;
        .el-tabs__nav {
            width: 100%!important;
            .el-tabs__item {
                width: 12.5%!important;
            }
        }
    }
}
</style>
