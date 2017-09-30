<template>
    <section class="createForm">
        <div class="button">
            <el-button type="danger" size="small">保存</el-button>
            <el-button type="danger" size="small">预览</el-button>
            <el-button type="danger" size="small">取消</el-button>
        </div>
        <el-row>
            <el-col :span="5">
                <div class="form-components">
                    <span>表单组件</span>
                    <ul>
                        <li v-for="list in btnLists">
                            <el-button>{{list.data}}</el-button>
                        </li>
                    </ul>
                </div>

            </el-col>
            <el-col :span="14">
                中间
            </el-col>
            <el-col :span="5">
                <div class="Plugins">
                    <span>组件设置</span>
                    <ul>
                        <li prop="标题">
                            标题
                            <el-input></el-input>
                        </li>
                        <li prop="必填项目">
                            <el-checkbox>这个是必填项</el-checkbox>
                        </li>
                    </ul>

                </div>
            </el-col>
        </el-row>
    </section>
</template>


<style lang="less" scoped>
    @import "../../common/styles/variable.less";

    .createForm {
        width: 100%;
        min-height: 100%;
        position: relative;
        padding: 24px;
        background: #fff;
        .button{
            float:right;
            margin-bottom: 10px;
        }
        .form-components span {
            margin-left: 20px;
        }
        ul{
            margin-top: 10px;
        }
        ul>li{
            margin-bottom: 10px;
        }

        .page {
            width: 100%;
            padding: 15px 30px;
            text-align: right;
            position: absolute;
            bottom: 0;
            right: 0;
        }
    }
</style>

<script>
    export default {
        data() {
            return {
                btnLists: [
                    {
                        data: '单行文本框'
                    },
                    {
                        data: '多行文本框'
                    },
                    {
                        data: '时间'
                    },
                    {
                        data: '日期'
                    },
                    {
                        data: '上传'
                    }
                ],
                pluginslists:[
                    {
                        title:'标题',

                    }
                ]
            }
        },
        methods: {}
    }
</script>
