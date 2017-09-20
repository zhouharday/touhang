<template>
<div class="investorForm">
    <el-form :model="investorForm" label-position="left">
        <el-row :gutter="10">
            <el-col :span="12">
                <el-form-item label="投资者名称" :label-width="formLabelWidth">
                    <el-input v-model="investorForm.investorName" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="投资者类型" :label-width="formLabelWidth" width="100">
                    <el-select v-model="investorForm.investorTypeId" style="width:100%">
                        <el-option v-for="(item, index) of typeInvestor" :key="item.id" :label="item.dicName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="证件类型" :label-width="formLabelWidth">
                    <el-select v-model="investorForm.certificateTypeId" style="width:100%">
                        <el-option v-for="(item, index) of typeId" :key="item.id" :label="item.dicName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="证件号码" :label-width="formLabelWidth">
                    <el-input v-model="investorForm.certificateNum" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="机构净资产 (元)" :label-width="formLabelWidth" width="100">
                    <el-input v-model="investorForm.organizationProperty" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="年收入 (元)" :label-width="formLabelWidth">
                    <el-input placeholder="请输入内容" v-model="investorForm.personalAssets">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="所属区域" :label-width="formLabelWidth">
                    <el-select v-model="investorForm.regionName" style="width:100%">
                        <el-option v-for="(item, index) of area" :key="item.id" :label="item.dicName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="投资经理" :label-width="formLabelWidth">
                    <el-select v-model="investorForm.investmentManagerId" style="width:100%">
                        <el-option v-for="(item, index) of investmentManager" :key="item.id" :label="item.dicName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="联系人" :label-width="formLabelWidth" width="100">
                    <el-input v-model="investorForm.contacts" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                    <el-input placeholder="请输入内容" v-model="investorForm.contactNumber">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="地址" :label-width="formLabelWidth" width="100">
                    <el-input v-model="investorForm.address" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="investorForm.remark">
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</div>
</template>
<script type="text/ecmascript-6">
import {getInvestorType, getIdType, getSubArea} from 'api/investor'
export default {
    props: {
        investorForm: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            formLabelWidth: '120px',
            investmentManager: [{
                dicName: JSON.parse(sessionStorage.getItem('userInfor')).name,
                id: JSON.parse(sessionStorage.getItem('userInfor')).id
            }], // 投资经理
            typeInvestor: [], // 投资者类型
            typeId: [], // 证件类型
            area: [] // 所属区域
        }
    },
    created() {
        this.$http.all([getInvestorType(), getIdType(), getSubArea()])
        .then(this.$http.spread((getInvestor, getId, getArea) => {
            this.typeInvestor = getInvestor.data.result
            this.typeId = getId.data.result
            this.area = getArea.data.result
        })).catch(err => {
            this.$Message.error('获取下拉选项失败！')
        })
    }
}
</script>

<style lang="less" scoped>
.investorForm{
    width: 100%;
    height: 100%;
    background: #fff;
}
</style>
