<template>
  <el-card>
    <div slot="header">
      <my-bread>个人设置</my-bread>
    </div>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-form label-width="120px">
            <el-form-item label="编号">
                {{user.id}}
            </el-form-item>
            <el-form-item label="手机">
                {{user.mobile}}
            </el-form-item>
            <el-form-item label="媒体名字" >
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" :rows="3" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
             <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save()">保存设置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="uploadImage"
          >
            <img v-if="user.photo" :src="user.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import Store from '@/store'
import eventBus from '@/eventBus'
export default {
  props: {},
  data () {
    return {
      user: {
        name: '',
        intro: '',
        email: '',
        mobile: '',
        photo: '',
        id: ''
      },
      imageUrl: null
    }
  },
  computed: {},
  created () {
    this.getuserInfo()
  },
  mounted () {},
  watch: {},
  methods: {
    async uploadImage (result) {
      // 默认参数result
      // console.log(result)
      // 其中有一个file的元素
      const file = result.file
      // 新建一个formdata对象
      const formData = new FormData()
      // 将图片文件加入到formdata
      formData.append('photo', file)
      // 调请求
      const { data: { data } } = await this.$http.patch('user/photo', formData)
      // console.log(data)
      this.user.photo = data.photo
      const localuser = Store.getUser()
      localuser.photo = data.photo
      Store.setUser(localuser)
      eventBus.$emit('updatePhoto', data.photo)
    },
    async save () {
      // 解构数据
      const { name, intro, email } = this.user
      //   用解构的数据传参
      await this.$http.patch('user/profile', { name, intro, email })
      this.$message.success('保存设置成功')
      //   更新 本地存储
      const localUser = Store.getUser()
      localUser.name = name
      //   重新保存本地存储
      Store.setUser(localUser)
      //   利用eventBus更新home页的名字 传出数据
      eventBus.$emit('updateName', name)
      this.$router.push('/article')
    },
    async getuserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      // console.log(data)

      this.user = data
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
</style>
