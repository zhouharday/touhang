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
                    <li class="menu" v-for="(menu, index) of projectMenu" @click="listClick(menu)">{{menu.projectName}}</li>
                </ul>
            </div>
        </el-col>
        <el-col :span="20" class="addPadding">
            <div>

                <div class="fileTable" v-show="isShow">
                     <!--<tableHeader :data="headerInfo_file"></tableHeader>-->

                    <myFilter :chooseInfo="chooseInfo" @postID="changelist"></myFilter>

                    <div class="title_f" style="background:#2a3142;color:#fff">
                        <div class="desc">
                            <span>项目阶段</span>
                        </div>
                        <div class="desc">
                            <span>文档名称</span>
                        </div>
                        <div class="desc">
                            <span>上传人</span>
                        </div>
                        <div class="desc">
                            <span>上传时间</span>
                        </div>
                        <div class="desc">
                            <span>操作</span>
                        </div>
                    </div>
                    <div v-for="item in dataArr">
                    <el-table :data="item.dataDocumentResult" border style="width: 100%" align="center">
                        <el-table-column :label=item.title prop="allocationDocumentName" align="center">
                        </el-table-column>
                        <el-table-column  prop="documentName" align="center">
                        </el-table-column>
                        <el-table-column  prop="uploadUser" align="center">
                        </el-table-column>
                        <el-table-column  prop="createDate" align="center">
                        </el-table-column>
                        <el-table-column align="center">
                            <template scope="scope">
                                <a :href=scope.row.documentUrl style="font-size:12px;" download="xxxxx文档">下载</a>

                                <el-button  type="text" size="small" class="btn_border" @click="preview(scope.row)">预览</el-button>

                            </template>
                        </el-table-column>
                    </el-table>
                    </div>
                </div>

                <!-- 文件预览功能 -->
                <div class="viewFiles" v-show="isHide">
                    <div class="closeView" @click="closeView">
                        <img src="/static/img/close.png">
                    </div>
                    <div class="fileArea">
                        <iframe :src=fileData width="800" height="600"></iframe>
                        <img :src=fileData >
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
    <show-pdf v-show="isshowpdf" @closepdf="closepdf" :pdfurl="pdfurls" @pdferr="pdferr"></show-pdf>
</div>
</template>

<script type="text/ecmascript-6">
import myFilter from 'components/myFilter'
import tableHeader from 'components/tabelHeader'
import {getLeftList} from 'api/search'
import {getRightList} from 'api/search'
import {getSelectIndex} from 'api/search'
import showPdf from 'components/showPdf'
export default {
    data() {
        return {
            projectMenu:[],
            dataArr:[],
            isShow: true,
            isHide: false,
            file: null,
            loadingStatus: false,
            formLabelWidth: '80px',
            inputSearch:'',
            headerInfo_file: {
                desc:'aaa',
                btnGroup: [{
                    icon: 'plus-round',
                    explain: '基金'
                }]
            },
            chooseInfo:[],
            fileData:[],
            fileType:'',
             pdfurls:'',
            isshowpdf:false,

        }

    },
    components: {
        myFilter,
        tableHeader,
        showPdf
    },
    methods:{
        pdferr(err){
            console.log("pdferr!! ", err);
            this.$Message.error('读取预览文件出错！');
        },
        closepdf(){
            this.isshowpdf = false;
        },
        handleIconClick(){
            getLeftList(this.inputSearch).then((res)=>{
                console.log(res.data)
                this.projectMenu = res.data.result
            })
        },
        inspectionDialog() {
            this.modalAdd2 = true
        },
        projectDialog() {
            this.modalAdd3 = true
        },
        handleUpload(file) {
            this.file = file;
            return false;
        },
        upload() {
            this.loadingStatus = true;
            setTimeout(() => {
                this.file = null;
                this.loadingStatus = false;
                this.$Message.success('上传成功')
            }, 1500);
        },
        preview(row) {
            // this.isShow = false,
            //     this.isHide = true,
            //     this.fileData = row.documentUrl.split('?')[0],
            //     console.log(this.fileData)
            this.pdfurls = row.previewPath;
            this.isshowpdf = true;
        },
        closeView() {
            this.isShow = true,
                this.isHide = false
        },
        handleDelete(index, rows) {
            rows.splice(index, 1);
        },
        listClick(menu){
            console.log(menu)
            //点击查询文档
            getRightList(menu.projectId).then((res)=>{
                console.log(res.data.result)
                this.dataArr = res.data.result
//                this.projectMenu = res.data.result
            })
        },

    },
    created(){

        getLeftList('').then((res)=>{
            console.log(res.data)
            this.projectMenu = res.data.result
        })
        getRightList('').then((res)=>{
            console.log(res.data.result)
            this.dataArr = res.data.result
            this.dataArr.forEach(function (item) {
                item.dataDocumentResult.forEach(function (data) {
                    var type =  data.documentName.substring(data.documentName.length-3)
                    if (type == 'png' || type == 'PNG' || type == 'jpg' || type == 'JPG' || type == 'peg' || type == 'PEG'){
                        data.type = 1
                    }else
                        data.type = 0
                })
            })
//                this.projectMenu = res.data.result
        })
        //暂时不用选项卡
        getSelectIndex('203').then((res)=>{
            console.log(res.data)
            this.chooseInfo.details = res.data.result
        })


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
.fileTable {
    width: 100%;
    height: 100%;
    .title1 {
        margin-top: 30px;
        width: 100%;
        height: 42px;
        display: flex;
        align-items: center;
        background: #eef1f6; // background: rgb(42, 49, 66);
        .desc {
            flex: 1;
            text-align: left;
            span {
                color: #1f2d3d;
                font-weight: 700;
                margin-left: 24px;
            }
        }
    }
    .title {
        margin-top: 30px;
    }
    .el-table {
        a {
            margin: 0 10px;
        }
        .border_right {
            border-right: 1px solid #ddd;
            padding: 0 12px;
        }
        .btn_border {
            border-right: 1px solid #ddd;
            border-left: 1px solid #ddd;
            padding: 0 12px;
        }
    }
}
.title_f {
    margin-top: 20px;
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    .desc {
        width: 20%;
        flex: 1;
        text-align: center;
        span {
            color: #fff;
            font-weight: 700;
            margin-left: 24px;
        }
    }
}

.viewFiles {
    position: relative;
    width: 100%;
    padding: 20px 30px;
    box-sizing: border-box;
    background: #fff;
    .closeView {
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        img {
            width: 35px;
            height: 35px;
            border: 1px solid #fff;
            border-radius: 50%;
            background: #F05E5E;
        }
    }
}
</style>
