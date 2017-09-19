<template>
    <section>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="项目费用" name="1">
                <div class="fileTable">
                    <tabel-header :data="headerInfo_cost" @add="costAdd1=true"></tabel-header>
                    <el-table :data="costData" border style="width: 100%" align="center">
                        <el-table-column label="费用类型" prop="costSort" align="center">
                        </el-table-column>
                        <el-table-column label="金额（元）" prop="money" align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button type="text" size="small" @click="EditCost(scope.row)">编辑</el-button>
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
                    <!-- 编辑项目费用 对话框-->
                    <el-dialog title="编辑项目费用" :visible.sync="costAdd2" :close-on-click-modal="false">
                        <el-form :model="costForm2" label-width="100px">
                            <el-form-item label="费用类型">
                                <el-select v-model="costForm2.costSort" placeholder="请选择费用类型" style="width: 100%;">
                                    <el-option label="类型一" value="类型一"></el-option>
                                    <el-option label="类型二" value="类型二"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="金额（元）">
                                <el-input v-model="costForm2.money" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="costAdd2 = false">取 消</el-button>
                            <el-button type="primary" @click="confirmCostAdd2(s)">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </el-collapse-item>
            <el-collapse-item title="项目合同" name="2">
                <!-- 项目合同 部分 -->
                <div class="fileTable">
                    <tabel-header :data="headerInfo_contract" @add="contractAdd1 = true"></tabel-header>
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
                        <div class="table_title" style="justify-content:space-between;">
                            <div class="left" style="width:25.2%">
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
                                        <el-select v-model="scope.row.fundName" placeholder="请选择基金">
                                            <el-option label="基金一" value="基金一"></el-option>
                                            <el-option label="基金二" value="基金二"></el-option>
                                        </el-select>
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
                                    <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">编辑</el-button>
                                    <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">保存</el-button>
                                    <el-button type="text" size="small" @click="handleDelete(index,fundData1)">删除</el-button>
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
                                <el-select v-model="fundForm1.fundName" placeholder="请选择基金" style="width: 100%">
                                    <el-option label="基金一" value="基金一"></el-option>
                                    <el-option label="基金二" value="基金二"></el-option>
                                </el-select>
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
                <!-- 投资支付 部分 -->
                <div class="fileTable capitalDialog">
                    <tabel-header :data="headerInfo_paid" @add="paidAdd1=true"></tabel-header>
                    <el-table :data="paidData" border style="width: 100%" align="center" show-summary>
                        <el-table-column label="合同名称" prop="contractName" align="center">
                        </el-table-column>
                        <el-table-column label="合同金额（元）" prop="contractMoney" align="center">
                        </el-table-column>
                        <el-table-column label="支付金额（元）" prop="paidMoney" align="center">
                        </el-table-column>
                        <el-table-column label="支付日期" prop="paidDate" align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button type="text" size="small">编辑</el-button>
                                <el-button type="text" size="small" @click="handleDelete(scope.$index,paidData)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 添加投资支付 对话框-->
                    <el-dialog title="添加投资支付" :visible.sync="paidAdd1" :close-on-click-modal="false" style="width：65%;">
                        <el-form :model="paidForm1" label-width="110px">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="标题">
                                        <el-input v-model="paidForm1.title" auto-complete="off" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="项目合同">
                                        <el-select v-model="paidForm1.contractName" placeholder="请选择合同" style="width: 100%;">
                                            <el-option label="合同一" value="合同一"></el-option>
                                            <el-option label="合同二" value="合同二"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="合同附件">
                                        <el-input v-model="paidForm1.contractAppendix" auto-complete="off" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="合同金额（元）">
                                        <el-input v-model="paidForm1.contractMoney" auto-complete="off" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="剩余金额（元）">
                                        <el-input v-model="paidForm1. restingMoney" auto-complete="off" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="相关附件">
                                        <!-- action 上传的地址，必填 -->
                                        <Upload multiple type="drag" :before-upload="handleUpload" v-model="paidForm1.relativedAppendix" action="//jsonplaceholder.typicode.com/posts/">
                                            <div style="padding: 20px 0">
                                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                                <p>点击或将文件拖拽到这里上传</p>
                                            </div>
                                        </Upload>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="经办人">
                                        <el-input v-model="paidForm1.operator" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="经办日期">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="paidForm1.handlingDate" style="width: 100%;">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div class="table_title">
                            <div class="left" style="width:16.8%">
                                <span class="desc">{{ table_title }}</span>
                            </div>
                        </div>
                        <el-table :data="fundData2" border style="width: 100%" align="center">
                            <el-table-column label="基金名称" prop="foundName" align="center">
                            </el-table-column>
                            <el-table-column label="投资金额（元）" prop="investment" align="center">
                            </el-table-column>
                            <el-table-column label="股权占比（%）" prop="percent" align="center">
                            </el-table-column>
                            <el-table-column label="剩余金额（元）" prop="restingMoney" align="center">
                            </el-table-column>
                            <el-table-column label="支付金额（元）" prop="paidMoney" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.paidMoney }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.paidMoney" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template scope="scope">
                                    <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">编辑</el-button>
                                    <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">保存</el-button>
                                    <el-button type="text" size="small" @click="handleDelete(index,fundData2)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="paidAdd1 = false">取 消</el-button>
                            <el-button type="primary" @click="confirmPaidAdd1">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </el-collapse-item>
            <el-collapse-item title="项目分红" name="4">
                <!--  项目分红 部分-->
                <div class="fileTable sharingDialog">
                    <tabel-header :data="headerInfo_sharing" @add="sharingAdd1=true"></tabel-header>
                    <el-table :data="sharingData" border style="width: 100%" align="center" show-summary>
                        <el-table-column label="合同名称" prop="contractName" align="center">
                        </el-table-column>
                        <el-table-column label="合同金额（元）" prop="contractMoney" align="center">
                        </el-table-column>
                        <el-table-column label="分红金额（元）" prop="sharingMoney" align="center">
                        </el-table-column>
                        <el-table-column label="分红日期" prop="sharingDate" align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button type="text" size="small" @click="EditSharing(scope.row)">编辑</el-button>
                                <el-button type="text" size="small" @click="handleDelete(scope.$index,sharingData)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 添加项目分红 对话框-->
                    <el-dialog title="添加项目分红" :visible.sync="sharingAdd1" :close-on-click-modal="false">
                        <el-form :model="sharingForm1" label-width="110px">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="标题">
                                        <el-input v-model="sharingForm1.title" auto-complete="off" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="项目合同">
                                        <el-select v-model="sharingForm1.contractName" placeholder="请选择合同" style="width: 100%;">
                                            <el-option label="合同一" value="合同一"></el-option>
                                            <el-option label="合同二" value="合同二"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="合同金额（元）">
                                        <el-input v-model="sharingForm1.contractMoney" auto-complete="off" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="分红金额（元）">
                                        <el-input v-model="sharingForm1.sharingMoney" auto-complete="off" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="经办人">
                                        <el-input v-model="sharingForm1.operator" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="经办日期">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="sharingForm1.handlingDate" style="width: 100%;">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div class="table_title">
                            <div class="left" style="width:20.3%">
                                <span class="desc">{{ table_title }}</span>
                            </div>
                        </div>
                        <el-table :data="fundData3" border style="width: 100%" align="center">
                            <el-table-column label="基金名称" prop="foundName" align="center">
                            </el-table-column>
                            <el-table-column label="投资金额（元）" prop="investment" align="center">
                            </el-table-column>
                            <el-table-column label="股权占比（%）" prop="percent" align="center">
                            </el-table-column>
                            <el-table-column label="分红金额（元）" prop="sharingMoney" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.sharingMoney }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.sharingMoney" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template scope="scope">
                                    <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">编辑</el-button>
                                    <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">保存</el-button>
                                    <el-button type="text" size="small" @click="handleDelete(index,fundData3)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="sharingAdd1 = false">取 消</el-button>
                            <el-button type="primary" @click="confirmSharingAdd1">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </el-collapse-item>
            <el-collapse-item title="项目退出" name="5">
                <el-table :data="outingData1" border style="width: 100%" align="center">
                    <el-table-column label="标题" prop="title" align="center">
                    </el-table-column>
                    <el-table-column label="退出类型" prop="outingSort" align="center">
                    </el-table-column>
                    <el-table-column label="退出金额" prop="outingMoney" align="center">
                    </el-table-column>
                    <el-table-column label="相关附件" prop="relativedAppendix" align="center">
                    </el-table-column>
                    <el-table-column label="经办人" prop="operator" align="center">
                    </el-table-column>
                    <el-table-column label="回款日期" prop="handlingDate" align="center">
                    </el-table-column>
                </el-table>
                <div class="table_title" style="margin-top:10px">
                    <div class="left" style="width:25%;">
                        <span class="desc">{{ table_title }}</span>
                    </div>
                </div>
                <el-table :data="outingData2" border style="width: 100%" align="center">
                    <el-table-column label="基金名称" prop="foundName" align="center">
                    </el-table-column>
                    <el-table-column label="投资金额（元）" prop="investment" align="center">
                    </el-table-column>
                    <el-table-column label="股权占比（%）" prop="percent" align="center">
                    </el-table-column>
                    <el-table-column label="回款金额（元）" prop="outingMoney" align="center">
                    </el-table-column>
                </el-table>
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
            costAdd2: false,
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
            },
            costForm2: {
                costSort: '',
                money: '',
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
                    fundName: 'AAAAAA基金',
                    investment: '',
                    percent: '',
                    editFlag: false
                },
                {
                    fundName: 'BBBBBB基金',
                    investment: '',
                    percent: '',
                    editFlag: false
                }
            ],
            //投资支付
            paidForm1: {
                title: '',
                contractName: '',
                contractAppendix: '',
                contractMoney: '',
                restingMonry: '',
                relativedAppendix: '',
                operator: '',
                handlingDate: '',
                paidMoney: ''
            },
            paidData: [
                {
                    contractName: '合同名称',
                    contractMoney: '',
                    paidMoney: '10,000',
                    paidDate: '2017-9-9'
                }, {
                    contractName: '合同名称',
                    contractMoney: '',
                    paidMoney: '10,000',
                    paidDate: '2017-9-9'
                }
            ],
            headerInfo_paid: {
                desc: '投资支付',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            // 添加 投资支付时 的基金table
            fundData2: [
                {
                    foundName: 'AA基金',
                    investment: '500,000',
                    percent: '10',
                    restingMoney: '',
                    paidMoney: '',
                    editFlag: false
                },
                {
                    foundName: 'AA基金',
                    investment: '500,000',
                    percent: '10',
                    restingMoney: '',
                    paidMoney: '',
                    editFlag: false
                }
            ],
            // 项目分红
            sharingForm1: {
                title: '',
                contractName: '',
                contractMoney: '',
                sharingMoney: '',
                operator: '',
                handlingDate: '',
            },
            sharingForm2: {
                foundName: '',
                capitalMoney: '',
                percent: '',
                sharingMoney: '',
                sharingDate: ''
            },
            sharingData: [
                {
                    contractName: '合同名称',
                    contractMoney: '',
                    sharingMoney: '10,000',
                    sharingDate: '2017-9-9'
                }, {
                    contractName: '合同名称',
                    contractMoney: '',
                    sharingMoney: '10,000',
                    sharingDate: '2017-9-9'
                }
            ],
            headerInfo_sharing: {
                desc: '项目分红',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            // 添加 项目分红时 的基金table
            fundData3: [
                {
                    foundName: 'AA基金',
                    investment: '500,000',
                    percent: '10',
                    sharingMoney: '',
                    editFlag: false
                },
                {
                    foundName: 'AA基金',
                    investment: '500,000',
                    percent: '10',
                    sharingMoney: '',
                    editFlag: false
                }
            ],
            // 项目退出
            outingData1: [
                {
                    title: 'AAA项目',
                    outingSort: '',
                    outingMoney: '',
                    relativedAppendix: '',
                    operator: '',
                    handlingDate: ''
                }
            ],
            outingData2: [
                {
                    foundName: 'AA基金',
                    investment: '500,000',
                    percent: '10',
                    outingMoney: '10,000'
                }, {
                    foundName: 'AA基金',
                    investment: '500,000',
                    percent: '10',
                    outingMoney: '10,000'
                }
            ]
        }
    },
    methods: {
        confirmCostAdd1() {
            this.costData.push(this.costForm1);
            this.costForm1 = {};
            this.costAdd1 = false;
        },
        // 编辑 项目费用 的方法
        EditCost(row) {
            console.log(row);
            this.costForm2 = row;
            this.costAdd2 = true;
            this.confirmCostAdd2(row);
        },
        confirmCostAdd2(row) { //确定
            console.log(row);
            if (row) {
                const rows = row;
                return;
            } else if ('undefined') {
                // rows = this.costForm2;
                this.costAdd2 = false;
            }

        },


        // 添加 项目合同 的方法
        confirmFundAdd1() {
            this.fundData1.push(this.fundForm1);
            this.fundForm1 = {};
            this.fundAdd1 = false;
            this.contractAdd1 = true;
        },
        confirmContractAdd1() {
            this.contractData.push(this.contractForm1);
            this.contractForm1 = {};
            this.contractAdd1 = false;

        },


        // 添加 投资支付 的方法
        confirmPaidAdd1() {
            this.paidData.push(this.paidForm1);
            this.paidForm1 = {};
            this.paidAdd1 = false;
        },


        // 添加 项目分红 的方法
        confirmSharingAdd1() {
            this.sharingAdd1 = false;
            this.sharingData.push(this.sharingForm1);
        },
        // 编辑 项目分红 的方法
        EditSharing(row) {
            this.sharingAdd2 = true;
        },
        confirmSharingAdd2() {
            this.sharingAdd2 = false;
        },



        checkEdit(index, row) { // 出资主体的table 编辑
            // console.log(row)
            row.editFlag = !row.editFlag;
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
    width: 100%;
    height: 100%;
}

.table_title {
    width: 100%;
    height: 41px;
    display: flex;
    line-height: 41px;
    border: 1px solid #dfe6ec;
    border-bottom: none;
    background: #eef1f6;
    .left {
        text-align: center; // border-right: 1px solid #dfe6ec;
        // box-sizing: border-box;
        .desc {
            font-size: 18px;
            font-weight: 600;
            color: #1f2d3d;
        }
    }
    .right {
        height: 100%;
        .el-button {
            padding: 5px 15px;
        }
    }
}
</style>
