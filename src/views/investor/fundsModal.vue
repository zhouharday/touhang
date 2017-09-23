<template>
<div class="fundsModal">
    <el-form :model="fundsInfo" label-position="left" label-width="120px">
        <el-row :gutter="10">
            <el-col :span="12">
                <el-form-item label="协议名称">
                    <el-input v-model="fundsInfo.agreementName" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="投资者">
                    <el-input v-model="fundsInfo.investorName" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="基金名称">
                    <el-input v-model="fundsInfo.fundName" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="认缴金额（元）" width="100">
                    <el-input v-model="fundsInfo.subscribeAmount" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="剩余金额（元）" width="100">
                    <el-input v-model="fundsInfo.residueAmount" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="实缴金额（元）" width="100">
                    <el-input v-model="fundsInfo.paidAmount" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="出资日期">
                    <el-date-picker v-model="fundsInfo.paidDate" type="date" placeholder="选择日期" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="投资经理">
                    <el-select v-model="fundsInfo.managerId" style="width:100%">
                        <el-option v-for="(item, index) of investmentManager" :key="item.id" :label="item.dicName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="登记日期">
                    <el-date-picker v-model="fundsInfo.registerDate" type="date" placeholder="选择日期" style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="投资协议附件">
                    <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击或将文件拖拽到这里上传</p>
                        </div>
                    </Upload>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</div>
</template>

<script type="text/ecmascript-6">
// {
//               "agreementId": "ff6f971d142a48389988b9f4aca12b02",//协议ID
//               "paidAmount": "100.00",//实缴金额
//               "residueAmount": "50",//剩余金额
//               "paidDate": "2017-08-09 08:51:35",//出资日期
//               "managerId": "asdffsdfdsf",//投资经理ID 当前登录用户ID
//                  "documentInfo":[{"fileUrl":"https://123.sogou.com/","fileName":"搜狗网址"},{"fileUrl":"https://www.zhibo8.cc/","fileName":"直播吧地址"}],//上传附件的字段以数组的形式
//           }
export default {}
</script>

<style lang="less" scoped>
.fundsModal {
    width: 100%;
    height: 100%;
}
</style>
