<template>
  <div class="leftSide">
    <div class="title">
      <span>水厂基本信息</span>
      <el-button style="margin-left: 50px;height: 30px" type="text" size="mini" @click="waterWorksDetail">数据报表
      </el-button>
    </div>
<!--    <div>-->
<!--      <table width="100%">-->
<!--        <thead>-->
<!--        <tr style="color: white">-->
<!--          <th>名称</th>-->
<!--          <th>时间</th>-->
<!--          <th>浊度</th>-->
<!--          <th>ph</th>-->
<!--          <th>余氯</th>-->
<!--          <th>压力</th>-->
<!--          <th>温度</th>-->
<!--        </tr>-->
<!--        </thead>-->
<!--        <tbody  >-->
<!--        <tr style="color: white" v-for="item of tableData">-->
<!--          <td>{{item.mc}}</td>-->
<!--          <td>{{item.sj}}</td>-->
<!--          <td>{{item.zd}}</td>-->
<!--          <td>{{item.ph}}</td>-->
<!--          <td>{{item.yl}}</td>-->
<!--          <td>{{item.yali}}</td>-->
<!--          <td>{{item.wd}}</td>-->
<!--        </tr>-->
<!--        </tbody>-->
<!--      </table>-->
<!--    </div>-->

      <el-table
          :data="tableData"
          size="small">
        <el-table-column
            prop="mc"
            label="名称" width="45px">
        </el-table-column>
        <el-table-column
            prop="sj"
            label="时间" >
        </el-table-column>
        <el-table-column
            prop="zd"
            label="浊度" width="50px">
          <template v-slot="scope">
            <div :style="{'color':scope.row.zd>0.8||scope.row.zd<=0? 'red':''}">
              {{ scope.row.zd }}
            </div>

          </template>
        </el-table-column>
        <el-table-column
            prop="ph"
            label="ph" width="50px">
          <template v-slot="scope">
            <div :style="{'color':(scope.row.ph>8.5||scope.row.ph<6.5)? 'red':''}">
              {{ scope.row.ph }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="yl"
            label="余氯" width="50px">
          <template v-slot="scope">
            <div :style="{'color':(scope.row.yl>0.8||scope.row.yl<0.1)? 'red':''}">
              {{ scope.row.yl }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="wd"
            label="温度" width="50px">
          <template v-slot="scope">
            <div :style="{'color':scope.row.wd==='0'? 'red':''}">
              {{ scope.row.wd }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="yali"
            label="压力"  width="50px">
          <template v-slot="scope">
            <div :style="{'color':scope.row.yali==='0'? 'red':''}">
              {{ scope.row.yali }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  name: "LeftSide",
  data() {
    return {
      tableData: [],
    }
  },
  mounted() {
    this.initData();
    // setInterval(() => {
    //   this.initData()
    // }, 20000);
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
/deep/ .cell{
  text-align: center !important;
}
/deep/ .el-table .cell{
  padding-left: 0;
  padding-right: 0;
}
</style>
