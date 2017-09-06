<template>
    <div class="table">
        <div class="teamTable">
            <tabel-header :data="headerInfo_team" @add="method"></tabel-header>
            <el-table :data="teamData" border style="width: 100%">
                <el-table-column label="姓名" prop="name" align="center">
                </el-table-column>
                <el-table-column label="角色" prop="role" align="center">
                </el-table-column>
                <el-table-column label="添加日期" prop="date" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,teamData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加融资信息 对话框-->
            <el-dialog title="添加项目成员" :visible.sync="modalAdd" :close-on-click-modal="false">
                <el-form :model="teamForm">
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="teamForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" :label-width="formLabelWidth">
                        <el-select v-model="teamForm.role" placeholder="请选择角色" style="width:100%">
                            <el-option label="角色一" value="角色一"></el-option>
                            <el-option label="角色二" value="角色二"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="添加日期" :label-width="formLabelWidth">
                        <el-date-picker type="date" placeholder="添加日期" v-model="teamForm.date" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAdd = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAdd">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>





<script type="txt/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
import { changeDate } from 'common/js/config'
export default {
    data() {
        return {
            modalAdd: false,
            formLabelWidth: '80px',
            headerInfo_team: {
                desc: '当前项目成员',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            teamData: [
                {
                    name: '',
                    role: '',
                    date: ''
                },
                {
                    name: '',
                    role: '',
                    date: ''
                },
            ],
            teamForm: {
                name: '',
                role: '',
                date: ''
            }
        }
    },
    methods: {
        //添加 项目成员的方法
        method() {
            this.modalAdd = true;
        },
        confirmAdd() {
            this.modalAdd = false;
            this.teamForm.date = changeDate(this.teamForm.date);
            this.teamData.push(this.teamForm);
            this.clearVal();
        },
        //清除 添加项目成员对话框
        clearVal() {
            this.teamForm = {
                name: '',
                role: '',
                date: ''
            }
        },
        //删除当前行
        handleDelete(index, rows) {
            rows.splice(index, 1);
        },
    },
    components: {
        tabelHeader
    }
}
</script>



<style lang="less" scoped>
.table {
    width: 100%;
    height: 100%;
    .teamTable {
        width: 100%;
        height: 100%;
    }
}
</style>
