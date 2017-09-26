<template>
<div class="fund">
    <div class="title">
        <div class="left">
            <span class="desc">{{title}}</span>
            <span class="icon">
                <Icon type="pause"></Icon>
            </span>
        </div>
        <div class="right">
            <el-button type="danger">&nbsp;返回&nbsp;</el-button>
            <el-button type="danger">下一步</el-button>
            <span class="restart">
                <Icon type="ios-play"></Icon>
            </span>
        </div>
    </div>
    <el-row class="step">
        <el-col :span="8" class="step_one step_span">
            <span>{{step_one}}</span>
        </el-col>
        <el-col :span="8" class="step_second step_span">
            <span>{{step_second}}</span>
        </el-col>
        <el-col :span="8" class="step_third step_span">
            <span>{{step_third}}</span>
        </el-col>
    </el-row>
    <div class="picture">
        <div class="img_wrapper">
            <img src="../../../static/img/double.png" alt="">
        </div>
        <div class="prompt_message">
            <span class="prompt">{{prompt}}</span>
            <div class="item_wrapper">
                <div v-for="(item, index) in module" class="item">
                    <span class="count">{{item.count}}</span>
                    <p class="desc">{{item.desc}}</p>
                    <span class="state" :class="{complete:item.state === true}">{{item.info}}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="chart">
        <el-row :gutter="10">
            <el-col :span="12">
                <tableInfo :data="tableData"></tableInfo>
            </el-col>
            <el-col :span="12">
                <echarts></echarts>
            </el-col>
        </el-row>
    </div>
    <div class="tabs">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="详情" name="details" class="tab_list">
                <my-details :formDetails="formDetails" :formMIS="formMIS" :formRegistration="formRegistration" :formAccountinfo="formAccountinfo">
                </my-details>
            </el-tab-pane>
            <el-tab-pane label="团队" name="team" class="tab_list">
                <team :teamData="teamData"></team>
            </el-tab-pane>
            <el-tab-pane label="审批" name="examine" class="tab_list">
                <examine></examine>
            </el-tab-pane>
            <el-tab-pane label="投资者" name="Investor" class="tab_list">
                <investor :investorData="investorData"></investor>
            </el-tab-pane>
            <el-tab-pane label="投资项目" name="project" class="tab_list">
                <projects :projectsData="projectsData"></projects>
            </el-tab-pane>
            <el-tab-pane label="文档" name="file" class="tab_list">
                <my-file :fileListData="fileListData"></my-file>
            </el-tab-pane>
            <el-tab-pane label="运营管理" name="manage" class="tab_list">
                <manage></manage>
            </el-tab-pane>
        </el-tabs>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import tableInfo from '../../components/tableInfo'
import Details from './details'
import Team from './team'
import Examine from './examine'
import Investor from './investor'
import Projects from './projects'
import File from './file'
import Manage from './manage'
import echarts from '../../components/echarts'
import {
    mapGetters
} from 'vuex'

import {getFundTeamList, getInvestorByFund, getProjectContractByFund, selectProjectOrFundDocument, getFunAppraisement} from 'api/fund'

