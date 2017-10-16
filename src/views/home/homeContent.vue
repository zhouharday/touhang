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
                                    <li v-for="( item,index ) in assistMessage.list" :key="item.id">
                                        <div class="read" v-if="!item.readStatus">{{noRead}}</div>
                                        <div class="read" v-if="item.readStatus">{{readed}}</div>
                                        <div>{{item.assistMessage.createDate}}</div>
                                        <span class="cursor" @click="openMsg(item,'msg')">{{item.assistMessage.msgContent}}</span>
                                    </li>
                                </ul>
                                <Page class="page" show-total='true' :total=assistMessage.total :current="1" simple @on-change="assistMsgPages"></Page>
                            </el-tab-pane>
                            <el-tab-pane label="公司公告" name="second">
                                <ul class="notice_ul">
                                    <li v-for="( item,index ) in assistNotice.list" :key="item.id">
                                        <div class="read" v-if="!item.readStatus">{{noRead}}</div>
                                        <div class="read" v-if="item.readStatus">{{readed}}</div>
                                        <div>{{item.assistNotice.createDate}}</div>
                                        <span class="cursor" @click="openMsg(item,'notic')">{{item.assistNotice.noticeContent}}</span>
                                    </li>
                                </ul>
                                <Page class="page" show-total='true' :total=assistNotice.total :current="1" simple @on-change="assistNoticPages"></Page>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin:0;">
            <el-col :span="16" style="padding:0;overflow: hidden;">
                <div class="grid-content bg-purple">
                    <div class="homeContent_botm">
                        <div>
                            <div>
                                <img src="/static/img/sysPrompt.png">
                                <span>{{waitSth}}</span>
                            </div>
                            <div v-if="daibanRw" class="daibanRw">暂无数据</div>
                            <div class="homeContentBot_a" v-for="(item,index) in projectList.result" :key="item.id">
                                <div>
                                    <img src="/static/img/cr_prject.png">
                                    <span>{{item.stageName}}</span>
                                </div>
                                <div>【{{item.name}}】</div>
                                <div>
                                    <span>{{item.typeName}}</span>
                                    <!-- <span @click="approvalModal=true">{{item.projectText3}}</span> -->
                                    <span>{{item.createtime}}</span>
                                </div>
                            </div>
                            <!-- <div class="homeContentBot_b" v-for="(item,index) in projectManger" :key="item.index">
                                                                                    <div>
                                                                                        <img src="/static/img/sysPrompt.png">
                                                                                        <span>{{item.craetProject1}}</span>
                                                                                    </div>
                                                                                    <div>【{{item.projectText2}}】</div>
                                                                                    <div>
                                                                                        <span>{{item.projectText3}}</span>
                                                                                        <span>{{item.projectText6}}</span>
                                                                                        <span>{{item.time}}</span>
                                                                                    </div>
                                                                                    <div>
                                                                                        <span>{{item.projectText5}}</span>
                                                                                        <span>{{item.projectText6}}</span>
                                                                                        <span>{{item.time}}</span>
                                                                                    </div>
                                                                                </div> -->
                            <Page class="page" show-total='true' :total=projectList.total :current="1" simple @on-change="projectList"></Page>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="8" style="padding:0;">
                <div class="grid-content bg-purple">
                    <div class="homeContentBot_r">
                        <div>
                            <img src="/static/img/wait_sth.png">
                            <span>{{sysPrompt}}</span>
                        </div>
                        <div class="taskBox" :class="{ border_b:(index%2 == 0)}" v-for="(item,index) in taskLists.list" :key="item.index">
                            <p>
                                <span>任务名称：</span>
                                <span>{{item.taskName}}</span>
                            </p>
                            <p>
                                <span>指派人：</span>
                                <span>{{item.seedUserName}}</span>
                            </p>
                            <p style="margin:0">
                                <span>指派时间：</span>
                                <span>{{item.createDate}}</span>
                            </p>
                        </div>
                        <Page class="page" :current="1" :total="taskLists.total" simple @on-change="taskListsPage"></Page>
                        <!-- <div class="sysMessage" v-show="sysMessage">{{sysMessageTitle}}</div> -->
                    </div>
                </div>
            </el-col>
        </el-row>

        <!-- 立即申请 对话框-->
        <!-- <el-dialog title="立即申请" :visible.sync="applyModal" :close-on-click-modal="false">
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
        <!-- <Upload multiple type="drag" :before-upload="handleUpload" v-model="applyForm.appendix" action="//jsonplaceholder.typicode.com/posts/">
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
                                                                                                                                                                                                                    </el-dialog> -->
        <!-- 立即查看 对话框 -->
        <!-- <div class="progressBox">
                                                                                                                                                                        <el-dialog title="立即查看" :visible.sync="progressModal" :close-on-click-modal="false">
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
                                                                                                                                                        </div> -->
        <!-- 立即审批  对话框 -->
        <div class="progressBox">
            <el-dialog title="立即审批" :visible.sync="approvalModal" :close-on-click-modal="false">
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
                <div class="title_f" style="background:#2a3142;color:#fff;margin-bottom:15px">
                    <div class="desc">
                        <span>发表意见</span>
                    </div>
                </div>
                <el-input type="textarea" v-model="commentMessage" :rows="4"></el-input>
                <div slot="footer" class="dialog-footer" style="text-align:center">
                    <el-button type="danger" @click="userModal = true">同 意</el-button>
                    <el-button @click="userModal= true">不同意</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 添加用户 对话框-->
        <div class="addUser">
            <el-dialog title="选择用户" :visible.sync="userModal">
                <el-form :model="roleForm" :rules="rules1" ref="roleForm" label-width="80px">
                    <el-row :gutter="40">
                        <el-col>
                            <i style="border-bottom:1px solid #f05e5e"></i>
                        </el-col>
                        <el-col :span="14">
                            <el-form-item label="部门：" prop="department">
                                <el-select v-model="roleForm.department" placeholder="请选择部门" style="width:100%" auto-complete="off">
                                    <el-option v-for="item in departmentOptions" :key="item.label" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14">
                            <el-form-item prop="name">
                                <el-input v-model="roleForm.name" placeholder="请输入姓名或账号" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" style="text-align:right">
                            <el-button type="danger" style=" width:100px;font-size:16px;border-radius:5px;">查找</el-button>
                        </el-col>
                        <el-col>
                            <i style="border-bottom: 1px solid #c4c4c4;"></i>
                        </el-col>
                        <el-col>
                            <el-form-item prop="checkedUser" v-for="item in roleForm.selectUser" :key="item.index">
                                <el-checkbox v-model="roleForm.checkedUser" :label="item.name">{{item.name}}</el-checkbox>
                                <span>{{item.phone}}</span>
                                <span>{{item.branch}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div style="text-align:center">
                    <el-button type="danger" class="dialogBtn_active" @click="submit">确定</el-button>
                    <el-button class="dialogBtn" @click="cancle">取消</el-button>
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
            .read {
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
                // width: 52px;
                height: 24px;
                line-height: 24px;
                text-align: center;
            }
            >span {
                display: block;
                margin-left: 70px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
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
    position: relative;
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
        position: absolute;
        right: 20px;
        bottom: 20px;
    }
    .daibanRw {
        transform: translate3dY(-50%)
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

//立即对话框中的样式
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

// 选择用户 弹出框
.addUser {
    i {
        display: inline-block;
        width: 100%;
        margin-bottom: 10px;
    }
    span {
        margin-left: 23%;
        font-size: 14px;
        font-weight: bold;
    }
    .dialogBtn_active {
        width: 150px;
        font-size: 16px;
        border-radius: 5px;
    }
    .dialogBtn {
        width: 150px;
        font-size: 16px;
        color: #f05e5e;
        border-radius: 5px;
        border-color: #f05e5e;
        background-color: #fff;
    }
}

// 待办任务 
.taskBox {
    padding: 30px 0;
    font-size: 14px;
    >p {
        padding-left: 15px;
        margin-bottom: 20px;
    }
    >p:nth-child(1) {
        border-left: 2px solid #f05e5e;
    }
    span:nth-child(1) {
        font-weight: bold;
    }
}

.border_b {
    border-bottom: 2px solid #f2f4f8;
}
</style>

<script>
import datatime from './datetmp.vue';
export default {
    components: { datatime },
    computed: {
        user() {
            this.$store.state.login.merchants = JSON.parse(sessionStorage.getItem('merchants')) || {};
            this.$store.state.login.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
            return {
                merchants: this.$store.state.login.merchants,
                userInfor: this.$store.state.login.userInfor
            }
        }
    },
    created() {
        this.getNoticeUserList(1);
        this.getMessageList(1);
        this.getTaskList(1);
        this.findUserTask(1);

    },
    data() {
        return {
            daibanRw: false,
            activeName: 'first',
            // applyModal: false,
            progressModal: false,
            approvalModal: false,
            userModal: false,
            commentMessage: '',
            loading: false,
            monthDate: [],
            RecentNotice: "系统消息 / 公司公告",
            waitSth: "小双提醒",
            sysPrompt: "待办任务",
            sysMessage: true,
            sysMessageTitle: "暂时没有系统提示哦~",
            projectList: [],
            // projectManger: [
            //     {
            //         craetProject1: "管理+2",
            //         projectText2: "一号店",
            //         projectText3: "1.您有一条xxxx申请需要审批。",
            //         projectText4: "立即查看",
            //         projectText5: "2.您有一条c轮出资申请需要审批。",
            //         projectText6: "立即审批",
            //         time: "2017-08-16"
            //     },
            //     {
            //         craetProject1: "管理+2",
            //         projectText2: "六号店",
            //         projectText3: "1.您有一条xxxx申请需要审批。",
            //         projectText4: "立即查看",
            //         projectText5: "2.您有一条c轮出资申请需要审批。",
            //         projectText6: "立即审批",
            //         time: "2017-08-16"
            //     }
            // ],
            noRead: "未读",
            readed: "已读",
            assistNotice: [], //公司公告列表数据
            assistMessage: [], //系统消息
            taskLists: [], //代办任务列表数据
            // applyForm: { // 立即申请表单
            //     title: '',
            //     person: '',
            //     date: '',
            //     notes: '',
            //     appendix: '',
            //     auditor: ''
            // },
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
            roleForm: { //选择用户表单
                department: '',
                name: '',
                checkedUser: [],
                selectUser: [
                    {
                        name: '张韶涵1',
                        phone: '15268792134',
                        branch: '项目部'
                    },
                    {
                        name: '张韶涵2',
                        phone: '15268792134',
                        branch: '项目部'
                    },
                    {
                        name: '张韶涵3',
                        phone: '15268792134',
                        branch: '项目部'
                    }
                ]
            },
            departmentOptions: [
                {
                    value: '选项一',
                    label: '部门一'
                }
            ],
            rules1: {
                checkedUser: [
                    { type: 'array', required: true, message: '请选择用户', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        assistMsgPages(pageNum) {
            this.getMessageList(pageNum);
        },
        assistNoticPages(pageNum) {
            this.getNoticeUserList(pageNum);
        },
        taskListsPage(pageNum) {
            this.getTaskList(pageNum);
        },
        projectList(pageNum) {
            this.findUserTask(pageNum);
        },
        changetime(data) {

        },
        openMsg(item, type) {
            if (type == 'msg') {
                this.$msgbox({
                    title: '系统消息',
                    message: item.assistMessage.msgContent,
                    confirmButtonClass: 'noticeBtn'
                });
            } else {
                this.$msgbox({
                    title: '公司公告',
                    message: item.assistNotice.noticeContent,
                    confirmButtonClass: 'noticeBtn'
                });
            }
        },
        readyfun(arr, data) {
            var arr = arr;
            //先根据接口返回数据 修改arr
            //然后再把arr赋值给monthdate
            this.monthDate = arr;
            this.getData();

        },
        removeDuplicatedItem(ar) { //数组去重
            var ret = [];
            for (var i = 0, j = ar.length; i < j; i++) {
                if (ret.indexOf(ar[i]) === -1) {
                    ret.push(ar[i]);
                }
            }
            return ret;
        },
        getData() { //获取日程列表 api
            this.$http.post(this.api + '/work/getScheduleList', {
                "userId": this.user.userInfor.id,
                "merchantId": this.user.merchants[0].id
            })
                .then(res => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {
                            console.log('*******************************')
                            console.log(res.data)
                            // console.log(this.monthDate)
                            res.data.result.forEach(item => {
                                let arr = this.removeDuplicatedItem(this.monthDate);
                                // this.monthDate.map(list => {
                                arr.map(list => {
                                    // list.item = [];
                                    console.log(list.time);
                                    if (item.startTime.split(" ")[0] == list.time) {
                                        // alert(222);
                                        list.have = true;
                                        // list.item = [];
                                        list.item.push(item);
                                    }
                                })
                            })
                        } else if (res.data.status == '403') {
                            this.$Message.error(res.data.message);
                        } else if (res.data.status == '49999') {
                            this.$Message.error(res.data.message);
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error("请求超时");
                })
        },
        submit() { //选择用户 确定按钮方法
            this.userModal = !this.userModal;
            this.approvalModal = !this.approvalModal;
        },
        cancle() { //选择用户 取消按钮方法
            this.userModal = !this.userModal;
            this.approvalModal = !this.approvalModal;
        },
        getNoticeUserList(pageNum) { //获取公司公告列表数据 api
            this.$http.post(this.api + '/work/getNoticeUserList', {
                "userId": this.user.userInfor.id,
                "page": pageNum,
                "pageSize": 4,
            })
                .then(res => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {
                            this.assistNotice = res.data.result;
                            this.$Message.success(res.data.message);
                        } else if (res.data.status == '403') {
                            this.$Message.error(res.data.message);
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error("请求超时");
                })
        },
        getMessageList(pageNum) { //获取系统消息 api
            this.$http.post(this.api + '/work/getMessageList', {
                "userId": this.user.userInfor.id,
                "page": pageNum,
                "pageSize": 4,
            })
                .then(res => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {

                            this.assistMessage = res.data.result;
                            this.$Message.success(res.data.message);
                        } else if (res.data.status == '403') {
                            this.$Message.error(res.data.message);
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error("请求超时");
                })
        },
        getTaskList(page) { //获取代办任务列表数据 api
            this.$http.post(this.api + '/work/getTaskList', {
                "userId": this.user.userInfor.id,
                "merchantId": this.user.merchants[0].id,
                "type": 2,
                "page": page,
                "pageSize": 2,
            })
                .then(res => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {
                            this.taskLists = res.data.result;
                            this.$Message.success(res.data.message);
                        } else if (res.data.status == '403') {
                            this.$Message.error(res.data.message);
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error("请求超时");
                })
        },
        findUserTask(page) { //小双提醒
            this.$http.post(this.api + '/activitiCommon/findUserTask', {
                "merchantId": this.user.merchants[0].id,
                "userId": this.user.userInfor.id,
                "page": page,
                "pageSize": 3
            })
                .then(res => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {

                            this.projectList = res.data.result;
                            if (res.data.result.result.length == '0') {
                                this.daibanRw = true;
                            };
                            this.$Message.success(res.data.message);
                        } else if (res.data.status == '403') {
                            this.$Message.error(res.data.message);
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error("请求超时");
                })
        },
    }
}

</script>


