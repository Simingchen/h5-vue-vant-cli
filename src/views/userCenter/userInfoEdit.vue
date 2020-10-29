<template>
  <div class="userInfoEdit-page pt90">
    <van-nav-bar title="更改昵称" fixed left-arrow @click-left="minxinNavLeft" />
    <van-field v-model.trim="text" placeholder="请在这里输入昵称" maxlength="8" show-word-limit />
    <van-button
      class="confirm-btn"
      round
      :color="text.length ? $config.primaryColor : '#cecece'"
      @click="confirm"
    >确定</van-button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      text: '',
    }
  },
  methods: {
    // 确定选择性别
    confirm() {
      if (!this.text.length) {
        return this.$toast('请输入昵称')
      }
      this.$toast('修改成功')
      this.$router.go(-1)
    },
  },
}
</script>
<style lang="less" scoped>
.confirm-btn {
  display: block;
  width: 432px;
  height: 80px;
  margin: 96px auto;
}
</style>
<style lang="less">
.userInfoEdit-page {
  .van-cell__value {
    display: flex;
    justify-content: space-between;
    font-size: 32px;
  }
  .van-field__word-limit {
    font-size: 32px;
    color: #ddd;
  }
}
</style>
