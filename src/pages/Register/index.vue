<template>
  <div>
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link :to="{name:'login'}">登陆</router-link>
					</span>
      </h3>
      <div class="content">
<!--        用户手机号-->
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model.trim="userInfo.phone" @change="changePhone">
        <span class="error-msg" v-show="checked.phoneChecked">手机号格式错误</span>
      </div>
<!--      用户验证码-->
      <div class="content">
        <label>验证码:</label>
        <input
            type="text"
            placeholder="请输入验证码"
            v-model.trim="userInfo.code"
            @change="changeCode"
        >
        <button class="getcode" @click="getCode">获取验证码</button>
        <span class="error-msg" v-show="checked.codeChecked">验证码不能为空</span>
      </div>
<!--      用户的登录密码-->
      <div class="content">
        <label>登录密码:</label>
        <input
            type="password"
            placeholder="请输入你的登录密码"
            v-model.trim="userInfo.password"
            @change="changePassword"
        >
        <span class="error-msg" v-show="checked.passwordChecked">密码必须由数字字母组成且长度为八到十六位</span>
      </div>
<!--      确认用户的登录密码-->
      <div class="content">
        <label>确认密码:</label>
        <input type="password"
               placeholder="请输入确认密码"
               @change="changeConfirmPassword"
        >
        <span class="error-msg" v-show="checked.confirmPasswordChecked">两次密码不一致</span>
      </div>
<!--      同意协议-->
      <div class="controls">
        <input name="m1" type="checkbox" v-model="isAgree">
        <span>同意协议并注册《尚品汇用户协议》</span>
      </div>
      <div class="btn">
        <button @click="finishRegister">完成注册</button>
      </div>
    </div>
<!--    登录注册的底部组件-->
    <login-and-register-footer></login-and-register-footer>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'  // lodash库中防抖的方法

export default {
  name: "Register",
  data(){
    return {
      userInfo:{
        phone:'',
        password:'',
        code:''
      },
      checked:{  // 输入框校验，成功：false，失败：true
        phoneChecked: false, // 手机号初次校验是否通过
        passwordChecked: false,// 密码校验是否通过
        confirmPasswordChecked: false, // 确认密码校验
        codeChecked: false, // 验证码的初步校验
      },
      isAgree: true    // 是否同意用户协议
    }
  },
  methods:{
    // 手机号输入框表单验证
    changePhone(e){
      let val = e.target.value
      // 手机号的表单验证规则
      let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      this.checked.phoneChecked = !reg.test(val)
    },
    // 验证码的表单验证
    changeCode(e){
      let val = e.target.value
      let reg = /^[a-zA-Z0-9]{4,6}$/ // 验证码正则，四或六位的大小写字母，数字
      this.checked.codeChecked = !reg.test(val)
    },
    // 密码框的表单验证
    changePassword(e) {
      let val = e.target.value
      // 密码的表单验证规则
      let reg = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/
      this.checked.passwordChecked = !reg.test(val)
    },
    // 确认密码的表单验证
    changeConfirmPassword(e) {
      let val = e.target.value
      this.checked.confirmPasswordChecked = val !== this.userInfo.password
    },
    // 获取验证码
    getCode: debounce(async function(){
      if (this.userInfo.phone === '' || this.checked.phoneChecked) {
        alert('请填写正确的手机号')
      }else {
        try{
          // 派发actions获取验证码
          this.userInfo.code =  await this.$store.dispatch('user/actionsGetCode', this.userInfo.phone)
        }catch (e) {
          console.log(e)
        }
      }
    }, 5000,{leading: true,trailing: false}),
    // 完成表单验证派发actions请求注册
    finishRegister: debounce(async function() {
      if (this.isAllAdopt) {
        alert('注册信息填写错误')
      }else {
        try{
          // 派发actions注册
          await this.$store.dispatch('user/registerUserInfo',this.userInfo);
          // 跳转路由到注册成功界面
          this.$router.replace({
            name:'registersuccess',
          })
        }catch (e) {
          alert(e)
        }
      }
    }, 500,{leading: true, trailing: false})
  },
  computed:{
    // 判断表单验证是否全部通过，返回false则为通过，返回true为不通过
    isAllAdopt(){
      let flag = [] // 通过flag判断是否全通过，如果flag里面都为false则通过
      flag.push(!this.isAgree)
      for(let k in this.checked) {
        flag.push(this.checked[k])
      }
      // 只要用户信息有一个为空，那么久表示失败
      if (this.userInfo.password === '') {
        return true
      }
      // 只要表单校验一个没有完成那么也表示失败
      return flag.some(item=>{
        return item === true
      })
    }
  }
}
</script>

<style scoped lang="less">
.register {
  width: 1200px;
  height: 445px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;

  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;

    span {
      font-size: 14px;
      float: right;

      a {
        color: #e1251b;
      }
    }
  }

  div:nth-of-type(1) {
    margin-top: 40px;
  }

  .content {
    padding-left: 390px;
    margin-bottom: 18px;
    position: relative;

    label {
      font-size: 14px;
      width: 96px;
      text-align: right;
      display: inline-block;
    }

    input {
      width: 270px;
      height: 34px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #b6b4b4;
    }

    img {
      vertical-align: sub;
    }

    .getcode {
      background-color: #efeded;
      border: none;
      padding: 8px 8px;
      font-size: 12px;
      margin-left: 18px;
      cursor: pointer;
    }
    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .controls {
    text-align: center;
    position: relative;

    input {
      vertical-align: middle;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .btn {
    text-align: center;
    line-height: 36px;
    margin: 17px 0 0 55px;

    button {
      outline: none;
      width: 270px;
      height: 36px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
    }
  }
}
</style>
