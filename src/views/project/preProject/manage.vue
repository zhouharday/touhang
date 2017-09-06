<template>
    <div>
        <!-- 项目费用  部分 -->
        <div class="fileTable">
            <tabel-header :data="headerInfo_cost" @add="costDialog"></tabel-header>
            <el-table :data="costData" border style="width: 100%" align="center">
                <el-table-column label="费用类型" prop="costSort" align="center">
                </el-table-column>
                <el-table-column label="金额（元）" prop="money" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,costData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加项目费用 对话框-->
            <el-dialog title="添加项目费用" :visible.sync="costAdd1" :close-on-click-modal="false">
                <el-form :model="costForm1" :label-width="formLabelWidth">
                    <el-form-item label="费用类型">
                        <el-input v-model="costForm1.costSort" auto-complete="off"></el-input>
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
                <el-form :model="costForm2" :label-width="formLabelWidth">
                    <el-form-item label="费用类型">
                        <el-input v-model="costForm2.costSort" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="金额（元）">
                        <el-input v-model="costForm2.money" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="costAdd2 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmCostAdd2">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <!-- 项目合同 部分 -->
        <div class="fileTable">
            <tabel-header :data="headerInfo_contract" @add="contractDialog" class="title" ></tabel-header>
            <el-table :data="contractData" border style="width: 100%" align="center">
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
                        <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,contractData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加项合同 对话框-->
            <el-dialog title="添加项目合同" :visible.sync="contractAdd1" :close-on-click-modal="false">
                <el-form :model="contractForm1" :label-width="formLabelWidth">
                    <el-form-item label="合同名称">
                        <el-input v-model="contractForm1.contractName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="签约日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="contractForm1.date" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="合同金额（元）">
                        <el-input v-model="contractForm1.money" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="股权占比（%）">
                        <el-input v-model="contractForm1.percent" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="合同附件">
                        <!-- action 上传的地址，必填 -->
                        <Upload multiple type="drag" :before-upload="handleUpload" action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="contractAdd1 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmcontractAdd1">确 定</el-button>
                </div>
            </el-dialog>

            <!-- 编辑项目合同 对话框-->
            <el-dialog title="添加项目合同" :visible.sync="contractAdd2" :close-on-click-modal="false">
                <el-form :model="contractForm2" :label-width="formLabelWidth">
                    <el-form-item label="合同名称">
                        <el-input v-model="contractForm2.contractName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="签约日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="contractForm2.date" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="合同金额（元）">
                        <el-input v-model="contractForm2.money" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="股权占比（%）">
                        <el-input v-model="contractForm2.percent" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="合同附件">
                        <!-- action 上传的地址，必填 -->
                        <Upload multiple type="drag" :before-upload="handleUpload" action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="contractAdd2 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmcontractAdd2">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <!-- 投资支付 部分 -->
        <div class="fileTable">
            <tabel-header :data="headerInfo_contract" @add="contractDialog" class="title"></tabel-header>
            <el-table :data="contractData" border style="width: 100%" align="center">
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
                        <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,contractData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加项合同 对话框-->
            <el-dialog title="添加项目合同" :visible.sync="contractAdd1" :close-on-click-modal="false">
                <el-form :model="contractForm1" :label-width="formLabelWidth">
                    <el-form-item label="合同名称">
                        <el-input v-model="contractForm1.contractName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="签约日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="contractForm1.date" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="合同金额（元）">
                        <el-input v-model="contractForm1.money" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="股权占比（%）">
                        <el-input v-model="contractForm1.percent" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="合同附件">
                        <!-- action 上传的地址，必填 -->
                        <Upload multiple type="drag" :before-upload="handleUpload" action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="contractAdd1 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmcontractAdd1">确 定</el-button>
                </div>
            </el-dialog>

            <!-- 编辑项目合同 对话框-->
            <el-dialog title="添加项目合同" :visible.sync="contractAdd2" :close-on-click-modal="false">
                <el-form :model="contractForm2" :label-width="formLabelWidth">
                    <el-form-item label="合同名称">
                        <el-input v-model="contractForm2.contractName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="签约日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="contractForm2.date" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="合同金额（元）">
                        <el-input v-model="contractForm2.money" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="股权占比（%）">
                        <el-input v-model="contractForm2.percent" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="合同附件">
                        <!-- action 上传的地址，必填 -->
                        <Upload multiple type="drag" :before-upload="handleUpload" action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="contractAdd2 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmcontractAdd2">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>


<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            formLabelWidth: '80px',
            costAdd1: false,
            costAdd2: false,
            contractAdd1: false,
            contractAdd2: false,

            //项目费用
            costForm1: {
                costSort: '',
                money: ''
            },
            costForm2: {
                costSort: '',
                money: ''
            },
            costData: [{
                costSort: '',
                money: ''
            },
            {
                costSort: '',
                money: ''
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
                percent: ''
            },
            contractForm2: {
                contractName: '',
                date: '',
                money: '',
                percent: ''
            },
            contractData: [{
                contractName: '',
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
            //投资支付

        }
    },
    methods: {
        // 添加 项目费用 的方法
        costDialog() {
            this.costAdd1 = true
        },
        confirmCostAdd1() {
            this.costAdd1 = false;
            this.costData.push(this.costForm1);
        },
        // 编辑 项目费用 的方法
        handleEdit(row) {
            this.costAdd2 = true;
        },
        confirmCostAdd2() {
            this.costAdd2 = false;
        },

        // 添加 项目合同 的方法
        contractDialog() {
            this.contractAdd1 = true
        },
        confirmcontractAdd1() {
            this.contractAdd1 = false;
            this.contractData.push(this.contractForm1);
        },
        // 编辑 项目合同 的方法
        handleEdit(row) {
            this.contractAdd2 = true;
        },
        confirmcontractAdd2() {
            this.contractAdd2 = false;
        },




        //删除当前行
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
.fileTable {
    .title {
        margin-top: 30px;
    }
    width: 100%;
    height: 100%;
}
</style>
