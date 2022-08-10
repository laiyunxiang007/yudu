<template>
  <div style="width:100%;height:99%;padding-left: 1%" ref="chart"></div>
</template>

<script>
export default {
  name: "ReportEcharts",
  data() {
    return {
      HistogramData: [],
      data: ["高兰", "晓龙", "田尾",
        "高排", "石灰坝", "右水", "黄冠", "杉坑","芳园", "莲塘"],
      lineData: [
        18092,
        24045,
        20728,
        48444,
        50415,
        54061,
        28348,
        32808,
        36097,
        44715,
        39867,
      ],
      barData: [
        4600,
        5500,
        5000,
        14000,
        21500,
        23200,
        6500,
        7500,
        8500,
        12500,
        9900,
      ],
      rateData: [
        1809,
        2404,
        2072,
        2834,
        5041,
        5206,
        3280,
        3609,
        3986,
        4844,
        4471,
      ]
    }
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      let myChart = this.$echarts.init(this.$refs.chart);
      // 绘制图表
      myChart.setOption(
          {
            tooltip: {
              trigger: "axis",
              // backgroundColor: "rgba(255,255,255,0.1)",
              axisPointer: {
                label: {
                  show: true,
                  backgroundColor: "#7B7DDC"
                }
              }
            },
            legend: {
              data: ["实时流量",],
              textStyle: {
                color: "#fff"
              },
              top: "15%"
            },
            grid: {
              left: '3%',
              right: '6%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: this.data,
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  interval:0,
                  color:'#fff',
                  fontSize: 16
                },
              },
              axisTick: {
                show: false
              },
              axisLabel:{
                interval:0,
                color:'#fff',
              }
            },
            yAxis: [
              {
                splitLine: {show: false},
                axisLine: {
                  lineStyle: {
                    color: "#fff"
                  }
                },

                axisLabel: {
                  formatter: "{value} "
                }
              },
              {
                splitLine: {show: false},
                axisLine: {
                  lineStyle: {
                    color: "#fff"
                  }
                },
                axisLabel: {
                  formatter: "{value} "
                }
              }
            ],
            series: [
              {
                name: "实时流量",
                type: "bar",
                barWidth: 10,
                itemStyle: {
                  normal: {
                    barBorderRadius: 5,
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {offset: 0, color: "#956FD4"},
                      {offset: 1, color: "#3EACE5"}
                    ])
                  }
                },
                data: this.barData
              },
              // {
              //   type: "bar",
              //   barGap: "-100%",
              //   barWidth: 10,
              //   itemStyle: {
              //     normal: {
              //       barBorderRadius: 5,
              //       color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //         {offset: 0, color: "rgba(156,107,211,0.8)"},
              //         {offset: 0.2, color: "rgba(156,107,211,0.5)"},
              //         {offset: 1, color: "rgba(156,107,211,0.2)"}
              //       ])
              //     }
              //   },
              //   z: -12,
              //   data: this.lineData
              // }
            ]
          });
      // 使用刚指定的配置项和数据显示图表。
      window.addEventListener("resize", () => {
        if(myChart){
          myChart.resize()
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  background-color: transparent;
}

/deep/ .el-menu.el-menu--horizontal {
  border-bottom: solid 0 #e6e6e6;
}

</style>
