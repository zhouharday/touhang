<template>
    <section v-loading.body="loading" class="homeContent">
        <!-- 这是首页内容 -->
        <el-row :gutter="20" style="margin:0;">
            <el-col :span="12" style="padding:0;">
                <div class="grid-content bg-purple">
                    <div>
                        <div class="homeContent_top_L">
                            <!-- <div>这是日期内容</div> -->
                            <div>
                                <datatime :month-date="monthDate" v-on:changetime="changetime" v-on:readyfun="readyfun"></datatime>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="12" class="homeContent_top_R" style="padding:0;">
                <div class="grid-content bg-purple">
                    <div style="padding: 0px 24px;">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="系统消息" name="first">
                                <ul class="notice_ul">
                                    <li v-for="( item,index ) in messageShow" :key="item.index">
                                        <div>{{item.noRead}}</div>
                                        <div>{{item.data}}</div>
                                        <span>{{item.noticeMessage}}</span>
                                    </li>
                                </ul>
                                <Page class="page" :current="1" :total="50" simple @on-change="changePages"></Page>
                            </el-tab-pane>
                            <el-tab-pane label="公司公告" name="second">
                                <ul class="notice_ul">
                                    <li v-for="( item,index ) in noticeShow" :key="item.index">
                                        <div>{{item.noRead}}</div>
                                        <div>{{item.data}}</div>
                                        <span>{{item.noticeMessage}}</span>
                                    </li>
                                </ul>
                                <Page class="page" :current="1" :total="50" simple @on-change="changePages"></Page>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin:0;">
            <el-col :span="16" style="padding:0;">
                <div class="grid-content bg-purple">
                    <div class="homeContent_botm">
                        <div>
                            <div>
                                <img src="/static/img/wait_sth.png" />
                                <span>{{waitSth}}</span>
                            </div>
                            <div class="homeContentBot_a" v-for="(item,index) in projectList" :key="item.index">
                                <div>
                                    <img src="/static/img/cr_prject.png">
                                    <span>{{item.craetProject}}</span>
                                </div>
                                <div>【{{item.projectText1}}】</div>
                                <div>
                                    <span>{{item.projectText2}}</span>
                                    <span @click="applyModal=true">{{item.projectText3}}</span>
                                    <span>{{item.time}}</span>
                                </div>
                            </div>
                            <div class="homeContentBot_b" v-for="(item,index) in projectManger" :key="item.index">
                                <div>
                                    <img src="/static/img/cr_prject.png">
                                    <span>{{item.craetProject1}}</span>
                                </div>
                                <div>【{{item.projectText2}}】</div>
                                <div>
                                    <span>{{item.projectText3}}</span>
                                    <span @click="progressModal=true">{{item.projectText4}}</span>
                                    <span>{{item.time}}</span>
                                </div>
                                <div>
                                    <span>{{item.projectText5}}</span>
                                    <span>{{item.projectText6}}</span>
                                    <span>{{item.time}}</span>
                                </div>
                            </div>
                            <Page class="page" :current="1" :total="50" simple @on-change="changePages"></Page>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="8" style="padding:0;">
                <div class="grid-content bg-purple">
                    <div class="homeContentBot_r">
                        <div>
                            <img src="/static/img/sysPrompt.png">
                            <span>{{sysPrompt}}</span>
                        </div>
                        <div class="grid-content bg-purple">
                            <div style="padding: 0px 0px;">
                                <ul class="notice_ul">
                                    <li v-for="( item,index ) in messageShow" :key="item.index">
                                        <div>{{item.noRead}}</div>
                                        <div>{{item.data}}</div>
                                        <span>{{item.noticeMessage}}</span>
                                    </li>
                                </ul>
                                <Page class="page" :current="1" :total="50" simple @on-change="changePages"></Page>
                            </div>
                        </div>
                        <!-- <div class="sysMessage" v-show="sysMessage">{{sysMessageTitle}}</div> -->
                    </div>
                </div>
            </el-col>
        </el-row>

        <!-- 发起申请 对话框-->
        <el-dialog title="发起申请" :visible.sync="applyModal" :close-on-click-modal="false">

            <el-form :model="applyForm" ref="applyForm" label-width="100px">
                <el-row>
                    <el-col>
                        <el-form-item label="标题" prop="name">
                            <el-input v-model="applyForm.title" placeholder="标题自动生成" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="申请人" prop="person">
                            <el-input v-model="applyForm.person" placeholder="当前用户" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="申请日期" prop="date">
                            <el-input v-model="applyForm.date" placeholder="当前日期" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="备注" prop="notes">
                            <el-input type="textarea" :rows="2" v-model="applyForm.notes" auto-complete="off">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="考察报告" prop="appendix">
                            <!-- action 上传的地址，必填 -->
                            <Upload multiple type="drag" :before-upload="handleUpload" v-model="applyForm.appendix" action="//jsonplaceholder.typicode.com/posts/">
                                <div style="padding: 20px 0">
                                    <Icon type="ios-cloud-upload" size="52"></Icon>
                                    <p>点击或将文件拖拽到这里上传</p>
                                </div>
                            </Upload>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="选择审批人" prop="date">
                            <el-select v-model="applyForm.auditor " filterable placeholder="请选择" style="width: 50%">
                                <el-option v-for="item in auditorOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button type="danger" @click="applyModal= false">提 交</el-button>
            </div>
        </el-dialog>
        <!-- 查看进度 对话框 -->
        <div class="progressBox">
            <el-dialog title="查看进度" :visible.sync="progressModal" :close-on-click-modal="false">
                <div style="height:2px;border-bottom: 1px solid #f05e5e"></div>
                <el-table :data="progressTable" style="margin:15px 0;" :row-class-name="tableRowClassName">
                    <el-table-column prop="node" label="节点" align="center">
                    </el-table-column>
                    <el-table-column prop="operator" label="处理人" align="center">
                    </el-table-column>
                    <el-table-column prop="conclusion" label="结论" align="center">
                    </el-table-column>
                    <el-table-column prop="startingTime" label="开始日期" align="center">
                    </el-table-column>
                    <el-table-column prop="time" label="用时" align="center">
                    </el-table-column>
                </el-table>
                <div>
                    <div class="title_f" style="background:#2a3142;color:#fff">
                        <div class="desc">
                            <span>申请详情</span>
                        </div>
                    </div>
                    <el-form :model="applyForm2" ref="applyForm" style="margin-top:20px" label-width="100px">
                        <el-row>
                            <el-col>
                                <el-form-item label="标题" prop="name">
                                    <el-input v-model="applyForm2.title" placeholder="数据展示" auto-complete="off" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="申请人" prop="person">
                                    <el-input v-model="applyForm2.person" placeholder="数据展示" auto-complete="off" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="申请日期" prop="date">
                                    <el-input v-model="applyForm2.date" placeholder="数据展示" auto-complete="off" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <el-form-item label="备注" prop="notes">
                                    <el-input type="textarea" :rows="2" v-model="applyForm2.notes" placeholder="数据展示" auto-complete="off" disabled>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="考察报告" prop="reports" style="margin-bottom:10px">
                                    <el-input v-model="applyForm2.reports" placeholder="数据展示" auto-complete="off" disabled>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1">
                                <div style="text-align:center;line-height:35px;">
                                    <a href="/static/img/plan.txt" download="xxxxx" style="color:#f05e5e">下载</a>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div>
                    <div class="title_f" style="background:#2a3142;color:#fff">
                        <div class="desc">
                            <span>意见汇总</span>
                        </div>
                    </div>
                    <div class="comment_box" :class="{bgh: (index%2 == 0),bgl: (index%2 != 0)}" v-for="(item,index) in commentLists" :key="item.index">
                        <p class="comment_left">
                            <span>{{item.comment}}</span>
                        </p>
                        <p class="comment_right">
                            <span style="margin: 0px 0px 15px 8px">{{item.num}}</span>
                            <span>{{item.note}}</span>
                        </p>
                    </div>
                </div>
            </el-dialog>
        </div>
    </section>
