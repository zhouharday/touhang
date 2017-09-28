<template>
    <div class="preContent">
        <!-- 阶段ul -->
        <el-row class="common">
            <el-col :span="2">
                <div class="tag">项目阶段：</div>
            </el-col>
            <el-col :span="22" style="margin-top:20px">
                <div class="state-ul">
                    <ul ref="state">
                        <li v-for="(item,index) in stageList" :key="item.index" :class="{active: index==currentIndex1}" @click="changeActive(index,1)">
                            {{item.stages}}
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <!-- 类型ul -->
        <el-row class="common">
            <el-col :span="2">
                <div class="tag_s">项目类型：</div>
            </el-col>
            <el-col :span="22">
                <div class="sort-ul">
                    <ul ref="sort">
                        <li v-for="(item,index) in sortList" :key="item.index" :class="{active: index==currentIndex2}" @click="changeActive(index,2)">
                            {{item.sorts}}
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <!--搜索框 -->
        <el-row class="search-box">
            <el-col :span="5">
                <el-input icon="search" v-model="projectName" :on-icon-click="handleIconClick" placeholder="关键字：项目名称">
                </el-input>
            </el-col>
            <el-col :span="19" class="imdo">
                <!-- 后期所做导入和下载模板功能 -->
                <!-- <div class="importProject">
                                                   <el-upload class="upload-demo" ref="upload"
                                                        action="" :auto-upload="false">
                                                        <el-button type="text">导入</el-button>
                                                   </el-upload>
                                                   <a href="/static/img/templet.txt" download="xxxxx模板">下载模板</a>
                                               </div> -->
            </el-col>
        </el-row>
        <!--项目table -->
        <el-row class="common">
            <el-col :span="24">
                <el-table :data="tableData" style="width:100%" max-height="700" class="table-item" :row-class-name="tableRowClassName">
                    <el-table-column label="项目名称" align="center">
                        <template scope="scope">
                            <a class="project" @click="ShowPreMessage(scope.row,scope.$index)">{{ scope.row.project }}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createUserName" label="项目创建人" align="center">
                    </el-table-column>
                    <el-table-column prop="industry" label="所属行业" align="center">
                    </el-table-column>
                    <el-table-column prop="projectType" label="项目类型" align="center">
                    </el-table-column>
                    <el-table-column prop="projectState" label="项目阶段" align="center">
                    </el-table-column>
                    <el-table-column label="操作" min-width="100" align="center">
                        <template scope="scope">
                            <el-button type="text" size="small" @click="modalAdd=true">
                                项目团队
                            </el-button>
                            <el-button type="text" size="small" @click="deleteReminders=true">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <div style="float:right;margin:10px;padding-right:30px;overflow:hidden">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
        <!-- 添加项目成员 对话框-->
        <div class="teamBox">
            <el-dialog title="添加项目成员" :visible.sync="modalAdd" size="tiny" :close-on-click-modal="false">
                <el-form :model="teamForm" :rules="rules" ref="teamForm" label-width="80px">
                    <el-form-item label="姓名" prop="name">
                        <el-select v-model="teamForm.name" placeholder="请选择姓名" style="width:100%">
                            <el-option v-for="item in nameOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="角色" prop="role">
                        <el-select v-model="teamForm.role" placeholder="请选择角色" style="width:100%">
                            <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="添加日期" prop="date">
                        <el-input placeholder="默认当前日期" v-model="teamForm.date" style="width: 100%;">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="default" @click="modalAdd = false">取 消</el-button>
                    <el-button type="danger" @click="modalAdd = false">保 存</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 删除弹出框 -->
        <delete-reminders :deleteReminders="deleteReminders" :message="message" :modal_loading="modal_loading" @del="deleteReminders=false" @cancel="deleteReminders=false">
        </delete-reminders>
    </div>
