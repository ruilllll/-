<template>
  <div>
    <div class="artlist infinite-list" v-infinite-scroll="load">
      <div class="listbox infinite-list-item" v-for="(item) in textlist" :key="item._id">
        <div class="left">
            <h3 class="title" @click="open(item._id)">{{item.title}}</h3>
          <span class="describe">{{item.describe}}</span>
          <p>
          <span><i class="el-icon-view"></i><em>{{item.readcound}}</em></span>
          <span><i class="el-icon-chat-dot-round"></i><em>{{item.reviewcount}}</em></span>
          <span><i class="el-icon-star-off"></i><em>{{item.collectioncound}}</em></span>
          <span><i class="el-icon-time"></i><em>{{$dayjs( item.registration).format('YYYY-MM-DD HH:mm:ss')}}</em></span>
          </p>
        </div>
        <div class="right">
          <img :src="'http://localhost:3000/' + item.currentImgUrl" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      label: '',
      textlist: [],
      isHaver: true,
      page: 0
    }
  },
  created () {
    this.label = this.$route.params.value
    console.log(this.label)
  },
  beforeRouteUpdate (to, form, next) {
    next()
    this.textlist = []
    this.isHaver = true
    this.label = this.$route.params.value
    this.page = 1
    this.getTextData(this.page)
    console.log(this.label)
  },
  methods: {
    async getTextData (page = 1, size = 5, search = '', sort = '') {
      if (this.datalist === 0) return
      const { data } = await this.$http.get(`/api/texttable?page=${page}&size=${size}&search=${search}&sort=${sort}&label=${this.label}`)
      this.datalist = data.text.length
      if (this.datalist === 0) return (this.isHaver = false)
      this.textlist = [...this.textlist, ...data.text]
    },
    load () {
      this.page++
      this.getTextData(this.page)
      // this.$emit('ArtPage')
    },
    open (id) {
      if (this.$store.state.token === null) return this.$message.error('未登录，请先登录')
      window.open(location.origin + '/#' + '/home/artdetails?id=' + id)
    }
  }
}
</script>

<style scoped>
.listbox{
  height: 130px;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom:1px solid #777 ;
}
.left{
  display:flex;
  justify-content: space-between;
  flex-direction: column;
}
.right img{
 height: 130px;
 cursor: pointer;
}
.title{
  font-size: 20px;
  cursor: pointer;
}
.describe{
  margin-top: -20px;
  color: #555;
}
.left p{
  font-size: 12px;
  color: #777;
}
.left p span{
  margin-right:8px ;
}
.left p span i{
  margin-right:4px ;
}
</style>
