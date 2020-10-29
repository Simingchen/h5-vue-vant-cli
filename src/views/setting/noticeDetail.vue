<template>
  <section class="container">
    <van-nav-bar title="公告详情" left-arrow @click-left="minxinNavLeft" />

    <div class="content">
      <h2 class="title">{{ detail.title }}</h2>
      <div class="content-html" v-html="detail.content"></div>
      <div class="info">
        <h3 class="info-title">阅读系统通知</h3>
        <p class="time">{{ detail.onShowDate }}</p>
      </div>
    </div>
    <comment :lists="[1, 2, 3, 4, 5]" :showTop="true"></comment>
  </section>
</template>

<script>
import comment from '@/components/common/comment'
export default {
  components: {
    comment,
  },
  data() {
    return {
      detail: {
        title: '官方通知',
        content: '<p>您好，这个环境是内部的测试环<a href="http://www.imitu3.com" target="_blank" style="background-color: rgb(255, 255, 255);">文殊阁</a>境，请您到appstore下载最新我们的产品“阅览天下”使用，谢谢！”</p>',
        onShowDate: '2020-10-21',
      },
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  overflow: visible;
}
.content {
  background: #fff;
  margin-top: 16px;
  overflow-y: scroll;

  .title {
    height: 100px;
    line-height: 100px;
    font-size: 32px;
    font-weight: bold;
    color: #333;
    text-indent: 32px;
    border-bottom: 2px solid #f5f5f5;
  }

  .content-html {
    padding: 64px 32px 0;
    font-size: 28px;
    color: #8e93a1;
    line-height: 48px;
  }

  .info {
    padding: 0 32px 32px 0;
    margin-top: 100px;
    text-align: right;

    .info-title {
      font-size: 32px;
      color: #333;
      line-height: 60px;
    }
    .time {
      font-size: 28px;
      color: #999ead;
    }
  }
}
</style>