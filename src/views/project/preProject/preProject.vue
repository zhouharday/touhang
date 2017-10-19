<template>
    <section class="preContent">
        <!-- 阶段ul -->
        <my-filter :chooseInfo="projectStage" @getIdInfo="clickStage"></my-filter>
        <!-- 类型ul -->
        <my-filter :chooseInfo="projectType" @getIdInfo="clickType"></my-filter>
        <!--搜索框 -->
        <el-row class="search-box">
            <el-col :span="5">
                <el-input icon="search" v-model="projectName" @keyup.enter.native="getDatas" :on-icon-click="handleIconClick" placeholder="关键字：项目名称">
                </el-input>
            </el-col>
        </el-row>

        <!--项目table -->
        <div class="tableBox">
            <el-table :data="tableData" style="width:100%" max-height="700" class="table-item" :row-class-name="tableRowClassName">
                <el-table-column label="项目名称" align="center">
                    <template scope="scope">
                        <a class="project" @click="ShowPreMessage(scope.row.projectId, scope.row.id, scope.row.projectName, scope.$index)">{{ scope.row.projectName }}</a>
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
                        <el-button type="text" size="small" @click="goAddTeam(scope.row.id)">项目团队</el-button>
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
                    <el-form-item label="姓名" prop="userId">
                        <el-select v-model="teamForm.userId" placeholder="请选择姓名" style="width:100%">
                            <el-option v-for="item in proUsers" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="角色" prop="roleId">
                        <el-select v-model="teamForm.roleId" placeholder="请选择角色" style="width:100%">
                            <el-option v-for="item in proRoles" :key="item.id" :label="item.roleName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="default" @click="modalAdd = false">取 消</el-button>
                    <el-button type="danger" @click="confirmAdd('teamForm')">保 存</el-button>
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
import {changeDate} from 'common/js/config'
import { getPres, addInsertProjectTeam } from 'api/projectPre';
import { getProjectUsers } from 'api/projectSys';
import { queryList } from 'api/fund'
import deleteReminders from 'components/deleteReminders'
import myFilter from 'components/myFilter'

const PROJECT_TYPE = 0; // 项目角色列表参数: 0，是项目角色 1是基金角色
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
                userId: '',
                roleId: '',
                editFlag: false
            },
            proUsers: [], // 项目用户列表
            proRoles: [], // 项目角色列表
            rules: {
                userId: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }],
                roleId: [{
                    required: true,
                    message: '请选择角色',
                    trigger: 'blur'
                }]
            },
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
    watch: {
        '$route'(to, from) {
            if(to.name == 'preProject')
            this.init();
        }
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
            this.getProUsers();
            this.getProRoles();
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
                // alert(123);
                console.log(resp.data);
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
        ShowPreMessage(projectId, investProjectId, title, idx) {
            this.addTab('投资项目-' + title, '/home/preProjectMessage/' + projectId + '/' + investProjectId, 'preProjectMessage/' + projectId + '/' + investProjectId);
            this.$router.push({name: 'preProjectMessage', params: { userId: projectId, investProjectId: investProjectId}});
        },
        addTab(th, url, name) {
            this.$store.commit({
                type: 'addTab',
                title: th,
                url: url,
                name: name
            });
        },
        /**
         * [getProUsers 获取项目用户列表]
         * @return {[type]} [description]
         */
        getProUsers() {
            getProjectUsers({
                merchantId: this.merchantId
            }).then(resp => {
                let data = resp.data;
                if (data.status == '200') {
                    this.proUsers = data.result;
                }
            }).catch(e => {
                console.log('getProjectUsers() exists error: ', e);
            });
        },
        /**
         * [getProRoles 获取项目角色列表]
         * @return {[type]} [description]
         */
        getProRoles() {
            queryList(PROJECT_TYPE).then(resp => {
                let data = resp.data;
                if (data.status == '200') {
                    this.proRoles = data.result;
                }
            }).catch(e => {
                console.log('获取项目角色列表 error: ', e);
            });
        },
        goAddTeam(investId){
            this.teamForm.investProjectId = investId
            this.modalAdd=true;
        },
        confirmAdd(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.teamForm.createDate= changeDate(new Date());
                    addInsertProjectTeam(this.teamForm).then((res) => {
                        if(res.status == '200') {
                            this.$Message.success(res.data.message || '添加成功！')
                            this.modalAdd = !this.modalAdd;
                            this.teamForm = {
                                userId: '',
                                roleId: '',
                                editFlag: false
                            };
                            this.getDatas();
                        }
                    }).catch(err => {
                        this.$Message.error(err.data.message || '添加失败！')
                    })
                } else {
                    return false
                }
            });
        },
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
