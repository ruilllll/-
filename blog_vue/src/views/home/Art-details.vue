<template>
  <div>
  <div class="artdetails" v-if="content.author">
    <h1 class="title">{{content.title}}</h1>
    <div class="author">
      <div class="left">
        <img src="../../assets/1.jpg" alt="">
        <div class="name">
          <h4>{{content.author.nickname}}</h4>
        <p> {{$dayjs(content.registration).format('YYYY-MM-DD HH:mm:ss')}} 阅读 {{content.readcound}}  评论 {{comment.length}} 喜欢 {{content.collectioncound}}</p>
        </div>
      </div>
      <div class="right">
        <el-tag v-for="(item,index) in content.label"  :key="index"  effect="dark">{{item}}</el-tag>
      </div>
    </div>
    <div class="Richtext">
    <mavon-editor
    :value="handelimgurl(content.html)" :subfield="false" defaultOpen="preview" :toolbarsFlag="false" :boxShadow="false" codeStyle="atom-one-dark-reasonable"
      />
  </div>
    <div class="collection">
      <el-button type="primary" @click="handelcancelFund" v-if="user.fundList.includes(artid)"  plain>⭐已收藏</el-button>
      <el-button type="primary" @click="handelfund" v-else  plain>⭐收藏</el-button>
    </div>
    <div class="commentBox">
      <div class="solid">
        <span class="head el-icon-user-solid"></span>
      </div>
      <el-input
        type="textarea"
        :rows="7"
        placeholder="理智评论"
        v-model="textarea">
      </el-input>
      <el-button class="btn" type="primary" @click="sendComment" round>发布</el-button>
    </div>

    <div class="commentShow"  v-for="(item,index) in comment" :key="index">
      <!-- <h4>暂无评论</h4> -->
      <div class="commentShow-content">
        <img src="../../assets/R-C.png" alt="">
        <div class="usercontent">
          <h6 class="message-user" style="font-size:15px">{{item.userid.nickname}}</h6>
      <p class="message-content">{{item.textarea}}</p>
      <span class="messagr-time" style="color:#aaa">{{$dayjs(item.registration).format('YYYY-MM-DD HH:mm:ss')}}</span>
        </div>
      </div>

      <div class="floor">#{{index + 1}}</div>
    </div>
  </div>
  <div v-else>
    <el-empty description="描述文字" v-if="iskong"></el-empty>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      iskong: false,
      content: '',
      textarea: '',
      artid: '',
      comment: ''
    }
  },
  created () {
    this.artid = this.$route.query.id
    this.getArtdetaildata()
    this.getCommentDate()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 取消用户收藏
    async handelcancelFund () {
      const { data } = await this.$http.delete('/api/user/fundlist', {
        params: {
          artid: this.artid,
          userid: this.user._id
        }
      })
      if (data.code !== 200) return this.$message.error('取消失败')
      this.$message.success('取消成功')
      this.$store.dispatch('a_updataUser')
      this.getArtdetaildata()
    },
    // 上传用户收藏
    async handelfund () {
      if (!this.user) {
        this.$message.error('未登录，请先登录')
        return
      }
      const { data } = await this.$http.put('/api/user/fundlist', {
        artid: this.artid,
        userid: this.user._id
      })
      if (data.code !== 200) return this.$message.error('收藏失败')
      this.$message.success('收藏成功')
      this.$store.dispatch('a_updataUser')
      this.getArtdetaildata()
      // this.user.fundList = data.fundList
      // this.$store.commit('m_upuaerdata', this.user)
      // console.log(this.user)
      // console.log(this.$store.state.user)
    },
    // 上传评论
    async sendComment () {
      const { data } = await this.$http.post('/api/comments', {
        artid: this.artid,
        userid: this.user._id,
        textarea: this.textarea
      })
      console.log(data)
      if (!data.code === 200) return this.$message.error('评论失败')
      this.$message.success('评论成功')
      this.getCommentDate()
      this.textarea = ''
    },
    // 请求数据渲染评论
    async getCommentDate () {
      const { data } = await this.$http.get(`/api/commentdata?artid=${this.artid}`)
      this.comment = data.data
    },
    // 处理富文本内陆片路径
    handelimgurl (content) {
      return content.replace(/\\upload/g, `${this.$currentimgurl}/upload`)
    },
    // 请求数据渲染文章内容
    async getArtdetaildata () {
      const { data } = await this.$http.post('/api/artdetail', {
        artid: this.artid
      })
      if (data.code === 200) {
        this.artid = data.data._id
        this.content = data.data
      } else {
        this.iskong = true
      }
    }
  }
}
</script>

<style>
.markdown-body pre{
  padding: 0 !important;
}
.v-show-content{
  background-color: #fff !important;
}
</style>
<style  scoped>
.commentShow{
  display: flex;
  justify-content: space-between;
  padding: 40px;
  border-bottom: 1px solid rgb(162, 161, 161);
}

.commentShow-content{
  margin-left: 15px;
  display: flex;
  justify-content: space-between;
}
.usercontent{
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.commentShow-content img{
  width: 70px;
  height: 70px;
}
.v-note-wrapper {
  border: none;
}
.artdetails{
  margin-left: -102px;
  padding-bottom: 200px;
}
.title{
  margin: 100px auto;
  text-align: center;
}
.author{
  margin-bottom: 50px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
}
.author .left{
  display:flex
}
.author .left img{
  width: 60px;
}
.author .left .name{
  margin-left: 10px;
}
.author .left .name p{
  font-size:12px;
  color: #777;
  margin-top:20px
}
.author .right{
  width: 40px;
  height: 40px;
  margin-top: 9px;
}
.Richtext{
  width: 100%;
}
.collection{
  margin: 70px 0 0 0;
  padding-bottom: 70px;
  text-align: center;
  border-bottom:1px solid #aaa;
}
.commentBox{
  position: relative;
  margin: 50px 0 30px 0;
  display: flex;
  justify-content: space-between;
}
.commentBox .solid{
  width: 65px;
  height: 60px;
  border-radius: 50%;
  background-color: #aaa;
  text-align: center;
  line-height: 75px;
  margin-right: 8px;
}
.commentBox .solid .head{
  font-size: 40px;
}
.commentBox .btn{
position: absolute;
right: 50px;
bottom:20px
}
</style>
