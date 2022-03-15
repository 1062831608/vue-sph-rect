<template>
  <!-- 项目的最外层 -->
  <div class="outer">
    <type-nav></type-nav>
    <!-- 窗口侧边栏 -->
   <Toolbar></Toolbar>

    <!-- 主要内容区域 -->
    <con-section></con-section>

    <!-- 内容详情页 -->
    <product-detail></product-detail>

    <!-- 猜你喜欢 -->
    <detail-like></detail-like>

<!--    底部-->
    <Footer></Footer>
  </div>
</template>

<script>
import Toolbar from './Toolbar' // 窗口侧边栏
import ConSection from './ConSection' // 主要内容区域
import ProductDetail from './ProductDetail' // 内容详情页面
import DetailLike from './DetailLike'  // 猜你喜欢页面

export default {
  name: "Detail",
  components:{
    Toolbar,
    ConSection,
    ProductDetail,
    DetailLike
  },
  mounted() {
    // 跳转是将id传给vuex 中的detail模块
   this.$store.dispatch('detail/getListDetailData', this.$route.params.skuId)
  }
}
</script>

<style scoped lang="less">
.outer{

}

</style>
