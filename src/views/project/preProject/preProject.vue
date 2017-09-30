<template>
    <section class="preContent">
        <!-- 阶段ul -->
        <my-filter :chooseInfo="projectStage" @getIdInfo="clickStage"></my-filter>
        <!-- 类型ul -->
        <my-filter :chooseInfo="projectType" @getIdInfo="clickType"></my-filter>
        <!--搜索框 -->
        <el-row class="search-box">
            <el-col :span="5">
                <el-input icon="search" v-model="projectName" :on-icon-click="handleIconClick" placeholder="关键字：项目名称">
                </el-input>
            </el-col>
            <!-- 后期所做导入和下载模板功能 -->
            <!-- <el-col :span="19" class="imdo">
                <div class="importProject">
                    <el-upload class="upload-demo" ref="upload" action="" :auto-upload="false">
                        <el-button type="text">导入</el-button>
                    </el-upload>
                    <a href="/static/img/templet.txt" download="xxxxx模板">下载模板</a>
                </div>
            </el-col> -->
        </el-row>

        <!--项目table -->
        <div class="tableBox">
            <el-table :data="tableData" style="width:100%" max-height="700" class="table-item" :row-class-name="tableRowClassName">
                <el-table-column label="项目名称" align="center">
                    <template scope="scope">
                        <a class="project" @click="ShowPreMessage(scope.row.projectId, scope.row.projectName, scope.$index)">{{ scope.row.projectName }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="mananger" label="项目创建人" align="center">
                    <template scope="scope">
                        <div class="fow">{{ scope.row.createUserName}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="industry" label="所属行业" align="center">
                    <template scope="scope">
                        <div class="fow">{{ scope.row.industry}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="sort" label="项目类型" align="center">
                    <template scope="scope">
                        <div class="fow">{{ scope.row.projectType}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="stage" label="项目阶段" align="center">
                    <template scope="scope">
                        <div class="fow">{{ scope.row.projectState}}</div>
                    </template>
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
        </div>
        <!-- 分页 -->
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[3, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
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
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDicChildrenII } from 'common/js/dictionary'
import myFilter from 'components/myFilter'
import { getPres } from 'api/projectPre';
import { getProjectUsers, getProjectRoles } from 'api/projectSys';
import deleteReminders from 'components/deleteReminders'
export default {
    name: 'preProject',
    computed: mapGetters({
        typeOptionsII:'getTypeOptionsII',       // 获取项目类型
        stageOptionsII:'getStageOptionsII'      // 获取项目阶段
    }),
    data() {
        return {
            total: 0,    // 总数
            page: 1,     // 当前页数
            pageSize: 10, // 一页数量
            // 项目成员
            modalAdd: false,
            // 删除按钮组件
            deleteReminders: false,
            modal_loading: false,
            message: '是否确认从投资项目中删除该项目？',
            projectName: '',
            projectTypeId: '',
            projectType:{
                title: '项目类型：',
                details: []
            },
            projectStageId: '',
            projectStage:{
                title: '项目阶段：',
                details: []
            },
            tableData: [],
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
    created() {
        this.$store.dispatch('getStageOptionsII').then(() => {
            this.projectStage.details = this.stageOptionsII
        });
        this.$store.dispatch('getTypeOptionsII').then(() => {
            this.projectType.details = this.typeOptionsII
        });
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
            let params = {
                merchantId: this.merchantId,
                userId: this.addProjectUserId,
                projectStageId: this.projectStageId,
                projectTypeId: this.projectTypeId,
                projectName: this.projectName,
                page: this.page,
                pageSize: this.pageSize
            };
            getPres(params).then(resp => {
                let data = resp.data;
                let result = data.result;
                let list = result.list;
                this.tableData = list || [];
                this.total = result.total || 0;
            }).catch(e => {
                // console.log('getPres exists error: ', e);

            });
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.getDatas();
        },
        handleCurrentChange(page) {
            this.page = page;
            this.getDatas();
        },
        /**
         * [handleIconClick 列表模糊查询]
         * @param  {[type]} ev [description]
         * @return {[type]}    [description]
         */
        handleIconClick(ev) {
            this.getDatas();
        },
        clickType(index, id) {
            this.projectTypeId = index == 0 ? '' : id;
            this.getDatas();
        },
        clickStage(index, id) {
            this.projectStageId = index == 0 ? '' : id;
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
        ShowPreMessage(projectId, title, idx) {
            this.addTab('投资项目-' + title + '详情页', '/home/preProjectMessage/' + idx, 'preProjectMessage/' + idx);
            this.$router.push({ name: 'preProjectMessage', params: { userId: projectId } });
        },
        addTab(th, url, name) {
            this.$store.commit({
                type: 'addTab',
                title: th,
                url: url,
                name: name
            });
        },
        deleteRow(index = 0, rows = []) {
            let row = rows[index];
            console.log('row: ', JSON.stringify(row));
            // rows.splice(index, 1);
        }
        // ,
        // /**
        //  * [changeActive 搜索查询]
        //  * @param  {[type]} index [description]
        //  * @param  {[type]} ind   [description]
        //  * @return {[type]}       [description]
        //  */
        // changeActive(index, ind) {
        //     let data = [];
        //     let currentData;
        //     let object;
        //     if (ind == 1) { // 项目阶段
        //         data = this.stageList;
        //         currentData = data[index];
        //         object = currentData.stages;
        //         this.stageId = object;
        //         this.currentIndex1 = index;
        //     } else {        // 项目类型
        //         data = this.sortList;
        //         currentData = data[index];
        //         object = currentData.sorts;
        //         this.projectType = object;
        //         this.currentIndex2 = index;
        //     }
        //     this.getDatas();
        // }
    },
    components: {
        deleteReminders,
        myFilter
    },
}
</script>


<style lang="less" scoped>
.preContent {
    position: relative;
    width: 100%;
    min-height: 100%;
    font-size: 14px;
    padding: 20px 30px;
    background: #fff;
    .search-box {
        margin: 20px 0;
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
    .page {
        width: 100%;
        text-align: right;
        padding: 15px 30px;
        position: absolute;
        bottom: 0;
        right: 0;
    }
}
</style>
