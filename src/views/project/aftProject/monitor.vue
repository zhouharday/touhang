<template>
    <div class="monitorTable">
        <tabel-header :data="headerInfo_monitor" @add="monitorSetting = true"></tabel-header>
        <el-table :data="monitorData" border style="width: 100%">
            <el-table-column label="数据来源" prop="dataSource" align="center">
                <template scope="scope">{{scope.row.dataSource | key2value(dataSourcesOptions, scope.row.dataSource)}}</template>
            </el-table-column>
            <el-table-column label="类型" prop="dataType" align="center">
                <template scope="scope">{{scope.row.dataType | key2value(sortOptions, scope.row.dataType)}}</template>
            </el-table-column>
            <el-table-column label="监控开关" prop="isOpen" align="center">
                <template scope="scope">{{scope.row.isOpen | key2value(isMonitorOptions, scope.row.isOpen)}}</template>
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
                        <el-form-item label="数据来源" prop="dataSource" :label-width="formLabelWidth">
                            <el-select @change="changeDataSource" v-model="monitorForm.dataSource" placeholder="请选择数据来源" style="width:100%;">
                                <el-option v-for="item in dataSourcesOptions" :key="item.key" :label="item.value" :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型" prop="dataType">
                            <el-select v-model="monitorForm.dataType" placeholder="请选择类型" style="width:100%;">
                                <el-option v-for="item in sortOptions" :key="item.key" :label="item.value" :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="dataMonitorTable" border style="width:100%">
                <el-table-column label="指标名称" prop="fieldName" align="center">
                </el-table-column>
                <el-table-column label="是否监控" prop="isMust" align="center" width="250">
                    <template scope="scope">
                        <span v-if="scope.row.editFlag" >
                                <el-radio class="radio" v-model="scope.row.isMust" label="1">是</el-radio>
                                <el-radio class="radio" v-model="scope.row.isMust" label="0">否</el-radio>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="预警规则" prop="rule" align="center"  width="250">
                    <template scope="scope">
                        <span v-if="scope.row.editFlag" >
                                <el-radio class="radio" v-model="scope.row.isMust" label="1">是</el-radio>
                                <el-radio class="radio" v-model="scope.row.isMust" label="0">否</el-radio>
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
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,dataMonitorTable)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="monitorSetting = false">取 消</el-button>
                <el-button type="danger" @click="saveDataMonitor('monitorForm', '')">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑监控设置 对话框 -->
        <el-dialog title="编辑监控设置" :visible.sync="monitorEditing">
            <el-form :model="monitorForm" :label-width="formLabelWidth">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="数据来源" :label-width="formLabelWidth">
                            <el-select v-model="monitorForm.dataSource" placeholder="请选择数据来源" style="width:100%;">
                                <el-option v-for="item in dataSourcesOptions" :key="item.key" :label="item.value" :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型">
                            <el-select v-model="monitorForm.dataType" placeholder="请选择类型" style="width:100%;">
                                <el-option v-for="item in sortOptions" :key="item.key" :label="item.value" :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="dataMonitorTable" border style="width:100%">
                <el-table-column label="指标名称" prop="targetName" align="center">
                </el-table-column>
                <el-table-column label="是否监控" prop="isMonitor" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.isMonitor }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                                <el-radio v-model="scope.row.isMonitor :label="1">是</el-radio>
                                <el-radio v-model="scope.row.isMonitor :label="0">否</el-radio>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="预警规则" prop="rule" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.rule }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-radio-group v-model="scope.row.rule">
                                <el-radio :label="0">小于</el-radio>
                                <el-radio :label="1">大于</el-radio>
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
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,dataMonitorTable)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editCancle">取 消</el-button>
                <el-button type="danger" @click="saveDataMonitor('monitorForm', monitorForm.id)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>



