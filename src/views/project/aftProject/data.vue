<template>
    <div class="table">
        <div class="topBtn">
            <div class="leftBtn">
                <el-button @click="changeData1" :class="{active:f_show}">经营数据</el-button>
                <el-button @click="changeData2" :class="{active:s_show}">财务数据</el-button>
            </div>
            <div class="rightBtn">
                <el-button type="danger" size="small" @click="addData">添加</el-button>
            </div>
        </div>
        <div class="f_data" v-show="f_show">
            <el-table :data="operatingData" border style="width: 100%">
                <el-table-column label="基准日" prop="baseDate" align="center">
                </el-table-column>
                <el-table-column label="类型" prop="dataType" align="center">
                    <template scope="scope">{{scope.row.dataType | key2value(sortOptions, scope.row.dataType)}}</template>
                </el-table-column>
                <el-table-column label="填报人" prop="operatorName" align="center">
                </el-table-column>
                <el-table-column label="填报日期" prop="currentDeta" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="goAddData(scope.row.id, '1')">添加数据</el-button>
                        <el-button type="text" @click="operatingDelete=true">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 添加经营数据表头 对话框-->
            <el-dialog title="添加经营数据表头" :visible.sync="operatingModal1" :close-on-click-modal="false">
                <el-form :model="operatingForm1" :rules="rules1" ref="operatingForm1" :label-width="formLabelWidth">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="基准日" prop="baseDate">
                                <el-date-picker type="date" placeholder="选择日期" v-model="operatingForm1.baseDate" style="width:100%;">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="类型" prop="dataType">
                                <el-select v-model="operatingForm1.dataType" placeholder="请选择类型" style="width:100%;">
                                    <el-option v-for="item in sortOptions" :key="item.key" :label="item.value" :value="item.key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="填报人" prop="userName">
                                <el-input placeholder="默认登录用户" v-model="userName" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="填报日期" prop="currentDeta">
                                <el-input placeholder="当前默认日期" v-model="currentDeta" style="width:100%;" disabled>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="备注" prop="remark">
                                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="operatingForm1.remark">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="operatingModal1 = false">取 消</el-button>
                    <el-button type="danger" @click="saveSubject('operatingForm1', '1')">保 存</el-button>
                </div>
            </el-dialog>
            <!-- 添加经营数据明细 对话框 -->
            <el-dialog title="添加经营数据明细" :visible.sync="operatingModal2" :close-on-click-modal="false" class="editData">
                <el-table :data="operatingData1" border style="width:100%">
                    <el-table-column label="项目" prop="project" align="center">
                    </el-table-column>
                    <el-table-column label="经营目标" prop="operatingGoal" align="center">
                        <template scope="scope">
                            <el-input v-model="scope.row.operatingGoal" placeholder="">{{ scope.row.operatingGoal }}</el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="截止基准日实际情况" prop="realSituation" align="center">
                        <template scope="scope">
                            <el-input v-model="scope.row.realSituation" placeholder="">{{ scope.row.realSituation }}</el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="完成率" prop="completionRate" align="center">
                        <template scope="scope">
                            <el-input v-model="scope.row.completionRate" placeholder="">{{ scope.row.completionRate }}</el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="下半年计划" prop="secondPlan" align="center">
                        <template scope="scope">
                            <el-input v-model="scope.row.secondPlan" placeholder="">{{ scope.row.secondPlan }}</el-input>
                        </template>
                    </el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="operatingModal2 = false">取 消</el-button>
                    <el-button type="danger" @click="operatingEdit">保 存</el-button>
                </div>
            </el-dialog>
            <delete-reminders :deleteReminders="operatingDelete" :message="operatingMessage" :modal_loading="modal_loading" @del="operatingDelete=false" @cancel="operatingDelete=false">
            </delete-reminders>
        </div>

        <div class="s_data" v-show="s_show">
            <el-table :data="financialData" border style="width: 100%" align="center">
                <el-table-column label="基准日" prop="baseDate" align="center">
                </el-table-column>
                <el-table-column label="类型" prop="dataType" align="center">
                    <template scope="scope">{{scope.row.dataType | key2value(sortOptions, scope.row.dataType)}}</template>
                </el-table-column>
                <el-table-column label="填报人" prop="operatorName" align="center">
                </el-table-column>
                <el-table-column label="填报日期" prop="currentDeta" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="goAddData(scope.row.id, '2')">添加数据</el-button>
                        <el-button type="text" @click="financialDelete=true">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--  添加财务数据表头  对话框-->
            <el-dialog title="添加财务数据表头" :visible.sync="financialModal1" :close-on-click-modal="false">
                <el-form :model="financialForm1" :rules="rules2" ref="financialForm1" :label-width="formLabelWidth">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="基准日" prop="baseDate">
                                <el-date-picker type="date" placeholder="选择日期" v-model="financialForm1.baseDate" style="width:100%;">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="类型" prop="dataType">
                                <el-select v-model="financialForm1.dataType" placeholder="请选择类型" style="width:100%;">
                                    <el-option v-for="item in sortOptions" :key="item.key" :label="item.value" :value="item.key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="填报人" prop="userName">
                                <el-input placeholder="默认登录用户" v-model="userName" auto-complete="off" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="填报日期" prop="currentDeta">
                                <el-input placeholder="当前默认日期" v-model="currentDeta" style="width:100%;" disabled>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="备注" prop="remark">
                                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="financialForm1.remark">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="financialModal1 = false">取 消</el-button>
                    <el-button type="danger" @click="saveSubject('financialForm1', '2')">保 存</el-button>
                </div>
            </el-dialog>
            <!--  添加财务数据明细 对话框-->
            <el-dialog title="添加财务数据明细" :visible.sync="financialModal2" :close-on-click-modal="false">
                <div class="importModal">
                    <el-upload class="upload-demo" ref="upload" action="" :auto-upload="false">
                        <el-button type="text">导入</el-button>
                    </el-upload>
                    <el-button class="downBtn">
                        <a href="/static/img/sheet.txt" download="资产负债表">模板下载</a>
                    </el-button>
                </div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="资产负债表" name="first">
