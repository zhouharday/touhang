<template>
<div class="department">
    <div class="title">
        <el-button type="danger" @click="addDepartment">
            <Icon type="plus-round"></Icon>
            添加
        </el-button>
    </div>
    <!-- 折叠表单 -->
    <!-- 这部分内容需要询问产品 -->
    <!-- <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="一致性 Consistency" name="1">
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
    </el-collapse> -->
    <div class="table_wrapper">
        <el-table :data="currentData" style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-row>
                        <el-col v-for="(item, index) of props.row.children">
                            <el-row :gutter="20">
                                <el-col :span="12" class="item">
                                    <span class="add_margin">{{item.deptName}}</span>
                                </el-col>
                                <el-col :span="12" class="item">
                                    <!--<span class="add_margin">{{item.desc}}</span>-->
                                    <el-button size="small">
                                        <Icon type="ios-arrow-thin-up"></Icon>
                                        <Icon type="ios-arrow-thin-down"></Icon>
                                    </el-button>
                                    <el-button size="small" @click="editClick(item)">
                                        编辑
                                    </el-button>
                                    <el-button size="small" @click="deleteClick(item)">
                                        删除
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column label="名称" prop="deptName">
            </el-table-column>
            <el-table-column label="操作">
                <!--<template scope="props">-->
                    <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">-->
                        <!--<Icon type="ios-arrow-thin-up"></Icon>-->
                        <!--<Icon type="ios-arrow-thin-down"></Icon>-->
                    <!--</el-button>-->
                    <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">-->
                        <!--编辑-->
                    <!--</el-button>-->
                    <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">-->
                        <!--删除-->
                    <!--</el-button>-->
                <!--</template>-->
            </el-table-column>
        </el-table>
    </div>
    <!-- 添加部门模态框 -->
    <el-dialog title="添加部门" :visible.sync="department" :close-on-click-modal="false">
        <el-form :model="departmentData" label-position="left">
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-form-item label="上级" :label-width="formLabelWidth">
                        <el-select v-model="departmentData.superior" clearable placeholder="请选择" style="width: 100%;">
                            <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="部门名称" :label-width="formLabelWidth">
                        <el-input v-model="departmentData.department" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="modalIncome = false">取 消</el-button>
            <el-button type="primary" @click="confirmIncome">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
    import {getNodes} from 'common/js/config'
    import {getDepartmentList} from 'api/system'
    import {addNewDepartment} from 'api/system'
    import {deletDepartment} from 'api/system'
export default {
    data() {
        return {
            currentData: [{
                name: '投资一部',
                childrenData: [{
                    title: '一部第一小组',
                    desc: '描述信息a'
                }, {
                    title: '一部第二小组',
                    desc: '描述信息b'
                }]
            }, {
                name: '投资二部',
                childrenData: [{
                    title: '二部第一小组',
                    desc: '描述信息as'
                }, {
                    title: '二部第二小组',
                    desc: '描述信息aaaa'
                }]
            }, {
                name: '投资三部',
                childrenData: [{
                    title: '三部第一小组',
                    desc: '描述信息'
                }, {
                    title: '三部第二小组',
                    desc: '描述信息'
                }]
            }],
            department: false,
            formLabelWidth: '120px',
            departmentData: {
                superior: '',
                department: 'aaa'
            },
            options: []
        }
    },
    methods: {
        addDepartment() {
            this.department = true
        },
        confirmIncome() {
            // 方法不完善
            console.log(this.departmentData)
            this.department = false
            addNewDepartment(this.departmentData.department,this.departmentData.superior).then((res)=>{
                console.log(res)
                getDepartmentList().then((res)=>{

                    var dataList = res.data.result
                    var treeList = getNodes(dataList)
                    this.currentData = treeList
                    this._getDepartmentName(this.currentData)

//            this.myFund = res.data.result.list
                })
            })
        },
        editClick(item) {
            console.log(item);
//            console.log(item.log);
        },

        _getDepartmentName(arr) {
            let result = []
            arr.map((x) => {
                result.push({
                    label: x.deptName,
                    value: x.id
                })
            })

            return this.options = result
        },
        deleteClick(item) {
            console.log(item)
//            var id = item.id;
//            deletDepartment(item.id).then((res) => {
//                console.log(okkkkkkkkk)
////            },
//            })
        }
    },
    created() {


        getDepartmentList().then((res)=>{

            var dataList = res.data.result
            var treeList = getNodes(dataList)
            this.currentData = treeList
            this._getDepartmentName(this.currentData)

//            this.myFund = res.data.result.list
        })


    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/mixin.less";
.department {
    .base-style();
    .title {
        width: 100%;
        height: 42px;
        line-height: 42px;
        text-align: right;
    }
    .table_wrapper {
        padding: 12px 0;
        .item {
            padding: 12px 0;
            color: #99a9bf;
            .add_margin {
                padding-left: 48px;
            }
        }
    }

}
</style>
