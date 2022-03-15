<template>
  <section class="con">
    <!-- 导航路径区域 -->
    <div class="conPoin">
      <div class="conPoin">
        <a href="javascript:" v-show="categoryView.category1Id">{{ categoryView.category1Name }}</a>
        <a href="javascript:" v-show="categoryView.category2Id">{{ categoryView.category2Name }}</a>
        <a href="javascript:" v-show="categoryView.category3Id">{{ categoryView.category3Name }}</a>
      </div>
    </div>
    <!-- 主要内容区域 -->
    <div class="mainCon">
      <!-- 左侧放大镜区域 -->
      <GoodsBigPic></GoodsBigPic>
      <!-- 右侧选择区域布局 -->
      <SelectorParams></SelectorParams>
    </div>
  </section>
</template>

<script>
import GoodsBigPic from "@/pages/Detail/ConSection/GoodsBigPic";
import SelectorParams from "@/pages/Detail/ConSection/SelectorParams";
import {mapGetters} from 'vuex'
export default {
  name: "ConSection",
  components: {SelectorParams, GoodsBigPic},
  computed:{
    ...mapGetters('detail',['categoryView'])
  }
}
</script>

<style scoped lang="less">
.con{
  width: 1200px;
  margin: 15px auto 0;
  .conPoin{
    padding: 9px 15px 9px 0;
    &>a + a:before {
      content: "/\00a0";
      padding: 0 5px;
      color: #ccc;
    }
  }
  .mainCon{
    overflow: hidden;
    margin: 5px 0 15px;
  }
}
</style>
