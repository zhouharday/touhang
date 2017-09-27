<template>
<div class="subscriber">
    <el-row :gutter="20">
        <!-- 树形控件 -->
        <el-col :span="4">
            <el-tree :data="structure" :props="defaultProps" accordion :default-expand-all="true" class="tree" @node-click="handleNodeClick">
            </el-tree>
        </el-col>
        <!-- table页面 -->
        <el-col :span="20">
            <div class="title">
                <div class="filter">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item>
                            <el-input placeholder="请输入搜索内容" icon="search" v-model="input2" :on-icon-click="handleIconClick">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <!-- 样式待定 -->
                            <!-- <el-dropdown split-button type="primary" @click="handleClick">
                                更多菜单
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>黄金糕</el-dropdown-item>
                                    <el-dropdown-item>狮子头</el-dropdown-item>
                                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                    <el-dropdown-item>双皮奶</el-dropdown-item>
                                    <el-dropdown-item>蚵仔煎</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown> -->
                            <el-select v-model="value2" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="btn">
                    <el-button type="danger" size="small" @click="showSubscriber">添加</el-button>
                </div>
            </div>
            <el-table :data="subscriberData" border style="width: 100%">
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="number" label="账号" width="180">
                </el-table-column>
                <el-table-column prop="dept" label="部门" width="180">
                </el-table-column>
                <el-table-column prop="role" label="所属角色" width="180">
                </el-table-column>
                <el-table-column prop="umdisables" label="状态" width="180">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button
                          @click.native.prevent="editRow(scope.$index, scope.row)"
                          type="text"
                          size="small">
                          编辑
                        </el-button>
                        <el-button
                          @click.native.prevent="deleteRow(scope.$index, scope.row)"
                          type="text"
                          size="small">

                            <div v-if="scope.row.umdisables == 1">锁定</div>
                            <div v-if="scope.row.umdisables == 0">启用</div>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <!-- 添加人员 -->
    <el-dialog title="添加人员" :visible.sync="modelSubscriber" :close-on-click-modal="false">
        <el-form :model="addSubscriber" label-position="left">
            <el-row :gutter="10">
                <el-col :span="24" class="formTitle">基本信息</el-col>
                <el-col :span="12">
                    <el-form-item label="账号" :label-width="formLabelWidth">
                        <el-input placeholder="请输入账号" v-model="addSubscriber.account"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="姓名" :label-width="formLabelWidth" width="100">
                        <el-input placeholder="请输入账号" v-model="addSubscriber.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="部门" :label-width="formLabelWidth">
                        <el-select placeholder="请选择部门" v-model="addSubscriber.department" style="width:100%;">
                            <div v-for="item in allDepartmentList">
                                <el-option :value="item.deptName">{{item.deptName}}</el-option>
                            </div>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="角色" :label-width="formLabelWidth">
                        <el-select placeholder="请选择角色" v-model="addSubscriber.role" style="width:100%;"></el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24" class="formTitle">个人信息</el-col>
                <el-col :span="12">
                    <el-form-item label="性别" :label-width="formLabelWidth">
                        <el-select placeholder="请选择性别" v-model="addSubscriber.sex" style="width: 100%">
                            <el-option value="女">女</el-option>
                            <el-option value="男">男</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="生日" :label-width="formLabelWidth">
                        <el-input placeholder="请输入生日" v-model="addSubscriber.birthday"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机" :label-width="formLabelWidth">
                        <el-input placeholder="请输入手机号" v-model="addSubscriber.cellphone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                        <el-input placeholder="请输入邮箱" v-model="addSubscriber.email"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">

            <el-button type="default" @click="modalIncome">取 消</el-button>
            <el-button type="danger" @click="confirmIncome">确 定</el-button>
<!--=======-->
            <!--<el-button @click="modalIncome">取 消</el-button>-->
            <!--<el-button type="primary" @click="confirmIncome">确 定</el-button>-->
<!--&gt;>>>>>> 4d920d3e87855b106133033b62489796c5c3f592-->
        </div>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">

    import {getNodes} from 'common/js/config'
    import {getDepartmentList} from 'api/system'
    import {getUserlist} from 'api/system'
    import {openOrClose} from 'api/system'
export default {
    data() {
        return {
            structure: [],
            options: [
                {
                    lable:'',
                    value:'所有'
                },{
                    lable:'0',
                    value:'锁定'
                },{
                    lable:'1',
                    value:'启用'
                }
            ],
            value2: '',
            subscriberData: [],
            addSubscriber: {
                account: '',
                name: '',
                department: '',
                role: '',
                sex: '',
                birthday: '',
                cellphone: '',
                email: ''
            },
            modelSubscriber: false,
            formLabelWidth: '120px',
            addId:'',
            allDepartmentList:[],
            input2:''
        }
    },
    methods: {
        deleteRow(index,row){
            console.log(row)
            var disables = row.disables ? 0 : 1;
            console.log(row.id,disables)
            openOrClose(row.id,disables).then((res)=> {
                getUserlist(this.addId).then((res)=>{

                    this.subscriberData = res.data.result
                    console.log(this.subscriberData)
                })
            })
        },
        showSubscriber() {
            this.modelSubscriber = true
        },
        editRow(index, row) {
            this.modelSubscriber = true
            this.addSubscriber = row
        },

        handleNodeClick(data) {
            this.addId = data.id;
            getUserlist(data.id).then((res)=>{

                this.subscriberData = res.data.result
                console.log(this.subscriberData)
            })
        },
        confirmIncome(){
            this.modelSubscriber = false
        },
        modalIncome(){
            this.modelSubscriber = false
        },
        handleIconClick(){
//        alert(this.value2)
            var LockStatus //锁定状态
//            this.options.forEach(function (item , index) {
//                if (item.value == this.value2)
//                {
//                    LockStatus = item.label
//                }
//            })


            getUserlist('',LockStatus,this.input2).then((res)=>{
                this.subscriberData = res.data.result
            })
        }

    },
    created() {

        getDepartmentList().then((res)=>{
            var dataList = res.data.result
            this.allDepartmentList = dataList
            var treeList = getNodes(dataList)
            this.structure = treeList
        })

    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/mixin.less";
.subscriber {
    .base-style();
    .tree {
        &:hover {
            box-shadow: 0 2px 7px rgba(0,0,0,.15);
            border-color: transparent;
        }
    }
    .title {
        width: 100%;
        height: 42px;
        line-height: 42px;
        margin-bottom: 12px;
        display: flex;
        .filter {
            flex: 0 0 50%;
            padding-top: 3px;
        }
        .btn {
            flex: 0 0 50%;
            text-align: right;
        }
    }
    .formTitle{
        width: 100%;
        height: 42px;
        line-height: 42px;
        background: #eef1f6;
        margin-bottom: 12px;
    }
}
</style>
