<template>
  <div class="preview">
    <div class="jqzoom" ref="jdzoom"
         @mousemove="mouseMovePic"
         @mouseenter="mouseEnterPic"
         @mouseleave="mouseLeavePic"
    >
      <img
          :src="imgObj.imgUrl"
      />
      <div
          class="mask"
          ref="mask"
          style="{display: none}"
      ></div>
    </div>
    <div
        ref="bigImg"
        class="maxbox"
        :style="{
             backgroundImage: `url(${imgObj.imgUrl})`,
             display: 'none'
          }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Preview",
  props:['skuImageList'],
  data(){
    return {
      imgIndex: 0
    }
  },
  methods:{
    // 鼠标在图片中移动
    mouseMovePic(e) {
      let mouse_x = e.offsetX - this.$refs.mask.offsetWidth/2 // 鼠标在盒子里面的位置
      let mouse_y = e.offsetY - this.$refs.mask.offsetWidth/2
      let cha = 200
      if (mouse_x <= 0) {
        mouse_x = 0
      }else if (mouse_x >= cha) {
        mouse_x = cha
      }
      if (mouse_y <= 0) {
        mouse_y = 0
      }else if (mouse_y >= cha) {
        mouse_y = cha
      }
      // 修改遮罩层的位置
      this.$refs.mask.style.left = mouse_x + 'px'
      this.$refs.mask.style.top = mouse_y + 'px'
      // 修改大图的位置
      this.$refs.bigImg.style.backgroundPositionX = -mouse_x*2 + 'px'
      this.$refs.bigImg.style.backgroundPositionY = -mouse_y*2 + 'px'
    },
    // 鼠标进入图片
    mouseEnterPic() {
      this.$refs.mask.style.display = 'block'
      this.$refs.bigImg.style.display = 'block'
    },
    // 鼠标离开图片
    mouseLeavePic() {
      this.$refs.bigImg.style.display = 'none'
      this.$refs.mask.style.display = 'none'
    },
  },
  computed:{
    // 计算当前图片是哪一张图片
    imgObj() {
      return this.skuImageList[this.imgIndex] || {}
    }
  },
  mounted() {
    // 改变大图展示图片
    this.$bus.$on('changePic',(i)=>{
      this.imgIndex = i
    })
  }
}
</script>

<style scoped lang="less">
.preview {
  width: 400px;
  height: 400px;
  border: 1px solid #DFDFDF;
  .jqzoom {
    cursor: pointer;
    width: 400px;
    height: 400px;
    position: relative;
    img{
      width: 100%;
    }
    .mask{
      width: 200px;
      height: 200px;
      background: rgba(255,255,255,.5);
      position: absolute;
      border: 1px solid #ddd;
      // 阻止加入事件
      pointer-events: none;
    }
  }
  .maxbox{
    width: 400px;
    height: 400px;
    position: absolute;
    left: 420px;
    top: 0px;
    overflow: hidden;
    z-index: 20;
    border: 1px solid #ddd;
    img{
      width: 800px;
      height: 800px;
      display: block;
    }
  }
}
</style>
