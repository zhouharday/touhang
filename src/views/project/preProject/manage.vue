<template>
    <section>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="项目费用" name="1">
                <div class="fileTable">
                    <tabel-header :data="headerInfo_cost" @add="costDialog"></tabel-header>
                    <el-table :data="costData" border style="width: 100%" align="center">
                        <el-table-column label="费用类型" prop="costSort" align="center">
                            <template scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.costSort }}</span>
                                <span v-if="scope.row.editFlag" class="cell-edit-input">
                                    <el-select v-model="scope.row.costSort" placeholder="请选择费用类型">
                                        <el-option label="类型一" value="类型一"></el-option>
                                        <el-option label="类型二" value="类型二"></el-option>
                                    </el-select>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="金额（元）" prop="money" align="center">
                            <template scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.money }}</span>
                                <span v-if="scope.row.editFlag" class="cell-edit-input">
                                    <el-input v-model="scope.row.money" placeholder=""></el-input>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="edit(scope.$index,scope.row)">编辑</el-button>
                                <el-button v-if="scope.row.editFlag" type="text" size="small" @click="save(scope.$index,scope.row)">保存</el-button>
                                <el-button type="text" size="small" @click="handleDelete(scope.$index,costData)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 添加项目费用 对话框-->
                    <el-dialog title="添加项目费用" :visible.sync="costAdd1" :close-on-click-modal="false">
                        <el-form :model="costForm1" label-width="100px">
                            <el-form-item label="费用类型">
                                <el-select v-model="costForm1.costSort" placeholder="请选择费用类型" style="width: 100%;">
                                    <el-option label="类型一" value="类型一"></el-option>
                                    <el-option label="类型二" value="类型二"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="金额（元）">
                                <el-input v-model="costForm1.money" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="costAdd1 = false">取 消</el-button>
                            <el-button type="primary" @click="confirmCostAdd1">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </el-collapse-item>
            <el-collapse-item title="项目合同" name="2">
                <!-- 项目合同 部分 -->
                <div class="fileTable">
                    <tabel-header :data="headerInfo_contract" @add="contractDialog" class="title"></tabel-header>
                    <el-table :data="contractData" border style="width: 100%" align="center" show-summary>
                        <el-table-column label="合同名称" prop="contractName" align="center">
                        </el-table-column>
                        <el-table-column label="签约日期" prop="date" align="center">
                        </el-table-column>
                        <el-table-column label="合同金额（元）" prop="money" align="center">
                        </el-table-column>
                        <el-table-column label="股权占比（%）" prop="percent" align="center">
                        </el-table-column>
                        <el-table-column label="合同附件" prop="appendix" align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button type="text" size="small">编辑</el-button>
                                <el-button type="text" size="small" @click="handleDelete(scope.$index,contractData)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 添加项目合同 对话框-->
                    <el-dialog title="添加项目合同" :visible.sync="contractAdd1" :close-on-click-modal="false">
                        <el-form :model="contractForm1" label-width="110px">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="合同名称">
                                        <el-input v-model="contractForm1.contractName" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="签约日期">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="contractForm1.date" style="width: 100%;">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="合同金额（元）">
                                        <el-input v-model="contractForm1.money" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="股权占比（%）">
                                        <el-input v-model="contractForm1.percent" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="合同附件">
                                        <!-- action 上传的地址，必填 -->
                                        <Upload multiple type="drag" :before-upload="handleUpload" v-model="contractForm1.appendix" action="//jsonplaceholder.typicode.com/posts/">
                                            <div style="padding: 20px 0">
                                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                                <p>点击或将文件拖拽到这里上传</p>
                                            </div>
                                        </Upload>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="经办人">
                                        <el-input v-model="contractForm1.operator" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="经办日期">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="contractForm1.handlingDate" style="width: 100%;">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div class="table_title">
                            <div class="left">
                                <span class="desc">{{ table_title }}</span>
                            </div>
                            <div class="right">
                                <el-button type="danger" @click="contractAdd1=false,fundAdd1=true">添加</el-button>
                            </div>
                        </div>
                        <el-table :data="fundData1" border style="width: 100%" align="center">
                            <el-table-column label="基金名称" prop="foundName" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.fundName }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.fundName" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="投资金额（元）" prop="investment" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.investment }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.investment" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="股权占比（%）" prop="percent" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.percent }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.percent" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template scope="scope">
                                    <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="edit(scope.$index,scope.row)">编辑</el-button>
                                    <el-button v-if="scope.row.editFlag" type="text" size="small" @click="save(scope.$index,scope.row)">保存</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="contractAdd1 = false">取 消</el-button>
                            <el-button type="primary" @click="confirmContractAdd1">确 定</el-button>
                        </div>
                    </el-dialog>
                    <!-- 添加 出资主体dialog -->
                    <el-dialog title="添加出资主体" :visible.sync="fundAdd1" :close-on-click-modal="false">
                        <el-form :model="fundForm1" label-width="110px">
                            <el-form-item label="基金名称">
                                <el-input v-model="fundForm1.fundName" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="投资金额（元）">
                                <el-input v-model="fundForm1.investment" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="股权占比（%）">
                                <el-input v-model="fundForm1.percent" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="fundAdd1 = false">取 消</el-button>
                            <el-button type="primary" @click="confirmFundAdd1">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>

            </el-collapse-item>
            <el-collapse-item title="投资支付" name="3">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="项目分红" name="4">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
        </el-collapse>

    </section>
