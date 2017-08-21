<template>
    <section>
        <!-- 这是任务页内容 -->
        <div class="Task">
            <Tabs size="small">
                <Tab-pane label="指派任务">
                    <Table border :columns="columns1" :data="data1" align="center"></Table>
                </Tab-pane>
                <Tab-pane label="代办任务">代办任务</Tab-pane>
                <Tab-pane label="已办任务">已办任务</Tab-pane>
            </Tabs>
            <el-button type="text" @click="dialogFormVisibles">
                <span>添加任务</span>
            </el-button>
            <el-dialog title="添加任务" :visible.sync="dialogFormVisible" class="taskDialog_title">
                <el-form :label-position="labelPosition" :model="form">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="任务名称" :label-width="formLabelWidth">
                                <el-input v-model="form.taskName" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="12">
                                                    <el-form-item label="开始时间" :label-width="formLabelWidth">
                                                        <el-input v-model="form.name" class="el_input" auto-complete="off"></el-input>
                                                    </el-form-item>
                                                </el-col> -->
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="开始时间" :label-width="formLabelWidth">
                                <el-input v-model="form.startDate" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="完成时间" :label-width="formLabelWidth">
                                <el-date-picker v-model="form.switchDate" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions1">
                                </el-date-picker>
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
                                <el-input v-model="form.pople2" class="el_input" auto-complete="off"></el-input>
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
                <!-- <el-table :data="tableData" border style="width: 100%">
                                                <el-table-column prop="date" label="日期" width="180">
                                                </el-table-column>
                                                <el-table-column prop="name" label="姓名" width="180">
                                                    <template scope="scope">
                                                        <input type="text" v-model="scope.row.name">
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="address" label="地址">
                                                    <template scope="scope">
                                                        <input type="text" v-model="scope.row.address">
                                                    </template>
                                                </el-table-column>
                                            </el-table> -->
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="tabValue()">确 定</el-button>
                </div>
            </el-dialog>
            <div>

            </div>
        </div>

        <!-- <div v-show="dialogVisible" class="shadowBox">
                                <div>
                                    <div>
                                        <!-- Table -->
        <!-- <table cellspacing="0" border="1">
                                            <tr>
                                                <td colspan="4">添加任务</td>

                                            </tr>
                                            <tr>
                                                <td>任务名称</td>
                                                <td colspan="3">
                                                    <input>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td>开始时间</td>
                                                <td><input></td>
                                                <td>完成时间</td>
                                                <td><input></td>
                                            </tr>
                                            <tr>
                                                <td>任务说明</td>
                                                <td colspan="3"><input></td>
                                            </tr>
                                            <tr>
                                                <td>接收人</td>
                                                <td><input></td>
                                                <td>指派人</td>
                                                <td><input></td>
                                            </tr>
                                        </table>
                                        <el-button>保存</el-button>
                                        <el-button>取消</el-button>
                                    </div>
                                </div>
                            </div> -->
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
            labelPosition: "left",
            dialogFormVisible: false,
            dialogVisible: false,
            formLabelWidth: '68px',
            form: {
                taskName: '', //任务名称
                startDate: '', //开始时间
                switchDate: '', //完成时间
                pople1: '', //接收人
                pople2: '', //指派人
                textContent: '' //任务说明
            },
            columns1: [
                {
                    title: '指派时间',//1
                    key: 'startDate',
                    align: "center"
                },
                {
                    title: '任务名称',//2
                    key: 'taskName',
                    align: "center"
                },
                {
                    title: '接收人',//3
                    key: 'pople1',
                    align: "center"
                },
                {
                    title: '指派人',//4
                    key: 'pople2',
                    align: "center"
                },
                {
                    title: '完成时间',//5
                    key: 'switchDate',
                    align: "center"
                },
                {
                    title: '任务状态',//6
                    key: 'taskState',
                    align: "center"
                },
                {
                    title: '操作',//7
                    key: 'operating',
                    align: "center"
                }
            ],
            data1: [],
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

    methods: {
        tabValue() {
            // self = this,
            // this.form.forEach(function (item) {
            //     // console.log(this)
            //     // console.log(item.name);
            // });
            this.dialogFormVisible = false;
            // console.log(this.form);
            this.data1.push(this.form);
            this.form = new Object;
            for (var key in this.form) {
                delete this.form[key];
            }
            this.form.taskName = '';
            console.log(this.form);
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
        dialogFormVisibles() {
            this.dialogFormVisible = true;
            let startDate = this.getDate();//获取当前系统时间
            this.form.startDate = startDate;
        }
    }
}

</script>