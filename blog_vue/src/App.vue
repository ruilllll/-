<template>
  <div id="app">
<router-view ></router-view>
  </div>
</template>
<script>
export default {
  created () {
    this.$store.dispatch('a_updatalogindata')
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
body{
  font-size: 12px;
}
i,
em{
  font-style:normal ;
}
</style>
