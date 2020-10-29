// 全局组件弹窗，由plugins/bookDetail.js 调用

<template>
  <div v-if="isSHow" class="bookDetailPop-page">
    <van-popup :value="true" position="bottom" :style="{ height: '100vh' }">
      <van-tabs sticky @scroll="scroll">
        <van-tab>
          <!-- 头部导航 -->
          <van-nav-bar fixed :title="detail.name" @click-left="close" left-arrow v-if="isFixed">
            <template #right>
              <img class="share-icon" :src="require('@img/ic_share_black.png')" />
            </template>
          </van-nav-bar>
          <div class="mask" @click="close"></div>
          <bookDetail />
        </van-tab>
      </van-tabs>
    </van-popup>
  </div>
</template>
<script>

import bookDetail from '@components/common/bookDetail.vue'
export default {
  components: { bookDetail },
  data() {
    return {
      isSHow: false,
      isFixed: false,
      detail: {}
    }
  },
  created () {
    
  },
  methods: {
    open (item) {
      console.log(item)
      this.detail = item
      this.isSHow = true
      this.$emit('open')
    },
    close() {
      this.isSHow = false
      this.$emit('close')
    },
    // 页面滚动控制头部导航显示
    scroll (value) {
      this.isFixed = value.isFixed
    }
  }
}
</script>

<style lang="less" scoped>
.mask {
  height: 276px;
}
.van-popup {
  background-color: transparent;
}
.book-detail {
  padding-top: 0;
}
.share-icon {
  width: 50px;
  height: 50px;
}
</style>
<style lang="less" >
.bookDetailPop-page {
  .van-sticky {
    display: none !important;
  }
}
</style>
