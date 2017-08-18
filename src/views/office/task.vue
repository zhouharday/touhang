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
                <Tab-pane label="添加任务">添加任务</Tab-pane>
            </Tabs>
            <div>
    
            </div>
        </div>
    </section>
</template>


<style lang="less" scoped>
section {
    >div {
        background: #fff;
    }
}
</style>

<script>
export default {
    data() {
        return {
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
    }
}
</script>