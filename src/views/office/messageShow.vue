<template>
    <section>
        <!-- 这是消息公告页内容 -->
        <div class="messageShow">
            <el-tabs type="border-card">
                <!-- 公司公告 Tab -->
                <el-tab-pane label="公司公告">
                    <el-table :data="tableData1" border style="width: 100%">
                        <el-table-column prop="title" label="主题" align="center">
                        </el-table-column>
                        <el-table-column prop="releasePeople" label="发布人" align="center">
                        </el-table-column>
                        <el-table-column prop="releaseDate" label="发布日期" align="center">
                        </el-table-column>
                        <el-table-column prop="start" label="状态" align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button v-show="scope.row.start == '未发布'" @click="dialogFormVisible = true" type="text" size="small">{{scope.row.a}}</el-button>
                                <el-button v-show="scope.row.start == '未发布'" @click="releaseChange(scope.row)" type="text" size="small">{{scope.row.b}}</el-button>
                                <el-button v-show="scope.row.start == '未发布'" @click.native.prevent="deleteRow(scope.$index, tableData1)" type="text" size="small">{{scope.row.c}}</el-button>
                                <el-button v-show="scope.row.start == '已发布'" @click="lookAt(scope.row)" type="text" size="small">{{scope.row.d}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <!-- 系统消息 Tab -->
                <el-tab-pane label="系统消息">
                    <el-table :data="tableData2" border style="">
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
    .messageBtn {
        position: absolute;
        top: 6px;
        right: 30px;
    }
}
</style>

<script>
export default {
    beforeCreate() { //请求系统消息 list
        // this.$http.post('url', {})
        // .then(function( response ){

        // })
        // .catch( error => {

        // })
    },
    mounted() {
        
    },
    data() {
        return {
            start: { //消息发布状态
                a: true, //编辑
                b: true, //发布
                c: true, //删除
                d: false, //查看
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
            tableData1: [
                {
                    title: "a1",
                    releasePeople: "a1",
                    releaseDate: "a1",
                    start: "已发布",
                    text: "",
                    a: "编辑",
                    b: "发布",
                    c: "删除",
                    d: "查看",
                },
                {
                    title: "a1",
                    releasePeople: "a1",
                    releaseDate: "a1",
                    start: "未发布",
                    text: "",
                    a: "编辑",
                    b: "发布",
                    c: "删除",
                    d: "查看",
                }
            ],
            tableData2: []
        }
    },
    methods: {
        cancle() { //取消 Btn
            this.dialogFormVisible = false;
            this.clearVal();
        },
        save() { //保存 Btn
        // alert(11);
            this.form.start = "未发布";
            this.dialogFormVisible = false;
            this.tableData1.a = '编辑';
            this.tableData1.b = '发布';
            this.tableData1.c = '删除';
            this.tableData1.d = '';


            this.tableData1.push({
                title: this.form.title,
                releasePeople: this.form.pople,
                releaseDate: this.form.date,
                start: this.form.start,
                text: this.form.textarea,
                a: "编辑",
                b: "发布",
                c: "删除",
                d: "",
            });
            // this.clearVal();
        },
        releaseChange(data) {
            console.log(data);
            data.start = "已发布";
            data.a = '';
            data.b = '';
            data.c = '';
            data.d = '查看';
            this.start.d = true;
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
            this.start.d = true;
            this.tableData1.push({
                title: this.form.title,
                releasePeople: this.form.pople,
                releaseDate: this.form.date,
                start: this.form.start,
                text: this.form.textarea,
                a: "",
                b: "",
                c: "",
                d: "查看"
            });
            this.sendData(); //send data for server
            this.clearVal();
        },
        lookAt(data) { //查看方法
            this.dialogFormVisible = true;
            this.saves = false;
            this.realses = false;

            console.log(data);
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

