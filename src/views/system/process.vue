<template>
<div class="process">
    <div class="searchBox">
        <el-input placeholder="查询条件（标题、流程类别、申请人 、申请时间）" icon="search" v-model="input2" :on-icon-click="handleIconClick" style="width:35%">
        </el-input>
    </div>
    <div class="table">
        <el-table :data="processData" border style="width: 100%">
            <el-table-column prop="title" label="标题" width="240" align="center">
            </el-table-column>
            <el-table-column prop="type" label="流程类别" align="center">
            </el-table-column>
            <el-table-column prop="applicant" label="申请人" align="center">
            </el-table-column>
            <el-table-column prop="startDate" label="申请时间" width="240" align="center">
            </el-table-column>
            <el-table-column prop="endDate" label="完成时间" width="240" align="center">
            </el-table-column>
            <el-table-column prop="state" label="状态" align="center">
            </el-table-column>
            <el-table-column prop="address" label="用时" align="center">
            </el-table-column>
        </el-table>
        <!-- <el-row>
            <el-col :span="24">
                <el-row>
                    <el-col v-for="(item, index) of title">
                            {{item.label}}
                    </el-col>
                </el-row>
            </el-col>
        </el-row> -->
    </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            title: [{
                label: '标题'
            }, {
                label: '流程类别'
            }, {
                label: '申请人'
            }, {
                label: '申请时间'
            }, {
                label: '完成时间'
            }, {
                label: '状态'
            }, {
                label: '用时'
            }],
            processData: [{
                title: 'AAAA项目立项申请',
                type: '立项会',
                applicant: '张三',
                startDate: '2017-9-9 9:30',
                endDate: '2017-9-9 10:30',
                state: '未完成',
                totalTime: '1小时'
            }],
            count: 0
        }
    },
    methods: {
        _setSpan(arr) {
            const span = 24
            // console.log(Math.floor(span/arr.length))
            return this.count = Math.floor(span/arr.length)
        }
    },
    created() {
        this._setSpan(this.title)
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/mixin.less";
.process {
    .base-style();
    .searchBox {
        width: 100%;
        height: 42px;
        padding-bottom: 12px;
    }
}
</style>
