<template>
    <div class="tables">
        <div class="memberTable">
            <tabel-header :data="headerInfo_member" @add="method1"></tabel-header>
            <el-table :data="memberData" border style="width: 100%">
                <el-table-column label="姓名" prop="name" align="center">
                </el-table-column>
                <el-table-column label="性质" prop="property" align="center">
                </el-table-column>
                <el-table-column label="教育背景" prop="edu" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="handleEditm(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,memberData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加董事会成员 对话框-->
            <el-dialog title="添加董事会成员" :visible.sync="modalAdd1" :close-on-click-modal="false">
                <el-form :model="memberForm1">
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="memberForm1.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性质" :label-width="formLabelWidth">
                        <el-input v-model="memberForm1.property" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="教育背景" :label-width="formLabelWidth">
                        <el-input v-model="memberForm1.edu" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAdd1 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAdd1">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 编辑董事会成员 对话框-->
            <el-dialog title="编辑董事会成员" :visible.sync="modalAdd2" :close-on-click-modal="false">
                <el-form :model="memberForm2">
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="memberForm2.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性质" :label-width="formLabelWidth">
                        <el-input v-model="memberForm2.property" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="教育背景" :label-width="formLabelWidth">
                        <el-input v-model="memberForm2.edu" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAdd2 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAdd2">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div class="structureTable">
            <tabel-header :data="headerInfo_structure" @method="method3" class="structureHeader"></tabel-header>
            <el-table :data="structureData" border style="width: 100%">
                <el-table-column label="股东姓名" prop="name" align="center">
                </el-table-column>
                <el-table-column label="股东性质" prop="property" align="center">
                </el-table-column>
                <el-table-column label="投资金额（元）" prop="capital" align="center">
                </el-table-column>
                <el-table-column label="持股数量（股）" prop="num" align="center">
                </el-table-column>
                <el-table-column label="股权占比（%）" prop="percent" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="handleEdits(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,structureData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加股权结构 对话框-->
            <el-dialog title="添加股权结构" :visible.sync="modalAdd3" :close-on-click-modal="false">
                <el-form :model="structureForm1">
                    <el-form-item label="股东姓名" :label-width="formLabelWidth">
                        <el-input v-model="structureForm1.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="股东性质" :label-width="formLabelWidth">
                        <el-input v-model="structureForm1.property" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="投资金额（元）" :label-width="formLabelWidth">
                        <el-input v-model="structureForm1.capital" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="持股数量（股）" :label-width="formLabelWidth">
                        <el-input v-model="structureForm1.num" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="股权占比（%）" :label-width="formLabelWidth">
                        <el-input v-model="structureForm1.percent" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAdd3 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAdd3">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 编辑股权结构 对话框-->
            <el-dialog title="编辑股权结构" :visible.sync="modalAdd4" :close-on-click-modal="false">
                <el-form :model="structureForm2">
                    <el-form-item label="股东姓名" :label-width="formLabelWidth">
                        <el-input v-model="structureForm2.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="股东性质" :label-width="formLabelWidth">
                        <el-input v-model="structureForm2.property" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="投资金额（元）" :label-width="formLabelWidth">
                        <el-input v-model="structureForm2.capital" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="持股数量（股）" :label-width="formLabelWidth">
                        <el-input v-model="structureForm2.num" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="股权占比（%）" :label-width="formLabelWidth">
                        <el-input v-model="structureForm2.percent" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAdd4 = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAdd4">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>



<script style="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            modalAdd1: false,
            modalAdd2: false,
            modalAdd3: false,
            modalAdd4: false,
            formLabelWidth: '80px',
            memberData: [
                {
                    name: '张飞',
                    property: '合伙人',
                    edu: '北大金融系研究院博士后'
                }, {
                    name: '李四',
                    property: '创建人',
                    edu: '中国人民大学金融系博士'
                }
            ],
            memberForm1: {
                name: '',
                property: '',
                edu: ''
            },
            memberForm2: {
                name: '',
                property: '',
                edu: ''
            },
            structureData: [
                {
                    name: '张飞',
                    property: '合伙人',
                    capital: '10,000,000,000',
                    num: '20',
                    percent: '12%'
                },
                {
                    name: '李四',
                    property: '创建人',
                    capital: '10,000,000,000',
                    num: '15',
                    percent: '10%'
                }
            ],
            structureForm1: {
                name: '',
                property: '',
                capital: '',
                num: '',
                percent: ''
            },
            structureForm2: {
                name: '',
                property: '',
                capital: '',
                num: '',
                percent: ''
            },
            headerInfo_member: {
                desc: '董事会成员结构',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            headerInfo_structure: {
                desc: '股权结构',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            }
        }
    },
    methods: {
        //添加 董事会成员的方法
        method1() {
            this.modalAdd1 = true;
        },
        confirmAdd1() {
            this.modalAdd1 = false;
            // this.memberData.push({
            //     name: this.memberForm1.name,
            //     property: this.memberForm1.property,
            //     edu: this.memberForm1.edu
            // });
            this.memberData.push(this.memberForm1);
            this.clearMVal1();
        },
        //编辑 董事会成员的方法
        handleEditm(row) {
            this.modalAdd2 = true;
        },
        confirmAdd2() {
            this.modalAdd2 = false;
        },
        //添加 股权结构的方法
        method3() {
            this.modalAdd3 = true;
        },
        confirmAdd3() {
            this.modalAdd3 = false;
            this.structureData.push(this.structureForm1);
            this.clearSVal1();
        },
        //编辑 股权结构的方法
        handleEdits(row) {
            this.modalAdd4 = true;
        },
        confirmAdd4() {
            this.modalAdd4 = false;
        },
        //删除当前行
        handleDelete(index, rows) {
            rows.splice(index, 1);
        },
        //清除 添加董事会成员对话框
        clearMVal1() {
            // this.memberForm1.name = '';
            // this.memberForm1.property = '';
            // this.memberForm1.edu = ''
            this.memberForm1 = {
                name: '',
                property: '',
                edu: ''
            }
        },
        //清除 编辑董事会成员对话框
        clearMVal2() {
            this.memberForm2 = {
                name: '',
                property: '',
                edu: ''
            }
        },
        //清除 添加股权结构对话框
        clearSVal1() {
            this.structureFrom1 = {
                name: '',
                property: '',
                capital: '',
                num: '',
                percent: ''
            }
        },
        //清除 编辑股权结构对话框
        clearSVal2() {
            this.structureFrom2 = {
                name: '',
                property: '',
                capital: '',
                num: '',
                percent: ''
            }
        }
    },
    components: {
        tabelHeader
    }
}

</script>


<style lang="less" scoped>
.tables {
    width: 100%;
    height: 100%;
    .memberTable,
    .structureTable {
        width: 100%;
        height: 100%;
        .structureHeader {
            margin-top: 22px;
        }
    }
}
</style>
