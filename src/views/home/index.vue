<template>
  <el-container class="mycontainer">
    <el-aside :width="isCollapse?'64px':'200px'" class="myaside">
      <div class="logo" :class="{minilogo:isCollapse}"></div>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#002033"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            :collapse-transition= "false"
          >
            <el-submenu index="/">
              <template slot="title">
                <i class="el-icon-s-home"></i>
                <span>首页</span>
              </template>
            </el-submenu>
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
          <el-dropdown>
            <span class="el-dropdown-link">
              <span class="avatar">
                <img src="../../assets/images/avatar.jpg" alt />
              </span>
              <span class="name">用户名称</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
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
export default {
  props: {},
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {},
  methods: {
    roll () {
      this.isCollapse = !this.isCollapse
    }
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
      background-image: url(../../assets/images/logo_admin_01.png) no-repeat center;
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