<script>
import tabelHeader from 'components/tabelHeader'
import 'common/js/filter'
import { changeDate } from 'common/js/config'
import { getDataMonitorList, getDataMonitorDetail, updateDataMonitor, getFormByType, saveDataMonitor } from 'api/projectAfter';
export default {
    props: {
        projectId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            monitorSetting: false,
            monitorEditing: false,
            formLabelWidth: '80px',
            monitorForm: {
                dataSource: '',
                dataType: ''
            },
            rules1: {
                dataSources: [
                    { required: true, message: '请选择数据来源', trigger: 'change' }
                ],
                sort: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ]
            },
            isMonitorOptions:[
                {//开关选项
                    key: '1',
                    value: '开启'
                },
                {
                    key: '0',
                    value: '关闭'
                }
            ],
            dataSourcesOptions: [
                { //数据来源列表
                    key: '1',
                    value: '运营数据'
                },
                {
                    key: '2',
                    value: '资产负债表'
                }, {
                    key: '3',
                    value: '利润表'
                }, {
                    key: '4',
                    value: '现金流量表'
                }
            ],
            sortOptions: [
                { //数据类型列表
                    key: '1',
                    value: '年报'
                }, {
                    key: '2',
                    value: '半年报'
                }, {
                    key: '3',
                    value: '季报'
                }, {
                    key: '4',
                    value: '月报'
                }
            ],
            dataMonitorTable: [],
            monitorData: [
                {
                    dataSource: '4',
                    dataType: '1',
                    isOpen: '1'
                },
                {
                    dataSource: '3',
                    dataType: '2',
                    isOpen: '1'
                },
                {
                    dataSource: '2',
                    dataType: '4',
                    isOpen: '0'
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
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getDataMonitorList();
        },
        // 获取监控主体列表
        getDataMonitorList() {
            getDataMonitorList(this.projectId).then(resp => {
                console.log("获取监控主体列表 结果：" + JSON.stringify(resp.data));
                if (resp.data.status == '200') {
                    this.monitorData = resp.data.result;
                } else if (resp.data.status == '49999') {
                    this.monitorData = [];
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('获取监控主体列表 error: ', e);
            })
        },
        changeRadio(val){
            console.log(val);
        },
        //选择监控数据源，获取相应指标
        changeDataSource(val){
                console.log("获取监控数据源相应的指标列表 参数：" + JSON.stringify(val));
            getFormByType(val).then(resp => {
                // console.log("获取监控数据源相应的指标列表 结果：" + JSON.stringify(resp.data));
                if (resp.data.status == '200') {
                    console.log('/////////////////////////');
                    console.log(resp.data);
                    this.dataMonitorTable = resp.data.result;
                    // this.dataMonitorTable.forEach(function(item, index){
                    //     item.isMonitor = 0;
                    //     item.rule = 0;
                    // });
                    // this.dataMonitorTable.push(resp.data.result);
                } else if (resp.data.status == '49999') {
                    this.dataMonitorTable = [];
                    this.dataMonitorTable.push();
                } else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('获取监控数据源相应的指标列表 error: ', e);
            })
        },
        // 添加 监控设置 的方法
        saveDataMonitor(formName, id) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // dataMonitor = {}, monitorInfos = []
                    let dataMonitor = this.monitorForm;
                    let monitorInfos = this.dataMonitorTable | [];
                    saveDataMonitor().then(resp => {
                        console.log("添加 监控设置结果：" + JSON.stringify(resp.data));
                        if (resp.data.status == '200') {
                            this.getDataMonitorList();
                            this.monitorSetting = !this.monitorSetting;
                            this.monitorForm = {dataSource:'', dataType: ''};
                        }else {
                            this.$message.error(resp.data.message);
                        }
                    }).catch(e => {
                        console.log('添加 监控设置error: ', e);
                    })
                }
            });

            // let new_monitorForm = {
            //     dataSources: '',
            //     sort: ''
            // };
            // this.monitorForm = new_monitorForm;
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
            console.log("编辑监控设置明细行");
            row.editFlag = !row.editFlag;
            console.log(row.editFlag);
            this.dataMonitorTable.push();
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
