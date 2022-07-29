<template>
  <div class="detailBg">
    <div class="detail-header">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item style="width: 1000px;margin-left: 500px">
          <el-col :span="4">
            <el-select v-model="form.optionsValue" placeholder="请选择水厂" size="mini">
              <el-option
                  v-for="item of options"
                  size="mini"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <el-date-picker
                size="mini"
                v-model="form.detailDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="mini" @click="getWaterDataByEveryTime(1)">查询日报</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" size="mini" @click="getWaterDataByEveryTime(2)">查询月报</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="mini" @click="getWaterDataByEveryTime(3)">查询年报</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align: left">
      <el-button class="excel" type="warning" size="mini" @click="exportExcel">导出</el-button>
    </div>
    <div>
      <el-table
          :data="tableData"
          size="mini"
          border
          stripe
          id="exportTabe"
          style="width: 100%">
        <el-table-column
            prop="mc"
            label="水厂">
        </el-table-column>
        <el-table-column
            prop="date"
            label="时间">
        </el-table-column>
        <el-table-column
            prop="zd"
            label="浊度">
        </el-table-column>
        <el-table-column
            prop="ph"
            label="ph">
        </el-table-column>
        <el-table-column
            prop="yl"
            label="余氯">
        </el-table-column>
        <el-table-column
            prop="wd"
            label="温度">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export default {
  name: "WaterWorksDetail",
  data() {
    return {
      tableData: [],
      options: ["高兰", "晓龙", "田尾",
        "高排", "石灰坝", "右水", "黄冠", "杉坑", "上芦", "芳园", "莲塘", "南杞坑"],
      form: {
        optionsValue: '',
        detailDate: ''
      },

    }
  },
  mounted() {
    this.getWaterDataByEveryTime()
  },
  methods: {
    // async initData() {
    //   const res = await this.$http.get('/api/huichang/getHomeTable')
    //   this.tableData = res.data.data
    // },
    exportExcel() {
      var xlsxParam = {raw: true} // 导出的内容只做解析，不进行格式转换
      var table = document.querySelector('#exportTabe').cloneNode(true)
      var wb = XLSX.utils.table_to_book(table, xlsxParam)
      /* get binary string as output */
      var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
      try {
        FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '各水厂明细表.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
    },
    async getWaterDataByEveryTime(type) {
      let res;
      if (type) {
        res = await this.$http.post('/api/huichang/getWaterDataByEveryTime', {formData: this.form, type: type})
      } else {
        this.form.optionsValue = '高兰';
        this.form.detailDate = this.getTime(new Date());
        res = await this.$http.post('/api/huichang/getWaterDataByEveryTime', {formData: this.form, type: 1})
      }
      this.tableData = res.data.data
    },
    getTime(date) {
      let y = date.getFullYear() //年
      let m = date.getMonth() + 1  //月，月是从0开始的所以+1
      let d = date.getDate() //日
      m = m < 10 ? "0" + m : m //小于10补0
      d = d < 10 ? "0" + d : d //小于10补0
      return y + "-" + m + "-" + d; //返回时间形式yyyy-mm-dd
    }
  }
}
</script>

<style lang="less" scoped>
.detailBg {
  height: 100%;
  background-color: white;
}

.detail-header {
  padding-top: 20px;
  margin-bottom: 20px;
  overflow: hidden;


  /deep/ .el-form-item__content {
    //充满父元素（el-col）
    line-height: 100%;
  }
}

.excel {
  margin-left: 20px;
  margin-bottom: 10px;
}

</style>
