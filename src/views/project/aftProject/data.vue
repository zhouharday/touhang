<template>
    <div class="table">
        <div class="topBtn">
            <div class="leftBtn">
                <el-button @click="changeData1">经营数据</el-button>
                <el-button @click="changeData2">财务数据</el-button>
            </div>
            <div class="rightBtn">
                <el-button @click="addData">添加</el-button>
            </div>
        </div>
        <div class="f_data" v-show="f_show">
            <el-table :data="operatingData" border style="width: 100%" align="center">
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
                        <el-button type="text" size="small" @click="operatingModal2 =true">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,operatingData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加经营数据 对话框-->
            <el-dialog title="添加经营数据" :visible.sync="operatingModal1" :close-on-click-modal="false">
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
                                    <el-option label="类型一" value="类型一"></el-option>
                                    <el-option label="类型二" value="类型二"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="填报人">
                                <el-input v-model="operatingForm1.informant" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="填报日期">
                                <el-date-picker type="date" placeholder="选择日期" v-model="operatingForm1.date" style="width:100%;">
                                </el-date-picker>
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
                                <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
                                    <div style="padding: 20px 0">
                                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                        <p>点击或将文件拖拽到这里上传</p>
                                    </div>
                                </Upload>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col>
                                                        </el-col> -->
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="operatingModal1 = false">取 消</el-button>
                    <el-button type="primary" @click="operatingAdd">保存</el-button>
                </div>
            </el-dialog>
            <!-- 编辑经营数据  对话框 -->
            <el-dialog title="编辑经营数据" :visible.sync="operatingModal2" :close-on-click-modal="false">
                <el-form :model="operatingForm2" :label-width="formLabelWidth">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="基准日">
                                <el-date-picker type="date" placeholder="选择日期" v-model="operatingForm2.baseDate" style="width:100%;">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="类型">
                                <el-select v-model="operatingForm2.sort" placeholder="请选择类型" style="width:100%;">
                                    <el-option label="类型一" value="类型一"></el-option>
                                    <el-option label="类型二" value="类型二"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="填报人">
                                <el-input v-model="operatingForm2.informant" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="填报日期">
                                <el-date-picker type="date" placeholder="选择日期" v-model="operatingForm2.date" style="width:100%;">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="备注">
                                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="operatingForm2.remark">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="经营情况附件">
                                <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
                                    <div style="padding: 20px 0">
                                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                        <p>点击或将文件拖拽到这里上传</p>
                                    </div>
                                </Upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="operatingModal2 = false">取 消</el-button>
                    <el-button type="primary" @click="operatingEdit">保存</el-button>
                </div>
            </el-dialog>
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
                        <el-button type="text" size="small" @click="financialModal2 =true">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,financialData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--  添加财务数据 对话框-->
            <el-dialog title="添加财务数据" :visible.sync="financialModal1" :close-on-click-modal="false">
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
                                    <el-option label="类型一" value="类型一"></el-option>
                                    <el-option label="类型二" value="类型二"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="填报人">
                                <el-input v-model="financialForm1.informant" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="填报日期">
                                <el-date-picker type="date" placeholder="选择日期" v-model="financialForm1.date" style="width:100%;">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="备注">
                                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="financialForm1.remark">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="financialModal1 = false">取 消</el-button>
                    <el-button type="primary" @click="financialAdd">保存</el-button>
                </div>
            </el-dialog>
            <!--  编辑财务数据 对话框-->
            <el-dialog title="编辑财务数据" :visible.sync="financialModal2" :close-on-click-modal="false">
                <el-form :model="financialForm2" :label-width="formLabelWidth">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="基准日">
                                <el-date-picker type="date" placeholder="选择日期" v-model="financialForm2.baseDate" style="width:100%;">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="类型">
                                <el-select v-model="financialForm2.sort" placeholder="请选择类型" style="width:100%;">
                                    <el-option label="类型一" value="类型一"></el-option>
                                    <el-option label="类型二" value="类型二"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="填报人">
                                <el-input v-model="financialForm2.informant" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="填报日期">
                                <el-date-picker type="date" placeholder="选择日期" v-model="financialForm2.date" style="width:100%;">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <el-form-item label="备注">
                                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="financialForm2.remark">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="financialModal2 = false">取 消</el-button>
                    <el-button type="primary" @click="financialEdit">保存</el-button>
                </div>
            </el-dialog>

        </div>
    </div>
</template>





<script type="text/ecmascript-6">
import { changeDate } from 'common/js/config'
export default {
    data() {
        return {
            f_show: true,
            s_show: false,
            operatingModal1: false,
            operatingModal2: false,
            financialModal1: false,
            financialModal2: false,
            formLabelWidth: '100px',
            file: null,
            loadingStatus: false,
            // 经营数据
            operatingData: [
                {
                    baseDate: '2017-9-9',
                    sort: '',
                    informant: '',
                    date: ''
                }
            ],
            operatingForm1: {
                baseDate: '',
                sort: '',
                informant: '',
                date: '',
                remark: ''

            },
            operatingForm2: {
                baseDate: '',
                sort: '',
                informant: '',
                date: '',
                remark: ''
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
                remark: ''
            },
            financialForm2: {
                baseDate: '',
                sort: '',
                informant: '',
                date: '',
                remark: ''
            },
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
            this.operatingModal1 = false;
            this.operatingForm1.date = changeDate(this.operatingForm1.date);
            this.operatingForm1.baseDate = changeDate(this.operatingForm1.baseDate);
            this.operatingData.push(this.operatingForm1);
        },
        // 编辑 经营数据 的方法
        operatingEdit() {
            this.operatingModal2 = false;
        },


        // 添加 财务数据 的方法
        financialAdd() {
            this.financialModal1 = false;
            this.financialForm1.date = changeDate(this.financialForm1.date);
            this.financialForm1.baseDate = changeDate(this.financialForm1.baseDate);
            this.financialData.push(this.financialForm1);
        },
        // 编辑 经营数据 的方法
        financialEdit() {
            this.financialModal2 = false;
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
        }
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
        .rightBtn {}
    }
}
</style>
