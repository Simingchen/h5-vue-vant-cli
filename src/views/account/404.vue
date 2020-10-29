<template>
  <div class="pt90">
    <van-nav-bar title="页面错误" fixed left-arrow @click-left="minxinNavLeft" />
    <van-empty :image="require('@img/icon_request_empty.png')" description="少侠，此处尚无数据" />
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped></style>
