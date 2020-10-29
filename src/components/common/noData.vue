<!--
 * @Author: your name
 * @Date: 2020-10-21 17:03:20
 * @LastEditTime: 2020-10-24 14:02:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /yt-reader-h5app/src/components/common/nodata.vue
-->
<template>
  <section class="wrapper flex-column-center">
    <img src="@img/icon_request_empty.png" alt="缺省页面" class="img" />
    <p class="text">{{ text }}</p>
  </section>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '少侠，此处尚无数据',
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  min-height: 600px;

  .img {
    width: 400px;
    height: auto;
  }
  .text {
    margin-top: 50px;
    font-size: 28px;
    color: #999;
  }
}
</style>