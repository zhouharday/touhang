<template>
    <section>
        <!-- 任务页菜单内容 -->
        <div class="Task">
            <!-- 任务页 Tab -->
            <Tabs size="small" @on-click="getTaskList">
                <Tab-pane :name="1" label="指派任务">
                    <!-- <Table border :columns="columns1" :data="data1" align="center"></Table> -->
                    <Table border :data="data1" :columns="columns1" stripe></Table>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="page1.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="page1.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page1.total">
                            </el-pagination>
                        </div>
                    </div>
                </Tab-pane>
                <Tab-pane :name="2" label="代办任务">
                    <Table border :data="data2" :columns="columns2" stripe></Table>
                    <!-- <el-table :data="tableColumns2" style="width: 100%">
                                                                    <el-table-column prop="date" label="接受日期" align="center"></el-table-column>
                                                                    <el-table-column prop="name" label="任务名称" width="" align="center"></el-table-column>
                                                                    <el-table-column prop="peopele1" label="接收人" align="center"></el-table-column>
                                                                    <el-table-column prop="peopele2" label="指派人" align="center"></el-table-column>
                                                                    <el-table-column prop="doneDate" label="完成日期" align="center"></el-table-column>
                                                                    <el-table-column label="操作" align="center">
                                                                        <template scope="scope">
                                                                            <el-button type="text" @click="handleEdit(scope.$index, scope.row,2)">
                                                                                <span>处理</span>
                                                                            </el-button>

                                                                        </template>
                                                                    </el-table-column>
                                                                </el-table> -->
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="page2.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="page2.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page2.total">
                            </el-pagination>
                        </div>
                    </div>
                </Tab-pane>
                <Tab-pane :name="3" label="已办任务">
                    <Table border :data="data3" :columns="columns3" stripe></Table>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <el-pagination @size-change="handleSizeChange3" @current-change="handleCurrentChange3" :current-page="page3.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="page3.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page3.total">
                            </el-pagination>
                        </div>
                    </div>
                </Tab-pane>
            </Tabs>
            <!-- 添加任务 btn -->
            <el-button v-show="isAddTask" type="primary" @click="dialogFormVisibles">
                <span>添加任务</span>
            </el-button>
            <!-- 已办任务 diglog -->
            <el-dialog title="已办任务" :visible.sync="dialogFormVisible1">
                <el-form :label-position="labelPosition" :model="form1" ref="numberValidateForm">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="任务名称" :label-width="formLabelWidth">
                                <el-input v-model="form1.taskName" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="开始时间" :label-width="formLabelWidth">
                                <el-input v-model="form1.startDate" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="完成时间" :label-width="formLabelWidth">
                                <el-input v-model="form1.startDate" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="接收人" :label-width="formLabelWidth">
                                <el-input v-model="form1.peopele1" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="指派人" :label-width="formLabelWidth">
                                <el-input v-model="form1.peopele1_1" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="任务说明" :label-width="formLabelWidth">
                                <el-input v-model="form1.textContent" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="处理记录" :label-width="formLabelWidth">
                                <el-input v-model="form1.recording" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible1 = 0">取 消</el-button>
                    <el-button type="primary" @click="tabValue1(1)">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 代办任务 diglog -->
            <el-dialog title="待办任务" :visible.sync="dialogFormVisible2">
                <!-- <el-table :data="gridData">
                                                                                                                                            <el-table-column property="date" label="接受日期" width="150"></el-table-column>
                                                                                                                                            <el-table-column property="name" label="任务名称" width="200"></el-table-column>
                                                                                                                                            <el-table-column property="address" label="接收人"></el-table-column>
                                                                                                                                            <el-table-column property="address" label="指派人"></el-table-column>
                                                                                                                                            <el-table-column property="address" label="完成日期"></el-table-column>
                                                                                                                                            <el-table-column property="address" label=""></el-table-column>
                                                                                                                                        </el-table> -->
                <el-form :label-position="labelPosition" :model="form1" ref="numberValidateForm">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="任务名称" :label-width="formLabelWidth">
                                <el-input v-model="form1.taskName" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="开始时间" :label-width="formLabelWidth">
                                <el-input v-model="form1.startDate" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="完成时间" :label-width="formLabelWidth">
                                <el-input v-model="form1.startDate" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="接收人" :label-width="formLabelWidth">
                                <el-input v-model="form1.peopele1" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="指派人" :label-width="formLabelWidth">
                                <el-input v-model="form1.peopele1_1" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="任务说明" :label-width="formLabelWidth">
                                <el-input v-model="form1.textContent" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="处理记录" :label-width="formLabelWidth">
                                <el-input v-model="form1.recording" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-form-item label="任务进展" :label-width="formLabelWidth">
                                    <el-radio class="radio" v-model="form1.radio" label="1" @change="radios(radio)">处理中</el-radio>
                                    <el-radio class="radio" v-model="form1.radio" label="2">已完成</el-radio>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-form-item label="汇报内容" :label-width="formLabelWidth">
                                    <el-input v-model="form1.reportContent" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="tableCancle">取 消</el-button>
                    <el-button type="primary" @click="tabValue(2)">保 存</el-button>
                </div>
            </el-dialog>
            <!-- 指派任务 dialog-->
            <el-dialog title="添加任务" :visible.sync="dialogFormVisible3" class="taskDialog_title">
                <el-form :label-position="labelPosition" :model="form" ref="numberValidateForm">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="任务名称" :label-width="formLabelWidth">
                                <el-input v-model="form.taskName" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="开始时间" :label-width="formLabelWidth">
                                <el-input v-model="form.startDate" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="完成时间" :label-width="formLabelWidth">
                                <el-date-picker @change="getValue" format="yyyy-MM-dd HH-mm-ss" v-model="form.switchDate" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions1">
                                </el-date-picker>
                                <!-- <el-date-picker v-model="form.switchDate" type="datetime" placeholder="选择日期时间">
                                                                                                                                                                                                            </el-date-picker> -->
                                <!-- <Date-picker v-model="form.switchDate" type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="接收人" :label-width="formLabelWidth">
                                <el-input v-model="form.pople1" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="指派人" :label-width="formLabelWidth">
                                <el-input v-model="form.pople1_1" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="任务说明" :label-width="formLabelWidth">
                                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="form.textContent">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="tableCancle">取 消</el-button>
                    <el-button type="primary" @click="tabValue(1)">确 定</el-button>
                </div>
            </el-dialog>
            <div>
            </div>
        </div>
    </section>
