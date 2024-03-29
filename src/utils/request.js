import axios from 'axios'
import Cookies from 'js-cookie'


axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
//创建示例
const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// request拦截器
service.interceptors.request.use(config => {
  // if (config.url == '/postbarlist/addBar') {
  //   console.log("gai");
  //   axios.defaults.headers['Content-Type'] = 'multipart/form-data';
  // }
  // console.log(config);
  // // 是否需要防止数据重复提交
  // const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
  // if (getToken() && !isToken) {
  //   config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  // // get请求映射params参数
  // if (config.method === 'get' && config.params) {
  //   let url = config.url + '?' + tansParams(config.params);
  //   url = url.slice(0, -1);
  //   config.params = {};
  //   config.url = url;
  // }
  if (Cookies.get('token')) {
    config.headers['token'] = Cookies.get('token')
  }
  
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  const code = res.data.code
  if (code >= 0) {
    return res.data
  }
},
  error => {
    console.log('err' + error)
  }
)

export default service