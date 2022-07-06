const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:"./",
  assetsDir:'static',
  indexPath:'index.html',
  lintOnSave:false,
  productionSourceMap:false
})
