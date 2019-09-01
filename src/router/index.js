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
// 引入article模块
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
// 引入获取token的方法
import Store from '@/store'
// 引入await测试页面
// import Text from '@/views/text'
// 注册路由
Vue.use(VueRouter)

// 实例化路由
const router = new VueRouter({
  // 定义路由规则(路径(path)和组件()component)
  routes: [
    // name 的作用是给path命别名
    // 跳转更方便一些 ;$router.push('/lg') 或者$router.push({name:'Login'})
    { path: '/lg', name: 'login', component: Login },
    // { path: '/tx', name: 'text', component: Text },
    { path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: Image },
        { path: '/publish', name: 'publish', component: Publish },
        { path: '/comment', name: 'comment', component: Comment }
        // { path: '/hm/image', name: 'image', component: Image },
        // { path: '/hm/publish', name: 'publish', component: Publish },
        // { path: '/hm/comment', name: 'acomment', component: Comment },
        // { path: '/hm/fans', name: 'fans', component: Fans },
        // { path: '/hm/setting', name: 'setting', component: Setting }
      ] },
    { path: '*', component: Notfound }
  ]
})
// 创建路由守卫 根据token判断是否跳转后台页面
router.beforeEach((to, from, next) => {
  // 判断1 是否有token并且去的页面必须不是登录页面 因为登录页面不需要token 引入store 调用getUser方法
  if (!Store.getUser().token && to.path !== '/lg') {
    return next('/lg')
  }
  next()
})

// 导出路由~
export default router
