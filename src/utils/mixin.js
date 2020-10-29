// 全局混入，用来定义全局方法
import Vue from 'vue'
import router from '@/router'

const mixin = {
  data: function () {
    return {}
  },
  methods: {
    // 全局头部导航栏左侧，点击返回无历史页面，返回到首页
    minxinNavLeft() {
      if (history.length < 3) {
        router.push('/')
      } else {
        router.go(-1)
      }
    },
    // 全局提示
    minxinTips() {
      this.$toast('功能正在开发中')
    },
    // 跳转书本详情
    mixinBookDetail(item) {
      // const par = encodeURIComponent(JSON.stringify(item))
      // router.push(`/book/bookDetail?item=${par}`)
      this.$bookDetail().open(item)
    }
  },
}

Vue.mixin(mixin)
