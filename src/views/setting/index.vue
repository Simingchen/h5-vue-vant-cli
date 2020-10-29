<template>
  <section class="container">
    <van-nav-bar title="设置" left-arrow @click-left="minxinNavLeft" />

    <van-cell-group :border="false">
      <van-cell class="mt-16" title="账号安全" is-link to="/setting/accountSafe" />
      <van-cell class="mt-16" title="接受推送通知">
        <template #default>
          <van-switch v-model="acceptSend" size="20px" :active-color="$config.primaryColor" inactive-color="#eee" />
        </template>
      </van-cell>
    </van-cell-group>

    <p class="tip">开启或关闭推送通知，需去系统设置-通知中更改</p>

    <van-cell-group :border="false">
      <!-- <van-cell title="清理缓存" is-link to="/setting/clearCache" :value="`${cacheSize}M`" /> -->
      <van-cell :border="false" class="mt-16" :title="`版本: ${version} 存`">
        <template #default>
          <van-button class="check-update" round plain type="info" size="mini" color="#B7B7B7" @click="handleCheckUpdate">检查更新</van-button>
        </template>
      </van-cell>
      <van-cell class="mt-16" title="关于" is-link to="/setting/about" />
    </van-cell-group>

    <van-button class="signout" round :color="$config.primaryColor" @click="onSignout">退出登录</van-button>
  </section>
</template> 

<script>
export default {
  data() {
    return {
      version: '1.6.0', //版本
      acceptSend: false, //接受推送通知

      cacheSize: 95.0, // 缓存
    }
  },
  methods: {
    onSignout() {
      this.$dialog
        .confirm({
          title: '提示',
          message: `是否退出登录`,
        })
        .then(() => {
          this.$router.push('/login')
        })
      // todo
    },
    handleCheckUpdate() {
      this.$toast('已经是最新版')
      // todo
    },
  },
}
</script>

<style lang="less" scoped>
// @import '~@/assets/css/vantCell.css';

.check-update {
  padding: 0 24px;
}

.tip {
  font-size: 24px;
  color: #747474;
  line-height: 32px;
  margin: 16px 0 48px 32px;
}

.signout {
  position: absolute;
  left: 50%;
  bottom: 112px;
  transform: translateX(-50%);
  height: 80px;
  width: 432px;
}
</style>