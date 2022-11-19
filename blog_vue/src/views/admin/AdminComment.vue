<template>
  <div>
   <MyTable :list="userList" :label="userlabel">
     <template #operation="{data}">
       <el-button   type="primary" icon="el-icon-view" @click="open(data.textarea)" circle></el-button>
       <el-popconfirm title="删除不可找回，请确认！" @confirm="deleteUser(data._id)">
         <el-button slot="reference"  type="danger" icon="el-icon-delete" circle></el-button>
       </el-popconfirm>
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
      userlabel: [
        { prop: 'registration', label: '日期' },
        { prop: 'userid.nickname', label: '发布人' },
        { prop: 'artid.title', label: '所属文章' },
        { prop: 'textarea', label: '评论内容' }
      ],
      userList: [],
      total: '',
      currentPage: 1,
      currentSize: 5
    }
  },
  components: {
    MyTable,
    MyPage
  },
  methods: {
    open (data) {
      this.$alert(data, '留言内容', { confirmButtonText: '确定' })
    },
    async deleteUser (id) {
      const { data } = await this.$http.delete(`/api/comment?id=${id}`)
      if (data.code !== 200) return this.$message.error('删除失败，请重试')
      this.$message.success('删除成功')
      this.getUserData(this.currentPage, this.currentSize)
    },
    async getUserData (page = 1, size = 5) {
      const { data } = await this.$http.get(`/api/commentsData?page=${page}&size=${size}`)
      this.userList = data.user
      this.total = data.total
    },
    handleData ({ page, size }) {
      this.currentPage = page
      this.currentSize = size
      this.getUserData(page, size)
    }
  },
  created () {
    this.getUserData(1, 5)
  }
}
</script>

 <style>
 .el-button--primary{
  margin-right: 10px;
 }
 .el-popconfirm__main{
   margin-bottom: 10px;
 }
 .el-popconfirm{
   background-color: #fff;
   box-shadow: 0 0 3px 2px #ccc;
 }
 .drawer{
   width: 90%;
   margin: auto;
 }
 .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
   margin-bottom: 50px;
 }
 .adduserBtn{
   margin-left: 170px;
 }
 </style>
