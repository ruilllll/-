<template>
  <div class="search">
    <div class="left">
      <el-input
    placeholder="请输入内容"
    prefix-icon="el-icon-search"
    v-model="searchvalue"
    @input="getvalue">
  </el-input>
    </div>
    <div class="right">
      <slot name="adduser"></slot>
    </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      searchvalue: ''
    }
  },
  methods: {
    getvalue (value) {
      this.$emit('search', value)
    }
  }

}
</script>
<style  scoped>
.search{
  height: 40px;
}
.left{
  width: 350px;
  float: left;
}
.right{
  width: 100px;
  float: right;
  margin-right: 100px;
}

</style>
