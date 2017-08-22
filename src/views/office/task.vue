<template>
    <section>
        <!-- 这是任务页内容 -->
        <div class="Task">
            <Tabs size="small">
                <Tab-pane label="指派任务">
                    <!-- <Table border :columns="columns1" :data="data1" align="center"></Table> -->
                    <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="100" :current="1" @on-change="changePage"></Page>
                        </div>
                    </div>
                </Tab-pane>
                <Tab-pane label="代办任务">
                    <!-- <Table :data="tableData2" :columns="tableColumns2" stripe></Table> -->
                    <el-table :data="tableColumns2" style="width: 100%">
                        <el-table-column prop="date" label="接受日期" align="center"></el-table-column>
                        <el-table-column prop="name" label="任务名称" width="" align="center"></el-table-column>
                        <el-table-column prop="peoele1" label="接收人" align="center"></el-table-column>
                        <el-table-column prop="peoele2" label="指派人" align="center"></el-table-column>
                        <el-table-column prop="doneDate" label="完成日期" align="center"></el-table-column>
                        <el-table-column prop="caozuo" label="操作" align="center">
                            <template scope="scope">
                                <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">处理</el-button> -->
                                <el-button type="text" @click="handleEdit(scope.$index, scope.row)">
                                    <span>处理</span>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="100" :current="1" @on-change="changePage"></Page>
                        </div>
                    </div>
                </Tab-pane>

                <Tab-pane label="已办任务">已办任务</Tab-pane>
            </Tabs>
            <el-dialog title="代办任务" :visible.sync="dialogFormVisible2">
                <el-table :data="gridData">
                    <el-table-column property="date" label="日期" width="150"></el-table-column>
                    <el-table-column property="name" label="姓名" width="200"></el-table-column>
                    <el-table-column property="address" label="地址"></el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="tableCancle">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 指派任务-->
            <el-button type="text" @click="dialogFormVisibles">
                <span>添加任务</span>
            </el-button>
            <el-dialog title="添加任务" :visible.sync="dialogFormVisible" class="taskDialog_title">
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
                                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="form.textContent1">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="tableCancle">取 消</el-button>
                    <el-button type="primary" @click="tabValue('numberValidateForm')">确 定</el-button>
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
        >button {
            position: absolute;
            top: 0;
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
    data() {
        return {
            taskState: {//任务状态
                start1: '未完成',
                start2: '已完成',
            },
            value1: '',//完成时间的值
            labelPosition: "left",
            dialogFormVisible: false,
            dialogFormVisible2: false,
            formLabelWidth: '68px',
            form: {
                taskName: '', //任务名称
                startDate: '', //开始时间
                switchDate: '', //完成时间
                pople1: '', //接收人
                pople1_1: '', //指派人
                textContent1: '' //任务说明
            },
            tableColumns1: [
                {
                    title: '指派时间',//1
                    key: 'startDate1',
                    align: "center"
                },
                {
                    title: '任务名称',//2
                    key: 'taskName1',
                    align: "center"
                },
                {
                    title: '接收人',//3
                    key: 'pople1',
                    align: "center"
                },
                {
                    title: '指派人',//4
                    key: 'pople1_1',
                    align: "center"
                },
                {
                    title: '完成时间',//5
                    key: 'switchDate1',
                    align: "center"
                },
                {
                    title: '任务状态',//6
                    key: 'taskState1',
                    align: "center"
                }
            ],
            tableColumns2: [ //代办任务列表头数据
                {
                    date: '指派日期',//1
                    name: 'startDate2',
                    peoele1: "center",
                    peoele2: "center",
                    doneDate: "center",
                    caozuo: "center"
                },
                {
                    date: '指派日期',//1
                    name: 'startDate2',
                    peoele1: "center",
                    peoele2: "center",
                    doneDate: "center",
                    caozuo: "center"
                },
                // {
                //     title: '任务名称',//2
                //     key: 'taskName2',
                //     align: "center"
                // },
                // {
                //     title: '接收人',//3
                //     key: 'pople2',
                //     align: "center"
                // },
                // {
                //     title: '指派人',//4
                //     key: 'pople3',
                //     align: "center"
                // },
                // {
                //     title: '完成日期',//5
                //     key: 'switchDate2',
                //     align: "center"
                // },
                // {
                //     title: '操作',//6
                //     key: '',
                //     align: "center"
                // }
            ],
            tableData1: [],//指派任务数据列表
            tableData2: [],//代办任务数据列表
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
        };
    },
    beforeCreate() {
        // alert(1);
        // this.$http.post('/url', {}) //此处ajax,获取代办任务数据列表数据
        //     .then(function (response) {

        //     })
        //     .catch(function (error) {

        //     });
    },
    methods: {
        tableCancle() {

            this.dialogFormVisible2 = false;
            this.dialogFormVisible = false;
            this.resetFields()
        },
        tabValue(formName) { //确定
            // let name = this.form.taskName;
            // console.log(this.form);
            this.tableData1.push({
                taskName1: this.form.taskName,
                // taskNames: name,
                startDate1: this.form.startDate,
                pople1: this.form.pople1,
                switchDate1: this.value1,
                taskState1: this.taskState.start1,
                pople1_1: this.form.pople1_1
            });
            this.dialogFormVisible = false;
            this.resetFields();
        },
        changePage() {

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
            this.dialogFormVisible = true;
            let startDate = this.getDate();//获取当前系统时间
            this.form.startDate = startDate;
        },
        getValue(val) { //获取完成时间的值
            // console.log(val);
            this.value1 = val;
        },
        handleEdit(index, data) {

            this.dialogFormVisible2 = true;
            console.log(index, data);
        },
    }
}

</script>