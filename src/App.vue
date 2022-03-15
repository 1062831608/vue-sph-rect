<template>
  <div id="app">
    <Header></Header>
<!--    路由组件出口-->
    <router-view></router-view>
    <Footer v-show="$route.meta.footerIsShow"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header"; // 头部组件
import Footer from "@/components/Footer"; // 尾部组件

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    this.$store.dispatch('home/getcatelist') // 获取三级分类页的数据,只会执行一次
  }
}
</script>

<style>

</style>
