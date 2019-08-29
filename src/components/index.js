
// 给面包屑组件注册成全局组件
import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
