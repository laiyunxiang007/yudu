<template>
  <div style="width: 100%;height: 100%">
    <dv-border-box-10>
      <div>
        <span style=" display:inline-block;color: #fff;font-size: 20px;padding-bottom: 0">{{
            this.rowData.mc === undefined ? '高兰' : this.rowData.mc
          }}</span>
      </div>
      <div style="width:96%;height:110%;" ref="chart"></div>
    </dv-border-box-10>
  </div>
</template>

<script>
export default {
  name: "ReportEcharts",
  props: ['rowData'],
  data() {
    return {
      HistogramData: []
    }
  },
  mounted() {
    this.initData();
  },
  watch: {
    rowData: {
      handler: function () {
        this.HistogramData=[]
        console.log(this.rowData.yali)
        this.HistogramData.push(this.rowData.zd)
        this.HistogramData.push(this.rowData.yl)
        this.HistogramData.push(this.rowData.ph)
        this.HistogramData.push(this.rowData.wd)
        this.HistogramData.push(this.rowData.yali)
        this.initCharts();
      },
      deep: true
    }
  },
  methods: {
    async initData() {
      const res = await this.$http.get("/api/huichang/getHistogram")
      this.HistogramData = res.data.data
      this.initCharts()
    },
    initCharts() {
      let myChart = this.$echarts.init(this.$refs.chart);
      console.log(this.HistogramData)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: '3%',
          right: '2%',
          bottom:'19%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['浊度', '余氯', 'PH',  '温度','压力'],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#fff',
            fontSize: 14
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#fff'
          },
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            itemStyle: {
              color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: '#83bff6'},
                {offset: 0.5, color: '#188df0'},
                {offset: 1, color: '#188df0'}
              ])
            },
            emphasis: {
              itemStyle: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: '#2378f7'},
                  {offset: 0.7, color: '#2378f7'},
                  {offset: 1, color: '#83bff6'}
                ])
              }
            },
            data: this.HistogramData
          }
        ]
      });
    },
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  background-color: transparent;
}

/deep/ .el-menu.el-menu--horizontal {
  border-bottom: solid 0px #e6e6e6;
}

</style>
