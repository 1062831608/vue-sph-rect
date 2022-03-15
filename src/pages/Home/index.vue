<template>
  <div>
<!--    使用全局组件，三级联动组件-->
    <type-nav></type-nav>
<!--    轮播图和尚品汇快报组件-->
    <list-container></list-container>
<!--    今日推荐组件-->
    <today-recommend></today-recommend>
<!--    热卖排行组件-->
    <Rank></Rank>
<!--    猜你喜欢模块-->
    <Like></Like>
<!--    引入楼层模块-->
    <Floor v-for="floor in floorList"
           :key="floor.id"
           :floorData="floor"
    ></Floor>
<!--    品牌-->
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer' // 引入轮播图和尚品汇快报组件
import TodayRecommend from '@/pages/Home/TodayRecommend' // 引入今日推荐组件
import Rank from '@/pages/Home/Rank' // 引入热卖排行组件
import Like from '@/pages/Home/Like' // 引入猜你喜欢模块
import Floor from '@/pages/Home/Floor' // 引入楼层模块
import Brand from '@/pages/Home/Brand' // 引入品牌模块
import {mapState} from 'vuex'
export default {
  name: "Home",
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    this.$store.dispatch('home/getFloorList')
  },
  computed:{
    ...mapState('home',['floorList'])
  }
}
</script>

<style scoped>

</style>
