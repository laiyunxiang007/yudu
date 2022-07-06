import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dataV from '@jiaminghi/data-view'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/less/global.less'
import http from './utils/request.js'   // 记得改为你的路径
import 'video.js/dist/video-js.css'

import VideoPlayer from 'vue-video-player'
import hls from 'videojs-contrib-hls'

Vue.use(hls)
Vue.use(VideoPlayer);
Vue.prototype.$http = http
Vue.use(dataV)
Vue.use(ElementUI);

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
