<template>
    <div>
        <section class="approveTable">
            <tabel-header :data="headerInfo_file"></tabel-header>
            <el-table :data="approvalData" border style="width: 100%" align="center">
                <el-table-column label="审批主题" prop="approveTitle" align="center">
                    <template scope="scope"><el-button type="text" style="color:#f05e5e" @click="openApproval(scope.row.id)">{{scope.row.approveTitle}}</el-button></template>
                </el-table-column>
                <el-table-column label="申请人" prop="userName" align="center">
                </el-table-column>
                <el-table-column label="申请时间" prop="createDate" align="center">
                </el-table-column>
                <el-table-column label="审批时间" prop="disposeDate" align="center">
                </el-table-column>
                <el-table-column label="审批状态" align="center">
                    <template scope="scope">
                        <span v-if="scope.row.disposeResult == 0">待审批</span>
                        <span v-if="scope.row.disposeResult == 1">同意</span>
                        <span v-if="scope.row.disposeResult == 2">不同意</span>
                    </template>
                </el-table-column>
            </el-table>
        </section>
        <!-- 查看进度 对话框 -->
        <progress-forms :progressModal="progressModal" :dialogTitle="dialogTitle" :isBlock='isBlock' :documentInfo="documentInfo" :table2="progressTable" @closeShowModal="closeShowModal"></progress-forms>
    </div>
</template>


<script >
import tabelHeader from 'components/tabelHeader'
import progressForms from 'components/progressDialog'
import { checkProjectAuth } from 'common/js/config'
import {getApproveList, getApproveInfo} from 'api/projectPre'
export default {
    props: {
        tabs: {
            type: Object,
            default: {}
        },
        projectId: {
            type: String,
            default: ''
        },
        isInTeam: {
            type: Boolean,
            default: false
        },
        authList: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            progressModal: false,
            approvalData: [{
                approvalName: '双子金服立项申请',
                user: '张三',
                requestDate: '2017-09-09 9:33',
                approvalDate: '2017-09-09 10:33'
            }, {
                approvalName: '',
                user: '',
                requestDate: '',
                approvalDate: ''
            }, {
                approvalName: '',
                user: '',
                requestDate: '',
                approvalDate: ''
            }],
            headerInfo_file: {
                desc: '审批'
            },
        }
    },
     watch:{
        'tabs':function (to,from){
            if(to.tabList[1]){
                this.init();
            }
        },
    },
    methods: {
        init(){
            this.isBlock = false;
        },
        checkProjectAuth(code){
            if (!this.authList) {
                return false;
            }
            return checkProjectAuth(code, this.authList) && this.isInTeam;
        },
        init(){
            getApproveList(this.projectId).then(resp => {
                if (resp.data.status == '200') {
                    this.approvalData = resp.data.result.list;
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('审批列表 error: ', e);
            });
        },
        openApproval(id){
            getApproveInfo(id).then(resp => {
                if (resp.data.status == '200') {
                    this.dialogTitle = resp.data.result.approveTitle;
                    this.documentInfo = resp.data.result.dataDocumentResult;
                    this.progressTable = resp.data.result.approveStageNodeData;
                    this.progressModal = true;
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('审批详情 error: ', e);
            });

        },
        closeShowModal(){
            this.progressModal = false;
        }
    },
    components: {
        tabelHeader,
        progressForms
    }

}
</script>



<style lang="less" scoped>
.approveTable {
    width: 100%;
    height: 100%;
    .el-table {
        span {
            margin-right: 15px;
        }
    }
}
</style>
