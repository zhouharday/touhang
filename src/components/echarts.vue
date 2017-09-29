<template>
<div class="echarts">
    <div id="main" style=" width:100%; height:350px;"></div>
</div>
</template>

<script type="text/babel">
import echarts from 'echarts' //这里是你必须的，千万不能忘记！
import {
    getFundApprList
} from 'api/fund'
import {
    compare
} from 'common/js/config'
export default {
    data() {
        return {
            // 初始化空对象
            chart: null,
            // 初始化图表配置
            echartsData: [],
            opinion: ["2017-09-06", "2017-08-31", "2017-07-31", "2017-06-30", "2017-05-31", "2017-04-30", "2017-03-31", "2017-02-28", "2017-01-31", "2016-12-31", "2016-11-30", "2016-10-31", "2016-09-30", "2016-08-31", "2016-07-31", "2016-06-30"],
            opinionData: ["4247301.6", "747566.5500", "788066.5500", "788066.5500", "393512.8500", "389458.8000", "389458.8000", "389458.8000", "389458.8000", "354053.7000", "354053.7000", "354053.7000", "354053.7000", "354053.7000", "354053.7000",
                "354053.7000"
            ]
        }
    },
    methods: {
        // 绘图
        drawGraph(id) {
            // 绘图方法
            this.chart = echarts.init(document.getElementById(id))
            // 皮肤添加同一般使用方式
            this.chart.showLoading()
            // 返回到data中 arr.sort(compare('appraisementDate'))
            // var that = this
            getFundApprList('4e92a1b8f24149eeb187cc6096dc00').then((res) => {
                if (res.status == '200') {
                    this.echartsData = res.data.result
                    this.echartsData.map((x) => {
                        this.opinion.push(x.appraisementDate)
                        this.opinionData.push(x.appraisementValue)
                    })
                }
            })
            this.chart.setOption({
                title: {
                    text: '估值走势分析',
                    x: 'left'
                },
                tooltip: {
                    trigger: 'axis'
                },
                // legend: {
                //     x: 'center',
                //     y: 'bottom',
                //     data: this.opinion // this
                // },
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
        }
    },
    mounted() {
        this.$nextTick(function() {
            this.drawGraph('main')
        })
    },
    created() {
        console.log(this.opinion)
        console.log(this.opinionData)
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
