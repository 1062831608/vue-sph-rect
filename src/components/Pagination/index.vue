<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
        <button class="preAndNext"
                :class="pageNo <=1 ? 'disabledColor': ''"
                :disabled="pageNo <= 1"
               @click="$bus.$emit(emitName, pageNo-1)"
        >
            <span>&#xe667;</span>上一页
        </button>
        <button
            v-show="continuesData.start !== 1"
            @click="$bus.$emit(emitName,1)"
            :class="pageNo === 1 ? 'activate' : ''"
        >1</button>
        <button
            class="noBgc"
            v-show="continuesData.start >=Math.ceil(continues/2)"
        >.....</button>

        <button
            v-for="(c,index) in continuesArr" :key="index"
            :class="pageNo === c ? 'activate' : ''"
            @click="$bus.$emit(emitName,c)"
        >
          {{ c }}
        </button>

        <button
            class="noBgc"
            v-show="continuesData.end <= totalPages-Math.floor(continues/2)"
        >.....</button>
        <button
            v-show="continuesData.end !== totalPages"
            @click="$bus.$emit(emitName,totalPages)"
            :class="pageNo === totalPages ? 'activate' : ''"
        >{{ totalPages }}</button>

        <button
            class="preAndNext"
            :class="pageNo ===totalPages ? 'disabledColor': ''"
            :disabled="pageNo === totalPages"
            @click="$bus.$emit(emitName, pageNo+1)"
        >
            下一页<span>&#xe668;</span>
        </button>
        <button disabled class="preAndNext">共{{ totalPages }}页</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Pagination",
  // pageNo 当前页， total 数据总数， totalPages 全部页数， continues中间连续有多少数据
  // emitName 自定义事件名  pageSize 这个页面显示多少的数据
  props: ['pageNo','total','continues','emitName','pageSize'],
  data() {
    return {}
  },
  computed:{
    totalPages() {
      return Math.ceil(this.total/this.pageSize)
    },
    // 在中间显示的数据的头数字和尾数字
    continuesData() {
      let start=0// 中间显示数据的头数据
      let end = 0// 中间显示的数据的尾数据
      let {continues, totalPages, pageNo} = this
      if (continues >totalPages) {
        start = 1
        end = totalPages
      }else {
        start = pageNo - Math.floor(continues/2)
        end = pageNo + Math.floor(continues/2)
        if (start < 1) {
          start = 1
          end = continues
        } else if (end > totalPages) {
          end = totalPages
          start = totalPages - continues
        }
      }
      return {
        start,
        end
      }
    },
    // 将中间显示数据的头数字和尾数字处理为数组
    continuesArr() {
      let arr = []
      for (let i = this.continuesData.start; i<= this.continuesData.end; i++) {
        arr.push(i)
      }
      return arr
    }
  }
}
</script>

<style lang="less" scoped>
@font-face {
  font-family: 'iconfont';  /* Project id 2681264 */
  src: url('https://at.alicdn.com/t/font_2681264_24z83sd3wbl.woff2?t=1646821369191') format('woff2'),
  url('https://at.alicdn.com/t/font_2681264_24z83sd3wbl.woff?t=1646821369191') format('woff'),
  url('https://at.alicdn.com/t/font_2681264_24z83sd3wbl.ttf?t=1646821369191') format('truetype');
}
.page {
  position: absolute;
  left: 50%;
  bottom: -66px;
  transform: translateX(-50%);
  width: 903px;
  height: 66px;
  overflow: hidden;
  //float: right;
  text-align: center;
  margin: 30px auto 0;
  .sui-pagination {
    display: flex;
    button {
      border: 0;
      width: 75px;
      height: 35px;
      line-height: 35px;
      margin-right: 5px;
      font-size: 14px;
      cursor: pointer;
      background-color: #f6f6f6;
      span {
        font-family: 'iconfont';
      }
    }
    // 按钮禁用色
    .disabledColor {
      color: #777777;
    }

    // 背景色的类
    .noBgc {
      background-color: #ffffff;
    }
    // 被激活的当前页的样式
    .activate {
      border: 2px #007aff solid;
    }
  }

}
</style>
