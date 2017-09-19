<template>
<div class="dictionary">
    <el-row :gutter="20">
        <el-col :span="6">
            <el-row>
                <el-col :span="24" v-for="(menuItem, index) in theModel">
                    <my-tree :model="menuItem" :currentIndex="index"></my-tree>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="18">
            <div class="tableTitle">{{setMune.menuName}}</div>
            <div class="table">
                <el-table :data="setMune.tableInfo" border style="width: 100%">
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="remarks" label="备注"></el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button size="small"
                                       @click="handleEdit(scope.$index, scope.row)"
                                       v-for="(btn, index) of scope.row.operation">
                                       <span>{{btn}}</span>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script type="text/ecmascript-6">
import {
    mapGetters
} from 'vuex'
import myTree from "components/treeMenu"
import {
    dictionaryList
} from "common/js/dictionary"
export default {
    data() {
        return {
            theModel: dictionaryList,
            title: ''
        }
    },
    computed: {
        ...mapGetters({
            setMune: 'muen'
        })
    },
    // methods: {
    //     _getTitle(arr) {
    //         arr.map((x) => {
    //             console.log(x.children.includes(this.muen))
    //             // if(x.children.includes(this.muen)) {
    //             //     console.log(1)
    //             // }
    //         })
    //     }
    // },
    // created() {
    //     this._getTitle(dictionaryList)
    // },
    components: {
        myTree
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
.dictionary {
    width: 100%;
    min-height: 100%;
    background: @color-base;
    padding: 24px;
    .tableTitle {
        width: 100%;
        height: 42px;
        font-size: 18px;
        font-weight: 600;
        line-height: 30px;
        padding: 6px 18px;
    }
}
</style>
