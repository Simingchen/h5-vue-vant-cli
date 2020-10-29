// 作者 item 左右单行滑动样式
<template>
  <div class="book-list" type="5">
    <div class="book-item" v-for="(item, index) in computedList" :key="index">
      <img class="img" v-lazy="$config.imgBookUrl + item.photoPath" />
      <div class="con" :style="{ backgroundImage: `linear-gradient(to right, ${item.bg})` }">
        <div class="tit ellipsis">{{ item.name }}</div>
        <div class="desc ellipsis2">{{ item.intro }}</div>
      </div>
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

      // 背景颜色
      var bgList = ['#f89e8e, #fbd698', '#7cb1ff, #8cb6f2', '#15344c, #62b3ee', '#22bcec, #6acfee']
      tempList.forEach((item, index) => {
        if (index > bgList.length - 1) index = 0
        item.bg = bgList[index]
      })
      if (!this.limit) return tempList
      return tempList.slice(0, this.limit)
    },
  },
}
</script>

<style lang="less" scoped>
.book-list {
  padding: 0 32px 32px;
  overflow: auto;
  white-space: nowrap;
  box-sizing: content-box;
  -webkit-overflow-scrolling: touch;
}
.book-item {
  position: relative;
  display: inline-block;
  width: 520px;
  height: 356px;
  padding-top: 76px;
  margin-right: 32px;
  text-align: center;
  &:last-child {
    margin-right: 0;
  }
  .con {
    height: 280px;
    padding: 96px 20px 0;
    color: #fff;
    border-radius: 10px;
    // background: #ff9987;
    background-image: linear-gradient(to right, #f89e8e, #fbd698);
  }
  .tit {
    width: 100%;
    font-size: 32px;
    line-height: 44px;
    font-weight: 600;
  }
  .desc {
    height: 80px;
    margin-top: 30px;
    font-size: 24px;
    line-height: 40px;
    white-space: normal;
    text-align: left;
  }
  .img {
    position: absolute;
    left: 50%;
    top: 0;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    transform: translate(-50%);
    box-shadow: 0 4px 8px 0 rgba(80, 80, 80, 0.2);
  }
}
</style>
