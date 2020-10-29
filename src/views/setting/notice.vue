<template>
  <section class="container">
    <van-nav-bar title="公告" left-arrow @click-left="minxinNavLeft" />

    <van-list class="list-wrapper" v-model="loading" :finished="finished" @load="onLoadCallback">
      <div
        class="list-item flex-box"
        v-for="(item, i) in lists"
        :key="i"
        v-url="{ path: '/setting/noticeDetail', query: { id: item.id } }"
      >
        <img src="@img/icon_my_notice_head.png" alt="公告" class="headImg" />
        <div class="list-item-info">
          <p class="title">{{ item.title }}</p>
          <p class="content van-ellipsis">{{ item.content }}</p>
          <p class="time">{{ item.onShowDate | filterDateTs }}</p>
        </div>
      </div>
    </van-list>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: true,
      lists: [
        {
          id: 1,
          title: '系统通知',
          content: '加载不出来的问题已经解决啦，解决啦。这加载不出来的问题已经解决啦，解决啦。这',
          onShowDate: '2020-10-21 09:00:00',
        },
      ],
    }
  },

  methods: {
    onLoadCallback() {
      this.loading = false
      this.finished = true
      // todo
    },

    toView(id) {
      this.$router.push({ path: '/setting/noticeDetail', query: { id } })
    },
  },
}
</script>

<style lang="less" scoped>
.list-wrapper {
  margin-top: 16px;
  background: #fff;
  color: #323232;

  .list-item {
    padding: 32px;
    border-bottom: 1px solid #eee;
  }

  .headImg {
    width: 80px;
    height: 80px;
    margin-right: 24px;
    flex-shrink: 0;
  }
  .list-item-info {
    flex: 1;
    overflow: hidden;

    .title,
    .time {
      font-size: 24px;
      line-height: 34px;
      padding-bottom: 8px;
    }
    .content {
      font-size: 28px;
      line-height: 42px;
      padding-bottom: 16px;
    }
  }
}
</style>