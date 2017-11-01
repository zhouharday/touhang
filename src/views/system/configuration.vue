
<template>
    <section  class="configuratin">
        <el-row  :gutter="30">
            <el-col  :span="6"  style="height:  650px;border-right:  1px  solid  #ddd;padding:  0">
                <!--  项目阶段  配置-->
                <!--<div  class="rightAdd_btn">-->
                <!--<el-button  type="danger"  style="width:80px"  @click="openProject">添加</el-button>-->
                <!--</div>-->
                <!--<b  style="padding-left:15px;">项目阶段配置</b>-->
                <div  v-for="item  in  leftList">
                    <div  class="project_config">
                        <div  class="menu_title">
                            <div  style="justify-content:  space-between;flex-direction:  row;display:  flex">
                                <div>{{item.title}}</div>
                                <div  v-if="!item.showOne"  style="color:  red;  padding-right:  20px">
                                    <el-button  type="text"  class="leftBtn"  @click="changeSomeThing(item)">操作</el-button>
                                </div>
                                <div  v-if="item.showOne"  style="color:  red;  padding-right:  20px">
                                    <el-button  type="text"  class="leftBtn"  @click="openProject(item)">添加</el-button>
                                    <el-button  type="text"  class="leftBtn"  @click="changeSomeThing(item)">完成</el-button>
                                </div>
                            </div>

                        </div>
                        <div  class="menu_box">
                            <div  class="menu_list"  v-for="(detailsitem,index)  in  item.data"  :key="detailsitem.index"  @click="refreshList(detailsitem)">
                                <div  style="height:  35px  ;width:  100px;overflow:  hidden">
                                    <span  v-if="!detailsitem.editFlag"  style="line-height:  35px;width:  100px;width:  200px;overflow:  hidden;white-space:  nowrap;text-overflow:  ellipsis;">{{detailsitem.stageName}}</span>
                                    <span  v-if="detailsitem.editFlag"  class="cell-edit-input">
                                        <el-input  v-model="detailsitem.stageName"  style="width:  100px"></el-input>
                                    </span>
                                </div>
                                <div  >
                                    <div  v-if="item.showOne"  style="justify-content:  space-between">
                                        <el-button  size="mini"  @click="moveUp(item,index)" v-if="detailsitem.stageStatus  ==  1">
                                            <Icon  type="arrow-up-c"></Icon>
                                        </el-button>
                                        <el-button  size="mini"  @click="moveDown(item,index)" v-if="detailsitem.stageStatus  ==  1">
                                            <Icon  type="arrow-down-c"></Icon>
                                        </el-button>
                                        <el-button  v-if="!detailsitem.editFlag"  type="text"  class="leftBtn"  @click="edit (index,detailsitem)">编辑</el-button>
                                        <!--<el-button v-if="detailsitem.editFlag" type="text" class="leftBtn" @click="edit(index,detailsitem)">确定-->
                                        </el-button>
                                        <el-button type="text" @click="handleDeleteLeft(index,item.data)" v-if="detailsitem.stageStatus  ==  1">删除</el-button>
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
                                        <div v-if="scope.row.needUpload == 1">是</div>
                                        <div v-if="scope.row.needUpload == 2">否</div>
                                    </span>
                                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                                        <!--<el-input v-model="scope.row.needUpload"></el-input>-->
                                        <el-select v-model="value3" placeholder="请选择">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
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
                    <el-col :span="23">
                        <el-form-item label="阶段名称：" prop="stageName" label-width="100px">
                            <el-input v-model="projectForm.stageName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="dialogBtn_active" @click="addProject">提交</el-button>
                <el-button class="dialogBtn" @click="projectDialog = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 添加 基金阶段 对话框-->
        <el-dialog title="修改配置" :visible.sync="fundDialog" class="fileDialog">
            <el-form :model="shenpidata">
                <el-row>
                    <el-col>
                        <i class="bottomLine"></i>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="配置名称：" prop="fundName" label-width="100px">
                            <el-input v-model="shenpidata.stageName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="showshenpi">
                        <el-form-item label="审批节点：" label-width="100px">
                            <el-select v-model="projectForm.nodeName1" style="width:30%;margin-right:5px">
                                <el-option v-for="item in showRole" :key="item.roleName" :label="item.roleName" :value="item.id">
                                </el-option>
                            </el-select>
                            <el-select v-model="projectForm.nodeName2" style="width:30%;margin-right:5px">
                                <el-option v-for="item in showRole" :key="item.roleName" :label="item.roleName" :value="item.id">
                                </el-option>
                            </el-select>
                            <el-select v-model="projectForm.nodeName3" style="width:30%">
                                <el-option v-for="item in showRole" :key="item.roleName" :label="item.roleName" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" style="text-align:center" v-if="showshenpi">
                        <p>此处添加的审批角色为项目角色，最高三级审批。</p>
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
    import { queryList } from 'api/system'
    import { getStageApprove } from 'api/system'
    import { addStageApprove } from 'api/system'
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

    export default {
        components: { ElButton },
        data() {
            return {
                projectDialog: false,
                fundDialog: false,
                investDialog: false,
                fileDialog: false,
                //            showOne:false,
                deleteList: [],
                leftList: [],
                value2: '',
                value3: '',
                options: [
                    {
                        lable: '2',
                        value: '是'
                    }, {
                        lable: '1',
                        value: '否'
                    }
                ],
                fileData: [
                ],
                fileForm: {
                    documentName: '',
                    needUpload: '',
                    editFlag: false
                },
                projectForm: {
                    stageName: '',
                    nodeName1: '',
                    nodeName2: '',
                    nodeName3: '',
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
                ],
                changeList: [],
                nowId: '',
                options: [
                    {
                        lable: '1',
                        value: '是'
                    }, {
                        lable: '2',
                        value: '否'
                    }
                ],
                showshenpi:true,
                shenpidata:[],
                fundRole:[],
                businessRole:[],
                showRole:[],
            }
        },
        methods: {
            moveUp(item, index) {

                if (index != 0) {
                    var dataArr = item.data[index - 1];
                    item.data[index - 1] = item.data[index];
                    item.data[index] = dataArr;
                }

            },
            moveDown(item,index){
                if (index !=   item.data.length - 1 ){
                    var dataArr = item.data[index + 1];
                    item.data[index + 1] = item.data[index];
                    item.data[index] = dataArr;
                };
            },
            refreshList(item) {
                this.nowId = item.id
                GetrightList(item.id).then((res) => {
                    this.fileData = RightListData(res.data.result)
                })
            },
            changeSomeThing(item) {
                item.showOne = !item.showOne
                if (!item.showOne) {
                    this.changeList = []
                    if(item.data.length == 0 && this.deleteList.length == 0){
                    }else {
                        SetConfig(item.data, this.deleteList).then((res) => {
                            if (res.data.status == '9024') {
                                alert(res.data.message)
                            } else {
                                getConfigLeftList().then((res) => {
                                    this.leftList = reloadData(res.data.result)
                                })
                            }
                        })
                    }
                } else {
                    this.deleteList = []
                    this.changeList = item.data
                }
            },
            // 添加 项目配置 的方法
            openProject(item) {
                let new_projectForm = {
                    stageName: '',
                    editFlag: false
                };
                this.projectForm = new_projectForm;
                this.projectDialog = !this.projectDialog;
            },
            addProject() {
                console.log(this.changeList)
                var stageType ;
                if (!this.changeList[0]){
                    stageType = '3';
                } else
                    stageType = this.changeList[0].stageType
                var a = [{ "stageName": this.projectForm.stageName, "stageType": stageType, "merchantId": JSON.parse(sessionStorage.getItem('merchants'))[0].id }];
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
                this.fundForm = {};
                this.fundDialog = !this.fundDialog;
//                console.log(this.projectForm)
//                id,stageId,stageName,userId,shenpidata
                var id = this.shenpidata.id
                var stageId = this.shenpidata.stageId
                var stageName = this.shenpidata.stageName
                var shenpidata = this.shenpidata.data
                shenpidata = [{"id":"","roleId":this.projectForm.nodeName1},{"id":"","roleId":this.projectForm.nodeName2},{"id":"","roleId":this.projectForm.nodeName3}]
                this.shenpidata.data.forEach(function (item,index) {
//                    console.log(item)
                    shenpidata[index].id = item.id
                })
                console.log(shenpidata)
                addStageApprove(id,stageId,stageName,shenpidata).then((res)=>{
                    getConfigLeftList().then((res) => {
                        this.leftList = reloadData(res.data.result)
                        this.nowId = this.leftList[0].data[0].id
                        GetrightList(this.leftList[0].data[0].id).then((res) => {
                            this.fileData = RightListData(res.data.result)
                            //                console.log(this.fileData)
                        })
                        //            console.log(this.leftList)
                    })
                })
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

                if (this.value2 == '是') {
                    this.fileForm.needUpload = '1';
                } else
                    this.fileForm.needUpload = '2';

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
//                item.editFlag = !item.editFlag;
//                 console.log(item);
                this.fundDialog = true
                //拿到item.id 发送返回参数
                var data = {}
                getStageApprove(item.id).then((res)=>{
                    data = res.data.result
                    console.log(data)
                    this.projectForm = {
                        nodeName1: '',
                        nodeName2: '',
                        nodeName3: '',
                    }
                    var arr = [this.projectForm.nodeName1,this.projectForm.nodeName2,this.projectForm.nodeName3]
                    data.data.forEach(function (dataitem,index) {
                        arr[index] = dataitem.roleName
                    })
                    console.log(arr)
                    this.projectForm = {
                        nodeName1: arr[0],
                        nodeName2: arr[1],
                        nodeName3: arr[2],
                    }
//                    if(data.data[0])
//                        this.projectForm.nodeName1 = data.data[0].roleName
//                    if(data.data[1])
//                        this.projectForm.nodeName2 = data.data[1].roleName
//                    if(data.data[2])
//                        this.projectForm.nodeName3 = data.data[2].roleName


                    this.showRole = []
                    if(item.stageType == '3')
                        this.showshenpi = false
                    else if (item.stageType == '2'){
                        this.showshenpi = true
                        //角色列表
                        this.showRole = this.fundRole
                        console.log('基金角色列表')
                    } else if (item.stageType == '1'){
                        this.showshenpi = true
                        //角色列表
                        this.showRole = this.businessRole
                        console.log('项目角色列表')
                    }
                    this.shenpidata = data
                    this.fundForm = data
                })
            },
            checkEdit(index, row) { //编辑

                row.editFlag = !row.editFlag;
                if (!row.editFlag) {

                    if (this.value3 == '是')
                        row.needUpload = 1
                    else
                        row.needUpload = 2

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
                //            console.log(this.deleteList)
            },
            //右边删除当前行
            handleDelete(index, rows) {
                //            console.log(rows)
                DeleteRightList(rows[index]).then((res) => {
                    //                console.log(res.data)
                    if (res.data.status == '9024') {
                        alert(res.data.message)
                    } else {
                        GetrightList(this.nowId).then((res) => {
                            this.fileData = RightListData(res.data.result)
                            //                        console.log(this.fileData)
                        })
                    }
                })
            }
        },
        created() {
            getConfigLeftList().then((res) => {
                this.leftList = reloadData(res.data.result)
                this.nowId = this.leftList[0].data[0].id
                GetrightList(this.leftList[0].data[0].id).then((res) => {
                    this.fileData = RightListData(res.data.result)
                    //                console.log(this.fileData)
                })
                            console.log(this.leftList)
            }),

            queryList(1).then((res)=>{
                this.fundRole = res.data.result
            }),

            queryList(0).then((res)=>{
                this.businessRole = res.data.result
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
            margin-top: 40px;
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
