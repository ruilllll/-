<template>
  <div>
    <MyTable :list="datalist" :label="datalabel">
      <template #operation="{data}">
      <el-button type="primary" icon="el-icon-view" @click="open(data.textarea)" circle></el-button>
      <el-button @click="deletemessage(data._id)" type="danger" icon="el-icon-delete" circle></el-button>
    </template>
    </MyTable>
    <MyPage @PageChange="handleData" :total="total"></MyPage>
  </div>
</template>

<script>
import MyTable from '../../components/MyTable.vue'
import MyPage from '../../components/MyPage.vue'
export default {
  data () {
    return {
      datalist: [],
      datalabel: [
        { prop: 'email', label: '邮箱' },
        { prop: 'name', label: '留言人' },
        { prop: 'phone', label: '手机号' },
        { prop: 'textarea', label: '留言' }
      ],
      currentPage: '',
      currentSize: '',
      total: ''
    }
  },
  components: {
    MyTable,
    MyPage
  },
  created () {
    this.getMessageData()
  },
  methods: {
    open (data) {
      this.$alert(data, '留言内容', { confirmButtonText: '确定' })
    },
    // 处理分页的函数
    handleData ({ page, size }) {
      this.currentPage = page
      this.currentSize = size
      this.getMessageData(page, size, this.currentSearch)
    },
    // 渲染列表
    async getMessageData (page = 1, size = 5) {
      const { data } = await this.$http.get(`/api/messagedata?page=${page}&size=${size}`)
      this.datalist = data.data
      this.total = data.total
    },
    // 删除留言
    async deletemessage (id) {
      const { data } = await this.$http.delete(`/api/message?id=${id}`)
      if (data.code !== 200) return this.$message.error('删除失败，请重试')
      this.$message.success('删除成功')
      this.getMessageData(this.currentPage, this.currentSize)
    }
  }
}
</script>

<style>
.el-table .cell{
  white-space: nowrap
}
</style>
