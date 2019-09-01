<template>
  <el-card>
    <div slot="header">
      <my-bread>评论管理</my-bread>
    </div>
    <el-table :data="tableData">
      <el-table-column label="标题" width="400px" prop="title"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="状态" prop="comment_status">
          <template slot-scope="scope">
                {{scope.row.comment_status? '正常' : '关闭'}}
          </template>
      </el-table-column>
      <el-table-column label="操作" width="120px">
            <template slot-scope="scope">
                 <el-button type="success" v-if="!scope.row.comment_status" size="small" @click="toggleStatus(scope.row)">打开评论</el-button>
                 <el-button type="danger" v-else size="small" @click="toggleStatus(scope.row)">关闭评论</el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="this.reqParams.per_page"
      :current-page="this.reqParams.page"
      @current-change="changePage"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      tableData: [],
      reqParams: {
        response_type: 'comment',
        per_page: 20,
        page: 1
      },
      total: 0
    }
  },
  computed: {},
  created () {
    this.getComment()
  },
  mounted () {},
  watch: {},
  methods: {
    async toggleStatus (row) {
      const { data: { data } } = await this.$http.put(`comments/status?article_id=${row.id}`, { allow_comment: !row.comment_status })
      this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
      row.comment_status = data.allow_comment
    },
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getComment()
    },
    async getComment () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      //   console.log(data)
      this.tableData = data.results
      this.total = data.total_count
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
</style>