<!--                         <div class="title_f">
                            <div class="desc">
                                <span>资产</span>
                            </div>
                            <div class="desc">
                                <span>期末余额</span>
                            </div>
                            <div class="desc">
                                <span>年初余额</span>
                            </div>
                            <div class="desc">
                                <span>负债和所有者权益</span>
                            </div>
                            <div class="desc">
                                <span>期末余额</span>
                            </div>
                            <div class="desc">
                                <span>年初余额</span>
                            </div>
                        </div>
                        <el-form :inline="true">
                            <el-form-item style="width:48%;text-align:center;margin-right:15px" v-for="(item,index) in list" :key="item.index">
                                <div style="display:flex;justify-content:space-between;padding:0 0 0 25px">
                                    <span style="width:40%;">{{item.filed}}</span>
                                    <el-input style="width:30%;margin-left:50px" v-model="item.user1" placeholder="审批人1"></el-input>
                                    <el-input style="width:30%;margin-left:80px" v-model="item.user2" placeholder="审批人2"></el-input>
                                </div>
                            </el-form-item>
                        </el-form> -->
                        <el-table :data="balanceSheet" border style="width: 100%" align="center">
                                            <el-table-column label="资产" prop="field_name" align="center">
                                            </el-table-column>
                                            <el-table-column label="期末余额" prop="endingCBalance" align="center">
                                                <template scope="scope">
                                                    <el-input v-if="scope.row.id != ''" v-model="scope.row.endingCBalance" placeholder="">{{ scope.row.endingCBalance }}</el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="年初余额" prop="beginningCBalance" align="center">
                                                <template scope="scope">
                                                    <el-input v-if="scope.row.id != ''" v-model="scope.row.beginningCBalance" placeholder="">{{ scope.row.beginningCBalance }}</el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="负债和所有者权益" prop="_field_name" align="center">
                                            </el-table-column>
                                            <el-table-column label="期末余额" prop="endingDBalance" align="center">
                                                <template scope="scope">
                                                    <el-input v-if="scope.row._id != ''" v-model="scope.row.endingDBalance" placeholder="">{{ scope.row.endingDBalance }}</el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="年初余额" prop="beginningDBalance" align="center">
                                                <template scope="scope">
                                                    <el-input v-if="scope.row._id != ''" v-model="scope.row.beginningDBalance" placeholder="">{{ scope.row.beginningDBalance }}</el-input>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="利润表" name="second">
                        <el-table :data="incomeStatement" border style="width: 100%" align="center">
                            <el-table-column label="项目" prop="project" align="center">
                            </el-table-column>
                            <el-table-column label="本月金额" prop="monthCounts" align="center">
                                <template scope="scope">
                                    <el-input v-model="scope.row.monthCounts" placeholder="">{{ scope.row.monthCounts }}</el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="本年累计金额" prop="yearCounts" align="center">
                                <template scope="scope">
                                    <el-input v-model="scope.row.yearCounts" placeholder="">{{ scope.row.yearCounts }}</el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="现金流量表" name="third">
                        <el-table :data="cashFlowStatements" border style="width: 100%" align="center">
                            <el-table-column label="项目" prop="project" align="center">
                            </el-table-column>
                            <el-table-column label="本月金额" prop="monthCounts" align="center">
                                <template scope="scope">
                                    <el-input v-model="scope.row.monthCounts" placeholder="">{{ scope.row.monthCounts }}</el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="本年累计金额" prop="yearCounts" align="center">
                                <template scope="scope">
                                    <el-input v-model="scope.row.yearCounts" placeholder="">{{ scope.row.yearCounts }}</el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="financialModal2 = false">取 消</el-button>
                    <el-button type="danger" @click="financialEdit">保 存</el-button>
                </div>
            </el-dialog>
            <delete-reminders :deleteReminders="financialDelete" :message="financialMessage" :modal_loading="modal_loading" @del="financialDelete=false" @cancel="financialDelete=false">
            </delete-reminders>
        </div>
    </div>
