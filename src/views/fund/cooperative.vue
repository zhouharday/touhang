<template>
<div class="cooperative">
    <div class="title">
        <div class="desc">
            <el-input placeholder="请选择日期" icon="search" v-model="input2" :on-icon-click="handleIconClick" style="width: 320px;">
            </el-input>
        </div>
        <div class="btn">
            <el-button class="btnwrapper" size="small" @click="modalAdd = true">
                <Icon type="plus-round"></Icon>
                <span>添加</span>
            </el-button>
        </div>
    </div>
    <el-table :data="teamData" border style="width: 100%">
        <el-table-column label="机构名称" prop="investor">
        </el-table-column>
        <el-table-column label="机构类型" prop="protocol">
        </el-table-column>
        <el-table-column label="联系人" prop="sum">
        </el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small">删除</el-button>
                  </template>
        </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination layout="prev, pager, next" :total="100">
        </el-pagination>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style lang="less" scoped>
.cooperative {
    width: 100%;
    height: 100%;
    padding: 24px;
    background: #fff;
    .title {
        width: 100%;
        height: 42px;
        line-height: 42px;
        color: #fff;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        .desc {
            flex: 1;
            text-align: left;
        }
        .btn {
            flex: 1;
            text-align: right;
            line-height: 42px;
            .btnwrapper {
                float: right;
                transition: 1s all;
                background: #fff;
                border: 1px solid #fff;
                font-size: 14px;
                color: #2a3142;
                outlione: none;
                &:hover {
                    background: #ff4949;
                    border: 1px solid #ff4949;
                    transform: scale(1.1);
                }
            }
        }
    }
}
</style>
