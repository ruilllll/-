<template>
<div class="home">
<div class="header" :key="a">
<div class="w">
  <!-- //网站名字 -->
  <div class="logotext">
    <h1>Star</h1>
    </div>
    <!-- //heard板块 -->
  <div class="menu">
              <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            :router="true"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="/home/new"> <span class="el-icon-watch-1"></span> 最新</el-menu-item>
            <el-menu-item index="/home/hot"> <span class="el-icon-sunny"></span> 热门</el-menu-item>
            <el-menu-item index="/home/all"> <span class="el-icon-notebook-2"></span> 总览</el-menu-item>
            <el-menu-item index="/home/message"> <span class="el-icon-chat-dot-round"></span> 留言</el-menu-item>
            <el-menu-item index="/home/about"> <span class="el-icon-view"></span> 关于</el-menu-item>
            <el-menu-item index="/home/setting"> <span class="el-icon-setting"></span> 后台</el-menu-item>
          </el-menu>
    </div>
     <!-- //登陆注册板块 -->
  <div class="login">
    <div class="left">
      <el-input size="mini" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="inputvalue" >
  </el-input>
    </div>
    <div class="right">
      <template v-if="token">
        <el-button type="danger" size="mini" @click="handellogout">退出</el-button>
        <span class="nickname">{{user.nickname}}</span>
      </template>
      <template v-else>
        <el-button type="primary" size="mini" @click="handelLogin">登录</el-button>
      <el-button type="success" size="mini" @click="handelReg">注册</el-button>
      </template>
    </div>
  </div>
  <!-- //login、标签板块 -->
  <div class="sidebar" v-if="!$route.path.includes('setting')">
    <div class="logoImg">
      <img src="../assets/2.png" alt="">
      <div class="smallstar">
        <div class="el-icon-star-off"></div>
      <div class="el-icon-star-off"></div>
      <div class="el-icon-star-off"></div>
      <div class="el-icon-star-off"></div>
      <div class="el-icon-star-off"></div>
      </div>
      <h4>A single spark can start a prairie fire</h4>
    </div>
    <!-- //文章标签 -->
    <div class="labelbox">
      <h4>文章标签</h4>
      <div class="tag">
        <template v-for="(item,index) in labellist">
          <el-tag @click="changetag(item)" :key="item" v-if="index % 2 === 0"      type="success" effect="dark"> {{ item }} </el-tag>
          <el-tag @click="changetag(item)" :key="item" v-else-if="index % 3 === 0" type="info"    effect="dark"> {{ item }} </el-tag>
          <el-tag @click="changetag(item)" :key="item" v-else-if="index % 5 === 0" type="danger"    effect="dark"> {{ item }} </el-tag>
          <el-tag @click="changetag(item)" :key="item" v-else                      type="warning"  effect="dark"> {{ item }} </el-tag>
        </template>
      </div>
    </div>
    <!-- //毒鸡汤 -->
    <div class="PoisonChicken">
      <h4>毒鸡汤</h4>
      <span v-if="writing">{{writing}}</span>
      <span v-else>
        <p  class="el-icon-loading"></p>
        <h5>玩命加载中</h5>
      </span>
    </div>
  </div>
</div>
</div>
<!-- //后台板块 -->
<div class="main w">
<div class="textlist" v-if="!$route.path.includes('setting')">
  <router-view></router-view>
</div>
<div class="setting" v-else>
  <router-view></router-view>
