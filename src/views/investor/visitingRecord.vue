<template>
<div class="visitingRecord">
    <tableHeader :theme="theme" :data="headerInfo" @add="showVisiting"></tableHeader>
    <el-table :data="visitingRecord" border style="width: 100%">
        <el-table-column prop="name" label="拜访人">
        </el-table-column>
        <el-table-column prop="date" label="拜访时间">
        </el-table-column>
        <el-table-column prop="content" label="拜访内容">
        </el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
                    <el-button
                      @click.native.prevent="editRow(scope.$index, scope.row)"
                      type="text"
                      size="small">
                      编辑
                    </el-button>
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, scope.row)"
                      type="text"
                      size="small">
                      删除
                    </el-button>
                </template>
        </el-table-column>
    </el-table>
    <!-- 添加拜访人 -->
    <Modal v-model="modelVisiting" title="新增拜访人" @on-ok="confirmVisiting" @on-cancel="cancel" width="800">
        <el-form :model="addVisiting" label-position="left" label-width="120px">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="拜访人">
                        <el-select v-model="addVisiting.merchantId" style="width:100%">
                            <el-option v-for="(item, index) of investmentManager" :key="item.id" :label="item.dicName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="拜访时间" style="width: 100%;">
                        <el-date-picker v-model="addVisiting.seeDate" type="date" placeholder="选择日期" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="拜访内容">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="addVisiting.seeContent">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="拜访记录附件">
                        <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </Modal>
</div>
</template>

<script type="text/ecmascript-6">
import tableHeader from "components/tabelHeader"
import {
    getVisitingRecordList,
    addVisitingRecord
} from "api/investor"
export default {
    props: {
        userId: String,
        default: ''
    },
    data() {
        return {
            theme: '#fff',
            headerInfo: {
                btnGroup: [{
                    explain: '添加'
                }]
            },
            visitingRecord: [{
                name: '张三',
                date: '2016-09-08',
                content: '安红, 俺想你'
            }, {
                name: '李四',
                date: '2016-09-08',
                content: '安红, 俺想你'
            }, {
                name: '王五',
                date: '2016-09-08',
                content: '老司机'
            }],
            investmentManager: [{
                dicName: JSON.parse(sessionStorage.getItem('userInfor')).name,
                id: JSON.parse(sessionStorage.getItem('userInfor')).id
            }],
            modelVisiting: false,
            addVisiting: {
                merchantId: '',
                seeDate: '',
                seeContent: ''
            }
        }
    },
    methods: {
        showVisiting() {
            this.modelVisiting = true
        },
        editRow(index, row) {
            // console.log(row)
            this.modelVisiting = true
            this.addVisiting = row
        },
        deleteRow(index, row) {
            // console.log(index)
            this.visitingRecord.splice(index, 1)
        },
        confirmVisiting() {
            addVisitingRecord(this.addVisiting).then((res) => {
                if(res.status == '200') {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        getVisitingRecordList(this.userId).then((res) => {
            if (res.status = '200') {
                console.log(res)
            }
        }).catch(err => {
            let response = err.response
            this.$Message.error(response.data.message || '获取拜访记录失败！')
        })
    },
    components: {
        tableHeader
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
.visitingRecord {
    width: 100%;
    height: 100%;
}
</style>
