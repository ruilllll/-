<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 3, 2, 1]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total - 0">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ['total'],
  data () {
    return {
      currentPage: 1,
      currentSize: 5
    }
  },
  methods: {
    handleSizeChange (val) {
      // 每页几个
      this.currentSize = val
      this.emitPagechange()
    },
    handleCurrentChange (val) {
      // 跳过几个
      this.currentPage = val
      this.emitPagechange()
    },
    emitPagechange () {
      this.$emit('PageChange', {
        size: this.currentSize,
        page: this.currentPage
      })
    }
  },
  created () {
    this.$bus.$on('resePage', () => {
      this.currentPage = 1
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
