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
                    <el-button type="text" size="small" @click="handleEditm(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="handleDelete(scope.$index,monitorData)">删除</el-button>
                    <el-button type="text" size="small">关闭</el-button>
                    <el-button type="text" size="small">开启</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--监控设置 对话框 -->
        <el-dialog title="监控设置" :visible.sync="monitorSetting" :close-on-click-modal="false">
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
                    <el-col>
                        <el-form-item label="指标名称" :label-width="formLabelWidth">
                            <el-input v-model="monitorForm.targetName" auto-complete="off" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否监控">
                            <el-radio-group v-model="monitorForm.switch">
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预警规则">
                            <el-radio-group v-model="monitorForm.alarmRule">
                                <el-radio label="小于"></el-radio>
                                <el-radio label="大于"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="阈值" :label-width="formLabelWidth">
                            <el-input v-model="monitorForm.threshold" placeholder="请输入阈值" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="monitorSetting = false">取 消</el-button>
                <el-button type="primary" @click="monitorSettingAdd">确 定</el-button>
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
            formLabelWidth: '80px',
            monitorForm: {
                dataSources: '',
                sort: '',
                targetName: '',
                switch: '',
                alarmRule: '',
                threshold: ''
            },
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
        // 删除当前行
        handleDelete(index, rows) {
            rows.splice(index, 1);
        },
        // 添加 监控设置 的方法
        monitorSettingAdd() {
           this.monitorData.push(this.monitorForm);
           this.monitorForm ={};
           this.monitorSetting=false;
        }

    },
    components: {
        tabelHeader
    }
}
</script>




<style lang="less" scoped>

</style>
