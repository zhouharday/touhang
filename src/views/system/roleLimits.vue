<template>
    <div class="roleLimits">
        <div class="btn_wrapper" v-if="this.nowId">
            <el-button type="danger" size="small"  @click="Setting">保存修改</el-button>
        </div>
        <div class="textWrapper">
            <el-row>
                <el-col :span="24" >
                    <my-tree :model="treeData"></my-tree>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

import myTree from "components/treeMenuu"
import {myData} from "common/js/myData"
import {getUpdata} from "api/system"
import {authorization} from "api/system"

export default {
    data() {
        return {
            theModel: myData,
            treeData:"",
        }
    },
    methods: {
        Setting(){
//            console.log(this.treeData)

            var newData =  getUpdata(this.treeData)
            console.log(newData);

            authorization(this.nowId,newData).then((res)=>{
                alert(1)
            })


        }
    },
    components: {

        myTree
    },
    props: {
        treeData: {
            type: Array,
            default: []
        },

        nowId:{
            type : String,
            default:[]
        }
    },
    created() {
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/mixin.less";
.roleLimits{
    .base-style();
    padding: 0;
    .btn_wrapper{
        width: 100%;
        height: 42px;
        text-align: right;
    }
    .textWrapper {
        width: 100%;
        border: 1px solid #dfe6ec;
    }
}
</style>
