<template>
    <section class="createForm" style="height: 100%">
        <el-row :gutter="20" style="margin:0;background-color: #F2F4F8;">
            <div class="button" style="margin-bottom: 20px; padding-top: 20px;">
                <el-button type="danger" size="small">保存</el-button>
                <el-button type="danger" size="small">预览</el-button>
                <el-button type="danger" size="small">取消</el-button>
            </div>
        </el-row>
        <el-row :gutter="20"
                style="margin:0;background-color:#F2F4F8;height:100%;box-sizing: border-box;overflow: hidden">
            <el-col :span="5" style="background-color: #fff;height: 100%;margin-left: -10px">
                <div class="form-components">
                    <span>表单组件</span>
                    <ul>
                        <li draggable='true' @dragstart='drag($event)' v-for="list in btnLists">
                            <el-button type="button">{{list.data}}</el-button>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="14" style="background-color: #fff;height: 100%;margin: 0 10px;">
                <div class="form-components" @drop='drop($event)' @dragover='allowDrop($event)' style="height:100%">
                    <span>中间内容</span>
                </div>
            </el-col>
            <el-col :span="5" style="background-color: #fff;height: 100%;margin-right: -10px;">
                <div class="form-components">
                    <span style="text-align: center;margin-top: 30px;">组件设置</span>
                    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign"
                             styele="margin-top:30px;">
                        <el-form-item label="标题">
                            <el-input v-model="formLabelAlign.name"></el-input>
                        </el-form-item>
                        <el-form-item label="必填项目">
                            <el-checkbox v-model="formLabelAlign.must" label="这个是必填项" name="must">
                            </el-checkbox>
                        </el-form-item>
                    </el-form>
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
        font-size: 14px;
        .button {
            background-color: #fff;
            margin-bottom: 20px;
            padding: 5px;
            /*padding-bottom: 5px;*/
            text-align: right;
        }
        .form-components {
            text-align: center;
            padding-top: 10px;
        }
        ul {
            margin-top: 30px;
            text-align: center;
        }
        ul > li {
            margin-bottom: 10px;
        }
    }
</style>

<script>
//    import core from '../../common/js/leipi.form.build.core'
//    import plugins from '../../common/js/leipi.form.build.plugins'
    let dom = 0;
    export default {
        data() {
            return {
                labelPosition: 'top',
                formLabelAlign: {
                    name: '',
                    must: ''
                },
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
                pluginslists: [
                    {
                        title: '标题',

                    }
                ],
                type: [],
                input: '',
                textarea: ''
            }
        },
        methods: {
            drag: function (event) {
                dom = event.currentTarget
            },
            drop: function (event) {
                event.preventDefault();
                event.target.appendChild(dom)
            },
            allowDrop: function (e) {
                event.preventDefault();
            }
        }
    }
</script>


