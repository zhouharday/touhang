<template>
<div class="examine">
    <tabel-header :data="headerInfo" @method="method"></tabel-header>
    <el-table :data="examineData" border style="width: 100%">
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
                <div v-if="scope.row.disposeResult === 0">审批中</div>
                <div v-else-if="scope.row.disposeResult === 1">同意</div>
                <div v-else>拒绝</div>
            </template>
        </el-table-column>
        <!-- <el-table-column label="操作">
            <template scope="scope">
                <el-button type="text" size="small">删除</el-button>
              </template>
        </el-table-column> -->
    </el-table>

    <!-- 添加成员 对话框-->
    <el-dialog title="添加成员"
               :visible.sync="modalAdd"
               :close-on-click-modal="false">
        <el-form :model="formExamine">
            <el-form-item label="审批主题" :label-width="formLabelWidth">
                <el-input v-model="formExamine.theme" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="申请人" :label-width="formLabelWidth">
                <el-input v-model="formExamine.applicant" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="申请时间" :label-width="formLabelWidth">
                <el-date-picker type="date"
                                placeholder="选择日期"
                                v-model="formExamine.date"
                                style="width: 100%;">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="审批时间" :label-width="formLabelWidth">
                <el-date-picker type="date"
                                placeholder="选择日期"
                                v-model="formExamine.date"
                                style="width: 100%;">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="审批状态" :label-width="formLabelWidth">
                <el-select v-model="formExamine.status" placeholder="角色" style="width:100%;">
                    <el-option label="通过" value="通过"></el-option>
                    <el-option label="未通过" value="未通过"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="modalAdd = false">取 消</el-button>
            <el-button type="primary" @click="confirmExamine">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
export default {
    props: {
        examineData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            formLabelWidth: '80px',
            modalAdd: false,
            teamData: [{
                theme: '主题一',
                applicant: '安红',
                apply: '2017-05-20',
                approval: '2017-09-20',
                status: '通过'
            }, {
                theme: '主题一',
                applicant: '安红',
                apply: '2017-05-20',
                approval: '2017-09-20',
                status: '未通过'
            }, {
                theme: '主题一',
                applicant: '安红',
                apply: '2017-05-20',
                approval: '2017-09-20',
                status: '通过'
            }, {
                theme: '主题一',
                applicant: '安红',
                apply: '2017-05-20',
                approval: '2017-09-20',
                status: '未通过'
            }],
            formExamine: {
                theme: '',
                applicant: '',
                apply: '',
                approval: '',
                status: ''
            },
            headerInfo: {
                desc: '审批详情',
                icon_b: 'plus-round',
                explain_b: '新建审批'
            }
        }
    },
    methods: {
        confirmExamine() {
            this.modalAdd = false
        },
        method() {
            this.modalAdd = true
        },
    },
    components: {
        tabelHeader
    }
}
</script>

<style lang="less" scoped>
.examine{
    width: 100%;
    height: 100%;
}
</style>
