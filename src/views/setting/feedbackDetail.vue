<template>
  <section class="container">
    <van-nav-bar title="意见反馈" left-arrow right-text="客服" @click-left="minxinNavLeft" @click-right="toView" />
    <div class="content">
      <h2 class="title">{{ detail.title }}</h2>
      <p class="text">{{ detail.content }}</p>
      <p class="time">{{ detail.createTime }}</p>
      <div class="img-box">
        <img v-for="(item, i) in detail.img" :key="i" v-lazy="item" alt="意见反馈" class="img" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      errorImg: require('@img/img_def_reader_whole_ad.jpg'),
      detail: {
        title: '这里看小说怎么不能回到之前看的地方？',
        content: '有时关闭了app想回来接着看就得重头翻啊？',
        createTime: '2020-10-21',
        img: [],
      },
    }
  },

  methods: {
    toView() {
      // todo
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  margin-top: 16px;
  padding: 32px 28px;
  background: #fff;
}
.title {
  font-size: 32px;
  line-height: 45px;
  color: #4a4a4a;
  font-weight: bold;
  margin-bottom: 20px;
}

.text {
  font-size: 28px;
  line-height: 48px;
  color: #999ead;
}

.time {
  text-align: right;
  font-size: 24px;
  color: #999ead;
  margin-bottom: 64px;
}
.img {
  width: 124px;
  height: 226px;
  margin: 0 32px 32px 0;
}

// 覆盖样式
/deep/.van-nav-bar__text {
  color: @primary;
}
</style>