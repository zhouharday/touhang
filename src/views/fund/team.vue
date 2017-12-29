<template>
<div class="team">
    <tabel-header :data="haveJurisdiction('TD-tianjia') ? headerInfo : _headerInfo" @add="addTeam"></tabel-header>
    <el-table :data="teamData" style="width: 100%">
        <el-table-column label="姓名" prop="userName" align="center">
        </el-table-column>
        <el-table-column label="角色" prop="roleName" align="center">
        </el-table-column>
        <!-- <el-table-column label="添加日期" prop="addTime" align="center">
        </el-table-column> -->
        <el-table-column label="操作" align="center">
            <template scope="scope">
                <el-button type="text" v-if="haveJurisdiction('TD-shanchu')" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 添加成员 对话框-->
    <el-dialog title="添加团队成员"
               :visible.sync="modalAdd"
               :close-on-click-modal="false">
        <el-form :model="formTeam">
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-select v-model="formTeam.userId" placeholder="请选择成员" style="width:100%;">
                    <el-option v-for="list of userNameList"
                               :key="list.id"
                               :label="list.name"
                               :value="list.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select v-model="formTeam.autId" placeholder="请选择成员" style="width:100%;">
                    <el-option v-for="item of roleList"
                               :key="item.id"
                               :label="item.roleName"
                               :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="添加日期" :label-width="formLabelWidth">
                <el-date-picker type="date"
                                placeholder="选择日期"
                                v-model="formTeam.addTime"
                                style="width: 100%;">
                </el-date-picker>
            </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="modalAdd = false">取 消</el-button>
            <el-button type="danger" @click="confirmAdd">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 删出提示框 -->
    <delete-reminders :deleteReminders="deleteReminders"
                      :modal_loading="modal_loading"
                      @del="confirmDel"
                      @cancel="confirmCal">
    </delete-reminders>
</div>
</template>

<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
import deleteReminders from 'components/deleteReminders'
import { checkFundAuth } from "common/js/config";
import {queryUserList, queryList, addFundTeam, deleteTeamMembers, getFundTeamList} from 'api/fund'
const FUND_ROLE = 1 // 基金角色
export default {
    props: {
        teamData: {
            type: Array,
            default: []
        },
        authList: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            modalAdd: false,
            formLabelWidth: '80px',
            formTeam: {
                fundId: this.$route.params.id,
                userId: '',
                autId: '',
                addTime: new Date()
            },
            headerInfo: {
                desc: '当前成员',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            _headerInfo: {
                desc: '当前成员',
                btnGroup: []
            },
            userNameList: [],
            roleList: [],
            deleteReminders: false,
            modal_loading: false,
            id: '',
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
                    type: 'date',
                    required: true,
                    message: '请选择日期',
                    trigger: 'change'
                }]
            }
        }
    },
    methods: {
        haveJurisdiction(str) {
            if (!this.authList) {
                return false;
            } else {
                if (checkFundAuth(str, this.authList)) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        addTeam() {
            this.modalAdd = true
            this.formTeam = {
                fundId: this.$route.params.id,
                userId: '',
                autId: '',
                addTime: new Date()
            }
        },
        confirmAdd() {
            addFundTeam(this.formTeam).then((res) => {
                if(res.status == '200') {
                    this.$Message.success(res.data.message || '添加成员成功！')
                    this.getTeamDetails()
                    this.modalAdd = false
                }
            })
        },
        handleDelete(index, row) {
            this.deleteReminders = true
            this.id = row.id
        },
        confirmDel() {
            this.modal_loading = true
            deleteTeamMembers(this.id).then((res) => {
                if(res.status == '200') {
                    this.$Message.warning(res.data.message || '删除成员成功！')
                    this.getTeamDetails()
                    this.modal_loading = false
                    this.deleteReminders = false
                }
            })
        },
        confirmCal() {
            this.deleteReminders = false
        },
        getTeamDetails() {
            getFundTeamList(this.$route.params.id).then((res) => {
                if (res.status == '200') {
                    // console.log(res.data.result)
                    this.teamData = res.data.result
                }
            })
        }
    },
    created() {
        queryUserList().then((res) => {
            if(res.status == '200') {
                // console.log(res.data.result)
                this.userNameList = res.data.result
            }
        })
        queryList(FUND_ROLE).then((res) => {
            if(res.status == '200') {
                // console.log(res.data.result)
                this.roleList = res.data.result
            }
        })
    },
    components: {
        tabelHeader,
        deleteReminders
    }
}
</script>

<style lang="less" scoped>
.team {
    width: 100%;
    height: 100%;
}
</style>
