<template>
    <div class="tables">
        <div class="memberTable">
            <tabel-header :data="headerInfo_member" @add="addMember"></tabel-header>
            <el-table :data="memberData" border style="width: 100%">
                <el-table-column label="姓名" prop="name" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.name }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.name"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="性质" prop="property" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.property }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.property"></el-input>
                        </span>
                    </template>

                </el-table-column>
                <el-table-column label="教育背景" prop="edu" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.edu }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.edu"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">编辑
                        </el-button>
                        <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">保存
                        </el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,memberData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加董事会成员 对话框-->
            <el-dialog title="添加董事会成员" :visible.sync="modalAdd1" :close-on-click-modal="false">
                <el-form :model="memberForm" :rules="rules1" ref="memberForm" label-width="80px">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="memberForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性质" prop="property">
                        <el-input v-model="memberForm.property" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="教育背景" prop="edu">
                        <el-input v-model="memberForm.edu" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAdd1 = false">取 消</el-button>
                    <el-button type="danger" @click="confirmAdd1('memberForm')">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div class="structureTable">
            <tabel-header :data="headerInfo_structure" @add="addStructure" class="structureHeader"></tabel-header>
            <el-table :data="structureData" border style="width: 100%">
                <el-table-column label="股东姓名" prop="name" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.name }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.name"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="股东性质" prop="property" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.property }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.property"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="投资金额（元）" prop="capital" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.capital }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.capital"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="持股数量（股）" prop="num" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.num }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.num"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="股权占比（%）" prop="percent" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.percent }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.percent"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">编辑
                        </el-button>
                        <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">保存
                        </el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index,structureData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加股权结构 对话框-->
            <el-dialog title="添加股权结构" :visible.sync="modalAdd2" :close-on-click-modal="false">
                <el-form :model="structureForm" :rules="rules2" ref="structureForm" label-width="120px">
                    <el-form-item label="股东姓名" prop="name">
                        <el-input v-model="structureForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="股东性质" prop="property">
                        <el-input v-model="structureForm.property" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="投资金额（元）" prop="capital">
                        <el-input v-model="structureForm.capital" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="持股数量（股）" prop="num">
                        <el-input v-model="structureForm.num" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="股权占比（%）" prop="percent">
                        <el-input v-model="structureForm.percent" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modalAdd2 = false">取 消</el-button>
                    <el-button type="danger" @click="confirmAdd2('structureForm')">确 定</el-button>
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
    //董事会成员
    memberData: [
    {
    name: '张飞',
    property: '合伙人',
    edu: '北大金融系研究院博士后',
    editFlag: false
    }, {
    name: '李四',
    property: '创建人',
    edu: '中国人民大学金融系博士',
    editFlag: false
    }
    ],
    memberForm: {
    name: '',
    property: '',
    edu: '',
    editFlag: false
    },
    //添加董事会成员 表单验证规则
    rules1: {
    name: [
    { required: true, message: '请输入成员姓名', trigger: 'blur' }
    ],
    property: [
    { required: true, message: '请输入成员性质', trigger: 'blur' }
    ],
    edu: [
    { required: true, message: '请输入教育背景', trigger: 'blur' }
    ]
    },
    //股权结构
    structureData: [
    {
    name: '张飞',
    property: '合伙人',
    capital: '10,000,000,000',
    num: '20',
    percent: '12%',
    editFlag: false
    },
    {
    name: '李四',
    property: '创建人',
    capital: '10,000,000,000',
    num: '15',
    percent: '10%',
    editFlag: false
    }
    ],
    structureForm: {
    name: '',
    property: '',
    capital: '',
    num: '',
    percent: '',
    editFlag: false
    },
    //添加股权结构 表单验证规则
    rules2: {
    name: [
    { required: true, message: '请输入股东姓名', trigger: 'blur' }
    ],
    property: [
    { required: true, message: '请输入股东性质', trigger: 'blur' }
    ],
    capital: [
    { required: true, message: '请输入投资金额', trigger: 'blur' }
    ],
    num: [
    { required: true, message: '请输入持股数量', trigger: 'blur' }
    ],
    percent: [
    { required: true, message: '请输入股权占比', trigger: 'blur' }
    ]
    },
    headerInfo_member: {
    desc: '董事会成员',
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
    addMember() {
    let new_memberForm = {
    name: '',
    property: '',
    edu: '',
    editFlag: false
    };
    this.memberForm = new_memberForm;
    this.modalAdd1 = !this.modalAdd1;
    },
    confirmAdd1(formName) {
    this.$refs[formName].validate((valid) => {
    if (valid) {
    this.memberData.push(this.memberForm);
    this.modalAdd1 = !this.modalAdd1;
    } else {
    return false;
    }

    });
    },
    //添加 股权结构的方法
    addStructure() {
    let new_structureForm = {
    name: '',
    property: '',
    capital: '',
    num: '',
    percent: '',
    editFlag: false
    };
    this.structureForm = new_structureForm;
    this.modalAdd2 = !this.modalAdd2;
    },
    confirmAdd2(formName) {
    this.$refs[formName].validate((valid) => {
    if (valid) {
    this.structureData.push(this.structureForm);
    this.modalAdd2 = !this.modalAdd2;
    } else {
    return false;
    }
    });
    },
    checkEdit(index, row) { //编辑
    // console.log(row)
    row.editFlag = !row.editFlag;
    },
    //删除当前行
    handleDelete(index, rows) {
    rows.splice(index, 1);
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
