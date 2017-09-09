<template>
<div class="fundDetails">
    <div class="title">
        <div class="left">
            <el-button type="text">出资</el-button>
            <el-button type="text">退出</el-button>
        </div>
        <div class="right">
<<<<<<< HEAD
            <el-button type="text">添加</el-button>
        </div>
    </div>
    <el-table :data="investorData" border style="width: 100%;">
        <el-table-column label="协议名称" prop="name">
        </el-table-column>
        <el-table-column label="基金名称" prop="investorTypeId">
        </el-table-column>
        <el-table-column label="认缴金额（元）" prop="InvestmentManager">
        </el-table-column>
        <el-table-column label="出资占比（%）" prop="amount">
        </el-table-column>
        <el-table-column label="实缴金额（元）" prop="InvestmentManager">
        </el-table-column>
        <el-table-column label="出资日期" prop="amount">
=======
            <el-button type="text" @click="showDetailed">添加</el-button>
        </div>
    </div>
    <el-table :data="detailsData" border :summary-method="getSummaries" show-summary style="width: 100%;">
        <el-table-column label="协议名称" prop="protocolName">
        </el-table-column>
        <el-table-column label="基金名称" prop="fundName">
        </el-table-column>
        <el-table-column label="认缴金额（元）" prop="amount">
        </el-table-column>
        <el-table-column label="出资占比（%）" prop="ratio">
        </el-table-column>
        <el-table-column label="实缴金额（元）" prop="actual">
        </el-table-column>
        <el-table-column label="出资日期" prop="date">
>>>>>>> dbb5bed1613301ec0f51cfc73f87df73e2726d00
        </el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small"
                      @click="handleEdit(scope.$index, scope.row)">
                      签约
              </el-button>
              <el-button size="small" type="danger"
                      @click="handleDelete(scope.$index, scope.row)">
                      删除
              </el-button>
            </template>
        </el-table-column>
    </el-table>
<<<<<<< HEAD
=======
    <!-- 新建明细 -->
    <el-dialog title="新建明细" :visible.sync="addDetailed" :close-on-click-modal="false">
        <el-form :model="Detailed" label-position="left">
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-form-item label="协议名称" :label-width="formLabelWidth">
                        <el-select v-model="Detailed.protocolName"
                                   clearable
                                   placeholder="请选择"
                                   style="width: 100%;">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="投资者" :label-width="formLabelWidth" width="100">
                        <el-input v-model="Detailed.investor" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="基金名称" :label-width="formLabelWidth">
                        <el-input placeholder="请输入内容" v-model="Detailed.fundName">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="认缴金额（元）" :label-width="formLabelWidth">
                        <el-input v-model="Detailed.amount" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="剩余金额（元）" :label-width="formLabelWidth" width="100">
                        <el-input v-model="Detailed.surplus" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="实缴金额（元）" :label-width="formLabelWidth">
                        <el-input placeholder="请输入内容" v-model="Detailed.actual">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="出资日期" :label-width="formLabelWidth">
                        <el-date-picker v-model="Detailed.contributive"
                                        type="date"
                                        placeholder="选择日期"
                                        style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="相关附件" :label-width="formLabelWidth">
                        <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="经办人" :label-width="formLabelWidth" width="100">
                        <el-input v-model="Detailed.handler" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="经办日期" :label-width="formLabelWidth">
                        <el-date-picker v-model="Detailed.handlerDate"
                                        type="date"
                                        placeholder="选择日期"
                                        style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="modalIncome = false">取 消</el-button>
            <el-button type="primary" @click="confirmIncome">确 定</el-button>
        </div>
    </el-dialog>
>>>>>>> dbb5bed1613301ec0f51cfc73f87df73e2726d00
</div>
</template>

<script type="text/ecmascript-6">
<<<<<<< HEAD
export default {}
=======
export default {
    data() {
        return {
            detailsData: [{
                protocolName: 'xxxxx',
                fundName: '深度并购基金',
                amount: '100,000',
                ratio: '5%',
                actual: 565.56,
                date: '2016-09-08'
            }, {
                protocolName: 'xxx',
                fundName: '深度并购基金',
                amount: '100,000',
                ratio: '5.6%',
                actual: 565.56,
                date: '2016-09-08'
            }],
            formLabelWidth: '120px',
            addDetailed: false,
            Detailed: {

            },
            options: [{
                value: '名称a',
                label: '名称a'
            }, {
                value: '名称b',
                label: '名称b'
            }]
        }
    },
    methods: {
        getSummaries(param) {
            console.log(param)
        },
        showDetailed() {
            this.addDetailed = true
        },
        Detailed: {}
    }
}
>>>>>>> dbb5bed1613301ec0f51cfc73f87df73e2726d00
</script>

<style lang="less" scoped>
.fundDetails {
    width: 100%;
    height: 100%;
    .title {
        display: flex;
        .left,
        .right {
<<<<<<< HEAD
            flex:1;
            height: 42px;
            line-height: 42px;
        }
        .left{
=======
            flex: 1;
            height: 42px;
            line-height: 42px;
        }
        .left {
>>>>>>> dbb5bed1613301ec0f51cfc73f87df73e2726d00
            text-align: left;
            margin-left: 24px;
        }
        .right {
            text-align: right;
            margin-right: 24px;
        }
    }
}
</style>
