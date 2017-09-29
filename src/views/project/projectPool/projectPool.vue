<template>
    <div class="poolContent">
        <!-- 状态ul -->
        <el-row class="common">
            <el-col :span="1">
                <div class="tag">状态：</div>
            </el-col>
            <el-col :span="23" style="margin-top:20px">
                <div class="state-ul">
                    <ul ref="state">
                        <li v-for="(item,index) in stateList" :key="item.index" :class="{active: index==currentIndex1}" @click="changeActive(index,1)">
                            {{item.states}}
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <!-- 行业ul -->
        <el-row class="common">
            <el-col :span="1">
                <div class="tag_s">行业：</div>
            </el-col>
            <el-col :span="23">
                <div class="industry-ul" :class="{ changeList: !btnObject.uptriangle }">
                    <ul ref="industry">
                        <li v-for="(item,index) in industryList" :key="item.index" :class="{active: index==currentIndex2}" @click="changeActive(index,2)">
                            {{item.details}}
                        </li>
                        <button :class="{ collapseBtn: !btnObject.uptriangle }" class="collapse-btn" @click="changeList">
                            <span :class="btnObject"></span>
                            {{collapseBtn1}}
                        </button>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <!--搜索框 -->
        <el-row class="search-box">
            <el-col :span="5">
                <el-input icon="search" v-model="input" :on-icon-click="handleIconClick" placeholder="查询关键字：项目名称">
                </el-input>
            </el-col>
            <el-col :span="4" class="addProject">
                <div @click="addProject">
                    <img src="/static/img/icon--添加项目.png">
                    <span>添加项目</span>
                </div>
            </el-col>
        </el-row>
        <!--项目table -->
        <el-row class="common">
            <el-col :span="24">
                <el-table :data="tableData" style="width:100%" max-height="700" class="table-item" :row-class-name="tableRowClassName">
                    <el-table-column label="项目" min-width="100">
                        <template scope="scope">
                            <a @click="ShowPoolMessage(scope.row,scope.$index)" class="theme">
                                <div>{{ scope.row.project }}</div>
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column label="行业" align="center">
                        <template scope="scope">
                            <div class="fow">{{ scope.row.industry }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="轮次" align="center">
                        <template scope="scope">
                            <div class="fow">{{ scope.row.round }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="所在地" align="center">
                        <template scope="scope">
                            <div class="fow">{{ scope.row.location }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="项目状态" align="center">
                        <template scope="scope">
                            <div class="fow">{{ scope.row.state }}</div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="创建人" align="center">
                                    <template scope="scope">
                                        <div class="fow">{{ scope.row.manager }}</div>
                                    </template>
                                </el-table-column> -->
                    <el-table-column label="成立时间" align="center">
                        <template scope="scope">
                            <div class="fow">{{ scope.row.datetime }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="100" align="center">
                        <template scope="scope">
                            <el-button type="text" size="small" @click="goJumpPref(scope.$index, tableData)">
                                转投资
                            </el-button>
                            <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)" v-show="scope.row.isCanDelete">
                                删除
                            </el-button>
                            <!-- 确认转项目池 dialog -->
                            <el-dialog title="转投资" :visible.sync="dialogVisible" size="tiny">
                                <span>确认将该项目转投资？</span>
                                <span slot="footer" class="dialog-footer">
                                    <el-button type="default" @click="dialogVisible=false">取 消</el-button>
                                    <el-button type="danger" @click="jumpPre">确 定</el-button>
                                </span>
                            </el-dialog>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <!--<el-row>-->
        <!--<el-col>-->
        <!--<div style="float:right;margin:10px;padding-right:30px;overflow:hidden">-->
        <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">-->
        <!--</el-pagination>-->
        <!--</div>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getPros, transPro, delPro } from 'api/project';
export default {
    name: 'projectPool',
    data() {
        return {
            total: 0,    // 总数
            page: 1,     // 当前页数
            pageSize: 5, // 一页数量
            input: '',
            collapseBtn1: '收起',
            collapseBtn2: '下拉',
            currentIndex1: 0,
            currentIndex2: 0,
            dialogVisible: false,
            btnObject: {
                uptriangle: true,
                downtriangle: false
            },
            stateList: [
                { states: "全部" },
                { states: "正常" },
                { states: "观察" },
                { states: "中止" },
                { states: "淘汰" }
            ],
            industryList: [
                { details: "全部" },
                { details: "电商" },
                { details: "社交" },
                { details: "硬件" },
                { details: "文娱传媒" },
                { details: "信息传输" },
                { details: "软件信息" },
                { details: "金融" },
                { details: "医疗健康" },
                { details: "科技推广" },
                { details: "生活消费" },
                { details: "企业服务" },
                { details: "旅游" },
                { details: "地产" },
                { details: "教育" },
                { details: "公共交通" },
                { details: "物流" },
                { details: "人工智能" },
                { details: "VR/AR" },
                { details: "体育" },
                { details: "农业" },
                { details: "共享经济" },
                { details: "游戏" }
            ],
            tableData: [
                {
                    theme: '鹿战',
                    project: '体育赛事即时竞猜平台',
                    industry: '体育',
                    round: 'Pre-A轮',
                    location: '广东省',
                    state: '正常',
                    // manager: '刘经理',
                    datetime: '2015/01/16',
                    id: 0
                }
            ]
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.initInfo();
            this.getDatas();
        },
        initInfo() {
            let merchants = JSON.parse(window.sessionStorage.getItem('merchants') || '[]');
            let info = JSON.parse(sessionStorage.getItem('userInfor') || '{}');
            this.merchantId = merchants[0].id;
            this.addProjectUserId = info.id;
        },
        getDatas() {
            let projectName = this.input;
            let projectType = this.state;
            let industryId = this.industry;

            if (projectType == '全部') projectName = '';
            if (industryId == '全部') industryId = '';

            let params = {
                merchantId: this.merchantId
            };

            if (projectName) params.projectName = projectName;
            if (projectType) params.projectType = projectType;
            if (industryId) params.industryId = industryId;

            getPros(params).then(resp => {
                let info = resp.data.listMapProjectInfo;
                let data = info.list;
                data = this.handleDatas(data);
                this.tableData = data;
                this.total = info.total || 0;
            })
        },
        pageChanged(page) {
            this.page = page;
            this.getDatas();
        },
        pageSizeChanged(pageSize) {
            console.log('pageSize: ', pageSize);
        },
        /**
         * [handleDatas 处理项目列表数据]
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        handleDatas(data = []) {
            data.forEach(item => {
                item.project = item.project_name;
                item.manager = item.createPerson;
                item.industry = item.industry_id;
                item.sort = item.project_type;
                item.round = item.project_turn_id;
                item.state = item.project_status;
                item.datetime = item.create_date;
                item.location = item.address_id;
                item.theme = 'e';
                item.isCanDelete = item.project_type === '4';
            });
            return data;
        },
        handleIconClick(ev) {
            this.getDatas();
        },
        // 点击折叠按钮，控制列表项的下拉与收起
        changeList() {
            if (this.collapseBtn1 == "收起") {
                this.collapseBtn1 = "下拉";
                this.btnObject.uptriangle = !(this.btnObject.uptriangle);
                this.btnObject.downtriangle = !(this.btnObject.downtriangle);
            } else {
                this.collapseBtn1 = "收起";
                this.btnObject.uptriangle = !(this.btnObject.uptriangle);
                this.btnObject.downtriangle = !(this.btnObject.downtriangle);
            }
        },
        // 设置table间隔行的background-color
        tableRowClassName(row, index) {
            if ((index % 2) == 0) {
                return 'info-row';
            } else {
                return 'positive-row';
            }
            return '';
        },
        ShowPoolMessage(title, ind) {
            this.index = ind;
            this.addTab(title.project + '详情页', '/home/zprojectPoolMessage/' + ind, "zprojectPoolMessage" + ind);
            this.$router.push({ name: 'zprojectPoolMessage', params: { userId: title.id } });
        },
        goJumpPref(index, data) {
            console.log('index: ', index);
            this.dialogVisible = true;
            this.jumpData = data[index] || {};
        },
        jumpPre() {
            let _data = this.jumpData;
            let merchantId = this.merchantId;
            let projectId = _data.id;
            let addProjectUserId = this.addProjectUserId;
            transPro({
                merchantId,
                projectId,
                addProjectUserId
            }).then(resp => {
                let data = resp.data;
                if (!data.message) {
                    console.log(resp);
                    this.addTab('投前项目', '/home/preProject', 'preProject');
                    this.$router.push({ name: 'preProject' });
                } else {
                    this.dialogVisible = false; // 隐藏弹框
                }
            }).catch(e => {
                console.log('jumpPre exists error: ', e);
            });
        },
        addProject() {
            this.addTab('添加项目1', '/home/addProject', 'addProject');
            this.$router.push({ name: 'addProject' });
        },
        addTab(th, url, name) {
            this.$store.commit({
                type: 'addTab',
                title: th,
                url: url,
                name: name
            });
        },
        deleteRow(index, tableData) {
            let row = tableData[index];
            let id = row.id;
            let projectType = row.project_type;
            delPro(id, projectType).then(resp => {
                let data = resp.data;
                if (!data.message) {
                    rows.splice(index, 1);
                }
            }).catch(e => {
                console.log('deleteRow exists error: ', e);
            });
        },
        changeActive(index, ind) {
            if (ind == 1) { // 状态
                let stateList = this.stateList;
                let state = stateList[index].states;
                this.state = state;
                this.currentIndex1 = index;
                this.getDatas();
            } else {        // 行业
                let industryList = this.industryList;
                let industry = this.industryList[index].details;
                this.industry = industry;
                this.currentIndex2 = index;
                this.getDatas();
            }
        }
    }
}
</script>


<style lang="less" scoped>
.poolContent {
    width: 100%;
    min-height: 100%;
    position: relative;
    font-size: 14px;
    background: #fff;
    .common {
        padding: 0 30px 20px 30px;
        ul {
            float: left;
            li {
                width: 70px;
                height: 20px;
                display: inline-block;
                box-sizing: border-box;
                margin-right: 30px;
                margin-bottom: 5px;
                cursor: pointer;
            }
        }
    }
    .changeList {
        height: 20px;
        overflow: hidden;
        position: relative;
    }

    // .collapseBtn {
    //     position: absolute;
    //     right: 0;
    //     top: 0;
    // }

    .tag {
        margin-top: 20px;
        margin-bottom: 5px;
        font-size: 14px;
        font-weight: bold;
    }

    .tag_s {
        margin-bottom: 5px;
        font-size: 14px;
        font-weight: bold;
    }

    .active {
        width: 70px;
        height: 20px;
        color: white;
        text-align: center;
        border-radius: 15px;
        background: #F05E5E;
    }

    .collapse-btn {
        width: 50px;
        color: #F05E5E;
        border: none;
        outline: none;
        background: #fff;
        position: absolute;
        right: 0;
        top: 0;
    }

    .uptriangle {
        display: inline-block;
        position: relative;
        bottom: 2px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-bottom: 6px solid red;
    }

    .downtriangle {
        display: inline-block;
        position: relative;
        top: 3px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-top: 6px solid red;
    }
    .search-box {
        margin-left: 30px;
        margin-bottom: 20px;
        .addProject {
            margin-left: 15px;
            div {
                position: relative;
                color: #F05E5E;
                cursor: pointer;
                span {
                    position: absolute;
                    top: 2px;
                    left: 30px;
                    border-bottom: 1px solid #F05E5E;
                }
            }
        }
    }
    .theme {
        font-size: 16px;
        color: #F05E5E;
        border-bottom: 1px solid #F05E5E;
    }
    .fow {
        font-weight: bold;
    }
    .project {
        color: #F05E5E;
        border-bottom: 1px solid #F05E5E;
    }
}

.page {
    width: 100%;
    padding: 15px 30px;
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>
