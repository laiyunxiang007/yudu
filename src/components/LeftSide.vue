<template>
  <div class="leftSide">
    <div class="title">
      <span class="title-font">各水厂基本信息</span>
      <dv-decoration-3 style="width:250px;height:20px;" />
    </div>
   <el-table
        :data="tableData"
        size="mini"
        style="width: 2000px">
      <el-table-column
          prop="mc"
          label="名称" width="120px">
      </el-table-column>
      <el-table-column
          prop="date"
          label="时间" width="90px">
      </el-table-column>
      <el-table-column
          prop="zd"
          label="浊度" width="45px">
      </el-table-column>
      <el-table-column
          prop="ph"
          label="ph" width="45px">
      </el-table-column>
      <el-table-column
          prop="yl"
          label="余氯" width="45px">
      </el-table-column>
      <el-table-column
          prop="wd"
          label="温度" width="45px">
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
export default {
  name: "LeftSide",
  data(){
    return{
      tableData:[{
        mc:'高兰农饮供水工程',
        date:'2022-06-24',
        zd:5.25,
        ph:6.5,
        yl:2.21,
        wd:36
      },{
        mc:'晓龙乡水厂',
        date:'2022-06-24',
        zd:5.25,
        ph:6.5,
        yl:2.21,
        wd:36
      },{
        mc:'尾田农饮供水工程',
        date:'2022-06-24',
        zd:5.25,
        ph:6.5,
        yl:2.21,
        wd:36
      },{
        mc:'高排水厂',
        date:'2022-06-24',
        zd:5.25,
        ph:6.5,
        yl:2.21,
        wd:36
      },{
        mc:'石灰坝水厂',
        date:'2022-06-24',
        zd:5.25,
        ph:6.5,
        yl:2.21,
        wd:36
      },{
        mc:'右水水厂',
        date:'2022-06-24',
        zd:5.25,
        ph:6.5,
        yl:2.21,
        wd:36
      },{
        mc:'黄冠供水工程',
        date:'2022-06-24',
        zd:5.25,
        ph:6.5,
        yl:2.21,
        wd:36
      },
        {
          mc:'杉坑水厂',
          date:'2022-06-24',
          zd:5.25,
          ph:6.5,
          yl:2.21,
          wd:36
        },{
          mc:'上芦供水工程',
          date:'2022-06-24',
          zd:5.25,
          ph:6.5,
          yl:2.21,
          wd:36
        },{
          mc:'芳园村水厂',
          date:'2022-06-24',
          zd:5.25,
          ph:6.5,
          yl:2.21,
          wd:36
        },{
          mc:'莲塘加压站',
          date:'2022-06-24',
          zd:5.25,
          ph:6.5,
          yl:2.21,
          wd:36
        },{
          mc:'南杞坑',
          date:'2022-06-24',
          zd:5.25,
          ph:6.5,
          yl:2.21,
          wd:36
        }]
    }
  },
  methods:{
  }
}
</script>

<style scoped lang="less">
.title{
  display:flex;
}
.leftSide{
  padding:10px 10px;
}
.leftSide /deep/  .el-table{
  border-radius: 5px;
}
.leftSide /deep/  .el-table, .el-table__expanded-cell {
  background-color: transparent;
}

.leftSide /deep/ .el-table tr {
  background-color: rgba(19, 25, 47, 0.6);
}
.leftSide /deep/ .el-table th.el-table__cell {
  background-color: rgba(19, 25, 47, 0.6);
}
.leftSide /deep/ .el-table thead{
  color:#fff;
}
.leftSide /deep/ .el-table{
  color:#fff;
}
.leftSide /deep/ .el-table tbody tr:hover>td {
  background: #171F34;
}
/* 去掉table 最底部的线 */
.leftSide /deep/ .el-table--border::after,
.leftSide /deep/ .el-table--group::after,
.leftSide /deep/ .el-table::before {
  background-color: transparent;
}
.leftSide /deep/ .el-table__row>td{ border: none; }
.leftSide /deep/ .el-table::before { height: 0px; }

</style>
