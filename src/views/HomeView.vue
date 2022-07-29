<template>
  <div>
    <el-container>
      <el-header class="d-flex">
          <img src="../assets/logo.png" style="height: 50px;width: 100px;">
        <dv-decoration-10 class="dv-dec-10">
        </dv-decoration-10>
        <div class="d-flex">
          <dv-decoration-8 class="dv-dec-8" :color="decorationColor"/>
          <div class="title">
            <span class="title-text">会昌雩山水务城乡供水管运平台</span>
            <div>
              <dv-decoration-6 class="decoration-6" :reverse="true" :color="[ '#ff7317','#0083FF']"/>
            </div>
          </div>
          <dv-decoration-8
              class="dv-dec-8"
              :reverse="true"
              :color="decorationColor"
          />
        </div>
        <dv-decoration-10 class="dv-dec-10-s d-flex"/>
          <img src="../assets/logo.png" style="height: 50px;width: 100px;transform: rotateY(180deg)">
      </el-header>
      <el-container class="content">
        <el-main >
          <div class="centerView">
              <CenterSide  ref="centerView"></CenterSide>
          </div>
          <div class="leftView_1">
            <dv-border-box-10  style="width:410px;height:100%">
              <LeftSide @rowData="getRowData"/>
            </dv-border-box-10>
          </div>
<!--          <div class="btnView">-->
<!--            <el-button type="primary" size="medium" @click="changeStatus(1)">隐藏</el-button>-->
<!--            <el-button type="primary" size="medium" @click="changeStatus(2)">所有</el-button>-->
<!--            <el-button type="primary" size="medium" @click="changeStatus(3)">浊度</el-button>-->
<!--            <el-button type="primary" size="medium" @click="changeStatus(4)">余氯</el-button>-->
<!--            <el-button type="primary" size="medium" @click="changeStatus(5)">ph</el-button>-->
<!--            <el-button type="primary" size="medium" @click="changeStatus(6)">压力</el-button>-->
<!--          </div>-->
          <div class="leftView_2">
            <dv-border-box-10 >
              <RightSide />
            </dv-border-box-10>
          </div>
          <div class="echartView" v-show="isReportShow">
             <ReportEcharts :rowData="this.rowData"  />
          </div>
          <div class="lineChartView" v-show="islineShow">
              <LineChart   />
          </div>
          <div class="reportButton">
            <el-button  type="primary" size="mini" @click="changeReportShow">{{reportButtonName}}</el-button>
          </div>
          <div class="lineButton">
          <el-button  type="primary" size="mini" @click="changeLineShow" >{{reportButtonName}}</el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CenterSide from "@/components/CenterSide";
import LeftSide from "@/components/LeftSide";
import RightSide from "@/components/RightSide";
import ReportEcharts from "@/components/ReportEcharts";
import LineChart from "@/components/echarts/LineChart";

export default {
  name: 'HomeView',
  components: {
    LineChart,
    ReportEcharts,
    CenterSide,
    LeftSide,
    RightSide,
  },
  data() {
    return {
      decorationColor: ['#568aea', '#000000'],
      rowData:{},
      isShow:false,
      isReportShow:true,
      reportButtonName:'隐藏',
      islineShow:true
    }
  },
  methods:{
    changeStatus(val){
      this.$refs.centerView.reload(val);
    },
    getRowData(val){
      if(val){
        this.isShow=false
        this.rowData=val
        this.isShow=true
      }
    },
    closeEcharts(){
      this.isShow=false
    },
    changeReportShow(){
      this.isReportShow=!this.isReportShow
      if (this.isReportShow){
        this.reportButtonName='隐藏'
      }else {
        this.reportButtonName='显示'
      }
    },
    changeLineShow(){
      this.islineShow=!this.islineShow
      if (this.islineShow){
        this.reportButtonName='隐藏'
      }else {
        this.reportButtonName='显示'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
  .el-header {
    padding-top: 20px;
    justify-content: center;
    .title {
      justify-content: center;
      .decoration-6 {
        width: 100%;
        height: 28px;
      }
    }
    .dv-dec-8 {
      width: 100px;
      height: 50px;
    }
    .dv-dec-10, .dv-dec-10-s {
      width:31%;
      height: 5px
    }
    .dv-dec-10-s {
      transform: rotateY(180deg);
    }
  }
}

.d-flex {
  display: flex;
  padding-left: 0;
  padding-right: 0;
}
.el-main {
  padding: 0 0;
  height:92%;
  .centerView {
    position: absolute;
    width: 100%;
    height: 92%;
  }
  .btnView{
    width:100%;
    position: fixed;
    bottom: 142px;
    justify-content: center;
    z-index: 99;
    .el-button{
      background-color: #2c3e50;
      height:35px;
    }
  }
  .leftView{
    position: fixed;
    left: 5px;
    z-index: 99;
  }
  .leftView_1 {
    top: 80px;
    .leftView()
  }
  .leftView_2 {
    height:250px;
    top: 560px;
    .leftView()
  }
  .rightEchartView{
    position: fixed;
    right: 5px;
    width: 380px;
    z-index: 99;
    background: transparent;
  }
  .echartView{
    top: 80px;
    height: 365px;
    right: 5px;
    .rightEchartView()
  }
  .lineChartView{
    top: 450px;
    height: 380px;
    .rightEchartView()
  }
  .button{
    width: 40px;
    height: 40px;
    position: fixed;
    right: 8px;
    z-index: 99;
    .el-button{
      display: none;
    }
  }
  .reportButton{
    top:85px;
    .button()
  }
  .lineButton{
    top: 460px;
    .button()
  }
  .reportButton:hover .el-button,.lineButton:hover .el-button{
    display: block;
  }
}

/deep/ .el-header{
  height:8%!important;
}
/deep/ .dv-border-box-10 .dv-border-svg-container{
  display: none !important;
}

</style>
