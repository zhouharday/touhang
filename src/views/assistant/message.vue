<template>
    <div class="container">
        <section class="messageContainer">
            <!-- 这是详情页{{this.$route.params.userId}} -->
            <div class="messageContent" v-show="isShow">
                <el-row class="message_top">
                    <el-col :span="4" style="margin-right:40px;">
                        <div class="messageBrand">
                            <img :src="productInfo.logo">
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div class="messageIntro">
                            <div class="introText">
                                <p>项目名称 : {{company.name}} &nbsp;&nbsp;&nbsp;({{productInfo.brief}})</p>
                                <div>
                                    <p>行业：
                                        <span>{{company.industryName}}</span>
                                    </p>
                                    <p>所在地：
                                        <span>{{company.citystr}}</span>
                                    </p>
                                    <p>成立时间：
                                        <span>{{company.foundingTime}}</span>
                                    </p>
                                </div>
                                <p>公司全称：
                                    <span>{{productInfo.fullname}}</span>
                                </p>
                            </div>
                            <div class="introTable">
                                <p class="table-top">上轮获投</p>
                                <div class="table-bottom">
                                    <p class="table-col">{{company.phaseName}}</p>
                                    <p>&yen;：
                                        <span>{{company.lastCast}}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div class="messageBtn">
                            <el-button type="danger" @click="dialogVisible = true">
                                +项目池
                            </el-button>
                            <!-- 转项目池 dialog -->
                            <el-dialog title="转项目池" :visible.sync="dialogVisible" size="tiny">
                                <span>确认将该项目转入项目池？</span>
                                <span slot="footer" class="dialog-footer">
                                    <el-button  @click="dialogVisible=false">取 消</el-button>
                                    <el-button  type="danger" @click="jumpPool">确 定</el-button>
                                </span>
                            </el-dialog>
                        </div>
                    </el-col>
                </el-row>

                <el-row class="message_bottom">
                    <el-col :span="24">
                        <div class="messageText">
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="项目介绍" name="first">
                                    <div class="project">
                                        <b>概述</b>
                                        <p>{{productInfo.brief}}</p>
                                        <b>详细介绍</b>
                                        <p>{{productInfo.intro}}</p>
                                        <p>产品服务</p>
                                        <p>{{productInfo.productservice}}</p>
                                        <p>用户市场</p>
                                        <p>{{productInfo.usermarket}}</p>
                                        <p>商业模式</p>
                                        <p>{{productInfo.businessModel}}</p>
                                        <p>运营数据</p>
                                        <p>{{productInfo.operationData}}</p>
                                        <b>商业计划书</b>
                                        <!-- <div v-for="(item,index) in proposalList" :key="item.index"> -->
                                        <div>
                                            <p>
                                                <span>{{productInfo.businessName}}</span>
                                                <!-- <span class="preview" @click="viewFile">预览</span> -->
                                                <a class="preview" :href="productInfo.businessPlan">预览</a>
                                                <a :href="productInfo.businessPlan" :download="productInfo.fileName" class="preview">下载</a>
                                            </p>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="融资经历" name="second">
                                    <div class="financing">
                                        <b>融资经历</b>
                                        <div v-for="(item,index) in finance" :key="item.index">
                                            <p>
                                                <span class="mgr">{{item.financedateStr}}</span>
                                                <span class="mgr">{{item.phase}}</span>
                                                <span class="mgr">融资金额 :
                                                    <span>{{item.financeamount}}</span>
                                                </span>
                                                <span class="mgr">投资方 :
                                                    <span>{{item.investment}}</span>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="创始团队" name="third">
                                    <div class="team">
                                        <b>项目团队</b>
                                        <p>
                                            团队优势
                                            <span class="mgls">{{story}}</span>
                                        </p>
                                        <p>团队成员</p>
                                        <div v-for="(item,index) in member" :key="item">
                                            <p>
                                                <span class="mgls">姓名 : &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span>{{item.name}}</span>
                                                </span>
                                            </p>
                                            <p class="mgl">职位 : 
                                                <span>{{item.jobtitle}}</span>
                                            </p>
                                            <p class="mgl">介绍 : 
                                                <span>{{item.intro}}</span>
                                            </p>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="查看工商信息" name="fourth">
                                    <div class="registration">
                                        <b>工商信息</b>
                                        <p>公司名称：
                                            <span>{{basicInfo.name}}</span>
                                        </p>
                                        <p>公司类型：
                                            <span>{{basicInfo.conpanyType}}</span>
                                        </p>
                                        <p>成立日期：
                                            <span>{{basicInfo.startdate}}</span>
                                        </p>
                                        <p>注册资本：
                                            <span>{{basicInfo.registcapi}}</span>
                                        </p>
                                        <p>法人代表：
                                            <span>{{basicInfo.opername}}</span>
                                        </p>
                                        <p>经营状态：
                                            <span>{{basicInfo.managementForms}}</span>
                                        </p>
                                        <p>登记机关：
                                            <span>{{basicInfo.registrationAuthority}}</span>
                                        </p>
                                        <p>注册地址：
                                            <span>{{basicInfo.registAddress}}</span>
                                        </p>
                                        <!-- <p>统一社会信用代码：
                                            <span>{{finance.creditCode}}</span>
                                        </p> -->
                                        <!-- <p>工商注册号：
                                            <span>{{finance.registeredNum}}</span>
                                        </p>
                                        <p>组织机构代码：
                                            <span>{{finance.institutionCode}}</span>
                                        </p> -->
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </section>
        <!--文件预览 section -->
        <section class="viewFiles" v-show="isHide">
            <div class="closeView" @click="closeView">
                <img src="/static/img/close.png">
            </div>
            <div class="fileArea">
                不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 是简单地切换元素的 CSS 属性 display 。 注意， v-show 不支持 语法，也不支持 v-else。v-if vs v-show v-if 是“真正的”条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。 惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。 相比之下， v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。 一般来说， v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件不太可能改变，则使用 v-if 较好。 v-if 与 v-for 一起使用 当 v-if 与 v-for 一起使v-if 也是用时，v-for 具有比 v-if 更高的优先级。 请查阅 列表渲染指南 以获取详细信息。 ← Class 与 Style 绑定 列表渲染 → 发现错误？想参与编辑？ 在 Github 上编辑此页！
            </div>
        </section>
    </div>
