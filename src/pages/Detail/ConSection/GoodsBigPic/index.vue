<template>
  <div class="previewWrap">
    <!--放大镜效果-->
    <Preview :skuImageList="skuImageList"></Preview>
    <!--下方的缩略图-->
    <SpecScroll :skuImageList="skuImageList"></SpecScroll>
  </div>
</template>

<script>
import Preview from './Preview' // 放大镜
import SpecScroll from './SpecScroll' // 缩略图

export default {
  name: "GoodsBigPic",
  components:{
    Preview,SpecScroll
  },
  computed:{
    skuImageList() {
      return this.$store.getters['detail/skuInfo'].skuImageList || []
    }
  }

}
</script>

<style scoped lang="less">
.previewWrap{
  float: left;
  width: 400px;
  position: relative;


}
</style>
