<template>
    <section>
        <!-- 这是统计分析图 -->
        <div class="statisticalFrom">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple-dark">
                        <div id="statistical_Echarts_1" style="width: 600px;height:400px;"></div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-dark">
                        <div id="statistical_Echarts_2" style="width: 600px;height:400px;"></div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple-dark">
                        <div id="statistical_Echarts_3" style="width: 600px;height:400px;"></div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-dark">
                        <div id="statistical_Echarts_4" style="width: 600px;height:400px;"></div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple-dark">
                        <div id="statistical_Echarts_5" style="width: 600px;height:400px;"></div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-dark">
                        <div id="statistical_Echarts_6" style="width: 600px;height:400px;"></div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </section>
</template>

<script>
import echarts from "echarts"
export default {
    mounted() {
        let myChart1 = echarts.init(document.getElementById('statistical_Echarts_1'));
        myChart1.setOption(this.option1);
        let myChart2 = echarts.init(document.getElementById('statistical_Echarts_2'));
        myChart2.setOption(this.option2);
        let myChart3 = echarts.init(document.getElementById('statistical_Echarts_3'));
        myChart3.setOption(this.option3);
        let myChart4 = echarts.init(document.getElementById('statistical_Echarts_4'));
        myChart4.setOption(this.option4);
        let myChart5 = echarts.init(document.getElementById('statistical_Echarts_5'));
        myChart5.setOption(this.option5);
        let myChart6 = echarts.init(document.getElementById('statistical_Echarts_6'));
        myChart6.setOption(this.option6);
    },
    data() {
        return {
            option1: {
                title: {
                    text: '项目类型统计',
                    subtext: '',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['天使', '并购重组', 'PE', 'vc']
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            { value: 335, name: '天使' },
                            { value: 310, name: '并购重组' },
                            { value: 234, name: 'PE' },
                            { value: 135, name: 'vc' },
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            option2: {
                title: {
                    text: '项目阶段统计',
                    subtext: '',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['考察储备', '立项会', '尽职调查', '投决会', '管理', '退出']
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            { value: 335, name: '考察储备' },
                            { value: 310, name: '立项会' },
                            { value: 234, name: '尽职调查' },
                            { value: 135, name: '投决会' },
                            { value: 135, name: '管理' },
                            { value: 135, name: '退出' },
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            option3: {
                title: {
                    text: '基金管理类型统计',
                    subtext: '',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['考察储备', '立项会', '尽职调查', '投决会', '管理', '退出']
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            { value: 335, name: '考察储备' },
                            { value: 310, name: '立项会' },
                            { value: 234, name: '尽职调查' },
                            { value: 135, name: '投决会' },
                            { value: 135, name: '管理' },
                            { value: 135, name: '退出' },
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            option4: {
                title: {
                    text: '基金投向统计',
                    subtext: '',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['考察储备', '立项会', '尽职调查', '投决会', '管理', '退出']
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            { value: 335, name: '考察储备' },
                            { value: 310, name: '立项会' },
                            { value: 234, name: '尽职调查' },
                            { value: 135, name: '投决会' },
                            { value: 135, name: '管理' },
                            { value: 135, name: '退出' },
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            option5: {
                title: {
                    text: '投资者类型统计',
                    subtext: '',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['考察储备', '立项会', '尽职调查', '投决会', '管理', '退出']
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            { value: 335, name: '考察储备' },
                            { value: 310, name: '立项会' },
                            { value: 234, name: '尽职调查' },
                            { value: 135, name: '投决会' },
                            { value: 135, name: '管理' },
                            { value: 135, name: '退出' },
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            option6: {
                color: ['#3398DB'],
                title: {
                    text: '项目行业统计',
                    subtext: '',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '',
                        type: 'bar',
                        barWidth: '60%',
                        data: [10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            },
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
        .fundedForm {}
    }
}
</style>
