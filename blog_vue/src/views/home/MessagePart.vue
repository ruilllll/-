<template>
  <div class="messageBox">
    <el-input v-model="form.email" placeholder="请输入邮箱(必填)" prefix-icon="el-icon-message"></el-input>
    <el-input v-model="form.name" placeholder="请输入名称" prefix-icon="el-icon-user"></el-input>
    <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="el-icon-phone-outline"></el-input>
    <el-input
      type="textarea"
      :rows="10"
      placeholder="请输入内容(必填)"
      v-model="form.textarea">
    </el-input>
    <el-button @click="sendData" type="primary" round>提交</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        phone: '',
        textarea: ''
      }
    }
  },
  methods: {
    async sendData () {
      const { data } = await this.$http.post('/api/message', this.form)
      if (!data.code === 200) return this.$message.error('留言失败')
      this.$message.success('留言成功')
      this.form = {
        email: '',
        name: '',
        phone: '',
        textarea: ''
      }
    }
  }
}
</script>

<style  scoped>
.el-button{
  width: 100%;
  height: 40px;
  margin-top: 20px;
}
.messageBox{
  width: 500px;
  margin-top: 100px;
}
.el-input{
  margin-bottom: 20px;
}
.el-input--medium .el-input__inner{
  height: 45px;
  line-height: 45px;
}
</style>
