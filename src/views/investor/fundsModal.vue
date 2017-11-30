<template>
<div class="fundsModal">
    <el-form :model="fundsInfo" :rules="rules1" ref="fundsInfo" label-position="left" label-width="120px">
        <el-row :gutter="10">
            <el-col :span="24">
                <el-form-item label="协议名称" prop="agreementName">
                    <el-select v-model="fundsInfo.agreementName" @change="getItemData" style="width:100%">
                        <el-option v-for="(item, index) of allAgreement" :key="item.id" :label="item.agreementName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="投资者" prop="investorName">
                    <el-select v-model="fundsInfo.investorName" disabled style="width:100%">
                        <el-option v-for="(item, index) of allAgreement" :key="item.id" :label="item.investorName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="基金名称" prop="fundName">
                    <el-select v-model="fundsInfo.fundName" disabled style="width:100%">
                        <el-option v-for="(item, index) of allAgreement" :key="item.id" :label="item.fundName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="认缴金额（元）" prop="subscribeAmount">
                    <el-input v-model="fundsInfo.subscribeAmount" auto-complete="off" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="剩余金额（元）" width="100" prop="residueAmount">
                    <el-input v-model="fundsInfo.residueAmount" auto-complete="off" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="实缴金额（元）" width="100" prop="paidAmount">
                    <el-input v-model.number="fundsInfo.paidAmount" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="出资日期" prop="paidDate">
                    <el-date-picker v-model="fundsInfo.paidDate" type="date" placeholder="选择日期" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="经办人" prop="managerName">
                    <el-input v-model="fundsInfo.managerName" placeholder="当前用户" disabled style="width:100%">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="经办日期" prop="handlingDate">
                    <el-date-picker v-model="fundsInfo.handlingDate" type="date" placeholder="选择日期" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="出资协议附件">
                    <upload-files @uploadSuccess="uploadSuccess" :documentInfo="fundsInfo.documentInfo"></upload-files>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex'
import uploadFiles from 'components/uploadFiles'
import {GetProtocolsList} from 'api/investor'
export default {
    props: {
        fundsInfo: {
            type: Object,
            default: {}
        },
        editOrAdd: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            agreementList: '',
            size: 1000,
            rules1: {
                agreementName: [{
                    required: true,
                    message: '请选择协议名称',
                    trigger: 'blue'
                }],
                paidAmount: [{
                    type: 'number',
                    required: true,
                    message: '请输入数字',
                    trigger: 'blue'
                }],
                paidDate: [{
                    type: 'date',
                    required: true,
                    message: '请选择出资日期',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        getItemData(val) {
            this._getAgreementList()
            if (this.editOrAdd) {
                var current = ''
                this.agreementList = val
                this.fundsInfo.investorName = val
                this.fundsInfo.fundName = val
                this.allAgreement.forEach(elem => {
                    if (elem.id === val) {
                        current = elem
                    }
                })
                this.fundsInfo.subscribeAmount = current.subscribeAmount
                this.fundsInfo.residueAmount = current.residueAmount
            }
        },
        _getAgreementList() {
            GetProtocolsList(this.$route.params.userId).then((res) => {
                if (res.status == '200') {
                    this.getAgreementInfo(res.data.result.list)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        uploadSuccess(list) {
            this.fundsInfo.documentInfo = list
            // console.log(list)
        },
        ...mapActions([
            'getAgreementInfo'
        ])
    },
    computed: {
        ...mapGetters({
            allAgreement: 'agreement'
        })
    },
    components: {
        uploadFiles
    }
}
</script>

<style lang="less" scoped>
.fundsModal {
    width: 100%;
    height: 100%;
}
</style>
