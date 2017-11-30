<template>
    <section class="manage">
        <Tabs value="cost" @on-click="changeTabs">
            <TabPane label="项目费用" name="cost" :disabled="!checkProjectAuth('GL-XMFY')">
                <!-- 项目费用 部分 -->
                <div class="fileTable">
                    <tabel-header :data="checkProjectAuth('GL-XMFY-XZ') ? headerInfo_cost : _headerInfo_cost" @add="costAdd1=true"></tabel-header>
                    <el-table :data="costData" border style="width: 100%" align="center">
                        <el-table-column label="费用类型" prop="costType" align="center">
                        </el-table-column>
                        <el-table-column label="金额（元）" prop="amountMoney" align="center">
                            <template scope="scope">{{scope.row.amountMoney | toMoney}}</template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button v-if="checkProjectAuth('GL-XMFY-BJ')" type="text" @click="goEditFee(scope.row)">编辑</el-button>
                                <el-button v-if="checkProjectAuth('GL-XMFY-SC')" type="text" @click="handleDelete(scope.$index,costData, 'fee')">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </TabPane>
            <TabPane label="项目合同" name="contract" :disabled="!checkProjectAuth('GL-XMHT')">
                <!-- 项目合同 部分 -->
                <div class="fileTable">
                    <tabel-header :data="checkProjectAuth('GL-XMHT-XZ') ? headerInfo_contract: _headerInfo_contract" @add="goAddContract"></tabel-header>
                    <el-table :data="contractData" border style="width: 100%" align="center" show-summary>
                        <el-table-column label="合同名称" prop="contractName" align="center">
                        </el-table-column>
                        <el-table-column label="签约日期" prop="signDate" align="center">
                            <template scope="scope">{{scope.row.signDate | formatDate}}</template>
                        </el-table-column>
                        <el-table-column label="合同金额（元）" prop="contractAmount" align="center">
                            <template scope="scope">{{scope.row.contractAmount | toMoney}}</template>
                        </el-table-column>
                        <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button v-if="checkProjectAuth('GL-XMHT-BJ') && (scope.row.status == 1)" type="text" @click="goEditContract(scope.row.id)">编辑</el-button>
                                <el-button v-if="checkProjectAuth('GL-XMHT-SC') && (scope.row.status == 1)" type="text" @click="handleDelete(scope.$index,contractData, 'contract')">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </TabPane>
            <TabPane label="投资支付" name="paid" :disabled="!checkProjectAuth('GL-TZZF')">
                <!-- 投资支付 部分 -->
                <div class="fileTable capitalDialog">
                    <tabel-header :data="checkProjectAuth('GL-TZZF-XZ') ? headerInfo_paid : _headerInfo_paid" @add="goAddPaid"></tabel-header>
                    <el-table :data="paidData" border style="width: 100%" align="center" show-summary="true" :summary-method="getPaySummaries">
                        <el-table-column label="合同名称" prop="contractName" align="center">
                        </el-table-column>
                        <el-table-column label="合同金额（元）" prop="contractAmount" align="center">
                            <template scope="scope">{{scope.row.contractAmount | toMoney}}</template>
                        </el-table-column>
                        <el-table-column label="支付金额（元）" prop="paidInMoney" align="center">
                            <template scope="scope">{{scope.row.paidInMoney | toMoney}}</template>
                        </el-table-column>
                        <el-table-column label="支付日期" prop="payDate" align="center">
                            <template scope="scope">
                                <div>{{scope.row.payDate | formatDate}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button v-if="checkProjectAuth('GL-TZZF-BJ') && (scope.$index == 0)" type="text" @click="goEditPay(scope.row.id)">编辑</el-button>
                                <el-button v-if="checkProjectAuth('GL-TZZF-SC') && (scope.$index == 0)" type="text" @click="handleDelete(scope.$index,paidData, 'pay')">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </TabPane>
            <TabPane label="项目分红" name="sharing" :disabled="!checkProjectAuth('GL-XMFH')">
                <!--  项目分红 部分-->
                <div class="fileTable sharingDialog">
                    <tabel-header :data="checkProjectAuth('GL-XMFH-XZ') ? headerInfo_sharing : _headerInfo_sharing" @add="goAddShare"></tabel-header>
                    <el-table :data="sharingData" border style="width: 100%" align="center" show-summary :summary-method="getShareSummaries">
                        <el-table-column label="合同名称" prop="contractName" align="center">
                        </el-table-column>
                        <el-table-column label="合同金额（元）" prop="contractAmount" align="center">
                            <template scope="scope">{{scope.row.contractAmount | toMoney}}</template>
                        </el-table-column>
                        <el-table-column label="分红金额（元）" prop="shareAmount" align="center">
                            <template scope="scope">{{scope.row.shareAmount | toMoney}}</template>
                        </el-table-column>
                        <el-table-column label="分红日期" prop="shareDate" align="center">
                            <template scope="scope">{{scope.row.shareDate | formatDate}}</template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button v-if="checkProjectAuth('GL-XMFH-BJ') && (scope.$index == 0)" type="text" size="small" @click="goEditShare(scope.row.id)">编辑</el-button>
                                <el-button v-if="checkProjectAuth('GL-XMFH-SC') && (scope.$index == 0)" type="text" size="small" @click="handleDelete(scope.$index,sharingData,'share')">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </TabPane>
        </Tabs>
        <!-- 添加项目费用 对话框-->
        <el-dialog title="添加项目费用" :visible.sync="costAdd1" :close-on-click-modal="false">
            <el-form :model="costForm1" label-position="right" label-width="100px">
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
            <el-form :model="costForm2" label-position="right" label-width="100px">
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
        <!-- 添加项目合同 对话框-->
        <el-dialog title="添加项目合同" :visible.sync="contractAdd1" :close-on-click-modal="false">
            <el-form :model="contractForm1" :rules="contractRule1" ref="contractForm1" label-position="right" label-width="110px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同名称" prop="contractName">
                            <el-input v-model="contractForm1.contractName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="签约日期" prop="signDate">
                            <el-date-picker @input="setSignDate" :editable="false" type="date" placeholder="选择日期" v-model="contractForm1.signDate" style="width: 100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同金额（元）" prop="contractAmount">
                            <el-input v-model="contractForm1.contractAmount" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="股权占比（%）" prop="stockRatio">
                            <el-input v-model.number="contractForm1.stockRatio" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="经办人">
                            <el-input v-model="userName" placeholder="默认当前登录用户" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="经办日期">
                            <el-date-picker type="date" placeholder="选择日期" v-model="contractForm1.handlerDate" style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="合同附件">
                            <upload-files @uploadSuccess="uploadSuccess($event, 'contractDocInfo')" @removeSucess="removeSucess($event, 'contractDocInfo')" :documentInfo="contractDocInfo"></upload-files>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="table_title" style="justify-content:space-between;">
                <div class="left" style="width:25.2%">
                    <span class="desc">{{ table_title }}</span>
                </div>
                <div class="right">
                    <el-button type="danger" @click="fundAdd1=true">添加</el-button>
                </div>
            </div>
            <el-table :data="fundData1" border style="width: 100%" align="center">
                <el-table-column label="基金名称" prop="fundName" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.fundName }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-select value-key="id" v-model="scope.row.fundId" placeholder="请选择基金">
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
                            <el-input v-model="scope.row.investAmount" @change="changeInvestAmount" placeholder=""></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.stockRatio }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.stockRatio" @change="changeInvestAmount" placeholder=""></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row, 'fundData1')">编辑</el-button>
                        <el-button v-if="scope.row.editFlag" type="text" size="small" @click="saveFund(scope.$index,scope.row, 'fundData1')">保存</el-button>
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
            <el-form :model="fundForm1" :rules="rules2" ref="fundForm1" label-position="right" label-width="120px">
                <el-form-item label="基金名称" prop="fundId">
                    <el-select v-model="fundForm1.fundId" placeholder="请选择基金" style="width: 100%">
                        <el-option v-for="item in myFundOptions" :key="item.id" :label="item.fundName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="投资金额（元）" prop="investAmount">
                    <el-input v-model.number="fundForm1.investAmount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="股权占比（%）" prop="stockRatio">
                    <el-input v-model.number="fundForm1.stockRatio" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="contractAdd1 = true,fundAdd1 = false">取 消</el-button>
                <el-button type="danger" @click="confirmFundAdd1">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑项目合同 对话框-->
        <el-dialog title="编辑项目合同" :visible.sync="contractAdd2" :close-on-click-modal="false">
            <el-form :model="contractForm2" :rules="contractRule1" ref="contractForm2" label-position="right" label-width="110px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同名称" prop="contractName">
                            <el-input v-model="contractForm2.contractName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="签约日期" prop="signDate">
                            <el-date-picker @input="setSignDate" :editable="false" type="date" placeholder="选择日期" v-model="contractForm2.signDate" style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同金额（元）" prop="contractAmount">
                            <el-input v-model="contractForm2.contractAmount" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="股权占比（%）" prop="stockRatio">
                            <el-input v-model.number="contractForm2.stockRatio" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="经办人">
                            <el-input v-model="userName" placeholder="默认当前登录用户" disabled></el-input>
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
                            <upload-files @uploadSuccess="uploadSuccess($event, 'contractDocInfo')" @removeSucess="removeSucess($event, 'contractDocInfo')" :documentInfo="contractDocInfo"></upload-files>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="table_title" style="justify-content:space-between;">
                <div class="left" style="width:25.2%">
                    <span class="desc">{{ table_title }}</span>
                </div>
                <div class="right">
                    <el-button type="danger" @click="fundAdd1=true">添加</el-button>
                </div>
            </div>
            <el-table :data="fundData1" border style="width: 100%" align="center">
                <el-table-column label="基金名称" prop="fundName" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.fundName }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-select value-key="id" v-model="scope.row.fundId" placeholder="请选择基金">
                                <el-option v-for="item in myFundOptions" :key="item.id" :label="item.fundName" :value="item.id">
                                </el-option>
                            </el-select>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="投资金额（元）" prop="investAmount" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.investAmount | toMoney}}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.investAmount" @change="changeInvestAmount" placeholder=""></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.stockRatio }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.stockRatio" @change="changeInvestAmount" placeholder=""></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row, 'fundData1')">编辑</el-button>
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
        <!-- 添加投资支付 对话框-->
        <el-dialog title="添加投资支付" :visible.sync="paidAdd1" :close-on-click-modal="false" style="width：65%;">
            <el-form :model="paidForm1" :rules="paidRules" ref="paidForm1" label-position="right" label-width="110px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="标题" prop="payTitle">
                            <el-input v-model="paidForm1.payTitle" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目合同" prop="contractId">
                            <el-select @change="selContract" v-model="paidForm1.contractId" placeholder="请选择合同" style="width: 100%;">
                                <el-option v-for="item in contractData" :key="item.id" :label="item.contractName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="合同附件">
                            <div class="appendixBox">
                                <p v-for="item in contractDocument" :key="item.index">
                                    <a :href="item.filePath" style="font-size:12px;" download="item.fileName">{{item.fileName}}</a>
                                </p>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同金额（元）" prop="contractAmount">
                            <el-input v-model="paidForm1.contractAmount" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="剩余金额（元）" prop="surplusAmount">
                            <el-input v-model="paidForm1.surplusAmount" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="经办人">
                            <el-input v-model="userName" placeholder="默认当前登录用户" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="支付日期" prop="payDate">
                            <el-date-picker @input="setPayDate" type="date" placeholder="选择日期" v-model="paidForm1.payDate" style="width: 100%;" :editable="false">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="相关附件">
                            <upload-files @uploadSuccess="uploadSuccess($event, 'payDocInfo')" @removeSucess="removeSucess($event, 'payDocInfo')" :documentInfo="payDocInfo"></upload-files>
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
                        <el-input v-model="scope.row.payAmount" placeholder="0" @change="sumPay">{{ scope.row.payAmount }}</el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="default" @click="paidAdd1 = false">取 消</el-button>
                <el-button type="danger" @click="confirmPaidAdd1">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑投资支付 对话框-->
        <el-dialog title="编辑投资支付" :visible.sync="paidAdd2" :close-on-click-modal="false" style="width：65%;">
            <el-form :model="paidForm1" :rules="paidRules" ref="paidForm1" label-position="right" label-width="110px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="标题" prop="payTitle">
                            <el-input v-model="paidForm1.payTitle" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目合同" prop="contractId">
                            <el-select @change="selContract" value-key="id" v-model="paidForm1.contractId" placeholder="请选择合同" style="width: 100%;">
                                <el-option v-for="item in contractData" :key="item.id" :label="item.contractName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="合同附件" prop="contractAppendix">
                            <div class="appendixBox">
                                <p v-for="item in contractDocument" :key="item.index">
                                    <a :href="item.filePath" style="font-size:12px;" download="item.fileName">{{item.fileName}}</a>
                                </p>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同金额（元）" prop="contractAmount">
                            <el-input v-model="paidForm1.contractAmount" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="剩余金额（元）" prop="surplusAmount">
                            <el-input v-model="paidForm1.surplusAmount" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="经办人">
                            <el-input v-model="userName" placeholder="默认当前登录用户" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="支付日期" prop="payDate">
                            <el-date-picker @input="setPayDate" type="date" placeholder="选择日期" v-model="paidForm1.payDate" style="width: 100%;" :editable="false">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="相关附件">
                            <upload-files @uploadSuccess="uploadSuccess($event, 'payDocInfo')" @removeSucess="removeSucess($event, 'payDocInfo')" :documentInfo="payDocInfo"></upload-files>
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
                        <el-input v-model="scope.row.payAmount" placeholder="0" @change="sumPay">{{ scope.row.payAmount }}</el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="default" @click="paidAdd2 = false">取 消</el-button>
                <el-button type="danger" @click="confirmPaidAdd2(paidForm1.id)">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 添加项目分红 对话框-->
        <el-dialog title="添加项目分红" :visible.sync="sharingAdd1" :close-on-click-modal="false">
            <el-form :model="sharingForm1" ref="sharingForm1" label-position="right" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="标题" prop="shareTitle">
                            <el-input v-model="sharingForm1.shareTitle" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目合同" prop="contractId" :rules="selContractRule">
                            <el-select @change="selShareContract" v-model="sharingForm1.contractId" placeholder="请选择合同" style="width: 100%;">
                                <el-option v-for="item in contractData" :key="item.id" :label="item.contractName" :value="item.id" :disabled="item.status == 1">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同金额（元）" prop="contractAmount">
                            <el-input v-model="sharingForm1.contractAmount" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分红金额（元）" prop="shareAmount">
                            <el-input v-model="sharingForm1.shareAmount" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="经办人">
                            <el-input v-model="userName" placeholder="默认当前登录用户" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分红日期" prop="shareDate" :rules="dateRule">
                            <el-date-picker @input="setShareDate" :editable="false" type="date" placeholder="选择日期" v-model="sharingForm1.shareDate" style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="相关附件">
                            <upload-files @uploadSuccess="uploadSuccess($event, 'shareDocInfo')" @removeSucess="removeSucess($event, 'shareDocInfo')" :documentInfo="shareDocInfo"></upload-files>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="table_title">
                    <div class="left" style="width:20.3%">
                        <span class="desc">{{ table_title }}</span>
                    </div>
                </div>
                <el-table :data="sharingForm1.fundData3" border style="width: 100%" align="center">
                    <el-table-column label="基金名称" prop="fundName" align="center">
                    </el-table-column>
                    <el-table-column label="投资金额（元）" prop="investAmount" align="center">
                    </el-table-column>
                    <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                    </el-table-column>
                    <el-table-column label="分红金额（元）" prop="shareAmount" align="center">
                        <template scope="scope">
                            <el-form-item prop="shareAmount" :rules="amountRule" label-width="0px" height="100%" style="margin-bottom: 0;">
                                <el-input v-model.number="scope.row.shareAmount" placeholder="请输入分红金额" @input="valueSum"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="sharingAdd1 = false">取 消</el-button>
                <el-button type="danger" @click="confirmSharingAdd1">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑项目分红 对话框-->
        <el-dialog title="编辑项目分红" :visible.sync="sharingAdd2" :close-on-click-modal="false">
            <el-form :model="sharingForm2" ref="sharingForm2" label-position="right" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="标题" prop="shareTitle">
                            <el-input v-model="sharingForm2.shareTitle" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目合同" prop="contractId" :rules="selContractRule">
                            <el-select @change="selShareContract" v-model="sharingForm2.contractId" placeholder="请选择合同" style="width: 100%;" disabled>
                                <el-option v-for="item in contractData" :key="item.id" :label="item.contractName" :value="item.id" :disabled="item.status == 1">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同金额（元）" prop="contractAmount">
                            <el-input v-model="sharingForm2.contractAmount" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分红金额（元）" prop="shareAmount">
                            <el-input v-model="sharingForm2.shareAmount" auto-complete="off" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="经办人">
                            <el-input v-model="userName" placeholder="默认当前登录用户" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分红日期" prop="shareDate" :rules="dateRule">
                            <el-date-picker @input="setShareDate" :editable="false" type="date" placeholder="选择日期" v-model="sharingForm2.shareDate" style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="相关附件">
                            <upload-files @uploadSuccess="uploadSuccess($event, 'shareDocInfo')" @removeSucess="removeSucess($event, 'shareDocInfo')" :documentInfo="shareDocInfo"></upload-files>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="table_title">
                    <div class="left" style="width:20.3%">
                        <span class="desc">{{ table_title }}</span>
                    </div>
                </div>
                <el-table :data="sharingForm2.fundData3" border style="width: 100%" align="center">
                    <el-table-column label="基金名称" prop="fundName" align="center">
                    </el-table-column>
                    <el-table-column label="投资金额（元）" prop="investAmount" align="center">
                    </el-table-column>
                    <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                    </el-table-column>
                    <el-table-column label="分红金额（元）" prop="shareAmount" align="center">
                        <template scope="scope">
                            <el-form-item prop="shareAmount" :rules="amountRule" label-width="0px" height="100%">
                                <el-input v-model.number="scope.row.shareAmount" placeholder="请输入分红金额" @input="valueSum"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="default" @click="sharingAdd2 = false">取 消</el-button>
                <el-button type="danger" @click="confirmSharingAdd2(sharingForm2.id)">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import 'common/js/filter'
