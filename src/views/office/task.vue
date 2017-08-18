<template>
    <section>
        <!-- 这是任务页内容 -->
        <div>
            <Tabs size="small">
                <Tab-pane label="指派任务">
                    <Table border :columns="columns1" :data="data1" align="center"></Table>
                </Tab-pane>
                <Tab-pane label="代办任务">代办任务</Tab-pane>
                <Tab-pane label="已办任务">已办任务</Tab-pane>
            </Tabs>
            <button @click="dialogShow">
                <span>添加任務</span>
            </button>
            <div>
    
            </div>
        </div>
    
        <div v-show="dialogVisible" class="shadowBox">
            <div>
                <div>
                    <!-- Table -->
                    <table cellspacing="0" border="1">
                        <tr>
                            <td colspan="4">添加任务</td>
    
                        </tr>
                        <tr>
                            <td>任务名称</td>
                            <td colspan="3">
                                <input>
                            </td>
    
                        </tr>
                        <tr>
                            <td>开始时间</td>
                            <td><input></td>
                            <td>完成时间</td>
                            <td><input></td>
                        </tr>
                        <tr>
                            <td>任务说明</td>
                            <td colspan="3"><input></td>
                        </tr>
                        <tr>
                            <td>接收人</td>
                            <td><input></td>
                            <td>指派人</td>
                            <td><input></td>
                        </tr>
                    </table>
                    <el-button>保存</el-button>
                    <el-button>取消</el-button>
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="less" scoped>
section {
    >div {
        background: #fff;
        position: relative;
        >button {
            position: absolute;
            top: 0;
            right: 50px;
        }
    }
}

.shadowBox {
    position: fixed;
    left: 0;
    top: 0;
    opacity: 0.7;
    width: 100%;
    height: 100%;
    background: #000;
    >div {
        // position: relative;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        >div {
            // position: absolute;
            top: 50%;
            left: 50%; // right: 0;
            // bottom: 0;
            // margin: auto;
            color: #fff;
            >table {
                box-sizing: border-box;
                height: 315px; // border: 1px solid #fff;
                margin: 0 auto;
                transform: translateY(50%);
                >tr {
                    // height: 50px;
                    >td {
                        border: 1px solid;
                        text-align: center;
                        width: 200px; // height: 30px;
                        >input {
                            width: 100%;
                            height: 100%;
                            background: transparent;
                            border: none;
                            outline: none;
                            color: #fff;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
}
</style>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            columns1: [
                {
                    title: '指派时间',//1
                    key: 'time',
                    align: "center"
                },
                {
                    title: '任务名称',//2
                    key: 'taskName',
                    align: "center"
                },
                {
                    title: '接收人',//3
                    key: 'Receiver',
                    align: "center"
                },
                {
                    title: '指派人',//4
                    key: 'assignPeople',
                    align: "center"
                },
                {
                    title: '完成时间',//5
                    key: 'doneTime',
                    align: "center"
                },
                {
                    title: '任务状态',//6
                    key: 'taskState',
                    align: "center"
                },
                {
                    title: '操作',//7
                    key: 'operating',
                    align: "center"
                }
            ],
            data1: [
                // {
                //     time: '王小明',
                //     taskName: 18,
                //     Receiver: '北京市朝阳区芍药居',
                //     assignPeople: '北京市朝阳区芍药居',
                //     doneTime: '北京市朝阳区芍药居',
                //     taskState: '北京市朝阳区芍药居',
                //     operating: '北京市朝阳区芍药居'
                // },
                // {
                //     time: '王小明',
                //     taskName: 18,
                //     Receiver: '北京市朝阳区芍药居',
                //     assignPeople: '北京市朝阳区芍药居',
                //     doneTime: '北京市朝阳区芍药居',
                //     taskState: '北京市朝阳区芍药居',
                //     operating: '北京市朝阳区芍药居'
                // },
                // {
                //     time: '王小明',
                //     taskName: 18,
                //     Receiver: '北京市朝阳区芍药居',
                //     assignPeople: '北京市朝阳区芍药居',
                //     doneTime: '北京市朝阳区芍药居',
                //     taskState: '北京市朝阳区芍药居',
                //     operating: '北京市朝阳区芍药居'
                // },
                // {
                //     time: '王小明',
                //     taskName: 18,
                //     Receiver: '北京市朝阳区芍药居',
                //     assignPeople: '北京市朝阳区芍药居',
                //     doneTime: '北京市朝阳区芍药居',
                //     taskState: '北京市朝阳区芍药居',
                //     operating: '北京市朝阳区芍药居'
                // },
            ]
        }
    },
    methods: {
        dialogShow() {
            this.dialogVisible = true;
            // console.log(this.dialogVisible);
        }
    }
}

</script>