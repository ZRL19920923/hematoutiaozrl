<template>
    <div class="container">
        <el-card class="mycard">
            <img src="../../assets/images/logo_index.png" alt="">
            <el-form ref="loginForm" :model="loginForm" :rules='loginRules'>
                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" placeholder="请输入6位数验证码" style="width:236px;margin-right:10px;" ></el-input>
                    <el-button type="success">获取验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button @click="login()" type="primary" style="width:100%">登 录</el-button>
                </el-form-item>

            </el-form>
        </el-card>

    </div>
</template>

<script>
import Store from '@/store'
export default {

  data () {
    const checkMobile = (rule, value, callback) => {
      // 实现校验逻辑
      // 是否符合手机号格式: 第一位数1 第二位数3-9 其余随机数字
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号不合法'))
      }
      callback()
    }
    // const checkMobile = (rule, value, callback) => {
    //   // 实现校验逻辑
    //   // 是否是合法手机号：第一位数字 只能1 第二位数字 3-9 其余9位数字结尾 即可
    //   if (!/^1[3-9]\d{9}$/.test(value)) {
    //     return callback(new Error('手机号不合法'))
    //   }
    //   callback()
    // }
    return {
      loginForm: {
        mobile: '15079804860',
        code: '246810'
      },
      //   表单校验规则的对象
      loginRules: {
        mobile: [
          // 给字段加简单校验规则(可以多个)
          // 1.required不能为空  2.message错误提示信息  3.trigger触发方式
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入6位数验证码', trigger: 'blur' },
          { len: 6, message: '验证码长度为6位数', trigger: 'blur' }
        ]
      }
    }
  },
  props: {

  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  watch: {

  },
  methods: {
    login () {
      // 调用validate对整体进行校验
      // console.log(this.$refs)
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 校验成功 调用登录接口
          this.$http.post('authorizations', this.loginForm)
            .then((res) => {
              console.log(res)
              // return
              // 调用store中的set方法在sessionstroge中保存token
              // 后面根据这个token在做访问限制 若没有强制跳转登录页面
              // 在路由跳转之前做判是否带着这个token 所有用到路由进阶功能 :路由守卫
              Store.setUser(res.data.data)
              this.$router.push('/wc')
            })
            .catch(() => {
              this.$message.error('手机或是验证码出错')
            })
        }
      })
    }
  },
  components: {

  }
}
</script>

<style scoped lang="less">
* {
    margin: 0;
    padding: 0;
}
.container {
    width:100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
    .mycard {
        height: 350px;
        width: 400px;
        // background-color: hotpink;
        position: absolute;
        margin: auto;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        img {
            display: block;
            margin: 0 auto;
        }
    }
}
</style>
