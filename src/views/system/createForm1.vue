<template>
    <section class="createForm">
        <div style="background-color: #F2F4F8">
            <div class="button">
                <el-button type="danger" size="small">保存</el-button>
                <el-button type="danger" size="small">预览</el-button>
                <el-button type="danger" size="small">取消</el-button>
            </div>
            <div class="clear"></div>
            <el-row>
                <el-col :span="5" style="background-color: #fff">
                    <div class="form-components">
                        <span>表单组件</span>
                        <!-- <ul>
                                                <li v-for="list in btnLists" :key="list">
                                                    <el-button>{{list.data}}</el-button>
                                                </li>
                                            </ul> -->
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
                </el-col>
                <el-col :span="14" style="background-color: #fff;height: 100%">
                    <div class="form-components">中间</div>
                    <div class="box clearfix">
                        <div class="block">
                            <div class="name">表单</div>
                            <div class="circle blue"></div>
                        </div>
                        <form class="blue" id="dropArea">

                        </form>
                    </div>
                </el-col>
                <el-col :span="5" style="background-color: #fff">
                    <div class="form-components">
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
        </div>
    </section>
</template>


<style lang="less" scoped>
@import "../../common/styles/variable.less";
.elRow{
    height: 30px;
    line-height: 30px;
    margin-bottom: 20px;

}
.createForm {
    width: 100%;
    min-height: 100%;
    position: relative;
    // padding: 24px;
    // background: #fff;
    .button {

        background-color: #fff;
        padding: 5px;
        text-align: right;
        margin-top: 5px;
    }
    .form-components {
        text-align: center;
        padding-top: 10px;
    }
    ul {
        margin-top: 10px;
        text-align: center;
    }
    ul>li {
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
    mounted() {
        drag
            ({
                dragArea: "dragArea",
                dropArea: "dropArea"
            })
    },
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
            pluginslists: [
                {
                    title: '标题',

                }
            ]
        }
    },
    methods: {}
}
</script>
