<template>
  <div class="swiper specScroll">
    <div class="swiper-wrapper">
      <div v-for="(skuImg,index) in skuImageList" :key="skuImg.id" class="swiper-slide items">
        <img
            :class="{ 'activate' : index === newIndex}"
            :src="skuImg.imgUrl"
            @click="changeBigPic(index)"
        >
      </div>
    </div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev prev"><span>&#xe622;</span></div>
    <div class="swiper-button-next next"><span>&#xe621;</span></div>

  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "SpecScroll",
  props: ['skuImageList'],
  data() {
    return {
      newIndex: 0
    }
  },
  methods: {
    changeBigPic(i) {
      // 将点击的缩略图的索引值给放大镜组件
      this.$bus.$emit('changePic', i)
      this.newIndex = i
    }
  },
  watch: {
    skuImageList() {
      this.$nextTick(() => {
        new Swiper('.swiper', {
          // loop: true, // 循环模式选项

          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          slidesPerView: 3,
          slidesPerGroup: 3,

        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@font-face {
  font-family: 'iconfont';  /* Project id 2681264 */
  src: url('https://at.alicdn.com/t/font_2681264_etaqga384or.woff2?t=1647263301716') format('woff2'),
       url('https://at.alicdn.com/t/font_2681264_etaqga384or.woff?t=1647263301716') format('woff'),
       url('https://at.alicdn.com/t/font_2681264_etaqga384or.ttf?t=1647263301716') format('truetype');
}
.swiper {
  width: 400px;
  height: 60px;
  margin-top: 5px;
  overflow: hidden;
  position: relative;

  .swiper-button-prev, .swiper-button-next {
    text-align: center;
    width: 20px;
    height: 54px;
    line-height: 54px;
    border: 1px solid #CCC;
    background: #EBEBEB;
    cursor: pointer;
    margin-top: 12px;
    span {
      font-family: 'iconfont';
    }
  }

  .swiper-button-prev {
    position: absolute;
    top: 0;
    left: 0;
    margin-right: 4px;
  }

  .swiper-button-next {
    position: absolute;
    top: 0;
    right: 0;
  }

  .swiper-slide {
    //float: left;
    //position: relative;
    width: 56px;
    height: 56px;
    overflow: hidden;
    //margin: 0 30px;
    text-align: center;

    img {
      border: 1px solid #CCC;
      padding: 2px;
      width: 50px;
      height: 50px;
      //margin-right: 20px;
      cursor: pointer;
    }

    .activate {
      border: 1px solid yellow;
    }
  }
}
</style>
