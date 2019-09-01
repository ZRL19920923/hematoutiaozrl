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
  // 问题当从修改文章点击进去的时候 在点击侧边栏中的发布文章 页面不更新
  // 解决方法 添加侦听器 watch  它可以监听vue实例中所有的数据变化 包括 $route.query.id
  watch: {
    // 此处不能用箭头函数 因为有this指向问题 监听函数有另两个参数 newVal , oldVal
    '$route.query.id': function (newVal, oldVal) {
      // 此处重置表单数据 重新响应页面 不能直接让表单数据等于null或空''  因为取里面的对象数据会报错
      // 若有不正常用户选择回退 则可以另当处理
      if (newVal) {
        // 判断业务articleId 存在修改  不存在 发表
        this.articleId = this.$route.query.id
        if (this.articleId) {
          // 获取数据 填充表单
          this.getArticle()
        }
        return false
      }
      this.articleForm = {
        cover: {
          type: 1,
          images: []
        },
        content: null,
        channel_id: null,
        title: null
      }
      // 清空页面id
      this.articleId = null
    }
  },
  methods: {
    async update (draft) {
      await this.$http.put(
        `articles/${this.articleId}?draft=${draft}`,
        this.articleForm
      )
      // 提示信息
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      this.$router.push('/article')
    },
    async getArticle () {
      const {
        data: { data }
      } = await this.$http.get('articles/' + this.articleId)
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
