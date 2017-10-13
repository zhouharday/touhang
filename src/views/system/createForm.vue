<template>
    <section class="createForm" style="height: 100%">
        <div class="customForm">
            <div class="leftForm">
                <div class="box clearfix">
                    <div class="block">
                        <div class="name">表单</div>
                        <div class="circle blue"></div>
                    </div>
                    <form class="blue" id="dropArea">
                        <div class="circle"></div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
                        </div>
                    </form>
                </div>
                <div class="operate">
                    <div class="block">
                        <div class="name">操作</div>
                        <div class="circle lightblue"></div>
                    </div>
                    <div class="button lightblue">
                        <div class="center">
                            <button type="button" class="btn btn-primary">预览</button>
                            <button type="button" class="btn btn-success">提交</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rightForm">
                <form id="dragArea">
                    <div class="form-group">
                        <label>单行文本</label>
                        <input type="text" class="form-control" placeholder="单行文本">
                    </div>

                    <div class="form-group">
                        <label>文本域</label>
                        <textarea class="form-control" rows="3" placeholder="文本域"></textarea>
                    </div>

                    <div class="form-group">
                        <label>文件上传</label>
                        <input type="file">
                    </div>

                    <div class="form-group">
                        <label>
                            <input type="checkbox" checked>复选框
                        </label>
                    </div>

                    <div class="form-group">
                        <label>
                            <input type="radio" checked>单选框
                        </label>
                    </div>
                </form>
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
        // drag
        //     ({
        //         dragArea: "dragArea",
        //         dropArea: "dropArea"
        //     })
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

.createForm {
    width: 100%;
    min-height: 100%;
    font-size: 14px;
    .button {
        background-color: #fff;
        margsin-bottom: 20px;
        padding: 5px;
        /*padding-bottom: 5px;*/
        text-align: right;
    }
    .form-components {
        text-align: center;
        padding-top: 10px;
    }
    ul {
        margsin-top: 30px;
        text-align: center;
    }
    ul>li {
        margsin-bottom: 10px;
    }
}
</style>
