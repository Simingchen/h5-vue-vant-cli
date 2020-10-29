<template>
  <div class="pt90">
    <van-nav-bar :title="detail.name || '书籍详情'" fixed left-arrow @click-left="minxinNavLeft" />
    <bookDetail />
  </div>
</template>
<script>

import bookDetail from '@components/common/bookDetail.vue'
export default {
  components: { bookDetail },
  data() {
    return {
      detail: {},
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData() {
    }
  }

}
</script>

<style lang="less" scoped>
</style>
