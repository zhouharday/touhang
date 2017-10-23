<template>
<div class="department">
    <div class="title">
        <el-button type="danger" @click="addDepartment" size="small">
            <Icon type="plus-round"></Icon>
            添加
        </el-button>
    </div>
    <div class="table_wrapper">
        <el-table :data="currentData" style="width: 100%">
            <el-table-column type="expand">

                <template scope="props">
                    <el-row>
                        <el-col v-for="(item, index) of props.row.children">
                            <el-row :gutter="20">
                                <el-col :span="13" class="item" >
                                    <span class="add_margin" v-if="!item.editFlag">{{item.deptName}}</span>
                                    <span class="add_margin" v-if="item.editFlag">
                                        <el-input v-model="item.deptName" ></el-input>
                                        <!--{{item.deptName}}-->
                                    </span>

                                </el-col>
                                <el-col :span="11" class="item">
                                    <!--<span class="add_margin">{{item.desc}}</span>-->

                                    <el-button size="small" @click="moveUp(item)">
                                        <Icon type="ios-arrow-thin-up"></Icon>
                                    </el-button>
                                    <el-button size="small" @click="moveDown(item)">
                                        <Icon type="ios-arrow-thin-down"></Icon>
                                    </el-button>
                                    <el-button size="small" @click="editClick(item)" v-if="!item.editFlag">
                                        编辑
                                    </el-button>
                                    <el-button size="small" @click="editClick(item)" v-if="item.editFlag">
                                        保存
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
                <template scope="scope" >
                    <span class="add_margin" v-if="!scope.row.editFlag">{{scope.row.deptName}}</span>
                    <span class="add_margin" v-if="scope.row.editFlag">
                        <el-input v-model="scope.row.deptName" ></el-input>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" >
                <template scope="scope" >

                    <!--<el-button size="small" @click="moveUp(scope.row)">-->
                        <!--<Icon type="ios-arrow-thin-up"></Icon>-->
                    <!--</el-button>-->
                    <!--<el-button size="small" @click="moveDown(scope.row)">-->
                        <!--<Icon type="ios-arrow-thin-down"></Icon>-->
                    <!--</el-button>-->
                    <el-button size="small" @click="editClick(scope.row)" v-if="!scope.row.editFlag">
                        编辑
                    </el-button>
                    <el-button size="small" @click="editClick(scope.row)" v-if="scope.row.editFlag">
                        保存
                    </el-button>
                    <el-button size="small" @click="deleteClick(scope.row)">
                        删除
                    </el-button>
                </template>
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
            <el-button @click="department = false">取 消</el-button>
            <el-button type="danger" @click="confirmIncome">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 删除确认弹框 -->
    <delete-reminders :deleteReminders="deleteReminders" :message="message" :modal_loading="modal_loading" @del="confirmDel" @cancel="deleteReminders=false">
    </delete-reminders>
</div>
</template>

<script type="text/ecmascript-6">
    import {getNodes} from 'common/js/config'
    import {addEdit} from 'api/system'
    import {getDepartmentList} from 'api/system'
    import {addNewDepartment} from 'api/system'
    import {SetDepartment} from 'api/system'
    import {deletDepartment} from 'api/system'
    import {moveDepartment} from 'api/system'
    import Input from "../../../node_modules/iview/src/components/input/input.vue";
    import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
    import deleteReminders from 'components/deleteReminders'
export default {
    components: {
        ElInput,
        Input,
        deleteReminders
    },
    data() {
        return {
            deleteReminders: false,
            message_title: '确认删除',
            message: '是否确认删除该部门？',
            btnText: '删除',
            companyName:'',
            currentData: [],
            department: false,
            formLabelWidth: '120px',
            departmentData: {
                superior: '',
                department: ''
            },
            options: [],
            deleteId:'',
        }
    },
    methods: {
        moveUp(row){
            console.log(row)
            moveDepartment(row.id,'up').then((res)=>{
                console.log('*****')
                console.log(res)
                getDepartmentList().then((res)=>{
                    var dataList = addEdit(res.data.result)
                    var treeList = getNodes(dataList)
                    this.currentData = treeList
                    this._getDepartmentName(this.currentData)
                })
            })
        },
        moveDown(row){
            moveDepartment(row.id,'down').then((res)=>{
                console.log('*****')
                console.log(res)
                getDepartmentList().then((res)=>{
                    var dataList = addEdit(res.data.result)
                    var treeList = getNodes(dataList)
                    this.currentData = treeList
                    this._getDepartmentName(this.currentData)
                })
            })
        },

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
                    var dataList = addEdit(res.data.result)

                    var treeList = getNodes(dataList)
                    this.currentData = treeList
                    this._getDepartmentName(this.currentData)
                    this.departmentData.department = ''
                    this.departmentData.superior = ''

//            this.myFund = res.data.result.list
                })
            })
        },
        editClick(item) {
            console.log(item);

            if(item.editFlag == true){

                console.log(item.deptName)
             /***********************/
                SetDepartment(item.deptName,item.parentId,item.id).then((res)=> {
                    console.log(res)
                })
            }
            item.editFlag = !item.editFlag
        },

        _getDepartmentName(arr) {
            let result = []
            var a = [{"deptName":JSON.parse(sessionStorage.getItem('merchants'))[0].merchant_name,"id":""}]
            arr = a.concat(arr)
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
            this.deleteReminders = !this.deleteReminders;
            this.deleteId = item.id;
        },
        //确认删除
        confirmDel(){
            deletDepartment(this.deleteId).then((res) => {
                getDepartmentList().then((res)=>{
                    this.deleteReminders = !this.deleteReminders;
                    var dataList = addEdit(res.data.result)
                    var treeList = getNodes(dataList)
                    this.currentData = treeList
                    this._getDepartmentName(this.currentData)
                })
            })
        }
    },
    created() {
        this.companyName = JSON.parse(sessionStorage.getItem('merchants'))[0].merchant_name,
        getDepartmentList().then((res)=>{

            var dataList = addEdit(res.data.result)
            var treeList = getNodes(dataList)
            this.currentData = treeList
            this._getDepartmentName(this.currentData)
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
        flex: 1;
        text-align: right;
    }
    .title1 {
        width: 40%;
        height: 42px;
        line-height: 42px;
        flex: 1;
        text-align: left;
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
