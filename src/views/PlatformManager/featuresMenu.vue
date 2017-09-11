<template>
    <section>
        <!-- 这是功能菜单 -->
        <div>
            <el-row class="common">
                <el-col :span="24">
                    <el-table border :data="featuresTabData" style="width:100%" max-height="700" class="table-item" :row-class-name="tableRowClassName">
                        <el-table-column prop="name" label="名称" align="center">
                            <template scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.name }}</span>
                                <span v-if="scope.row.editFlag" class="cell-edit-input">
                                    <el-input v-model="scope.row.name" placeholder=""></el-input>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="link" label="链接" align="center">
                            <template scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.link }}</span>
                                <span v-if="scope.row.editFlag" class="cell-edit-input">
                                    <el-input v-model="scope.row.link" placeholder=""></el-input>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="creatDate" label="创建日期" align="center">
                            <template scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.creatDate }}</span>
                                <span v-if="scope.row.editFlag" class="cell-edit-input">
                                    <el-input v-model="scope.row.creatDate" placeholder=""></el-input>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="modifyDate" label="修改日期" align="center">
                            <template scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.modifyDate }}</span>
                                <span v-if="scope.row.editFlag" class="cell-edit-input">
                                    <el-input v-model="scope.row.modifyDate" placeholder=""></el-input>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remarks" label="备注" align="center">
                            <template scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.remarks }}</span>
                                <span v-if="scope.row.editFlag" class="cell-edit-input">
                                    <el-input v-model="scope.row.remarks" placeholder=""></el-input>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="100" align="center">
                            <template scope="scope">
                                <el-button class="el-icon-plus" type="text" size="small" @click="addMenu(scope.$index,scope.row)">
                                </el-button>
                                <el-button v-if="!scope.row.editFlag" class="el-icon-edit" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">
                                </el-button>
                                <el-button v-if="scope.row.editFlag" class="el-icon-check" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">
                                </el-button>
                                <el-button class="el-icon-delete2" type="text" size="small" @click.native.prevent="remove(scope.$index, featuresTabData)">
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <!-- 添加 Dialog -->
            <el-dialog title="新建" :visible.sync="dialogFormVisible1">
                <el-form :model="addFormData" ref="addFormData">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="名称" prop="name" :label-width="addFormLabelWidth">
                                    <el-input v-model="addFormData.name" auto-complete="off"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="链接" prop="link" :label-width="addFormLabelWidth">
                                    <el-input v-model="addFormData.link" auto-complete="off"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="创建日期" prop="creatDate" :label-width="addFormLabelWidth">
                                    <el-input v-model="addFormData.creatDate" auto-complete="off"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="修改日期" prop="modifyDate" :label-width="addFormLabelWidth">
                                    <el-input v-model="addFormData.modifyDate" auto-complete="off"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="备注" prop="remarks" :label-width="addFormLabelWidth">
                                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="addFormData.remarks">
                                    </el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="determin">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            featuresTabData: [
                {
                    name: "日常办公",
                    link: "",
                    creatDate: "",
                    modifyDate: "",
                    remarks: "",
                    editFlag: false
                }
            ],
            addFormLabelWidth: "",
            dialogFormVisible1: false,
            addFormData: {
                name: "",
                link: "",
                creatDate: "",
                modifyDate: "",
                remarks: "",
                editFlag: false
            }
        }
    },
    methods: {
        addMenu(index, row) { //添加
            let new_addFormData = {
                name: "",
                link: "",
                creatDate: "",
                modifyDate: "",
                remarks: "",
                editFlag: false
            };
            this.addFormData = new_addFormData;
            this.dialogFormVisible1 = true;
        },
        checkEdit(index, row) { //编辑
            // console.log(row)
            row.editFlag = !row.editFlag;
        },
        remove(index, rows) { //删除
            rows.splice(index, 1);
        },
        determin() { //确定
            this.featuresTabData.push(this.addFormData);
            this.addFormData = {};
            this.dialogFormVisible1 = false;
            // this.$refs.addFormData.resetFields();
            // this.$refs['addFormData'].resetFields();
        },
    },
}
</script>

<style lang="less" scoped>
section {
    >div {
        background: #ffffff;
        padding: 24px;
        overflow: hidden;
    }
}
</style>
