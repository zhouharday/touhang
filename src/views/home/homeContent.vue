<template>
    <section>
        <!-- 这是首页内容 -->
        <el-row :gutter="20" style="margin:0;">
            <el-col :span="12" style="padding:0;">
                <div class="grid-content bg-purple">
                    <div>
                        <div class="homeContent_top_L">
                            <!-- <div>这是日期内容</div> -->
                            <div>

                            <datatime title="" :month-date="monthDate" v-on:changetime="changetime" v-on:readyfun="readyfun"></datatime>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="12" class="homeContent_top_R" style="padding:0;">
                <div class="grid-content bg-purple">
                    <div style="padding:16px 24px;">
                        <div>
                            <img src="/static/img/Notice.png" />
                            <span>{{RecentNotice}}</span>
                        </div>
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
                                    <span>{{item.projectText3}}</span>
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
                                    <span>{{item.projectText4}}</span>
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
                        <div class="sysMessage" v-show="sysMessage">{{sysMessageTitle}}</div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </section>
</template>

<style lang="less" scoped>
.homeContent_top_L {
    overflow: hidden;
    margin-right: 24px;
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

.homeContent_top_R {
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
</style>
<script>
import datatime from './datetmp.vue';
export default {
    components: {datatime},
    data() {
        return {
            monthDate:[],
            RecentNotice: "最近通知",
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
        }
    },
    methods: {
        changePages(pageIndex) {
            this.$http.post('/url', { //此处ajax
                pageIndex: pageIndex
            })
                .then(function (response) {

                })
                .catch(function (error) {

                });
           
        },
        changetime(data){
            console.log(data)
        },
        readyfun(arr,data){
            var arr = arr;
            //先根据接口返回数据 修改arr 
            //然后再把arr赋值给monthdate
            arr.forEach(function(item) {
                return item.yd = item.day && item.day%3 == 1?true:false;
            });
            this.monthDate = arr;
        }
    }
}

</script>


