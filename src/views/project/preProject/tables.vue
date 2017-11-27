<template>
<div class="tables">
    <!-- 董事会成员 -->
    <div class="memberTable">
        <tabel-header :data="checkProjectAuth('JBXQ-bianji')? headerInfo_member : _headerInfo_member" @add="addMember"></tabel-header>
        <el-table :data="memberData" border style="width: 100%">
            <el-table-column label="姓名" prop="name" align="center">
                <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.name }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.name"></el-input>
                        </span>
                    </template>
            </el-table-column>
            <el-table-column label="性质" prop="nature" align="center">
                <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.nature }}</span>
                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                            <el-input v-model="scope.row.nature"></el-input>
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
                        <el-button v-if="checkProjectAuth('JBXQ-bianji') && !scope.row.editFlag" type="text" size="small" @click="checkEditOwer(scope.row)">编辑
                        </el-button>
                        <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEditOwer(scope.row)">保存
                        </el-button>
                        <el-button v-if="checkProjectAuth('JBXQ-bianji')" type="text" size="small" @click="handleDeleteMember(scope.$index,memberData)">删除</el-button>
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
    <!-- 股权结构 -->
    <div class="structureTable">
        <tabel-header :data="checkProjectAuth('JBXQ-bianji')? headerInfo_structure: _headerInfo_structure" @add="addStructure" class="structureHeader"></tabel-header>
        <el-table :data="structureData" border style="width: 100%">
            <el-table-column label="股东姓名" prop="stockholderName" align="center">
                <template scope="scope">
                        <span v-if="!scope.row.editFlag">{{ scope.row.stockholderName }}</span>
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
                        <span v-if="!scope.row.editFlag">{{ scope.row.investmentAmount | toMoney}}</span>
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
                        <el-button v-if="checkProjectAuth('JBXQ-bianji') && !scope.row.editFlag" type="text" size="small" @click="checkEditGu(scope.row)">编辑
                        </el-button>
                        <el-button v-if="checkProjectAuth('JBXQ-bianji') && scope.row.editFlag" type="text" size="small" @click="checkEditGu(scope.row)">保存
                        </el-button>
                        <el-button v-if="checkProjectAuth('JBXQ-bianji')" type="text" size="small" @click="handleDeleteOwner(scope.$index,structureData)">删除</el-button>
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
import 'common/js/filter'
import {checkProjectAuth } from 'common/js/config'
import { addOwer, delOwer, addGu, delGu, owers, gus } from 'api/projectPre';
export default {
    props: {
        companyForm: {
            type: Object,
            default: {}
        },
        memberData: {
            type: Array,
            default: []
        },
        structureData: {
            type: Array,
            default: []
        },
        isInTeam: {
            type: Boolean,
            default: false
        },
        authList: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            projectId: '',
            modalAdd1: false,
            modalAdd2: false,
            memberForm: {
                name: '',
                property: '',
                edu: '',
                editFlag: false
            },
            //添加董事会成员 表单验证规则
            rules1: {
                name: [{
                    required: true,
                    message: '请输入成员姓名',
                    trigger: 'blur'
                }],
                property: [{
                    required: true,
                    message: '请输入成员性质',
                    trigger: 'blur'
                }],
                edu: [{
                    required: true,
                    message: '请输入教育背景',
                    trigger: 'blur'
                }]
            },
            //股权结构
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
                name: [{
                    required: true,
                    message: '请输入股东姓名',
                    trigger: 'blur'
                }],
                property: [{
                    required: true,
                    message: '请输入股东性质',
                    trigger: 'blur'
                }],
                capital: [{
                    required: true,
                    message: '请输入投资金额',
                    trigger: 'blur'
                }],
                num: [{
                    required: true,
                    message: '请输入持股数量',
                    trigger: 'blur'
                }],
                percent: [{
                    required: true,
                    message: '请输入股权占比',
                    trigger: 'blur'
                }]
            },
            headerInfo_member: {
                desc: '董事会成员',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            _headerInfo_member: {
                desc: '董事会成员',
                btnGroup: []
            },
            headerInfo_structure: {
                desc: '股权结构',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            },
            _headerInfo_structure: {
                desc: '股权结构',
                btnGroup: []
            }
        }
    },
    created() {
        this.projectId = this.$route.params.userId;
    },
    watch: {
        // '$route'(to, from) {
        //     this.init();
        // }
    },
    methods: {
        checkProjectAuth(code){
            if (!this.authList) {
                return false;
            }
            return checkProjectAuth(code, this.authList) && this.isInTeam;
        },
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
            if(this.companyForm.id == null || this.companyForm.id == ''){
                this.$Message.error("企业信息走丢了，请刷新再试");
                return;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let memberForm = this.memberForm;
                    let projectId = this.projectId;
                    addOwer({
                        id:'',
                        projectId:projectId,
                        enterpriseId: this.companyForm.id,
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
                    let structureForm = this.structureForm;
                    let projectId = this.projectId;
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
