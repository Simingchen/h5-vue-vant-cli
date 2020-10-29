<template>
  <section class="container">
    <van-nav-bar title="账号安全" left-arrow @click-left="minxinNavLeft" />

    <van-cell-group :border="false">
      <van-cell class="mt-16" :border="false" title="手机号" :value="user.phone || '立即绑定'" is-link :to="{ path: '/setting/bindPhone', query: { binging: user.phone ? 0 : 1 } }" />
      <van-cell class="mt-16" :border="false" title="修改密码" is-link to="/setting/changePassword" />
      <van-cell class="mt-16" :border="false" title="账号注销" is-link to="/setting/cancellation" />
    </van-cell-group>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
}
</script>

<style lang="less" scoped>
</style>