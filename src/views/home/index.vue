<template>
  <el-container class="mycontainer">
    <el-aside :width="isCollapse?'64px':'200px'" class="myaside">
      <div class="logo" :class="{minilogo:isCollapse}"></div>
      <el-menu
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold icon" @click="roll()"></span>
        <span class="test">江苏传智播客科技教育有限公司</span>
        <div class="dropmenu">
          <el-dropdown @command="clickItem">
            <span class="el-dropdown-link">
              <!-- 头像和后台传递的数据来更新 所以在data内声明 -->
              <span class="avatar">
                <img :src="photo" alt />
              </span>
              <!-- 名字和后台传递的数据来更新  所以在data内声明-->
              <span class="name">{{name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!--  -->
              <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Store from '@/store'
export default {
  props: {},
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  computed: {},
  created () {
    // 获取用户信息 所以导入store模块
    const user = Store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  mounted () {},
  watch: {},
  methods: {
    roll () {
      this.isCollapse = !this.isCollapse
    },

    setting () {
      this.$router.push('/setting')
    },
    logout () {
      Store.delUser()
      this.$router.push('/lg')
    },
    // 用element自带的事件触发事件来解决
    clickItem (command) {
      // this[comand]原生调用方法事件括号内是个变量
      this[command]()
    }

    // 原生解决
    // setting () {
    //   // 因为element 组件内部不支持原生点击事件 所以加语法@click.native 才能正常触发原生点击事件
    //   // 触发个人设置点击事件跳转到setting页面
    //   this.$router.push('/setting')
    // },
    // logout () {
    //   // 触发退出登录事件 跳转登录页面 并删除用户信息
    //   Store.delUser()
    //   this.$router.push('/lg')
    // }
  },
  components: {}
}
</script>

<style scoped lang="less">
.mycontainer {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .myaside {
    background-color: #002033;
    .logo {
      height: 60px;
      width: 100%;
      background: #002244 url(../../assets/images/logo_admin.png) no-repeat
        center / 140px auto;
    }
    .minilogo {
      background-image: url(../../assets/images/logo_admin_01.png) no-repeat
        center;
      background-size: 36px auto;
    }
    .el-menu-vertical-demo {
      border: none;
    }
  }
  .el-header {
    line-height: 60px;
    vertical-align: middle;
    font-size: 16px;
    border-bottom: 1px solid #ddd;
    .icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .test {
      vertical-align: middle;
    }
    .dropmenu {
      float: right;
      .name {
        vertical-align: middle;
        font-weight: bold;
      }
      .avatar {
        img {
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
