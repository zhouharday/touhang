<template>
<div class="team">
    <div class="title">
        <div class="desc">当前成员</div>
        <div class="btn">
            <el-button class="btnwrapper" size="small" @click="modalAdd = true">
                <Icon type="plus-round"></Icon>
                <span>添加</span>
            </el-button>
        </div>
    </div>
    <el-table :data="teamData" border style="width: 100%">
        <el-table-column label="姓名" prop="name">
        </el-table-column>
        <el-table-column label="角色" prop="role">
        </el-table-column>
        <el-table-column label="添加日期" prop="date">
        </el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
                <el-button type="text" size="small">删除</el-button>
              </template>
        </el-table-column>
    </el-table>

    <Modal title="添加成员" v-model="modalAdd" :mask-closable="false" @on-ok="ok" @on-cancel="cancel">
        <!-- <Row>
            <Col :span="24" style="margin-bottom:12px;">
                <Row>
                    <Col span="4">
                        <span>姓名</span>
                    </Col>
                    <Col span="20">
                        <Input v-model="name" placeholder="请输入姓名" @on-change="change"></Input>
                    </Col>
                </Row>
            </Col>
            <Col :span="24" style="margin-bottom:12px;">
                <Row>
                    <Col span="4">
                        <span>角色</span>
                    </Col>
                    <Col span="20">
                        <Input v-model="role" placeholder="请输入角色" @on-change="change"></Input>
                    </Col>
                </Row>
            </Col>
            <Col :span="24" style="margin-bottom:12px;">
                <Row>
                    <Col span="4">
                        <span>添加日期</span>
                    </Col>
                    <Col span="20">
                        <DatePicker type="date" placeholder="选择日期" v-model="date" format="yyyy-MM-dd" @on-change="change" style="width:100%;"></DatePicker>
                    </Col>
                </Row>
            </Col>
        </Row> -->
        <Form ref="teamAdd" :model="teamAdd" :label-width="80">
            <FormItem label="姓名">
                <Input v-model="teamAdd.name" placeholder="请输入姓名"></Input>
            </FormItem>
            <FormItem label="角色">
                <Input v-model="teamAdd.role" placeholder="请输入角色"></Input>
            </FormItem>
            <FormItem label="添加日期">
                <DatePicker type="date" placeholder="选择日期" v-model="teamAdd.date" format="yyyy-MM-dd" style="width:100%;" @on-change="change">
                </DatePicker>
            </FormItem>
        </Form>
    </Modal>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            modalAdd: false,
            teamAdd: {
                name: '',
                role: '',
                date: ''
            },
            teamData: [{
                name: '王小虎',
                role: '安红、我想你',
                date: '2016-05-03'
            }, {
                name: '王小虎',
                role: '安红、我想你',
                date: '2016-05-03'
            }],
            ruleValidate: {
                name: [{
                    required: true,
                    message: '姓名不能为空',
                    trigger: 'blur'
                }],
                role: [{
                    required: true,
                    message: '角色不能为空',
                    trigger: 'blur'
                }],
                date: [{
                    required: true,
                    type: 'date',
                    message: '请选择日期',
                    trigger: 'change'
                }]
            }
        }
    },
    methods: {
        ok() {
            if(this.teamAdd) {
                this.teamData.push(this.teamAdd)
            } else {
                return
            }
        },
        cancel() {
            this.$refs.teamAdd.resetFields()
        },
        change(value) {
            this.teamAdd.date = value
        }
    }
}
</script>

<style lang="less" scoped>
.team {
    width: 100%;
    height: 100%;
    .title {
        width: 100%;
        height: 42px;
        line-height: 42px;
        background: #2a3142;
        color: #fff;
        padding: 0 26px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        .desc {
            flex: 1;
            text-align: left;
        }
        .btn {
            flex: 1;
            text-align: right;
            line-height: 42px;
            .btnwrapper {
                float: right;
                transition: 1s all;
                background: #2a3142;
                border: 1px solid #2a3142;
                font-size: 14px;
                color: #fff;
                outlione: none;
                &:hover {
                    background: #ff4949;
                    border: 1px solid #ff4949;
                    transform: scale(1.1);
                }
            }
        }
    }
}
</style>