</template>

<style lang="less" scoped>
.homeContent_top_L {
    overflow: hidden;
    margin-right: 24px;
    position: relative;
    >div {
        width: 100%;
        height: 362px;
        background: #fff;
        padding: 16px 24px;
        float: left;
    }
    >div:nth-child(1) {
        margin-right: 24px;
    }
}

.homeContent_top_R,
.homeContentBot_r {
    background: #fff;
    padding: 16px 24px;
    height: 362px; // float: left;
    >div>div>div {
        position: relative;
        >img {
            position: absolute;
            width: 20px;
            height: 20px;
        }
        >span {
            margin-left: 30px;
        }
    }
    .notice_ul {
        font-size: 14px;
        overflow: hidden;
        height: 273px;
        li {
            margin-top: 16px;
            height: 50px;
            position: relative;
            >div:nth-child(1) {
                width: 52px;
                height: 24px;
                border-radius: 10px;
                background: #f05e5e;
                line-height: 24px;
                text-align: center;
                color: #fff;
                float: left;
                cursor: pointer;
            }
            >div:nth-child(2) {
                position: absolute;
                top: 26px; // left: 3px;
                width: 52px;
                height: 24px;
                line-height: 24px;
                text-align: center;
            }
            >span {
                display: block;
                margin-left: 70px;
            }
        }
    }
    .page {
        float: right;
        font-size: 14px;
    }
}

