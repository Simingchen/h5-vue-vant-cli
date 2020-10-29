// 书籍滑动 6个位组
<template>
  <van-swipe
    class="my-swipe"
    :show-indicators="false"
    :loop="false"
    :width="computedWidth"
    @click="mixinBookDetail(item)"
  >
    <van-swipe-item v-for="(swipe, index) in computedList" :key="index">
      <div class="book-list">
        <div class="book-item flex-box" v-for="(item, index) in swipe" :key="index">
          <img class="img" v-lazy="$config.imgBookUrl + item.photoPath" />
          <div class="con">
            <div class="tit ellipsis">{{ item.name }}</div>
            <div class="desc ellipsis2">{{ item.intro }}</div>
            <div class="flex-row-center bot">
              <div class="type ellipsis">{{ item.clsName }} | {{ item.author }}</div>
            </div>
          </div>
        </div>
      </div>
    </van-swipe-item>
  </van-swipe>
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
    // 计算滑块的宽度
    computedWidth() {
      const rem = parseInt(document.querySelector('html').style.fontSize)

      return (224 / 20).toFixed(2) * rem
    },
    computedList() {
      // 等分数组
      function group(array, subGroupLength) {
        let index = 0
        let newArray = []
        while (index < array.length) {
          newArray.push(array.slice(index, (index += subGroupLength)))
        }
        return newArray
      }

      // 默认12个item
      var tempList = Object.freeze(this.list || [])

      // 截取20个文字
      tempList.forEach((item) => {
        item.intro = item.intro.slice(0, 20)
      })

      var groupedArray = group(tempList, 3)

      if (!this.limit) return groupedArray
      return groupedArray
    },
  },
}
</script>

<style lang="less" scoped>
.book-list {
  width: 532px;
  height: 912px;
  padding: 0 32px;
  overflow: hidden;
}
.book-item {
  position: relative;
  width: 400px;
  height: 260px;
  margin-bottom: 32px;
  .con {
    width: 192px;
  }
  .tit {
    font-size: 32px;
    color: #323232;
    line-height: 44px;
    font-weight: 600;
  }
  .desc {
    height: 82px;
    margin-top: 24px;
    color: #8e93a1;
    line-height: 40px;
    font-size: 28px;
  }
  .img {
    width: 194px;
    height: 260px;
    margin-right: 16px;
    box-shadow: 0 4px 8px 0 rgba(80, 80, 80, 0.2);
  }
  .type {
    font-size: 24px;
    color: #b7b7b7;
  }
  .bot {
    margin-top: 72px;
  }
}
</style>
