<template>
    <section class="processSetting">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="流程模型" name="first">
                <div class="processModel">
                    <div class="searchBox">
                        <el-input placeholder="请输入查找内容" icon="search" v-model="input" :on-icon-click="handleIconClick" style="width:450px">
                        </el-input>
                        <el-button type="text">+新建</el-button>
                    </div>
                    <div v-for="(item,index) in modelLists" :key="item.index">
                        <div class="modelBox">
                            <div class="model_top">
                                <span>{{item.name}}</span>
                                <el-button type="text">-删除</el-button>
                            </div>
                            <div>
                                <p>Key：{{item.key}}</p>
                            </div>
                            <div class="model_bottom">
                                <p>版本：{{item.edition}}</p>
                                <p>创建时间：{{item.date}}</p>
                                <p>修改时间：{{item.reDate}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="pagination ">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="表单模型" name="second">
                <div class="formModel">
                    表单模型
                </div>
            </el-tab-pane>
            <el-tab-pane label="阶段配置" name="third">
                <div class="phaseConfigure">
                    <el-row :gutter="30">
                        <el-col :span="6" style="border-right:1px solid #ddd;padding:0;">
                            <div v-for="item in leftLists" :key="item.index">
                                <div class="menu_title">
                                    <div>{{item.title}}</div>
                                </div>
                                <div class="menu_box">
                                    <div class="menu_list" v-for="(detailsitem,index) in item.data" :key="detailsitem.index" @click="refreshList(item,detailsitem)">
                                        {{detailsitem.stageName}}
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <tabel-header :data="headerInfo_process" @add="editProcess"></tabel-header>
                            <div v-show="isShow" style="padding-left:30px;height:65px;line-height:65px;">
                                <b>模型选择：</b>
                                <el-select v-model="option" placeholder="请选择流程模型" style="width:60%">
                                    <el-option v-for="item in processOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="processItem" :class="{bgh: (index%2 == 0),bgl: (index%2 != 0)}" v-for="(item,index) in processLists" :key="item.index">
                                <p>{{item.processName}}</p>
                                <el-button type="text" v-show="isShow">删除</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-tab-pane>
            <el-tab-pane label="审批配置" name="fourth">
                <div class="approvalConfigure">
                    审批配置
                </div>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            activeName: 'first',
            input: '',
            option: '',
            isShow: false,
            modelLists: [ //流程模型数组
                {
                    name: 'xxxx流程模型',
                    key: '1',
                    edition: 'V1.0',
                    date: '2017/09/28',
                    reDate: '2017/09/29'

                },
                {
                    name: 'xxxx流程模型',
                    key: '2',
                    edition: 'V1.0',
                    date: '2017/09/28',
                    reDate: '2017/09/29'

                }
            ],
            leftLists: [
                {
                    title: '项目阶段',
                    data: [
                        { stageName: '考察储备' },
                        { stageName: '立项会' },
                        { stageName: '尽职调查' },
                        { stageName: '投决会' },
                        { stageName: '管理' },
                        { stageName: '项目退出' },
                    ]
                },
                {
                    title: '基金阶段',
                    data: [
                        { stageName: '基金设立' },
                        { stageName: '运营管理' },
                        { stageName: '基金退出' }
                    ]
                }
            ],
            headerInfo_process: { //阶段表头
                desc: '基本信息',
                btnGroup: [{
                    icon: 'edit',
                    explain: '编辑'
                }],
            },
            processOptions: [ //流程选择下拉框
                {
                    value: '选项一',
                    label: 'XXXXX流程一'
                }, {
                    value: '选项二',
                    label: 'XXXXX流程二'
                }
            ],
            processLists: [ //流程选项列表
                {
                    processName: 'XXXXX流程',
                },
                {
                    processName: 'XXXXX流程',
                },
                {
                    processName: 'XXXXX流程',
                }, {
                    processName: 'XXXXX流程',
                }
            ]
        }
    },
    methods: {
        refreshList(item, detailsitem) {
            this.headerInfo_process.desc = item.title + '-' + detailsitem.stageName;
        },
        editProcess() { //表头编辑方法
            if (this.isShow) {
                this.isShow = !this.isShow;
                this.headerInfo_process.btnGroup[0].icon = 'edit',
                    this.headerInfo_process.btnGroup[0].explain = '编辑'
            } else {
                this.isShow = !this.isShow;
                this.headerInfo_process.btnGroup[0].icon = 'checkmark',
                    this.headerInfo_process.btnGroup[0].explain = '保存'
            }
        }
    },
    components: {
        tabelHeader
    }
}
</script>

<style lang="less" scoped>
.processSetting {
    width: 100%;
    min-height: 100%;
    font-size: 14px;
    padding: 20px;
    background: #fff; // 流程模型
    .processModel {
        .searchBox {
            display: flex;
            justify-content: space-between;
            padding: 20px 25px;
            margin-bottom: 25px;
            background: #eef0f4;
        }
        .modelBox {
            width: 100%;
            font-weight: 700;
            padding: 15px 25px;
            margin-bottom: 30px;
            background: #eef0f4;
            >div {
                margin-bottom: 20px;
            }
            .model_top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #fff;
                >span {
                    font-size: 16px;
                    cursor: pointer;
                }
            }
            .model_bottom {
                display: flex;
                >p {
                    flex: 1;
                }
            }
        } // .page {
        //     width: 100%;
        //     padding: 15px 30px;
        //     text-align: right;
        // }
    } // 阶段配置
    .phaseConfigure {
        width: 100%;
        .menu_title {
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
            background: #2A3142;
            >div {
                padding-left: 10px;
                font-size: 16px;
                background: #dfe6ec;
            }
        }
        .menu_box {
            padding: 10px 10px 10px 25px;
            font-size: 14px;
            .menu_list {
                height: 30px;
                line-height: 30px;
                margin-bottom: 5px;
                &:hover {
                    background: #dfe6ec;
                }
            }
        }
        .processItem {
            height: 50px;
            padding: 0 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .commonBtn {
            color: #f05e5e;
            span {
                border-bottom: 1px solid #f05e5e;
            }
        }
        .bgh {
            background: #fff;
        }

        .bgl {
            background: #EEF0F4;
        }
    }
}
</style>