.homeContent_botm {
    overflow: hidden;
    margin-top: 24px;
    margin-right: 24px;
    >div {
        // width: 586px;
        height: 416px;
        background: #fff;
        padding: 16px 24px;
        float: left;
    }
    >div:nth-child(1) {
        width: 100%;
        margin-right: 24px; // margin-top: 24px;
        >div {
            position: relative;
            >img {
                position: absolute;
                width: 20px;
                height: 20px;
            }
            >span {
                margin-left: 30px;
            }
        }
        .homeContentBot_a,
        .homeContentBot_b {
            overflow: hidden;
            border-bottom: 2px solid #f2f4f8;
            padding: 15px 0 15px 0;
            color: #2a3142;
            >div:nth-child(1) {
                position: relative;
                float: left;
                width: 60px;
                height: 23px;
                line-height: 25px;
                color: #fff;
                background: #f05e5e;
                border-radius: 16px 0 0 16px;
                font-size: 10px; // margin-top: 16px;
                >img {
                    position: relative;
                    top: 3px;
                    left: 3px;
                    width: 16px;
                    height: 16px;
                }
            }
            >div:nth-child(2) {
                margin-left: 76px;
            }
            >div:nth-child(3),
            >div:nth-child(4) {
                font-size: 14px;
                margin-top: 10px;
                >span:nth-child(2) {
                    margin-left: 25px;
                    color: red;
                    text-decoration: underline;
                    cursor: pointer;
                }
                >span:nth-child(3) {
                    float: right;
                    color: #a7aab0;
                }
            }
        }
        .homeContentBot_b {
            >div:first-child {
                background: #41578c;
            }
        }
    }
    >div:nth-child(2) {
        width: 294px;
    }
    .page {
        float: right;
        font-size: 14px;
        margin-top: 15px;
    }
}

.homeContentBot_r {
    position: relative;
    background: #fff;
    height: 416px;
    padding: 16px 24px;
    margin-top: 24px;
    >div:nth-child(1) {
        >img {
            width: 20px;
            height: 20px;
            position: relative;
            top: 3px;
        }
    }
    .sysMessage {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 155px;
        height: 20px;
    }
}

//查看进度对话框中的样式
.title_f {
    margin-top: 30px;
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    .desc {
        flex: 1;
        text-align: left;
        span {
            color: #fff;
            margin-left: 90px;
        }
    }
}

.comment_box {
    height: 80px;
    display: flex;
    align-items: center;
    padding-left: 90px;
    .comment_left {
        width: 100px;
        margin-right: 150px;
        text-align: center
    }
    .comment_right {
        display: flex;
        flex-direction: column;
    }
}

.bgh {
    background: #fff;
}

.bgl {
    background: #EEF0F4;
}
</style>


