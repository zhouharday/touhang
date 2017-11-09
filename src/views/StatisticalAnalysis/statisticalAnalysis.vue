<template>
  <section>
    <!-- 这是统计分析图 -->
    <div class="statisticalFrom">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple-dark">
            <div id="statistical_Echarts_1" style="width: 600px;height:400px;"></div>
            <!-- <div>
                              <ul>
                                  <li><span>{{}}</span><span>{{}}</span></li>
                              </ul>
                          </div> -->
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
import echarts from "echarts";
export default {
  created() {
    this.getProjectStatistics();
  },
  computed: {
    user() {
      this.$store.state.login.merchants =
        JSON.parse(sessionStorage.getItem("merchants")) || {};
      this.$store.state.login.userInfor =
        JSON.parse(sessionStorage.getItem("userInfor")) || {};
      return {
        merchants: this.$store.state.login.merchants,
        userInfor: this.$store.state.login.userInfor
      };
    }
  },
  mounted() {
    // this.intEcart();
  },
  data() {
    return {
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      data6: [],
      data7: [],
      option1: {
        title: {
          text: "",
          subtext: "",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left"
          // data: ['天使', '并购重组', 'PE', 'vc']
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: this.data1,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      option2: {
        title: {
          text: "",
          subtext: "",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left"
          // data: ['考察储备', '立项会', '尽职调查', '投决会', '管理', '退出']
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: this.data2,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      option3: {
        title: {
          text: "",
          subtext: "",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left"
          // data: ['全部', '委托管理', '自我管理', '顾问管理']
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: this.data3,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      option4: {
        title: {
          text: "",
          subtext: "",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left"
          // data: ['天使', 'PE', 'VC', '并购重组']
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: this.data4,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      option5: {
        title: {
          text: "",
          subtext: "",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left"
          // data: ['机构', '个人', '政府']
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: this.data5,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      option6: {
        color: ["#3398DB"],
        title: {
          text: "",
          subtext: "",
          x: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.data6,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "",
            type: "bar",
            barWidth: "60%",
            data: this.data7
          }
        ]
      }
    };
  },
  methods: {
    intEcart() {
      //初始化Echarts 方法
      let myChart1 = echarts.init(
        document.getElementById("statistical_Echarts_1")
      );
      myChart1.setOption(this.option1);
      let myChart2 = echarts.init(
        document.getElementById("statistical_Echarts_2")
      );
      myChart2.setOption(this.option2);
      let myChart3 = echarts.init(
        document.getElementById("statistical_Echarts_3")
      );
      myChart3.setOption(this.option3);
      let myChart4 = echarts.init(
        document.getElementById("statistical_Echarts_4")
      );
      myChart4.setOption(this.option4);
      let myChart5 = echarts.init(
        document.getElementById("statistical_Echarts_5")
      );
      myChart5.setOption(this.option5);
      let myChart6 = echarts.init(
        document.getElementById("statistical_Echarts_6")
      );
      myChart6.setOption(this.option6);
    },
    getProjectStatistics() {
      //统计分析图表数据 api
      this.$http
        .post(this.api + "/statistics/getProjectStatistics", {
          merchantId: this.user.merchants[0].id
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              console.log(res.data.result);
              // console.log(res.data.result[5].data);
              this.option1.title.text = res.data.result[0].title;
              this.option2.title.text = res.data.result[1].title;
              this.option3.title.text = res.data.result[2].title;
              this.option4.title.text = res.data.result[3].title;
              this.option5.title.text = res.data.result[4].title;
              this.option6.title.text = res.data.result[5].title;
              this.data1 = [];
              this.data2 = [];
              this.data3 = [];
              this.data4 = [];
              this.data5 = [];
              this.data6 = [];
              this.data7 = [];
              /********** 项目类型统计 start **********************************/
              res.data.result[0].data.forEach((ele, index) => {
                let obj = {};
                obj.name = ele.name;
                obj.value = ele.count;
                this.data1.push(obj);
              });
              this.option1.series.forEach((item, index2) => {
                item.data = this.data1;
              });
              /********** 项目类型统计 end **********************************/
              /********** 项目阶段统计 start **********************************/
              res.data.result[1].data.forEach((ele, index) => {
                let obj = {};
                obj.name = ele.name;
                obj.value = ele.count;
                this.data2.push(obj);
              });
              this.option2.series.forEach((item, index2) => {
                item.data = this.data2;
              });
              /********** 项目阶段统计 end **********************************/
              /********** 基金管理类型统计 start **********************************/
              res.data.result[2].data.forEach((ele, index) => {
                let obj = {};
                obj.name = ele.name;
                obj.value = ele.count;
                this.data3.push(obj);
              });
              this.option3.series.forEach((item, index2) => {
                item.data = this.data3;
              });
              /********** 基金管理类型统计 end **********************************/
              /********** 基金投向类型统计 start **********************************/
              res.data.result[3].data.forEach((ele, index) => {
                let obj = {};
                obj.name = ele.name;
                obj.value = ele.count;
                this.data4.push(obj);
              });
              this.option4.series.forEach((item, index2) => {
                item.data = this.data4;
              });
              /********** 基金投向类型统计 end **********************************/
              /********** 投资者类型统计 start **********************************/
              res.data.result[4].data.forEach((ele, index) => {
                let obj = {};
                obj.name = ele.name;
                obj.value = ele.count;
                this.data5.push(obj);
              });
              this.option5.series.forEach((item, index2) => {
                item.data = this.data5;
              });
              /********** 投资者类型统计 end **********************************/
              /********** 项目行业统计 start **********************************/
              res.data.result[5].data.forEach((ele, index) => {
                let obj = {};
                this.data6.push(ele.name); //行业名称
                this.data7.push(ele.count); //指数
              });
              this.option6.xAxis.forEach((item, index2) => {
                item.data = this.data6;
              });
              this.option6.series.forEach((item, index2) => {
                item.data = this.data7;
              });
              /********** 项目行业统计 end **********************************/

              this.intEcart(); //初始化图表方法
              this.$Message.success(res.data.message);
            } else {
              this.$Message.error(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    }
  }
};
</script>
<style lang="less" scoped>
section {
  > div {
    background: #ffffff;
    padding: 24px;
    .fundedForm {
    }
  }
}
</style>
