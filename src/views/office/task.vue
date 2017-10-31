<template>
    <section>
        <!-- 任务页菜单内容 -->
        <div class="Task">
            <!-- 任务页 Tab -->
            <Tabs @on-click="getTaskList">
                <Tab-pane :name="1" label="指派任务">
                    <!-- <Table border :columns="columns1" :data="data1" align="center"></Table> -->
                    <Table border :data="data1" :columns="columns1" stripe></Table>
                    <div style="margin: 10px;overflow: hidden">
                        <div class="pagination">
                            <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="page" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="page1.total">
                            </el-pagination>
                        </div>
                    </div>
                </Tab-pane>
                <Tab-pane :name="2" label="待办任务">
                    <Table border :data="data2" :columns="columns2" stripe></Table>
                    <div style="margin: 10px;overflow: hidden">
                        <div class="pagination">
                            <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="page2.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page2.total">
                            </el-pagination>
                        </div>
                    </div>
                </Tab-pane>
                <Tab-pane :name="3" label="已办任务">
                    <Table border :data="data3" :columns="columns3" stripe></Table>
                    <div style="margin: 10px;overflow: hidden">
                        <div class="pagination">
                            <el-pagination @size-change="handleSizeChange3" @current-change="handleCurrentChange3" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="page3.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page3.total">
                            </el-pagination>
                        </div>
                    </div>
                </Tab-pane>
            </Tabs>
            <!-- Modal1 -->
            <Modal v-model="modal1" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>删除确认</span>
                </p>
                <div style="text-align:center">
                    <p>此操作将会永久删除当前任务</p>
                    <p>是否继续删除？</p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long :loading="modal_loading1" @click="del1">删除</Button>
                </div>
            </Modal>
            <!-- Modal1  -->
            <!-- Modal3 -->
            <Modal v-model="modal3" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>删除确认</span>
                </p>
                <div style="text-align:center">
                    <p>此操作将会永久删除当前任务</p>
                    <p>是否继续删除？</p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long :loading="modal_loading3" @click="del3">删除</Button>
                </div>
            </Modal>
            <!-- Modal3  -->
            <!-- 添加任务 btn -->
            <el-button v-show="isAddTask" type="danger" size="small" @click="addTaskBtn()">
                <span>添加任务</span>
            </el-button>
            <!-- 指派任务-添加任务 diglog -->
            <el-dialog title="添加指派任务" :visible.sync="dialogFormVisible1">
                <el-form :rules="rules1" :label-position="labelPosition" :model="addTaskForm1" ref="addTaskForm1">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item prop="taskName" label="任务名称" :label-width="formLabelWidth">
                                <el-input v-model="addTaskForm1.taskName" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item prop="createDate" label="开始时间" :label-width="formLabelWidth">
                                <el-input :disabled="true" v-model="addTaskForm1.createDate" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item prop="endTime" label="完成时间" :label-width="formLabelWidth">
                                <el-date-picker :picker-options="pickerOptions0" @change="getDateValue" v-model="addTaskForm1.endTime" type="datetime" auto-complete="off" placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item prop="receiveUserName" label="接收人" :label-width="formLabelWidth">
                                <el-select @change="getReceiveUserId" v-model="addTaskForm1.receiveUserName" filterable placeholder="请选择">
                                    <el-option @click="getItem(item)" v-for="item in userOptions" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="seedUserName" label="指派人" :label-width="formLabelWidth">
                                <el-input :disabled="true" v-model="addTaskForm1.seedUserName" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item prop="taskInfo" label="任务说明" :label-width="formLabelWidth">
                                <el-input v-model="addTaskForm1.taskInfo" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- <el-row :gutter="20">
                                                    <el-col :span="24">
                                                        <el-form-item prop="recording" label="处理记录" :label-width="formLabelWidth">
                                                            <el-input v-model="addTaskForm1.recording" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                                                            </el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row> -->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible1 = 0">取 消</el-button>
                    <el-button type="danger" @click="saveForm(1,'addTaskForm1')">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 指派任务-查看任务 diglog -->
            <el-dialog title="查看指派任务" :visible.sync="viewDialog1">
                <el-form :label-position="labelPosition" :model="viewTaskForm1" ref="addTaskForm1">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item porp="taskName" label="任务名称" :label-width="formLabelWidth">
                                <el-input v-model="viewTaskForm1.taskName" class="el_input" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item porp="createDate" label="开始时间" :label-width="formLabelWidth">
                                <el-input v-model="viewTaskForm1.createDate" class="el_input" disabled></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item porp="endTime" label="完成时间" :label-width="formLabelWidth">
                                <el-input v-model="viewTaskForm1.endTime" class="el_input" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item porp="receiveUserName" label="接收人" :label-width="formLabelWidth">
                                <el-input v-model="viewTaskForm1.receiveUserName" class="el_input" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item porp="seedUserName" label="指派人" :label-width="formLabelWidth">
                                <el-input v-model="viewTaskForm1.seedUserName" class="el_input" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item porp="taskInfo" label="任务说明" :label-width="formLabelWidth">
                                <el-input v-model="viewTaskForm1.taskInfo" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" disabled>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item porp="recording" label="处理记录" :label-width="formLabelWidth">
                                <el-input v-model="addTaskForm1.recording" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" disabled>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
            <!-- 待办任务-处理 dialog-->
            <el-dialog title="处理待办任务" :visible.sync="dialogFormVisible2">
                <el-form :label-position="labelPosition" :model="form1" :rules="rules2" ref="form1">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="任务名称" prop="taskName" :label-width="formLabelWidth">
                                <el-input :disabled="true" v-model="form1.taskName" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="开始时间" prop="startDate" :label-width="formLabelWidth">
                                <el-input :disabled="true" v-model="form1.startDate" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="完成时间" prop="switchDate" :label-width="formLabelWidth">
                                <el-date-picker :disabled="true" v-model="form1.switchDate" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions0">
                                </el-date-picker>
                                <!-- <el-input v-model="form1.switchDate" class="el_input" auto-complete="off"></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="接收人" prop="peopele1" :label-width="formLabelWidth">
                                <el-input :disabled="true" v-model="form1.peopele1" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="指派人" prop="peopele1_1" :label-width="formLabelWidth">
                                <el-input :disabled="true" v-model="form1.peopele1_1" class="el_input" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="任务说明" prop="textContent" :label-width="formLabelWidth">
                                <el-input :disabled="true" v-model="form1.textContent" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="处理记录" prop="recording" :label-width="formLabelWidth">
                                <el-input :disabled="true" v-model="form1.recording" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-form-item label="任务进展" prop="radio" :label-width="formLabelWidth">
                                    <el-radio class="radio" v-model="form1.radio" label="0">处理中</el-radio>
                                    <el-radio class="radio" v-model="form1.radio" label="1" @change="radios(radio)">已完成</el-radio>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-form-item label="汇报内容" prop="reportContent" :label-width="formLabelWidth">
                                    <el-input v-model="form1.reportContent" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="tableCancle">取 消</el-button>
                    <el-button type="danger" @click="addTaskRecord(2)">提 交</el-button>
                </div>
            </el-dialog>
            <!--已办任务-查看 dialog-->
            <el-dialog title="查看已办任务" :visible.sync="doneDialog">
                <el-form :label-position="labelPosition" :model="doneTaskForm1">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item prop="taskName" label="任务名称" :label-width="formLabelWidth">
                                <el-input v-model="doneTaskForm1.taskName" class="el_input" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item prop="createDate" label="开始时间" :label-width="formLabelWidth">
                                <el-input v-model="doneTaskForm1.createDate" class="el_input" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="endTime" label="完成时间" :label-width="formLabelWidth">
                                <el-input v-model="doneTaskForm1.endTime" class="el_input" disabled>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item prop="receiveUserName" label="接收人" :label-width="formLabelWidth">
                                <el-input v-model="doneTaskForm1.receiveUserName" class="el_input" disabled>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="seedUserName" label="指派人" :label-width="formLabelWidth">
                                <el-input v-model="doneTaskForm1.seedUserName" class="el_input" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item prop="taskInfo" label="任务说明" :label-width="formLabelWidth">
                                <el-input v-model="doneTaskForm1.taskInfo" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" disabled>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item prop="recording" label="处理记录" :label-width="formLabelWidth">
                                <el-input v-model="doneTaskForm1.recording" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" disabled>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>

            <!-- 指派任务 dialog-->
            <!-- <el-dialog title="添加任务" :visible.sync="dialogFormVisible3" class="taskDialog_title">
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
                                                                                                                                                                                                                        </el-dialog> -->
            <div>
            </div>
        </div>
    </section>
