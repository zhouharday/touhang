<template>
<div class="cooperative">
    <table-header :data="headerInfo" @add="alertModle" :theme="theme" class="addPadding">
        <el-input placeholder="请输入搜索内容"
                  icon="search"
                  v-model="searchValue"
                  :on-icon-click="handleIconClick"
                  style="width: 320px;"
                  @click="submitSearch"
                  @blur="submitSearch"
                  :autofocus="true">
        </el-input>
    </table-header>
    <!-- table_content start-->
    <div class="table_content">
        <el-table :data="teamData" border style="width: 100%">
            <el-table-column label="机构名称" prop="orgName">
            </el-table-column>
            <el-table-column label="机构类型" prop="orgType">
            </el-table-column>
            <el-table-column label="联系人" prop="orgLinkman">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                        <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- table_content end-->
    <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total=totalPage>
        </el-pagination>
    </div>
    <el-dialog title="合作机构" :visible.sync="cooperativeOrg" :close-on-click-modal="false">
        <el-form :model="cooperativeInfo" :rules="rules" ref="cooperativeInfo">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="机构名称" :label-width="formLabelWidth" prop="orgName" :autofocus="autofocus">
                        <el-input v-model="cooperativeInfo.orgName" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="机构类型" :label-width="formLabelWidth" prop="orgType">
                        <el-select v-model="cooperativeInfo.orgType" style="width:100%">
                            <el-option v-for="(item, index) of setOrgType" :key="item.id" :label="item.orgName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系人" :label-width="formLabelWidth" prop="orgLinkman">
                        <el-input placeholder="请输入内容" v-model="cooperativeInfo.orgLinkman">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系电话" :label-width="formLabelWidth" prop="orgnNumber">
                        <el-input placeholder="请输入内容" v-model="cooperativeInfo.orgnNumber">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="公司地址" :label-width="formLabelWidth">
                        <el-input placeholder="请输入内容" v-model="cooperativeInfo.orgAddress">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="danger" @click="confirmIncome">确 定</el-button>
        </div>
    </el-dialog>
    <delete-reminders :deleteReminders="deleteReminders"
                      :modal_loading="modal_loading"
                      @del="confirmDel"
                      @cancel="confirmCancel">
    </delete-reminders>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
import deleteReminders from 'components/deleteReminders'
import {
    getOrgList,
    getAllOrgList,
    deleteOrg
} from 'api/fund'
export default {
    data() {
        return {
            theme: '#fff',
            cooperativeOrg: false,
            autofocus: false,
            formLabelWidth: '120px',
            cooperativeInfo: {
                merchantId: JSON.parse(sessionStorage.getItem('merchants'))[0].id,
                orgName: '',
                orgType: '',
                orgLinkman: '',
                orgnNumber: '',
                orgAddress: ''
            },
            headerInfo: {
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            setOrgType: [],
            teamData: [],
            trueOrFalse: true,
            deleteReminders: false,
            modal_loading: false,
            id: '',
            currentPage: 1,
            totalPage: '',
            page: 1,
            pageSize: 10,
            searchValue: '',
            rules: {
                orgName: [{
                    required: true,
                    message: '请输入机构名称',
                    trigger: 'blur'
                }, {
                    min: 3,
                    max: 20,
                    message: '长度在 3 到 5 个字符',
                    trigger: 'blur'
                }],
                orgType: [{
                    required: true,
                    message: '请选择机构类型',
                    trigger: 'change'
                }],
                orgnNumber: [{
                    required: true,
                    message: '请输入数字',
                    trigger: 'change'
                }, {
                    min: 7,
                    max: 11,
                    message: '长度在 7 到 11 个字符',
                    trigger: 'blur'
                }],
                orgLinkman: [{
                    required: true,
                    message: '请输入机构名称',
                    trigger: 'blur'
                }, {
                    min: 3,
                    max: 20,
                    message: '长度在 3 到 5 个字符',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        alertModle(el) {
            this.cooperativeOrg = true
        },
        handleEdit(index, row) {
            this.cooperativeOrg = true
            this.cooperativeInfo = row
            this.trueOrFalse = false
        },
        handleDelete(index, row) {
            this.deleteReminders = !this.deleteReminders
            this.id = row.id
        },
        confirmIncome() {
            if (this.trueOrFalse == true) {
                this.$refs.cooperativeInfo.validate((valid) => {
                    if (valid) {
                        this.$http.post(this.api + '/organization/addOrganization', this.cooperativeInfo).then((response) => {
                            if (response.status == '200') {
                                this.$Message.success(response.data.message || '操作成功')
                            } else if (response.status == '9005') {
                                return Promise.reject(error)
                            }
                            this.cooperativeOrg = false
                        }).catch(error => {
                            this.$Message.error(response.data.message || '机构名称已经存在!')
                        })
                    } else {
                        return false
                    }
                })
            } else {
                this.$refs.cooperativeInfo.validate((valid) => {
                    if (valid) {
                        this.$http.post(this.api + '/organization/updateOrg', this.cooperativeInfo).then((response) => {
                            if (response.status == '200') {
                                this.cooperativeOrg = false
                                this.$Message.success(response.data.message || '操作成功')
                            } else {
                                return Promise.reject(error)
                            }
                        }).catch(error => {
                            let response = response.data
                            if (response.status == '9005') {
                                this.$Message.error(response.data.message || '机构名称已经存在!')
                            }
                        })
                    } else {
                        return false
                    }
                })
            }
        },
        cancelForm() {
            this.$refs.cooperativeInfo.resetFields()
            this.cooperativeOrg = false
        },
        confirmDel() {
            this.modal_loading = true
            deleteOrg(this.id).then((res) => {
                if(res.status == '200') {
                    this.$Message.success(res.data.message || '删除成功！')
                    this.modal_loading = false
                    this.deleteReminders = false
                }
            })
        },
        confirmCancel() {
            this.deleteReminders = false
        },
        handleSizeChange(val) { // 下拉选择每页显示多少条数据
            this.pageSize = val
            getOrgList(this.searchValue, this.page, this.pageSize).then((response) => {
                if (response.data.status == '200') {
                    this.totalPage = response.data.result.total
                    this.teamData = response.data.result.list
                }
            })
        },
        handleCurrentChange(val) { // 获取当前页码
            this.page = val
            getOrgList(this.searchValue, this.page, this.pageSize).then((response) => {
                if (response.data.status == '200') {
                    this.totalPage = response.data.result.total
                    this.teamData = response.data.result.list
                }
            })
        },
        submitSearch() {
            getOrgList(this.searchValue, this.page, this.pageSize).then((response) => {
                if (response.data.status == '200') {
                    this.totalPage = response.data.result.total
                    this.teamData = response.data.result.list
                }
            })
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.autofocus = true
        })
    },
    created() {
        getAllOrgList().then((res) => {
            if (res.data.status == '200') {
                this.setOrgType = res.data.result
            }
        })
        getOrgList(this.searchValue, this.page, this.pageSize).then((response) => {
            if (response.data.status == '200') {
                console.log(response.data.result)
                this.totalPage = response.data.result.total
                this.teamData = response.data.result.list
            }
        })
    },
    components: {
        tableHeader,
        deleteReminders
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
.cooperative {
    width: 100%;
    min-height: 100%;
    position: relative;
    padding: 24px;
    background: #fff;
    .addPadding {
        padding-bottom: 12px;
    }
    .table_content{
        width: 100%;
        padding-bottom: @height-large;
    }
    .page {
        width: 100%;
        padding: 15px 30px;
        text-align: right;
        position: absolute;
        bottom: 0;
        right: 0;
    }
}
</style>
