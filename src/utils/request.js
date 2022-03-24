import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'


axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
//创建示例
const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// 响应拦截器
service.interceptors.response.use(res => {
  const code = res.data.code
  if (code == 200) {
    return res.data
  }
},
  error => {
    console.log('err' + error)
  }
)

export default service