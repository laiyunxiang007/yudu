import axios from 'axios'
//引入elementUI的 消息提醒组件、加载组件
import { Message, Loading } from 'element-ui';

let loading    //定义loading变量
// 开启加载动画
function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
// 关闭加载动画
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
//创建axios的配置对象
const http = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 10000,
})

// axios 拦截器
// 请求拦截
// http.interceptors.request()
// 响应拦截
// http.interceptors.response()

// 1、请求拦截器：在请求发送之前进行一些处理
http.interceptors.request.use(function (config) {
  // 在发起异步请求时，启动 loading
  startLoading()

  config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
  config.timeout = 6000
  let token = sessionStorage.getItem('access_token')
  if (token) {
    config.headers = {
      'access-token': token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  if (config.url === 'refresh') {
    config.headers = {
      'refresh-token': sessionStorage.getItem('refresh_token'),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  return config
}, function (error) {
  // 请求出错处理
  return Promise.reject(error) //上一次请求的响应结果，作为下一次请求（处理）的参数，类似于链式调用
})

// 2、响应拦截器：在响应结果进行一些处理
http.interceptors.response.use(response => {
  // 在拿到响应的数据后
  // 定时刷新access-token
  if (!response.data) {
    // 刷新token
    store.dispatch('refresh').then(response => {
      sessionStorage.setItem('access_token', response.data)
    }).catch(error => {
      // 停止加载
      endLoading()
      //错误提醒，使用红色错误提醒
      Message.error(error.response.data)

      throw new Error('token刷新' + error)
    })
  }

  // 停止加载动画
  endLoading()
  return response
}, error => {
  // 响应出错处理
  return Promise.reject(error) //上一次请求的响应结果，作为下一次处理的参数，类似于链式调用
})

export default http
