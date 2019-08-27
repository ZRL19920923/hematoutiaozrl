// 引入vue
import Vue from 'vue'
// 引入根app
import App from './App.vue'
// 引入element ui 插件
import router from '@/router'
import ElementUI from 'element-ui'
// 引入element-ui css样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入面包屑插件
import MyPlugin from '@/components'
// 引入axios
import axios from '@/api'
// 简单配置axios 配置成vue的原型方法
Vue.prototype.$http = axios

Vue.config.productionTip = false
// 注册element-ui插件
Vue.use(ElementUI)
// 注册面包屑插件
Vue.use(MyPlugin)
new Vue({
  // 挂载路由
  router,
  render: h => h(App)
}).$mount('#app')
