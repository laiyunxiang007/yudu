<template>
  <div>
    <el-container>
      <el-header class="d-flex">
        <dv-decoration-10 class="dv-dec-10"/>
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
      </el-header>
      <el-container class="content">
        <el-main >
          <div class="centerView">
              <CenterSide  ref="centerView"></CenterSide>
          </div>
          <div class="leftView">
            <dv-border-box-10  style="width:420px;height:100%">
              <LeftSide/>
            </dv-border-box-10>
          </div>
          <div class="btnView">
            <el-button type="primary" size="medium" @click="changeStatus(1)">隐藏</el-button>
            <el-button type="primary" size="medium" @click="changeStatus(2)">所有</el-button>
            <el-button type="primary" size="medium" @click="changeStatus(3)">浊度</el-button>
            <el-button type="primary" size="medium" @click="changeStatus(4)">余氯</el-button>
            <el-button type="primary" size="medium" @click="changeStatus(5)">ph</el-button>
            <el-button type="primary" size="medium" @click="changeStatus(6)">温度</el-button>
          </div>
          <div class="rightView">
            <dv-border-box-10 >
              <RightSide />
            </dv-border-box-10>
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
export default {
  name: 'HomeView',
  components: {
    CenterSide,
    LeftSide,
    RightSide
  },
  data() {
    return {
      decorationColor: ['#568aea', '#000000'],
    }
  },
  methods:{
    changeStatus(val){
      this.$refs.centerView.reload(val);
    }
  }
}
</script>
<style lang="less" scoped>

.title {
  justify-content: center;
}

.decoration-6 {
  width: 100%;
  height: 28px;
}

.el-container {
  width: 100%;
  height: 100%;
}

.el-header {
  padding-top: 20px;
  justify-content: center;
}
/deep/ .el-header{
  height:8%!important;
}
.d-flex {
  display: flex;
  padding-left: 0;
  padding-right: 0;
}

.dv-dec-10, .dv-dec-10-s {
  width:36%;
  height: 5px
}

.dv-dec-8 {
  width: 100px;
  height: 50px;
}

.dv-dec-10-s {
  transform: rotateY(180deg);
}

.el-main {
  padding: 0 0;
  height:92%;
}

.centerView {
  position: absolute;
  width: 100%;
  height: 92%;
}

.leftView {
  position: fixed;
  left: 20px;
  top: 80px;
}
.el-button{
  background-color: #2c3e50;
  height:35px;
}

.btnView{
  width:100%;
  position: fixed;
  bottom: 142px;
  justify-content: center;
  z-index: 99;
}
.rightView {
  position: fixed;
  height:250px;
  left: 20px;
  top: 580px;
  z-index: 99;
}
.RightSide{
  position:fixed;
  z-index: 99;
}
</style>
