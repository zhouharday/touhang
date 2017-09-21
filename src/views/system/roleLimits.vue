<template>
    <div class="roleLimits">
        <div class="btn_wrapper">
            <el-button>修改权限</el-button>
        </div>
        <div class="textWrapper">
            <el-row>
                <el-col :span="24" v-for="menuItem in theModel">
                    <my-tree :model="menuItem"></my-tree>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import myTree from "components/treeMenu"
import {myData} from "common/js/myData"
export default {
    data() {
        return {
            theModel: myData
        }
    },
    // props: {
    //     theModel: {
    //         type: Array,
    //         default: []
    //     }
    // },
    components: {
        myTree
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
