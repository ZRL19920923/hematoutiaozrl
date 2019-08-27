<template>
    <div>
        text
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
    this.$http.get('http://127.0.0.1:4000/b')
      .then(res => {
        console.log(res)
      })
      .catch(() => {

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

</style>
