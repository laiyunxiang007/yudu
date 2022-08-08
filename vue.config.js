const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:"./",
  assetsDir:'static',
  indexPath:'index.html',
  lintOnSave:false,
  productionSourceMap:false,
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title='会昌水务平台'
      return args
    });
  },
})
