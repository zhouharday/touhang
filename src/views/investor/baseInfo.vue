<template>
<div class="baseInfo">
    <tableHeader :theme="theme" :data="dataTitle"></tableHeader>
    <div class="form_wrapper">
        <el-form :model="baseInfo" label-position="left">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="投资者名称" :label-width="formLabelWidth">
                        <el-input v-model="baseInfo.investorName" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="投资者类型" :label-width="formLabelWidth" width="100">
                        <el-select v-model="addInvestor.investorTypeId" style="width:100%">
                            <el-option v-for="(item, index) of typeInvestor" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="证件类型" :label-width="formLabelWidth">
                        <el-input placeholder="请输入内容" v-model="baseInfo.certificateTypeId">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="证件号码" :label-width="formLabelWidth">
                        <el-input v-model="baseInfo.certificateNum" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="机构净资产 (元)" :label-width="formLabelWidth" width="100">
                        <el-input v-model="baseInfo.organizationProperty" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年收入 (元)" :label-width="formLabelWidth">
                        <el-input placeholder="请输入内容" v-model="baseInfo.personalAssets">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属区域" :label-width="formLabelWidth">
                        <el-input placeholder="请输入内容" v-model="baseInfo.regionName">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="投资经理" :label-width="formLabelWidth">
                        <el-select v-model="baseInfo.investmentManagerId" style="width:100%">
                            <el-option v-for="(item, index) of investmentManager" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系人" :label-width="formLabelWidth" width="100">
                        <el-input v-model="baseInfo.contacts" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系电话" :label-width="formLabelWidth">
                        <el-input placeholder="请输入内容" v-model="baseInfo.contactNumber">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="地址" :label-width="formLabelWidth" width="100">
                        <el-input v-model="baseInfo.address" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注" :label-width="formLabelWidth">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="remark">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item style="text-align:center">
                        <el-button class="changeWid" @click="onCancel">取消</el-button>
                        <el-button type="primary" @click="onSubmit" class="changeWid">确定</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            theme: '#eef1f6',
            dataTitle: {
                desc: '基本信息',
                btnGroup: [{
                    explain: '编辑'
                }]
            },
            formLabelWidth: '120px',
            investorTypeId: [],
            investmentManager: [{
                dicName: JSON.parse(sessionStorage.getItem('userInfor')).name,
                id: JSON.parse(sessionStorage.getItem('userInfor')).id
            }],
            baseInfo: {}
        }
    },
    methods: {
        onCancel() {
            alert('取消')
        },
        onSubmit() {
            alert('确定')
        }
    },
    computed: {
        ...mapGetters([
            'investorDetails',
            'investorType'
        ])
    },
    created() {
        this.baseInfo = this.investorDetails
        this.investorTypeId = this.investorType
    },
    components: {
        tableHeader
    }
}
</script>

<style lang="less" scoped>
@import '../../common/styles/variable.less';
@import '../../common/styles/mixin.less';
.baseInfo {
    .base-style();
    .form_wrapper {
        padding: 24px 0;
        .changeWid {
            width: 120px;
        }
    }
}
</style>
