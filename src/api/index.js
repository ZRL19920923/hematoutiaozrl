// 配置axios
import axios from 'axios'
import Store from '@/store'
import router from '@/router'
// 1.基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 2.请求头 token 以后发请求都带着这个头

axios.defaults.headers.AUthorization = `Bearer ${Store.getUser().token}`
// 因为点击登录的时候 main.js文件就会执行一次 这次执行的时候会设置一个请求头AUthorization= Bearer underfined  因为登录页面的时候还没有token
// 所以设置一个请求拦截器 在每次请求之前拦截 并给每次请求设置上请求头AUthorization=`Bearer ${Store.getUser().token}` 此时token的值已经配置好所以不是underfined

axios.interceptors.request.use(function (config) {
  // 参数 config 请求配置  默认配置
  // 修改配置  添加 token 信息
  // 返回修改好的配置  请求的时候使用你的修改后的配置
  config.headers.AUthorization = `Bearer ${Store.getUser().token}`
  return config
}, function (error) {
  // error 错误对象
  // 对请求错误做些什么
  // 返回一个一定出错的promise对象
  // new Promise((resolve,reject)=>{})  可能成功可能失败
  // Promise.reject(error) 一定是调catch() 失败
  // Promise.resolve() 一定是调then() 成功
  return Promise.reject(error)
})
// 因为服务器返回的token有有效期 所以响应回来的时候 应该判断当下的token是否过期  也就是判断返回的状态码
// 是否为401

// 添加响应拦截器(每次后端给你响应)
axios.interceptors.response.use(function (response) {
  // 响应成功 直接返回数据即可
  // 对响应数据做点什么
  return response
}, function (error) {
  // 响应失败
  // 401错误  获取响应状态码 判断是不是401
  if (error.response.status === 401) {
    // 如果是401 要求返回login页面重新登录 并且删除失效的token
    // 借用到router.push()所以这里要引入router
    Store.delUser()
    router.push('/lg')
  }
  // error.response  响应对象
  // error.response.status 状态码
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default axios
