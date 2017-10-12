<template>
    <div class="roleUser">
        <div class="btn_wrapper">
            <el-button type="danger" size="small" @click="openDialog" v-if="this.nowId">添加用户</el-button>
        </div>
        <el-table :data="roleUserList" border style="width: 100%">
            <el-table-column label="名称" prop="name" align="center"></el-table-column>
            <el-table-column label="操作"  align="center">
                <template scope="props">
                    <el-button size="small" @click="removeEdit(props.$index, props.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加用户 对话框-->
        <el-dialog title="选择用户" :visible.sync="userDialog">
            <el-form :model="teamForm" :rules="rules" ref="teamForm" label-width="80px">
                <el-row :gutter="40">
                    <el-col>
                        <i style="border-bottom: 1px solid #f05e5e"></i>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item label="部门：" prop="department">
                            <el-select v-model="teamForm.department" placeholder="请选择部门" style="width:100%" auto-complete="off">
                                <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item prop="name">
                            <el-input v-model="teamForm.name" placeholder="请输入姓名或账号" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" style="text-align:right">
                        <el-button type="danger" style=" width:100px;font-size:16px;border-radius:5px;" @click="chazhao">查找</el-button>
                    </el-col>
                    <el-col>
                        <i style="border-bottom: 1px solid #c4c4c4;"></i>
                    </el-col>
                    <el-col>
                        <el-form-item prop="checkedUser" v-for="item in teamForm.selectUser" :key="item.index">
                            <el-checkbox  v-model="teamForm.checkedUser" :label="item.umId" >{{item.name}}</el-checkbox>
                            <span>{{item.phone}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="dialogBtn_active" @click="addUser(teamForm)">确定</el-button>
                <el-button class="dialogBtn" @click="userDialog = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {deleteUserRole} from 'api/system'
    import {getDepartmentList} from 'api/system'
    import {getNodes} from 'common/js/config'
    import {addEdit} from 'api/system'
    import {queryNotUserByRole} from 'api/system'
    import {roleJoinUser} from 'api/system'

export default {

    props: {
        roleUserList:{
            type : Array,
            default : []
        },
        nowId:{
            type : String,
            default:[]
        }

    },
    data() {
        return {
//            checkList:[],
            options:[],
            userList:{},
            userDialog: false,
            teamForm: {
                department: '',
                name: '',
                checkedUser: [],
                selectUser: [
                    {
                        name: '张韶涵1',
                        phone: '15268792134',
                        branch: '项目部'
                    },
                    {
                        name: '张韶涵2',
                        phone: '15268792134',
                        branch: '项目部'
                    },
                    {
                        name: '张韶涵3',
                        phone: '15268792134',
                        branch: '项目部'
                    }
                ]
            },
            rules: {
                checkedUser: [
                    { type: 'array', required: true, message: '请选择用户', trigger: 'blur' }
                ]
            }

        }
    },
    methods: {



        //删除用户
        removeEdit(index,row){
            deleteUserRole(this.nowId,row.umId).then((res)=>{
                this.$emit("refreshRoleUserList")
            })
        },

        //查找
        chazhao(){
            queryNotUserByRole(this.nowId,this.teamForm.department,this.teamForm.name).then((res)=>{
                console.log(res.data)
                this.teamForm.selectUser = []
                this.teamForm.selectUser  = this.teamForm.selectUser.concat(res.data.result)

            })
        },


        openDialog() {
            //获取部门列表
            this.chazhao()
            getDepartmentList().then((res)=>{

                var dataList = addEdit(res.data.result)
                var treeList = getNodes(dataList)
                console.log(res.data.result)
                this._getDepartmentName(treeList)
            })



            let new_teamForm = {
                department: '',
                name: '',
                checkedUser: [],
                selectUser: []
            };
            this.teamForm = new_teamForm;
            this.userDialog = !this.userDialog;
        },
        addUser(formName) {
            console.log(formName)

            var arr =  formName.checkedUser;
            var b;
            b = arr.join(",");

            roleJoinUser(this.nowId,b).then((res)=>{
                this.$emit("refreshRoleUserList")
                this.userDialog = !this.userDialog;
            })

        },
        //部门列表转格式
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
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
.roleUser {
    width: 100%;
    height: 100%;
    background: @color-base;
    .btn_wrapper {
        width: 100%;
        height: 42px;
        text-align: right;
    } // 选择用户 对话框
    .searchBtn {
        width: 100px;
        font-size: 16px;
        border-radius: 5px;
    }
    i {
        display: inline-block;
        width: 100%;
        margin-bottom: 10px;
        border-bottom: 1px solid #c4c4c4;
    }
    span {
        margin-left: 23%;
        font-size: 14px;
        font-weight: bold;
    }
    .dialog-footer {
        text-align: center;
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
