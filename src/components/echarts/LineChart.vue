<template>
  <div id="myChart1" style="width:97%;height:83%; padding-top: 9%" ref="chart"/>
</template>
<script>
 import {createWebSocket} from "@/utils/webSocket"
 const  wsuri ="ws://192.168.0.200:9801/websocket/1";
export default {
  name: "LineChart",

  mounted() {
    this.initData();
    createWebSocket(wsuri,this.global_callback)
  },
  data() {
    return {
      lineData: {},
    }
  },
  watch: {
    lineData: {
      deep: true,
      handler() {
        this.initCharts()
      }
    }
  },
  methods: {
    async initData() {
      const res = await this.$http.get('/api/huichang/getLineEcharts')
      this.lineData = res.data.data
      this.initCharts()
    },
    initCharts() {
      let myChart = this.$echarts.init(this.$refs.chart);
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['浊度', '余氯', 'PH', '温度', '压力'],
          top: '3%',
          bottom: '2%',
          textStyle: {
            color: '#fff',
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
          axisLabel: {
            interval: 0,
            color: '#fff',
          },
          data: this.lineData.mc
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#B4B4B4'
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
            data: this.lineData.yl
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
        if (myChart) {
          myChart.resize()
        }
      })
    },
    // websocket的回调函数，msg表示收到的消息
    global_callback(msg) {
      this.lineData=JSON.parse(JSON.stringify(msg));
    }

    // initWebSocket() { // 建立连接
    //   var url = "ws://192.168.0.200:9801/websocket/1";
    //   this.websock = new WebSocket(url);
    //   this.websock.onopen = this.websocketonopen;
    //   this.websock.send = this.websocketsend;
    //   this.websock.onerror = this.websocketonerror;
    //   this.websock.onmessage = this.websocketonmessage;
    //   this.websock.onclose = this.websocketclose;
    // },
    // // 连接成功后调用
    // websocketonopen() {
    //   console.log("WebSocket连接成功");
    // },
    // // 发生错误时调用
    // websocketonerror(e) {
    //   console.log("WebSocket连接发生错误");
    // },
    // // 给后端发消息时调用
    // websocketsend(e) {
    //   console.log("WebSocket连接发生错误");
    // },
    // // 接收后端消息
    // // vue 客户端根据返回的cmd类型处理不同的业务响应
    // websocketonmessage(e) {
    //   this.lineData = JSON.parse(e.data);
    //   console.log(this.lineData)
    // },
    // // 关闭连接时调用
    // websocketclose(e) {
    //   console.log("connection closed (" + e.code + ")");
    // }
  }
}
</script>

<style lang="less" scoped>

</style>
