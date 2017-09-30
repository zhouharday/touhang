<template>
    <section class="configuratin">
        <el-row :gutter="30">
            <el-col :span="6" style="height: 650px;border-right: 1px solid #ddd;padding: 0">
                <!-- 项目阶段 配置-->
                <!--<div class="rightAdd_btn">-->
                <!--<el-button type="danger" style="width:80px" @click="openProject">添加</el-button>-->
                <!--</div>-->
                <!--<b style="padding-left:15px;">项目阶段配置</b>-->
                <div v-for="item in leftList">
                    <div class="project_config">
                        <div class="menu_title">
                            <div style="justify-content: space-between;flex-direction: row;display: flex">
                                <div>{{item.title}}</div>
                                <div v-if="!item.showOne" style="color: red; padding-right: 20px">
                                    <el-button type="text" class="leftBtn" @click="changeSomeThing(item)">操作</el-button>
                                </div>
                                <div v-if="item.showOne" style="color: red; padding-right: 20px">
                                    <el-button type="text" class="leftBtn" @click="openProject">添加</el-button>
                                    <el-button type="text" class="leftBtn" @click="changeSomeThing(item)">完成</el-button>
                                </div>
                            </div>

                        </div>
                        <div class="menu_box">
                            <div class="menu_list" v-for="(detailsitem,index) in item.data" :key="detailsitem.index" @click="refreshList(detailsitem)">
                                <div style="height: 35px ;width: 100px;overflow: hidden">
                                    <span v-if="!detailsitem.editFlag" style="line-height: 35px;width: 100px;width: 200px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{detailsitem.stageName}}</span>
                                    <span v-if="detailsitem.editFlag" class="cell-edit-input">
                                        <el-input v-model="detailsitem.stageName" style="width: 100px"></el-input>
                                    </span>
                                </div>
                                <div v-if="detailsitem.stageStatus == 1">
                                    <div v-if="item.showOne" style="justify-content: space-between">
                                        <Icon type="arrow-up-c" class="mgr"></Icon>
                                        <Icon type="arrow-down-c" class="mgr"></Icon>
                                        <el-button v-if="!detailsitem.editFlag" type="text" class="leftBtn" @click="edit(index,detailsitem)">编辑</el-button>
                                        <el-button v-if="detailsitem.editFlag" type="text" class="leftBtn" @click="edit(index,detailsitem)">确定
                                        </el-button>
                                        <el-button type="text" @click="handleDeleteLeft(index,item.data)">删除</el-button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="18">
                <el-row>
                    <el-col>
                        <div class="leftAdd_btn">
                            <el-button type="danger" style="width:80px" @click="openFile" v-if="this.nowId">添加</el-button>
                        </div>
                    </el-col>
                    <el-col>
                        <el-table :data="fileData" style="width: 100%">
                            <el-table-column label="文档名称" prop="documentName" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.documentName }}</span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.documentName"></el-input>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="是否必传" prop="needUpload" align="center">
                                <template scope="scope">
                                    <span v-if="!scope.row.editFlag">
                                        <div v-if="scope.row.needUpload == 2">是</div>
                                        <div v-if="scope.row.needUpload == 1">否</div>
                                    </span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <el-input v-model="scope.row.needUpload"></el-input>
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
        <el-dialog title="项目阶段名称" :visible.sync="projectDialog" class="fileDialog">
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
                            <el-input v-model="fileForm.documentName" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="是否必传：" prop="fileName" label-width="100px">
                            <!--<el-input v-model="fileForm.needUpload" auto-complete="off"></el-input>-->
                            <el-select v-model="value2" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.lable" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
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
import { getConfigLeftList } from 'api/system'
import { reloadData } from 'api/system'
import { SetConfig } from 'api/system'
import { GetrightList } from 'api/system'
import { RightListData } from 'api/system'
import { DeleteRightList } from 'api/system'
import { changeRightList } from 'api/system'

