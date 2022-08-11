<template>
  <div style="height: 100%">
    <el-container>
      <el-header class="d-flex">
        <dv-decoration-10 class="dv-dec-10">
        </dv-decoration-10>
        <div class="d-flex z-title">
          <dv-decoration-8 class="dv-dec-8" :color="decorationColor">
          </dv-decoration-8>
          <div class="title">
            <span class="title-text">会昌水务城乡供水管运平台</span>
            <dv-decoration-6 style="width:300px;height:30px;"  :color="['#50e3c2', '#67a1e5']"/>
          </div>
          <dv-decoration-8
              class="dv-dec-8"
              :reverse="true"
              :color="decorationColor"
          />
        </div>
        <dv-decoration-10 class="dv-dec-10-s d-flex"/>
        <div style="display: flex;position: fixed;left: 20px;top:30px">
          <img src="../assets/logo.png" style="height: 30px;width: 50px;">
          <span style="color: white;font-size: 16px;padding-top: 7px">0797-8192448</span>
        </div>
      </el-header>
      <el-container>
        <el-main>
          <el-row :gutter="20" type="flex" style="height: 57.5%">
            <el-col :span="6">
              <dv-border-box-7 style="border: 0.5px solid #0083FF;">
                <span style="display:block;color: white;padding-top:9px">压力监测</span>
                <dv-capsule-chart :config="config" style="height: 95%"/>
<!--                <Capsule style="height: 80%" />-->
              </dv-border-box-7>
            </el-col>
            <el-col :span="12">
              <dv-border-box-7 style="border: 0.5px solid #0083FF;">
                <CenterSide/>
              </dv-border-box-7>
            </el-col>
            <el-col :span="6">
              <dv-border-box-7 style="border: 0.5px solid #0083FF;">
                <LeftSide/>
              </dv-border-box-7>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" style="height: 41%;">
            <el-col :span="8">
              <dv-border-box-11 title="流量监测">
                <ReportEcharts/>
              </dv-border-box-11>
            </el-col>
            <el-col :span="8">
              <dv-border-box-11 title="水厂对比图">
                <LineChart/>
              </dv-border-box-11>
            </el-col>
            <el-col :span="8">
              <dv-border-box-11 title="视频监控">
                <VideoDemo/>
              </dv-border-box-11>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CenterSide from "@/components/CenterSide";
import LeftSide from "@/components/RightSide_1";
import ReportEcharts from "@/components/ReportEcharts";
import LineChart from "@/components/echarts/LineChart";
import VideoDemo from "@/components/VideoDemo";
import Capsule from "@/components/echarts/Capsule";

export default {
  name: 'HomeView',
  components: {
    Capsule,
    LineChart,
    ReportEcharts,
    CenterSide,
    LeftSide,
    VideoDemo,
  },
  data() {
    return {
      decorationColor: ['#568aea', '#000000'],
      rowData: {},
      isShow: false,
      isReportShow: true,
      reportButtonName: '隐藏',
      islineShow: true,
      config: {}
    }
  },
  mounted() {
    this.getWaterPressure();
  },
  methods: {
    changeStatus(val) {
      this.$refs.centerView.reload(val);
    },
    getRowData(val) {
      if (val) {
        this.isShow = false
        this.rowData = val
        this.isShow = true
      }
    },
    closeEcharts() {
      this.isShow = false
    },
    changeReportShow() {
      this.isReportShow = !this.isReportShow
      if (this.isReportShow) {
        this.reportButtonName = '隐藏'
      } else {
        this.reportButtonName = '显示'
      }
    },
    changeLineShow() {
      this.islineShow = !this.islineShow
      if (this.islineShow) {
        this.reportButtonName = '隐藏'
      } else {
        this.reportButtonName = '显示'
      }
    },
    async getWaterPressure() {
      const res = await this.$http.get("/api/huichang/getWaterPressure")
      let colors=[];
      let colorsItem=['#0083FF', '#ffdb5c','#e062ae'];
      res.data.data.forEach(item => {
        if (item.value === 0) {
          item.value = 0.38
        }
        if(item.value>0.5&&item.value<1){
          colors.push(colorsItem[1])
        }else if(item.value>1){
          colors.push(colorsItem[2])
        }else {
          colors.push(colorsItem[0])
        }
      })
      console.log(res.data.data)
      let newConfig = {
        colors: colors,
        unit: 'Mpa',
        showValue: true,
        data: res.data.data
      }
      this.config = {...newConfig}
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
        height: 8%;
      }
    }

    .dv-dec-8 {
      width: 25%;
      height: 50px;
    }

    .dv-dec-10, .dv-dec-10-s {
      width: 35%;
      height: 5px
    }

    .dv-dec-10-s {
      transform: rotateY(180deg);
    }
  }
}

.z-title {
  width: 28%;
  justify-content: center;
}

.d-flex {
  display: flex;
  padding-left: 0;
  padding-right: 0;
}

#dv-border-box-7 {
  border: 1px solid #0083FF;
}

.el-row {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-main {
  height: 100%;
}
</style>
