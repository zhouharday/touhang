<template>
    <div class="table">
        <div class="topBtn">
            <div class="leftBtn">
                <el-button @click="changeData1" :class="{active:f_show}">经营数据</el-button>
                <el-button @click="changeData2" :class="{active:s_show}">财务数据</el-button>
            </div>
            <div class="rightBtn">
                <el-button type="danger" size="small" @click="addData">添加</el-button>
            </div>
        </div>
        <div class="f_data" v-show="f_show">
            <el-table :data="operatingData" border style="width: 100%">
                <el-table-column label="基准日" prop="baseDate" align="center">
                </el-table-column>
                <el-table-column label="类型" prop="sort" align="center">
                </el-table-column>
                <el-table-column label="填报人" prop="informant" align="center">
                </el-table-column>
                <el-table-column label="填报日期" prop="date" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="operatingModal2 =true">添加数据</el-button>
                        <el-button type="text" @click="operatingDelete=true">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 添加经营数据表头 对话框-->
            <el-dialog title="添加经营数据表头" :visible.sync="operatingModal1" :close-on-click-modal="false">
                <el-form :model="operatingForm1" :label-width="formLabelWidth">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="基准日">
                                <el-date-picker type="date" placeholder="选择日期" v-model="operatingForm1.baseDate" style="width:100%;">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="类型">
                                <el-select v-model="operatingForm1.sort" placeholder="请选择类型" style="width:100%;">
                                    <el-option v-for="item in sortOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="填报人">
                                <el-input placeholder="默认登录用户" v-model="operatingForm1.informant" auto-complete="off" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="填报日期">
                                <el-input placeholder="当前默认日期" v-model="operatingForm1.date" style="width:100%;" disabled>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="备注">
                                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="operatingForm1.remark">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="经营情况附件">
                                <Upload multiple type="drag" v-model="operatingForm1.appendix" action="//jsonplaceholder.typicode.com/posts/">
                                    <div style="padding: 20px 0">
                                        <Icon type="ios-cloud-upload" size="52"></Icon>
                                        <p>点击或将文件拖拽到这里上传</p>
                                    </div>
                                </Upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="operatingModal1 = false">取 消</el-button>
                    <el-button type="danger" @click="operatingAdd">保 存</el-button>
                </div>
            </el-dialog>
            <!-- 添加经营数据明细 对话框 -->
            <el-dialog title="添加经营数据明细" :visible.sync="operatingModal2" :close-on-click-modal="false" class="editData">
                <el-table :data="operatingData1" border style="width:100%">
                    <el-table-column label="项目" prop="project" align="center">
                        <template scope="scope">
                            <span v-if="!scope.row.editFlag">{{ scope.row.project }}</span>
                            <span v-if="scope.row.editFlag" class="cell-edit-input">
                                <el-input v-model="scope.row.project" placeholder=""></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="经营目标" prop="operatingGoal" align="center">
                        <template scope="scope">
                            <span v-if="!scope.row.editFlag">{{ scope.row.operatingGoal }}</span>
                            <span v-if="scope.row.editFlag" class="cell-edit-input">
                                <el-input v-model="scope.row.operatingGoal" placeholder=""></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="截止基准日实际情况" prop="realSituation" align="center">
                        <template scope="scope">
                            <span v-if="!scope.row.editFlag">{{ scope.row.realSituation }}</span>
                            <span v-if="scope.row.editFlag" class="cell-edit-input">
                                <el-input v-model="scope.row.realSituation" placeholder=""></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="完成率" prop="completionRate" align="center">
                        <template scope="scope">
                            <span v-if="!scope.row.editFlag">{{ scope.row.completionRate }}</span>
                            <span v-if="scope.row.editFlag" class="cell-edit-input">
                                <el-input v-model="scope.row.completionRate" placeholder=""></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="下半年计划" prop="secondPlan" align="center">
                        <template scope="scope">
                            <span v-if="!scope.row.editFlag">{{ scope.row.secondPlan }}</span>
                            <span v-if="scope.row.editFlag" class="cell-edit-input">
                                <el-input v-model="scope.row.secondPlan" placeholder=""></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="100" align="center">
                        <template scope="scope">
                            <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="operatingModal3=true">添加
                            </el-button>
                            <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">编辑
                            </el-button>
                            <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">保存
                            </el-button>
                            <el-button type="text" size="small" @click="handleDelete(scope.$index,operatingData1)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="operatingModal2 = false">取 消</el-button>
                    <el-button type="danger" @click="operatingEdit">保 存</el-button>
                </div>
            </el-dialog>
            <!--  添加经营数据项目 对话框-->
            <el-dialog title="添加经营数据项目" :visible.sync="operatingModal3" :close-on-click-modal="false">
                <el-form :model="operatingForm2" label-width="140px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="项目">
                                <el-input v-model="operatingForm2.project" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="经营目标">
                                <el-input v-model="operatingForm2.operatingGoal" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="完成率">
                                <el-input v-model="operatingForm2.completionRate" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="下半年计划">
                                <el-input v-model="operatingForm2.secondPlan" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="截止基准日实际情况">
                                <el-input v-model="operatingForm2.realSituation" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="operatingModal3 = false">取 消</el-button>
                    <el-button type="danger" @click="confirmOperating">保 存</el-button>
                </div>
            </el-dialog>
            <delete-reminders :deleteReminders="operatingDelete" :message="operatingMessage" :modal_loading="modal_loading" @del="operatingDelete=false" @cancel="operatingDelete=false">
            </delete-reminders>
        </div>

        <div class="s_data" v-show="s_show">
            <el-table :data="financialData" border style="width: 100%" align="center">
                <el-table-column label="基准日" prop="baseDate" align="center">
                </el-table-column>
                <el-table-column label="类型" prop="sort" align="center">
                </el-table-column>
                <el-table-column label="填报人" prop="informant" align="center">
                </el-table-column>
                <el-table-column label="填报日期" prop="date" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="financialModal2 =true">添加数据</el-button>
                        <el-button type="text" @click="financialDelete=true">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--  添加财务数据表头  对话框-->
            <el-dialog title="添加财务数据表头" :visible.sync="financialModal1" :close-on-click-modal="false">
                <el-form :model="financialForm1" :label-width="formLabelWidth">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="基准日">
                                <el-date-picker type="date" placeholder="选择日期" v-model="financialForm1.baseDate" style="width:100%;">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="类型">
                                <el-select v-model="financialForm1.sort" placeholder="请选择类型" style="width:100%;">
                                    <el-option v-for="item in sortOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="填报人">
                                <el-input placeholder="默认登录用户" v-model="financialForm1.informant" auto-complete="off" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="填报日期">
                                <el-input placeholder="当前默认日期" v-model="financialForm1.date" style="width:100%;" disabled>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="备注">
                                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="financialForm1.remark">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="财务情况附件">
                                <Upload multiple type="drag" v-model="financialForm1.appendix" action="//jsonplaceholder.typicode.com/posts/">
                                    <div style="padding: 20px 0">
                                        <Icon type="ios-cloud-upload" size="52"></Icon>
                                        <p>点击或将文件拖拽到这里上传</p>
                                    </div>
                                </Upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="financialModal1 = false">取 消</el-button>
                    <el-button type="danger" @click="financialAdd">保 存</el-button>
                </div>
            </el-dialog>
            <!--  添加财务数据明细 对话框-->
            <el-dialog title="添加财务数据明细" :visible.sync="financialModal2" :close-on-click-modal="false">
                <div class="importModal">
                    <el-upload class="upload-demo" ref="upload" action="" :auto-upload="false">
                        <el-button type="text">导入</el-button>
                    </el-upload>
                    <el-button class="downBtn">
                        <a href="/static/img/sheet.txt" download="资产负债表">模板下载</a>
                    </el-button>
                </div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="资产负债表" name="first">
                        <el-table :data="balanceSheet" border style="width: 100%" align="center">
                            <el-table-column label="资产" prop="capital" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.capital }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.capital" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="期末余额" prop="endingCBalance" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.endingCBalance }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.endingCBalance" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="年初余额" prop="beginningCBalance" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.beginningCBalance }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.beginningCBalance" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="负债和所有者权益" prop="debt" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.debt }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.debt" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="期末余额" prop="endingDBalance" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.endingDBalance }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.endingDBalance" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="年初余额" prop="beginningDBalance" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.beginningDBalance }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.beginningDBalance" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" min-width="100" align="center">
                                <template scope="scope">
                                    <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="balanceModal=true">添加
                                    </el-button>
                                    <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">编辑
                                    </el-button>
                                    <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">保存
                                    </el-button>
                                    <el-button type="text" size="small" @click="handleDelete(scope.$index,balanceSheet)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="利润表" name="second">
                        <el-table :data="incomeStatement" border style="width: 100%" align="center">
                            <el-table-column label="项目" prop="project" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.project }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.project" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="本月金额" prop="monthCounts" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.monthCounts }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.monthCounts" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="本年累计金额" prop="yearCounts" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.yearCounts }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.yearCounts" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template scope="scope">
                                    <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="incomeModal=true">添加
                                    </el-button>
                                    <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">编辑
                                    </el-button>
                                    <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">保存
                                    </el-button>
                                    <el-button type="text" size="small" @click="handleDelete(scope.$index,incomeStatement)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="现金流量表" name="third">
                        <el-table :data="cashFlowStatements" border style="width: 100%" align="center">
                            <el-table-column label="项目" prop="project" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.project }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.project" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="本月金额" prop="monthCounts" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.monthCounts }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.monthCounts" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="本年累计金额" prop="yearCounts" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.yearCounts }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.yearCounts" placeholder=""></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template scope="scope">
                                    <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="cashFlowModal=true">添加
                                    </el-button>
                                    <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">编辑
                                    </el-button>
                                    <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">保存
                                    </el-button>
                                    <el-button type="text" size="small" @click="handleDelete(scope.$index,cashFlowStatements)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="financialModal2 = false">取 消</el-button>
                    <el-button type="danger" @click="financialEdit">保 存</el-button>
                </div>
            </el-dialog>
            <!--  添加资产负债表数据 对话框-->
            <el-dialog title="添加资产负债数据" :visible.sync="balanceModal" :close-on-click-modal="false">
                <el-form :model="balanceForm" label-width="140px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="资产">
                                <el-input v-model="balanceForm.capital" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="期末余额">
                                <el-input v-model="balanceForm.endingCBalance" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="年初余额">
                                <el-input v-model="balanceForm.beginningCBalance" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="负债和所有者权益">
                                <el-input v-model="balanceForm.debt" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="期末余额">
                                <el-input v-model="balanceForm.endingDBalance" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="年初余额">
                                <el-input v-model="balanceForm.beginningDBalance" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="balanceModal = false">取 消</el-button>
                    <el-button type="danger" @click="balanceAdd">保 存</el-button>
                </div>
            </el-dialog>
            <!--  添加利润表数据 对话框-->
            <el-dialog title="添加利润表数据" :visible.sync="incomeModal" :close-on-click-modal="false">
                <el-form :model="incomeForm" label-width="140px">
                    <el-row>
                        <el-col>
                            <el-form-item label="项目">
                                <el-input v-model="incomeForm.project" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="本月金额">
                                <el-input v-model="incomeForm.monthCounts" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="本年累计金额">
                                <el-input v-model="incomeForm.yearCounts" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="incomeModal = false">取 消</el-button>
                    <el-button type="danger" @click="incomeAdd">保 存</el-button>
                </div>
            </el-dialog>
            <!--  添加现金流量表数据 对话框-->
            <el-dialog title="添加现金流量表数据" :visible.sync="cashFlowModal" :close-on-click-modal="false">
                <el-form :model="cashFlowForm" label-width="140px">
                    <el-row>
                        <el-col>
                            <el-form-item label="项目">
                                <el-input v-model="cashFlowForm.project" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="本月金额">
                                <el-input v-model="cashFlowForm.monthCounts" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="本年累计金额">
                                <el-input v-model="cashFlowForm.yearCounts" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cashFlowModal = false">取 消</el-button>
                    <el-button type="danger" @click="cashFlowAdd">保 存</el-button>
                </div>
            </el-dialog>
            <delete-reminders :deleteReminders="financialDelete" :message="financialMessage" :modal_loading="modal_loading" @del="financialDelete=false" @cancel="financialDelete=false">
            </delete-reminders>
        </div>
    </div>
