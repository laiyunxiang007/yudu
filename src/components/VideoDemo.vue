<template>
  <dv-border-box-11  title="视频监控">
      <el-carousel
          :interval="5000"
          arrow="always"
          loop
          height="100%"
          trigger="click"
      >
        <el-carousel-item v-for="(item,index) in move" :key='index'>
          <h4>{{item.name}}</h4>
          <video class="video" autoplay controls style="width:100%;height:100%"></video>
        </el-carousel-item>
      </el-carousel>
  </dv-border-box-11>
</template>

<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

export default {
  name: "RightSide",
  data() {
    return {
      move: [{
        name: '高兰',
        url: "http://202.101.229.125:83/openUrl/HC1upJm/live.m3u8"
      }
      ],
    }
  },
  created() {
  },
  components: {},
  methods: {},
  mounted() {
    for (const argument of this.move) {
      if (Hls.isSupported()) {
        let video = document.getElementsByClassName('video');
        for (const videoElement of video) {
          var hls = new Hls();
          hls.loadSource(argument.url);
          hls.attachMedia(videoElement);
          hls.on(Hls.Events.MANIFEST_PARSED, function () {
            videoElement.play();
          });
        }

      }
    }

  }
}
</script>

<style lang="less" scoped>

/deep/ .el-carousel{
  top:60px;
  left: 20px;
  width: 93%;
  margin-right: 20px;
  height: 75%;
}
/deep/ .el-carousel__button {
  display: none
}
/deep/ .el-carousel__container{
  height: 100%;
}
/deep/ .el-carousel__arrow--left {
  top: 125px;
}

/deep/ .el-carousel__arrow--right {
  top: 125px;
}
h4{
  color: white;
}
</style>
