<template>
  <el-card>
    <div slot="header">
      <my-bread>素材管理</my-bread>
    </div>
    <div>
      <el-radio-group v-model="reqParams.collect" size="small" @change="toggleCollect">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success" style="float:right" size="small" @click="openDialog()">添加素材</el-button>
    </div>
    <div class="img_list">
      <div class="img_item" v-for="item in images" :key="item.id">
        <img :src="item.url" alt />
        <div class="footer" v-if="!reqParams.collect">
          <span
            @click="toggleStatus(item)"
            class="el-icon-star-off"
            :class="{red:item.is_collected}"
          ></span>
          <span @click="delImage(item.id)" class="el-icon-delete"></span>
        </div>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="reqParams.page"
      :page-size="reqParams.per_page"
      @current-change="changePage"
      hide-on-single-page
    ></el-pagination>
    <!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :on-success="handleAvatarSuccess"
        :headers="headers"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import Store from '@/store'
export default {
  props: {},
  data () {
    return {
      // 发送请求是发送的请求对象
      reqParams: {
        // 根据ture和false来控制 按钮 默认为false 为为收藏状态
        collect: false,
        // 当前显示的页数
        page: 1,
        // 一页的总条数
        per_page: 10
      },
      images: [],
      // 图片的总数量
      total: 0,
      // 对话框默认隐藏
      dialogVisible: false,
      headers: { Authorization: `Bearer ${Store.getUser().token}` },
      imageUrl: null
    }
  },
  computed: {},
  created () {
    this.getImage()
  },
  mounted () {},
  watch: {},
  methods: {
    handleAvatarSuccess (res) {
      // console.log(res)
      this.$message.success('上传素材成功')
      // 地址为 res.data.url
      this.imageUrl = res.data.url
      // 设置定时器 2秒后关闭 对话框  然后重新加载图片 页数设置为1
      window.setInterval(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImage()
      }, 2000)
    },
    openDialog () {
      // 每次添加要把之前的图片预览清空
      this.imageUrl = null
      // 点击添加对话框出现
      this.dialogVisible = true
    },
    delImage (id) {
      // 确认框
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发请求
          await this.$http.delete(`user/images/${id}`)
          // 提示+更新列表
          this.$message.success('删除素材成功')
          this.getImage()
        })
        .catch(() => {})
    },
    async toggleStatus (item) {
      // 调动接口更改图片状态请求
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 请求成功提示 若为当前为未收藏状态 那么提示取消成功  若为收藏状态 则提示收藏成功
      this.$message.success(data.collect ? '收藏成功' : '取消成功')
      // 更新图片的颜色
      item.is_collected = data.collect
    },
    toggleCollect () {
      // 切换全部和收藏 显示第一页 然后重新调接口发请求 此时的reqparams的collect已经变化
      this.reqParams.page = 1
      this.getImage()
    },
    changePage (newPage) {
      // 分页器 中 图片改变是 将默认的当前页传给page 再向页面发请求
      this.reqParams.page = newPage
      this.getImage()
    },
    async getImage () {
      // 获取图片
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      console.log(data)
      // 将图片数组赋值给页面渲染
      this.images = data.results
      // 赋值总数量
      this.total = data.total_count
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.img_list {
  margin-top: 20px;
  .img_item {
    height: 160px;
    width: 160px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      position: absolute;
      left: 0;
      bottom: 0;
      line-height: 30px;
      height: 30px;
      color: #fff;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      span {
        margin-right: 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
.el-pagination {
  text-align: center;
}
</style>
