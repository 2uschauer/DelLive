<template>
  <div class="signIn clearfix">
    <div class="signInCarousel half">
      <el-carousel class="Carousel" arrow="never">
        <el-carousel-item v-for="(item, index) in carouselGroup" :key="index" class="item">
          <p class="carouselTXT">{{item.content}}</p>
          <svg-icon :icon-class="item.className" class="carouselSVG"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="signInForm half">
      <el-button-group class="SignButtonGroup">
        <el-button type="primary" :plain="signStatus!=='in'" round @click="signStatus='in'">Sign in</el-button>
        <el-button type="primary" :plain="signStatus!=='up'" round @click="signStatus='up'">Sign up</el-button>
      </el-button-group>
      <div class="From">
        <el-form label-position="top" :model="signForm" :rules="signRules" ref="signFrom">
          <el-form-item label="EMAIL" v-if="signStatus==='up'" prop="email">
            <el-input v-model="signForm.email" placeholder="Enter Your Email Address" @keyup.enter.native="handleSignClick"></el-input>
          </el-form-item>
          <el-form-item label="USER NAME" prop="userName">
            <el-input v-model="signForm.userName" placeholder="Enter Your User Name" @keyup.enter.native="handleSignClick"></el-input>
          </el-form-item>
          <el-form-item label="PASSWORD" prop="password">
            <el-input v-model="signForm.password" placeholder="Enter Your Password" show-password @keyup.enter.native="handleSignClick"></el-input>
          </el-form-item>
          <el-form-item label="Invite Code" v-if="signStatus==='up'" prop="inviteCode">
            <el-input v-model="signForm.inviteCode" placeholder="Enter Your Invite Code" @keyup.enter.native="handleSignClick"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" round class="signInButton" @click="handleSignClick" :loading="loading">{{signStatus === 'in' ? 'Sign In' : 'Sign Up'}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { validateEmail, validateUserName } from '@/utils/validate'
import { initSocket } from '@/utils/socket'
export default {
  data() {
    const userNameValidator = (rule, value, callback) => {
      if (value.length <= 0) callback(new Error('用户名不可为空'))
      else if (!validateUserName(value)) callback(new Error('用户名只允许数组字母和"-"'))
      else callback()
    }
    const passwordValidator = (rule, value, callback) => {
      if (value.length <= 0) callback(new Error('密码不可为空'))
      else callback()
    }
    const emailValidator = (rule, value, callback) => {
      if (value.length <= 0) callback(new Error('注册时邮箱不可为空'))
      else if (!validateEmail(value)) callback(new Error('您所输入的邮箱不合法'))
      else callback()
    }
    const inviteCodeValidator = (rule, value, callback) => {
      if (value.length <= 0) callback(new Error('注册时邀请码不可为空'))
      else callback()
    }
    return {
      carouselGroup: [{
        className: 'carousel_share',
        content: '轻松配置即可享受直播'
      },{
        className: 'carousel_doc',
        content: '创建账号即可享受博客服务'
      },{
        className: 'carousel_manager',
        content: '博客结构、博客文章轻松管理'
      },{
        className: 'carousel_upload',
        content: '支持上传Markdown文件自动生成博客文章'
      }],
      signForm: {
        userName: '',
        password: '',
        email: '',
        inviteCode: '',
      },
      signRules: {
        userName: [{
          required: true,
          trigger: 'blur',
          validator: userNameValidator
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: passwordValidator
        }],
        email: [{
          required: () => this.signStatus === 'up',
          trigger: 'blur',
          validator: emailValidator
        }],
        inviteCode: [{
          required: () => this.signStatus === 'up',
          trigger: 'blur',
          validator: inviteCodeValidator
        }]
      },
      signStatus: 'in',
      loading: false
    }
  },
  methods: {
    getLastRoute() {
      const { routes } = this.$router.options
      return routes.length > 2 ? routes[0] : { path: '/' }
    },
    getRoutesByToken(token = '') {
      this.$store.dispatch('getRoutesByToken', token)
        .then(() => {
          const lastRoute = this.getLastRoute()
          this.$router.push({ path: lastRoute.path })
        }).catch((err) => {
          if (err.responseMsg) this.$message.error(`${err.responseMsg}`)
          else console.log(err)
        })
    },
    handleSignClick() {
      this.$refs.signFrom.validate(valid => {
        if (valid) {
          const { signForm } = this
          this.loading = true
          if (this.signStatus === 'in') {
            this.$store.dispatch('signIn', signForm).then((res) => {
              this.$message.success(`${res.responseMsg}`)
              this.getRoutesByToken(res.data)
              this.$store.dispatch('initSocket',initSocket(res.data))
            }).catch((err) => {
              if (err.responseMsg) this.$message.error(`${err.responseMsg}`)
              else console.error(err)
            }).finally(() => {
              this.loading = false
            })
          } else {
            this.$store.dispatch('signUp', signForm).then((res) => {
              this.$message.success(`${res.responseMsg}`)
              this.getRoutesByToken(res.data)
            }).catch((err) => {
              this.$message.error(`${err.responseMsg}`)
            }).finally(() => {
              this.loading = false
            })
          }
        } else {
          this.$message.warning(`格式不正确，请重新${this.signStatus === 'in' ? '登录' : '注册'}！`)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.signIn{
  display: flex;
  justify-content: center;
  align-items: center;
  height:100%;
  background: #F2F4F8;
  .half{
    width: calc(50%);
    height:100%;
  }
}
.signInCarousel{
  background: #D85A51;
  display: flex;
  justify-content: center;
  align-items: center;
  .Carousel{
    height:calc(60%);
    width:calc(80%);
    .item{
      text-align: center;
      vertical-align: center;
      .carouselTXT{
        font-size: 24px;
        font-weight: 700;
        color:#ffffff;
        padding:24px;
      }
      .carouselSVG{
        height: calc(60%);
        width: calc(60%);
      }
    }
  }
}
.signInForm{
  background: #0F253E;
  box-shadow: 0px -2px 3px 0px rgba(0,0,0,0.08);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .SignButtonGroup{
    position: absolute;
    top: 24px;
    right: 48px;
    /deep/
    .el-button{
      border-color: transparent !important;
      &.is-plain{
        background: #1E3C5F !important;
      }
    }
  }
  .From{
    width:calc(80%);
    height:calc(60%);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    /deep/
    .el-form-item__label{
      color:#ffffff;
    }
    /deep/
    .el-input__inner{
      border-color: transparent;
      border-bottom-color: #31465A;
      background-color: transparent;
      color: #ffffff;
      font-weight:500;
      &::-webkit-input-placeholder { /* WebKit browsers 适配谷歌 */
          color: rgba(49,70,90,0.7);
      }
      &:-moz-placeholder { /* Mozilla Firefox 4 to 18 适配火狐 */
          color: rgba(49,70,90,0.7);
      }
      &::-moz-placeholder { /* Mozilla Firefox 19+ 适配火狐 */
          color: rgba(49,70,90,0.7);
      }
      &::-ms-input-placeholder { /* Internet Explorer 10+  适配ie*/
          color: rgba(49,70,90,0.7);
      }
    }
    .signInButton{
      width:150px;
    }
  }
}
</style>>
