<template>
  <div class="img-container">
    <div class="btn_image" @click="openDialog">
      <img :src="value || defaultImage" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group
            size="small"
            style="width:100%;"
            v-model="reqParams.collect"
            @change="toggleCollect"
          >
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img_list">
            <div
              class="img_item"
              :class="{seleted:item.url===selectedUrl}"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>

          <el-pagination
            :total="total"
            :current-page="reqParams.page"
            :page-size="reqParams.per_page"
            @current-change="changePage"
            hide-on-single-page
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :on-success="handleSuccess"
            :headers="headers"
            name="image"
          >
            <img v-if="uploadUrl" :src="uploadUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImage from '../assets/images/default.png'
import Store from '@/store'
export default {
  // 组件名字
  name: 'my-image',
  // 父组件传值
  props: ['value'],
  data () {
    return {
      // 素材页面的图片数据
      reqParams: {
        page: 1,
        per_page: 8,
        collect: false
      },
      // 控制对话框的显示
      dialogVisible: false,
      // 控制tab标签的显示
      activeName: 'image',
      // 数据的条数
      total: null,
      // 按钮图片的显示图片的集合
      images: [],
      // 上传图片发起图片请求的请求头
      headers: { Authorization: `Bearer ${Store.getUser().token}` },
      // imageUrl: null,
      // 素材页面被选中的图片url
      selectedUrl: null,
      // 上传图片的url
      uploadUrl: null,
      // 图片按钮默认的显示图 因为wackpak的原因无法打包原始url 所有用import引入 这样就能有webpack打包
      defaultImage
    }
  },
  computed: {},

  mounted () {},
  watch: {},
  methods: {
    // 素材页面选取图片
    selectedImage (url) {
      // console.log(222)
      // 将item.url赋值给选中的  然后得到class = selected
      this.selectedUrl = url
    },
    // 确认图片按钮处最终的图片src
    confirmImage () {
      // 先确定一个src 后面赋值给按钮图片的地址
      let src = null
      if (this.activeName === 'image') {
        // 使用素材图片 不过先要判断用户是否选择了图片
        if (!this.selectedUrl) return this.$message.info('请选择素材')
        src = this.selectedUrl
      } else {
        if (!this.uploadUrl) return this.$message.info('请选择素材')
        src = this.uploadUrl
      }
      // v-model的双向数据绑定  input数据改变便将此值传出去给父组件
      this.$emit('input', src)
      this.dialogVisible = false
    },
    // 上传图片成功触发的函数
    handleSuccess (res) {
      // console.log(res)
      this.$message.success('上传素材成功')
      // 地址为 res.data.url
      // this.imageUrl = res.data.url
      // 设置使用上传的图片做父组件的预览图片
      this.uploadUrl = res.data.url
      // 设置定时器 2秒后关闭 对话框  然后重新加载图片 页数设置为1

      // window.setInterval(() => {
      //   this.dialogVisible = false
      //   this.reqParams.page = 1
      //   this.getImage()
      // }, 2000)
    },
    // 改变分页
    changePage (newPage) {
      // 分页器 中 图片改变是 将默认的当前页传给page 再向页面发请求
      this.reqParams.page = newPage
      this.getImage()
    },
    // 获取素材页面图片
    async getImage () {
      // 获取图片
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      //   console.log(data)
      // 将图片数组赋值给页面渲染
      this.images = data.results
      // 赋值总数量
      this.total = data.total_count
    },
    // 切换全部和收藏
    toggleCollect () {
      this.reqParams.page = 1
      this.getImage()
    },
    // 打开对话框
    openDialog () {
      this.dialogVisible = true
      //  再次打开的时候重置
      this.activeName = 'image'

      this.selectedUrl = null

      this.uploadUrl = null
      // 获取素材列表数据
      this.getImage()
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.btn_image {
  height: 160px;
  width: 160px;
  border: 1px dashed #ddd;
  // margin-left: 50px;
  img {
    width: 100%;
    height: 100%;
  }
}
.img_item {
  display: inline-block;
  img {
    width: 120px;
    height: 120px;
    margin-left: 40px;
    margin-top: 20px;
  }
  &.selected {
    &::after {
      // .img_item.selected::after{} 添加选中效果
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center/ 50px;
    }
  }
}
</style>
