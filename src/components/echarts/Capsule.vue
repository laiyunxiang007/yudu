<template>
  <div style="width:100%;height:100%;"  ref="chart" />
</template>

<script>
export default {
  name: "Capsule",
  mounted() {
    this.initCharts();
  },
  methods:{

    initCharts() {
      let myChart = this.$echarts.init(this.$refs.chart);
      let bardata = {
        name:['北京','杭州','上海','广州'],
        data:[23433,54544,64557,75458]
      }
      // 绘制图表
      myChart.setOption(
          {   // 柱状图的颜色
            color: ["#ffdb5c", "#9fe6b8", "#67e0e3", "#32c5e9", "#37a2da"],
            tooltip: {
              show: false,

            },
            grid: {
              left: "20%",
              right: "20%",
              bottom: "15%",
              top: "2%",
            },
            xAxis: {
              type: "value",
              boundaryGap: [0, 0.01],
              show: true,//是否显示label x轴标签数值
            },
            yAxis: {
              axisLine: {
                // 坐标轴 轴线
                show: false, // 是否显示
              },
              axisTick: {
                //是否显示坐标断线
                show: false,
              },
              show:true, //是否显示label y轴标签文字
              axisLabel: {
                color: "#fff", //显示文字
                fontSize: 14, //数据文字大小
                fontWeight: 500,
              },

              type: "category",
              data: bardata.name,
            },
            series: [
              {

                type: "bar",
                data: bardata.data,
                colorBy: "data", //按数据变色
                barWidth: "28%", //图形宽度
                showBackground: true,
                backgroundStyle: {
                  shadowColor: "#fff", //阴影颜色
                  shadowBlur: 3,
                  borderColor: "#ccc", //背景边框颜色
                  color: "#fff", //背景颜色
                  // opacity: 0.1,
                  borderType: "solid",
                  borderWidth: 1,
                  borderRadius: [20, 20, 20, 20],
                },
                barCategoryGap: "40%", // 柱形的间距
                itemStyle: {
                  // 图形的形状
                  borderRadius: [20, 20, 20, 20],
                },
                label: {
                  show: true,
                  position: "outside", //数据显示位置，默认显示在中间
                  color: "#000", //数据文字颜色
                  fontSize: 14, //数据文字大小
                  fontWeight: 500,
                  formatter: function (p) {
                    let value = "";
                    if (p.value > 0) {
                      value = p.value;
                      if (value > 999) {
                        // 数值加千分号
                        let parts = value.toString().split(".");
                        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        value = parts.join(".");
                      }
                    }
                    return value;
                  },

                },
              },
            ]}
      )
      // 使用刚指定的配置项和数据显示图表。
      window.addEventListener("resize", () => {
        if(myChart){
          myChart.resize()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
