<template>
  <div>
    <ArtList :list="textlist" @ArtPage="handelArtPage"></ArtList>
    <div class="load demo-input-suffix">
      <p v-if="this.datalist != 0">
        <span>正在加载</span>
        <span class="el-icon-loading"></span>
      </p>
      <p v-else>
        <span>我也是有底线的</span>
      </p>
    </div>
  </div>
</template>

<script>
import ArtList from '../../components/home/ArtList.vue'
export default {
  components: {
    ArtList
  },
  data () {
    return {
      textlist: [],
      page: 0,
      datalist: []
    }
  },
  methods: {
    async getTextData (page = 1, size = 5, search = '', sort = 'hot') {
      if (this.datalist === 0) return
      const { data } = await this.$http.get(`/api/texttable?page=${page}&size=${size}&search=${search}&sort=${sort}`)
      this.datalist = data.text.length
      this.textlist = [...this.textlist, ...data.text]
    },
    handelArtPage () {
      this.page++
      this.getTextData(this.page, 5)
    }
  },
  created () {

  }
}
</script>

<style  scoped>
.load{
  font-size: 16px;
  text-align: center;
  margin-top:20px ;
}
</style>
