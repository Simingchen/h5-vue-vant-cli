<template>
  <section class="container">
    <van-nav-bar title="申请注销" left-arrow @click-left="minxinNavLeft" />

    <div class="content">
      <img src="@img/icon_request_empty.png" alt="申请注销" class="img" />
      <h2 class="title">执行注销账号的操作吗？</h2>
      <p class="info">
        1.您的账号处于安全状态 <br />
        您的账号未被他人套取，账号不存在被封禁等风险。<br />
        2.所有数据均不保存 <br />
        注销账号后 ，用户在app上的所有数据将不再保存，包括书架书籍，阅读记录，奖励信息，收藏等。
      </p>

      <van-button class="submit" round :color="$config.primaryColor" @click="handleSubmit">申请注销</van-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleSubmit() {
      let _this = this
      this.$dialog
        .confirm({
          message: '确认注销账号吗？',
        })
        .then(() => {
          // todo
          this.$toast({
            message: '注销账号成功',
            onClose() {
              _this.$router.push('/')
            },
          })
        })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  overflow: hidden;
}
.content {
  margin-top: 16px;
  height: 100%;
  background: #fff;
  text-align: center;
}
.img {
  width: 400px;
  height: auto;
  margin: 100px auto 0;
}
.title {
  font-size: 40px;
  color: #8e93a1;
  line-height: 56px;
  margin: 20px 0;
}
.info {
  font-size: 28px;
  color: #8e93a1;
  letter-spacing: 0;
  line-height: 42px;
  padding: 0 44px;
  text-align: left;
}
.submit {
  display: block;
  width: 320px;
  height: 80px;
  margin: 140px auto 0;
}
</style>