<template>
<div class="echarts">
    <div id="main" style=" width:100%; height:350px;"></div>
</div>
</template>

<script>
import echarts from 'echarts' 
export default {
    props: {
        opinion: {
            type: Array,
            default: []
        },
        opinionData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            // 初始化空对象
            chart: null,
            // 初始化图表配置
            echartsData: []
        }
    },
    watch: {
        'opinion':function (to,from){
            console.log("hola datevid"+this.opinion);
            this.drawGraph()
        }
    },
    methods: {
        // 绘图
        drawGraph() {
            // 绘图方法
            // this.chart.dispose()
            this.chart.setOption({
                title: {
                    text: '估值走势分析',
                    x: 'left'
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['pie']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [{
                    type: 'category',
                    axisLabel: {
                        rotate: 30,
                        interval: 0
                    },
                    data: this.opinion,
                    name: "时间" // ** x轴配置:name
                }],
                // Y轴配置
                yAxis: [{
                    type: 'value',
                    boundaryGap: [0, 0.2],
                    // max: 1.2,
                    // min: 0,
                    // splitNumber: 6,
                    name: "估值" // ** y轴配置:name
                }],
                series: [{
                    name: '估值', // **
                    type: 'line',
                    data: this.opinionData
                }]
            })
            this.chart.hideLoading()
        },
        initChart(id) {
            this.chart = echarts.init(document.getElementById(id))
            // 皮肤添加同一般使用方式
            this.chart.showLoading()
        }
    },
    mounted() {
        this.initChart('main')
        this.$nextTick(function() {
            this.drawGraph()
        })
    }
}
</script>

<style scoped>
.echarts {
    width: 100%;
    height: 400px;
    .chart {
        padding-bottom: 0;
    }
}
</style>
