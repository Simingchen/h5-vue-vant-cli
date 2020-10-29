// 书籍 item 左右单行滑动样式
<template>
  <div class="book-list">
    <div
      class="book-item"
      v-for="(item, index) in computedList"
      :key="index"
      @click="mixinBookDetail(item)"
    >
      <img class="img" v-lazy="$config.imgBookUrl + item.photoPath" />
      <div class="tit ellipsis">{{ item.name }}</div>
      <div class="desc ellipsis">{{ item.author }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
    limit: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },
  computed: {
    computedList() {
      const tempList = Object.freeze(this.list || [])
      if (!this.limit) return tempList
      return tempList.slice(0, this.limit)
    },
  },
}
</script>

<style lang="less" scoped>
.book-list {
  padding: 0 32px;
  overflow: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
.book-item {
  display: inline-block;
  width: 172px;
  margin-right: 48px;
  margin-bottom: 20px;
  &:last-child {
    margin-right: 0;
  }
  .tit {
    font-size: 32px;
    color: #4a4a4a;
    line-height: 56px;
    font-weight: 600;
  }
  .desc {
    height: 40px;
    font-size: 24px;
    color: #8e93a1;
    line-height: 40px;
  }
  .img {
    width: 172px;
    height: 240px;
    box-shadow: 0 4px 8px 0 rgba(80, 80, 80, 0.2);
  }
}
</style>
