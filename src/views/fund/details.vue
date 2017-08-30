<template>
<div class="form">
    <div class="formDetails">
        <el-form ref="form" :model="formDetails" label-width="120px">
            <el-row>
                <el-col :span="24" class="title">
                    <div class="desc">{{formDetails.baseInfo}}</div>
                    <div class="btn">
                        <Icon type="edit"></Icon>
                        <span>编辑</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金名称">
                        <el-input v-model="formDetails.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金编号">
                        <el-input v-model="formDetails.number"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金规模(元)">
                        <el-input v-model="formDetails.scale"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="管理类型">
                        <el-input v-model="formDetails.management"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="组织类型">
                        <el-input v-model="formDetails.type"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金投向">
                        <el-input v-model="formDetails.turn"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金结构">
                        <el-input v-model="formDetails.structure"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金期限">
                        <el-input v-model="formDetails.term"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="成立日期">
                        <el-date-picker v-model="formDetails.establish" align="right" type="date" placeholder="选择成立日期" style="width:100%">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="到期日期">
                        <el-date-picker v-model="formDetails.expire" type="date" placeholder="选择日期" style="width:100%">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="业务部门">
                        <el-input v-model="formDetails.department"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年天数">
                        <el-input v-model="formDetails.date"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="主要投资领域">
                        <el-input v-model="formDetails.area"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="收益分配">
                        <el-input v-model="formDetails.distribution"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注">
                        <el-input v-model="formDetails.remarks"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
    <div class="formMIS">
        <el-form ref="form" :model="formMIS" label-width="120px">
            <el-row>
                <el-col :span="24" class="title">
                    <div class="desc">{{formMIS.baseInfo}}</div>
                    <div class="btn">
                        <Icon type="edit"></Icon>
                        <span>编辑</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金管理人">
                        <el-input v-model="formMIS.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金托管人">
                        <el-input v-model="formMIS.number"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金监理人">
                        <el-input v-model="formMIS.scale"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金监管人">
                        <el-input v-model="formMIS.management"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金投资顾问">
                        <el-input v-model="formMIS.type"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="第三方合作机构">
                        <el-input v-model="formMIS.turn"></el-input>
                    </el-form-item>
                </el-col>
           </el-row>
        </el-form>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        formDetails: {
            type: Object,
            default: {}
        },
        formMIS: {
            type: Object,
            default: {}
        }
    },
    created() {
        console.log(this.formDetails.baseInfo)
    }
}
</script>

<style lang="less" scoped>
.form {
    width: 100%;
    height: 100%;
    .el-row {
        width: 100%;
        height: 100%;
        .title {
            width: 100%;
            height: 42px;
            line-height: 42px;
            background: #2a3142;
            color: #fff;
            padding: 0 26px;
            margin-bottom: 12px;
            display: flex;
            .desc {
                flex: 1;
            }
            .btn {
                flex: 1;
                text-align: right;
            }
        }
    }
}
</style>
