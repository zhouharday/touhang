<template>
    <div class="industryForm">
        <tabel-header :data="headerInfo_industry" @method="disable(industryForm)"></tabel-header>
        <div class="form">
            <el-form ref="form" :model="industryForm" label-width="100px">
                <el-row>
                    <el-col>
                        <el-form-item label="公司名称">
                            <el-input v-model="industryForm.companyName" :disabled="industryForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="公司类型">
                            <el-input v-model="industryForm.companySort" :disabled="industryForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="成立日期">
                            <el-input v-model="industryForm.date" :disabled="industryForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="注册资本">
                            <el-input v-model="industryForm.regCapital" :disabled="industryForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="法人代表">
                            <el-input v-model="industryForm.delegate" :disabled="industryForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="经营状态">
                            <el-input v-model="industryForm.operationState" :disabled="industryForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="登记机关">
                            <el-input v-model="industryForm.authority" :disabled="industryForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="注册地址">
                            <el-input v-model="industryForm.regAddress" :disabled="industryForm.flag"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>


<script style="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
export default {
    props: {
        industryForm: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            headerInfo_industry: {
                desc: '工商信息',
                icon_b: 'refresh',
                explain_b: '数据更新',
            },
            // industryForm: {
            //     companyName: '',
            //     companySort: '',
            //     date: '',
            //     regCapital: '',
            //     delegate: '',
            //     operationState: '',
            //     authority: '',
            //     regAddress: ''
            // }
        }
    },
    methods: {
        disable(name) {
            if (name.flag === false) {
                return name.flag = true
            } else {
                return name.flag = false
            }
        }
    },
    components: {
        tabelHeader
    }

}
</script>



<style lang="less" scoped>

</style>