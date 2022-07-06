<template>
  <div class="hkVideo">
    <div class="player">
      <div class="title">
        <span class="title-font">各水厂视频</span>
        <dv-decoration-1 style="width:150px;height:20px;"/>
      </div>
      <el-carousel
          :interval="5000"
          arrow="always"
          loop
          style="width:400px"
          height="200px"
          trigger="click"
      >
        <el-carousel-item v-for="(item,index) in move" :key='index'>
          <h4>{{item.name}}</h4>
          <video class="video" autoplay controls style="width:100%;height:190px"></video>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

export default {
  name: "RightSide",
  data() {
    return {
      move: [{
        name: '庄口水务',
        url: "http://202.101.229.125:83/openUrl/YOAG5Ik/live.m3u8"
      }, {
        name: '庄口水务1',
        url: "http://202.101.229.125:83/openUrl/YOAG5Ik/live.m3u8"
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
.hkVideo {
  position: relative;
  padding: 10px 10px;
}

.title {
  display: flex;
}

/deep/ .el-carousel__button {
  display: none
}

/deep/ .el-carousel__arrow--left {
  top: 100px;
}

/deep/ .el-carousel__arrow--right {
  top: 100px;
}
h4{
  color: #fff;
  font-weight:normal;
}
</style>
