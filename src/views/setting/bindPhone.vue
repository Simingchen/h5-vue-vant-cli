<template>
  <section class="container">
    <van-nav-bar :title="title" left-arrow @click-left="minxinNavLeft" />
    <van-form validate-trigger="onBlur" label-width="70" @submit="onSubmit" ref="form">
      <van-cell-group :border="false">
        <van-field class="mt-16" :border="false" :rules="rules.phone" v-model="phone" type="tel" placeholder="请输入您的手机号">
          <template #label>
            <div class="vertical-middle">
              <span>+86</span>
              <van-icon name="arrow" size="14" color="#cccccc" />
            </div>
          </template>
        </van-field>
        <van-field class="mt-16" :border="false" :rules="rules.code" v-model="code" label="验证码" placeholder="请输入验证码">
          <template #button>
            <van-button size="small" round plain color="#DBDBDB">获取验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>

      <van-button class="submit" round :disabled="disabled" :color="disabled ? '#CECECE' : $config.primaryColor" native-type="submit">验证</van-button>
    </van-form>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

let binding
export default {
  data() {
    return {
      phone: '',
      code: '',
      disabled: true,
      title: '',
      rules: {
        phone: [
          { required: true, message: '请填写手机号' },
          { validator: this.validatorPhone, message: '手机格式不对' },
        ],
        code: [{ required: true, message: '请填写验证码' }],
      },
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
  created() {
    binding = this.$route.query.binding
    this.title = binding === '1' ? '绑定手机' : '修改手机'
    this.phone = this.user.phone
  },
  updated() {
    console.log('updated')
    if (this.phone && this.code) {
      this.validForm()
    } else {
      if (!this.disabled) this.disabled = true
    }
  },
  methods: {
    validatorPhone(val) {
      return /^1[3456789]\d{9}$/.test(val)
    },
    validForm() {
      this.$refs['form']
        .validate()
        .then(() => {
          this.disabled = false
        })
        .catch(() => {
          if (!this.disabled) this.disabled = true
        })
    },
    onSubmit() {
      let _this = this
      this.$toast({
        message: binding === '1' ? '绑定手机成功' : '修改手机成功',
        onClose() {
          _this.$router.push('/')
        },
      })
      // todo
    },
  },
}
</script>

<style lang="less" scoped>
.tip {
  font-size: 28px;
  color: #b7b7b7;
  line-height: 40px;
  padding: 24px 0 0 32px;
}

.submit {
  display: block;
  margin: 80px auto 0;
  width: 432px;
  height: 80px;
}
</style>