<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>


export default {
  created(){
    // 進網站就先打這隻 api 取得網站 config 沒有權限問題
    this.$store.dispatch('getWebSiteConfig')
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
