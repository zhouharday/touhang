<template>
<div class="proLibrary">
    <myFilter :chooseInfo="chooseType" @postID="changelist"></myFilter>
    <myFilter :chooseInfo="proLibraryInfo" @postID="changelist"></myFilter>
    <div class="title">
        <tableHeader :theme="theme" :data="titleInfo" class="addPadding">
            <el-input placeholder="请输入搜索内容" icon="search" v-model="input" :on-icon-click="handleIconClick" style="width: 320px;">
            </el-input>
        </tableHeader>
    </div>
    <el-table :data="proLibrary" border style="width: 100%">
        <el-table-column prop="projectName" label="项目名称" align="center">
            <template scope = "scope">
                <a @click="JumpOther(scope.row)">{{scope.row.projectName}}</a>
            </template>
        </el-table-column>
        <el-table-column prop="createUserName" label="项目创建人" align="center">
        </el-table-column>
        <el-table-column prop="industryId" label="所属行业" align="center">
        </el-table-column>
        <el-table-column prop="projectTypeId" label="项目类型" align="center">
        </el-table-column>
        <el-table-column prop="projectStageId" label="项目阶段" align="center">
        </el-table-column>
        <el-table-column prop="payDate" label="投资日期" align="center">
        </el-table-column>
        <el-table-column prop="paySumAmount" label="投资金额（元）" align="center">
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" class="page">
    </el-pagination>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
import myFilter from 'components/myFilter'
import {getProjectList} from 'api/search'
import {getSelectIndex} from 'api/search'
import Button from "../../../node_modules/iview/src/components/button/button.vue";
<<<<<<< HEAD
import {mapMutations} from 'vuex'
=======
import {mapGetters} from 'vuex'
>>>>>>> 8124bd4f94ded35fd1d506bee5293a60c0e96ad1
export default {
    data() {
        return {
            theme: '#fff',
            titleInfo: {

            },
            chooseType: {
                title: '项目类型:',
                details: []
            },
            proLibraryInfo: {
                title: '项目阶段:',
                details: []
            },
            proLibrary: [],
            type:'',
            seartext:'',
            input:''
        }
    },
    components: {
        Button,
        tableHeader,
        myFilter
    },
    methods:{
        JumpOther(row){
            console.log(row)
            this.addTab({
                type: 'addTab',
                title: row.projectName +'详情',
                url: '/home/aftProjectMessage/:' + row.id,
                name: 'aftProjectMessage/' + row.id
            })

            this.$router.push('/home/aftProjectMessage/:' + row.id)
        },

        handleIconClick(){
            this.seartext = this.input
            alert(this.seartext)
            getProjectList('',this.type,this.seartext).then((res)=>{
                console.log(res.data)
                this.proLibrary = res.data.result.list
            })
        },

        changelist(el){
            this.type = el
            getProjectList('',this.type,this.seartext).then((res)=>{
                console.log(res.data)
                this.proLibrary = res.data.result.list
            })
<<<<<<< HEAD
        },
        ...mapMutations([
            'addTab'
        ])


=======
        }
>>>>>>> 8124bd4f94ded35fd1d506bee5293a60c0e96ad1
    },
    created(){

        getProjectList('',this.type,this.seartext).then((res)=>{
            this.proLibrary = res.data.result.list
        })
        getSelectIndex('202').then((res)=>{
            this.chooseType.details = res.data.result
        })
        this.$store.dispatch('getStatus').then(() => {
            this.proLibraryInfo.details = this.getProStatus
        })
    },
    computed: {
        ...mapGetters([
            'getProStatus'
        ])
    }

}
</script>



<style lang="less" scoped>
@import '../../common/styles/variable.less';
.proLibrary {
    width: 100%;
    height: 100%;
    padding: 24px;
    background: @color-base;
    .addPadding {
        padding-bottom: 12px;
    }
    .page {
        padding: 24px 0;
        text-align: right;
    }
}
</style>
