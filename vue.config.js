const { defineConfig } = require('@vue/cli-service')
const apiHost = true ? "https://dev.usemock.com/623a87988701bab02ba90d14" : "http://localhost:8888"
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      title: '校吧',
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: apiHost,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' //将访问路径的/api/替换成’‘，后台服务不用加api了,但前端的请求地址还是要加/api/
        },
      }
    },
  }
})