</template>
<script>
import { getPres } from 'api/projectPre';
import { getProjectUsers, getProjectRoles } from 'api/projectSys';
import deleteReminders from 'components/deleteReminders'
export default {
    name: 'preProject',
    data() {
        return {
            // 项目成员
            modalAdd: false,
            // 删除按钮组件
            deleteReminders: false,
            modal_loading: false,
            message: '是否确认从投资项目中删除该项目？',
            projectName: '',
            projectType: '',
            input: '',
            currentIndex1: 0,
            currentIndex2: 0,
            stageList: [
                { stages: "全部" },
                { stages: "考察储备" },
                { stages: "立项会" },
                { stages: "尽职调查" },
                { stages: "投决会" },
                { stages: "管理" },
                { stages: "项目退出" }
            ],
            sortList: [
                { sorts: "全部" },
                { sorts: "天使" },
                { sorts: "并购重组" },
                { sorts: "PE" },
                { sorts: "VC" }
            ],
            tableData: [{
                project: '京东',
                mananger: '刘经理',
                industry: '房地产',
                sort: 'PE',
                stage: '立项会',
                id: 0
            }],
            teamForm: { //项目团队表单
                name: '',
                role: '',
                date: '',
                editFlag: false
            },
            nameOptions: [
                { //姓名列表
                    value: '选项1',
                    label: '王二'
                }
            ],
            roleOptions: [
                { //角色列表
                    value: '选项1',
                    label: '角色一'
                }
            ]
        }
    },
    components: {
        deleteReminders
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
            let projectType = this.projectType;
            let projectName = this.projectName;
            let stageId = this.stageId;

            if (projectType == '全部') projectType = '';
            if (stageId == '全部') stageId = '';

            let params = {
                merchantId: this.merchantId,
                userId: this.addProjectUserId,
                projectStageId: stageId,
                projectTypeId: projectType,
                projectName: projectName,
                page: this.page,
                pageSize: this.pageSize
            };

            getPres(params).then(resp => {
                let data = resp.data;
                let result = data.result;
                let list = result.list;
                list = this.handleDatas(list);
                this.tableData = list || [];
                this.total = result.total || 0;
                console.log(result);
            }).catch(e => {
                // console.log('getPres exists error: ', e);

            });
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
                item.project = item.projectName;
                item.mananger = item.createUserId;
                item.industry = item.industryId;
                item.sort = item.projectTypeId;
                item.stage = item.projectStageId;
            });
            return data;
        },
        /**
         * [handleIconClick 列表模糊查询]
         * @param  {[type]} ev [description]
         * @return {[type]}    [description]
         */
        handleIconClick(ev) {
            this.getDatas();
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
        ShowPreMessage(title, ind) {
            this.index = ind;
            this.addTab('投前' + title.project + '详情页', '/home/preProjectMessage/' + ind, 'preProjectMessage/' + ind);
            this.$router.push({ name: 'preProjectMessage', params: { userId: title.id } });
        },
        addTab(th, url, name) {
            this.$store.commit({ type: 'addTab', title: th, url: url, name: name });
        },
        deleteRow(index = 0, rows = []) {
            let row = rows[index];
            console.log('row: ', JSON.stringify(row));
            // rows.splice(index, 1);
        },
        /**
         * [changeActive 搜索查询]
         * @param  {[type]} index [description]
         * @param  {[type]} ind   [description]
         * @return {[type]}       [description]
         */
        changeActive(index, ind) {
            let data = [];
            let currentData;
            let object;
            if (ind == 1) { // 项目阶段
                data = this.stageList;
                currentData = data[index];
                object = currentData.stages;
                this.stageId = object;
                this.currentIndex1 = index;
            } else {        // 项目类型
                data = this.sortList;
                currentData = data[index];
                object = currentData.sorts;
                this.projectType = object;
                this.currentIndex2 = index;
            }
            this.getDatas();
        }
    }
}
</script>


<style lang="less" scoped>
.preContent {
    position: relative;
    width: 100%;
    min-height: 100%;
    font-size: 14px;
    background: #fff;
}

.common {
    padding: 0 30px 20px 30px;
    ul {
        float: left;
        li {
            display: inline-block;
            box-sizing: border-box;
            margin-right: 30px;
            margin-bottom: 5px;
            cursor: pointer;
        }
    }
}

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

.search-box {
    margin: 0 30px 20px 30px;
    .imdo {
        height: 30px;
        display: flex;
        justify-content: flex-end;
        .importProject {
            width: 115px;
            height: 100%;
            position: relative;
            a {
                position: absolute;
                bottom: 3px;
                left: 55px;
                color: #F05E5E;
                border-bottom: 1px solid #F05E5E;
            }
        }
    }
}

.project {
    color: #F05E5E;
    border-bottom: 1px solid #F05E5E;
}
</style>
