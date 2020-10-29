<template>
  <section class="container">
    <van-nav-bar title="修改密码" left-arrow @click-left="minxinNavLeft" />
    <van-form validate-trigger="onChange" label-width="80" @submit="onSubmit" ref="form">
      <van-cell-group :border="false">
        <van-field class="mt-16" :rules="rules.psd" v-model="psd" type="password" label="原密码:" placeholder="请输入6-16个字符，区分大小写"></van-field>
      </van-cell-group>
      <van-cell-group :border="false">
        <van-field class="mt-16" :rules="rules.newPsd" :border="false" v-model="newPsd" type="password" label="新密码:" placeholder="请输入6-16个字符，区分大小写"></van-field>
        <van-field :border="false" :rules="rules.confirmPsd" v-model="confirmPsd" type="password" label="确认密码:" placeholder="请输入6-16个字符，区分大小写"></van-field>
      </van-cell-group>

      <p class="tip">忘记原密码请退出账号后，在登陆界面重置</p>

      <van-button class="submit" round :disabled="disabled" :color="disabled ? '#CECECE' : $config.primaryColor" native-type="submit">验证</van-button>
    </van-form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      psd: '', //原密码
      newPsd: '', //新密码
      confirmPsd: '', // 确认密码
      disabled: true,
      rules: {
        psd: [
          { required: true, message: '请填写密码' },
          { validator: this.validatorLength, message: '密码长度不对' },
        ],
        newPsd: [
          { required: true, message: '请填写密码' },
          { validator: this.validatorLength, message: '密码长度不对' },
        ],
        confirmPsd: [
          { required: true, message: '请填写密码' },
          { validator: this.validatorSame, message: '确认密码不一致' },
        ],
      },
    }
  },
  updated() {
    console.log('updated')
    if (this.psd && this.newPsd && this.confirmPsd) {
      this.validForm()
    }
  },
  methods: {
    validatorLength(val) {
      return val.length >= 6 && val.length <= 16
    },
    validatorSame(val) {
      return val === this.newPsd
    },
    onChange(e) {
      console.log(e)
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
        message: '修改成功',
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