</template>

<style lang="less" scoped>
.container {
    .messageContainer {
        width: 100%;
        font-size: 14px;
        background: url(/static/img/mbg.png) no-repeat;
        background-size: 100% 100%;
        .messageContent {
            width: 93%;
            margin: 0 auto;
            padding-top: 10px;
            box-sizing: border-box;
            .message_top {
                position: relative;
                margin-bottom: 15px;
                color: #fff;
                .messageBrand img {
                    width: 100px;
                    height: 100px;
                }
                .messageIntro {
                    // width: 450px;
                    .introText {
                        >p {
                            margin-bottom: 3px;
                        }
                        div {
                            margin-bottom: 3px;
                            p {
                                display: inline;
                                margin-right: 30px;
                            }
                        }
                    }
                    .introTable {
                        width: 250px;
                        height: 85px;
                        border: 1px solid #fff;
                        border-radius: 5px;
                        .table-top {
                            height: 30px;
                            text-align: center;
                            line-height: 30px;
                            border-bottom: 1px solid #fff;
                        }
                        .table-bottom {
                            height: 55px;
                            p {
                                float: left;
                                width: 50%;
                                text-align: center;
                                line-height: 55px;
                            }
                            .table-col {
                                border-right: 1px solid #fff;
                            }
                        }
                    }
                }
                .messageBtn {
                    position: absolute;
                    bottom: 0px;
                    right: 0px;
                }
            }
            .message_bottom {
                height: 590px;
                background: #fff;
                .messageText {
                    margin: 0 25px;
                    b {
                        display: block;
                    }
                    b,
                    p {
                        margin-bottom: 15px;
                    }
                    .project {
                        .preview {
                            margin-left: 15px;
                            color: #F05E5E;
                            cursor: pointer;
                        }
                    }
                    .financing .mgr {
                        margin-right: 25px;
                    }
                    .team {
                        .mgls {
                            margin-left: 20px;
                        }
                        .mgl {
                            margin-left: 80px;
                        }
                    }
                }
            }
        }
    }
    .viewFiles {
        position: relative;
        width: 100%;
        padding: 20px 30px;
        box-sizing: border-box;
        background: #fff;
        .closeView {
            position: absolute;
            right: -16px;
            top: -16px;
            cursor: pointer;
            img {
                width: 35px;
                height: 35px;
                border: 1px solid #fff;
                border-radius: 50%;
                background: #F05E5E;
            }
        }
    }
}
</style>


