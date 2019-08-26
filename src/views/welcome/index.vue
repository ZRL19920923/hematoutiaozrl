<template>
    <div style="text-align:center;">
        <img src="../../assets/images/welcome.jpg" alt="">
    </div>
</template>

<script>
export default {
  props: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  created () {
    this.$http.get('articles')
      .then(res => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  mounted () {

  },
  watch: {

  },
  methods: {

  },
  components: {

  }
}
</script>

<style scoped lang="less">
    img {
      text-align: center;
    }
</style>
