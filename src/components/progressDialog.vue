<template>
    <!-- 查看进度 对话框 -->
    <div class="progressBox">
        <el-dialog title="查看进度" :visible.sync="progressModal" :close-on-click-modal="false">
            <div style="height:2px;border-bottom: 1px solid #f05e5e"></div>
            <div class="title_f" style="background:#2a3142;color:#fff">
                <div class="desc">
                    <span>AAA项目XX申请</span>
                </div>
            </div>
            <div v-for="(item,index) in appendixList" :key="item.index">

            </div>
            
            <el-table :data="table" style="margin:15px 0;" :row-class-name="tableRowClassName">
                <el-table-column prop="node" label="审批节点" align="center">
                </el-table-column>
                <el-table-column prop="operator" label="处理人" align="center">
                </el-table-column>
                <el-table-column prop="startingTime" label="开始时间" align="center" width="210">
                </el-table-column>
                <el-table-column prop="conclusion" label="结论" align="center">
                </el-table-column>
                <el-table-column prop="notes" label="意见备注" align="center">
                    <template scope="scope">
                        <el-button type="text">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>


<script type="text/ecmascript-6">
export default {
    props: {
        progressModal: {
            type: Boolean,
            default: false
        },
        appendixList: {
            type: Array,
            default: [
                {listName: '调研报告1'},
                 {listName: '调研报告2'}
            ]
        },
        table: {
            type: Array
        }
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
// 小双助手 查看进度对话框中的样式
.title_f {
    margin-top: 20px;
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    .desc {
        flex: 1;
        text-align: left;
        span {
            color: #fff;
            margin-left: 50px;
        }
    }
}

</style>