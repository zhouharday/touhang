<template>
    <div class="logTable">
        <div class="searchBox ">
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
                <el-button type="primary" size="large" class="el-icon-search" @clcik="searchHandler($event)">搜索</el-button>
            </p>
            <p>
                <el-button type="primary" size="large" class="el-icon-refresh" @clcik="refreshHandler($event)">刷新</el-button>
            </p>
        </div>
        <el-table :data="tableData" border style="width:100%">
            <el-table-column prop="num" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="date" label="操作时间" align="center">
            </el-table-column>
            <el-table-column prop="person" label="操作人" align="center">
            </el-table-column>
            <el-table-column prop="detail" label="日志详情" align="center">
            </el-table-column>
        </el-table>
        <div class="pageStyle">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>



<script>
export default {
    props: {
        endingDate: {
            type: Date
        },
        startDate: {
            type: Date
        },
        tableData: {
            type: Array
        },
        pickerOptions0: {
            disabledDate(time) {
                return time.getTime() > Date.now();
            }
        },
        pickerOptions1: {
            disabledDate(time) {
                return time.getTime() > Date.now();
            }
        }
    },
    methods: {
        searchHandler(event) {
           this.$emit('search')
        },
        refreshHandler(event) {
           this.$emit('refresh')
        }
    }
}
</script>



<style lang="less" scoped>
.logTable {
    margin: 0 auto;
    width: 800px;
    border: 1px solid #ddd;
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
