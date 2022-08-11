<template>
    <div id="myChart1" style="width:97%;height:83%; padding-top: 9%" ref="chart" />
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
          top:'3%',
          bottom:'2%',
          textStyle:{
            color:'#fff',
            fontSize: '16px'
          }
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel:{
            interval:0,
            color:'#fff',
          },
          data:  this.lineData.mc
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            color:'#B4B4B4'
          },
          splitLine: {
            show: false
          }
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
        ],
        // color:['#37a2da','#e062ae', '#e690d1', '#9fe6b8', '#ffdb5c']
      })
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

<style lang="less" scoped>

</style>
