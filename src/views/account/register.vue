<template>
  <div class="register-page">
    <div class="logo-top">
      <div class="avatar"></div>
    </div>
    <div class="w590" v-if="!isNext">
      <van-cell class="tit-line" center :icon="require('@img/icon_login_ph_i.png')" title="账号" :border="false" />
      <van-field v-model.trim="phone" type="digit" placeholder="请输入您的手机号" maxlength="11" clearable>
        <template #label>
          <div class="flex-start" @click="isShowCodePop = true">
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

      <van-cell class="tit-line" center :icon="require('@img/icon_login_in_i.png')" title="邀请码" :border="false" />
      <van-field v-model="inviteCode" maxlength="16" type="password" placeholder="在这输入邀请码(非必填)" />
      <van-button round class="login-btn" :color="phone.length == 11 && verifyCode.length > 4 ? $config.primaryColor : '#cecece'" @click="confirm">下一步</van-button>
    </div>
    <!-- 注册下一步设置密码 -->
    <div class="w590" v-else>
      <van-cell class="tit-line" center :icon="require('@img/icon_login_p_i.png')" title="设置密码" :border="false" />
      <van-field v-model.trim="password" type="password" placeholder="设置您的密码" maxlength="16" clearable />

      <van-cell class="tit-line" center :icon="require('@img/icon_login_p_i.png')" title="确认密码" :border="false" />
      <van-field v-model.trim="password2" type="password" placeholder="请再次输入密码" maxlength="16" clearable />
      <van-button class="login-btn" round :color="password.length > 5 && password2.length > 5 ? $config.primaryColor : '#cecece'" @click="next">下一步</van-button>
    </div>

    <div class="flex-center agreement">
      <van-checkbox v-model="checked" :checked-color="$config.primaryColor" @change="changeChecked">
        <template #icon="props">
          <van-icon name="checked" :color="props.checked ? $config.primaryColor : '#8e93a1'" />
        </template> </van-checkbox
      >我已阅读并同意
      <router-link class="primary" to="/article/agreement">《用户协议》</router-link>
      <router-link class="primary" to="/article/privacy">《隐私协议》</router-link>
    </div>
    <code-list :show="isShowCodePop" @success="onSuccessCode" @close="isShowCodePop = false" />
  </div>
</template>
<script>
import codeList from '@components/login/codeList.vue'
export default {
  components: { codeList },
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
      isShowCodePop: false,
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
    // 注册
    confirm() {
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
    // 下一步
    next() {
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

      this.$router.push('registerPreference')
    },
    // 地区码
    onSuccessCode(item) {
      console.log(item)
      this.isShowCodePop = false
      this.phoneCode = item.region
    },
  },
}
</script>

<style lang="less" scoped>
.logo-top {
  padding-top: 168px;
  height: 448px;
  background-image: linear-gradient(135deg, #ffde99 0%, #ff8f8f 100%);
  background: url('../../assets/img/icon_login_title.jpg') 0 0 no-repeat;
  background-size: 100% 448px;
}
.avatar {
  display: block;
  height: 280px;
  height: 280px;
  background: url('../../assets/img/icon_head_login.png') center 0 no-repeat;
  background-size: 280px 280px;
}
.w590 {
  width: 710px;
  margin: 0 auto;
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
.register-page {
  .van-button--small {
    width: 180px;
  }
}
</style>
