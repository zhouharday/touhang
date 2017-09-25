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
                        <el-table-column prop="noticeType" label="状态" align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button v-show="scope.row.noticeType == '未发布'" @click="editNotice(scope.row)" type="text" size="small">编辑</el-button>
                                <el-button v-show="scope.row.noticeType == '未发布'" @click="releaseNotice(scope.row)" type="text" size="small">发布</el-button>
                                <el-button v-show="scope.row.noticeType == '未发布'" @click.native.prevent="deleteNotice(scope.row,scope.$index, tableData1)" type="text" size="small">删除</el-button>
                                <el-button v-show="scope.row.noticeType == '已发布'" @click="lookNotice(scope.row)" type="text" size="small">查看</el-button>
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
            <el-button v-show="isAddMsg" type="primary" @click="realseBtn" class="messageBtn">发布新公告</el-button>
            <!-- 发布新公告 dialog -->
            <el-dialog style="width:1100px" title="发布新公告" :visible.sync="dialogFormVisible">
                <el-form style="width:500px" :model="sendNoticeform" ref="sendNoticeform" :label-position="labelPosition">
                    <el-form-item porp="noticeTitle" label="主题" :label-width="formLabelWidth">
                        <el-input v-model="sendNoticeform.noticeTitle" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item porp="noticeContent" label="内容" :label-width="formLabelWidth">
                        <el-input v-model="sendNoticeform.noticeContent" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                        </el-input>
                    </el-form-item>
                    <el-form-item porp="seedUserId" label="发布人" :label-width="formLabelWidth">
                        <el-input :disabled="1" v-model="sendNoticeform.seedUserId" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item porp="seedNoticeDate" label="发布日期" :label-width="formLabelWidth">
                        <el-date-picker @change="getDateValue" v-model="sendNoticeform.seedNoticeDate" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button v-show="cancles" @click="cancle">取 消</el-button>
                    <el-button v-show="saves" type="info" @click="saveORrealse(1)">保 存</el-button>
                    <el-button v-show="realses" type="success" @click="saveORrealse(2)">发 布</el-button>
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
        userId(state) {
            // alert(111);
            this.$store.state.login.merchants = JSON.parse(sessionStorage.getItem('merchants')) || {};
            return this.$store.state.login.userInfor.id;
        },
    },
    beforeCreate() { //请求系统消息 list

    },
    created() {
        // console.log(this.$store.state.login.userInfor.id);
        this.getNoticeUserList1(1);
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
            isAddMsg: true,
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
            sendNoticeform: { //添加公告form
                noticeTitle: "", //主题
                noticeContent: '', //内容
                seedUserId: '', //发布人
                seedNoticeDate: '', //发布日期
                noticeType: "" //发布状态
            },
            tableData1: [],
            tableData2: []
        }
    },
    methods: {
        /************公告 Start***************/
        getNoticeUserList1(pages) { //获取公司公告列表数据
            // alert(1);
            this.$http.post(this.api + '/work/getNoticeList', {
                "seedUserId": this.userId,
                "page": pages,
                "pageSize": 10,
                "merchantId": this.$store.state.login.merchants[0].id
            })
                .then(res => {
                    if (res.status == '200') {
                        console.log(res.data);
                        res.data.result.list.forEach(function(item,index) {
                            if (item.noticeType == '1'){
                                item.noticeType = '未发布';
                            }else{
                                item.noticeType = '已发布';
                            }
                        }, this);
                        this.tableData1 = res.data.result.list;
                        this.tableData1 = res.data.result.list; //任务数据列表
                        this.page1.pageNum = res.data.result.pageNum; //当前页码 
                        this.page1.total = res.data.result.total; //数据总数 
                        this.page1.pageSize = res.data.result.pageSize; //每页条数 
                        this.page1.navigatepageNums = res.data.result.navigatepageNums.length; //页数长度 
                        if (res.data.status == '49999') { //数据为空
                            console.log('没有新数据');
                        }
                    } else if (res.data.status == '403') {
                        console.log(res.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getNoticeUserList2(num) { //保存/发布公司公告列表数据
            // alert(2);
            this.$http.post(this.api + '/work/addNotice', {
                "seedUserId": this.userId,
                "noticeTitle": this.sendNoticeform.noticeTitle,
                "seedNoticeDate": this.sendNoticeform.seedNoticeDate,
                "noticeType": num,
                "noticeContent": this.sendNoticeform.noticeContent,
                "merchantId": this.$store.state.login.merchants[0].id
            })
                .then(res => {
                    if (res.status == '200') {
                        console.log(res.data.message);
                        this.getNoticeUserList1(1);
                        if (res.data.status == '49996') { //数据为空
                            console.log('传入参数非法');
                        }
                    } else if (res.data.status == '403') {
                        console.log(res.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        releaseNotice(row) { //发布公司公告列表数据
            // console.log(id);
            // alert(2);
            this.$http.post(this.api + '/work/seedNotice', {
                id: row.id
            })
                .then(res => {
                    if (res.status == '200') {
                        console.log(res.data.message);
                        this.getNoticeUserList1(1);
                        if (res.data.status == '49996') { //数据为空
                            console.log('传入参数非法');
                        }
                    } else if (res.data.status == '403') {
                        console.log(res.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        editNotice(row) { //编辑公告列表
            console.log(row);
            this.dialogFormVisible = true;
            this.$http.post(this.api + '/work/modifyNoticeInfo', {
                "id": row.id,
                "noticeTitle": row.noticeTitle,
                "seedNoticeDate": row.seedNoticeDate,
                "noticeContent": row.seedNoticeDate
            })
                .then(res => {
                    if (res.status == '200') {
                        alert(565);
                        row.noticeTitle = this.sendNoticeform.noticeTitle;
                        row.noticeContent = this.sendNoticeform.noticeContent;
                        row.seedUserName = this.sendNoticeform.seedUserId;
                        row.seedNoticeDate = this.sendNoticeform.seedNoticeDate;
                        console.log(res.data.message);
                        if (res.data.status == '49996') { //数据为空
                            console.log('传入参数非法');
                        }
                    } else if (res.data.status == '403') {
                        console.log(res.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        deleteNotice(row) { //删除公告列表
            // console.log(row);
            this.$http.post(this.api + '/work/deleteNotice', {
                id: row.id
            })
                .then(res => {
                    if (res.status == '200') {
                        console.log(res.data.message);
                        this.getNoticeUserList1(1);
                        if (res.data.status == '49996') { //数据为空
                            console.log('传入参数非法');
                        }
                    } else if (res.data.status == '403') {
                        console.log(res.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        /***************公告 End******************* */
        /***************系统消息 Start********************/
        getSysNoticeList2(pages) { //获取系统消息列表数据
            this.$http.post(this.api + '/sysManage/selectSysMessageList', {
                "seedUserId": this.userId,
                "page": pages,
                "pageSize": 10,
                "merchantId": this.$store.state.login.merchants[0].id
            })
                .then(res => {
                    if (res.status == '200') {
                        console.log(res.data);
                        if (res.data.status == '49999') { //数据为空
                            console.log('没有新数据');
                        }
                    } else if (res.data.status == '403') {
                        console.log(res.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        /***************系统消息 End******************* */
        handleCurrentChange1(pages) { //获取tabList1 分页数据
            console.log(pages);
            this.getNoticeUserList1(pages);
        },
        handleCurrentChange2(pages) { //获取tabList2 分页数据
            console.log(pages);
            this.getNoticeUserList2(pages);
        },
        tableDatasss(tab) {
            if (tab.index == '0') {
                this.isAddMsg = true;
                this.getNoticeUserList1();
            } else if (tab.index == '1') {
                this.isAddMsg = false;
                this.getNoticeUserList2();
            }
        },
        cancle() { //取消 Btn
            this.dialogFormVisible = false;
        },
        saveORrealse(num) { //保存 Btn
            // alert(11);
            if (num == '1') { //保存
                this.sendNoticeform.noticeType = "1";
                this.getNoticeUserList2(num);
            } else { //发布
                this.sendNoticeform.noticeType = "2";
                this.getNoticeUserList2(num);
            }
            this.dialogFormVisible = false;
            console.log(this.sendNoticeform);
        },
        releaseChange(data) {
            console.log(data);
            data.start = "已发布";
            this.sendData(); //send data for server
        },
        realseBtn() { //发布新公告Dialog btn 方法
            // alert(111);
            let new_sendNoticeform = {
                noticeTitle: "", //主题
                noticeContent: '', //内容
                seedUserId: this.$store.state.login.userInfor.name, //发布人
                seedNoticeDate: '', //发布日期
                noticeType: "" //发布状态
            };
            this.sendNoticeform = new_sendNoticeform;
            this.dialogFormVisible = true;
            this.saves = true;
            this.realses = true;
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
            });
            this.sendData(); //send data for server
            this.clearVal();
        },
        getDateValue(val) { //获取完成时间的值
            // console.log(val);
            this.sendNoticeform.seedNoticeDate = val;
            return val;
        },
        lookNotice(row) { //查看方法
            alert(row.noticeContent);
        },
        deleteRow(index, rows) { //删除当前行
            rows.splice(index, 1);
        }
    },
}
</script>

