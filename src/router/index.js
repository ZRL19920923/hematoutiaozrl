import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
// 引入一级业务组件
import Login from '@/views/login'
import Home from '@/views/home'
// 引入二级业务组件
import Welcome from '@/views/welcome'
// 引入404页面
import Notfound from '@/views/404'
// 注册路由
Vue.use(VueRouter)

// 实例化路由
const router = new VueRouter({
  // 定义路由规则(路径(path)和组件()component)
  routes: [
    // name 的作用是给path命别名
    // 跳转更方便一些 ;$router.push('/lg') 或者$router.push({name:'Login'})
    { path: '/lg', name: 'login', component: Login },
    { path: '/hm',
      component: Home,
      children: [
        { path: '/hm/wc', name: 'welcome', component: Welcome }
      ] },
    { path: '*', component: Notfound }
  ]
})
// 导出路由~
export default router
