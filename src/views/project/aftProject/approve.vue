<template>
    <div>
        <section class="approveTable">
            <tabel-header :data="headerInfo_file"></tabel-header>
            <el-table :data="approvalData" border style="width: 100%" align="center">
                <el-table-column label="审批主题" prop="approveTitle" align="center">
                </el-table-column>
                <el-table-column label="申请人" prop="userName" align="center">
                </el-table-column>
                <el-table-column label="申请时间" prop="createDate" align="center">
                </el-table-column>
                <el-table-column label="审批时间" prop="disposeDate" align="center">
                </el-table-column>
                <el-table-column label="审批状态" align="center">
                    <template scope="scope">
                        <span v-if="scope.row.disposeResult == 0">审批中</span>
                        <span v-if="scope.row.disposeResult == 1">同意</span>
                        <span v-if="scope.row.disposeResult == 2">不同意</span>
                    </template>
                </el-table-column>
            </el-table>
        </section>
    </div>
</template>


<script >
import tabelHeader from 'components/tabelHeader'
import {getApproveList} from 'api/projectPre'
export default {
    props: {
        tabs: {
            type: Object,
            default: {}
        },
        projectId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
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
            if(to.tabList[3]){
                this.init();
            }
        },
    },
    methods: {
        init(){
            getApproveList(this.projectId).then(resp => {
                console.log("审批列表："+JSON.stringify(resp.data));
                if (resp.data.status == '200') {
                    this.approvalData = resp.data.result.list;
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('审批列表 error: ', e);
            });
        }
    },
    components: {
        tabelHeader
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
