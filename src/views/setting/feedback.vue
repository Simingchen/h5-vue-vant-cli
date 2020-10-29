<template>
  <section class="container">
    <van-nav-bar title="意见反馈" left-arrow right-text="客服" @click-left="minxinNavLeft" @click-right="toView" />
    <div class="content">
      <van-tabs v-model="tabIndex">
        <van-tab title="反馈">
          <fb-form :labels="labels" @submit="onSubmit"></fb-form>
        </van-tab>
        <van-tab title="记录">
          <fb-list :lists="lists" :loading="loading" :finished="finished" @load="onLoadCallback"></fb-list>
        </van-tab>
      </van-tabs>
    </div>
  </section>
</template>

<script>
import fbForm from '@/components/feedback/form'
import fbList from '@/components/feedback/list'
export default {
  components: {
    fbForm,
    fbList,
  },
  data() {
    return {
      tabIndex: 0, // tab 选中 index
      labels: [
        [
          { id: 0, name: '小说问题' },
          { id: 1, name: '产品建议' },
          { id: 2, name: 'BUG反馈' },
        ],
        [
          { id: 3, name: '听书问题' },
          { id: 4, name: '兔币问题' },
          { id: -1, name: '其他' },
        ],
      ],
      // 记录 tab 变量
      loading: false,
      finished: false,
      lists: [
        {
          id: 1,
          title: '小说问题',
          content: '有时关闭了app想回来接着看就得重头翻啊？回来接着看就得重头翻啊？',
          date: '2020-10-21',
        },
      ],
    }
  },
  created() {
    this.tabIndex = this.$route.query.tabIndex || 0
  },
  methods: {
    toView() {
      //todo
    },
    onLoadCallback() {
      // todo
    },
    onSubmit() {
      console.log('submit success!')
      this.$toast('提交反馈意见成功')
      // todo
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  margin-top: 16px;
}

// 覆盖样式
/deep/.van-tab--active {
  color: @primary;
}

/deep/.van-tabs__line {
  width: 1rem;
  background-color: @primary;
}

/deep/.van-nav-bar__text {
  color: @primary;
}
</style>