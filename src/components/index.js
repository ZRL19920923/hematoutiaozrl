
// 给面包屑组件注册成全局组件
import MyBread from '@/components/my-bread'
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
  }
}
