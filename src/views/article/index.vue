<template>
  <div>
    <!-- 顶部 筛选条件布局 -->
    <!-- 卡片 -->
    <el-card class="box-card find">
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态: ">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <!-- 此处放频道组件 -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期: ">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        <span>根据筛选条件共查询到 {{total}} 条结果</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="封面">
          <template slot-scope="scope">
            <div class="block">
              <el-image :src="scope.row.cover.images[0]" style="width: 100px; height: 100px">
                <div slot="error" class="image-slot">
                  <img src="../../assets/images/error.gif" alt style="width: 100px; height: 100px" />
                </div>
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间">
          <!-- <template slot-scope="scope">

          </template>-->
        </el-table-column>
        <el-table-column prop="address" label="操作" style="width: 120px;">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle plain to="/publish"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="deleteArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="this.reqParams.per_page"
      :current-page="this.reqParams.page"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      reqParams: {
        // 空字符串也会传东西过去 但是null不会
        status: null,
        // 根据下拉框中的id提交数据
        channel_id: null,
        // 获取时间的开始和结束传递给后端
        begin_pubdata: null,
        end_pubdate: null,
        per_page: 20,
        page: 1
      },
      dateArr: [],
      tableData: [],
      total: 0
    }
  },
  computed: {},
  created () {
    // this.getChannelOptions()
    this.getArticle()
  },
  mounted () {},
  watch: {},
  methods: {
    search () {
      this.reqParams.page = 1
      this.getArticle()
    },
    changeDate (valueArr) {
      if (valueArr) {
        this.reqParams.begin_pubdata = valueArr[0]
        this.reqParams.end_pubdata = valueArr[1]
      } else {
        this.reqParams.begin_pubdata = null
        this.reqParams.end_pubdata = null
      }
    },
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getArticle()
    },
    async getArticle () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // console.log(data)
      this.tableData = data.results
      this.total = data.total_count
    },
    deleteArticle (id) {
      // 危险操作先借用组件自带的confirm功能
      this.$confirm('确认删除此文章吗', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.DELETE(`articles/${id}`)
        this.$message.success('删除成功')
        this.getArticle()
      }).catch(() => {

      })
    }

  },
  components: {}
}
</script>

<style scoped lang="less">
.find {
  margin-bottom: 15px;
}
.el-pagination {
  text-align: center;
}
</style>
