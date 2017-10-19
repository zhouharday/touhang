<template>
    <div>
        <section class="approveTable">
            <tabel-header :data="headerInfo_file"></tabel-header>
            <el-table :data="approvalData" border style="width: 100%" align="center">
                <el-table-column label="审批主题" prop="approvalName" align="center">
                </el-table-column>
                <el-table-column label="申请人" prop="user" align="center">
                </el-table-column>
                <el-table-column label="申请时间" prop="requestDate" align="center">
                </el-table-column>
                <el-table-column label="审批时间" prop="approvalDate" align="center">
                </el-table-column>
                <el-table-column label="审批状态" align="center">
                    <template scope="scope">
                        <span>未通过</span>
                        <span>审批中</span>
                        <span>通过</span>
                    </template>
                </el-table-column>
            </el-table>
        </section>
    </div>
</template>


<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
export default {
    props: {
        tabs: {
            type: Object,
            default: {}
        },
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
    watch: {
        'tabs':function (to,from){
            if(to.tabList[1]){
                //this.init();
            }
        }
    },
    methods: {
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
