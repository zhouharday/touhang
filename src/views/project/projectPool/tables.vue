<template>
    <div class="tables">
        <div class="memberTable">
            <tabel-header :data="headerInfo_member" @add="addMember"></tabel-header>
            <el-table :data="memberData" border style="width: 100%">
                <el-table-column label="姓名" prop="name" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.name }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.name" ></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="性质" prop="nature" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.nature }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.nature" ></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="教育背景" prop="educationalBg" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.educationalBg }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.educationalBg"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEditOwer(scope.row)">编辑
                        </el-button>
                        <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEditOwer(scope.row)">保存
                        </el-button>
                        <el-button type="text" size="small" @click="handleDeleteMember(scope.$index,memberData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加董事会成员 对话框-->
            <el-dialog title="添加董事会成员" :visible.sync="modalAdd1" :close-on-click-modal="false">
                <el-form :model="memberForm" :rules="rules1" ref="memberForm" label-position="left" label-width="80px">
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
                    <el-button  @click="modalAdd1 = false">取 消</el-button>
                    <el-button type="danger" @click="confirmAdd1('memberForm')">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div class="structureTable">
            <tabel-header :data="headerInfo_structure" @add="addStructure" class="structureHeader"></tabel-header>
            <el-table :data="structureData" border style="width: 100%">
                <el-table-column label="股东姓名" prop="stockholderName" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag ">{{ scope.row.stockholderName }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.stockholderName"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="股东性质" prop="stockholderNature" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.stockholderNature }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.stockholderNature"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="投资金额（元）" prop="investmentAmount" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.investmentAmount }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.investmentAmount"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="持股数量（股）" prop="stockCount" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.stockCount }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.stockCount"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="股权占比（%）" prop="stockRatio" align="center">
                    <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.stockRatio }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.stockRatio"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEditGu(scope.row)">编辑
                        </el-button>
                        <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEditGu(scope.row)">保存
                        </el-button>
                        <el-button type="text" size="small" @click="handleDeleteOwner(scope.$index,structureData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加股权结构 对话框-->
            <el-dialog title="添加股权结构" :visible.sync="modalAdd2" :close-on-click-modal="false">
                <el-form :model="structureForm" :rules="rules2" ref="structureForm" label-position="left" label-width="120px">
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

<script>
import { mapGetters } from 'vuex'
import tabelHeader from 'components/tabelHeader'
import { addOwer, delOwer, addGu, delGu, owers, gus, updateOwer } from 'api/projectPre';

export default {
    computed: mapGetters({
        projectData: 'getProjectData'    // 获取项目详情数据
    }),
    props: {
        projectData: {
            type: Object,
            default: {}
        }
    },
    watch: {
        projectData(val, oldVal) {
            this.init();
        }
    },
    data() {
        return {
            modalAdd1: false,
            modalAdd2: false,
            //董事会成员
            memberData: [
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
            },
            enterpriseInfo: {}
        }
    },
    created() {
    },
    methods: {
        init() {
            this.initInfo();
            this.getMembers();
            this.getStructures();
        },
        initInfo() {
            let projectData = this.projectData;
            this.enterpriseInfo = projectData.enterpriseInfo || {};
            this.memberData = projectData.listBoardMember || [];
            this.structureData = projectData.listOwnershipStructure || [];
        },
        changeOwer(ower) {
        },
        // TODO: 获取董事会列表
        getMembers() {
            this.memberData = this.projectData.listBoardMember || [];
            // this.memberData.forEach(function(item, index) {
            //    item.editFlag = false;
            // });
        },
        //添加 董事会成员的方法
        addMember() {
            let new_memberForm = {
                name: '',
                property: '',
                edu: ''
                //,editFlag: false
            };
            this.memberForm = new_memberForm;
            this.modalAdd1 = !this.modalAdd1;
        },
        confirmAdd1(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let memberForm = this.memberForm;
                    let projectId = this.projectData.projectInfo.id;
                    addOwer({
                        id:'',
                        projectId:projectId,
                        enterpriseId: this.enterpriseInfo.id,
                        name: memberForm.name,
                        nature: memberForm.property,
                        educationalBg: memberForm.edu
                    }).then(resp => {
                        let result = resp.data.result;
                        result.editFlag = false;
                        this.memberData.push(result);
                        this.modalAdd1 = !this.modalAdd1;
                    }).catch(e => {
                        console.log('addOwer exists error: ', e);
                    });
                } else {
                    return false;
                }

            });
        },
        //删除董事会成员
        handleDeleteMember(index, rows) {
            delOwer(rows[index].id).then((res) => {
                if (res.status == '200') {
                    this.$Message.success(res.data.message || '删除成功！');
                    rows.splice(index, 1);
                }
            });
        },
        // TODO: 获取股权列表
        getStructures() {
            this.structureData = this.projectData.listOwnershipStructure || [];
            // this.structureData.forEach(function(item) {
            //    item.editFlag = false;
            // });
        },
        //添加 股权结构的方法
        addStructure() {
            let new_structureForm = {
                name: '',
                property: '',
                capital: '',
                num: '',
                percent: ''
                //,editFlag: false
            };
            this.structureForm = new_structureForm;
            this.modalAdd2 = !this.modalAdd2;
        },
        confirmAdd2(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let structureForm = this.structureForm;
                    let projectId = this.projectData.projectInfo.id;
                    addGu({
                        id:'',
                        projectId:projectId,
                        stockholderName: structureForm.name, //股东姓名: null
                        stockholderNature: structureForm.property,//股东性质: null
                        investmentAmount: structureForm.capital,//投资金额: null
                        stockCount: structureForm.num, //持股数量: null
                        stockRatio: structureForm.percent
                        
                    }).then(resp => {
                        let result = resp.data.result;
                        result.editFlag = false;
                        this.structureData.push(result);
                        this.modalAdd2 = !this.modalAdd2;
                    }).catch(e => {
                        console.log('addGu exists error: ', e);
                    });
                } else {
                    return false;
                }
            });
        },
        checkEditOwer(row) { //编辑
            console.log("editFlag "+row.editFlag);
            if(row.editFlag){
                addOwer(row).then((res) => {
                if (res.status == '200') {
                    this.$Message.success(res.data.message || '保存成功！');
                    //rows.splice(index, 1);
                }
            });
            }
            row.editFlag = !row.editFlag;
            this.memberData.push();
            this.structureData.push();
        },
        checkEditGu(row) { //编辑
            if(row.editFlag){
                addGu(row).then((res) => {
                if (res.status == '200') {
                    this.$Message.success(res.data.message || '保存成功！');
                    //rows.splice(index, 1);
                }
            });
            }
            row.editFlag = !row.editFlag;
            this.memberData.push();
            this.structureData.push();
        },
        //删除股权结构
        handleDeleteOwner(index, rows) {
            delGu(rows[index].id).then((res) => {
                if (res.status == '200') {
                    this.$Message.success(res.data.message || '删除成功！');
                    rows.splice(index, 1);
                }
            });
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