</div>
</div>
<!-- //注册的弹窗盒子 -->
     <el-dialog
       :title="formType == 1 ? '注册' : '登录'"
       :visible.sync="dialogVisible"
       :close-on-click-modal=false
       width="30%"
       >
       <span slot="footer" class="dialog-footer">

        <el-form :label-position="labelPosition" ref="form" label-width="80px" :rules="rules" :model="form">
             <el-form-item label="昵称" prop="nickname" v-if="formType == 1">
               <el-input prefix-icon="el-icon-microphone" v-model="form.nickname"></el-input>
             </el-form-item>
             <el-form-item label="账号" prop="account">
               <el-input prefix-icon="el-icon-user" v-model="form.account"></el-input>
             </el-form-item>
             <el-form-item label="密码" prop="password">
               <el-input prefix-icon="el-icon-lock" v-model="form.password" show-password></el-input>
             </el-form-item>
        </el-form>
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="handelOK(form)">确 定</el-button>
       </span>
     </el-dialog>
     <el-backtop></el-backtop>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HomeView',
  data () {
    return {
      formType: '0', // 1代表注册，2代表登录
      dialogVisible: false,
      activeIndex: '1',
      inputvalue: '',
      writing: '',
      labelPosition: 'top',
      a: 1,
      form: {
        nickname: '',
        account: '',
        password: ''
      },
      rules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      },
      // labelitems: [
      //   { type: '', label: '标签一' },
      //   { type: 'success', label: '标签二' },
      //   { type: 'info', label: '标签三' },
      //   { type: 'danger', label: '标签四' },
      //   { type: 'warning', label: '标签五' }
      // ],
      labellist: []
    }
  },
  components: {
  },
  async created () {
    // 获取文章标签数据
    const res = await this.$http.get('/api/art/tag')
    this.labellist = res.data.label
    const { data, status } = await this.$http.get('/api/text')
    if (status !== 200) {
      this.writing.innerHTML = '数据错误,请稍后重试'
    }
    this.writing = data.data
    this.$route.path.includes('/home/setting') ? this.activeIndex = '/home/setting' : this.activeIndex = this.$route.path
  },
  computed: {
    ...mapState(['user', 'token'])
  },
  watch: {
    // 监听搜索
    inputvalue (value) {
      this.$store.commit('m_search', value)
      if (this.$route.path.includes('/home/new')) return
      this.activeIndex = '/home/new'
      this.a++
      this.$router.push('/home/new')
    }
  },
  methods: {
    // 点击标签查看所属文章
    changetag (value) {
      const path = '/home/taglist/' + value
      if (this.$route.path === path) return
      this.$router.push(path)
    },
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
    },
    handellogout () {
      this.$store.commit('m_login', {
        user: '',
        token: ''
      })
      // 页面切换到最新
      this.$router.push('/home/new')
      this.activeIndex = '/home/new'
    },
    handelReg () {
      this.formType = 1
      this.dialogVisible = true
    },
    handelLogin () {
      this.formType = 2
      this.dialogVisible = true
    },
    handelOK () {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return

        if (this.formType === 1) {
          // 注册
          const { data } = await this.$http.post('/api/user', this.form)
          if (data.code !== 200) return this.$message.error(data.msg ? data.msg : '注册异常，请重试')
          this.$message.success('注册成功')
          this.form = {
            nickname: '',
            account: '',
            password: ''
          }
        } else {
          // 登录
          delete this.form.nickname
          const { data } = await this.$http.post('/api/login', this.form)
          if (data.code !== 200) return this.$message.error(data.msg ? data.msg : '登录异常，请重试')
          this.$message.success('登录成功')
          this.$store.commit('m_login', data)
          this.form = {
            nickname: '',
            account: '',
            password: ''
          }
        }
        this.dialogVisible = false
      })
    }
  }
}
</script>
<style>
.el-dialog__body{
  padding: 0 20px;
}
.el-form--label-top .el-form-item__label{
  float: left;
}
.el-dialog__header{
  margin-left:175px;
}
</style>
<style scoped>
.nickname{
  position: relative;
  top: 0;
  left: 1000px;
  opacity: 0;
  color: aliceblue;
  white-space: nowrap;
  animation: fall 0.5s linear forwards;
}
@keyframes fall{
  100%{
    opacity: 1;
    left:10px
  }
}
.PoisonChicken{
  text-align: center;
  margin-top: 10px;
}
.PoisonChicken h4{
  margin-bottom: 20px;
}
.el-tag{
  margin: 8px 8px;
  cursor: pointer;
}
.tag{
  padding: 10px 20px;
}
.labelbox{
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.labelbox h4{
  text-align: center;
  margin-top: 10px;
}
.el-icon-star-off{
  /* width: 100px;
  height: 100px; */
  animation: move 2s linear infinite;
}
@keyframes move{
  0%{-webkit-transform:rotate(0deg);
  color: rgb(231, 241, 155);}
    25%{-webkit-transform:rotate(90deg);
    color: rgb(162, 219, 129);}
    50%{-webkit-transform:rotate(180deg);
    color: rgb(91, 203, 162);}
    75%{-webkit-transform:rotate(270deg);
    color: rgb(162, 219, 129);}
    100%{-webkit-transform:rotate(360deg);
    color: rgb(231, 241, 155);}
}
.logoImg img{
  width: 80px;
  height: 80px;
}
.logoImg{
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.sidebar{
  width: 370px;
  height: 400px;
  position: absolute;
  right: 30px;
}
.textlist{
  width: 650px;
  height: 300px;
  margin-left: 200px;
  margin-top: 60px;
}
.setting{
  margin-left: 100px;
  margin-top: 60px;
}
.header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: rgb(84, 92, 100);
  z-index: 2000;
}
.w{
  max-width: 1300px;
  min-width: 1250px;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
.menu{
  margin:0 400px 0 200px ;
}
.logotext{
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 60px;
}
.logotext h1{
  color: darkgrey;
  text-align: center;
  line-height: 60px;
  font-size: 30px;
  font-weight: normal;
  margin-left: 100px;
}
.login{
  position: absolute;
  top: 0;
  right: 20px;
  width: 400px;
  height: 60px;
}
.login .left{
  width: 240px;
  float: left;
  margin-top: 16px;
}
.login .right{
  width: 155px;
  float: right;
  margin-left: 5px;
  margin-top: 16px;
}
</style>
