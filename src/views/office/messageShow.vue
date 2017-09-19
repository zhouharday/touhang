<template>
    <section>
        <!-- 这是消息公告页内容 -->
        <div class="messageShow">
            <el-tabs type="border-card" @tab-click="tableDatasss">
                <!-- 公司公告 Tab -->
                <el-tab-pane value="1" label="公司公告">
                    <el-table stripe :data="tableData1" border style="width: 100%">
                        <el-table-column prop="noticeTitle" label="主题" align="center">
                        </el-table-column>
                        <el-table-column prop="seedUserName" label="发布人" align="center">
                        </el-table-column>
                        <el-table-column prop="createDate" label="发布日期" align="center">
                        </el-table-column>
                        <el-table-column prop="noticeStatus" label="状态" align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button v-show="scope.row.noticeStatus == '未发布'" @click="dialogFormVisible = true" type="text" size="small">编辑</el-button>
                                <el-button v-show="scope.row.noticeStatus == '未发布'" @click="releaseChange(scope.row)" type="text" size="small">发布</el-button>
                                <el-button v-show="scope.row.noticeStatus == '未发布'" @click.native.prevent="deleteRow(scope.$index, tableData1)" type="text" size="small">删除</el-button>
                                <el-button v-show="scope.row.noticeStatus == '已发布'" @click="lookAt(scope.row)" type="text" size="small">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="page1.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="page1.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page1.total">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <!-- 系统消息 Tab -->
                <el-tab-pane value="2" label="系统消息">
                    <el-table stripe :data="tableData2" border style="">
                        <el-table-column prop="title" label="主题" width="550" align="center">
                        </el-table-column>
                        <el-table-column prop="releasePeople" label="发布人" width="" align="center">
                        </el-table-column>
                        <el-table-column prop="releaseDate" label="时间" width="" align="center">
                        </el-table-column>
                        <el-table-column label="操作" width="" align="center">
                            <template scope="scope">
                                <!-- <el-button @click="remove" type="text" size="small">删除</el-button> -->
                                <el-button @click.native.prevent="deleteRow(scope.$index, tableData2)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="page2.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="page2.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page2.total">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <!-- 发布新公告 btn -->
            <el-button type="text" @click="realseBtn" class="messageBtn">发布新公告</el-button>
            <!-- 发布新公告 dialog -->
            <el-dialog title="发布新公告" :visible.sync="dialogFormVisible">
                <el-form :model="form" :label-position="labelPosition">
                    <el-form-item label="主题" :label-width="formLabelWidth">
                        <el-input v-model="form.title" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" :label-width="formLabelWidth">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="form.textarea">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="发布人" :label-width="formLabelWidth">
                        <el-input v-model="form.pople" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="发布日期" :label-width="formLabelWidth">
                        <el-input v-model="form.date" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button v-show="cancles" @click="cancle">取 消</el-button>
                    <el-button v-show="saves" type="info" @click="save">保 存</el-button>
                    <el-button v-show="realses" type="success" @click="releaseData">发 布</el-button>
                </div>
            </el-dialog>
        </div>
    </section>
</template>

<style lang="less" scoped>
.messageShow {
    position: relative;
    background: #ffffff;
    padding: 24px;
    >div:nth-child(1) {
        margin-top: 20px;
    }
    .messageBtn {
        position: absolute;
        top: 6px;
        right: 30px;
    }
}
</style>

