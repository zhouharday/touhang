<template>
    <section class="manage">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="项目费用" name="1">
                <div class="fileTable">
                    <tabel-header :data="headerInfo_cost" @add="costAdd1=true"></tabel-header>
                    <el-table :data="costData" border style="width: 100%" align="center">
                        <el-table-column label="费用类型" prop="costType" align="center">
                        </el-table-column>
                        <el-table-column label="金额（元）" prop="amountMoney" align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button type="text" @click="goEditFee(scope.row)">编辑</el-button>
                                <el-button type="text" @click="handleDelete(scope.$index,costData, 'fee')">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 添加项目费用 对话框-->
                    <el-dialog title="添加项目费用" :visible.sync="costAdd1" :close-on-click-modal="false">
                        <el-form :model="costForm1" label-width="100px">
                            <el-form-item label="费用类型">
                                <el-select v-model="costForm1.costTypeId" placeholder="请选择费用类型" style="width: 100%;">
                                    <el-option v-for="item in costSortOptions" :key="item.id" :label="item.dicName" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="金额（元）">
                                <el-input v-model="costForm1.amountMoney" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="default" @click="costAdd1 = false">取 消</el-button>
                            <el-button type="danger" @click="confirmCostAdd1">确 定</el-button>
                        </div>
                    </el-dialog>
                    <!-- 编辑项目费用 对话框-->
                    <el-dialog title="编辑项目费用" :visible.sync="costAdd2" :close-on-click-modal="false">
                        <el-form :model="costForm2" label-width="100px">
                            <el-form-item label="费用类型">
                                <el-select v-model="costForm2.costTypeId" placeholder="请选择费用类型" style="width: 100%;">
                                    <el-option v-for="item in costSortOptions" :key="item.id" :label="item.dicName" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="金额（元）">
                                <el-input v-model="costForm2.amountMoney" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="default" @click="costAdd2 = false">取 消</el-button>
                            <el-button type="danger" @click="confirmCostAdd2()">确 定</el-button>
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
                        <el-table-column label="签约日期" prop="signDate" align="center">
                        </el-table-column>
                        <el-table-column label="合同金额（元）" prop="contractAmount" align="center">
                        </el-table-column>
                        <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                        </el-table-column>
                        <el-table-column label="合同附件" prop="documentInfo" align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button type="text" @click="goEditContract(scope.row.id)">编辑</el-button>
                                <el-button type="text" @click="handleDelete(scope.$index,contractData, 'contract')">删除</el-button>
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
                                        <el-date-picker type="date" placeholder="选择日期" v-model="contractForm1.signDate" style="width: 100%;">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="合同金额（元）">
                                        <el-input v-model="contractForm1.contractAmount" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="股权占比（%）">
                                        <el-input v-model="contractForm1.stockRatio" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="经办人">
                                        <el-input v-model="contractForm1.operator" placeholder="默认当前登录用户" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="经办日期">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="contractForm1.handlingDate" style="width: 100%;">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="合同附件">
                                        <!-- action 上传的地址，必填 -->
                                        <Upload multiple type="drag" :before-upload="handleUpload" v-model="contractForm1.documentInfo" action="//jsonplaceholder.typicode.com/posts/">
                                            <div style="padding: 20px 0">
                                                <Icon type="ios-cloud-upload" size="52"></Icon>
                                                <p>点击或将文件拖拽到这里上传</p>
                                            </div>
                                        </Upload>
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
                            <el-table-column label="基金名称" prop="fundName" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.fundName }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-select v-model="scope.row.fundId" placeholder="请选择基金">
                                            <el-option v-for="item in myFundOptions" :key="item.id" :label="item.fundName" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="投资金额（元）" prop="investAmount" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.investAmount }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.investAmount" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.stockRatio }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.stockRatio" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template scope="scope">
                                    <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row, 'fundData1')">编辑</el-button>
                                    <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row, 'fundData1')">保存</el-button>
                                    <el-button type="text" size="small" @click="handleDelete(scope.$index,fundData1, 'invest')">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="contractAdd1 = false">取 消</el-button>
                            <el-button type="danger" @click="confirmContractAdd1">确 定</el-button>
                        </div>
                    </el-dialog>

                    <!-- 添加 出资主体dialog -->
                    <el-dialog title="添加出资主体" :visible.sync="fundAdd1" :close-on-click-modal="false">
                        <el-form :model="fundForm1" label-width="110px">
                            <el-form-item label="基金名称">
                                <el-select v-model="fundForm1.fund" placeholder="请选择基金" style="width: 100%">
                                    <el-option v-for="item in myFundOptions" :key="item.id" :label="item.fundName" :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="投资金额（元）">
                                <el-input v-model="fundForm1.investAmount" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="股权占比（%）">
                                <el-input v-model="fundForm1.stockRatio" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="contractAdd1 = true,fundAdd1 = false">取 消</el-button>
                            <el-button type="danger" @click="confirmFundAdd1">确 定</el-button>
                        </div>
                    </el-dialog>
                    <!-- 编辑项目合同 对话框-->
                    <el-dialog title="编辑项目合同" :visible.sync="contractAdd2" :close-on-click-modal="false">
                        <el-form :model="contractForm2" label-width="110px">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="合同名称">
                                        <el-input v-model="contractForm2.contractName" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="签约日期">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="contractForm2.signDate" style="width: 100%;">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="合同金额（元）">
                                        <el-input v-model="contractForm2.contractAmount" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="股权占比（%）">
                                        <el-input v-model="contractForm2.stockRatio" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="经办人">
                                        <el-input v-model="contractForm2.handlerUserId" placeholder="默认当前登录用户" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="经办日期">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="contractForm2.handlerDate" style="width: 100%;">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="合同附件">
                                        <!-- action 上传的地址，必填 -->
                                        <Upload multiple type="drag" :before-upload="handleUpload" v-model="contractForm2.appendix" action="//jsonplaceholder.typicode.com/posts/">
                                            <div style="padding: 20px 0">
                                                <Icon type="ios-cloud-upload" size="52"></Icon>
                                                <p>点击或将文件拖拽到这里上传</p>
                                            </div>
                                        </Upload>
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
                            <el-table-column label="基金名称" prop="fundName" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.fundName }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-select v-model="scope.row.fundId" placeholder="请选择基金">
                                            <el-option v-for="item in myFundOptions" :key="item.id" :label="item.fundName" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="投资金额（元）" prop="investAmount" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.investAmount }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.investAmount" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.stockRatio }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.stockRatio" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template scope="scope">
                                    <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row, 'fundData1')">编辑</el-button>
                                    <!-- <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row, 'fundData1')">保存</el-button> -->
                                    <el-button v-if="scope.row.editFlag" type="text" size="small" @click="saveFund(scope.$index,scope.row, 'fundData1')">保存</el-button>
                                    <el-button type="text" size="small" @click="handleDelete(scope.$index,fundData1, 'invest')">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="contractAdd2 = false">取 消</el-button>
                            <el-button type="danger" @click="confirmContractAdd2(contractForm2.id)">确 定</el-button>
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
                        <el-table-column label="合同金额（元）" prop="contractAmount" align="center">
                        </el-table-column>
                        <el-table-column label="支付金额（元）" prop="paidInMoney" align="center">
                        </el-table-column>
                        <el-table-column label="支付日期" prop="payDate" align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button type="text" @click="paidAdd2=true">编辑</el-button>
                                <el-button type="text" @click="handleDelete(scope.$index,paidData, 'pay')">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 添加投资支付 对话框-->
                    <el-dialog title="添加投资支付" :visible.sync="paidAdd1" :close-on-click-modal="false" style="width：65%;">
                        <el-form :model="paidForm1" label-width="110px">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="标题">
                                        <el-input v-model="paidForm1.payTitle" auto-complete="off" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="项目合同">
                                        <el-select @change="selContract" value-key="id" v-model="paidForm1.contract" placeholder="请选择合同" style="width: 100%;">
                                            <el-option v-for="item in contractData" :key="item.id" :label="item.contractName" :value="item">
                                            </el-option>
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
                                        <el-input v-model="paidForm1.contractAmount" auto-complete="off" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="剩余金额（元）">
                                        <el-input v-model="paidForm1.surplusAmount" auto-complete="off" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="经办人">
                                        <el-input v-model="paidForm1.handleUserId" placeholder="默认当前登录用户" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="支付日期">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="paidForm1.payDate" style="width: 100%;">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="相关附件">
                                        <!-- action 上传的地址，必填 -->
                                        <Upload multiple type="drag" :before-upload="handleUpload" v-model="paidForm1.relativedAppendix" action="//jsonplaceholder.typicode.com/posts/">
                                            <div style="padding: 20px 0">
                                                <Icon type="ios-cloud-upload" size="52"></Icon>
                                                <p>点击或将文件拖拽到这里上传</p>
                                            </div>
                                        </Upload>
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
                            <el-table-column label="基金名称" prop="fundName" align="center">
                            </el-table-column>
                            <el-table-column label="投资金额（元）" prop="investAmount" align="center">
                            </el-table-column>
                            <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                            </el-table-column>
                            <el-table-column label="剩余金额（元）" prop="surplusAmount" align="center">
                            </el-table-column>
                            <el-table-column label="支付金额（元）" prop="payAmount" align="center">
                                <template scope="scope">
                                    <!-- <span v-if="!scope.row.editFlag">{{ scope.row.payAmount }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input"> -->
                                        <el-input v-model="scope.row.payAmount" placeholder="0">{{ scope.row.payAmount }}</el-input>
                                    <!-- </span> -->
                                </template>
                            </el-table-column>
                            <!-- <el-table-column label="操作" align="center">
                                <template scope="scope">
                                    <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row, 'fundData2')">编辑</el-button>
                                    <el-button v-if="scope.row.editFlag" type="text" size="small" @click="saveFundPay(scope.$index,scope.row, 'fundData2')">保存</el-button>
                                    <el-button type="text" size="small" @click="handleDelete(scope.$index,fundData2, 'fund2')">删除</el-button>
                                </template>
                            </el-table-column> -->
                        </el-table>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="default" @click="paidAdd1 = false">取 消</el-button>
                            <el-button type="danger" @click="confirmPaidAdd1">确 定</el-button>
                        </div>
                    </el-dialog>
                    <!-- 编辑投资支付 对话框-->
                    <el-dialog title="编辑投资支付" :visible.sync="paidAdd2" :close-on-click-modal="false" style="width：65%;">
                        <el-form :model="paidForm1" label-width="110px">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="标题">
                                        <el-input v-model="paidForm1.payTitle" auto-complete="off" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="项目合同">
                                        <el-select @change="selContract" value-key="id" v-model="paidForm1.contract" placeholder="请选择合同" style="width: 100%;">
                                            <el-option v-for="item in contractData" :key="item.id" :label="item.contractName" :value="item">
                                            </el-option>
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
                                        <el-input v-model="paidForm1.contractAmount" auto-complete="off" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="剩余金额（元）">
                                        <el-input v-model="paidForm1.surplusAmount" auto-complete="off" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="经办人">
                                        <el-input v-model="paidForm1.handleUserId" placeholder="默认当前登录用户" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="支付日期">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="paidForm1.payDate" style="width: 100%;">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col>
                                    <el-form-item label="相关附件">
                                        <!-- action 上传的地址，必填 -->
                                        <Upload multiple type="drag" :before-upload="handleUpload" v-model="paidForm1.relativedAppendix" action="//jsonplaceholder.typicode.com/posts/">
                                            <div style="padding: 20px 0">
                                                <Icon type="ios-cloud-upload" size="52"></Icon>
                                                <p>点击或将文件拖拽到这里上传</p>
                                            </div>
                                        </Upload>
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
                            <el-table-column label="基金名称" prop="fundName" align="center">
                            </el-table-column>
                            <el-table-column label="投资金额（元）" prop="investAmount" align="center">
                            </el-table-column>
                            <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                            </el-table-column>
                            <el-table-column label="剩余金额（元）" prop="surplusAmount" align="center">
                            </el-table-column>
                            <el-table-column label="支付金额（元）" prop="payAmount" align="center">
                                <template scope="scope">
                                    <!-- <span v-if="!scope.row.editFlag">{{ scope.row.payAmount }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input"> -->
                                        <el-input v-model="scope.row.payAmount" placeholder="0">{{ scope.row.payAmount }}</el-input>
                                    <!-- </span> -->
                                </template>
                            </el-table-column>
                            <!-- <el-table-column label="操作" align="center">
                                <template scope="scope">
                                    <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row, 'fundData2')">编辑</el-button>
                                    <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row, 'fundData2')">保存</el-button>
                                    <el-button type="text" size="small" @click="handleDelete(scope.$index,fundData2,'last')">删除</el-button>
                                </template>
                            </el-table-column> -->
                        </el-table>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="default" @click="paidAdd2 = false">取 消</el-button>
                            <el-button type="danger" @click="confirmPaidAdd2">确 定</el-button>
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
                        <el-table-column label="合同金额（元）" prop="contractAmount" align="center">
                        </el-table-column>
                        <el-table-column label="分红金额（元）" prop="shareAmount" align="center">
                        </el-table-column>
                        <el-table-column label="分红日期" prop="shareDate" align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button type="text" size="small" @click="sharingAdd2=true">编辑</el-button>
                                <el-button type="text" size="small" @click="handleDelete(scope.$index,sharingData,'share')">删除</el-button>
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
                                            <el-option v-for="item in contractData" :key="item.id" :label="item.contractName" :value="item">
                                            </el-option>
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
                                        <el-input v-model="sharingForm1.operator" placeholder="默认当前登录用户" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="分红日期">
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
                            <el-table-column label="基金名称" prop="fundName" align="center">
                            </el-table-column>
                            <el-table-column label="投资金额（元）" prop="investAmount" align="center">
                            </el-table-column>
                            <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                            </el-table-column>
                            <el-table-column label="分红金额（元）" prop="sharingMoney" align="center">
                                <template scope="scope">
                                    <!-- <span v-if="!scope.row.editFlag">{{ scope.row.sharingMoney }}</span>
                                        <span v-if="scope.row.editFlag" class="cell-edit-input"> -->
                                    <el-input v-model="scope.row.sharingMoney" placeholder="0" @input="valueSum">{{ scope.row.sharingMoney }}</el-input>
                                    <!-- </span> -->
                                </template>
                            </el-table-column>
                            <!-- <el-table-column label="操作" align="center">
                                    <template scope="scope">
                                        <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row, 'fundData3')">编辑</el-button>
                                        <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row, 'fundData3')">保存</el-button>
                                        <el-button type="text" size="small" @click="handleDelete(index, fundData3, '')">删除</el-button>
                                    </template>
                                </el-table-column> -->
                        </el-table>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="sharingAdd1 = false">取 消</el-button>
                            <el-button type="danger" @click="confirmSharingAdd1">确 定</el-button>
                        </div>
                    </el-dialog>
                    <!-- 编辑项目分红 对话框-->
                    <el-dialog title="编辑项目分红" :visible.sync="sharingAdd2" :close-on-click-modal="false">
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
                                            <el-option v-for="item in contractData" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
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
                                        <el-input v-model="sharingForm1.operator" placeholder="默认当前登录用户" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="分红日期">
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
                            <el-table-column label="投资金额（元）" prop="investAmount" align="center">
                            </el-table-column>
                            <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                            </el-table-column>
                            <el-table-column label="分红金额（元）" prop="sharingMoney" align="center">
                                <template scope="scope">
                                    <!-- <span v-if="!scope.row.editFlag">{{ scope.row.sharingMoney }}</span>
                                        <span v-if="scope.row.editFlag" class="cell-edit-input"> -->
                                   <el-input v-model="scope.row.sharingMoney" placeholder="0" @input="valueSum">{{ scope.row.sharingMoney }}</el-input>
                                    <!-- </span> -->
                                </template>
                            </el-table-column>
                            <!-- <el-table-column label="操作" align="center">
                                    <template scope="scope">
                                        <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row, 'fundData3')">编辑</el-button>
                                        <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row, 'fundData3')">保存</el-button>
                                        <el-button type="text" size="small" @click="handleDelete(index,fundData3)">删除</el-button>
                                    </template>
                                </el-table-column> -->
                        </el-table>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="default" @click="sharingAdd2 = false">取 消</el-button>
                            <el-button type="danger" @click="confirmSharingAdd2">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </el-collapse-item>
        </el-collapse>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import tabelHeader from 'components/tabelHeader'
