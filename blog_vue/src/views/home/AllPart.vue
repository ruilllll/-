<template>
  <div style="margin-top:150px">
    <el-timeline>
    <el-timeline-item v-for="(count,k) in artlistobject" :key="k" :timestamp="k" icon="el-icon-time" placement="top">
      <el-card>
        <div class="cardBox"  v-for="item in count" :key="item._id">
          <h4 @click="open(item._id)">{{item.title}}</h4>
        <p>{{$dayjs(item.registration).format('YYYY-MM-DD HH:mm:ss')}}</p>
        </div>
      </el-card>
    </el-timeline-item>
  </el-timeline>
  </div>
</template>

<script>
export default {
  data () {
    return {
      artlistobject: {}
      // arrlist: [],
      // arrobject: {},
      // list: [],
      // listboject: {},
      // artlist: [
      //   { data: '2003-10-02', list: [{ title: '文章1', data: '175444458237' }, { title: '文章2', data: '170963458237' }] },
      //   { data: '2005-10-25', list: [{ title: '文章6', data: '175477458237' }, { title: '文章3', data: '173463458237' }] },
      //   { data: '2022-09-10', list: [{ title: '文章5', data: '175422458237' }, { title: '文章4', data: '179763458237' }] }
      // ]
    }
  },
  methods: {
    open (id) {
      if (this.$store.state.token === null) return this.$message.error('未登录，请先登录')
      window.open(location.origin + '/#' + '/home/artdetails?id=' + id)
    }
  },
  async created () {
    const { data } = await this.$http.get('/api/allArt')
    if (data.code === 200) {
      data.art.forEach(item => {
        const currentMonth = this.$dayjs(item.registration).format('YYYY-MM-DD')
        if (!this.artlistobject[currentMonth]) {
          this.$set(this.artlistobject, currentMonth, [item])
        } else {
          this.artlistobject[currentMonth].push(item)
        }
      })
    } else {
      this.$message.error('出现错误，请重试')
    }
  }
}
</script>

<style>
.el-timeline-item__icon::before{
  font-size: 25px;
  color: rgb(48, 194, 216);
}
.el-timeline-item__timestamp{
  font-size: 24px;
  color: #111 !important;
}
.el-timeline-item__wrapper{
  top:-10px;
}
</style>
<style scoped>
.cardBox h4:hover{
  color:coral
}
.cardBox{
  margin: 10px 0;
}
.cardBox h4{
  margin-bottom: 8px;
  font-weight: 400;
  cursor: pointer;
}
.cardBox p{
font-size: 12px;
color:#ccc
}
</style>