</template>




<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            activeNames: ['1'],
            costAdd1: false,
            contractAdd1: false,
            fundAdd1: false,
            paidAdd1: false,
            sharingAdd1: false,
            sharingAdd2: false,
            outingAdd1: false,
            outingAdd2: false,
            //项目费用
            costForm1: {
                costSort: '',
                money: '',
                editFlag: false
            },
            costData: [{
                costSort: '类型一',
                money: '',
                editFlag: false
            }],
            headerInfo_cost: {
                desc: '项目费用',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            // 项目合同
            contractForm1: {
                contractName: '',
                date: '',
                money: '',
                percent: '',
                appendix: '',
                operator: '',
                handlingDate: ''
            },
            contractData: [{
                contractName: 'AAAAAAA合同',
                date: '',
                money: '',
                percent: '',
                appendix: ''
            }],
            headerInfo_contract: {
                desc: '项目合同',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            // 添加 项目合同时 的基金table
            table_title: '出资主体',
            fundForm1: {
                fundName: '',
                investment: '',
                percent: '',
                editFlag: false
            },
            fundData1: [
                {
                    fundName: 'AAAAAA合同',
                    investment: '',
                    percent: '',
                    editFlag: false
                },
                {
                    fundName: 'BBBBBB合同',
                    investment: '',
                    percent: '',
                    editFlag: false
                }
            ],


        };
    },
    methods: {
        // 添加 项目费用 的方法
        costDialog() {
            this.costAdd1 = true
        },
        confirmCostAdd1() {
            this.costData.push(this.costForm1);
            this.costForm1 = {};
            this.costAdd1 = false;
        },
        // 编辑 项目费用 的方法
        edit(index, row) { //编辑
            row.editFlag = true;
        },
        save(index, row) { //编辑后保存
            // console.log(row);
            row.editFlag = false;
        },
        // 添加 项目合同 的方法
        contractDialog() {
            this.contractAdd1 = true
        },
        confirmContractAdd1() {
            this.contractData.push(this.contractForm1);
            this.contractForm1 = {};
            this.contractAdd1 = false;

        },
        confirmFundAdd1() {
            this.fundData.push(this.fundForm1);
            this.fundForm1 = {};
            this.fundAdd1 = false;
            this.contractAdd1 = true;
        },



        //删除当前行
        handleDelete(index, rows) {
            rows.splice(index, 1);
        }
    },
    components: {
        tabelHeader
    }

}

</script>






<style lang="less" scoped>
.fileTable {
    .title {
        margin-top: 30px;
    }
    width: 100%;
    height: 100%;
}


.table_title {
    width: 100%;
    height: 41px;
    line-height: 41px;
    border: 1px solid #dfe6ec;
    border-bottom: none;
    background: #eef1f6;
    .left {
        height: 100%;
        float: left;
        margin-left: 75px;
        font-size: 0;
        .desc {
            font-size: 14px;
            font-weight: 600;
            color: #1f2d3d; // vertical-align: top;
        }
    }
    .right {
        height: 100%;
        float: right; //margin-right: 24px;
        .el-button {
            padding: 5px 15px;
        }
    }
}
</style>
