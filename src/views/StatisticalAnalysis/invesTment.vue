<template>
    <section>
        <!-- 这是项目投资统计表 -->
        <div class="invesTment_form">
            <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple-dark">
                        <div id="invesTment_Echarts" class="invesTment_Echarts" style="width: 550px;height:400px;"></div>
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
                                <el-table-column prop="stageName" label="项目阶段" align="center" width="">
                                </el-table-column>
                                <el-table-column prop="projectNumber" label="项目数量" align="center" width="">
                                </el-table-column>
                                <el-table-column prop="percent" label="转化率%" align="center" width="">
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
import echarts from "echarts";
// import ZRender from 'zrender';
export default {
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
  created() {
    this.countProjectMessage();
  },
  mounted() {
    let myChart = echarts.init(document.getElementById("invesTment_Echarts"));
    // console.log(myChart);
    myChart.setOption(this.option);
  },
  data() {
    return {
      option: {
        title: {
          text: "项目投资统计表",
          // right: '30%',
          subtext: ""
        },
        tooltip: {
          trigger: "item"
          //   formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          //   data: ["储备项目", "立项项目", "投决项目", "投后项目", "退出项目"],
          //   left: "30%",
          //   right: "50%"
        },
        // calculable: true,
        series: [
          {
            name: "项目投资统计表",
            type: "funnel",
            left: "10%",
            // right: '50%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: "90%",
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: 2,
            label: {
              normal: {
                show: true,
                position: "inside"
              },
              emphasis: {
                textStyle: {
                  fontSize: 15
                }
              }
            },
            // labelLine: {
            //   normal: {
            //     length: 10,
            //     lineStyle: {
            //       width: 1,
            //       type: "solid"
            //     }
            //   }
            // },
            // itemStyle: {
            //   normal: {
            //     borderColor: "#fff",
            //     borderWidth: 1,
            //     fontSize: 15
            //   }
            // },
            data: [
              // {projectNumber: '10', stageName: 'a'},
              // {projectNumber: '20', stageName: 'b'},
              // {projectNumber: '30', stageName: 'c'},
              // {projectNumber: '40', stageName: 'd'},
              // {projectNumber: '50', stageName: 'e'},
              // {projectNumber: '60', stageName: 'f'}
              // {projectNumber: '10', stageName: 'a'},
              // {value: '20', name: 'b'},
              // {value: '30', name: 'c'},
              // {value: '40', name: 'd'},
              // {value: '50', name: 'e'},
              // {value: '60', name: 'f'}
            ]
          }
        ]
      },
      invesTabData: [],
    };
  },
  methods: {
    countProjectMessage() {
      this.$http
        .post(this.api + "/projectPool/countProjectMessage", {
          merchantId: this.user.merchants[0].id
          //   projectStageId: ""
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
            //   console.log(res.data);
              this.invesTabData = res.data.result;
              res.data.result.forEach(ele => {
                ele.projectNumber = 'value';
                ele.stageName = 'name';
              });
              this.option.series.forEach((item, index) => {
                //   console.log(item.data);
                item.data = res.data.result;
              });
              console.log('/////////////////////////////');
              console.log(res.data.result);
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
    .invesTabData {
      margin-top: 10px;
    }
    canvas {
      width: 1000px;
    }
  }
}
</style>
