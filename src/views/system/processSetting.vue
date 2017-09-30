<template>
    <section class="processSetting">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="流程模型" name="first">
                <div class="processModel">
                    <div class="searchBox">
                        <el-input placeholder="请输入查找内容" icon="search" v-model="input" :on-icon-click="handleIconClick"
                                  style="width:450px">
                        </el-input>
                        <el-button type="text" class="commonBtn">+新建</el-button>
                    </div>
                    <div v-for="(item,index) in modelLists" :key="item.index">
                        <div class="modelBox">
                            <div class="model_top">
                                <span>{{item.name}}</span>
                                <el-button type="text" class="commonBtn">-删除</el-button>
                            </div>
                            <div>
                                <p>Key：{{item.key}}</p>
                            </div>
                            <div class="model_bottom">
                                <p>版本：{{item.edition}}</p>
                                <p>创建时间：{{item.date}}</p>
                                <p>修改时间：{{item.reDate}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="pagination ">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                       :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                                       layout="total, sizes, prev, pager, next, jumper" :total="400">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="表单模型" name="second">
                <div class="formModel">
                    <!--搜索框-->
                    <div class="searchHeader">
                        <el-row class="search-box">
                            <el-col :span="5">
                                <el-input icon="search" v-model="input" placeholder="表单名称">
                                </el-input>
                            </el-col>
                            <el-col :span="2" class="addProject">
                                <div @click="addProject">
                                    <el-button type="text" size="small" @click="roleDialog=true">新建</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <!--table-->
                    <el-row class="common">
                        <el-col :span="24">
                            <el-table :data="surfaceData" style="width:100%" max-height="700" class="table-item"
                                      :row-class-name="tableRowClassName">
                                <el-table-column prop="num" label="序号" min-width="100" align="center">
                                    <template scope="scope">
                                        <div class="name" @click="handleRouter(scope.$index, scope.row)">
                                            <span class="investorName">{{ scope.row.num }}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="表单模型" align="center">
                                    <template scope="scope">
                                        <span v-if="!scope.row.editFlag">{{ scope.row.modal }}</span>
                                        <span v-if="scope.row.editFlag" class="cell-edit-input">
                                            <el-input v-model="scope.row.modal"></el-input>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="date" label="创建时间" align="center">
                                </el-table-column>
                                <el-table-column label="操作" min-width="100" align="center">
                                    <template scope="scope">
                                        <el-button type="text" size="small" v-if="!scope.row.editFlag"
                                                   @click="checkEdit(scope.$index,scope.row)">编辑
                                        </el-button>
                                        <el-button v-if="scope.row.editFlag" type="text" size="small"
                                                   @click="checkEdit(scope.$index,scope.row)">保存
                                        </el-button>
                                        <el-button type="text" size="small">预览</el-button>
                                        <el-button type="text" size="small"
                                                   @click="handleDelete(scope.$index,surfaceData)">删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                    <!--新建模态框-->
                    <el-dialog title="添加模型" :visible.sync="roleDialog">
                        <el-form :model="roleForm">
                            <el-form-item label="表格名称" prop="role" label-width="80px">
                                <el-input v-model="roleForm.role" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="roleDialog = false" size="small">取 消</el-button>
                            <el-button type="danger" @click="addRole" size="small">确 定</el-button>
                        </div>
                    </el-dialog>

                    <!--<div class="page">-->
                    <!--<el-pagination @size-change="handleSizeChange"-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--:current-page="currentPage"-->
                    <!--:page-sizes="[10, 20, 30, 50]"-->
                    <!--:page-size=pageSize-->
                    <!--layout="total, sizes, prev, pager, next, jumper"-->
                    <!--:total="pageTotal">-->
                    <!--</el-pagination>-->
                    <!--</div>-->
                </div>
            </el-tab-pane>
            <el-tab-pane label="阶段配置" name="third">
                <div class="phaseConfigure">
                    阶段配置
                </div>
            </el-tab-pane>
            <el-tab-pane label="审批配置" name="fourth">
                <div class="approvalConfigure">
                    审批配置
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 删除弹出框 -->
        <delete-reminders :deleteReminders="deleteReminders" :message="message" :modal_loading="modal_loading"
                          @del="deleteReminders=false" @cancel="deleteReminders=false">
        </delete-reminders>
    </section>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                activeName: 'first',
                input: '',
                option: '',
                isShow: false,
                deleteReminders: false,
                modal_loading: false,
                message: '是否确认删除该流程？',
                roleDialog: false,
                //流程模型数组
                modelLists: [
                    {
                        name: 'xxxx流程模型',
                        key: '1',
                        edition: 'V1.0',
                        date: '2017/09/28',
                        reDate: '2017/09/29'

                    },
                    {
                        name: 'xxxx流程模型',
                        key: '2',
                        edition: 'V1.0',
                        date: '2017/09/28',
                        reDate: '2017/09/29'

                    }
                ],
                leftLists: [
                    {
                        title: '项目阶段',
                        data: [
                            {stageName: '考察储备'},
                            {stageName: '立项会'},
                            {stageName: '尽职调查'},
                            {stageName: '投决会'},
                            {stageName: '管理'},
                            {stageName: '项目退出'},
                        ]
                    },
                    {
                        title: '基金阶段',
                        data: [
                            {stageName: '基金设立'},
                            {stageName: '运营管理'},
                            {stageName: '基金退出'}
                        ]
                    }
                ],
                headerInfo_process: { //阶段表头
                    desc: '基本信息',
                    btnGroup: [{
                        icon: 'edit',
                        explain: '编辑'
                    }],
                },
                processOptions: [ //流程选择下拉框
                    {
                        value: '选项一',
                        label: 'XXXXX流程一'
                    }, {
                        value: '选项二',
                        label: 'XXXXX流程二'
                    }
                ],
                processLists: [ //流程选项列表
                    {
                        processName: 'XXXXX流程',
                    },
                    {
                        processName: 'XXXXX流程',
                    },
                    {
                        processName: 'XXXXX流程',
                    }, {
                        processName: 'XXXXX流程',
                    }
                ],
                surfaceData: [
                    {
                        id: '1',
                        modal: 'xx审批表',
                        date: '2017/09/29 13:49:01',
                        editFlag: false
                    }, {
                        id: '2',
                        modal: 'xx导入表',
                        date: '2017/09/29 13:49:02',
                        editFlag: false
                    }
                ],
                roleForm: {
                    role: '',
                    editFlag: false
                },
                roleData: [
                    {
                        role: '基金负责人',
                        editFlag: false
                    },
                    {
                        role: '基金成员',
                        editFlag: false
                    }
                ],
            }
        },
        methods: {


            refreshList(item, detailsitem) {
                this.headerInfo_process.desc = item.title + '-' + detailsitem.stageName;
            },
            editProcess() { //表头编辑方法
                if (this.isShow) {
                    this.isShow = !this.isShow;
                    this.headerInfo_process.btnGroup[0].icon = 'edit',
                        this.headerInfo_process.btnGroup[0].explain = '编辑'
                } else {
                    this.isShow = !this.isShow;
                    this.headerInfo_process.btnGroup[0].icon = 'checkmark',
                        this.headerInfo_process.btnGroup[0].explain = '保存'
                }
            },
            // 新建 的方法
            addRole() {
                this.roleData.push(this.roleForm);
                this.roleForm = {};
                this.roleDialog = false;
            },
            checkEdit(index, row) { //编辑
                // console.log(row)
                row.editFlag = !row.editFlag;
            },
            //删除当前行
            handleDelete(index, rows) {
                rows.splice(index, 1);
            },
            handleRouter(title, ind) {
                this.index = ind;
                this.addTab(title.theme + '详情页', '/home/createForm/', 'createForm/');
                this.$router.push({name: 'createForm'});
            },
            addTab(th, url, name) {
                this.$store.commit({type: 'addTab', title: th, url: url, name: name});
            },
            refreshList(item, detailsitem) {
                this.headerInfo_process.desc = item.title + '-' + detailsitem.stageName;
            },
            editProcess() { //表头编辑方法
                if (this.isShow) {
                    this.isShow = !this.isShow;
                    this.headerInfo_process.btnGroup[0].icon = 'edit'
                    this.headerInfo_process.btnGroup[0].explain = '编辑'
                } else {
                    this.isShow = !this.isShow;
                    this.headerInfo_process.btnGroup[0].icon = 'checkmark'
                    this.headerInfo_process.btnGroup[0].explain = '保存'
                }
            }
        }
    }

</script>

<style lang="less" scoped>
    .processSetting {
        width: 100%;
        min-height: 100%;
        font-size: 14px;
        padding: 20px;
        background: #fff; // 流程模型
        .processModel {
            .searchBox {
                display: flex;
                justify-content: space-between;
                padding: 20px 25px;
                margin-bottom: 25px;
                background: #eef0f4;
            }
            .commonBtn {
                color: #f05e5e;
                span {
                    border-bottom: 1px solid #f05e5e;
                }
            }
            .modelBox {
                width: 100%;
                font-weight: 700;
                padding: 15px 25px;
                margin-bottom: 30px;
                background: #eef0f4;
                > div {
                    margin-bottom: 20px;
                }
                .model_top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #fff;
                    > span {
                        font-size: 16px;
                        cursor: pointer;
                    }
                }
                .model_bottom {
                    display: flex;
                    > p {
                        flex: 1;
                    }
                }
            }
            // .page {
            //     width: 100%;
            //     padding: 15px 30px;
            //     text-align: right;
            // }
        }
    }
</style>
