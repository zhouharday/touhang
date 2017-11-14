<template>
<div class="examine">
    <tabel-header :data="headerInfo" @method="method"></tabel-header>
    <el-table :data="examineData" style="width: 100%">
        <el-table-column label="审批主题" align="center">
            <template scope="scope">
                <div @click="showExamineModal(scope.$index, scope.row)" class="title">
                    <span>{{scope.row.approveTitle}}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="申请人" prop="userName" align="center">
        </el-table-column>
        <el-table-column label="申请时间" prop="createDate" align="center">
        </el-table-column>
        <el-table-column label="审批时间" prop="disposeDate" align="center">
        </el-table-column>
        <el-table-column label="审批状态" align="center">
            <template scope="scope">
                <div v-if="scope.row.disposeResult === 0">审批中</div>
                <div v-else-if="scope.row.disposeResult === 1">同意</div>
                <div v-else>拒绝</div>
            </template>
        </el-table-column>
    </el-table>
    <progress-dialog :progressModal="progressModal" :documentInfo="documentList" :table2="nodeList" @closeShowModal="closeShowModal"></progress-dialog>
</div>
</template>

<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
import progressDialog from 'components/progressDialog'
import {
    getApproveInfo
} from 'api/fund'
export default {
    props: {
        examineData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            teamData: [],
            headerInfo: {
                desc: '审批详情'
            },
            documentList: [], // 文档列表
            nodeList: [], // 审批节点、阶段
            progressModal: false // 查看进度对话框
        }
    },
    methods: {
        showExamineModal(index, row) {
            getApproveInfo(row.id).then((res) => {
                if (res.status === 200 && res.data.result) {
                    this.documentList = res.data.result.dataDocumentResult || []
                    this.nodeList = res.data.result.approveStageNodeData || []
                    this.progressModal = true
                }
            }).catch(err => {
                this.$Message.error(err.data.message || '获取详情失败！')
            })
        },
        closeShowModal() {
            this.progressModal = false
        }
    },
    components: {
        tabelHeader,
        progressDialog
    }
}
</script>

<style lang="less" scoped>
.examine {
    width: 100%;
    height: 100%;
    .title {
        color: #f05e5e;
    }
}
</style>