export default {
    data() {
        return {
            title: '双子金服投资项目',
            step_one: '基金设立',
            step_second: '运营管理',
            step_third: '基金退出',
            prompt: '任务助手小双温馨提示:',
            module: [{
                count: 1,
                desc: '上传基金发起概要',
                state: true,
                info: '已完成'
            }, {
                count: 2,
                desc: '进行基金设立申请',
                state: false,
                info: '提交申请'
            }],
            tableData: [{
                date1: '2016-05-02',
                name: '日期',
                updown: '0.3'
            }, {
                name1: '王小虎',
                name: '姓名',
                updown: '-0.3'
            }, {
                address: 'ssssss',
                name: '地址'
            }, {
                xxxx: 'aaaa',
                name: '哈哈'
            }, {
                date1: '2016-05-02',
                name: '日期'
            }, {
                name1: '王小虎',
                name: '姓名'
            }, {
                address: 'ssssss',
                name: '地址'
            }, {
                xxxx: 'aaaa',
                name: '哈哈',
                updown: '3'
            }, {
                date1: '2016-05-02',
                name: '日期'
            }, {
                name1: '王小虎',
                name: '姓名'
            }],
            activeName: 'details',
            formDetails: {},
            // formMIS: {},
            // formRegistration: {},
            // formAccountinfo: {},
            teamData: [], //团队列表
            investorData: [], // 投资者列表
            fileListData: [], // 文档列表
            projectsData: [] // 投资项目
        }
    },
    methods: {
        handleClick() {
            if(this.activeName == 'team') {
                getFundTeamList(this.$route.params.id).then((res) => {
                    if(res.status == '200') {
                        console.log('团队：' + res.data.result)
                        this.teamData = res.data.result
                    }
                })
            } else if (this.activeName == 'Investor') {
                getInvestorByFund(this.$route.params.id).then((res) => {
                    if(res.status == '200') {
                        console.log(res.data.result) // 投资者数据为空
                        this.investorData = res.data.result
                    }
                })
            } else if (this.activeName == 'project') {
                getProjectContractByFund(this.$route.params.id).then((res) => {
                    if(res.status == '200') {
                        console.log(res) // 投资项目数据为空
                        this.projectsData = res.data.result
                    }
                })
            } else if(this.activeName == 'file') {
                selectProjectOrFundDocument(this.$route.params.id).then((res) => {
                    if(res.status == '200') {
                        console.log(res.data.result)
                        this.fileListData = res.data.result
                    }
                })
            }
        }
    },
    computed: {
        ...mapGetters([
            'myFundDetails'
        ])
    },
    created() {
        this.fundDetails = Object.assign({}, this.myFundDetails.fundBaseInfo, {
            flag: 'false'
        })
        this.formMIS = Object.assign({}, this.myFundDetails.fundManageInfo, {
            flag: 'false'
        })
        this.formAccountinfo = Object.assign({}, this.myFundDetails.fundAccinfo, {
            flag: 'false'
        })
        this.formRegistration = Object.assign({}, this.myFundDetails.fundRegistration, {
            flag: 'false',
        })
    },
    components: {
        tableInfo,
        echarts,
        myDetails: Details,
        Team,
        Examine,
        Investor,
        Projects,
        myFile: File,
        Manage
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
.fund {
    width: 100%;
    /*height: 100%;*/
    background-color: #fff;
    padding: 24px;
    .title {
        width: 100%;
        height: 64px;
        line-height: 64px;
        background-color: #2a3142;
        .left {
            height: 100%;
            float: left;
            margin-left: 24px;
            font-size: 0;
            .desc {
                font-size: 20px;
                font-weight: 600;
                color: #fff;
                vertical-align: top;
            }
            .icon {
                font-size: 20px;
                font-weight: 600;
                color: @color-theme-red;
                margin-left: 24px;
            }
            .termination {
                margin-left: 24px;
                vertical-align: middle;
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
            .restart {
                width: 24px;
                height: 24px;
                padding: 6px;
                color: @color-theme-red;
                font-size: 20px;
                font-weight: 600;
                margin-left: 24px;
                vertical-align: middle;
            }
        }
    }
    .step {
        width: 100%;
        height: 52px;
        margin-top: 24px;
        .step_span {
            line-height: 52px;
            text-align: center;
            width: 32%;
            height: 52px;
            float: left;
            border: 1px solid #000;
            position: relative;
        }
        .step_one {
            border: 1px solid red;
            &::after {
                content: '';
                width: 36px;
                height: 36px;
                background: #FFF;
                position: absolute;
                top: 7px;
                right: -19px;
                border: 1px solid;
                border-color: red red transparent transparent;
                transform: rotate(45deg);
                z-index: 1;
            }
        }
        .step_second {
            margin: 0 2%;
            &::after {
                content: '';
                width: 36px;
                height: 36px;
                background: #FFF;
                position: absolute;
                top: 7px;
                right: -19px;
                border: 1px solid;
                border-color: #000 #000 transparent transparent;
                transform: rotate(45deg);
                z-index: 1;
            }
            &::before {
                content: '';
                width: 36px;
                height: 36px;
                background: #FFF;
                position: absolute;
                top: 7px;
                left: -19px;
                border: 1px solid;
                border-color: #000 #000 transparent transparent;
                transform: rotate(45deg);
            }
        }
        .step_third {
            &::before {
                content: '';
                width: 36px;
                height: 36px;
                background: #FFF;
                position: absolute;
                top: 7px;
                left: -19px;
                border: 1px solid;
                border-color: #000 #000 transparent transparent;
                transform: rotate(45deg);
            }
        }
    }
    .picture {
        width: 100%;
        text-align: center;
        padding: 54px 0;
        .img_wrapper {
            height: 100%;
            margin-right: 34px;
            display: inline-block;
            vertical-align: middle;
        }
        .prompt_message {
            width: 48%;
            height: 140px;
            display: inline-block;
            vertical-align: middle;
            background: #eef0f4;
            padding: 18px 24px;
            text-align: left;
            border-radius: 10px;
            position: relative;
            &::before {
                content: '';
                width: 0;
                height: 0;
                border-bottom: 20px solid #eef0f4;
                border-left: 20px solid transparent;
                position: absolute;
                top: 40px;
                left: -19px;
            }
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
                    float: left;
                    line-height: 36px;
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
        }
    }
    .chart {
        width: 100%;
        padding-bottom: 52px;
    }
    .tabs {
        width: 100%;
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