export default {
    data() {
        return {
            projectDialog: false,
            fundDialog: false,
            investDialog: false,
            fileDialog: false,
            //            showOne:false,
            deleteList: [],
            leftList: [],
            value2:'',
            fileData: [
            ],
            fileForm: {
                documentName: '',
                needUpload: '',
                editFlag: false
            },
            projectForm: {
                stageName: '',
                editFlag: false
            },
            projectMenu: [

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
            ],
            changeList: [],
            nowId: '',
            options: [
                {
                    lable:'1',
                    value:'是'
                },{
                    lable:'2',
                    value:'否'
                }
            ],
        }
    },
    methods: {
        refreshList(item) {

            this.nowId = item.id
            //            alert(this.nowId)
            GetrightList(item.id).then((res) => {
                this.fileData = RightListData(res.data.result)
                console.log(this.fileData)
            })
        },
        changeSomeThing(item) {

            item.showOne = !item.showOne
            if (!item.showOne) {
                this.changeList = []

                SetConfig(item.data, this.deleteList).then((res) => {
                    if (res.data.status == '9024') {
                        alert(res.data.message)
                    } else {
                        getConfigLeftList().then((res) => {
                            this.leftList = reloadData(res.data.result)
                        })
                    }
                })
                //                getConfigLeftList().then((res) => {
                //                    this.leftList = reloadData(res.data.result)
                //                    console.log(this.leftList)
                //                })
            } else {
                this.deleteList = []
                this.changeList = item.data
                //                console.log (item)
            }
        },
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
            var a = [{ "stageName": this.projectForm.stageName, "stageType": this.changeList[0].stageType, "merchantId": this.changeList[0].merchantId }];
            var b = this.changeList;
            var newList = a.concat(b)
            //            console.log(newList)
            SetConfig(newList, this.deleteList).then((res) => {
                if (res.data.status == '9024') {
                    alert(res.data.message)
                } else {
                    getConfigLeftList().then((res) => {
                        this.leftList = reloadData(res.data.result)
                    })
                }
            })


            //            newList.push(this.projectForm)
            //            newList.
            //            this.projectMenu.push(this.projectForm);
            //            this.projectForm = {};
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
            //            alert(this.nowId)
            let new_fileForm = {
                fileName: '',
                needUpload: '',
                editFlag: false
            };
            this.fileForm = new_fileForm;
            this.fileDialog = !this.fileDialog;
        },
        addFile() {

            //            console.log(this.nowId)
            //            console.log(this.fileForm)
            //            alert(this.nowId + '****')

            if(this.value2 == '是'){
                this.fileForm.needUpload = '2';
            }else
                this.fileForm.needUpload = '1';

            changeRightList(this.nowId, this.fileForm).then((res) => {
                if (res.data.status == '9024') {
                    alert(res.data.message)
                } else {

                    GetrightList(this.nowId).then((res) => {
                        this.fileData = RightListData(res.data.result)
                        this.fileDialog = !this.fileDialog;
                    })
                }
            })
        },
        //
        edit(index, item) {
            item.editFlag = !item.editFlag;
            // console.log(item.fundName);
        },
        checkEdit(index, row) { //编辑

            row.editFlag = !row.editFlag;

            if (!row.editFlag) {
                changeRightList(this.nowId, row).then((res) => {
                    if (res.data.status == '9024') {
                        alert(res.data.message)
                    } else {

                        GetrightList(this.nowId).then((res) => {
                            this.fileData = RightListData(res.data.result)
                            //                            this.fileDialog = !this.fileDialog;
                        })
                    }
                })
            }
        },
        handleDeleteLeft(index, rows) {
            this.deleteList.push(rows[index])
            rows.splice(index, 1);
        },
        //右边删除当前行
        handleDelete(index, rows) {
            console.log(rows)
            DeleteRightList(rows[index]).then((res) => {
                console.log(res.data)
                if (res.data.status == '9024') {
                    alert(res.data.message)
                } else {
                    GetrightList(this.nowId).then((res) => {
                        this.fileData = RightListData(res.data.result)
                        //                        console.log(this.fileData)
                    })
                }
            })
            //            this.deleteList.push(rows[index])
            //            rows.splice(index, 1);

            //            console.log(rows[index].id)



            //            console.log(this.deleteList)
        }
    },
    created() {
        getConfigLeftList().then((res) => {
            this.leftList = reloadData(res.data.result)
        })
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
        flex-direction: row;
        background: #2A3142;
        >div {
            padding-left: 10px;
            background: #dfe6ec;
        }
    }
    .menu_box {
        padding: 10px 10px 10px 10px;
        font-size: 14px;
        .menu_list {
            display: flex;
            align-items: center;
            justify-content: space-between;
            /*justify-content: flex-end;*/
            margin-bottom: 5px;
            &:hover {
                background: #dfe6ec;
            }
            span {
                margin-right: 45px;
                ;
            }
            .mgr {
                margin-right: 10px;
            }
            .leftBtn {
                /*margin-left: 45px;*/
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
