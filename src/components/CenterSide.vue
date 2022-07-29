<template>
  <div id="map_container">
  </div>
</template>

<script>
import data from './map.json'
import a from '../assets/utilsPic/map-marker.png';
export default {
  name: "CenterSide",
  data() {
    return {
      waterworks: [
        {
          name: '高兰',
          zd: 0.8,
          yl: 0.2,
          ph: 6.5,
          geometry: {
            type: 'Point',
            coordinates: [115.618807, 25.600413],
          },
          properties: {
            text: '',
            textColor: '#ff7317',
            borderColor: '#ff7317',
            backgroundColor: 'transparent',
          }
        },
        {
          name: '晓龙',
          zd: 0.8,
          yl: 0.2,
          ph: 6.5,
          geometry: {
            type: 'Point',
            coordinates: [115.567502, 25.650345],
          },
          properties: {
            text: '',
            textColor: '#fff',
            borderColor: '#0083FF',
            backgroundColor: 'transparent',
          }
        },
        {
          name: '田尾',
          zd: 0.8,
          yl: 0.2,
          ph: 6.5,
          geometry: {
            type: 'Point',
            coordinates: [115.597857, 25.537325],
          },
          properties: {
            text: '',
            textColor: '#fff',
            borderColor: '#0083FF',
            backgroundColor: 'transparent',
          }
        },
        {
          name: '高排',
          zd: 0.8,
          yl: 0.2,
          ph: 6.5,
          geometry: {
            type: 'Point',
            coordinates: [115.636742, 25.491485],
          },
          properties: {
            text: '',
            textColor: '#fff',
            borderColor: '#0083FF',
            backgroundColor: 'transparent',
          }
        },
        {
          name: '石灰坝',
          zd: 0.8,
          yl: 0.2,
          ph: 6.5,
          geometry: {
            type: 'Point',
            coordinates: [115.601260, 25.438342],
          },
          properties: {
            text: '',
            textColor: '#0083FF',
            borderColor: '#0083FF',
            backgroundColor: 'transparent',
          }
        },
        {
          name: '右水',
          zd: 0,
          yl: 0,
          ph: 0,
          geometry: {
            type: 'Point',
            coordinates: [115.671271, 25.439352],
          },
          properties: {
            text: '',
            textColor: '#fff',
            borderColor: '#0083FF',
            backgroundColor: 'transparent',
          }
        },
        {
          name: '黄冠',
          zd: 0.8,
          yl: 0.2,
          ph: 6.5,
          geometry: {
            type: 'Point',
            coordinates: [115.759107, 25.613343],
          },
          properties: {
            text: '',
            textColor: '#fff',
            borderColor: '#0083FF',
            backgroundColor: 'transparent',
          }
        },
        {
          name: '杉坑',
          zd: 0.8,
          yl: 0.2,
          ph: 6.5,
          geometry: {
            type: 'Point',
            coordinates: [115.728647, 25.645016],
          },
          properties: {
            text: '',
            textColor: '#fff',
            borderColor: '#0083FF',
            backgroundColor: 'transparent',
          }
        },
        {
          name: '上芦',
          zd: 0.8,
          yl: 0.2,
          ph: 6.5,
          geometry: {
            type: 'Point',
            coordinates: [115.722367, 25.784298],
          },
          properties: {
            text: '',
            textColor: '#fff',
            borderColor: '#0083FF',
            backgroundColor: 'transparent',
          }
        },
        {
          name: '芳园',
          zd: 0.8,
          yl: 0.2,
          ph: 6.5,
          geometry: {
            type: 'Point',
            coordinates: [115.665945, 25.573476],
          },
          properties: {
            text: '',
            textColor: '#fff',
            borderColor: '#0083FF',
            backgroundColor: 'transparent',
          }
        },
        {
          name: '莲塘',
          zd: 0.8,
          yl: 0.2,
          ph: 6.5,
          geometry: {
            type: 'Point',
            coordinates: [115.661694, 25.675466],
          },
          properties: {
            text: '',
            textColor: '#fff',
            borderColor: '#0083FF',
            backgroundColor: 'transparent',
          }
        },
        {
          name: '南杞坑',
          zd: 0.8,
          yl: 0.2,
          ph: 6.5,
          geometry: {
            type: 'Point',
            coordinates: [115.699280, 25.558217],
          },
          properties: {
            text: '',
            textColor: '#0083FF',
            borderColor: '#0083FF',
            backgroundColor: 'transparent',
          }
        }
      ],
      layer: {},
      bubbleLayer: {},
      mapData: [],
      tableData: []
    }
  },
  mounted() {
    this.mapData = data;
    this.initMapView();
  },
  methods: {
    //加载地图
    async initMapView() {
      var map = new BMapGL.Map('map_container', {
        restrictCenter: false
      });

      map.centerAndZoom(new BMapGL.Point(115.625952, 25.553923), 13);
      map.enableScrollWheelZoom();
      map.setHeading(0);
      map.setTilt(50);
      map.setDisplayOptions({
        skyColors: ['rgba(186, 0, 255, 0)','rgba(186, 0, 255, 0.2)']
      })
      map.setMapStyleV2({styleJson: data});

      let res = await this.$http.get('/api/huichang/getHomeTable')
      this.waterworks.forEach(val => {
        res.data.data.forEach(item => {
          if (val.name === item.mc) {
            val.zd = item.zd;
            val.yl = item.yl;
            val.ph = item.ph;
          }
        })
      })
      this.tableData = res.data.data
      // 创建添加点标记
      for (let waterwork of this.waterworks) {
        var myIcon = new BMapGL.Icon(a, new BMapGL.Size(17, 20));
        let marker = new BMapGL.Marker(new BMapGL.Point(waterwork.geometry.coordinates[0], waterwork.geometry.coordinates[1]), {
          icon: myIcon,
          title:waterwork.name
        });
        map.addOverlay(marker);

        // 创建图文信息窗口
        var sContent = `<div style="text-align: center;color: black">
                         <table style="width: 100%;">
                            <tr>
                                <td style="border-right: 1px solid green;border-bottom: 1px solid green;">浊度:</td>
                                <td style="border-bottom: 1px solid green;">` + waterwork.zd + `<span>NTU</span></td>
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid green;">PH:</td>
                                <td>` + waterwork.ph + `</td>
                            </tr>
                              <tr>
                                <td style="border-right: 1px solid green;border-top: 1px solid green;">余氯:</td>
                                <td style="border-top: 1px solid green;">` + waterwork.yl + `<span>mg/L</span></td>
                            </tr>
                        </table>
                      </div>`;
        let opts={
          offset: new BMapGL.Size(0, 15),
        }
        const infoWindow = new BMapGL.InfoWindow(sContent,opts);
        infoWindow.setTitle(waterwork.name)
        marker.addEventListener('click', function () {
          this.openInfoWindow(infoWindow);
          // 图片加载完毕重绘infoWindow
        });
      }


      //图层
      // 创建炫光处理通道
      var bloomEffect = new mapvgl.BloomEffect({
        threshold: 0.2,
        blurSize: 2.0
      });
      var view = new mapvgl.View({
        effects: [bloomEffect],
        map: map,
      });
      //点
      this.bubbleLayer = new mapvgl.CircleLayer({
        // 绘制带泡泡的圆
        type: 'bubble',
        size: (size) => 3 * size,
        // 扩散半径，支持直接设置和回调两种形式，size为点的大小
        radius(size) {
          return 2 * size;
        },
        // 扩散时间
        duration: 0.5,
        // 渐隐时间
        trail: 1
      });
      view.addLayer(this.bubbleLayer);
      // this.layerPoint();
      var lineLayer = new mapvgl.LineLayer({
        color: '#0083FF',
        width: 0.6,
        style: 'road',
        animation: true,
        duration: 10, // 循环时间2s
        trailLength: 0.4, // 拖尾长度占间隔的0.4
        interval: 0.2 // 粒子长度占线整体长度的0.2
      });

      fetch('./car.csv').then(function (rs) {
        return rs.text();
      }).then(function (csvstr) {
        var dataSet = mapv.csv.getDataSet(csvstr);
        var data = dataSet.get();
        data = data.slice(1200, 1500);
        view.addLayer(lineLayer);
        lineLayer.setData(data);
      });

      //弹框
      // this.layer = new mapvgl.LabelLayer({
      //   zIndex: 99,
      //   textAlign: 'left',
      //   padding: [0, 0],
      //   borderRadius: 5,
      //   fontSize: 18,
      //   width: 200,
      //   lineHeight: 22,
      //   collides: false, // 是否开启碰撞检测, 数量较多时建议打开
      //   enablePicked: true,
      //   onClick: e => {
      //   }
      // });
      // view.addLayer(this.layer);
    },

    //加载图层
    // layerData(dataStatus) {
    //   let textColor = '#fff';
    //   let borderColor = '#0083FF';
    //   this.waterworks.forEach(val=>{
    //     this.tableData.forEach(item=>{
    //       if(val.name===item.mc){
    //         val.zd=item.zd;
    //         val.yl=item.yl;
    //         val.ph=item.ph
    //       }
    //     })
    //   })
    //   this.waterworks.forEach(val => {
    //     val.properties.textColor=textColor;
    //     val.properties.borderColor=borderColor;
    //     if (dataStatus === 3) {
    //       val.properties.text = val.name  + '\n' + '浊度:' + val.zd;
    //     } else if (dataStatus === 4) {
    //       val.properties.text = val.name + '\n' + '余氯:' + val.yl;
    //     } else if (dataStatus === 5) {
    //       val.properties.text =val.name + '\n' + 'PH值:' + val.ph;
    //     } else {
    //       val.properties.text =val.name +'\n' + '浊度:' + val.zd + '\n' + '余氯:' + val.yl + '\n' + 'PH值:' + val.ph;
    //     }
    //   })
    //   if (dataStatus === 1) {
    //     this.layer.setData([]);
    //   } else {
    //     this.layer.setData(this.waterworks);
    //   }
    // },
    //加载点
    // layerPoint() {
    //   let data = [
    //     {
    //       geometry: {
    //         type: "Point", //高兰农饮供水工程
    //         coordinates: [
    //           115.618807,
    //           25.600413
    //         ]
    //       },
    //       color: "#0083ff",
    //       size: 10
    //     },
    //     {
    //       geometry: {
    //         type: "Point",//晓龙乡水厂
    //         coordinates: [
    //           115.567502,
    //           25.650345
    //         ]
    //       },
    //       color: "#0083ff",
    //       size: 10
    //     },
    //     {
    //       geometry: {
    //         type: "Point", //尾田农饮供水工程
    //         coordinates: [
    //           115.597857,
    //           25.537325
    //         ]
    //       },
    //       color: "#0083ff",
    //       size: 10
    //     },
    //     {
    //       geometry: {
    //         type: "Point",//高排水厂
    //         coordinates: [
    //           115.636742,
    //           25.491485
    //         ]
    //       },
    //       color: "#0083ff",
    //       size: 10
    //     },
    //     {
    //       geometry: {
    //         type: "Point",//石灰坝水厂
    //         coordinates: [
    //           115.601260,
    //           25.438342
    //         ]
    //       },
    //       color: "#0083ff",
    //       size: 10
    //     },
    //     {
    //       geometry: {
    //         type: "Point",//右水水厂
    //         coordinates: [
    //           115.671271,
    //           25.439352
    //         ]
    //       },
    //       color: "#0083ff",
    //       size: 10
    //     },
    //     {
    //       geometry: {
    //         type: "Point",//黄冠供水厂
    //         coordinates: [
    //           115.759107,
    //           25.613343
    //         ]
    //       },
    //       color: "#0083ff",
    //       size: 10
    //     },
    //     {
    //       geometry: {
    //         type: "Point",//杉坑水厂
    //         coordinates: [
    //           115.728647,
    //           25.645016
    //         ]
    //       },
    //       color: "#0083ff",
    //       size: 10
    //     },
    //     {
    //       geometry: {
    //         type: "Point", //上鲁村
    //         coordinates: [
    //           115.722367,
    //           25.784298
    //         ]
    //       },
    //       color: "#0083ff",
    //       size: 10
    //     },
    //     {
    //       geometry: {
    //         type: "Point", //芳园水厂
    //         coordinates: [
    //           115.665945,
    //           25.573476,
    //         ]
    //       },
    //       color: "#0083ff",
    //       size: 10
    //     },
    //     {
    //       geometry: {
    //         type: "Point",
    //         coordinates: [
    //           115.661694,
    //           25.675466
    //         ]
    //       },
    //       color: "#0083ff",
    //       size: 10
    //     },
    //     {
    //       geometry: {
    //         type: "Point",
    //         coordinates: [
    //           115.699280,
    //           25.558217
    //         ]
    //       },
    //       color: "#0083ff",
    //       size: 10
    //     }
    //   ]
    //   this.bubbleLayer.setData(data);
    // },
    //重新加载
    // reload(dataStatus) {
    //   this.layerData(dataStatus)
    // },



    async initData() {
      let res = await this.$http.get('/api/huichang/getHomeTable')
      this.tableData = res.data.data
    }

  }
}
</script>

<style lang="less" scoped>
#map_container {
  width: 100%;
  height: 100%;
  margin: 0;
}

/deep/ .BMap_bubble_pop {
  padding: 0 0 !important;
  width: 210px !important;
  border-radius: 5px !important;

  .BMap_bubble_title {
    text-align: center !important;
    background-color: green !important;
    width: 210px !important;
    border-top-left-radius: 5px !important;
    border-top-right-radius: 5px !important;
  }
  img{
    width: 17px !important;
    height: 13px !important;
    left: 86px !important;
  }
}

</style>
