<template>
    <div class="monitorTable">
        <tabel-header :data="checkProjectAuth('JKSZ-jiankongshezhi') ? headerInfo_monitor : _headerInfo_monitor" @add="goAddMonitor"></tabel-header>
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
                    <el-button v-if="checkProjectAuth('JKSZ-bianji')" type="text" @click="editMonitor(scope.row.id)">编辑</el-button>
                    <el-button type="text" v-if="checkProjectAuth('JKSZ-guanbi') && (scope.row.isOpen == 1)" @click="switchMonitor(scope.row.id, scope.row.isOpen)">关闭</el-button>
                    <el-button type="text" v-if="checkProjectAuth('JKSZ-kaiqi') && (scope.row.isOpen != 1)" @click="switchMonitor(scope.row.id, scope.row.isOpen)">开启</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--添加监控设置 对话框 -->
        <el-dialog :title="title" :visible.sync="monitorSetting">
            <el-form :model="monitorForm" :rules="rules1" ref="monitorForm" :label-width="formLabelWidth">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="数据来源" prop="dataSource" :label-width="formLabelWidth">
                            <el-select @change="changeDataSource" v-model="monitorForm.dataSource" placeholder="请选择数据来源" style="width:100%;" :disabled="monitorEditDisable">
                                <el-option v-for="item in dataSourcesOptions" :key="item.key" :label="item.value" :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型" prop="dataType">
                            <el-select v-model="monitorForm.dataType" :disabled="monitorEditDisable" placeholder="请选择类型" style="width:100%;">
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
                <el-table-column label="是否监控" prop="isMonitor" align="center">
                    <template scope="scope">
                        <span>
                            <el-radio class="radio" v-model="scope.row.isMonitor" :label=1>是</el-radio>
                            <el-radio class="radio" v-model="scope.row.isMonitor" :label=0>否</el-radio>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="预警规则" prop="rule" align="center">
                    <template scope="scope">
                        <span v-if="scope.row.isMonitor == 1" >
                            <el-radio-group v-model="scope.row.rule">
                                <el-radio class="radio" v-for="item in ruleOptions" :label="item.key">{{item.value}}</el-radio>
                            </el-radio-group>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="阈值" prop="threshold" align="center">
                    <template scope="scope">
                        <span v-if="scope.row.isMonitor == 1" class="cell-edit-input">
                            <el-input v-model="scope.row.threshold" placeholder=""></el-input>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancleSetting">取 消</el-button>
                <el-button type="danger" @click="saveDataMonitor('monitorForm', monitorForm.id)">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑监控设置 对话框 -->
        <!-- <el-dialog title="编辑监控设置" :visible.sync="monitorEditing">
            <el-form :model="monitorForm" :rules="rules2" :label-width="formLabelWidth">
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
                <el-table-column label="指标名称" prop="fieldName" align="center">
                </el-table-column>
                <el-table-column label="是否监控" prop="isMonitor" align="center">
                    <template scope="scope">
                        <span>
                            <el-radio class="radio" v-model="scope.row.isMonitor" :label="1">是</el-radio>
                            <el-radio class="radio" v-model="scope.row.isMonitor" :label="0">否</el-radio>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="预警规则" prop="rule" align="center">
                    <template scope="scope">
                        <span v-if="scope.row.isMonitor == '1'" >
                            <el-radio-group v-model="scope.row.rule">
                                <el-radio class="radio" v-for="item in ruleOptions" :label="item.key">{{item.value}}</el-radio>
                            </el-radio-group>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="阈值" prop="threshold" align="center">
                    <template scope="scope">
                        <span v-if="scope.row.isMonitor == '1'" class="cell-edit-input">
                            <el-input v-model="scope.row.threshold" placeholder=""></el-input>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editCancle">取 消</el-button>
                <el-button type="danger" @click="saveDataMonitor('monitorForm', monitorForm.id)">确 定</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>

