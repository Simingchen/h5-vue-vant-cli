<template>
  <section class="container">
    <van-nav-bar title="帮助与反馈" left-arrow right-text="反馈记录" @click-left="minxinNavLeft" @click-right="toView" />
    <van-cell-group class="normal-question" :border="false" title="常见问题">
      <van-cell title="无法翻页" is-link to="" />
      <van-cell title="无法翻页" is-link to="" />
    </van-cell-group>

    <van-cell-group :border="false" class="all-question" title="全部问题">
      <van-sidebar v-model="sideIndex">
        <van-sidebar-item title="问题一" />
        <van-sidebar-item title="问题二" />
      </van-sidebar>
      <div class="content">
        <van-cell-group :border="false">
          <van-cell class="content-item" title="无法翻页" is-link to="" />
          <van-cell class="content-item" title="无法翻页" is-link to="" />
        </van-cell-group>
      </div>
    </van-cell-group>
    <div class="footer">
      <van-button class="submit" round :color="$config.primaryColor" :to="{ path: '/setting/feedback', query: { tabIndex: 0 } }">意见反馈</van-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      sideIndex: 0,
    }
  },
  methods: {
    toView() {
      this.$router.push({
        path: '/setting/feedback',
        query: {
          tabIndex: 1,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.normal-question {
  margin-bottom: 16px;
}
.all-question {
  display: flex;

  .content {
    width: 100%;
  }
}

.content-item {
  background: #f7f8fa;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 120px;
  background: #fff;

  .submit {
    display: block;
    margin: 20px auto;
    width: 432px;
    height: 80px;
  }
}

/deep/.van-cell-group__title {
  font-weight: bold;
  background: #fff;
  color: #323232;
}
/deep/.van-sidebar {
  width: 5rem;
}

/deep/.van-sidebar-item {
  background: #fff;
}
/deep/.van-sidebar-item--select,
.van-sidebar-item--select:active {
  background: #f7f8fa;
}
</style>