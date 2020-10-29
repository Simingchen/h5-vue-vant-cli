<template>
  <section class="wrapper">
    <van-list v-if="lists.length > 0" class="list-wrapper" v-model="loading" :finished="finished" @load="onLoadCallback">
      <div class="list-item" v-for="(item, i) in lists" :key="i" v-url="{ path: '/setting/feedbackDetail', query: { id: item.id } }">
        <h2 class="title van-ellipsis">{{ item.content }}</h2>
        <p class="time">{{ item.date }}</p>
      </div>
    </van-list>
    <no-data v-else></no-data>
  </section>
</template>

<script>
import noData from '@/components/common/noData'
export default {
  props: {
    lists: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    finished: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    noData,
  },
  data() {
    return {}
  },
  methods: {
    onLoadCallback() {
      this.loading = false
      this.finished = true
      this.$emit('load')
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  min-height: 80vh;
}
.list-wrapper {
  padding-left: 28px;
  background: #fff;

  .list-item {
    padding: 32px 28px 32px 0;
    border-bottom: 1px @border solid;

    .title {
      font-size: 32px;
      line-height: 45px;
      font-weight: bold;
      color: #4a4a4a;
    }
    .time {
      font-size: 24px;
      line-height: 36px;
      color: #999ead;
      margin-top: 16px;
    }
  }
}
</style>