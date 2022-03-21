const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' //将访问路径的/api/替换成’‘，后台服务不用加api了,但前端的请求地址还是要加/api/
        },
      }
    },
  }
})
