<template>
    <section class="configuratin">
        <el-row :gutter="30">
            <el-col :span="6" style="height: 450px;border-right: 1px solid #ddd;padding: 0">
                <div class="rightAdd_btn">
                    <el-button type="danger" style="width:80px">添加</el-button>
                </div>
                <b style="padding-left:15px;">项目阶段配置</b>
                <div class="project_config">
                    <div class="project_menu">项目配置</div>
                    <div class="menu_box">
                        <p class="menu_list1">
                            <span>考察储备</span>
                            <Icon type="arrow-up-c" class="mgr"></Icon>
                            <Icon type="arrow-down-c"></Icon>
                            <el-button type="text" class="leftBtn">编辑</el-button>
                            <el-button type="text">删除</el-button>
                        </p>
                    </div>
                </div>
            </el-col>
            <el-col :span="18">
                <el-row>
                    <el-col>
                        <div class="leftAdd_btn">
                            <el-button type="danger" style="width:80px" @click="fileDialog=true">添加</el-button>
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
                <el-button class="dialogBtn_active" @click="fileDialog = false">保存</el-button>
                <el-button class="dialogBtn" @click="fileDialog = false">取消</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
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
            menuList: [
                { menu: '考察储备'},
                 { menu: '立项会'}
            ]
        }
    },
    methods: {
        // 添加角色 的方法
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
    .project_menu {
        height: 40px;
        line-height: 40px;
        padding-left: 0;
        background: #dfe6ec;
    }
    .menu_box {
        padding: 10px 30px 10px 15px;
        .menu_list1 {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            &:hover {
                background: #dfe6ec;
            }
            span {
                margin-right: 55px;;
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
        margin-top: 75px; // position: absolute;
        // bottom: 60px;
        // // left: 0;
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