<script>
import { getDate } from 'common/js/config'
export default {
    watch: {
        "$route": function(to, from) {
            // 对路由变化作出响应...
            this.activeName = window.sessionStorage.getItem("tab" + this.$route.params.userId) ? window.sessionStorage.getItem("tab" + this.$route.params.userId) : "first";
            this.messageList(this.$route.params.userId);
        }
    },
    created: function() {
        this.activeName = window.sessionStorage.getItem("tab" + this.$route.params.userId) ? window.sessionStorage.getItem("tab" + this.$route.params.userId) : "first";
        this.messageList(this.$route.params.userId);
    },
    computed: {
        user() {
            this.$store.state.login.merchants = JSON.parse(sessionStorage.getItem('merchants')) || {};
            this.$store.state.login.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
            return {
                merchants: this.$store.state.login.merchants,
                userInfor: this.$store.state.login.userInfor,
                no: this.$store.state.register.no
            }
        },
        textData() {
            return this.$store.state.textData;
        }
    },
    data() {
        return {
            confirm: false,
            dialogVisible: false,
            isShow: true,
            isHide: false,
            activeName: 'first',
            dataList: { //项目介绍
                projectName: "鹿战（体育赛事即时竞猜平台）",
                industry: "体育",
                location: "深圳",
                datetime: "2015",
                companyName: "深圳市天地同舟科技有限责任公司",
                summary: "DeerWar是一个基于真实体育赛事的Fantasy sports平台，用户可以在鹿战DeerWar平台上选择各大体育明星创建自己的虚拟俱乐部，对虚拟俱乐部的整体比赛数据进行竞猜比赛，与其他球迷PK，平台包含篮球、足球、电子竞技等体育赛事。",
                service: "",
                market: "",
                businessModel: "前期以开机广告收入作为主要盈利点，产品售卖分成为次盈利点，随着项目不断深入，拓展B端智能服务收费项目和信息导流费用，同时开启会员收费模式。",
                operationData: "截止2017年7月，已服务10万玩家",
                teamAdvantage: "团队由资深产品运营和技术大咖组成",
                teamMember: "蒋径舟",
                teamPosition: "CEO",
                teamIntro: "北京大学美国法律博士、中国法律硕士；数次创业经历",
                companySort: "有限责任公司",
                date: "2016-03-14",
                capital: "105.2632万人民币",
                delegate: "蒋径舟",
                operationState: "存续",
                authority: "深圳市市场监督管理局",
                address: "深圳市南山区粤海街道大冲商务中心C座902",
                creditCode: "91440300MA5D8EKP1U",
                registeredNum: "440301115313203",
                institutionCode: "5D8EKP1U"
            },
            proposalList: [
                { plan: "xxxxx计划书" },
                { plan: "xxxxx市场报告" }
            ],
            financeList: [
                {
                    time: "2017.04",
                    round: "pre-A轮",
                    money: "数百万人民币",
                    investor: "暂无"
                },
                {
                    time: "2016.04",
                    round: "天使轮",
                    money: "数百万人民币",
                    investor: "吴静钰"
                }
            ],
            productInfo: { //项目描述
                brief: ''
            },
            basicInfo: [], //工商信息
            company: {
                brief: '',
                citystr: '',
                createDate: '',
                foundingTime: '',
                id: '',
                industryName: '',
                lastCast: '',
                logo: '',
                name: '',
                no: '',
                phaseName: '',
                logo: '',
            }, //公司基本信息
            finance: [], //融资信息
            member: [], //董事会
            product: [], //
            story: '', //团队优势

        }
    },
    methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
            window.sessionStorage.setItem("tab" + this.$route.params.userId, this.activeName);
        },
        addTab(th, url, name) {
            this.$store.commit({ type: 'addTab', title: th, url: url, name: name });
        },
        viewFile() { //预览
            window.location.href = this.company.logo;
            this.isShow = false;
            this.isHide = true;
        },
        closeView() {
            this.isShow = true;
            this.isHide = false;
        },
        jumpPool() {
            this.dialogVisible = false;
            console.log(this.user.no);
            this.insertProjectPool(this.user.no);
        },
        insertProjectPool(no) { //添加到项目池 api
            this.$http.post(this.api + '/productClieController/insertProjectPool', {
                "no": no,//列表时候对象返回的字段
                "userId": this.user.userInfor.id,//当前登录用户uerid
                "merchantId": this.user.merchants[0].id//商户id
            })
                .then(res => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {
                            console.log(res.data);
                            this.addTab('项目池', '/home/projectPool', 'projectPool');
                            this.$router.push({ name: 'projectPool' });
                            this.$Message.success(res.data.message);
                        } else if (res.data.status == '403') {
                            this.$Message.error(res.data.message);
                        } else if (res.data.status == '9050') {
                            this.$Message.error(res.data.message);
                            return;
                        } else if (res.data.status == '9010') {
                            this.$Message.error(res.data.message);
                            return;
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error('请求超时');
                })
        },
        messageList(id) { //获取项目详情
            this.$http.post(this.api + '/productClieController/selectMessage', {
                id: id
                // id: '10'
            })
                .then(res => {
                    if (res.status == '200') {
                        if (res.data.status == '200') {
                            console.log(res.data.result);
                            this.company = res.data.result.company;
                            this.company.name = res.data.result.company.name;
                            this.finance = res.data.result.finance;
                            this.member = res.data.result.member;
                            this.product = res.data.result.product;
                            this.story = res.data.result.story;


                            if(res.data.result.productInfo != null){
                                this.productInfo = res.data.result.productInfo;
                            };
                            if(res.data.result.basicInfo != null){
                                this.basicInfo = res.data.result.basicInfo;
                            };
                            if (res.data.result.company.name != null){
                                this.company.name = res.data.result.company.name;
                            };
                            if (res.data.result.company != null){
                                this.company = res.data.result.company;
                            };
                            if (res.data.result.finance != null){
                                this.finance = res.data.result.finance;
                            };
                            if (res.data.result.product != null){
                                this.product = res.data.result.product;
                            };
                            if (res.data.result.story != null){
                                this.story = res.data.result.story;
                            };
                            this.$Message.success(res.data.message);
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error('请求超时');
                })
        },
        stateData() { //调用 actions 方法
            this.$store.dispatch({ type: 'increment' });
        }
    },
};

</script>