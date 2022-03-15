<template>
  <div>
    <!-- 商品分类导航 -->
    <div class="type-nav">
      <div class="container">
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
        <div class="sort">
          <div class="all-sort-list2">
              <div
                  style="transform: translateY(-45px)"
                  @mouseleave="highLightDeactivated"
                  @mouseenter="titleEnter"
              >
                <h2 class="all" style="cursor: default;">全部商品分类</h2>
                <!--            一级菜单-->
                <transition-group
                   name="type"
                >
                  <div
                      class="item"
                      :class="{highLight: index === activatedIndex}"
                      v-for="(c1, index) in categoryList"
                      :key="c1.categoryId"
                      v-show="menu"
                      @mouseenter="highLightActivate(index)"
                      @click="goSearch"
                  >

                    <h3>
                      <!--                  跳转路由至搜索页-->
                      <a
                          :data-categoryName="c1.categoryName"
                          :data-category1Id = "c1.categoryId"
                      >{{ c1.categoryName }}</a>
                    </h3>
                    <!--                二三级菜单-->
                    <div class="item-list clearfix"
                         :style="{display: index === activatedIndex?'block':'none' }">
                      <!--                      二级菜单-->
                      <div class="subitem"
                           v-for="c2 in c1.categoryChild"
                           :key="c2.categoryId">
                        <dl class="fore">
                          <dt>
                            <a
                                :data-categoryName = "c2.categoryName"
                                :data-category2Id = "c2.categoryId"
                            >{{ c2.categoryName }}</a>
                          </dt>
                          <dd>
                            <!--                      三级菜单-->
                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                              <a
                                  :data-categoryName = "c3.categoryName"
                                  :data-category3Id = "c2.categoryId"
                              >{{ c3.categoryName }}</a>
                            </em>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </transition-group>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import throttle from 'lodash/throttle'  // 引入lodash中节流的方法
// import 'animate.css' // 引入animate.css动画库

export default {
  name: "TypeNav",
  data(){
    return {
      activatedIndex: -1,
      menu: true
    }
  },
  methods:{
    // 鼠标进入一级菜单显示高亮
    highLightActivate: throttle(function (i) {
      this.activatedIndex = i
    }, 50, {
      leading: true,
      trailing: false
    }),
    // 鼠标离开一级菜单加标题不显示高亮
    highLightDeactivated() {
      this.activatedIndex = -1
      if (this.$route.path != '/home') {
        this.menu = false  // 鼠标离开隐藏type栏
      }
    },
    // 鼠标进入一级菜单，将type栏隐藏
    titleEnter() {
      if (this.$route.path != '/home') {
        this.menu = true // 鼠标进入显示type栏
      }
    },
    // 路由跳转至搜索页
    goSearch(e) {
      let element = e.target  // 当前被点击的元素
      let {categoryname, category1id, category2id, category3id} =element.dataset // 自定义属性
      if (categoryname) {
        let location = {name:'search'}
        let query = {categoryName: categoryname}
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else  {
          query.category3Id = category3id
        }
        location.query = query
        // 路由跳转时有携带params参数，要把params参数一起带上
        if (this.$route.params) {
          location.params = this.$route.params
        }

        this.$router.push(location)
      }
    }
  },
  computed:{
    ...mapState('home',['categoryList']),
  },
  mounted() {
    // 判断路径是否为home，如果不是将一级type栏隐藏
    if(this.$route.path!="/home") {
      this.menu = false
    }else {
      this.menu = true
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;
  a {
    cursor: pointer;
  }
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      margin-left: 210px;
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      //background: #fafafa;
      z-index: 99999;

      .all-sort-list2 {
        .item {
          //&:hover {
          //  background-color: #cccccc;
          //}
          overflow: hidden;
          background-color: #fafafa;
          &:nth-child(odd) {
            margin-top: -1px;
          }
          &:nth-child(even) {
            margin-top: -2px;
          }
          h3 {
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 4px 20px ;
            margin: 0;
            a {
              color: #333;
              & {
                text-decoration: none;
              }
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 736px;
            height: 463px;
            min-height: 460px;
            overflow: auto;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            //z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //&:hover {
          //  .item-list {
          //    display: block;
          //  }
          //}
        }
        .type-enter-active {
          animation: remove .3s linear;
        }
        // type 栏动画
        @keyframes remove {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .highLight {
          background-color: #cccccc ;
        }
      }
    }
  }
}
</style>
