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
                        <li v-for="(item,index) in stateList" :key="item.value" :class="{active: item.value==currentIndex1}" @click="changeActive(index)">
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
                        <li v-for="(item,index) in $store.state.project.industryOptionsII" :key="item.id" :class="{active: item.id==currentIndex2}" @click="changeIndustry(item.id)">
                            {{item.dicName}}
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
                <el-input icon="search" v-model="pName" @keyup.enter.native="getDatas" :on-icon-click="handleIconClick" placeholder="查询关键字：项目名称">
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
                                <div>{{ scope.row.project_name}}</div>
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column label="行业" align="center">
                        <template scope="scope">
                            <div class="fow">{{ scope.row.industry}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="轮次" align="center">
                        <template scope="scope">
                            <div class="fow">{{ scope.row.projectTurn}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="所在地" align="center">
                        <template scope="scope">
                            <div class="fow">{{ scope.row.address}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="项目状态" align="center">
                        <template scope="scope">
                            <div class="fow">{{ scope.row.project_type}}</div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="创建人" align="center">
                                                    <template scope="scope">
                                                        <div class="fow">{{ scope.row.manager }}</div>
                                                    </template>
                                                </el-table-column> -->
                    <el-table-column label="成立时间" align="center">
                        <template scope="scope">
                            <div class="fow">{{ scope.row.create_date}}</div>
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
                <div class="pagination">
                    <el-pagination @size-change="pageSizeChanged" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDicChildrenII } from 'common/js/dictionary'
import { getPros, transPro, delPro } from 'api/project';
export default {
    name: 'projectPool',
    computed: mapGetters({
        industryOptionsII: 'getindustryOptionsII',   // 获取项目所属行业
    }),
    data() {
        return {
            total: 0,    // 总数
            page: 1,     // 当前页数
            pageSize: 5, // 一页数量
            pName: '',
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
                { states: "全部", value: '' },
                { states: "正常", value: '1' },
                { states: "观察", value: '2' },
                { states: "中止", value: '3' },
                { states: "淘汰", value: '4' }
            ],
            tableData: [],
            industryOptionsII: []
        }
    },
    created() {
        this.$store.dispatch('getIndustryOptionsII');
        this.init();
    },
    mounted() {
    },
    beforeCreate() {
    },
    watch: {
        '$route'(to, from) {
            if(to.name == 'projectPool')
            this.init();
        }
    },
    methods: {
        init() {
            this.initInfo();
            this.getDatas();
            // this.refresh();
        },
        initInfo() {
            let merchants = JSON.parse(window.sessionStorage.getItem('merchants') || '[]');
            let info = JSON.parse(sessionStorage.getItem('userInfor') || '{}');
            this.merchantId = merchants[0].id;
            this.addProjectUserId = info.id;
        },
        getDatas() {
            let projectName = this.pName;
            let projectType = this.state;
            let industryId = this.industry;
            if (projectType == '全部') projectType = '';
            if (industryId == '0') industryId = '';
            let params = {
                merchantId: this.merchantId,
                pageSize: this.pageSize,
                page: this.page,
                identification: '12'
            };

            if (projectName) params.projectName = projectName;
            if (projectType) params.projectType = projectType;
            if (industryId) params.industryId = industryId;

            getPros(params).then(resp => {
                // alert(888);
                let info = resp.data.listMapProjectInfo;
                let data = info.list;
                this.tableData = [];
                this.tableData = this.handleDatas(data);
                this.total = info.total || 0;
                // this.tableData.push();
            })
        },
        handleCurrentChange(page) {
            this.page = page;
            this.getDatas();
        },
        pageSizeChanged(pageSize) {
            this.pageSize = pageSize;
            this.getDatas();
        },
        /**
         * [handleDatas 处理项目列表数据]
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        handleDatas(data = []) {
            data.forEach(item => {
                item.isCanDelete = item.project_type === '4';
                item.project_name = item.project_name;
                item.createPerson = item.createPerson;
                item.industry = item.industry;
                item.projectTurn = item.projectTurn;
                if (item.project_type === '1') {
                    item.project_type = '正常'
                } else if (item.project_type === '2') {
                    item.project_type = '观察'
                } else if (item.project_type === '3') {
                    item.project_type = '中止'
                } else if (item.project_type === '4') {
                    item.project_type = '淘汰'
                }
                item.create_date = item.create_date;
                item.address = item.address;
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
            this.addTab(title.project_name + '详情页', '/home/zprojectPoolMessage/' + title.id, "zprojectPoolMessage/" + title.id);
            this.$router.push({ name: 'zprojectPoolMessage', params: { userId: title.id } });
        },
        goJumpPref(index, data) {
            this.dialogVisible = true;
            this.jumpData = data[index] || {};
        },
        refresh() {
            let href = location.href;
            let index = href.indexOf('#');
            let url = href.substr(0, index);
            window.location.href = url + '#/home/projectPool';
        },
        jumpPre() {
            let _data = this.jumpData;
            let merchantId = this.merchantId;
            let projectId = _data.id;
            let addProjectUserId = this.addProjectUserId;
            transPro(projectId).then(resp => {
                this.dialogVisible = false; // 隐藏弹框
                if (resp.data.status == '200') {
                    this.addTab('投前项目', '/home/preProject', 'preProject');
                    this.$router.push({ name: 'preProject' });
                }
            }).catch(e => {
                console.log('jumpPre exists error: ', e);
            });
        },
        addProject() {
            this.addTab('添加项目', '/home/addProject', 'addProject');
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
        changeActive(index) {
            // 状态
            let stateList = this.stateList;
            let state = stateList[index].value;
            this.state = state;
            this.currentIndex1 = index;
            this.getDatas();
        },
        changeIndustry(id) {
            // 行业
            this.industry = id;
            this.currentIndex2 = id;
            this.getDatas();

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
    } // .collapseBtn {
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
        /*font-weight: bold;*/
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
