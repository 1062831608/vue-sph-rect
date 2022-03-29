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
  async mounted() {
    this.$store.dispatch('home/getcatelist') // 获取三级分类页的数据,只会执行一次
  }
}
</script>

<style>
@font-face {
  font-family: 'iconfont';  /* Project id 2681264 */
  src: url('https://at.alicdn.com/t/font_2681264_xs5e14oihkf.woff2?t=1647759228854') format('woff2'),
  url('https://at.alicdn.com/t/font_2681264_xs5e14oihkf.woff?t=1647759228854') format('woff'),
  url('https://at.alicdn.com/t/font_2681264_xs5e14oihkf.ttf?t=1647759228854') format('truetype');
}

</style>
