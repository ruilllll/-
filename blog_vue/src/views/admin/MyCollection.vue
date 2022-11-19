<template>
  <div>
   <MySearch @search="handelsearch">
   </MySearch>
   <MyTable :list="userList" :label="userlabel">
     <template #operation="{data}">
       <el-button @click="godetails(data._id)"  type="primary" icon="el-icon-view" circle></el-button>
       <el-popconfirm title="删除不可找回，请确认" @confirm="deleteUser(data._id)">
        <el-button slot="reference"  type="danger" icon="el-icon-delete" circle></el-button>
      </el-popconfirm>
     </template>
   </MyTable>
   <MyPage @PageChange="handleData" :total="total"></MyPage>
  </div>
 </template>

<script>
import MySearch from '../../components/MySearch.vue'
import MyTable from '../../components/MyTable.vue'
import MyPage from '../../components/MyPage.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      userlabel: [
        { prop: 'title', label: '标题' },
        { prop: 'label', label: '标签' },
        { prop: 'registration', label: '发布时间' },
        { prop: 'readcound', label: '阅读' },
        { prop: 'collectioncound', label: '收藏' },
        { prop: 'reviewcount', label: '评论' }
      ],
      userList: [],
      total: '',
      currentPage: 1,
      currentSize: 5,
      currentSearch: ''
    }
  },
  components: {
    MySearch,
    MyTable,
    MyPage
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async deleteUser (id) {
      const { data } = await this.$http.delete(`/api/user/fundlist?artid=${id}&userid=${this.user._id}`)
      if (data.code !== 200) return this.$message.error('删除失败，请重试')
      this.$message.success('删除成功')
      this.getUserData(this.currentPage, this.currentSize)
    },
    godetails (id) {
      window.open(location.origin + '/#' + '/home/artdetails?id=' + id)
    },
    handelsearch (value) {
      this.currentSearch = value
      this.getUserData(1, 5, value)
      this.$bus.$emit('resePage')
    },
    async getUserData (page = 1, size = 5, search = '') {
      const { data } = await this.$http.get('/api/fundlist', {
        params: {
          userid: this.$store.state.user._id,
          page,
          size,
          search
        }
      })
      this.userList = data.list
      console.log(this.userList)
      this.total = data.total
    },
    handleData ({ page, size }) {
      this.currentPage = page
      this.currentSize = size
      this.getUserData(page, size, this.currentSearch)
    }
  },
  created () {
    this.getUserData()
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