import { mapGetters } from 'vuex'
import tabelHeader from 'components/tabelHeader'
import uploadFiles from 'components/uploadFiles'
import { getDicChildren } from 'common/js/dictionary'
import { changeDate, checkProjectAuth } from 'common/js/config'
import {
    delGu, delContract, delFee, addFee, editFee, fees,
    addContract, contracts, getContractDetail, editContract,
    getContractPay, addContractPay, getContractPayDetail, editContractPay, delPay,
    getParticipationList, addParticipation, getParticipationDetail, editParticipation, delShare
} from 'api/projectPre';

export default {
    computed: mapGetters({
        costSortOptions: 'getCostSortOptions',   // 获取费用类型
        myFundOptions: 'getMyFundOptions'    //本商户的可签约基金列表
    }),
    props: {
        tabs: {
            type: Object,
            default: {}
        },
        proId: {
            type: String,
            default: ''
        },
        isInTeam: {
            type: Boolean,
            default: false
        },
        authList: {
            type: Array,
            default: []
        }
    },
    components: {
        tabelHeader,
        uploadFiles
    },
    data() {
        return {
            userName: JSON.parse(sessionStorage.getItem('userInfor')).name, //当前用户
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
            isEditPay: false,
            isEditShare: false,
            //项目费用
            costForm1: {
                costTypeId: ''
            },
            costForm2: {
                costTypeId: ''
            },
            costData: [],
            _headerInfo_cost: {
                desc: '项目费用',
                btnGroup: []
            },
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
                signDate: '',
                handlerDate: ''
            },
            contractRule1: {
                contractName: [
                    { required: true, message: '请输入合同名称', trigger: 'blur' }
                ],
                signDate: [
                    { required: true, message: '请选择签约日期', trigger: 'blur' }
                ]
            },
            contractForm2: {},
            contractData: [],
            _headerInfo_contract: {
                desc: '项目合同',
                btnGroup: []
            },
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
                fundId: '',
                fundName: '',
                investAmount: '',
                stockRatio: '',
                editFlag: false
            },
            rules2: {
                fundId: [
                    { required: true, message: '请选择基金', trigger: 'blur' }
                ],
                investAmount: [
                    { type: 'number', required: true, message: '请输入投资金额数值', trigger: 'blur' }
                ],
                stockRatio: [
                    { type: 'number', required: true, message: '请输入股权占比数值', trigger: 'blur' }
                ]
            },
            fundData1: [],
            // 添加 投资支付时 的基金table
            fundData2: [],
            // 添加 项目分红时 的基金table
            fundData3: [],
            //投资支付
            paidForm1: {
                payTitle: '',
                contract: '',
                contractId: '',
                payAmount: 0,
                surplusAmount: 0,
                contractName: '',
                handlerUserId: '',
                payDate: '',
                paidInMoney: 0
            },
            contractDocument: [],
            paidRules: {
                contractId: [
                    { required: true, message: '请选择项目合同', trigger: 'change' }
                ],
                payDate: [
                    { required: true, message: '请选择支付日期', trigger: 'change' }
                ]
            },
            paidData: [],
            _headerInfo_paid: {
                desc: '投资支付',
                btnGroup: []
            },
            headerInfo_paid: {
                desc: '投资支付',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            // 项目分红
            sharingForm1: {
                id: '',
                contractId: '',
                shareTitle: '',
                shareAmount: 0,
                handlerUserId: '',
                shareDate: '',
                fundData3: []
            },
            // 项目分红
            sharingForm2: {
                id: '',
                contractId: '',
                shareTitle: '',
                shareAmount: 0,
                handlerUserId: '',
                shareDate: '',
                fundData3: []
            },
            rules4: {
                contractId: [
                    { required: true, message: '请选择项目合同', trigger: 'change' }
                ],
                shareDate: [
                    { required: true, message: '请选择分红日期', trigger: 'change' }
                ],
                shareAmount: [
                    { type: 'number', message: '分红金额必须是数字', trigger: 'blur, change' }
                ]
            },
            selContractRule: [
                { required: true, message: '请选择项目合同', trigger: 'blur' }
            ],
            dateRule: [
                { required: true, message: '请选择分红日期', trigger: 'blur' }
            ],
            amountRule:[
                { type: 'number', message: '金额必须是数字' }
            ],
            sharingData: [],
            headerInfo_sharing: {
                desc: '项目分红',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            _headerInfo_sharing: {
                desc: '项目分红',
                btnGroup: []
            },
            contractDocInfo: [],
            payDocInfo: [],
            shareDocInfo: []
        }
    },
    created() {
        this.$store.dispatch('getCostSortOptions')
        this.$store.dispatch('getMyFundOptions')
        // this.init();
    },
    watch: {
        'tabs': function(to, from) {
            if (to.tabList[6]) {
                this.init();
            }
        }
    },
    methods: {
        checkProjectAuth(code){
            if (!this.authList) {
                return false;
            }
            return checkProjectAuth(code, this.authList) && this.isInTeam;
        },
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
                } else if (resp.data.status === '49999') {
                    this.costData = [];
                } else {
                    this.$message.error(resp.data.message);
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
                } else {
                    this.$message.error(resp.data.message);
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
            addFee(params).then(resp => {
                if (resp.data.status === '200') {
                    this.getFee();
                    this.costForm1 = {
                        costTypeId: '',
                        amountMoney: ''
                    };
                    this.costAdd1 = !this.costAdd1;
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('addFee() exists error: ', e);
            })
        },
        //获取投资支付列表
        getContractPay() {
            getContractPay(this.proId).then(resp => {
                // console.log('获取投资支付列表: '+ JSON.stringify( resp.data));
                if (resp.data.status === '200') {
                    this.paidData = resp.data.result.list;
                } else if (resp.data.status === '49999') {
                    this.paidData = [];
                } else {
                    this.$message.error(resp.data.message);
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
                } else if (resp.data.status === '49999') {
                    this.sharingData = [];
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('getParticipationList() exists error: ', e);
            })
        },
        getPaySummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                // console.log(column.property);
                if (!values.every(value => isNaN(value)) && column.property == 'paidInMoney') {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    // sums[index] += ' 元';
                } else {
                    sums[index] = '';
                }
            });
            return sums;
        },
        getShareSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                // console.log(column.property);
                if (!values.every(value => isNaN(value)) && column.property == 'shareAmount') {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    // sums[index] += ' 元';
                } else {
                    sums[index] = '';
                }
            });
            return sums;
        },
        //获取合同列表
        getContract() {
            contracts(this.proId).then(resp => {
                if (resp.data.status === '200') {
                    this.contractData = resp.data.result;
                } else if (resp.data.status === '49999') {
                    this.contractData = [];
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('contracts() exists error: ', e);
            })
        },
        // 打开添加 项目合同
        goAddContract() {
            this.contractAdd1 = true;
            this.contractForm1 = {
                contractName: '',
                signDate: '',
                contractAmount: '',
                stockRatio: '',
                handlerDate: ''
            };
            this.contractDocInfo = [];
            this.fundData1 = [];
            this.fundData1.push();
        },
        // 添加 项目合同 确定按钮
        confirmContractAdd1() {
            this.$refs["contractForm1"].validate((valid) => {
                if (valid) {
                    let projectContract = {
                        projectId: this.proId,
                        contractName: this.contractForm1.contractName,
                        signDate: changeDate(this.contractForm1.signDate),
                        contractAmount: this.contractForm1.contractAmount,
                        stockRatio: this.contractForm1.stockRatio,
                        handlerUserId: (this.contractForm1.handlerUserId != '' && this.contractForm1.handlerUserId != undefined)
                            ? this.contractForm1.handlerUserId : JSON.parse(sessionStorage.getItem('userInfor')).id,
                        handlerDate: changeDate(this.contractForm1.handlerDate),
                        documentInfo: this.contractDocInfo
                    };
                    let data = {
                        projectContract: projectContract,
                        fundInfo: this.fundData1
                    }
                    addContract(projectContract, this.fundData1).then(resp => {
                        if (resp.data.status == '200') {

                            this.contractAdd1 = false;
                            this.getContract();
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    }).catch(e => {
                        console.log('addContract() exists error: ', e);
                    })
                }
                else {
                    return false;
                }
            });
        },
        // 添加出资主体 确定按钮
        confirmFundAdd1() {
            this.$refs["fundForm1"].validate((valid) => {
                if (valid) {
                    let fundId = this.fundForm1.fundId;
                    let fundName = '';
                    this.myFundOptions.forEach(item => {
                        if (fundId == item.id) {
                            fundName = item.fundName;
                        }
                    });
                    this.$set(this.$data.fundForm1, 'fundName', fundName);
                    this.fundData1.push(this.fundForm1);

                    this.fundForm1 = {
                        fundId: '',
                        fundName: '',
                        investAmount: '',
                        stockRatio: '',
                        editFlag: false
                    };
                    this.fundAdd1 = false;
                    this.changeInvestAmount();
                }
            });
        },
        //打开编辑 项目合同
        goEditContract(id) {
            this.contractAdd2 = !this.contractAdd2;
            getContractDetail(id).then(resp => {
                // console.log("打开编辑 项目合同：" + JSON.stringify(resp.data));
                if (resp.data.status == '200') {
                    this.contractForm2 = resp.data.result.projectContract;

                    let documentInfo = resp.data.result.projectContract.documentInfo;
                    documentInfo.forEach(item => {
                        item.name = item.name == null ? item.fileName : item.name;
                        item.url = item.url == null ? item.filePath : item.url;
                    });
                    this.contractDocInfo = documentInfo;

                    this.fundData1 = resp.data.result.fundInfo;
                    this.fundData1.forEach(function(item, index) {
                        item.id = ''; //清空主体，删除已有的，重新添加
                    });
                    this.fundData1.push();
                }
            }).catch(e => {
                console.log('addContract() exists error: ', e);
            })
        },
        // 编辑 项目合同  确定按钮
        confirmContractAdd2(id) {
            this.$refs["contractForm2"].validate((valid) => {
                if (valid) {
                    let projectContract = this.contractForm2;

                    projectContract.handlerUserId = (this.contractForm2.handlerUserId != '' && this.contractForm2.handlerUserId != undefined)
                        ? this.contractForm2.handlerUserId : JSON.parse(sessionStorage.getItem('userInfor')).id,
                        projectContract.handlerDate = changeDate(this.contractForm2.handlerDate),
                        projectContract.signDate = changeDate(this.contractForm2.signDate),
                        projectContract.documentInfo = this.contractDocInfo;
                    let data = {
                        projectContract: projectContract,
                        fundInfo: this.fundData1
                    }
                    // console.log("编辑 项目合同:"+JSON.stringify(data));
                    editContract(projectContract, this.fundData1).then(resp => {
                        // console.log("编辑 项目合同:"+JSON.stringify(resp.data));
                        if (resp.data.status == '200') {
                            this.contractForm2 = {};
                            this.fundData1 = [];
                            this.fundData1.push();
                            this.contractAdd2 = !this.contractAdd2;
                            this.getContract();
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    }).catch(e => {
                        console.log('editContract() exists error: ', e);
                    })
                }
            });
        },
        //保存投资主体
        saveFund(index, row, type = 'fundData1') {
            row.editFlag = !row.editFlag;
            let fundName = '';
            let fundId = row.fundId;
            this.myFundOptions.forEach(item => {
                if (fundId == item.id) {
                    fundName = item.fundName;
                }
            });
            row.fundName = fundName;
            this.fundData1.push();
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
        },
        //选择投资支付的合同
        selContract(value) {
            if (!value) return false;
            if (this.isEditPay) {
                this.isEditPay = false;
                return false;
            }
            // this.paidForm1.payTitle = "投资支付-" + value.contractName;
            //获得合同中的投资主体(基金)列表
            getContractDetail(value).then(resp => {
                if (resp.data.status == '200') {

                    this.$set(this.$data.paidForm1, 'contractAmount', resp.data.result.projectContract.contractAmount);
                    this.contractDocument = resp.data.result.projectContract.documentInfo;
                    this.fundData2 = resp.data.result.fundInfo;

                    this.fundData2.forEach(function(item, index) {
                        item.contractFundId = item.id;
                        item.id = '';
                    });
                    this.calcSurplusAmount();
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('selContract() exists error: ', e);
            })
        },
        //打开添加投资支付
        goAddPaid() {
            if (this.contractData.length == 1) {
                let contract = this.contractData[0];
                this.paidForm1.contractAmount = contract.contractAmount;
                this.paidForm1.contractId = contract.id;
                this.paidForm1.payTitle = '';
                this.paidForm1.payDate = '';
                //获得合同中的投资主体(基金)列表
                getContractDetail(contract.id).then(resp => {
                    if (resp.data.status == '200') {
                        this.$set(this.$data.paidForm1, 'contractAmount', resp.data.result.projectContract.contractAmount);
                        this.contractDocument = resp.data.result.projectContract.documentInfo;
                        this.fundData2 = resp.data.result.fundInfo;

                        this.fundData2.forEach(function(item, index) {
                            item.contractFundId = item.id;
                            item.id = '';
                        });
                        this.sumPay();
                        this.calcSurplusAmount();
                    } else {
                        this.$message.error(resp.data.message);
                    }
                }).catch(e => {
                    console.log('selContract() exists error: ', e);
                });
            } else {
                this.paidForm1 = {
                    contractId: '',
                    payAmount: '',
                    payTitle: '',
                    contractAmount: '',
                    surplusAmount: '',
                    stockRatio: '',
                    payDate: ''
                };
                this.fundData2 = [];
                this.fundData2.push();
            }
            this.contractDocument = [];
            this.payDocInfo = [];
            this.paidAdd1 = true;
        },
        // 添加 投资支付 确定按钮
        confirmPaidAdd1() {
            this.$refs["paidForm1"].validate((valid) => {
                if (valid) {
                    let projectInvestPay = {
                        projectId: this.proId,
                        investBeforeId: this.$route.params.investProjectId,
                        paidInMoney: this.paidForm1.payAmount,
                        contractId: this.paidForm1.contractId,
                        payTitle: this.paidForm1.payTitle,
                        surplusAmount: this.paidForm1.surplusAmount,
                        handlerUserId: (this.paidForm1.handlerUserId != '' && this.paidForm1.handlerUserId != undefined)
                            ? this.paidForm1.handlerUserId : JSON.parse(sessionStorage.getItem('userInfor')).id,
                        // payDate: changeDate(this.paidForm1.payDate == '' ? new Date(): this.paidForm1.payDate),
                        payDate: changeDate(this.paidForm1.payDate),
                        documentInfo: this.payDocInfo
                    };
                    let data = {
                        projectInvestPay: projectInvestPay,
                        payDetails: this.fundData2
                    }
                    addContractPay(projectInvestPay, this.fundData2).then(resp => {
                        if (resp.data.status == '200') {
                            this.init();
                            this.paidForm1 = {};
                            this.fundData2 = [];
                            this.paidAdd1 = false;
                            this.payDocInfo = [];
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    }).catch(e => {
                        console.log('addContractPay() exists error: ', e);
                    })
                }
            });
        },
        //打开编辑投资支付
        goEditPay(id) {
            getContractPayDetail(id).then(resp => {
                if (resp.data.status == '200') {
                    this.isEditPay = true;
                    this.paidForm1 = resp.data.result.projectInvestPay;
                    this.contractDocument = resp.data.result.projectInvestPay.contractDocument;
                    let documentInfo = resp.data.result.projectInvestPay.documentInfo;
                    documentInfo.forEach(item => {
                        item.name = item.name == null ? item.fileName : item.name;
                        item.url = item.url == null ? item.filePath : item.url;
                    });
                    this.payDocInfo = documentInfo;

                    this.fundData2 = resp.data.result.payDetails;
                    this.paidAdd2 = !this.paidAdd2;
                    this.sumPay();
                    this.calcSurplusAmount();
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('getContractPayDetail() exists error: ', e);
            })
        },
        // 编辑 投资支付 确定按钮
        confirmPaidAdd2(id) {
            this.$refs["paidForm1"].validate((valid) => {
                if (valid) {
                    let projectInvestPay = {
                        id: id,
                        projectId: this.proId,
                        paidInMoney: 0, //支付金额，页面不展示，后台计算 0值没意义
                        payTitle: this.paidForm1.payTitle,
                        surplusAmount: this.paidForm1.surplusAmount,
                        contractId: this.paidForm1.contractId,
                        handlerUserId: (this.paidForm1.handlerUserId != '' && this.paidForm1.handlerUserId != undefined)
                            ? this.paidForm1.handlerUserId : JSON.parse(sessionStorage.getItem('userInfor')).id,
                        // payDate: changeDate(this.paidForm1.payDate == '' ? new Date(): this.paidForm1.payDate),
                        payDate: changeDate(this.paidForm1.payDate),
                        documentInfo: this.payDocInfo
                    };
                    let data = {
                        projectInvestPay: projectInvestPay,
                        payDetails: this.fundData2
                    }
                    editContractPay(projectInvestPay, this.fundData2).then(resp => {
                        if (resp.data.status == '200') {
                            this.init();
                            this.paidForm1 = {};
                            this.fundData2 = [];
                            this.paidAdd2 = !this.paidAdd2;
                            this.payDocInfo = [];
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    }).catch(e => {
                        console.log('editContractPay() exists error: ', e);
                    });
                }
            });
        },
        changeInvestAmount() {
            let sumAmount = 0.0, sumStockRatio = 0.0;
            for (let i = 0; i < this.fundData1.length; i++) {
                sumAmount += (parseFloat(this.fundData1[i].investAmount | 0));
                sumStockRatio += (parseFloat(this.fundData1[i].stockRatio | 0));
            }
            this.$set(this.$data.contractForm1, 'contractAmount', sumAmount);
            this.$set(this.$data.contractForm1, 'stockRatio', sumStockRatio);
            this.contractForm2.contractAmount = sumAmount;
            this.contractForm2.stockRatio = sumStockRatio;
        },
        //投资支付金额合计
        sumPay() {
            let sum = 0.0, sumSurplus = 0.0;
            for (let i = 0; i < this.fundData2.length; i++) {
                sum += (parseFloat(this.fundData2[i].payAmount | 0));
                this.fundData2[i].surplusAmount = this.fundData2[i].investAmount - (this.fundData2[i].payAmount || 0.0);
                sumSurplus += this.fundData2[i].surplusAmount;
            }
            this.paidForm1.surplusAmount = sumSurplus;
        },
        // 分红金额合计
        valueSum() {
            let sum = 0.0;
            for (let i = 0; i < this.sharingForm1.fundData3.length; i++) {
                sum += parseFloat(this.sharingForm1.fundData3[i].shareAmount || 0);
            }
            // this.sharingForm1.shareAmount = sum;
            this.$set(this.$data.sharingForm1, 'shareAmount', sum);
            sum = 0.0;
            for (let i = 0; i < this.sharingForm2.fundData3.length; i++) {
                sum += parseFloat(this.sharingForm2.fundData3[i].shareAmount || 0);
            }
            // this.sharingForm2.shareAmount = sum;
            this.$set(this.$data.sharingForm2, 'shareAmount', sum);
        },
        //选择项目分红的合同
        selShareContract(value) {
            if (!value) return;
            if (this.isEditShare) {
                this.isEditShare = false;
                return false;
            }
            //获得合同中的投资主体(基金)列表
            getContractDetail(value).then(resp => {
                if (resp.data.status == '200') {
                    let _fundData3 = resp.data.result.fundInfo;
                    this.$set(this.$data.sharingForm1, 'contractAmount', resp.data.result.projectContract.contractAmount);
                    this.$set(this.$data.sharingForm2, 'contractAmount', resp.data.result.projectContract.contractAmount);
                    _fundData3.forEach(function(item, index) {
                        item.contractFundId = item.id;
                        item.shareAmount = '';
                        item.id = '';
                    });
                    this.sharingForm1.fundData3 = _fundData3;
                    this.valueSum();
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('选择项目分红的合同 error: ', e);
            })
        },
        //打开添加项目分红
        goAddShare() {
            this.sharingForm1 = {
                shareTitle: '',
                contractId: '',
                contractAmount: 0,
                shareAmount: 0.0,
                shareDate: changeDate(new Date()),
                fundData3: []
            };
            this.shareDocInfo = [];
            this.sharingAdd1 = true;
            this.isEditShare = false;
        },
        // 添加 项目分红 确定按钮
        confirmSharingAdd1() {
            this.$refs["sharingForm1"].validate((valid) => {
                if (valid) {
                    let projectParticipation = {
                        projectId: this.proId,
                        shareDate: changeDate(this.sharingForm1.shareDate),
                        shareTitle: this.sharingForm1.shareTitle,
                        contractId: this.sharingForm1.contractId,
                        shareAmount: this.sharingForm1.shareAmount,
                        handlerUserId: (this.sharingForm1.handlerUserId != '' && this.sharingForm1.handlerUserId != undefined)
                            ? this.sharingForm1.handlerUserId : JSON.parse(sessionStorage.getItem('userInfor')).id,
                        documentInfo: this.shareDocInfo
                    };
                    let data = {
                        projectParticipation: projectParticipation,
                        participationDetails: this.sharingForm1.fundData3
                    }
                    addParticipation(projectParticipation, this.sharingForm1.fundData3).then(resp => {
                        if (resp.data.status == '200') {
                            this.init();
                            this.sharingForm1 = {
                                shareTitle: '',
                                contractId: '',
                                contractAmount: 0,
                                shareAmount: 0.0,
                                shareDate: changeDate(new Date()),
                                fundData3: []
                            };
                            this.sharingAdd1 = false;
                            this.shareDocInfo = [];
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    }).catch(e => {
                        console.log('添加 项目分红 error: ', e);
                    })
                }
            });
        },
        //打开编辑 项目分红
        goEditShare(id) {
            getParticipationDetail(id).then(resp => {
                if (resp.data.status == '200') {
                    this.isEditShare = true;
                    this.sharingForm2 = resp.data.result.projectParticipation;

                    let documentInfo = resp.data.result.projectParticipation.documentInfo;
                    documentInfo.forEach(item => {
                        item.name = item.name == null ? item.fileName : item.name;
                        item.url = item.url == null ? item.filePath : item.url;
                    });
                    this.shareDocInfo = documentInfo;
                    let shareList = resp.data.result.participationDetails
                    shareList.forEach((item)=>{
                        item.shareAmount = parseFloat((parseFloat(item.shareAmount) || 0.0).toFixed(2));
                        console.log(typeof(item.shareAmount));
                    });
                    this.sharingForm2.fundData3 = shareList;
                    // this.valueSum();
                    this.sharingAdd2 = !this.sharingAdd2;
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('打开编辑 项目分红 error: ', e);
            })
        },
        // 编辑 项目分红 确定按钮
        confirmSharingAdd2(id) {
            this.$refs["sharingForm2"].validate((valid) => {
                if (valid) {
                    let projectParticipation = {
                        id: id,
                        projectId: this.proId,
                        shareTitle: this.sharingForm2.shareTitle,
                        shareAmount: this.sharingForm2.shareAmount,
                        handlerUserId: (this.sharingForm2.handlerUserId != '' && this.sharingForm1.handlerUserId != undefined)
                            ? this.sharingForm2.handlerUserId : JSON.parse(sessionStorage.getItem('userInfor')).id,
                        shareDate: changeDate(this.sharingForm2.shareDate),
                        documentInfo: this.shareDocInfo
                    };
                    let data = {
                        projectParticipation: projectParticipation,
                        participationDetails: this.sharingForm2.fundData3
                    }
                    editParticipation(projectParticipation, this.sharingForm2.fundData3).then(resp => {
                        console.log('editParticipation resp: ', resp.data);
                        if (resp.data.status == '200') {
                            this.init();
                            this.sharingForm2 = {};
                            this.fundData3 = [];
                            this.sharingAdd2 = !this.sharingAdd2;
                            this.shareDocInfo = [];
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    }).catch(e => {
                        console.log('编辑 项目分红 error: ', e);
                    })
                }
            });
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
                        if (resp.data.status == '200') {
                            this.getFee();
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    }).catch(e => {
                        console.log('delFee() exists error: ', e);
                    })
                    break;
                case 'contract': // 删除合同
                    delContract(id).then(resp => {
                        console.log('delContract resp: ', resp);
                        if (resp.data.status == '200') {
                            this.init();
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    }).catch(e => {
                        console.log('delContract() exists error: ', e);
                    })
                    break;
                case 'invest':   // 删除投资主体
                    rows.splice(index, 1);
                    break;
                case 'pay':      // 删除投资支付
                    delPay(id).then(resp => {
                        console.log('delPay resp: ', resp);
                        if (resp.data.status == '200') {
                            this.init();
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    }).catch(e => {
                        console.log('delPay() exists error: ', e);
                    })
                    break;
                case 'share':    // 删除项目分红
                    delShare(id).then(resp => {
                        console.log('delShare resp: ', resp);
                        if (resp.data.status == '200') {
                            this.init();
                        } else {
                            this.$message.error(resp.data.message);
                        }
                    }).catch(e => {
                        console.log('delShare() exists error: ', e);
                    })
                    break;
            }
        },
        uploadSuccess(documentInfo, dataName) {
            this.$set(this.$data, dataName, documentInfo);
        },
        removeSucess(documentInfo, dataName) {
            this.$set(this.$data, dataName, documentInfo);
        },
        setPayDate(val) {
            this.$set(this.$data.paidForm1, 'payDate', '' + val);
        },
        setSignDate(val) {
            this.$set(this.$data.contractForm1, 'signDate', '' + val);
            this.$set(this.$data.contractForm2, 'signDate', '' + val);
        },
        setShareDate(val) {
            this.$set(this.$data.sharingForm1, 'shareDate', '' + val);
        }
    }
}
</script>

<style lang="less" scoped>
.fileTable {
    width: 100%;
    height: 100%;
}

// 附件样式
.appendixBox {
    width: 100%;
    min-height: 35px;
    padding: 3px 10px;
    background: #eef1f6;
    border-radius: 4px;
    border: 1px solid #ddd;
    >p {
        height: 20px;
        line-height: 20px;
    }
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