</template>

<script >
import deleteReminders from 'components/deleteReminders'
import 'common/js/filter'
import { changeDate } from 'common/js/config'
import { getDataSubjectList, saveDataSubject, updDataSubject, getDataSubjectDetail, getDataFormBody, fillDataForm, transform
} from 'api/projectAfter';
export default {
    props: {
        projectId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            userName: JSON.parse(sessionStorage.getItem('userInfor')).name, //当前用户
            currentDeta: changeDate(new Date()), //当前日期
            f_show: true,
            s_show: false,
            operatingDelete: false,
            financialDelete: false,
            operatingMessage: '是否确认删除该条经营数据？',
            financialMessage: '是否确认删除该条财务数据？',
            operatingModal1: false,
            operatingModal2: false,
            financialModal1: false,
            financialModal2: false,
            formLabelWidth: '100px',
            file: null,
            loadingStatus: false,
            activeName: 'first',
            // 经营数据表头
            operatingData: [
                {
                    baseDate: '2017-1-1',
                    dataType: '半年报',
                    operatorName: '张三',
                    currentDeta: '2017-10-11',
                },
                {
                    baseDate: '2017-9-1',
                    dataType: '月报',
                    operatorName: '李四',
                    currentDeta: '2017-10-12',
                }
            ],
            // 经营数据-添加 表单
            operatingForm1: {
                baseDate: '',
                dataType: '',
                informant: '',
                date: '',
                remark: '',
                appendix: ''
            },
            rules1: {
                baseDate: [
                    { type: 'date', required: true, message: '请选择基准日', trigger: 'change' }
                ],
                sort: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ]
            },
            sortOptions: [
                { //数据类型列表
                    key: 1,
                    value: '年报'
                }, {
                    key: 2,
                    value: '半年报'
                }, {
                    key: 3,
                    value: '季报'
                }, {
                    key: 4,
                    value: '月报'
                }
            ],
            // 经营数据-添加数据 table
            operatingData1: [
                {
                    project: '营业收入',
                    operatingGoal: '',
                    realSituation: '',
                    completionRate: '',
                    secondPlan: ''
                },
                {
                    project: '净利润',
                    operatingGoal: '',
                    realSituation: '',
                    completionRate: '',
                    secondPlan: ''
                },
                {
                    project: '总资产',
                    operatingGoal: '',
                    realSituation: '',
                    completionRate: '',
                    secondPlan: ''
                },
                {
                    project: '净资产',
                    operatingGoal: '',
                    realSituation: '',
                    completionRate: '',
                    secondPlan: ''
                },
                {
                    project: '用户数',
                    operatingGoal: '',
                    realSituation: '',
                    completionRate: '',
                    secondPlan: ''
                },
                {
                    project: '活跃用户数',
                    operatingGoal: '',
                    realSituation: '',
                    completionRate: '',
                    secondPlan: ''
                },
                {
                    project: '其他',
                    operatingGoal: '',
                    realSituation: '',
                    completionRate: '',
                    secondPlan: ''
                }
            ],
            //  财务数据
            financialData: [
                {
                    baseDate: '2017-1-1',
                    dataType: '半年报',
                    operatorName: '张三',
                    currentDeta: '2017-10-11',
                },
                {
                    baseDate: '2017-9-1',
                    dataType: '月报',
                    operatorName: '李四',
                    currentDeta: '2017-10-12',
                }
            ],
            // 财务数据-添加 表单
            financialForm1: {
                baseDate: '',
                dataType: '',
                informant: '',
                date: '',
                remark: '',
                appendix: ''
            },
            rules2: {
                baseDate: [
                    { type: 'date', required: true, message: '请选择基准日', trigger: 'change' }
                ],
                sort: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ]
            },
            // 财务数据-添加数据  资产负债表
            balanceSheet: [
                // {
                //     capital: '流动资产：',
                //     endingCBalance: '',
                //     beginningCBalance: '',
                //     debt: '流动负债：',
                //     endingDBalance: '',
                //     beginningDBalance: ''
                // },
                // {
                //     capital: '货币资金',
                //     endingCBalance: '',
                //     beginningCBalance: '',
                //     debt: '短期借款',
                //     endingDBalance: '',
                //     beginningDBalance: ''
                // },
                // {
                //     capital: '短期投资',
                //     endingCBalance: '',
                //     beginningCBalance: '',
                //     debt: '应付票据',
                //     endingDBalance: '',
                //     beginningDBalance: ''
                // }, {
                //     capital: '应收票据',
                //     endingCBalance: '',
                //     beginningCBalance: '',
                //     debt: ' 应付账款',
                //     endingDBalance: '',
                //     beginningDBalance: ''
                // },
                // {
                //     capital: '应收账款',
                //     endingCBalance: '',
                //     beginningCBalance: '',
                //     debt: '预收账款',
                //     endingDBalance: '',
                //     beginningDBalance: ''
                // },
                // {
                //     capital: '预付账款',
                //     endingCBalance: '',
                //     beginningCBalance: '',
                //     debt: '应付职工薪酬',
                //     endingDBalance: '',
                //     beginningDBalance: ''
                // }
                // ,
                // {
                //     capital: '应收股利',
                //     endingCBalance: '',
                //     beginningCBalance: '',
                //     debt: ' 应交税费',
                //     endingDBalance: '',
                //     beginningDBalance: ''
                // }, {
                //     capital: '应收利息',
                //     endingCBalance: '',
                //     beginningCBalance: '',
                //     debt: '应付利息',
                //     endingDBalance: '',
                //     beginningDBalance: ''
                // },
                // {
                //     capital: '其他应收款',
                //     endingCBalance: '',
                //     beginningCBalance: '',
                //     debt: '应付利润',
                //     endingDBalance: '',
                //     beginningDBalance: ''
                // },
                // {
                //     capital: '存货',
                //     endingCBalance: '',
                //     beginningCBalance: '',
                //     debt: '其他应付款',
                //     endingDBalance: '',
                //     beginningDBalance: ''
                // }
            ],
            // 财务数据-添加数据  利润表
            incomeStatement: [
                {
                    project: '一、营业收入',
                    monthCounts: '',
                    yearCounts: ''
                }
            ],
            // 财务数据-添加数据  现金流量表
            cashFlowStatements: [
                {
                    project: '一、经营活动产生的现金流量：',
                    monthCounts: '',
                    yearCounts: ''
                }
            ],
            list: [
                {
                    filed: '营业收入1',
                    users1: '',
                    users2: ''
                }, {
                    filed: '营业收入2',
                    users1: '',
                    users2: ''
                }, {
                    filed: '营业收入2',
                    users1: '',
                    users2: ''
                }, {
                    filed: '营业收入2',
                    users1: '',
                    users2: ''
                }, {
                    filed: '营业收入2',
                    users1: '',
                    users2: ''
                },
            ]
        }
    },
    created() {
        this.init();
    },
    watch: {
        '$route'(to, from) {
            this.init();
        }
    },
    methods: {
        init() {
            //获取经营数据主体
            this.getOperateSubject();
            //获取财务数据主体
            this.getFinancialSubject();
        },
        // transform(){
        //     let _operations = [
        //         {
        //             id: '05fbc5fd646f4e24b33c1c898b65fe41',
        //             field_name: '支付其他与经营活动有关的现金',
        //             location: '1-1',
        //             simple_value: '',
        //             complex_value: '',
        //             value1: '',
        //             value2: ''
        //         },
        //         {
        //             id: '232f675e07e34b568957e5779556f05c',
        //             field_name: '偿还借款利息支付的现金',
        //             location: '1-2',
        //             simple_value: '',
        //             complex_value: '',
        //             value1: '',
        //             value2: ''
        //         },
        //         {
        //             id: '3f608bfab7824be882cbd5bba567f7a7',
        //             field_name: '偿还借款本金支付的现金',
        //             location: '2-1',
        //             simple_value: '',
        //             complex_value: '',
        //             value1: '',
        //             value2: ''
        //         },
        //         {
        //             id: '48419576a58741a4a594a81e124534f9',
        //             field_name: '销售产成品、商品、提供劳务收到的现金',
        //             location: '3-1',
        //             simple_value: '',
        //             complex_value: '',
        //             value1: '',
        //             value2: ''
        //         },
        //         {
        //             id: '6a47e0408f064a6f843c7c9d30905b2c',
        //             field_name: '支付的税费',
        //             location: '4-1',
        //             simple_value: '',
        //             complex_value: '',
        //             value1: '',
        //             value2: ''
        //         },
        //         {
        //             id: '788976896af748ba9ddbf04bf2b198eb',
        //             field_name: '五、期末现金余额',
        //             location: '4-2',
        //             simple_value: '',
        //             complex_value: '',
        //             value1: '',
        //             value2: ''
        //         }
        //     ];
        //     transform(_operations);
        // },
        //获取经营数据主体
        getOperateSubject() {
            getDataSubjectList(this.projectId, 0).then(resp => {
                if (resp.data.status == '200') {
                    this.operatingData = resp.data.result;
                } else if (resp.data.status == '49999') {
                    this.operatingData = [];
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('getFee() exists error: ', e);
            })
        },
        //获取财务数据主体
        getFinancialSubject() {
            getDataSubjectList(this.projectId, 1).then(resp => {
                if (resp.data.status == '200') {
                    this.financialData = resp.data.result;
                } else if (resp.data.status == '49999') {
                    this.financialData = [];
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('getFee() exists error: ', e);
            })
        },
        //打开添加数据明细表单
        goAddData(subjectId, dataType) {

            getDataFormBody(subjectId).then(resp => {
                // console.log("打开数据明细表单 结果："+JSON.stringify(resp.data));
                if (resp.data.status == '200') {
                    let formBody = resp.data.result.dataInfos;
                    //填充表单
                    for(var idx = 0; idx < formBody.length; idx ++){
                        var _dataType = formBody[idx].dataInfo.dataType;

                        if(_dataType == 1){
                            //填充经营数据表单
                            this.fillOperateSheet(formBody[idx].operations);
                        }else if(_dataType == 2){
                            //填充资产负债表单
                            //
                            // console.log("打开数据明细表单 结果："+JSON.stringify(formBody[idx].operations));
                            this.balanceSheet = transform(formBody[idx].operations);
                        }else if(_dataType == 3){
                            //填充现金流量表单
                            this.fillCashFlowStatements(formBody[idx].operations);
                        }else if(_dataType == 4){
                            //填充利润表单
                            this.fillIncomeStatement(formBody[idx].operations);
                        }
                    }

                    if(dataType == '1'){
                        this.operatingModal2 = true;
                    }else{
                        this.financialModal2 =true;
                    }

                }else{
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('getFee() exists error: ', e);
            })
            if (dataType == '1') {
                this.operatingModal2 = true;
            } else {
                this.financialModal2 = true;
            }

        },
        //填充经营数据表单
        fillOperateSheet() {
            // 
        },
        //填充资产负债表单
        fillBalanceSheet() {
            
        },
        //填充现金流量表单
        fillCashFlowStatements(formBody) {
            // 
            this.cashFlowStatements = formBody;
        },
        //填充利润表单
        fillIncomeStatement() {
            // 
        },
        // 切换 经营/财务 的显示隐藏
        changeData1() {
            this.f_show = true;
            this.s_show = false;
        },
        changeData2() {
            this.f_show = false;
            this.s_show = true;
        },
        // 切换 两种数据的添加
        addData() {
            if (this.f_show) {
                this.operatingModal1 = true;
            } else {
                this.financialModal1 = true;
            }
        },
        // 数据表头-添加  保存按钮的方法
        saveSubject(formName, dataType) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let dataForm = dataType == '1' ? this.operatingForm1 : this.financialForm1;
                    let data = {
                        projectId: this.projectId,
                        baseDate: changeDate(dataForm.baseDate),
                        dataType: dataForm.dataType,
                        operator: JSON.parse(sessionStorage.getItem('userInfor')).id,
                        currentDeta: changeDate(new Date()),
                        operatorName: this.userName,
                        remark: dataForm.remark,
                        dataCat: dataType == '1' ? 0 : 1
                    };
                    saveDataSubject(data).then(resp => {
                        console.log("添加数据表头 结果：" + JSON.stringify(resp.data));
                        if (resp.data.status == '200') {
                            if (dataType == '1') {
                                this.operatingForm1 = { baseDate: '', dataType: '' };
                                this.getOperateSubject();
                                this.operatingModal1 = false;
                            } else {
                                this.financialForm1 = { baseDate: '', dataType: '' };
                                this.getFinancialSubject();
                                this.financialModal1 = false;
                            }
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    }).catch(e => {
                        console.log('getFee() exists error: ', e);
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 经营数据-添加数据 保存按钮的方法
        operatingEdit() {
            this.operatingModal2 = false;
            // console.log(this.operatingData1);
        },
        // 财务数据-添加数据 的方法
        financialEdit() {
            this.financialModal2 = false;
        },

        // 添加资产负债表数据 的方法
        balanceAdd() {
            this.balanceSheet.push(this.balanceForm);
            this.balanceForm = {};
            this.balanceModal = false;
        },
        // 添加利润表数据 的方法
        incomeAdd() {
            this.incomeStatement.push(this.incomeForm);
            this.incomeForm = {};
            this.incomeModal = false;
        },
        // 添加现金流量表数据 的方法
        cashFlowAdd() {
            this.cashFlowStatements.push(this.cashFlowForm);
            this.cashFlowForm = {};
            this.cashFlowModal = false;
        },

        checkEdit(index, row) { //编辑
            row.editFlag = !row.editFlag;
        },
        // 删除当前行
        handleDelete(index, rows) {
            rows.splice(index, 1);
        },
        // 上传附件的方法
        handleUpload(file) {
            this.file = file;
            return false;
        },
        upload() {
            this.loadingStatus = true;
            setTimeout(() => {
                this.file = null;
                this.loadingStatus = false;
                this.$Message.success('上传成功')
            }, 1500);
        },
    },
    components: {
        deleteReminders
    }
}
</script>



<style lang="less" scoped>
.table {
    .topBtn {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        .leftBtn {
            margin-right: 15px;
        }
    }
}

.active {
    background: #dfe6ec;
}

.s_data {
    .importModal {
        display: flex;
        justify-content: flex-end;
        .upload-demo {
            margin-right: 10px;
        }
        .downBtn {
            height: 41px;
            border-color: #bbbec4;
            &:hover {
                border-color: #20a0ff;
            }
        }
    }
    .title_f {
        margin: 10px 0;
        width: 100%;
        height: 42px;
        display: flex;
        align-items: center;
        background:#eef1f6;
        border: 1px solid #dfe6ec;
        .desc {
            flex: 1;
            text-align: center;
            span {
                color:#1f2d3d;
                font-weight: 700;
            }
        }
    }
}
</style>
