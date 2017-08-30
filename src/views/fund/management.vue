<template>
<div class="form">
    <el-form ref="form" :model="formMIS" label-width="100px">
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
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        formDetails: {
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
.form{
    width: 100%;
    height: 100%;
    .el-row{
        width: 100%;
        height: 100%;
        .title{
            width: 100%;
            height: 42px;
            line-height: 42px;
            background: #2a3142;
            color: #fff;
            padding: 0 26px;
            margin-bottom: 12px;
            display: flex;
            .desc{
                flex: 1;
            }
            .btn{
                flex: 1;
                text-align: right;
            }
        }
    }
}
</style>
