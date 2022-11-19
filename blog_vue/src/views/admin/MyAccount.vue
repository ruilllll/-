<template>
  <div>
    <el-descriptions class="margin-top" title="个人信息" :column="3" :size="size">
    <template slot="extra">
      <el-button type="primary" @click="open" size="small">操作</el-button>
    </template>
    <el-descriptions-item label="昵称">{{form.nickname}}</el-descriptions-item>
    <el-descriptions-item label="账号">{{form.account}}</el-descriptions-item>
  </el-descriptions>
          <el-drawer
          title="修改信息"
          :visible.sync="drawer"
          :direction="direction">
            <div class="formBox">
              <el-form :label-position="labelPosition" label-width="80px"  :model="form" :rules="rules" ref="form">
              <el-form-item label="昵称" prop="name">
                <el-input v-model="form.nickname"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" autocomplete="off"></el-input>
              </el-form-item>
              </el-form>
              <div class="btn">
                <el-button type="info" round @click="down">取消</el-button>
            <el-button type="success" round @click="sendForm">确认</el-button>
              </div>
            </div>
          </el-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'top',
      drawer: false,
      direction: 'rtl',
      size: '',
      form: {
        nickname: '',
        account: '',
        password: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  async created () {
    this.id = this.$store.state.user._id
    const data = await this.$http.get(`/api/User?id=${this.id}`)
    this.form = data.data.user
  },
  methods: {
    async sendForm () {
      if (this.form.nickname === '') return this.$message.error('请填写昵称')
      await this.$http.put('/api/user', {
        id: this.id,
        form: this.form
      })
      this.drawer = false
    },
    open () {
      this.drawer = true
    },
    down () {
      this.drawer = false
    }
  }
}
</script>

<style>
.formBox .el-input__inner{
  width: 300px !important;
}
.formBox .el-form-item__label{
  margin-left: 30px;
}
.el-form-item--small .el-form-item__error{
  margin-left: 75px;
}
</style>
<style scoped>
  .formBox{
    text-align: center;
  }
  .formBox .btn{
    width: 60%;
    margin: 40px auto;
  }
  .formBox .btn{
    display: flex;
    justify-content: space-between;
  }
</style>
