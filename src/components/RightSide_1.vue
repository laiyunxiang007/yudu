<template>
  <div class="leftSide">
    <div class="title">
      <span>水厂基本信息</span>
      <el-button style="margin-left: 50px;height: 30px" type="text" size="mini" @click="waterWorksDetail">数据报表
      </el-button>
    </div>
    <el-table
        :data="tableData"
        size="mini">
      <el-table-column
          prop="mc"
          label="名称" width="45px">
      </el-table-column>
      <el-table-column
          prop="sj"
          label="时间" width="65px">
      </el-table-column>
      <el-table-column
          prop="zd"
          label="浊度" width="55px">
        <template v-slot="scope">
          <div :style="{'color':scope.row.zd>3? 'red':''}">
            {{ scope.row.zd }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="ph"
          label="ph" width="60px">
      </el-table-column>
      <el-table-column
          prop="yl"
          label="余氯" width="55px">
        <template v-slot="scope">
          <div>
            {{ scope.row.yl }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="wd"
          label="温度" width="55px">
        <template v-slot="scope">
          <div>
            {{ scope.row.wd }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="yali"
          label="压力" width="55px">
        <template v-slot="scope">
          <div>
            {{ scope.row.yali === '0' ? '0.38' : scope.row.yali }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {createWebSocket} from "@/utils/webSocket"
const  wsuri ="ws://192.168.0.200:9801/websocket/2";
export default {
  name: "LeftSide",
  data() {
    return {
      tableData: [],
    }
  },

  mounted() {
    this.initData();
    // this.initWebSocket()
  },
  methods: {
    async initData() {
      const res = await this.$http.get('/api/huichang/getHomeTable')
      this.tableData = res.data.data
    },
    waterWorksDetail() {
      const new1 = this.$router.resolve({path: '/waterWorksDetail'});
      window.open(new1.href, '_blank')
    },
    global_callback(msg) {
      console.log("websocket的回调函数收到服务器信息2：" + JSON.stringify(msg));
      this.tableData=JSON.parse(JSON.stringify(msg));
    },
    initWebSocket() { // 建立连接
      var url = "ws://192.168.0.200:9801/websocket/2";
      this.websock = new WebSocket(url);
      this.websock.onopen = this.websocketonopen;
      this.websock.send = this.websocketsend;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    // 连接成功后调用
    websocketonopen() {
      console.log("WebSocket连接成功");
    },
    // 发生错误时调用
    websocketonerror(e) {
      console.log("WebSocket连接发生错误");
    },
   // 给后端发消息时调用
    websocketsend(e) {
      console.log("WebSocket连接发生错误");
    },
   // 接收后端消息
  // vue 客户端根据返回的cmd类型处理不同的业务响应
    websocketonmessage(e) {
      this.tableData = JSON.parse(e.data);
      console.log(this.tableData)
    },
   // 关闭连接时调用
    websocketclose(e) {
      console.log("connection closed (" + e.code + ")");
    }
  }
}
</script>

<style scoped lang="less">
.title {
  float: left;
  margin-left: 140px;
  height: 25px;
  justify-content: center;
  align-items: center;

  span {
    font-size: 15px;
    color: white;
  }
}

.leftSide {
  margin: 10px 20px;
  //width: 380px;
  height: 95%;
}

.leftSide /deep/ .el-table {
  border-radius: 5px;
  padding-top: 20px !important;
}

.leftSide /deep/ .el-table, .el-table__expanded-cell {
  background-color: transparent;

}

.leftSide /deep/ .el-table tr {
  background-color: rgba(19, 25, 47, 0.6);
}

.leftSide /deep/ .el-table th.el-table__cell {
  background-color: rgba(19, 25, 47, 0.6);
}

.leftSide /deep/ .el-table thead {
  color: #fff;
}

.leftSide /deep/ .el-table {
  color: #fff;
}

.leftSide /deep/ .el-table tbody tr:hover > td {
  background: #171F34;
}

/* 去掉table 最底部的线 */
.leftSide /deep/ .el-table--border::after,
.leftSide /deep/ .el-table--group::after,
.leftSide /deep/ .el-table::before {
  background-color: transparent;
}

.leftSide /deep/ .el-table__row > td {
  border: none;
  border-top: 0.1px solid #18B9F2;
}

.leftSide /deep/ .el-table::before {
  height: 0;
}

/deep/ .cell {
  text-align: center !important;
}

/deep/ .el-table .cell {
  padding-left: 0;
  padding-right: 0;
}
</style>
