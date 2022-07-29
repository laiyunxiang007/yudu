<template>
<div style="width: 100%;height: 100%">
  <dv-border-box-10>
  <div><span style="color: #fff;font-size: 20px;padding-bottom: 0">各水厂对比详情</span></div>
  <div style="width:95%;height:90%;" ref="chart"></div>
  </dv-border-box-10>
</div>
</template>

<script>
export default {
  name: "LineChart",
  mounted() {
    this.initData();
  },
  data(){
    return{
      lineData: {},
    }
  },

  methods:{
    async initData() {
      const res = await this.$http.get('/api/huichang/getLineEcharts')
      this.lineData=res.data.data
      this.initCharts();
    },
    initCharts() {
      let myChart = this.$echarts.init(this.$refs.chart);
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['浊度', '余氯','PH','温度','压力'],
          textStyle:{
            color:'#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval:0,
            color:'#fff',
            fontSize: 14
          },
          data:  this.lineData.mc
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:'#fff'
          },
        },
        series: [
          {
            name: '浊度',
            type: 'line',
            data: this.lineData.zd
          },
          {
            name: '余氯',
            type: 'line',
            data:this.lineData.yl
          },
          {
            name: 'PH',
            type: 'line',
            data: this.lineData.ph
          },
          {
            name: '温度',
            type: 'line',
            data: this.lineData.wd
          },
          {
            name: '压力',
            type: 'line',
            data: this.lineData.yali
          },
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