<script>
import datatime from './datetmp.vue';
export default {
    components: { datatime },
    created() {
    },
    data() {
        return {
            activeName: 'first',
            applyModal: false,
            progressModal: false,
            loading: false,
            monthDate: [],
            RecentNotice: "系统消息 / 公司公告",
            waitSth: "待办事项",
            sysPrompt: "系统提示",
            sysMessage: true,
            sysMessageTitle: "暂时没有系统提示哦~",
            projectList: [
                {
                    craetProject: "立项",
                    projectText1: "京东",
                    projectText2: "您需要进行立项申请",
                    projectText3: "立即申请",
                    time: "2017-08-16"
                }
            ],
            projectManger: [
                {
                    craetProject1: "管理+2",
                    projectText2: "一号店",
                    projectText3: "1.您的xxx正在审批中。",
                    projectText4: "立即查看",
                    projectText5: "2.您的c轮出资正在审批中。",
                    projectText6: "立即查看",
                    time: "2017-08-16"
                },
                {
                    craetProject1: "管理+2",
                    projectText2: "六号店",
                    projectText3: "1.您的xxx正在审批中。",
                    projectText4: "立即查看",
                    projectText5: "2.您的c轮出资正在审批中。",
                    projectText6: "立即查看",
                    time: "2017-08-16"
                }
            ],
            messageShow: [
                {
                    noRead: "未读",
                    data: "08-23",
                    noticeMessage: "由于公司大楼机电维修停电一天，公司与 2017-08-24~2017-08-25放假两天，2017-08-28正常上班。"
                },
                {
                    noRead: "未读",
                    data: "08-23",
                    noticeMessage: "由于公司大楼机电维修停电一天，公司与 2017-08-24~2017-08-25放假两天，2017-08-28正常上班。"
                },
                {
                    noRead: "未读",
                    data: "08-23",
                    noticeMessage: "由于公司大楼机电维修停电一天，公司与 2017-08-24~2017-08-25放假两天，2017-08-28正常上班。"
                },
                {
                    noRead: "未读",
                    data: "08-23",
                    noticeMessage: "由于公司大楼机电维修停电一天，公司与 2017-08-24~2017-08-25放假两天，2017-08-28正常上班。"
                }
            ],
            applyForm: { // 立即申请表单
                title: '',
                person: '',
                date: '',
                notes: '',
                appendix: '',
                auditor: ''
            },
            progressTable: [//查看进度表单 节点table
                {
                    node: '发起申请',
                    operator: '管理员 2017/8/15 16:25:14',
                    conclusion: '同意',
                    startingTime: '2017/8/15 16:25:14',
                    time: '4秒'
                }
            ],
            applyForm2: { //查看进度表单 发起申请表单
                title: '',
                person: '',
                date: '',
                notes: '',
                appendix: '',
                auditor: '',
                reports: ''
            },
            auditorOptions: [{ //查看进度表单 发起申请表单 审批人列表
                value: '选项1',
                label: '张三'
            }, {
                value: '选项2',
                label: '李四'
            }, {
                value: '选项3',
                label: '王二'
            }],
            commentLists: [ //查看进度表单  意见汇总列表
                {
                    comment: '法务意见',
                    num: '2',
                    note: '【管理员】2017/08/15'
                },
                {
                    comment: '反馈项目负责人',
                    num: '2',
                    note: '【管理员】2017/08/15'
                }
            ],
            noticeShow: [
                {
                    noRead: "已读",
                    data: "08-23",
                    noticeMessage: "因为公司大楼机电维修停电一天，公司与 2017-08-24~2017-08-25放假两天，2017-08-28正常上班。"
                },
                {
                    noRead: "已读",
                    data: "08-23",
                    noticeMessage: "因为公司大楼机电维修停电一天，公司与 2017-08-24~2017-08-25放假两天，2017-08-28正常上班。"
                },
                {
                    noRead: "已读",
                    data: "08-23",
                    noticeMessage: "因为公司大楼机电维修停电一天，公司与 2017-08-24~2017-08-25放假两天，2017-08-28正常上班。"
                },
                {
                    noRead: "已读",
                    data: "08-23",
                    noticeMessage: "因为公司大楼机电维修停电一天，公司与 2017-08-24~2017-08-25放假两天，2017-08-28正常上班。"
                }
            ],
        }
    },
    methods: {
        changePages(pageIndex) {
            this.$http.post('/url', { //此处ajax
                pageIndex: pageIndex
            })
                .then(function(response) {

                })
                .catch(function(error) {

                });

        },
        changetime(data) {
            // console.log(data)
        },
        readyfun(arr, data) {
            var arr = arr;
            //先根据接口返回数据 修改arr
            //然后再把arr赋值给monthdate
            arr.forEach(function(item) {
                return item.yd = item.day && item.day % 3 == 1 ? true : false;
            });
            this.monthDate = arr;
        }
    }
}

</script>


