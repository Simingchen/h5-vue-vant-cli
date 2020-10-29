// 书籍 item 左右结构样式，悬空样式
<template>
  <div class="book-list flex-row-center">
    <div
      class="book-item flex-box"
      v-for="(item, index) in computedList"
      :key="index"
      @click="mixinBookDetail(item)"
    >
      <img class="img" v-lazy="$config.imgBookUrl + item.photoPath" />
      <div class="con">
        <div class="tit ellipsis">{{item.name}}</div>
        <div class="desc">
          <div class="ellipsis2">{{item.intro}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      },
    },
    limit: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    computedList () {
      const tempList = Object.freeze(this.list || [])
      // 截取15个文字
      tempList.forEach(item => {
        item.intro = item.intro.slice(0, 15)
      });
      if (!this.limit ) return tempList
      return tempList.slice(0, this.limit)
    }
  }
}
</script>

<style lang="less" scoped>
.book-list {
  padding: 0 32px;
  flex-wrap: wrap;
}
.book-item {
  position: relative;
  width: 320px;
  margin-bottom: 32px;
  .con {
    width: 320px;
  }
  .tit {
    font-size: 32px;
    color: #323232;
    line-height: 44px;
    font-weight: 600;
    text-indent: 132px;
  }
  .desc {
    width: 256px;
    height: 124px;
    padding: 16px 24px 0 64px;
    margin-top: 16px;
    margin-left: 68px;
    color: #8e93a1;
    line-height: 40px;
    font-size: 28px;
    background: #fff;
  }
  .img {
    position: absolute;
    width: 116px;
    height: 154px;
    left: 0;
    top: 0;
    box-shadow: 0 4px 8px 0 rgba(80, 80, 80, 0.2);
    z-index: 1;
  }
}
</style>
