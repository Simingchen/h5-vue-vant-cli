<template>
  <section class="wrapper">
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <b-header v-model="type" :limit="limit" @onShowReadTime="onShowReadTime" @onShowNoviceGift="onShowNoviceGift" @onShowExpansion="onShowExpansion"></b-header>
      <book-list :type="type" :lists="books"></book-list>
    </van-pull-refresh>
    <!-- 阅读时间 -->
    <read-time v-model="showReadTime" />
    <!-- 新手礼包 -->
    <novice-gift v-model="showNoviceGift" />
    <!-- 扩充 -->
    <expansion v-model="showExpansion" @confirm="onConfirm" />
  </section>
</template>
<script>
import bHeader from '@/components/bookrack/header'
import bookList from '@/components/bookrack/bookList'
import readTime from '@/components/bookrack/readTime'
import noviceGift from '@/components/bookrack/noviceGift'
import expansion from '@/components/bookrack/expansion'

export default {
  layout: 'homeLayout',
  components: {
    bHeader,
    bookList,
    readTime,
    noviceGift,
    expansion,
  },
  data() {
    return {
      active: 0,
      loading: false,
      type: 'row', //列表类型 row or col
      limit: 10, //书架上限
      books: [
        { id: 1, name: '三生三世十里桃花', author: '书小鸟', photoPath: '', readPercent: '11.2%', clsName: '玄幻', checked: false },
        { id: 2, name: '三生三世十里桃花', author: '书小鸟', photoPath: '', readPercent: '11.2%', clsName: '玄幻', checked: false },
        { id: 3, name: '三生三世十里桃花', author: '书小鸟', photoPath: '', readPercent: '11.2%', clsName: '玄幻', checked: false },
        { id: 4, name: '三生三世十里桃花', author: '书小鸟', photoPath: '', readPercent: '11.2%', clsName: '玄幻', checked: false },
        { id: 5, name: '三生三世十里桃花', author: '书小鸟', photoPath: '', readPercent: '11.2%', clsName: '玄幻', checked: false },
        { id: 6, name: '三生三世十里桃花', author: '书小鸟', photoPath: '', readPercent: '11.2%', clsName: '玄幻', checked: false },
      ],
      showReadTime: false, //阅读时间弹窗
      showNoviceGift: false, // 是否显示新手礼包
      showExpansion: false, // 是否显示扩容
    }
  },
  methods: {
    onRefresh() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    onShowReadTime() {
      this.showReadTime = true
    },
    onShowNoviceGift() {
      this.showNoviceGift = true
    },
    onShowExpansion() {
      this.showExpansion = true
    },
    onConfirm(data) {
      // todo
      this.showExpansion = false
      this.limit += data.num
    },
  },
}
</script>

<style lang="less"></style>
