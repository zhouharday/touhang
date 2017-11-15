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
              <el-table class="invesTabData" :data="invesTabData" border stripe style="width: 100%">
                <el-table-column prop="stageName" label="项目阶段" align="center" width="">
                </el-table-column>
                <el-table-column prop="projectNumber" label="项目数量" align="center" width="">
                </el-table-column>
                <el-table-column prop="percent" label="转化率%" align="center" width="">
                </el-table-column>
              </el-table>
              <!-- <div class="pagination">
                                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pages.total">
                                  </el-pagination>
                                </div> -->
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
import jquery from 'jquery'
// import ZRender from 'zrender';
export default {
  computed: {
    user() {
      this.$store.state.login.merchants =
        JSON.parse(sessionStorage.getItem("merchants")) || [];
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
    //   this.countProjectMessage();
    // let myChart = echarts.init(document.getElementById("invesTment_Echarts"));
    // this.countProjectMessage();
    // myChart.setOption(this.option);
  },
  data() {
    return {
      data: [],
      // option: {
      //   title: {
      //     text: "项目投资统计表",
      //     // right: '30%',
      //     subtext: ""
      //   },
      //   tooltip: {
      //     trigger: "item",
      //     formatter: "{a} <br/>{b} : {c}%"
      //   },
      //   toolbox: {
      //     feature: {
      //       dataView: { readOnly: false },
      //       restore: {},
      //       saveAsImage: {}
      //     }
      //   },
      //   legend: {
      //     //   data: ["储备项目", "立项项目", "投决项目", "投后项目", "退出项目"],
      //     //   left: "30%",
      //     //   right: "50%"
      //   },
      //   calculable: true,
      //   series: [
      //     {
      //       name: "项目投资统计表",
      //       type: "funnel",
      //       left: "10%",
      //       // right: '50%',
      //       top: 60,
      //       x2: 80,
      //       bottom: 60,
      //       width: "100%",
      //       // height: {totalHeight} - y - y2,
      //       min: 0,
      //       max: 100,
      //       minSize: "0%",
      //       maxSize: "100%",
      //       sort: "descending",
      //       gap: 2,
      //       label: {
      //         normal: {
      //           show: true,
      //           position: "inside"
      //         },
      //         emphasis: {
      //           textStyle: {
      //             fontSize: 15
      //           }
      //         }
      //       },
      //       labelLine: {
      //         normal: {
      //           length: 10,
      //           lineStyle: {
      //             width: 1,
      //             type: "solid"
      //           }
      //         }
      //       },
      //       itemStyle: {
      //         normal: {
      //           borderColor: "#fff",
      //           borderWidth: 1,
      //           fontSize: 15
      //         }
      //       },
      //       data: this.data
      //     }
      //   ]
      // },
      option: {
        title: {
          text: "项目投资统计表",
          // subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "item",
          // formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          // data: ["展现", "点击", "访问", "咨询", "订单"]
        },
        series: [
          {
            name: "预期",
            type: "funnel",
            left: "10%",
            width: "80%",
            label: {
              normal: {
                // formatter: "{b}预期"
              },
              emphasis: {
                position: "inside",
                // formatter: "{b}预期: {c}%"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.7
              }
            },
            data: [
              { value: 60, name: "访问" },
              { value: 40, name: "咨询" },
              { value: 20, name: "订单" },
              { value: 80, name: "点击" },
              { value: 100, name: "展现" }
            ]
          },
          {
            name: "实际",
            type: "funnel",
            left: "10%",
            width: "80%",
            maxSize: "80%",
            label: {
              normal: {
                position: "inside",
                // formatter: "{c}%",
                textStyle: {
                  color: "#fff"
                }
              },
              emphasis: {
                position: "inside",
                // formatter: "{b}实际: {c}%"
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.5,
                borderColor: "#fff",
                borderWidth: 2
              }
            },
            data: [
              { value: 30, name: "访问" },
              { value: 10, name: "咨询" },
              { value: 5, name: "订单" },
              { value: 50, name: "点击" },
              { value: 80, name: "展现" }
            ]
          }
        ]
      },
      invesTabData: []
    };
  },
  methods: {
    intEcart() {
      //初始化Echarts 方法
      let myChart = echarts.init(document.getElementById("invesTment_Echarts"));
      myChart.setOption(this.option);
    },
    countProjectMessage() {
      this.$http
        .post(this.api + "/projectPool/countProjectMessage", {
          merchantId: this.user.merchants[0].id
          //   projectStageId: ""

        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              console.log(res.data);
              this.invesTabData = res.data.result;
              this.data = [];
              res.data.result.forEach((ele, index1) => {
                //this.option.title.text = ele.name;
                let obj = {};
                // data.push(ele);
                obj.name = ele.stageName;
                obj.value = ele.projectNumber;
                // obj.value = ele.percent;
                this.data.push(obj);
              });
              this.option.series.forEach((item, index2) => {
                item.data = this.data;
              });
              console.log(this.data);
              console.log(this.option.series);
              this.intEcart();
              //   console.log("/////////////////////////////");
              //   console.log(res.data.result);
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
