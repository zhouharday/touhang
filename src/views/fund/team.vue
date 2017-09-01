<template>
<div class="team">
    <tabel-header :data="headerInfo" @method="method"></tabel-header>
    <el-table :data="teamData" border style="width: 100%">
        <el-table-column label="姓名" prop="name">
        </el-table-column>
        <el-table-column label="角色" prop="role">
        </el-table-column>
        <el-table-column label="添加日期" prop="date">
        </el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
                <el-button type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 添加成员 对话框-->
    <el-dialog title="添加成员"
               :visible.sync="modalAdd"
               :close-on-click-modal="false">
        <el-form :model="formTeam">
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="formTeam.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select v-model="formTeam.role" placeholder="角色" style="width:100%;">
                    <el-option label="角色一" value="shanghai"></el-option>
                    <el-option label="角色二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="添加日期" :label-width="formLabelWidth">
                <el-date-picker type="date"
                                placeholder="选择日期"
                                v-model="formTeam.date"
                                style="width: 100%;">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="modalAdd = false">取 消</el-button>
            <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
import {changeDate} from 'common/js/config'
export default {
    data() {
        return {
            modalAdd: false,
            formLabelWidth: '80px',
            formTeam: {
                name: '',
                role: '',
                date: ''
            },
            teamData: [{
                name: '王小虎',
                role: '安红、我想你',
                date: '2016-05-03'
            }, {
                name: '王小虎',
                role: '安红、我想你',
                date: '2016-05-03'
            }],
            headerInfo: {
                desc: '当前成员',
                icon_b: 'plus-round',
                explain_b: '添加'
            },
            ruleValidate: {
                name: [{
                    required: true,
                    message: '姓名不能为空',
                    trigger: 'blur'
                }],
                role: [{
                    required: true,
                    message: '角色不能为空',
                    trigger: 'blur'
                }],
                date: [{
                    required: true,
                    type: 'date',
                    message: '请选择日期',
                    trigger: 'change'
                }]
            }
        }
    },
    methods: {
        method() {
            this.modalAdd = true
        },
        confirmAdd() {
            this.modalAdd = false
            this.formTeam.date = changeDate(this.formTeam.date)
            // Object.keys(this.formTeam).map((key) => {
            //     this.formTeam[key] = ''
            // })
            if(this.formTeam.name !== '') {
                this.teamData.push(this.formTeam)
            }

            this.formTeam = {
                name: '',
                role: '',
                date: ''
            }
        }
    },
    components: {
        tabelHeader
    }
}
</script>

<style lang="less" scoped>
.team {
    width: 100%;
    height: 100%;
}
</style>