</template>

<style lang="less" scoped>
section {
    position: relative;
    >div {
        min-height: 100%;
        background: #fff;
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
            // alert(666);
            this.$store.state.login.merchants = JSON.parse(sessionStorage.getItem('merchants')) || {};
            this.$store.state.login.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
            // console.log(this.$store.state.login.userInfor.id);
            // console.log(JSON.parse(sessionStorage.getItem('merchants'))[0].id);
            return this.$store.state.login.userInfor.id;
        },
    },
    created() {
        this.getTaskList1(this.page, this.pageSize);
    },

    data() {
        return {
            pages1: 1, //当前页码
            pages2: 1, //当前页码
            pages3: 1, //当前页码
            pageSizes1: 10, //每页条数
            pageSizes2: 10, //每页条数
            pageSizes3: 10, //每页条数
            arr: [],
            arr1: '',
            params1: '',
            params3: '',
            modal1: false,
            modal3: false,
            modal_loading1: false,
            modal_loading3: false,
            value8: '',
            isAddTask: true,
            taskState: {//任务状态
                start1: '未完成',
                start2: '已完成',
            },
            // radio: '1',
            value1: '',//完成时间的值
            labelPosition: "left",
            dialogFormVisible1: false, //指派任务-添加任务Diglog
            viewDialog1: false, //指派任务-查看任务Diglog
            dialogFormVisible2: false,
            dialogFormVisible3: false,
            doneDialog: false, //已办任务-查看任务 dialog
            formLabelWidth: '80px',
            userOptions: [], //企业用户列表
            addTaskForm1: { //添加任务表单
                createDate: '', //指派时间
                taskName: '', //任务名称
                receiveUserName: '', //接收人
                seedUserName: this.$store.state.login.userInfor.name, //指派人
                endTime: '', //完成时间
                taskState: '', //任务状态
                taskInfo: '', //任务说明
                recording: '',
                receiveUserId: '' //处理记录
            },
            viewTaskForm1: { //指派任务-查看任务表单
                createDate: '', //指派时间
                taskName: '', //任务名称
                receiveUserName: '', //接收人
                seedUserName: this.$store.state.login.userInfor.name, //指派人
                endTime: '', //完成时间
                taskState: '', //任务状态
                taskInfo: '', //任务说明
                recording: '',
                receiveUserId: '' //处理记录
            },
            rules1: {
                taskName: [
                    { required: true, message: '请输入任务名称', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                createDate: [
                    { required: true, message: '请输入开始时间', trigger: 'blur' },
                    // { min: 1, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                endTime: [
                    { required: true, message: '请输入完成时间', trigger: 'blur' },
                    // { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                receiveUserName: [
                    { required: true, message: '请输入接收人', trigger: 'blur' },
                    // { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                seedUserName: [
                    { required: true, message: '请输入指派人', trigger: 'blur' },
                    // { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                taskInfo: [
                    { required: true, message: '请输入任务说明', trigger: 'blur' },
                    { min: 3, max: 500, message: '长度在 3 到 500 个字符', trigger: 'blur' }
                ],
                recording: [
                    { required: true, message: '请输入处理记录', trigger: 'blur' },
                    { min: 3, max: 500, message: '长度在 3 到 500 个字符', trigger: 'blur' }
                ],
            },
            form1: {
                taskId: '', //taskId
                radio: '0', //任务进展
                taskName: '', //任务名称
                startDate: this.getDate(), //开始时间
                switchDate: '', //完成时间
                peopele1: '', //接收人
                peopele1_1: this.$store.state.login.userInfor.name, //指派人
                textContent: '', //任务说明
                recording: [], //处理记录
                reportContent: '' //汇报内容
            },
            doneTaskForm1: {  //已办任务-查看任务表单
                createDate: '', //指派时间
                taskName: '', //任务名称
                receiveUserName: '', //接收人
                seedUserName: this.$store.state.login.userInfor.name, //指派人
                endTime: '', //完成时间
                taskState: '', //任务状态
                taskInfo: '', //任务说明
                recording: '',
                receiveUserId: '' //处理记录
            },
            rules2: {
                radio: [
                    { required: true, message: '请选择任务进展', trigger: 'blur' }
                ],
                reportContent: [
                    { required: true, message: '请输入汇报内容', trigger: 'blur' }
                ]
            },
            taskInfo: {}, //任务详情
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
            data1: [],
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
                                    type: 'text',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    border: 'none'
                                },
                                on: {
                                    click: () => {
                                        this.viewTask1(params)
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                style: {
                                    border: 'none'
                                },
                                on: {
                                    click: () => {
                                        this.removeTask1(params)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data2: [],
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
                                    type: 'text',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    border: 'none'
                                },
                                on: {
                                    click: () => {
                                        this.show(params)
                                    }
                                }
                            }, '处理'),
                        ]);
                    }
                }
            ],
            data3: [],
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
                                    type: 'text',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    border: 'none'
                                },
                                on: {
                                    click: () => {
                                        this.showTask3(params)
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                style: {
                                    border: 'none'
                                },
                                on: {
                                    click: () => {
                                        this.removeTask3(params)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
        }
    },
    methods: {
        del1() { //删除指派任务
            this.modal_loading1 = true;
            this.closeTask(this.params1.row.id);
            setTimeout(() => {
                this.data1.splice(this.params1.index, 1);
                this.modal_loading1 = false;
                this.modal1 = false;
                this.$Message.success('删除成功');
            }, 2000);
        },
        del3() { //删除已办任务任务
            // alert(888);
            console.log(this.params3);
            this.modal_loading3 = true;
            this.closeTask(this.params3.row.id);
            setTimeout(() => {
                this.data3.splice(this.params3.index, 1);
                this.modal_loading3 = false;
                this.modal3 = false;
                this.$Message.success('删除成功');
            }, 2000);
        },
        viewTask1(params) { //查看指派任务详情
            console.log(params.row);
            this.viewDialog1 = true;
            this.viewTaskForm1.taskName = params.row.taskName;
            this.viewTaskForm1.createDate = params.row.createDate;
            this.viewTaskForm1.endTime = params.row.endTime;
            this.viewTaskForm1.receiveUserName = params.row.receiveUserName;
            this.viewTaskForm1.seedUserName = params.row.seedUserName;
            this.viewTaskForm1.taskInfo = params.row.taskInfo;
            this.viewTaskForm1.assistTaskRecords = params.row.assistTaskRecords;
            this.getTaskList4(params.row.id);
        },
        removeTask1(row) { //删除指派任务列表
            this.params1 = row;
            this.modal1 = true;
            console.log(row);
            // this.data1.splice(index, 1);
        },
        showTask3(params) { //查看已办任务详情
            this.doneTaskForm1.taskName = params.row.taskName;
            this.doneTaskForm1.createDate = params.row.createDate;
            this.doneTaskForm1.endTime = params.row.endTime;
            this.doneTaskForm1.receiveUserName = params.row.receiveUserName;
            this.doneTaskForm1.seedUserName = params.row.seedUserName;
            this.doneTaskForm1.taskInfo = params.row.taskInfo;
            this.doneDialog = true;
            this.getTaskList4(params.row.id);
        },
        removeTask3(row) { //删除已办任务列表
            // alert(555);
            console.log(row);
            this.modal3 = true;
            this.params3 = row;
            // this.data3.splice(index, 1);
        },
        tableCancle() { //关闭dialog fun
            // alert(1);
            this.dialogFormVisible2 = false;
            this.dialogFormVisible3 = false;
            this.form1.reportContent = '';
        },
        checkformVal(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        saveForm(val, formName) { //确定 fun
            // this.checkformVal(formName);
            if (val == 1) { //添加任务
                console.log(this.addTaskForm1);
                this.sendTaskData1();//发送添加任务数据
                // this.getTaskList1(1);
                this.dialogFormVisible1 = false;
                this.addTaskForm1 = {};
            } if (val == 2) { //代办任务
                this.dialogFormVisible2 = false;
            }
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
        addTaskBtn() { //添加任务
            this.getUserList();
            // this.getReceiveUserId();
            let new_addTaskForm1 = {
                createDate: '', //指派时间
                taskName: '', //任务名称
                receiveUserName: '', //接收人
                seedUserName: this.$store.state.login.userInfor.name, //指派人
                endTime: '', //完成时间
                taskState: '', //任务状态
                taskInfo: '', //任务说明
                recording: '', //处理记录
                receiveUserId: ''
            };
            this.addTaskForm1 = new_addTaskForm1;
            this.dialogFormVisible1 = true;
            let startDate = this.getDate();//获取当前系统时间
            this.addTaskForm1.createDate = startDate;
        },
        show(data) { //处理任务
            console.log(data.row);
            this.form1.reportContent = '';
            this.getTaskList4(data.row.id);
            this.dialogFormVisible2 = true;
        },
        saveTabValue(num) { //保存处理完的任务
            // alert();
            // console.log(this.form1.radio);
            // console.log(this.form1.reportContent);
            this.addTaskRecord();
            this.getTaskList2(this.page, this.pageSize);
            this.dialogFormVisible2 = false;
        },
        addTaskRecord() { //提交处理过的任务
        alert(2);
            this.$http.post(this.api + '/work/addTaskRecord', {
                "taskId": this.form1.taskId,
                "recordDetails": this.form1.reportContent,
                "disposeUserId": this.userId,
                "disposeResult": this.form1.radio,
            })
                .then(res => {
                    if (res.status == '200') {
                        // this.closeTask(this.form1.taskId);
                        this.data2 = [];
                        this.getTaskList2(this.page,this.pageSize);
                        this.dialogFormVisible2 = false;
                        this.$Message.success(res.data.message);
                    } else if (res.status == '403') {
                        this.$Message.error(res.data.message);
                    }
                })
                .catch(error => {
                    this.$Message.error('请求超时');
                });
        },
        closeTask(id) { //删除任务
            this.$http.post(this.api + '/work/closeTask', {
                id: id
            })
                .then(res => {
                    if (res.status == '200') {
                        this.getTaskList(num);
                        this.$Message.success(res.data.message);
                    } else if (res.status == '403') {
                        this.$Message.error(res.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getReceiveUserId(val) {
            // console.log(val);
            // console.log(val);
            this.addTaskForm1.receiveUserId = val;
            return val;
        },
        getDateValue(val) { //获取完成时间的值
            // console.log(val);
            this.addTaskForm1.endTime = val;
            return val;
        },
        getUserList() { //获取用户列表
            this.$http.post(this.api + '/user/queryUserList', {
                merchantId: this.$store.state.login.merchants[0].id
            })
                .then(res => {
                    if (res.status == '200') {
                        console.log(res);
                        this.userOptions = res.data.result;
                        return;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        handleEdit(index, data, num) { //获取当前行数据
            if (num == 2) { //is 代办任务 dialog
                this.dialogFormVisible2 = true;
            } if (num == 3) { //is 已办任务 dialog
                this.dialogFormVisible3 = true;
            }
        },
        /*******发送添加任务数据 Start************/
        sendTaskData1() {
            console.log(this.addTaskForm1);
            this.$http.post(this.api + '/work/addTask', {
                "taskName": this.addTaskForm1.taskName,
                "startTime": this.addTaskForm1.createDate,
                "endTime": this.addTaskForm1.endTime,
                "seedUserId": this.userId,
                "receiveUserId": this.addTaskForm1.receiveUserName,
                "merchantId": this.$store.state.login.merchants[0].id,
                "taskInfo": this.addTaskForm1.taskInfo,
            })
                .then(res => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {
                            console.log(res.data);
                            // this.form1.taskId = res.data.record.id;
                            this.form1.taskName = this.taskInfo.taskName; //任务名称
                            this.form1.startDate = this.taskInfo.createDate; //指派时间
                            this.form1.switchDate = this.taskInfo.endTime; //完成时间
                            this.form1.peopele1 = this.taskInfo.seedUserName; //指派人
                            this.form1.peopele1_1 = this.taskInfo.receiveUserName; //接收人
                            this.form1.textContent = this.taskInfo.taskInfo; //任务详情
                            this.getTaskList1(this.page, this.pageSize);
                        } else {
                            this.$Message.warning(res.data.message);
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error(res.data.message);
                })
        },
        /*******发送添加任务数据 End************/
        handleCurrentChange1(page) { //获取tabList1 分页数据
            // this.page = '';
            this.pages1 = page;
            this.getTaskList1(this.pages1, this.pageSizes1);
        },
        handleCurrentChange2(page) { //获取tabList2 分页数据
            // this.page = '';
            this.pages2 = page;
            this.getTaskList2(this.pages2, this.pageSizes2);
        },
        handleCurrentChange3(page) { //获取tabList3 分页数据
            // console.log(pages);
            // this.page = '';
            this.page3s = page;
            this.getTaskList3(this.pages3, this.pageSizes3);
        },
        handleSizeChange1(pageSize) {
            // this.pageSize = '';
            this.pageSizes1 = pageSize;
            this.getTaskList1(this.pages1, this.pageSizes1);
        },
        handleSizeChange2(pageSize) {
            // this.pageSize = '';
            this.pageSizes2 = pageSize;
            this.getTaskList2(this.pages2, this.pageSizes2);
        },
        handleSizeChange3(pageSize) {
            // this.pageSize = '';
            this.pageSizes3 = pageSize;
            this.getTaskList3(this.pages3, this.pageSizes3);
        },
        getTaskList(tabs) { //获取任务列表数据
            if (tabs == '1') {
                this.isAddTask = true;
                this.pages1 = 1;
                this.pageSizes1 = 10;
                this.getTaskList1(tabs);
            } else if (tabs == '2') {
                this.isAddTask = false;
                this.pages2 = 1;
                this.pageSizes2 = 10;
                this.getTaskList2(tabs);
            } else if (tabs == '3') {
                this.isAddTask = false;
                this.pages3 = 1;
                this.pageSizes3 = 10;
                this.getTaskList3(tabs);
            }
        },
        getTaskList1(page, pageSize) { //获取指派任务列表数据
            this.$http.post(this.api + '/work/getTaskList', {
                "userId": this.userId,
                "type": 1,
                "page": page,
                "pageSize": pageSize,
                "merchantId": this.$store.state.login.merchants[0].id
            })
                .then(res => {
                    if (res.status == '200') {
                        console.log(res.data.result);
                        res.data.result.list.forEach((item, index) => {
                            if (item.taskState == '0') {
                                item.taskState = '处理中';
                            } else {
                                item.taskState = '已完成';
                            }
                        });
                        this.data1 = [];
                        this.data1 = res.data.result.list; //任务数据列表
                        this.page1.pageNum = res.data.result.pageNum; //当前页码
                        this.page1.total = res.data.result.total; //数据总数
                        this.page1.pageSize = res.data.result.pageSize; //每页条数
                        this.page1.navigatepageNums = res.data.result.navigatepageNums.length; //页数长度
                        if (res.data.status == '49999') { //数据为空
                            console.log(res.data.message);
                        }
                    } else if (res.status == '403') {
                        console.log(res.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getTaskList2(page, pageSize) { //获取代办任务列表数据
            this.$http.post(this.api + '/work/getTaskList', {
                "userId": this.userId,
                "type": 2,
                "page": page,
                "pageSize": pageSize,
                "merchantId": this.$store.state.login.merchants[0].id
            })
                .then(res => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {
                            console.log(res.data.result);
                            this.data2 = [];
                            this.data2 = res.data.result.list; //任务数据列表
                            this.page2.pageNum = res.data.result.pageNum; //当前页码
                            this.page2.total = res.data.result.total; //数据总数
                            this.page2.pageSize = res.data.result.pageSize; //每页条数
                            this.page2.navigatepageNums = res.data.result.navigatepageNums.length; //页数长度
                            this.$Message.success(res.data.message);
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error(error);
                })
        },
        getTaskList3(page, pageSize) { //获取已办任务列表数据
            this.$http.post(this.api + '/work/getTaskList', {
                "userId": this.userId,
                "type": 3,
                "page": page,
                "pageSize": pageSize,
                "merchantId": this.$store.state.login.merchants[0].id
            })
                .then(res => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {
                            console.log(res.data.result);
                            this.data3 = [];
                            this.data3 = res.data.result.list; //任务数据列表
                            this.page3.pageNum = res.data.result.pageNum; //当前页码
                            this.page3.total = res.data.result.total; //数据总数
                            this.page3.pageSize = res.data.result.pageSize; //每页条数
                            this.page3.navigatepageNums = res.data.result.navigatepageNums.length; //页数长度
                            this.$Message.warning(res.data.message);
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error('请求超时');
                })
        },
        getTaskList4(id) { //获取任务详情数据
            this.$http.post(this.api + '/work/getTaskRecord', {
                "id": id,
                "merchantId": this.$store.state.login.merchants[0].id
            })
                .then(res => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {
                            this.taskInfo = res.data.record; //任务数据列表
                            console.log(res.data);
                            this.form1.recording = '';
                            this.addTaskForm1.recording = '';
                            this.doneTaskForm1.recording = '';
                            let arr = [];
                            this.form1.recording = res.data.record.assistTaskRecords;
                            res.data.record.assistTaskRecords.forEach((ele, index) => {
                                arr.push(res.data.record.assistTaskRecords[index].recordDetails);
                                // this.form1.radio = ele.disposeResult; //任务详情
                            });
                            this.form1.recording = arr.join(',');
                            this.addTaskForm1.recording = arr.join(',');
                            this.doneTaskForm1.recording = arr.join(',');
                            console.log(this.form1.recording);
                            console.log(this.addTaskForm1.recording);
                            console.log(this.doneTaskForm1.recording);
                            this.form1.taskId = res.data.record.id;
                            this.form1.taskName = this.taskInfo.taskName; //任务名称
                            this.form1.startDate = this.taskInfo.createDate; //指派时间
                            this.form1.switchDate = this.taskInfo.endTime; //完成时间
                            this.form1.peopele1 = this.taskInfo.seedUserName; //指派人
                            this.form1.peopele1_1 = this.taskInfo.receiveUserName; //接收人
                            this.form1.textContent = this.taskInfo.taskInfo; //任务详情
                            // this.form1.radio = this.taskInfo.radio; //任务详情
                            this.$Message.success(res.data.message);
                        } else {
                            this.$Message.warning(res.data.message);
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error('请求超时');
                })
        },
    }
}

</script>
