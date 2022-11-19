<template>
  <div>
    <div class="artlist infinite-list"  v-infinite-scroll="load">
      <div class="listbox infinite-list-item" v-for="(item) in list" :key="item._id">
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
  props: ['list'],
  methods: {
    load () {
      this.$emit('ArtPage')
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
