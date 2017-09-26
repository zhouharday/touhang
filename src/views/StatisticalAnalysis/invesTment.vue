<template>
    <section>
        <!-- 这是项目投资统计表 -->
        <div class="invesTment_form">
            <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple-dark">
                        <div id="invesTment_Echarts" class="invesTment_Echarts" style="width: 600px;height:400px;"></div>
                    </div>
                </el-col>
                <el-col :span="9">
                    <div class="grid-content bg-purple-dark">
                        <div>
                            <!--<div class="Quarterly">-->
                                <!--<span> 01 </span>月-->
                                <!--<span> 01 </span>季度-->
                                <!--<span> 2017 </span>年-->
                            <!--</div>-->
                            <el-table class="invesTabData" :data="invesTabData" border style="width: 100%">
                                <el-table-column prop="projectStep" label="项目阶段" align="center" width="">
                                </el-table-column>
                                <el-table-column prop="projectNumber" label="项目数量" align="center" width="">
                                </el-table-column>
                                <el-table-column prop="conversion" label="转化率%" align="center" width="">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </section>
</template>

<script>
// import echarts from 'echarts/lib/echarts';
import echarts from "echarts"
// import ZRender from 'zrender';
export default {
    beforeCreate() { },
    created() { },
    mounted() {
        let myChart = echarts.init(document.getElementById('invesTment_Echarts'));
        // console.log(myChart);
        myChart.setOption(this.option);
    },
    data() {
        return {
            option: {
                title: {
                    text: '项目投资统计表',
                    // right: '30%',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                    feature: {
                        dataView: { readOnly: false },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                legend: {
                    data: ['储备项目', '立项项目', '投决项目', '投后项目', '退出项目'],
                    left: '30%',
                    right: '50%'
                },
                calculable: true,
                series: [
                    {
                        name: '项目投资统计表',
                        type: 'funnel',
                        left: '10%',
                        // right: '50%',
                        top: 60,
                        //x2: 80,
                        bottom: 60,
                        width: '90%',
                        // height: {totalHeight} - y - y2,
                        min: 0,
                        max: 100,
                        minSize: '0%',
                        maxSize: '100%',
                        sort: 'descending',
                        gap: 2,
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            },
                            emphasis: {
                                textStyle: {
                                    fontSize: 15
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                length: 10,
                                lineStyle: {
                                    width: 1,
                                    type: 'solid'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: '#fff',
                                borderWidth: 1,
                                fontSize: 15
                            }
                        },
                        data: [
                            { value: 60, name: '储备项目' },
                            { value: 40, name: '立项项目' },
                            { value: 20, name: '投决项目' },
                            { value: 80, name: '投后项目' },
                            { value: 100, name: '退出项目' }
                        ]
                    }
                ]
            },
            invesTabData: [
                {
                    projectStep: '储备项目数',
                    projectNumber: '',
                    conversion: ''
                },
                {
                    projectStep: '立项项目数',
                    projectNumber: '',
                    conversion: ''
                },
                {
                    projectStep: '投决项目数',
                    projectNumber: '',
                    conversion: ''
                },
                {
                    projectStep: '投后项目数',
                    projectNumber: '',
                    conversion: ''
                },
                {
                    projectStep: '退出项目数',
                    projectNumber: '',
                    conversion: ''
                },
            ]
        }
    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
section {
    >div {
        background: #ffffff;
        padding: 24px;
        overflow: hidden;
        .invesTment_Echarts {
            float: left;
        }
        .Quarterly {
            width: 170px;
            padding: 5px;
            border: 1px solid #cccccc;
            background: #f8f4f4;
        }
        .invesTabData{
            margin-top: 10px;
        }
    }
}
</style>
