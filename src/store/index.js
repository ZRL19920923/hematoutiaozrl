
// 登录补充 保存后台返回的用户信息
// 建立三个函数 负责 存储 获取 删除  独立写出来 因为后面要多次使用

const KEY = 'hm-toutiao-80-user'
export default {
  setUser (user) {
    // 将得到的对象数据转换成json数据保存在浏览器本地 sessionStorage中
    // 因为sessionstoerage 只支持string
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  getUser () {
    //   获取用户信息
    const jsonStr = window.sessionStorage.getItem(KEY) || '{}'

    //   可能存在没有数据的信息 返回的null 通过null.token报错 但是{}.token 是underfined

    // 将得到的值转换为对象

    return JSON.parse(jsonStr)
  },
  delUser () {
    //   删除用户信息
    window.sessionStorage.removeItem(KEY)
  }
}
