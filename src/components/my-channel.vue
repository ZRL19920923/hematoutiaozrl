<template>
  <el-select @change="changeChannel" clearable :value="value" placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
    //   value: null,
      channelOptions: []
    }
  },
  computed: {},
  created () {
    this.getChannelOptions()
  },
  mounted () {},
  watch: {},
  methods: {
    changeChannel (id) {
      if (id === '')id = null
      this.$emit('input', id)
    },
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      // console.log(data)
      this.channelOptions = data.channels
    }

  },
  components: {}
}
</script>

<style scoped lang="less">
</style>
