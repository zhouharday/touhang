<template>
    <section class="configuratin">
        <el-row :gutter="30">
            <el-col :span="6" style="height: 650px;border-right: 1px solid #ddd;padding: 0">
                <!-- 项目阶段 配置-->
                <div class="rightAdd_btn">
                    <el-button type="danger" style="width:80px" @click="openProject">添加</el-button>
                </div>
                <b style="padding-left:15px;">项目阶段配置</b>
                <div class="project_config">
                    <div class="menu_title">
                        <div>项目配置</div>
                    </div>
                    <div class="menu_box">
                        <p class="menu_list" v-for="item in projectMenu" :key="item.index">
                            <span v-if="!item.editFlag">{{item.stageName}}</span>
                            <span v-if="item.editFlag" class="cell-edit-input">
                                <el-input v-model="item.stageName"></el-input>
                            </span>
                            <Icon type="arrow-up-c" class="mgr"></Icon>
                            <Icon type="arrow-down-c"></Icon>
                            <el-button v-if="!item.editFlag" type="text" class="leftBtn" @click="edit(index,item)">编辑</el-button>
                            <el-button v-if="item.editFlag" type="text" class="leftBtn" @click="edit(index,item)">保存
                            </el-button>
                            <el-button type="text" @click="handleDelete(index,projectMenu)">删除</el-button>
                        </p>
                    </div>
                </div>
                <!-- 基金阶段 配置 -->
                <div class="rightAdd_btn">
                    <el-button type="danger" style="width:80px" @click="openFund">添加</el-button>
                </div>
                <b style="padding-left:15px;">基金阶段配置</b>
                <div class="project_config">
                    <div class="menu_title">
                        <div>基金配置</div>
                    </div>
                    <div class="menu_box">
                        <p class="menu_list" v-for="item in fundMenu" :key="item.index">
                            <span v-if="!item.editFlag">{{item.fundName}}</span>
                            <span v-if="item.editFlag" class="cell-edit-input">
                                <el-input v-model="item.fundName"></el-input>
                            </span>
                            <Icon type="arrow-up-c" class="mgr"></Icon>
                            <Icon type="arrow-down-c"></Icon>
                            <el-button v-if="!item.editFlag" type="text" class="leftBtn" @click="edit(index,item)">编辑</el-button>
                            <el-button v-if="item.editFlag" type="text" class="leftBtn" @click="edit(index,item)">保存</el-button>
                            <el-button type="text" @click="handleDelete(index,fundMenu)">删除</el-button>
                        </p>
                    </div>
                </div>
                <!-- 投资阶段 配置 -->
                <div class="rightAdd_btn">
                    <el-button type="danger" style="width:80px" @click="openInvest">添加</el-button>
                </div>
                <b style="padding-left:15px;">投资阶段配置</b>
                <div class="project_config">
                    <div class="menu_title">
                        <div>投资者配置</div>
                    </div>
                    <div class="menu_box">
                        <p class="menu_list" v-for="item in investMenu" :key="item.index">
                            <span v-if="!item.editFlag">{{item.investName}}</span>
                            <span v-if="item.editFlag" class="cell-edit-input">
                                <el-input v-model="item.investName"></el-input>
                            </span>
                            <Icon type="arrow-up-c" class="mgr"></Icon>
                            <Icon type="arrow-down-c"></Icon>
                            <el-button v-if="!item.editFlag" type="text" class="leftBtn" @click="edit(index,item)">编辑</el-button>
                            <el-button v-if="item.editFlag" type="text" class="leftBtn" @click="edit(index,item)">保存</el-button>
                            <el-button type="text" @click="handleDelete(index,investMenu)">删除</el-button>
                        </p>
                    </div>
                </div>
            </el-col>
            <el-col :span="18">
                <el-row>
                    <el-col>
                        <div class="leftAdd_btn">
                            <el-button type="danger" style="width:80px" @click="openFile">添加</el-button>
                        </div>
                    </el-col>
                    <el-col>
                        <el-table :data="fileData" style="width: 100%">
                            <el-table-column label="文档名称" prop="fileName" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.fileName }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.fileName"></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="是否必传" prop="enable" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.enable }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.enable"></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template scope="scope">
                                    <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">编辑
                                    </el-button>
                                    <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">保存
                                    </el-button>
                                    <el-button type="text" size="small" @click="handleDelete(scope.$index,fileData)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <!-- 添加 项目阶段 对话框-->
        <el-dialog title="阶段名称" :visible.sync="projectDialog" class="fileDialog">
            <el-form :model="projectForm">
                <el-row>
                    <el-col>
                        <i class="bottomLine"></i>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="阶段名称：" prop="stageName" label-width="100px">
                            <el-input v-model="projectForm.stageName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="dialogBtn_active" @click="addProject">保存</el-button>
                <el-button class="dialogBtn" @click="projectDialog = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 添加 基金阶段 对话框-->
        <el-dialog title="基金名称" :visible.sync="fundDialog" class="fileDialog">
            <el-form :model="fundForm">
                <el-row>
                    <el-col>
                        <i class="bottomLine"></i>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="基金名称：" prop="fundName" label-width="100px">
                            <el-input v-model="fundForm.fundName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="dialogBtn_active" @click="addFund">保存</el-button>
                <el-button class="dialogBtn" @click="fundDialog = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 添加 投资者阶段 对话框-->
        <el-dialog title="阶段名称" :visible.sync="investDialog" class="fileDialog">
            <el-form :model="fundForm">
                <el-row>
                    <el-col>
                        <i class="bottomLine"></i>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="阶段名称：" prop="investName" label-width="100px">
                            <el-input v-model="investForm.investName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="dialogBtn_active" @click="addInvest">保存</el-button>
                <el-button class="dialogBtn" @click="investDialog = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 添加  文档 对话框-->
        <el-dialog title="文档名称" :visible.sync="fileDialog" class="fileDialog">
            <el-form :model="fileForm">
                <el-row>
                    <el-col>
                        <i class="bottomLine"></i>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="文档名称：" prop="fileName" label-width="100px">
                            <el-input v-model="fileForm.fileName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="dialogBtn_active" @click="addFile">保存</el-button>
                <el-button class="dialogBtn" @click="fileDialog = false">取消</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            projectDialog: false,
            fundDialog: false,
            investDialog: false,
            fileDialog: false,
            fileData: [
                {
                    fileName: '基金负责人',
                    enable: '是',
                    editFlag: false
                },
                {
                    fileName: '考察报告',
                    enable: '否',
                    editFlag: false
                }
            ],
            fileForm: {
                fileName: '',
                editFlag: false
            },
            projectForm: {
                stageName: '',
                editFlag: false
            },
            projectMenu: [
                {
                    stageName: '考察储备',
                    editFlag: false
                },
                {
                    stageName: '立项会',
                    editFlag: false
                }
            ],
            fundForm: {
                fundName: '',
                editFlag: false
            },
            fundMenu: [
                {
                    fundName: '基金投资',
                    editFlag: false
                },
                {
                    fundName: '基金撤资',
                    editFlag: false
                }
            ],
            investForm: {
                investName: '',
                editFlag: false
            },
            investMenu: [
                {
                    investName: '投资文档',
                    editFlag: false
                },
                {
                    investName: '资质文件',
                    editFlag: false
                }
            ]
        }
    },
    methods: {
        // 添加 项目配置 的方法
        openProject() {
            let new_projectForm = {
                stageName: '',
                editFlag: false
            };
            this.projectForm = new_projectForm;
            this.projectDialog = !this.projectDialog;
        },
        addProject() {
            this.projectMenu.push(this.projectForm);
            this.projectForm = {};
            this.projectDialog = !this.projectDialog;
        },
        // 添加 基金配置 的方法
        openFund() {
            let new_fundForm = {
                fundName: '',
                editFlag: false
            };
            this.fundForm = new_fundForm;
            this.fundDialog = !this.fundDialog;
        },
        addFund() {
            this.fundMenu.push(this.fundForm);
            this.fundForm = {};
            this.fundDialog = !this.fundDialog;
        },
        //添加 投资者配置的方法
        openInvest() {
            let new_investForm = {
                investName: '',
                editFlag: false
            };
            this.investForm = new_investForm;
            this.investDialog = !this.investDialog;
        },
        addInvest() {
             this.investMenu.push(this.investForm);
            this.investForm = {};
            this.investDialog = !this.investDialog;
        },
        // 添加 文档 的方法
        openFile() {
            let new_fileForm = {
                fileName: '',
                editFlag: false
            };
            this.fileForm = new_fileForm;
            this.fileDialog = !this.fileDialog;
        },
        addFile() {
            this.fileData.push(this.fileForm);
            this.fileForm = {};
            this.fileDialog = !this.fileDialog;
        },
        //
        edit(index, item) {
            item.editFlag = !item.editFlag;
            // console.log(item.fundName);
        },
        checkEdit(index, row) { //编辑
            // console.log(row)
            row.editFlag = !row.editFlag;
        },
        //删除当前行
        handleDelete(index, rows) {
            rows.splice(index, 1);
        }
    }
}
</script>





