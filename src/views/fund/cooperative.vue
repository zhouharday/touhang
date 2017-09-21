<template>
<div class="cooperative">
    <table-header :data="headerInfo" @add="alertModle" :theme="theme" class="addPadding">
        <el-input placeholder="请输入搜索内容" icon="search" v-model="input2" :on-icon-click="handleIconClick" style="width: 320px;">
        </el-input>
    </table-header>
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
    <div class="pagination">
        <el-pagination layout="prev, pager, next" :total="100">
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
                        <el-input v-model="cooperativeInfo.orgType" auto-complete="off"></el-input>
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
            <el-button type="primary" @click="confirmIncome">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
import {
    getOrgList,
    getAllOrgList,
    updateOrg,
    addOrganization
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
            teamData: [],
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
            updateOrg(row.id).then((res) => {
                if (res.status == '200') {
                    console.log(res)
                }
            }).catch(err => {
                let res = err.data
                if(res.status == '9005') {
                    this.autofocus = true
                    this.$Message.warning(res.message || '机构名称已经存在!')
                }
            })
        },
        confirmIncome() {
            this.$refs.cooperativeInfo.validate((valid) => {
                if (valid) {
                    addOrganization(this.cooperativeInfo).then((response) => {
                        if (response.status == '200') {
                            this.$Message.success(res.data.message || '操作成功')
                        }
                    }).catch(err => {
                        if (response.status == '9005') {
                            this.$Message.error(response.data.message || '机构名称已经存在!')
                        }
                    })
                } else {
                    return false
                }
            })
        },
        cancelForm() {
            this.$refs.cooperativeInfo.resetFields()
            this.cooperativeOrg = false
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
                console.log(res.data.result)
            }
        })
        getOrgList().then((response) => {
            if (response.data.status == '200') {
                this.teamData = response.data.result.list
            }
        })
    },
    components: {
        tableHeader
    }
}
</script>

<style lang="less" scoped>
.cooperative {
    width: 100%;
    height: 100%;
    padding: 24px;
    background: #fff;
    .addPadding {
        padding-bottom: 12px;
    }
}
</style>
