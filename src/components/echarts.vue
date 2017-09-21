<template>
  <div class="echarts">
    <IEcharts :option="bar" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
    <div class="btnGroup">
        <el-button type="danger">图表</el-button>
        <el-button type="danger">列表</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import IEcharts from 'vue-echarts-v3/src/full.vue';
  export default {
    name: 'view',
    components: {
      IEcharts
    },
    props: {
    },
    data: () => ({
      loading: false,
      bar: {
        title: {
          text: '估值走势分析'
        },
        tooltip: {},
        xAxis: {
          data: ['Shirt', 'Sweater', 'Chiffon Shirt', 'Pants', 'High Heels', 'Socks']
        },
        yAxis: {},
        series: [{
          name: 'Sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }),
    methods: {
    //   doRandom() {
    //     const that = this;
    //     let data = [];
    //     for (let i = 0, min = 5, max = 99; i < 6; i++) {
    //       data.push(Math.floor(Math.random() * (max + 1 - min) + min));
    //     }
    //     that.loading = !that.loading;
    //     that.bar.series[0].data = data;
    //   },
    //   onReady(instance) {
    //     console.log(instance);
    //   },
    //   onClick(event, instance, echarts) {
    //     console.log(arguments);
    //   }
    }
  };
</script>

<style lang="less" scoped>
  .echarts {
    width: 100%;
    height: 260px;
    margin: 0 auto;
    position: relative;
    .btnGroup{
        position: absolute;
        top: 0;
        right: 0;
        .el-button{
           border-radius: 24px;
           padding: 5px 15px
        }
    }
  }
</style>
