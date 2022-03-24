<template>
<div>
  <h1 class="tipFont">注册成功</h1>
  <span>
    <router-link :to="{name:'login'}" style="background-color: limegreen">去登录</router-link>
    <router-link :to="{path:'/'}">返回首页</router-link>
  </span>
</div>
</template>

<script>
export default {
  name: "RegisterSuccess",
}
</script>

<style scoped lang="less">
div {
  width: 100%;
  height: 100%;
  .tipFont {
    font-size: 25px;
    padding: 0 70px;
    margin: 100px auto;
    text-align: center;
  }
  span {
    display: flex;
    width: 300px;
    height: 30px;
    margin: 0 auto;
    text-align: center;
    a {
      display: block;
      margin-right: 25px;
      width: 100px;
      border: none;
      border-radius: 5px;
      padding: 8px 18px;
      background-color: orangered;
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>
