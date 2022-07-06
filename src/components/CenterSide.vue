<template>
  <div id="map_container">
  </div>
</template>

<script>


export default {
  name: "CenterSide",
  data() {
    return {
      waterworks: [
        {
          name: '高兰农饮供水工程',
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
          name: '  晓 龙 乡 水 厂  ',
          zd: 0.8,
          yl: 0.2,
          ph: 6.5,
          geometry: {
            type: 'Point',
            coordinates: [115.567502, 25.550345],
          },
          properties: {
            text: '',
            textColor: '#fff',
            borderColor: '#0083FF',
            backgroundColor: 'transparent',
          }
        },
        {
          name: '尾田农饮供水工程',
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
          name: '   高  排  水  厂   ',
          zd: 0.8,
          yl: 0.2,
          ph: 6.5,
          geometry: {
            type: 'Point',
            coordinates: [115.616742, 25.491485],
          },
          properties: {
            text: '',
            textColor: '#fff',
            borderColor: '#0083FF',
            backgroundColor: 'transparent',
          }
        },
        {
          name: '石  灰  坝  水  厂',
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
          name: '  右  水  水  厂  ',
          zd: 0.8,
          yl: 0.2,
          ph: 6.5,
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
          name: '黄 冠 供 水 工 程',
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
          name: '  杉  坑  水  厂  ',
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
          name: '上  芦  供  水  工  程',
          zd: 0.8,
          yl: 0.2,
          ph: 6.5,
          geometry: {
            type: 'Point',
            coordinates: [115.722367, 25.684298],
          },
          properties: {
            text: '',
            textColor: '#fff',
            borderColor: '#0083FF',
            backgroundColor: 'transparent',
          }
        },
        {
          name: ' 芳  园  村  水  厂 ',
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
          name: '莲   塘   加   压  站',
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
          name: '  南   杞   坑  ',
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

    }
  },
  mounted() {
    this.initMapView();
  },
  methods: {
    async getMapView(map) {
      let res = await this.$http.get('./map.json');
      map.setMapStyleV2({styleJson: res.data})
    },
    //加载地图
    initMapView() {
      var map = initMap({
        tilt: 69,
        heading: 4,
        center: [115.605952, 25.493923],
        zoom: 13,
        skyColors: [
          // 地面颜色
          'rgba(2, 5, 14, 0)',
          // 天空颜色
          'rgba(186, 211, 252, 0)',
        ],
      });
      this.getMapView(map);
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
      this.layerPoint();
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
        data = data.slice(1, 400);
        view.addLayer(lineLayer);
        lineLayer.setData(data);
      });
      //弹框
      this.layer = new mapvgl.LabelLayer({
        zIndex:99,
        textAlign: 'center',
        padding: [2, 5],
        borderRadius: 5,
        fontSize: 24,
        lineHeight: 56,
        collides: true, // 是否开启碰撞检测, 数量较多时建议打开
        enablePicked: true
      });
      view.addLayer(this.layer);
    },
    //加载图层
    layerData(dataStatus) {
      let textColor = '#fff';
      let borderColor = '#0083FF';
      this.waterworks.forEach(val => {
        val.properties.textColor=textColor;
        val.properties.borderColor=borderColor;
        if (dataStatus === 3) {
          val.properties.text = '  ' + val.name + '  ' + '\n' + '  浊度:' + val.zd;
        } else if (dataStatus === 4) {
          val.properties.text = '  ' + val.name + '  ' + '\n' + '  余氯:' + val.yl;
        } else if (dataStatus === 5) {
          val.properties.text = '  ' + val.name + '  ' + '\n' + '  PH值:' + val.ph;
        } else {
          val.properties.text = '  ' + val.name + '  ' + '\n' + ' 浊度:' + val.zd + '\n' + ' 余氯:' + val.yl + '\n' + ' PH值:' + val.ph;
        }
      })
      if (dataStatus === 1) {
        this.layer.setData([]);
      } else {
        this.layer.setData(this.waterworks);
      }
    },
    //加载点
    layerPoint() {
      let data = [
        {
          geometry: {
            type: "Point", //高兰农饮供水工程
            coordinates: [
              115.618807,
              25.600413
            ]
          },
          color: "#0083ff",
          size: 10
        },
        {
          geometry: {
            type: "Point",//晓龙乡水厂
            coordinates: [
              115.567502,
              25.550345
            ]
          },
          color: "#0083ff",
          size: 10
        },
        {
          geometry: {
            type: "Point", //尾田农饮供水工程
            coordinates: [
              115.597857,
              25.537325
            ]
          },
          color: "#0083ff",
          size: 10
        },
        {
          geometry: {
            type: "Point",//高排水厂
            coordinates: [
              115.616742,
              25.491485
            ]
          },
          color: "#0083ff",
          size: 10
        },
        {
          geometry: {
            type: "Point",//石灰坝水厂
            coordinates: [
              115.601260,
              25.438342
            ]
          },
          color: "#0083ff",
          size: 10
        },
        {
          geometry: {
            type: "Point",//右水水厂
            coordinates: [
              115.671271,
              25.439352
            ]
          },
          color: "#0083ff",
          size: 10
        },
        {
          geometry: {
            type: "Point",//黄冠供水厂
            coordinates: [
              115.759107,
              25.613343
            ]
          },
          color: "#0083ff",
          size: 10
        },
        {
          geometry: {
            type: "Point",//杉坑水厂
            coordinates: [
              115.728647,
              25.645016
            ]
          },
          color: "#0083ff",
          size: 10
        },
        {
          geometry: {
            type: "Point", //上鲁村
            coordinates: [
              115.722367,
              25.684298
            ]
          },
          color: "#0083ff",
          size: 10
        },
        {
          geometry: {
            type: "Point", //芳园水厂
            coordinates: [
              115.665945,
              25.573476,
            ]
          },
          color: "#0083ff",
          size: 10
        },
        {
          geometry: {
            type: "Point",
            coordinates: [
              115.661694,
              25.675466
            ]
          },
          color: "#0083ff",
          size: 10
        },
        {
          geometry: {
            type: "Point",
            coordinates: [
              115.699280,
              25.558217
            ]
          },
          color: "#0083ff",
          size: 10
        }
      ]
      this.bubbleLayer.setData(data);
    },
    //重新加载
    reload(dataStatus) {
      this.layerData(dataStatus)
    },

  }
}
</script>

<style lang="less" scoped>
#map_container {
  width: 100%;
  height: 100%;
  margin: 0;
}

</style>
