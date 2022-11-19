<template>
  <div>
    <el-container class="container" style="border: 1px solid #eee">
  <el-aside width="200px">
    <el-menu :router="true" :default-active="activeIndex">
      <template v-if="user && user.rights === 0">
        <el-menu-item index="/home/setting/user"> <span class="el-icon-watch-1"></span> 用户管理</el-menu-item>
      <el-menu-item index="/home/setting/art"> <span class="el-icon-sunny"></span> 文章管理</el-menu-item>
      <el-menu-item index="/home/setting/msg"> <span class="el-icon-notebook-2"></span> 留言管理</el-menu-item>
      <el-menu-item index='/home/setting/comment'> <span class="el-icon-notebook-2"></span> 评论管理</el-menu-item>
      </template>

      <template v-else>
        <el-menu-item index="/home/setting/myaccount"> <span class="el-icon-notebook-2"></span> 我的账户</el-menu-item>
      <el-menu-item index='/home/setting/myCollection'> <span class="el-icon-notebook-2"></span> 我的收藏</el-menu-item>
      </template>
    </el-menu>
  </el-aside>
  <el-container>
    <el-main>
      <div class="content">
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</el-container>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    setTimeout(() => {
      this.activeIndex = this.$route.path
    }, 100)
  }
}
</script>

<style  scoped>
.container{
  height: calc(100vh - 80px);
}
.el-menu{
  height: 100%;
}
.el-main{
  padding-left: 40px;
}
</style>