</template>


<script type="text/ecmascript-6">
import deleteReminders from 'components/deleteReminders'
import { changeDate } from 'common/js/config'
export default {
    data() {
        return {
            f_show: true,
            s_show: false,
            operatingDelete: false,
            financialDelete: false,
            operatingMessage: '是否确认删除该条经营数据？',
            financialMessage: '是否确认删除该条财务数据？',
            operatingModal1: false,
            operatingModal2: false,
            operatingModal3: false,
            financialModal1: false,
            financialModal2: false,
            formLabelWidth: '100px',
            balanceModal: false,
            incomeModal: false,
            cashFlowModal: false,
            file: null,
            loadingStatus: false,
            activeName: 'first',
            // 经营数据
            operatingData: [
                {
                    baseDate: '2017-9-9',
                    sort: '年报',
                    informant: '',
                    date: ''
                }
            ],
            // 添加 经营数据表头 表单
            operatingForm1: {
                baseDate: '',
                sort: '',
                informant: '',
                date: '',
                remark: '',
                appendix: ''
            },
            sortOptions: [
                { //数据类型列表
                    value: '选项1',
                    label: '年报'
                }, {
                    value: '选项2',
                    label: '半年报'
                }, {
                    value: '选项1',
                    label: '季报'
                }, {
                    value: '选项2',
                    label: '月报'
                }
            ],
            // 编辑/添加 经营数据 table
            operatingData1: [
                {
                    project: '',
                    operatingGoal: '',
                    realSituation: '',
                    completionRate: '',
                    secondPlan: '',
                    editFlag: false
                }
            ],
            // 添加 经营数据明细 表单
            operatingForm2: {
                project: '',
                operatingGoal: '',
                realSituation: '',
                completionRate: '',
                secondPlan: '',
                editFlag: false
            },
            //  财务数据
            financialData: [
                {
                    baseDate: '2017-9-9',
                    sort: '',
                    informant: '',
                    date: ''
                }
            ],
            financialForm1: {
                baseDate: '',
                sort: '',
                informant: '',
                date: '',
                remark: '',
                appendix: ''
            },
            // 编辑/添加数据  资产负债表
            balanceSheet: [
                {
                    capital: '',
                    endingCBalance: '',
                    beginningCBalance: '',
                    debt: '',
                    endingDBalance: '',
                    beginningDBalance: '',
                    editFlag: false
                }
            ],
            balanceForm: {
                capital: '',
                endingCBalance: '',
                beginningCBalance: '',
                debt: '',
                endingDBalance: '',
                beginningDBalance: '',
                editFlag: false
            },
            // 编辑/添加数据  利润表表
            incomeStatement: [
                {
                    project: '',
                    monthCounts: '',
                    yearCounts: '',
                    editFlag: false
                }
            ],
            incomeForm: {
                project: '',
                monthCounts: '',
                yearCounts: '',
                editFlag: false
            },
            // 编辑/添加数据  现金流量表
            cashFlowStatements: [
                {
                    project: '',
                    monthCounts: '',
                    yearCounts: '',
                    editFlag: false
                }
            ],
            cashFlowForm: {
                project: '',
                monthCounts: '',
                yearCounts: '',
                editFlag: false
            }
        }
    },
    methods: {
        // 切换 经营/财务 的显示隐藏
        changeData1() {
            this.f_show = true;
            this.s_show = false;
        },
        changeData2() {
            this.f_show = false;
            this.s_show = true;
        },

        // 切换 两种数据的添加
        addData() {
            if (this.f_show) {
                this.operatingModal1 = true;
            } else {
                this.financialModal1 = true;
            }
        },

        // 添加 经营数据 的方法
        operatingAdd() {
            this.operatingForm1.date = changeDate(this.operatingForm1.date);
            this.operatingForm1.baseDate = changeDate(this.operatingForm1.baseDate);
            this.operatingData.push(this.operatingForm1);
            this.operatingForm1 = {};
            this.operatingModal1 = false;
        },
        // 编辑 经营数据 的方法
        operatingEdit() {
            this.operatingModal2 = false;
        },
        // 添加 经营数据明细 的方法
        confirmOperating() {
            this.operatingData1.push(this.operatingForm2);
            this.operatingForm2 = {};
            this.operatingModal3 = false;
        },


        // 添加 财务数据 的方法
        financialAdd() {
            this.financialForm1.date = changeDate(this.financialForm1.date);
            this.financialForm1.baseDate = changeDate(this.financialForm1.baseDate);
            this.financialData.push(this.financialForm1);
            this.financialForm1 = {};
            this.financialModal1 = false;
        },
        // 编辑 经营数据 的方法
        financialEdit() {
            this.financialModal2 = false;
        },

        // 添加资产负债表数据 的方法
        balanceAdd() {
            this.balanceSheet.push(this.balanceForm);
            this.balanceForm = {};
            this.balanceModal = false;
        },
        // 添加利润表数据 的方法
        incomeAdd() {
            this.incomeStatement.push(this.incomeForm);
            this.incomeForm = {};
            this.incomeModal = false;
        },
        // 添加现金流量表数据 的方法
        cashFlowAdd() {
            this.cashFlowStatements.push(this.cashFlowForm);
            this.cashFlowForm = {};
            this.cashFlowModal = false;
        },

        checkEdit(index, row) { //编辑
            row.editFlag = !row.editFlag;
        },
        // 删除当前行
        handleDelete(index, rows) {
            rows.splice(index, 1);
        },
        // 上传附件的方法
        handleUpload(file) {
            this.file = file;
            return false;
        },
        upload() {
            this.loadingStatus = true;
            setTimeout(() => {
                this.file = null;
                this.loadingStatus = false;
                this.$Message.success('上传成功')
            }, 1500);
        },
    },
    components: {
        deleteReminders
    }
}
</script>



<style lang="less" scoped>
.table {
    .topBtn {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        .leftBtn {
            margin-right: 15px;
        }
    }
}

.active {
    background: #dfe6ec;
}

.s_data {
    .importModal {
        display: flex;
        justify-content: flex-end;
        .upload-demo {
            margin-right: 10px;
        }
        .downBtn {
            height: 41px;
            border-color: #bbbec4;
            &:hover {
                border-color: #20a0ff;
            }
        }
    }
}
</style>