<script>
import { mapState } from 'vuex'
export default {
    computed: {

    },
    beforeCreate() { //请求系统消息 list

    },
    created() {
        // console.log(this.$store.state.login.userInfor.id);
        this.getNoticeUserList1();
    },
    mounted() {

    },
    data() {
        return {
            // start: { //消息发布状态
            //     a: true, //编辑
            //     b: true, //发布
            //     c: true, //删除
            //     d: false, //查看
            // },
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
            labelPosition: 'left',
            formLabelWidth: '120px',
            dialogFormVisible: false,
            cancles: true,
            saves: true,
            realses: true,
            form: {
                title: "", //主题
                textarea: '', //内容
                pople: '', //发布人
                date: '', //发布日期
                start: ""
            },
            tableData1: [],
            tableData2: []
        }
    },
    methods: {
        getNoticeUserList1() { //获取公司公告列表数据
            this.$http.post('/api/work/getNoticeUserList', {
                userId: this.$store.state.login.userInfor.id
            })
                .then(res => {
                    if (res.status == '200') {
                        this.tableData1 = [];
                        console.log(res.data);
                        // this.tableData1 = res.data.result.list
                        this.page1.pageNum = res.data.result.pageNum; //当前页码 
                        this.page1.total = res.data.result.total; //数据总数 
                        this.page1.pageSize = res.data.result.pageSize; //每页条数 
                        this.page1.navigatepageNums = res.data.result.navigatepageNums.length; //页数长度 
                        res.data.result.list.forEach(function(item, index) {
                            let list = res.data.result.list[index].assistNotice;
                            let listArr = [];
                            // listArr.push(list);
                            this.tableData1.push(list);
                            // this.tableData1 = listArr;
                        }, this);
                    } else if (res.data.status == '403') {
                        alert(res.data.message);
                    }
                })
                .catch(error => {

                })
        },
        getNoticeUserList2() { //获取系统消息列表数据
            this.$http.post('/api/work/getNoticeUserList', {
                userId: this.$store.state.login.userInfor.id
            })
                .then(res => {
                    if (res.status == '200') {
                        console.log(res.data);
                        this.tableData2 = [];
                        // this.tableData1 = res.data.result.list
                        res.data.result.list.forEach(function(item, index) {
                            let list = res.data.result.list[index].assistNotice;
                            this.tableData2.push(list);
                        }, this);
                    } else if (res.data.status == '403') {
                        alert(res.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        handleCurrentChange1(pages) { //获取tabList1 分页数据
            console.log(pages);
            // this.getTaskList1(pages);
            this.$http.post('/api/work/getTaskList', {
                
            })
                .then(res => {
                    if (res.status == '200') {
                        console.log(res.data);
                    } else if (res.data.status == '403') {
                        alert(res.data.message);
                    }
                })
                .catch(error => {

                })
        },
        handleCurrentChange2(pages) { //获取tabList2 分页数据
            console.log(pages);
            // this.getTaskList2(pages);
        },
        tableDatasss(tab) {
            if (tab.index == '0') {
                this.getNoticeUserList1();
            } else if (tab.index == '1') {
                this.getNoticeUserList2();
            }
        },
        cancle() { //取消 Btn
            this.dialogFormVisible = false;
            this.clearVal();
        },
        save() { //保存 Btn
            // alert(11);
            this.form.start = "未发布";
            this.dialogFormVisible = false;
            // this.tableData1.a = '编辑';
            // this.tableData1.b = '发布';
            // this.tableData1.c = '删除';
            // this.tableData1.d = '';


            this.tableData1.push({
                title: this.form.title,
                releasePeople: this.form.pople,
                releaseDate: this.form.date,
                start: this.form.start,
                text: this.form.textarea,
                // a: "编辑",
                // b: "发布",
                // c: "删除",
                // d: "",
            });
            // this.clearVal();
        },
        releaseChange(data) {
            console.log(data);
            data.start = "已发布";
            // data.a = '';
            // data.b = '';
            // data.c = '';
            // data.d = '查看';
            // this.start.d = true;
            this.sendData(); //send data for server
        },
        realseBtn() { //发布新公告 btn 方法
            this.dialogFormVisible = true;
            this.saves = true;
            this.realses = true;
            this.clearVal();
        },
        releaseData() { //发布
            this.dialogFormVisible = false;
            this.form.start = "已发布";
            // this.start.d = true;
            this.tableData1.push({
                title: this.form.title,
                releasePeople: this.form.pople,
                releaseDate: this.form.date,
                start: this.form.start,
                text: this.form.textarea,
                // a: "",
                // b: "",
                // c: "",
                // d: "查看"
            });
            this.sendData(); //send data for server
            this.clearVal();
        },
        lookAt(data) { //查看方法
            this.dialogFormVisible = true;
            this.saves = false;
            this.realses = false;

            // console.log(data);
            this.form.title = data.title;
            this.form.textarea = data.text;
            this.form.pople = data.releasePeople;
            this.form.date = data.releaseDate;

        },
        clearVal() { //清空form val
            this.form.title = '';
            this.form.pople = '';
            this.form.date = '';
            this.form.textarea = '';
        },
        deleteRow(index, rows) { //删除当前行
            rows.splice(index, 1);
        },
        sendData() { //send data for server
            // this.$http.post('url', { data: this.form })
            //     .then(response => {

            //     })
            //     .catch(error => {

            //     })
        }
    },
}
</script>

