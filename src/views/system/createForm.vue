<template>
    <section class="createForm">
        <el-row class="elRow">
            <el-col :span="24">
                <div class="button">
                    <el-button type="danger" size="small">保存</el-button>
                    <el-button type="danger" size="small">预览</el-button>
                    <el-button type="danger" size="small">取消</el-button>
                </div>
            </el-col>
        </el-row>
        <div class="customForm">
            <div class="rightForm">
                <form id="dragArea">
                    <div class="form-group">
                        <img src="/static/img/component.svg" alt="">
                        <span class="form-control">表单组件</span>
                    </div>
                    <div class="form-group">
                        <label>单行文本 :
                            <input type="text" class="form-control" placeholder="单行文本">
                        </label>
                    </div>

                    <div class="form-group textMany">
                        <label>多行文本 : &nbsp;
                        </label>
                        <textarea class="form-control" rows="3" placeholder="多行文本"></textarea>
                    </div>
                    <div class="form-group">
                        <label>时间 :
                            <input type="text" placeholder="时间">
                        </label>
                    </div>
                    <div class="form-group">
                        <label>日期 :
                            <input type="text" placeholder="日期">
                        </label>
                    </div>
                    <div class="form-group">
                        <label>上传 :
                            <input type="file" placeholder="日期">
                        </label>
                    </div>
                </form>
            </div>
            <div class="leftForm">
                <div class="box clearfix">
                    <form class="blue" id="dropArea">
                        <div class=""></div>
                        <div class="form-group">
                        </div>
                    </form>
                </div>
            </div>
            <div class="form-components">
                <img src="/static/img/settings.svg" alt="">
                <span>组件设置</span>
                <ul>
                    <li prop="标题">
                        标题
                        <el-input></el-input>
                    </li>
                    <li>
                        <span>必填项目</span>
                    </li>
                    <li>
                        <el-checkbox v-model="required">这个是必填项</el-checkbox>
                    </li>
                    <li>
                        <span>显示设置</span>
                    </li>
                    <li>
                        <el-checkbox v-model="defaultVal">默认值</el-checkbox>
                    </li>
                    <li>
                        <el-checkbox v-model="readOnly">只读</el-checkbox>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
//    import '../../../static/js/jquery-1.8.3.min'
//    import '../../../static/js/leipi.form.build.core'
//    import '../../../static/js/leipi.form.build.plugins'
//    import '../../../static/css/customForm_h5'
// let dom = 0;
export default {
    created() {
    },
    mounted() {
        drag
            ({
                dragArea: "dragArea",
                dropArea: "dropArea"
            })
    },
    // components: {jquery,core,plugins},
    data() {
        return {
            labelPosition: 'top',
            formLabelAlign: {
                name: '',
                must: ''
            },
            btnLists: [
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

    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
@import "../../../static/css/customForm_h5.css";
.elRow {
    height: 30px;
    line-height: 30px;
    margin-bottom: 20px;
}

.createForm {
    text-align: center;
    width: 100%;
    min-height: 100%;
    position: relative; // padding: 24px;
    // background: #fff;
    .form-group {
        input,
        textarea {
            background: #eef0f4;
            border: none;
            margin: 10px 0;
        }
    }
    .textMany {
        overflow: hidden;
        >label {
            float: left;
            margin-left: 90px;
        }
        >textarea {
            float: left;
        }
    }
    .button {
        background-color: #fff;
        padding: 15px;
        text-align: right;
        margin-top: 5px;
    }
    .form-components {
        width: 30%;
        text-align: left;
        padding-top: 10px;
        margin-top: 20px;
        background: #fff;
    }
    ul {
        margin-top: 30px;
        text-align: left;
    }
    ul>li {
        margin-bottom: 10px;
        text-align: left;
    }
    .rightForm {
        position: inherit;
        width: 30%;
        background: #fff;
        margin-top: 20px;
        .form-group {
            text-align: left;
            label {
                margin-left: 0;
            }
        }
    }
    .leftForm {
        width: 38%;
        background: #cccccc;
        margin-top: 20px;
        margin-left: 10px;
        margin-right: 10px;
        text-align: left;
        .form-group {
            // margin-left: 0;
            label {
                margin-left: 0;
            }
        }
    }
}
</style>
