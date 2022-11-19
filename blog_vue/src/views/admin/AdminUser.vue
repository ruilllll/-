<template>
 <div>
  <MySearch @search="handelsearch">
    <template #adduser>
      <el-button type="success" @click="drawer = {flag:true,type:0}">添加用户</el-button>
    </template>
  </MySearch>
  <MyTable :list="userList" :label="userlabel">
    <template #operation="{data}">
      <el-button @click="openEdit(data)"  type="primary" icon="el-icon-edit" circle></el-button>
      <el-popconfirm title="删除此用户会同步删除用户的文章，请确认！" @confirm="deleteUser(data._id)">
        <el-button slot="reference"  type="danger" icon="el-icon-delete" circle></el-button>
      </el-popconfirm>
    </template>
  </MyTable>
  <MyPage @PageChange="handleData" :total="total"></MyPage>
<!-- //添加和修改用户 -->
    <el-drawer
  :title="drawer.type == 0? '添加用户' : '修改用户'"
  :visible.sync="drawer.flag">
  <div class="drawer">
    <el-form  ref="form" label-width="80px" :model="form">
             <el-form-item label="昵称：" >
               <el-input prefix-icon="el-icon-microphone" v-model="form.nickname"></el-input>
             </el-form-item>
             <el-form-item label="账号：">
               <el-input prefix-icon="el-icon-user" v-model="form.account"></el-input>
             </el-form-item>
             <el-form-item label="密码：">
               <el-input prefix-icon="el-icon-lock" v-model="form.password" show-password></el-input>
             </el-form-item>
             <el-form-item label="角色：">
              <el-select v-model="form.rights" placeholder="请选择">
               <el-option
                 label="管理员"
                 :value="0">
               </el-option>
               <el-option
                 label="普通用户"
                 :value="1">
               </el-option>
              </el-select>
             </el-form-item>
             <el-button class="adduserBtn" type="primary" @click="AddUser(form)">
              {{drawer.type == 0? '添加用户' : '修改用户'}}
              </el-button>
        </el-form>

        </div>
    </el-drawer>

 </div>
</template>

<script>
import MySearch from '../../components/MySearch.vue'
import MyTable from '../../components/MyTable.vue'
import MyPage from '../../components/MyPage.vue'
export default {
  data () {
    return {
      userlabel: [
        { prop: 'nickname', label: '昵称' },
        { prop: 'account', label: '账号' },
        { prop: 'registration', label: '注册时间' },
        { prop: 'rights', label: '用户权限' }
      ],
      form: {
        nickname: '',
        account: '',
        password: '',
        rights: 1
      },
      userList: [],
      size: '',
      page: '',
      total: '',
      drawer: {
        type: 0,
        flag: false
      },
      direction: 'rtl',
      currentPage: 1,
      currentSize: 5
    }
  },
  components: {
    MySearch,
    MyTable,
    MyPage
  },
  methods: {
    handelsearch (value) {
      this.currentSearch = value
      this.getUserData(1, 5, value)
      this.$bus.$emit('resePage')
    },
    async deleteUser (id) {
      const { data } = await this.$http.delete(`/api/user?id=${id}`)
      if (data.code !== 200) return this.$message.error('删除失败，请重试')
      this.$message.success('删除成功')
      this.getUserData(this.currentPage, this.currentSize)
    },
    async getUserData (page = 1, size = 5, search = '') {
      const { data } = await this.$http.get(`/api/usertable?page=${page}&size=${size}&search=${search}`)
      this.userList = data.user
      this.total = data.total
    },
    handleData ({ page, size }) {
      this.currentPage = page
      this.currentSize = size
      this.getUserData(page, size, this.currentSearch)
    },
    openEdit (user) {
      this.accountId = user._id
      console.log(this)
      this.form = {
        nickname: user.nickname,
        account: user.account,
        password: user.password,
        rights: user.rights
      }
      this.drawer = { flag: true, type: 1 }
    },

    async AddUser () {
      if (this.drawer.type === 0) {
        // 添加用户
        const { data } = await this.$http.post('/api/user', this.form)
        if (data.code !== 200) return this.$message.error(data.msg ? data.msg : '添加异常，请重试')
        this.$message.success('添加成功')
      } else {
        // 修改用户
        const { data } = await this.$http.put('/api/user', {
          form: this.form,
          id: this.accountId
        })
        if (data.code !== 200) return this.$message.error(data.msg ? data.msg : '修改异常，请重试')
        this.$message.success('修改成功')
      }
      this.form = {
        nickname: '',
        account: '',
        password: '',
        rights: 1
      }
      this.drawer.flag = false
      this.getUserData(this.currentPage, this.currentSize)
    }
  },
  created () {
    this.getUserData(1, 5)
  }
}
</script>

<style>
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
