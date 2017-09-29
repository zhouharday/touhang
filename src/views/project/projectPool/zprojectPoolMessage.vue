<template>
    <div class="zpoolMessage">
        <div class="title">
            <div class="left">
                <span class="desc">{{title}}</span>
                <el-button size="small" class="state">{{state}}</el-button>
            </div>
            <div class="right">
                <el-button v-show="isShow" type="danger" size="small" @click="changeNormal">正常</el-button>
                <el-button v-show="show_f" type="danger" size="small" @click="investDialog=true">{{invest}}</el-button>
                <el-button v-show="show_s" type="danger" size="small" @click="observeDialog=true">{{observe}}</el-button>
                <el-button v-show="show_t" type="danger" size="small" @click="eliminateDialog=true">{{eliminate}}</el-button>
            </div>
            <!-- 确认转项目池 dialog -->
            <el-dialog title="转投资" :visible.sync="investDialog" size="tiny">
                <span>确认将该项目转投资？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="default" @click="investDialog=false">取 消</el-button>
                    <el-button type="danger" @click="jumpPre">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 确认转观察 dialog -->
            <el-dialog title="转观察" :visible.sync="observeDialog" size="tiny">
                <span>确认将该项目转观察？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="default" @click="observeDialog=false">取 消</el-button>
                    <el-button type="danger" @click="jumpObserve">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 确认转淘汰 dialog -->
            <el-dialog title="转淘汰" :visible.sync="eliminateDialog" size="tiny">
                <span>确认将该项目转淘汰？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="default" @click="eliminateDialog=false">取 消</el-button>
                    <el-button type="danger" @click="jumpEliminate">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="tabs">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="详情" name="details" class="tab_list">
                    <detail-form :basicForm="basicForm" :companyForm="companyForm" :projectId="projectPoolId" :projectData="projectData">
                    </detail-form>
                    <table-form :projectData="projectData"></table-form>
                </el-tab-pane>
                <!-- <el-tab-pane label="工商信息" name="industry" class="tab_list">
                                    <industry-form :industryForm="industryForm"></industry-form>
                                </el-tab-pane> -->
                <el-tab-pane label="融资信息" name="capital" class="tab_list">
                    <capital-table :projectData="projectData"></capital-table>
                </el-tab-pane>
                <el-tab-pane label="记录" name="record" class="tab_list">
                    <record-form></record-form>
                </el-tab-pane>
                <el-tab-pane label="文档" name="file" class="tab_list">
                    <file-table></file-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import detailForm from './details'
import tableForm from './tables'
// import industryForm from './industry'
import capitalTable from './capital'
import recordForm from './record'
import fileTable from './file'

import { getProDetail,transPro,setProjectStatus } from 'api/project'


export default {
    name: 'zprojectPoolMessage',
    data() {
        return {
            title: '双子金服投资项目',
            invest: '投资',
            observe: '观察',
            eliminate: '淘汰',
            isShow: true,
            show_f: true,
            show_s: true,
            show_t: true,
            investDialog: false,
            observeDialog: false,
            eliminateDialog: false,
            activeName: 'details',
            basicForm: {
                baseInfo: '基本信息',
                flag: false
            },
            companyForm: {
                baseInfo: '企业信息',
                flag: false
            },
            industryForm: {
                baseInfo: '工商信息',
                flag: false
            },
            projectData: {}     // 项目池详情信息
        }
    },
    created() {
        this.init();
    },
    methods: {
        ...mapActions([
            'getProjectData'
        ]),
        init() {
            this.initParams();
            this.getPoolDetail();
        },
        initParams() {
            let href = window.location.href;
            let projectPoolId = href.substr(href.lastIndexOf('/') + 1, href.length);
            this.projectPoolId = projectPoolId;
        },
        /**
         * [getPoolDetail 获取项目池详情]
         * @return {[type]} [description]
         */
        getPoolDetail() {
            let projectPoolId = this.projectPoolId;
            getProDetail(projectPoolId).then(resp => {
                let data = resp.data.result;
                let { projectInfo, projectInvestmentInfo,enterpriseInfo,listOwnershipStructure } = data;
                this.getProjectData(data);
                if (projectInfo) {
                    this.basicForm = Object.assign({}, this.basicForm, projectInfo);
                }
                if (enterpriseInfo) {
                    this.companyForm = Object.assign({}, this.companyForm, enterpriseInfo);
                }
                if(listOwnershipStructure){
                    this.structureForm = Object.assign({}, this.structureForm, listOwnershipStructure);
                }
                if(projectInfo.projectType === '4'){
                    this.show_t = false;
                    this.state = "淘汰";
                }else if(projectInfo.projectType === '3'){
                    // this.show_s = false;
                    this.state = "终止";
                }else if(projectInfo.projectType === '2'){
                    this.show_s = false;
                    this.state = "观察";
                }else {
                    this.isShow = false;
                    this.state = "正常";
                }
            }).catch(e => {
                console.log('getPoolDetail error: ', e);
            })
        },
        jumpPre() {
            let projectId = this.projectPoolId;
            transPro(projectId).then(resp => {
                this.addTab('投前项目', '/home/preProject', 'preProject');
                this.$router.push({ name: 'preProject' });
                this.investDialog=false;
            }).catch(e => {
                console.log('jumpPre error: ', e);
                this.investDialog=false;
            });
        },
        jumpObserve() {
            setProjectStatus(this.projectPoolId, '2').then(resp =>{
                this.observeDialog = !this.observeDialog;
                this.show_f = false;
                this.show_s = false;
                this.isShow = true;
                this.state = "观察";
            }).catch(e => {
                console.log('jumpObserve error: ', e);
                this.observeDialog=false;
            });

        },
        jumpEliminate() {
            setProjectStatus(this.projectPoolId, '4').then(resp =>{
                this.eliminateDialog = !this.eliminateDialog;
                this.show_f = false;
                this.show_t = false,
                this.isShow = true;
                this.state = "淘汰";
            }).catch(e => {
                console.log('jumpEliminate error: ', e);
                this.eliminateDialog=false;
            });
        },
        changeNormal() {
            setProjectStatus(this.projectPoolId, '1').then(resp =>{
                this.isShow = false;
                this.show_f = true;
                this.show_s = true;
                this.show_t = true;
                this.state = "正常";
            }).catch(e => {
                console.log('changeNormal error: ', e);
            });
        },
        addTab(th, url, name) {
            this.$store.commit({ type: 'addTab', title: th, url: url, name: name });
        }
    },
    components: {
        detailForm,
        tableForm,
        // industryForm,
        capitalTable,
        recordForm,
        fileTable
    }
}
</script>



<style lang="less" scoped>
.zpoolMessage {
    width: 100%;
    min-height: 100%;
    background-color: #fff;
    padding: 24px;
    .title {
        width: 100%;
        height: 64px;
        line-height: 64px;
        background-color: #2a3142;
        margin-bottom: 24px;
        .left {
            height: 100%;
            float: left;
            margin-left: 24px;
            font-size: 0;
            .desc {
                font-size: 20px;
                font-weight: 600;
                color: #fff;
                vertical-align: top;
            }
            .state {
                margin-left: 24px;
                vertical-align: middle;
                border-color: #ddd;
                cursor: default;
            }
        }
        .right {
            height: 100%;
            float: right;
            margin-right: 24px;
        }
    }
}
</style>
