<template>
    <div class="logTable">
        <!-- <div class="searchBox ">
            <p>
                <span>起始日期</span>
                <el-date-picker v-model="startDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
                </el-date-picker>
            </p>
            <p>
                <span>结束日期</span>
                <el-date-picker v-model="endingDate" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
                </el-date-picker>
            </p>
            <p>
                <el-button  size="large" class="el-icon-search" @clcik="searchHandler($event)">搜索</el-button>
            </p>
            <p>
                <el-button size="large" class="el-icon-refresh" @clcik="refreshHandler($event)">刷新</el-button>
            </p>
        </div> -->
        <el-table :data="tableData" border style="width:100%">
            <el-table-column prop="num" label="序号" align="center" width="120">
            </el-table-column>
            <el-table-column prop="date" label="操作时间" align="center"  width="300">
            </el-table-column>
            <el-table-column prop="person" label="操作人" align="center"  width="300">
            </el-table-column>
            <el-table-column prop="detail" label="日志详情" align="center">
            </el-table-column>
        </el-table>
        <div class="pageStyle">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>



<script>
export default {
    watch: {
        'tabs': function(to, from) {
            if (to.tabList[7]) {
                this.init();
            }
        }
    },
    props: {
        tableData: {
            type: Array
        },
<<<<<<< HEAD
        isInTeam: {
            type: Boolean,
            default: false
        },
        pickerOptions0: {
            disabledDate(time) {
                return time.getTime() > Date.now();
            }
=======
        currentPage: {
            type: String,
            default: 1
>>>>>>> daec7211ac3d64bc322b5a1a44c9bf516fa8e688
        },
        pageSize: {
            type: String,
            default: 10
        },
        totalPage: {
            type: String,
            default: 40
        }
        // ,
        // endingDate: {
        //     type: String
        // },
        // startDate: {
        //     type: String
        // },
        // pickerOptions0: {
        //     disabledDate(time) {
        //         return time.getTime() > Date.now();
        //     }
        // },
        // pickerOptions1: {
        //     disabledDate(time) {
        //         return time.getTime() > Date.now();
        //     }
        // }
    },
    methods: {
        handleSizeChange() {
            this.$emit('sizeChange')
        },
<<<<<<< HEAD
        refreshHandler(event) {
           this.$emit('refresh')
        },
        init(){
            
=======
        handleCurrentChange() {
            this.$emit('currentChange')
>>>>>>> daec7211ac3d64bc322b5a1a44c9bf516fa8e688
        }
        // ,
        //  searchHandler(event) {
        //    this.$emit('search')
        // },
        // refreshHandler(event) {
        //    this.$emit('refresh')
        // }
    }
}
</script>



<style lang="less" scoped>
.logTable {
    margin: 0 auto;
    // width: 1200px;
    width: 100%;
    // border: 1px solid #ddd;
    border-radius: 4px;
    padding-bottom: 20px;
    .searchBox {
        height: 80px;
        line-height: 80px;
        >p {
            float: left;
            margin-left: 20px;
            button {
                color: #495060;
            }
        }
    }
}
</style>
