<template>
  <div class="forget-page pt90">
    <van-nav-bar title="找回密码" fixed left-arrow @click-left="minxinNavLeft" />
    <div class="page-tit w590">
      <div class="tit">{{ !isNext ? 'Hi，小主~' : '呦，不错哦~' }}</div>
      <div class="txt">{{ !isNext ? '输入以下信息，找回您的密码' : '离找回密码只差最后一步了' }}</div>
    </div>
    <div class="logo-top">
      <div class="avatar"></div>
    </div>
    <div class="w590" v-if="!isNext">
      <van-cell class="tit-line" center :icon="require('@img/icon_login_ph_i.png')" title="账号" :border="false" />
      <van-field v-model.trim="phone" type="digit" placeholder="请输入您的手机号" maxlength="11" clearable>
        <template #label>
          <div class="flex-start">
            {{ phoneCode }}
            <van-icon name="arrow" />
          </div>
        </template>
      </van-field>

      <van-cell class="tit-line" center :icon="require('@img/icon_login_pc_i.png')" title="验证码" :border="false" />
      <van-field v-model.trim="verifyCode" maxlength="6" type="password" placeholder="在这输入验证码">
        <template #button>
          <van-button size="small" round plain @click="sendCode">
            <span v-show="!isSend">发送验证码</span>
            <van-count-down v-show="isSend" ref="countDown" :time="60000" :auto-start="false" format="ss" @finish="finishTime">
              <template #default="timeData">
                <span class="block">{{ timeData.seconds }}</span
                >S
              </template>
            </van-count-down>
          </van-button>
        </template>
      </van-field>

      <van-button round class="login-btn" :color="phone.length == 11 && verifyCode.length > 4 ? $config.primaryColor : '#cecece'" @click="next">下一步</van-button>
    </div>
    <!-- 注册下一步设置密码 -->
    <div class="w590" v-else>
      <van-cell class="tit-line" center :icon="require('@img/icon_login_p_i.png')" title="设置密码" :border="false" />
      <van-field v-model.trim="password" type="password" placeholder="设置您的密码" maxlength="16" clearable />

      <van-cell class="tit-line" center :icon="require('@img/icon_login_p_i.png')" title="确认密码" :border="false" />
      <van-field v-model.trim="password2" type="password" placeholder="请再次输入密码" maxlength="16" clearable />
      <van-button class="login-btn" round :color="password.length > 5 && password2.length > 5 ? $config.primaryColor : '#cecece'" @click="confirm">重置</van-button>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      phone: '',
      phoneCode: '+86',
      verifyCode: '',
      inviteCode: '',
      isSend: false,
      checked: true,
      isNext: false, // 是否下一部
      password: '',
      password2: '',
    }
  },

  methods: {
    // 勾选协议
    changeChecked(bool) {
      this.checked = bool
    },
    // 发送验证码
    sendCode() {
      if (this.isSend) return

      const phone = this.phone
      if (!phone.length) {
        return this.$toast('手机号码不能为空')
      }
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        return this.$toast('手机号码输入有误')
      }

      this.$toast('短信已发送，请注意查收')
      this.isSend = true
      this.$refs.countDown.start()
    },
    // 倒计时结束
    finishTime() {
      this.isSend = false
    },
    // 下一步
    next() {
      const phone = this.phone
      const verifyCode = this.verifyCode
      if (!phone.length) {
        return this.$toast('手机号码不能为空')
      }
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        return this.$toast('手机号码输入有误')
      }
      if (!verifyCode.length) {
        return this.$toast('请输入验证码')
      }
      if (!this.checked) {
        return this.$toast('请先阅读并同意服务条款')
      }

      // 下一步操作
      this.isNext = true
    },
    // 确定
    confirm() {
      if (!this.checked) {
        return this.$toast('请先阅读并同意服务条款')
      }
      const password = this.password
      const password2 = this.password2
      if (!password.length) {
        return this.$toast('设置密码不能为空')
      }
      if (password.length < 6) {
        return this.$toast('密码长度不可少于6位')
      }

      if (!password2.length) {
        return this.$toast('确认密码不能为空')
      }

      if (password != password2) {
        return this.$toast('确认密码不一致输入有误')
      }

      this.$toast('重置成功，请重新登录')

      this.$router.push('login')
    },
  },
}
</script>

<style lang="less" scoped>
.w590 {
  width: 710px;
  margin: 0 auto;
}
.page-tit {
  padding: 40px 40px 60px;
  font-size: 48px;
  color: #121213;
  line-height: 66px;
  .txt {
    margin-top: 12px;
    font-size: 32px;
    color: #121213;
    line-height: 44px;
  }
}

.van-field {
  height: 100px;
  font-size: 32px;
}
.tit-line {
  padding-top: 34px;
  padding-bottom: 0;
}

.login-btn {
  display: block;
  width: 320px;
  height: 80px;
  margin: 64px auto;
  font-size: 32px;
}
.agreement {
  padding: 20px 0;
  margin-top: 324px;
  font-size: 24px;
  color: #8e93a1;
}
.van-checkbox__icon .van-icon {
  border: 0;
  background-color: transparent;
  border-color: transparent;
}
</style>
<style lang="less">
.forget-page {
  .van-button--small {
    width: 180px;
  }
}
</style>