<style lang="less" scoped>
.configuratin {
    width: 100%;
    padding: 24px;
    background: #fff;
    min-height: 820px;
    .rightAdd_btn,
    .leftAdd_btn {
        padding-left: 15px;
        margin-bottom: 15px;
        button {
            padding: 7px 14px;
        }
    }
    .leftAdd_btn {
        display: flex;
        justify-content: flex-end;
    } //  右边菜单 project_menu
    .menu_title {
        height: 40px;
        line-height: 40px;
        padding-left: 5px;
        ;
        background: #2A3142;
        >div {
            padding-left: 10px;
            background: #dfe6ec;
        }
    }
    .menu_box {
        padding: 10px 30px 10px 15px;
        font-size: 14px;
        .menu_list {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-bottom: 5px;
            &:hover {
                background: #dfe6ec;
            }
            span {
                margin-right: 45px;
                ;
            }
            .mgr {
                margin-right: 15px;
            }
            .leftBtn {
                margin-left: 45px;
            }
        }
    } // 添加文档 对话框
    .bottomLine {
        display: inline-block;
        width: 100%;
        margin-bottom: 20px;
        border-bottom: 1px solid #f05e5e;
    }
    .dialog-footer {
        text-align: center;
        margin-top: 75px;
    }
    .dialogBtn_active {
        width: 150px;
        font-size: 16px;
        color: #fff;
        border-radius: 5px;
        border-color: #f05e5e;
        background-color: #f05e5e;
    }
    .dialogBtn {
        width: 150px;
        font-size: 16px;
        color: #f05e5e;
        border-radius: 5px;
        border-color: #f05e5e;
        background-color: #fff;
    }
}
</style>
