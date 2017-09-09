<template>
<div class="cooperative">
    <table-header :data="headerInfo" @add="alertModle" :theme="theme" class="addPadding">
        <el-input placeholder="请输入搜索内容" icon="search" v-model="input2" :on-icon-click="handleIconClick" style="width: 320px;">
        </el-input>
    </table-header>
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
    <el-dialog title="合作机构" :visible.sync="cooperativeOrg" :close-on-click-modal="false">
        <el-form :model="cooperativeInfo">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="机构名称" :label-width="formLabelWidth">
                        <el-input v-model="cooperativeInfo.name" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="机构类型" :label-width="formLabelWidth" width="100">
                        <el-input v-model="cooperativeInfo.type" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="联系人" :label-width="formLabelWidth">
                        <el-input placeholder="请输入内容" v-model="cooperativeInfo.person">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="modalIncome = false">取 消</el-button>
            <el-button type="primary" @click="confirmIncome">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            theme: '#fff',
            cooperativeOrg: false,
            formLabelWidth: '120px',
            cooperativeInfo: {
                name: '',
                type: '',
                person: ''
            },
            headerInfo: {
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '添加'
                }]
            }
        }
    },
    methods: {
        alertModle(el) {
            this.cooperativeOrg = true
        }
    },
    components: {
        tableHeader
    }
}
</script>

<style lang="less" scoped>
.cooperative {
    width: 100%;
    height: 100%;
    padding: 24px;
    background: #fff;
    .addPadding{
        padding-bottom: 12px;
    }
}
</style>