</template>

<style lang="less" scoped>
section {
    >div {
        background: #fff;
        position: relative;
        padding: 24px;
        >button {
            position: absolute;
            top: 10px;
            right: 50px;
        }
    }
}

.taskDialog_title {
    .el-dialog {
        width: 880px;
    }
}

.shadowBox {
    position: fixed;
    left: 0;
    top: 0;
    opacity: 0.7;
    width: 100%;
    height: 100%;
    background: #000;
    >div {
        // position: relative;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        >div {
            // position: absolute;
            top: 50%;
            left: 50%; // right: 0;
            // bottom: 0;
            // margin: auto;
            color: #fff;
            >table {
                box-sizing: border-box;
                height: 315px; // border: 1px solid #fff;
                margin: 0 auto;
                transform: translateY(50%);
                >tr {
                    // height: 50px;
                    >td {
                        border: 1px solid;
                        text-align: center;
                        width: 200px; // height: 30px;
                        >input {
                            width: 100%;
                            height: 100%;
                            background: transparent;
                            border: none;
                            outline: none;
                            color: #fff;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
}
</style>

<script>
export default {
    computed: {
        userId(state) {
            // alert(111);
            this.$store.state.login.merchants = JSON.parse(sessionStorage.getItem('merchants')) || {};
            // console.log(this.$store.state.login.merchants[0].id);
            // console.log(this.$store.state.login.userInfor.id);
            return this.$store.state.login.userInfor.id;
        },
    },
    created() {
        this.getTaskList(1);
    },

    data() {
        return {
            isAddTask:true,
            taskState: {//任务状态
                start1: '未完成',
                start2: '已完成',
            },
            // radio: '1',
            value1: '',//完成时间的值
            labelPosition: "left",
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            dialogFormVisible3: false,
            formLabelWidth: '68px',
            form: {
                taskName: '', //任务名称
                startDate: '', //开始时间
                switchDate: '', //完成时间
                pople1: '', //接收人
                pople1_1: '', //指派人
                textContent: '' //任务说明
            },
            form1: {
                radio: '1', //任务进展
                taskName: '', //任务名称
                startDate: '', //开始时间
                switchDate: '', //完成时间
                peopele1: '', //接收人
                peopele1_1: '', //指派人
                textContent: '', //任务说明
                recording: '', //处理记录
                reportContent: '' //汇报内容
            },
            page1: {
                pageNum: '', //当前页码
                total: '', //数据总数
                pageSize: '', //每页条数
                navigatepageNums: '', //页数
                current: '', //当前页码
            },
            page2: {
                pageNum: '', //当前页码
                total: '', //数据总数
                pageSize: '', //每页条数
                navigatepageNums: '', //页数
                current: '', //当前页码
            },
            page3: {
                pageNum: '', //当前页码
                total: '', //数据总数
                pageSize: '', //每页条数
                navigatepageNums: '', //页数
                current: '', //当前页码
            },
            pickerOptions1: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            data1: [
                {
                    createDate: '',
                    taskName: '',
                    receiveUserName: '',
                    seedUserName: '',
                    endTime: '',
                    taskState: '',
                },
            ],
            columns1: [
                {
                    title: '指派时间',
                    key: 'createDate',
                    align: 'center'
                },
                {
                    title: '任务名称',
                    key: 'taskName',
                    align: "center"
                },
                {
                    title: '接收人',
                    key: 'receiveUserName',
                    align: "center"
                },
                {
                    title: '指派人',
                    key: 'seedUserName',
                    align: "center"
                },
                {
                    title: '完成时间',
                    key: 'endTime',
                    align: "center"
                },
                {
                    title: '任务状态',
                    key: 'taskState',
                    align: "center"
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
             data2: [
                {
                    createDate: '',
                    taskName: '',
                    receiveUserName: '',
                    seedUserName: '',
                    endTime: '',
                },
            ],
            columns2: [
                {
                    title: '接收日期',
                    key: 'createDate',
                    align: 'center'
                },
                {
                    title: '任务名称',
                    key: 'taskName',
                    align: "center"
                },
                {
                    title: '接收人',
                    key: 'receiveUserName',
                    align: "center"
                },
                {
                    title: '指派人',
                    key: 'seedUserName',
                    align: "center"
                },
                {
                    title: '完成日期',
                    key: 'endTime',
                    align: "center"
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        // this.show(params.index)
                                        alert(562);
                                    }
                                }
                            }, '处理'),
                        ]);
                    }
                }
            ],
            data3: [
                {
                    createDate: '',
                    taskName: '',
                    receiveUserName: '',
                    seedUserName: '',
                    endTime: '',
                },
            ],
            columns3: [
                {
                    title: '接收日期',
                    key: 'createDate',
                    align: 'center'
                },
                {
                    title: '任务名称',
                    key: 'taskName',
                    align: "center"
                },
                {
                    title: '接收人',
                    key: 'receiveUserName',
                    align: "center"
                },
                {
                    title: '指派人',
                    key: 'seedUserName',
                    align: "center"
                },
                {
                    title: '完成日期',
                    key: 'endTime',
                    align: "center"
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
        }
    },
    beforeCreate() {
    },
    methods: {
        show(index) {
            this.$Modal.info({
                title: '任务详情',
                content: `${this.data1[index].taskInfo}`
            })
        },
        remove(index) {
            this.data1.splice(index, 1);
        },
        show(index) {
            this.$Modal.info({
                title: '任务详情',
                content: `${this.data3[index].taskInfo}`
            })
        },
        remove(index) {
            this.data3.splice(index, 1);
        },
        tableCancle() { //关闭dialog fun
            this.dialogFormVisible2 = false;
            this.dialogFormVisible3 = false;
            this.resetFields()
        },
        tabValue1(val) { //确定 fun
            // let name = this.form.taskName;
            console.log(val);
            if (val == 1) { //添加任务
                this.data1.push({
                    taskName1: this.form.taskName,
                    // taskNames: name,
                    startDate1: this.form.startDate,
                    pople1: this.form.pople1,
                    switchDate1: this.value1,
                    taskState1: this.taskState.start1,
                    pople1_1: this.form.pople1_1
                });
                this.dialogFormVisible1 = false;
            } if (val == 2) { //代办任务
                this.dialogFormVisible2 = false;
            }
            this.resetFields();
        },
        changePage() { //分页方法

        },
        getDate() {//封装获取当前系统时间的方法
            // this.dialogFormVisible = true;
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
            return currentdate;
        },
        resetFields() { //重置表单数据
            this.form.taskName = '';
            this.form.startDate = '';
            this.form.pople1 = '';
            this.form.switchDate = '';
            this.form.taskState = '';
            this.form.pople1_1 = '';
            this.form.textContent1 = ''
        },
        dialogFormVisibles() { //添加任务
            this.form.taskName == '';
            this.dialogFormVisible1 = true;
            let startDate = this.getDate();//获取当前系统时间
            this.form.startDate = startDate;
        },
        getValue(val) { //获取完成时间的值
            // console.log(val);
            this.value1 = val;
        },
        handleEdit(index, data, num) { //获取当前行数据
            if (num == 2) { //is 代办任务 dialog
                this.dialogFormVisible2 = true;
            } if (num == 3) { //is 已办任务 dialog
                this.dialogFormVisible3 = true;
            }
            // console.log(index);
            // console.log(data);
            this.form1.taskName = data.name;
            this.form1.startDate = data.date;
            this.form1.switchDate = data.doneDate;
            this.form1.peopele1 = data.peopele1;
            this.form1.peopele1_1 = data.peopele2;
            this.form1.textContent = data; //任务说明
            this.form1.recording = data; //处理记录

        },
        changeTabs(val) {
            // alert(val);
            this.getTaskList(val);
        },
        handleCurrentChange1(pages) { //获取tabList1 分页数据
            console.log(pages);
            this.getTaskList1(pages);
        },
        handleCurrentChange2(pages) { //获取tabList2 分页数据
            console.log(pages);
            this.getTaskList2(pages);
        },
        handleCurrentChange3(pages) { //获取tabList3 分页数据
            console.log(pages);
            this.getTaskList3(pages);
        },
        getTaskList(tabs) {
            // alert(tabs);
            if (tabs == '1') {
                this.isAddTask = true;
                this.getTaskList1();
            } else if (tabs == '2') {
                this.isAddTask = false;
                this.getTaskList2();
            } else if (tabs == '3') {
                this.isAddTask = false;
                this.getTaskList3();
            }
        },
        getTaskList1(pages) {
            this.$http.post('/api/work/getTaskList', {
                "userId": this.userId,
                "type": 1,
                "page": pages,
                "pageSize": 10,
                "merchantId": this.$store.state.login.merchants[0].id
            })
                .then(res => {
                    if (res.status == '200') {
                        console.log(res.data.result);
                        this.data1 = res.data.result.list; //任务数据列表
                        this.page1.pageNum = res.data.result.pageNum; //当前页码 
                        this.page1.total = res.data.result.total; //数据总数 
                        this.page1.pageSize = res.data.result.pageSize; //每页条数 
                        this.page1.navigatepageNums = res.data.result.navigatepageNums.length; //页数长度 
                        if (res.data.status == '49999') {
                            console.log(res.data.message);
                        }
                    } else if (res.status == '403') {
                        alert(res.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getTaskList2(pages) {
            this.$http.post('/api/work/getTaskList', {
                "userId": this.userId,
                "type": 2,
                "page": pages,
                "pageSize": 10,
                "merchantId": this.$store.state.login.merchants[0].id
            })
                .then(res => {
                    if (res.status == '200') {
                        console.log(res.data.result);
                        this.data2 = res.data.result.list; //任务数据列表
                        this.page2.pageNum = res.data.result.pageNum; //当前页码 
                        this.page2.total = res.data.result.total; //数据总数 
                        this.page2.pageSize = res.data.result.pageSize; //每页条数 
                        this.page2.navigatepageNums = res.data.result.navigatepageNums.length; //页数长度 
                        if (res.data.status == '49999') {
                            console.log(res.data.message);
                        }
                    } else if (res.status == '403') {
                        alert(res.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getTaskList3(pages) {
            this.$http.post('/api/work/getTaskList', {
                "userId": this.userId,
                "type": 3,
                "page": pages,
                "pageSize": 10,
                "merchantId": this.$store.state.login.merchants[0].id
            })
                .then(res => {
                    if (res.status == '200') {
                        console.log(res.data.result);
                        this.data3 = res.data.result.list; //任务数据列表
                        this.page3.pageNum = res.data.result.pageNum; //当前页码 
                        this.page3.total = res.data.result.total; //数据总数 
                        this.page3.pageSize = res.data.result.pageSize; //每页条数 
                        this.page3.navigatepageNums = res.data.result.navigatepageNums.length; //页数长度 
                        if (res.data.status == '49999') {
                            console.log(res.data.message);
                        }
                    } else if (res.status == '403') {
                        alert(res.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },

    }
}

</script>
