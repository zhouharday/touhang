<template>
<div class="projectsDoc">
    <el-row :gutter="24">
        <el-col :span="4">
            <div class="search">
                <el-input placeholder="请输入搜索内容" icon="search" v-model="inputSearch" :on-icon-click="handleIconClick">
                </el-input>
            </div>
            <div class="list">
                <ul class="listsWrapper">
                    <li class="menu" v-for="(menu, index) of projectMenu">{{menu.name}}</li>
                </ul>
            </div>
        </el-col>
        <el-col :span="20" class="addPadding">
            <myFilter :chooseInfo="chooseInfo"></myFilter>
            <!-- 考察报告 -->
            <tableHeader :data="investigateTitle"></tableHeader>
            <el-table :data="reportData" border style="width: 100%" :show-header="false">
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
            <!-- 立项报告 -->
            <tableHeader :data="projectTitle"></tableHeader>
            <el-table :data="reportData" border style="width: 100%" :show-header="false">
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
            <!-- 尽职报告 -->
            <tableHeader :data="diligenceTitle"></tableHeader>
            <el-table :data="reportData" border style="width: 100%" :show-header="false">
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
            <!-- 投决报告 -->
            <tableHeader :data="decisionTitle"></tableHeader>
            <el-table :data="reportData" border style="width: 100%" :show-header="false">
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
            <!-- 管理报告 -->
            <tableHeader :data="manageTitle"></tableHeader>
            <el-table :data="reportData" border style="width: 100%" :show-header="false">
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
        </el-col>
    </el-row>

</div>
</template>

<script type="text/ecmascript-6">
import myFilter from 'components/myFilter'
import tableHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            titleInfo: [{
                prop: 'date',
                label: '日期'
            }, {
                prop: 'name',
                label: '姓名'
            }, {
                prop: 'address',
                label: '地址'
            }, {
                label: "操作"
            }],
            inputSearch: '',
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                handle: '操作'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                handle: '操作'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                handle: `操作`
            }],
            projectMenu: [{
                name: 'AAAAAAAAAA项目'
            }, {
                name: 'AAAAAAAAAA项目'
            }, {
                name: 'AAAAAAAAAA项目'
            }, {
                name: 'AAAAAAAAAA项目'
            }, {
                name: 'AAAAAAAAAA项目'
            }],
            chooseInfo: [{
                details: ['全部', '考察储备', '立项会', '尽职调查', '投决会', '管理', '项目退出']
            }],
            investigateTitle: {
                desc: '考察报告',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '上传'
                }]
            },
            projectTitle: {
                desc: '立项报告',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '上传'
                }]
            },
            diligenceTitle: {
                desc: '尽职报告',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '上传'
                }]
            },
            decisionTitle: {
                desc: '投决报告',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '上传'
                }]
            },
            manageTitle: {
                desc: '管理报告',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '上传'
                }]
            },
            reportData: [{ // 考察报告
                doc: 'AAAAAAAA基金',
                name: '张三',
                date: '2017-09-01'
            }, {
                doc: 'AAAAAAAA基金',
                name: '张三',
                date: '2017-09-01'
            }, {
                doc: 'AAAAAAAA基金',
                name: '张三',
                date: '2017-09-01'
            }]
        }
    },
    components: {
        myFilter,
        tableHeader
    }
}
</script>

<style lang="less" scoped>
@import '../../common/styles/variable.less';
.projectsDoc {
    width: 100%;
    padding: 24px;
    background: @color-base;
    .search {
        width: 100%;
        padding: 12px 0;
    }
    .list {
        width: 100%;
        .listsWrapper {
            border: 1px solid #eef1f6;
        }
        .menu {
            width: 100%;
            padding: 12px 6px;
            text-align: center;
            border-bottom: 1px solid #eef1f6;
        }
    }
    .addPadding {
        padding-left: 12px;
        .boderBoth {
            border-radius: 0;
            padding: 7px 12px;
            border-right: 1px solid #dfe6ec;
            border-left: 1px solid #dfe6ec;
        }
    }
}
</style>
