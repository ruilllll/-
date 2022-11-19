<template>
  <div>
    <ArtList :list="textlist" @ArtPage="handelArtPage"></ArtList>
    <div class="load demo-input-suffix">
      <p v-if="isHaver === true">
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
import { mapState } from 'vuex'
export default {
  components: {
    ArtList
  },
  data () {
    return {
      isHaver: true,
      textlist: [],
      page: 0,
      datalist: [],
      currentvalue: '',
      searchTimer: false
    }
  },
  computed: {
    ...mapState(['homeSearchValue'])
  },
  watch: {
    homeSearchValue (value) {
      clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(() => {
        this.page = 1
        this.textlist = []
        this.isHaver = true
        this.getTextData(this.page, 5, value)
      }, 300)
    }
  },
  methods: {
    // searchvalue () {
    //   this.$bus.$on('search', (value) => {
    //     // console.log(value)
    //     this.currentvalue = value
    //     this.getTextData(this.currentvalue)
    //   })
    // },
    async getTextData (page = 1, size = 5, search = '') {
      // if (this.datalist === 0) return
      const { data } = await this.$http.get(`/api/texttable?page=${page}&size=${size}&search=${search}`)
      this.datalist = data.text.length
      if (this.datalist === 0) return (this.isHaver = false)
      this.textlist = [...this.textlist, ...data.text]
    },
    handelArtPage () {
      if (this.isHaver === false) return
      this.page++
      this.getTextData(this.page, 5, this.homeSearchValue)
    }
  },
  created () {
    // this.searchvalue()
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
