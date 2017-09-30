<template>
    <section class="processSetting">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="流程模型" name="first">
                <div class="processModel">
                    <div class="searchBox">
                        <el-input placeholder="请输入查找内容" icon="search" v-model="input" :on-icon-click="handleIconClick" style="width:450px">
                        </el-input>
                        <el-button type="text" class="commonBtn">+新建</el-button>
                    </div>
                    <div  v-for="(item,index) in modelLists" :key="item.index">
                        <div class="modelBox">
                            <div class="model_top">
                                <span>{{item.name}}</span>
                                <el-button type="text" class="commonBtn">-删除</el-button>
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
                    阶段配置
                </div>
            </el-tab-pane>
            <el-tab-pane label="审批配置" name="fourth">
                <div class="approvalConfigure">
                    审批配置
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 删除弹出框 -->
        <delete-reminders :deleteReminders="deleteReminders" :message="message" :modal_loading="modal_loading" @del="deleteReminders=false" @cancel="deleteReminders=false">
        </delete-reminders>
    </section>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            activeName: 'first',
            input: '',
            modelLists: [
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
        }
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
        .commonBtn {
            color: #f05e5e;
            span {
                border-bottom: 1px solid #f05e5e;
            }
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
        }
        // .page {
        //     width: 100%;
        //     padding: 15px 30px;
        //     text-align: right;
        // }
    }
}
</style>