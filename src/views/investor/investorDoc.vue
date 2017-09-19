<template>
<div class="investorDoc">
    <tableHeader :theme="theme" :data="investmentTitle"></tableHeader>
    <!-- 投资文档 -->
    <el-table :data="investmentData" border style="width: 100%" :show-header="false">
        <el-table-column prop="doc" label="基金名称">
        </el-table-column>
        <el-table-column prop="name" label="审核人">
        </el-table-column>
        <el-table-column prop="date" label="创建日期">
        </el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, investorData)"
                  type="text"
                  size="small">
                  下载
                </el-button>
                <el-button class="boderBoth"
                  @click.native.prevent="deleteRow(scope.$index, investorData)"
                  type="text"
                  size="small">
                  预览
                </el-button>
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, investorData)"
                  type="text"
                  size="small">
                  删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <tableHeader :theme="theme" :data="qualificationTitle"></tableHeader>
    <!-- 资质文件 -->
    <el-table :data="qualificationData" border style="width: 100%" :show-header="false">
        <el-table-column prop="doc" label="基金名称">
        </el-table-column>
        <el-table-column prop="name" label="审核人">
        </el-table-column>
        <el-table-column prop="date" label="创建日期">
        </el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, investorData)"
                  type="text"
                  size="small">
                  下载
                </el-button>
                <el-button class="boderBoth"
                  @click.native.prevent="deleteRow(scope.$index, investorData)"
                  type="text"
                  size="small">
                  预览
                </el-button>
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, investorData)"
                  type="text"
                  size="small">
                  删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            theme: '#eef1f6',
            investmentTitle: {
                desc: '投资文档',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '上传'
                }]
            },
            qualificationTitle: {
                desc: '资质文件',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '上传'
                }]
            },
            formLabelWidth: '120px',
            baseInfo: {},
            investmentData: [{
                doc: 'aaaa',
                name: '李四',
                date: '2016-09-08'
            }, {
                doc: 'bbbb',
                name: '李四',
                date: '2016-09-08'
            }, {
                doc: 'cccc',
                name: '李四',
                date: '2016-09-08'
            }],
            qualificationData: [{
                doc: '同一信用代码证',
                name: '李四',
                date: '2016-09-08'
            }, {
                doc: '组织机构代码证',
                name: '李四',
                date: '2016-09-08'
            }, {
                doc: '其他资料',
                name: '李四',
                date: '2016-09-08'
            }]
        }
    },
    methods: {
    },
    components: {
        tableHeader
    }
}
</script>

<style lang="less" scoped>
@import '../../common/styles/variable.less';
@import '../../common/styles/mixin.less';
.investorDoc {
    width: 100%;
    height: 100%;
    .boderBoth {
        border-radius: 0;
        padding: 7px 12px;
        border-right: 1px solid #dfe6ec;
        border-left: 1px solid #dfe6ec;
    }
}
</style>
