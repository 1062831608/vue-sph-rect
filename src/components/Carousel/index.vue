<template>
  <div class="swiper-container" >
    <div class="swiper-wrapper">
      <div class="swiper-slide"
           v-for="l in list"
           :key="l.id"
      >
        <img :src="l.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "Carousel",
  props:['list'], // 接收轮播图数据
  watch:{
    list: {
      handler() {
        this.$nextTick(()=>{
          // 配置Swiper
          new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            autoplay: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
