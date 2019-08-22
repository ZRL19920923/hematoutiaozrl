// 引入vue
import Vue from 'vue'
// 引入根app
import App from './App.vue'
// 引入element ui 插件
import router from '@/router'
import ElementUI from 'element-ui'
// 引入element-ui css样式
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
// 注册element-ui插件
Vue.use(ElementUI)
new Vue({
  // 挂载路由
  router,
  render: h => h(App)
}).$mount('#app')
