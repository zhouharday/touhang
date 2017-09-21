<template>
<div class="dictionary">
    <el-row :gutter="20">
        <el-col :span="6">
            <!--<el-row>-->
                <!--<el-col :span="24" v-for="(menuItem, index) in theModel">-->
                    <!--<my-tree :model="menuItem" :currentIndex="index" @click="handleNodeClick"></my-tree>-->
                <!--</el-col>-->
            <!--</el-row>-->
            <el-collapse v-model="activeName" accordion>
                <div v-for="(item,index) in dic"  >
                    <el-collapse-item :title="item.dicName" :name=index>
                        <div v-for="listDic in item.dataDictionary" class="listStyle" >
                            <div  @click="listClick(listDic)">{{listDic.dicName}}</div>
                        </div>

                    </el-collapse-item>
                </div>
            </el-collapse>
        </el-col>
        <el-col :span="18">
            <div class="tableTitle">{{baseName}}</div>
            <div class="table">
                <el-table :data="muneData" border style="width: 100%">
                    <el-table-column prop="dicName" label="名称"></el-table-column>
                    <el-table-column prop="description" label="备注"></el-table-column>
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
    import {getDictionary} from 'api/system'
    import {getSelectIndex} from 'api/system'
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
            title: '',
            dic:[],
            activeName: '1',
            baseName:'',
            muneData:[]
        }
    },
    computed: {
        ...mapGetters({
            setMune: 'muen'
        })
    },
     methods: {

         listClick(dic){
             console.log(dic);
             this.baseName = dic.dicName
             getSelectIndex(dic.id,'1').then((res)=>{
                 console.log(res.data)
                 this.muneData = res.data.result
//            this.filterInfo = res.data.result.list
             })
         }
     },
    components: {
        myTree
    },
    created() {


        getDictionary('identification').then((res)=>{
            console.log(res.data.result)
//            this.theModel = res.data.result
                this.dic = res.data.result
        })


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
    .listStyle{
        line-height: 36px;
        padding: 5px 18px;
        &:hover{
            background: #dfe6ec;
        }
    }


}

</style>
