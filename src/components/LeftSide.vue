<template>
  <div class="leftSide">
    <div class="title">
      <span class="title-font">水厂基本信息</span>
      <dv-decoration-3 style="width:100px;height:20px;"/>
      <el-button style="margin-left: 80px"  type="text" size="mini" @click="waterWorksDetail">数据报表</el-button>
    </div>
    <el-table
        :data="tableData"
        size="mini"
        @cell-click="cellCickShow"
       >
      <el-table-column
          prop="mc"
          label="名称" width="56px">
      </el-table-column>
      <el-table-column
          prop="sj"
          label="时间" width="84px">
      </el-table-column>
      <el-table-column
          prop="zd"
          label="浊度" width="50px">
        <template v-slot="scope">
          <div  :style="{'color':scope.row.zd>0.8||scope.row.zd<=0? 'red':''}">
            {{scope.row.zd}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="ph"
          label="ph" width="50px">
        <template v-slot="scope">
          <div  :style="{'color':(scope.row.ph>8.5||scope.row.ph<6.5)? 'red':''}">
            {{scope.row.ph}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="yl"
          label="余氯" width="50px">
        <template v-slot="scope">
          <div  :style="{'color':(scope.row.yl>0.8||scope.row.yl<0.1)? 'red':''}">
            {{scope.row.yl}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="wd"
          label="温度" width="50px">
      </el-table-column>
      <el-table-column
          prop="yali"
          label="压力" width="50px">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: "LeftSide",
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.initData();
    setInterval(()=>{
      this.initData()
    },20000)
  },
  methods: {
    cellCickShow(row, column, cell, event) {
      this.$emit('rowData', row)
    },
    waterWorksDetail() {
      const new1 = this.$router.resolve({path: '/waterWorksDetail'});
      window.open(new1.href, '_blank')
    },
    async initData() {
      const res = await this.$http.get('/api/huichang/getHomeTable')
      this.tableData=res.data.data
    },
    cellStyle(row){
      if(row.row.zd>1||row.row.zd<=0||
          row.row.yl<0.1||row.row.yl>0.8||
         row.row.ph<6.5||row.row.ph>8.5){
        return 'color:red'
      }
    }
  }
}
</script>

<style scoped lang="less">
.title {
  display: flex;
  height: 30px;
  justify-content: center;
  align-items: center;
}

.leftSide {
  padding: 10px 10px;
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
}

.leftSide /deep/ .el-table::before {
  height: 0px;
}

</style>
