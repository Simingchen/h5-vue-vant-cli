<template>
  <div class="login-page">
    <div class="logo-top">
      <div class="avatar"></div>
    </div>
    <div class="w590">
      <van-cell class="tit-line" center :icon="require('@img/icon_login_ph_i.png')" title="账号" :border="false" />
      <van-field v-model.trim="phone" type="digit" placeholder="在这输入手机号或账号" maxlength="11" clearable>
        <template #label>
          <div class="flex-start" @click="isShowCodePop = true">
            {{ phoneCode }}
            <van-icon name="arrow" />
          </div>
        </template>
      </van-field>

      <van-cell class="tit-line" center :icon="require('@img/icon_login_p_i.png')" title="密码" :border="false" />
      <van-field v-model.trim="password" :type="passType" maxlength="16" placeholder="在这输入您的密码" :right-icon="require(passType == 'txt' ? '@img/icon_o_easy.png' : '@img/icon_c_easy.png')" @click-right-icon="togglePassType" />
      <div class="flex-row-center bot">
        <router-link class="primary" to="/account/forget">忘记密码</router-link>
        <router-link class="primary" to="/account/register">注册</router-link>
      </div>
    </div>
    <van-button class="login-btn" round :color="$config.primaryColor" @click="login">登录</van-button>
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
      password: '',
      passType: 'password',
      phoneCode: '+86',
      checked: true,
      isShowCodePop: false,
    }
  },

  methods: {
    // 切换密码框图标
    togglePassType() {
      this.passType = this.passType == 'txt' ? 'password' : 'txt'
    },
    // 打开地区号码弹窗
    openCodeList() {
      this.$toast('暂无')
    },
    // 勾选协议
    changeChecked(bool) {
      this.checked = bool
    },
    // 登录
    login() {
      if (!this.checked) {
        return this.$toast('请先阅读并同意服务条款')
      }
      const phone = this.phone
      const password = this.password
      if (!phone.length) {
        return this.$toast('请输入手机号')
      }
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        return this.$toast('手机号格式错误')
      }
      if (!password.length) {
        return this.$toast('请输入密码')
      }
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
.bot {
  padding: 0 30px;
  line-height: 100px;
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