import { getDicChildren } from 'common/js/dictionary'
import { changeDate } from 'common/js/config'
import { delGu, delContract, delFee, addFee, editFee, fees, addContract, contracts, getContractDetail, editContract, getContractPay, addContractPay, getParticipationList } from 'api/projectPre';

export default {
    computed: mapGetters({
        costSortOptions: 'getCostSortOptions',   // 获取费用类型
        myFundOptions: 'getMyFundOptions'    //本商户的可签约基金列表
    }),
    props: {
        proId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            activeNames: ['1'],
            costAdd1: false,
            costAdd2: false,
            contractAdd1: false,
            contractAdd2: false,
            fundAdd1: false,
            paidAdd1: false,
            paidAdd2: false,
            sharingAdd1: false,
            sharingAdd2: false,
            //项目费用
            costForm1: {},
            costForm2: {},
            costData: [],
            headerInfo_cost: {
                desc: '项目费用',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            // 项目合同
            contractForm1: {},
            contractForm2: {},
            contractData: [],
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
                investAmount: '',
                stockRatio: '',
                editFlag: false
            },
            fundData1: [],
            // 添加 投资支付时 的基金table
            fundData2: [],
            fundData3: [],
            //投资支付
            paidForm1: {
                payTitle: '',
                contract: '',
                contractId: '',
                payAmount: 0,
                surplusAmount: 0,
                contractName: '',
                contractAppendix: '',
                contractMoney: '',
                restingMonry: '',
                relativedAppendix: '',
                handleUserId: '',
                payDate: '',
                paidMoney: ''
            },
            paidData: [],
            headerInfo_paid: {
                desc: '投资支付',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
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
                stockRatio: '',
                sharingMoney: '',
                sharingDate: ''
            },
            sharingData: [],
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
                    investAmount: '500,000',
                    stockRatio: '10',
                    sharingMoney: '',
                    editFlag: false
                }
            ]
        }
    },
    created() {
        this.$store.dispatch('getCostSortOptions')
        this.$store.dispatch('getMyFundOptions')
        this.init();
    },
    methods: {
        init() {
            this.getFee();
            this.getContract();
            this.getContractPay();
            this.getParticipation();
        },
        //获取费用列表
        getFee() {
            fees(this.proId).then(resp => {
                if (resp.data.status === '200') {
                    this.costData = resp.data.result;
                }
            }).catch(e => {
                console.log('getFee() exists error: ', e);
            })
        },
        //打开编辑 项目费用
        goEditFee(row) {
            this.costAdd2 = !this.costAdd2;
            this.costForm2 = row;
        },
        // 保存 项目费用 确定按钮
        confirmCostAdd2() {
            editFee(this.costForm2).then(resp => {
                if (resp.data.status === '200') {
                    this.getFee();
                    this.costAdd2 = !this.costAdd2;
                }
            }).catch(e => {
                console.log('confirmCostAdd2() exists error: ', e);
            })

        },
        // 添加 项目费用  确定按钮
        confirmCostAdd1() {
            let costTypeId = this.costForm1.costTypeId,
                amountMoney = this.costForm1.amountMoney,
                projectId = this.proId;
            let params = {
                costTypeId,
                amountMoney,
                projectId
            };
            console.log("addFee params:" + JSON.stringify(params));
            addFee(params).then(resp => {
                console.log('addFee resp: ', resp.data);
                this.getFee();
                this.costForm1 = {
                    costTypeId: '',
                    amountMoney: ''
                };
                this.costAdd1 = !this.costAdd1;
            }).catch(e => {
                console.log('addFee() exists error: ', e);
            })
        },
        //获取投资支付列表
        getContractPay() {
            getContractPay(this.proId).then(resp => {
                // console.log('getContractPay resp: '+ JSON.stringify( resp.data));
                if (resp.data.status === '200') {
                    this.paidData = resp.data.result.list;
                }
            }).catch(e => {
                console.log('getContractPay() exists error: ', e);
            })
        },
        //获取项目分红列表
        getParticipation() {
            getParticipationList(this.proId).then(resp => {
                // console.log('getParticipationList resp: '+ JSON.stringify( resp.data));
                if (resp.data.status === '200') {
                    this.sharingData = resp.data.result.list;
                }
            }).catch(e => {
                console.log('getParticipationList() exists error: ', e);
            })
        },
        //获取合同列表
        getContract() {
            contracts(this.proId).then(resp => {
                if (resp.data.status === '200') {
                    this.contractData = resp.data.result;
                }
            }).catch(e => {
                console.log('contracts() exists error: ', e);
            })
        },
        // 添加 项目合同 确定按钮
        confirmContractAdd1() {
            let projectContract = {
                projectId: this.proId,
                contractName: this.contractForm1.contractName,
                signDate: this.contractForm1.signDate,
                contractAmount: this.contractForm1.contractAmount,
                stockRatio: this.contractForm1.stockRatio,
                handlerUserId: this.contractForm1.handlerUserId,
                handlerDate: this.contractForm1.handlerDate
            };
            let data = {
                projectContract: projectContract,
                fundInfo: this.fundData1
            }
            console.log("添加项目合同  :: " + JSON.stringify(data));
            addContract(projectContract, this.fundData1).then(resp => {
                console.log('addContract resp: ', resp.data);
                if (resp.data.status == '200') {
                    this.contractForm1 = {};
                    this.fundData1 = [];
                    this.contractAdd1 = false;
                    this.getContract();
                }
            }).catch(e => {
                console.log('addContract() exists error: ', e);
            })
        },
        // 添加出资主体 确定按钮
        confirmFundAdd1() {
            let fundId = this.fundForm1.fund.id,
                fundName = this.fundForm1.fund.fundName,
                investAmount = this.fundForm1.investAmount,
                stockRatio = this.fundForm1.stockRatio;
            let data = {
                fundId,
                fundName,
                investAmount,
                stockRatio
            };
            this.fundData1.push(data);
            this.fundForm1 = {
                fundName: '',
                investAmount: '',
                stockRatio: '',
                editFlag: false
            };
            this.fundAdd1 = false;
            this.contractAdd1 = true;
        },
        //打开编辑 项目合同
        goEditContract(id) {
            this.contractAdd2 = !this.contractAdd2;
            getContractDetail(id).then(resp => {
                if (resp.data.status == '200') {
                    this.contractForm2 = resp.data.result.projectContract;
                    this.fundData1 = resp.data.result.fundInfo;
                }
            }).catch(e => {
                console.log('addContract() exists error: ', e);
            })
        },
        // 编辑 项目合同  确定按钮
        confirmContractAdd2(id) {
            let projectContract = {
                id: id,
                contractName: this.contractForm2.contractName,
                signDate: this.contractForm2.signDate,
                contractAmount: this.contractForm2.contractAmount,
                stockRatio: this.contractForm2.stockRatio,
                handlerUserId: this.contractForm2.handlerUserId,
                handlerDate: this.contractForm2.handlerDate
            };
            let data = {
                projectContract: projectContract,
                fundInfo: this.fundData1
            }
            console.log("修改项目合同  :: " + JSON.stringify(data));
            editContract(projectContract, this.fundData1).then(resp => {
                console.log('editContract resp: ', resp.data);
                if (resp.data.status == '200') {
                    this.contractForm2 = {};
                    this.fundData1 = [];
                    this.contractAdd2 = !this.contractAdd2;
                    this.getContract();
                }
            }).catch(e => {
                console.log('editContract() exists error: ', e);
            })
        },
        //保存投资主体
        saveFund(index, row, type = 'fundData1') {
            row.editFlag = !row.editFlag;
            this.fundData1[index].fundName = row.fundId.label;
            this.fundData1.push();
        },
        //保存投资支付-明细行
        saveFundPay(index, row, type = 'fundData2') {
            row.editFlag = !row.editFlag;
            if (row.investAmount < row.payAmount) {
                //TODO message
            } else {
                this.fundData2[index].surplusAmount = row.investAmount - row.payAmount | 0;
            }
            this.calcSurplusAmount();
            this.fundData2.push();
        },
        //计算总剩余金额/支付金额
        calcSurplusAmount() {
            let surplus = 0, payAmount = 0;
            this.fundData2.forEach(function(item, index) {
                surplus += item.surplusAmount | 0;
                payAmount += item.payAmount | 0;
            });
            this.paidForm1.surplusAmount = surplus;
            this.paidForm1.payAmount = payAmount;
            console.log("总剩余金额：" + this.paidForm1.surplusAmount + ",总支付金额：" + this.paidForm1.payAmount);
        },
        //选择投资支付的合同
        selContract(value) {
            if (!value) return;
            this.paidForm1.payTitle = value.contractName | '';
            this.paidForm1.contractAmount = value.contractAmount | 0;
            this.paidForm1.contractId = value.contractId;
            //获得合同中的投资主体(基金)列表
            getContractDetail(value.id).then(resp => {
                console.log('选择的合同详情: ', resp.data.result);
                if (resp.data.status == '200') {
                    // this.fundData2 = resp.data.result.fundInfo;
                    this.calcSurplusAmount();
                }
            }).catch(e => {
                console.log('selContract() exists error: ', e);
            })
        },
        // 添加 投资支付 确定按钮
        confirmPaidAdd1() {
            console.log("合同ID" + this.paidForm1.contractId);
            let projectInvestPay = {
                projectId: this.proId,
                investBeforeId: this.$route.params.investProjectId,
                paidInMoney: this.paidForm1.payAmount,
                contractId: this.paidForm1.contractId,
                payTitle: this.paidForm1.payTitle,
                surplusAmount: this.paidForm1.surplusAmount,
                handlerUserId: this.paidForm1.handlerUserId,
                payDate: this.paidForm1.payDate
            };
            let data = {
                projectInvestPay: projectInvestPay,
                payDetails: this.fundData2
            }
            this.fundData2.forEach(function(item, index) {
                item.contractFundId = item.id;
            });
            console.log("添加投资支付  :: " + JSON.stringify(data));
            addContractPay(projectInvestPay, this.fundData2).then(resp => {
                console.log('addContractPay resp: ', resp.data);
                if (resp.data.status == '200') {
                    this.getContractPay();
                    this.paidForm1 = {};
                    this.fundData2 = [];
                    this.paidAdd1 = false;
                }
            }).catch(e => {
                console.log('addContractPay() exists error: ', e);
            })
        },
        // 编辑 投资支付 确定按钮
        confirmPaidAdd2() {
            this.paidAdd2 = !this.paidAdd2;
        },
        // 合计
        valueSum() {
            let sum = 0;
            for (let i = 0; i < this.fundData3.length; i++) {
                //   console.log(typeof(this.fundData2[i].payAmount));
                //   console.log(typeof(parseFloat(this.fundData2[i].payAmount)));
                  sum += (parseFloat(this.fundData3[i].sharingMoney));
                  this.sharingForm1.sharingMoney = sum;
                  //   console.log(sum);
            }
        },
        // 添加 项目分红 确定按钮
        confirmSharingAdd1() {
            this.sharingAdd1 = false;
            this.sharingData.push(this.sharingForm1);
        },
        // 编辑 项目分红 确定按钮
        confirmSharingAdd2() {
            this.sharingAdd2 = !this.sharingAdd2;
        },
        checkEdit(index, row, type = '') { // 出资主体的table 编辑
            // console.log(row)
            row.editFlag = !row.editFlag;
            if (type == 'fundData1') {
                this.fundData1.push();
            } else if (type == 'fundData2') {
                this.fundData2.push();
            } else if (type == 'fundData3') {
                this.fundData3.push();
            }
        },
        // 删除当前行
        handleDelete(index, rows = [], type = '') {

            let row = rows[index];
            if (!row) return console.warn('del row was null', row);
            let id = row.id;
            console.log("DEL_ID" + id);
            switch (type) {
                case 'fee': // 删除费用
                    delFee(id).then(resp => {
                        console.log('delFee resp: ', resp);
                        rows.splice(index, 1);
                        // TODO: 请求列表接口,
                    }).catch(e => {
                        console.log('delFee() exists error: ', e);
                    })
                    break;
                case 'contract': // 删除合同
                    delContract(id).then(resp => {
                        console.log('delContract resp: ', resp);
                        rows.splice(index, 1);
                        // TODO: 请求列表接口
                    }).catch(e => {
                        console.log('delContract() exists error: ', e);
                    })
                    break;
                case 'invest':   // 删除投资主体
                    rows.splice(index, 1);
                    break;
                case 'pay':      // 删除?
                    break;
                case 'fund2':    // 删除基金
                    break;
                case 'share':    // 删除分红

                    break;
            }
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
