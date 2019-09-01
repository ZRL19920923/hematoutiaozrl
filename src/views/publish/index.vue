<template>
  <div class="article-container">
    <el-card>
      <div slot="header">
        <my-bread>{{articleId ? '修改' : '发布'}}文章</my-bread>
      </div>
      <el-form label-width="100px">
        <el-form-item label="标题:">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <quillEditor :options="editorOption" v-model="articleForm.content"></quillEditor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 放组件 -->
          <div v-if="articleForm.cover.type===1 ">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type === 3">
            <my-image v-model="articleForm.cover.images[0]" style="display:inline-block;"></my-image>
            <my-image v-model="articleForm.cover.images[1]" style="display:inline-block;"></my-image>
            <my-image v-model="articleForm.cover.images[2]" style="display:inline-block;"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道:">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button type="success" @click="submit(false)">发布文章</el-button>
          <el-button plain @click="submit(true)">存为草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="success" @click="update(false)">修改文章</el-button>
          <el-button plain @click="update(true)">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  props: {},
  data () {
    return {
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      articleForm: {
        cover: {
          type: 1,
          images: []
        },
        content: null,
        channel_id: null,
        title: null

      },
      confirmUrl: null,
      articleId: null
    }
  },
  computed: {},
  created () {
    this.articleId = this.$route.query.id
    if (this.articleId) {
      this.getArticle()
    }
  },
  mounted () {},
  watch: {},
  methods: {
    async update (draft) {
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      // 提示信息
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      this.$router.push('/article')
    },
    async getArticle () {
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      // 提示信息
      this.$message.success(draft ? '存入草稿成功' : '发布成功')
      this.$router.push('/article')
    },
    changeType () {
      this.articleForm.cover.images = []
    }
  },
  components: {
    quillEditor
  }
}
</script>

<style scoped lang="less"></style>