<script>
import tabelHeader from 'components/tabelHeader'
import 'common/js/filter'
import { changeDate, checkProjectAuth } from 'common/js/config'
import { getDataMonitorList, getDataMonitorDetail, updateDataMonitor, getFormByType, saveDataMonitor } from 'api/projectAfter';
export default {
    props: {
        tabs: {
            type: Object,
            default: {}
        },
        projectId: {
            type: String,
            default: ''
        },
        isInTeam: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            title:'添加监控设置',
            monitorSetting: false,
            monitorEditing: false,
            monitorEditDisable: false,
            formLabelWidth: '80px',
            monitorForm: {
                dataSource: 0,
                dataType: 0
            },
            rules1: {
                dataSource: [
                    { type: 'number', required: true, message: '请选择数据来源', trigger: 'blur' }
                ],
                dataType: [
                    { type: 'number', required: true, message: '请选择类型', trigger: 'blur' }
                ]
            },
            ruleOptions: [
                {//开关选项
                    key: 1,
                    value: '大于'
                },
                {
                    key: 0,
                    value: '小于'
                }
            ],
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
                    key: 1,
                    value: '运营数据'
                },
                {
                    key: 2,
                    value: '资产负债表'
                }, {
                    key: 3,
                    value: '现金流量表'
                }, {
                    key: 4,
                    value: '利润表'
                }
            ],
            sortOptions: [
                { //数据类型列表
                    key: 1,
                    value: '年报'
                }, {
                    key: 2,
                    value: '半年报'
                }, {
                    key: 3,
                    value: '季报'
                }, {
                    key: 4,
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
            },
            _headerInfo_monitor: {
                btnGroup: []
            },
            idEditModel: false
        }
    },
    created() {
    },
    watch: {
        'tabs':function (to,from){
            if(to.tabList[8]){
                this.init();
            }
        }
    },
    methods: {
        checkProjectAuth(code){
            return checkProjectAuth(code) && this.isInTeam;
        },
        init() {
            this.getDataMonitorList();
        },
        // 获取监控主体列表
        getDataMonitorList() {
            getDataMonitorList(this.projectId).then(resp => {
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
        //开启关闭监控
        switchMonitor(id, isOpen){
            let _isOpen = (isOpen + 1) % 2;
            updateDataMonitor(id, _isOpen).then(resp => {
                if (resp.data.status == '200') {
                    this.getDataMonitorList();
                }else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('开启关闭监控error: ', e);
            })
        },
        //选择监控数据源，获取相应指标
        changeDataSource(val){
            if((val == null || val == ''))return false;
            if(!this.idEditModel){
                getFormByType(val).then(resp => {
                    if (resp.data.status == '200') {
                        // console.log("选择监控数据源" );
                        var _data = resp.data.result;
                        _data.forEach(function(item, index){
                            item.isMonitor = 0;
                            item.rule = 0;
                            item.threshold = 0;
                            item.formLabelId = item.id;
                            item.id = '';
                            item.monitorId = '';
                        });
                        this.dataMonitorTable = _data;
                    } else if (resp.data.status == '49999') {
                        this.dataMonitorTable = [];
                        this.dataMonitorTable.push();
                    } else {
                        this.$message.error(resp.data.message);
                    }
                }).catch(e => {
                    console.log('获取监控数据源相应的指标列表 error: ', e);
                })
            }
        },
        // 添加 监控设置 的方法
        saveDataMonitor(formName, id) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.monitorForm.projectId = this.projectId;
                    let dataMonitor = this.monitorForm;
                    let monitorInfos = this.dataMonitorTable;
                    saveDataMonitor(dataMonitor, monitorInfos).then(resp => {
                        console.log("添加 监控设置结果：" + JSON.stringify(resp.data));
                        if (resp.data.status == '200') {
                            this.getDataMonitorList();
                            this.monitorSetting = !this.monitorSetting;
                            this.monitorForm = {dataSource:'', dataType: ''};
                            this.dataMonitorTable = [];
                        }else {
                            this.$message.error(resp.data.message);
                        }
                    }).catch(e => {
                        console.log('添加 监控设置error: ', e);
                    })
                }
            });
        },
        goAddMonitor(){
            this.title = '添加监控设置';
            this.idEditModel = false;
            this.monitorForm = {id: '', dataSource:'', dataType: ''};
            this.dataMonitorTable = [];
            this.monitorEditDisable = false;
            this.monitorSetting = !this.monitorSetting;
        },
        // 打开编辑 监控设置 的方法
        editMonitor(id){
            this.monitorEditDisable = true;
            this.idEditModel = true;
            this.monitorSetting = !this.monitorSetting;
            getDataMonitorDetail(id).then(resp => {
                if (resp.data.status == '200') {
                    console.log("打开编辑 监控设置"+JSON.stringify(resp.data.result));
                    this.monitorForm = resp.data.result.dataMonitor;
                    this.dataMonitorTable = resp.data.result.monitorInfos;
                    this.title = '编辑监控设置';
                }else {
                    this.$message.error(resp.data.message);
                }
            }).catch(e => {
                console.log('打开编辑 监控设置error: ', e);
            })
        },
        // 取消 监控设置 的取消按钮
        cancleSetting() {
            this.monitorSetting = !this.monitorSetting;
            this.monitorForm = {id: '', dataSource:'', dataType: ''};
            this.dataMonitorTable = [];
        }
    },
    components: {
        tabelHeader
    }
}
</script>

<style lang="less" scoped>

</style>
