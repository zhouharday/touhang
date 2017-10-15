<template>
    <div class="monitorTable">
        <tabel-header :data="headerInfo_monitor" @add="monitorSetting = true"></tabel-header>
        <el-table :data="monitorData" border style="width: 100%">
            <el-table-column label="数据来源" prop="dataSources" align="center">
            </el-table-column>
            <el-table-column label="类型" prop="sort" align="center">
            </el-table-column>
            <el-table-column label="监控开关" prop="switch" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template scope="scope">
                    <el-button type="text" @click="editMonitor(scope.row)">编辑</el-button>
                    <el-button type="text" @click="handleDelete(scope.$index,monitorData)">删除</el-button>
                    <el-button type="text">关闭</el-button>
                    <el-button type="text">开启</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--添加监控设置 对话框 -->
        <el-dialog title="添加监控设置" :visible.sync="monitorSetting">
            <el-form :model="monitorForm" :rules="rules1" ref="monitorForm" :label-width="formLabelWidth">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="数据来源" prop="dataSources" :label-width="formLabelWidth">
                            <el-select v-model="monitorForm.dataSources" placeholder="请选择数据来源" style="width:100%;">
                                <el-option v-for="item in dataSourcesOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型" prop="sort">
                            <el-select v-model="monitorForm.sort" placeholder="请选择类型" style="width:100%;">
                                <el-option v-for="item in sortOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="addMonitorTable" border style="width:100%">
                <el-table-column label="指标名称" prop="targetName" align="center">
                </el-table-column>
                <el-table-column label="是否监控" prop="switch" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.switch }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-radio-group v-model="scope.row.switch">
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                            </el-radio-group>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="预警规则" prop="alarmRule" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.alarmRule }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-radio-group v-model="scope.row.alarmRule">
                                <el-radio label="小于"></el-radio>
                                <el-radio label="大于"></el-radio>
                            </el-radio-group>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="阈值" prop="threshold" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.threshold }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.threshold" placeholder=""></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="100" align="center">
                    <template scope="scope">
                        <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">编辑
                        </el-button>
                        <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">保存
                        </el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,addMonitorTable)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="monitorSetting = false">取 消</el-button>
                <el-button type="danger" @click="monitorSettingAdd">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑监控设置 对话框 -->
        <el-dialog title="编辑监控设置" :visible.sync="monitorEditing">
            <el-form :model="monitorForm" :label-width="formLabelWidth">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="数据来源" :label-width="formLabelWidth">
                            <el-select v-model="monitorForm.dataSources" placeholder="请选择数据来源" style="width:100%;">
                                <el-option label="资产负债表" value="资产负债表"></el-option>
                                <el-option label="利润表" value="利润表"></el-option>
                                <el-option label="现金流量表" value="现金流量表"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型">
                            <el-select v-model="monitorForm.sort" placeholder="请选择类型" style="width:100%;">
                                <el-option label="年报" value="年报"></el-option>
                                <el-option label="半年报" value="半年报"></el-option>
                                <el-option label="季报" value="季报"></el-option>
                                <el-option label="月报" value="月报"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="addMonitorTable" border style="width:100%">
                <el-table-column label="指标名称" prop="targetName" align="center">
                </el-table-column>
                <el-table-column label="是否监控" prop="switch" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.switch }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-radio-group v-model="scope.row.switch">
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                            </el-radio-group>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="预警规则" prop="alarmRule" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.alarmRule }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-radio-group v-model="scope.row.alarmRule">
                                <el-radio label="小于"></el-radio>
                                <el-radio label="大于"></el-radio>
                            </el-radio-group>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="阈值" prop="threshold" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.threshold }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.threshold" placeholder=""></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="100" align="center">
                    <template scope="scope">
                        <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">编辑
                        </el-button>
                        <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">保存
                        </el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,addMonitorTable)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editCancle">取 消</el-button>
                <el-button type="danger" @click="editConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>



<script style="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            monitorSetting: false,
            monitorEditing: false,
            formLabelWidth: '80px',
            monitorForm: {
                dataSources: '',
                sort: ''
            },
            rules1: {
                dataSources: [
                    { required: true, message: '请选择数据来源', trigger: 'change' }
                ], 
                sort: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ]
            },
            dataSourcesOptions: [
                { //数据来源列表
                    value: '选项1',
                    label: '资产负债表'
                }, {
                    value: '选项2',
                    label: '利润表'
                }, {
                    value: '选项1',
                    label: '现金流量表'
                }
            ],
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
            addMonitorTable: [
                {
                    targetName: '指标一',
                    switch: '',
                    alarmRule: '',
                    threshold: '',
                    editFlag: false
                },
                {
                    targetName: '指标二',
                    switch: '',
                    alarmRule: '',
                    threshold: '',
                    editFlag: false
                }

            ],
            monitorData: [
                {
                    dataSources: '资产负债表',
                    sort: '年报',
                    switch: '是'
                },
                {
                    dataSources: '经营数据',
                    sort: '年报',
                    switch: '是'
                }
            ],
            headerInfo_monitor: {
                btnGroup: [{
                    icon: 'gear-a',
                    explain: '监控设置'
                }]
            }
        }
    },
    methods: {
        // 添加 监控设置 的方法
        monitorSettingAdd() {
            // let new_monitorForm = {
            //     dataSources: '',
            //     sort: ''
            // };
            // this.monitorForm = new_monitorForm;
            this.monitorData.push(this.monitorForm);
            this.monitorSetting = !this.monitorSetting;
        },
        // 编辑 监控设置 的方法
        editMonitor(row) {
            this.monitorEditing = !this.monitorEditing;
            this.monitorForm.dataSources = row.dataSources;
            this.monitorForm.sort = row.sort;
        },
        // 编辑 监控设置 的取消按钮
        editCancle() {
            this.monitorEditing = !this.monitorEditing;
            this.monitorForm = {};
        },
        // 编辑 监控设置 的确定按钮
        editConfirm() {
            this.monitorEditing = !this.monitorEditing;
            this.monitorForm = {};
        },
        checkEdit(index, row) { //编辑
            row.editFlag = !row.editFlag;
        },
        // 删除当前行
        handleDelete(index, rows) {
            rows.splice(index, 1);
        },
    },
    components: {
        tabelHeader
    }
}
</script>




<style lang="less" scoped>

</style>
